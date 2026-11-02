"""Bounded keyboard/menu/axe/loading observation on the frozen local Worker."""
import argparse,json
from pathlib import Path
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--output',required=True);p.add_argument('--axe',required=True);a=p.parse_args()
out=Path(a.output);out.mkdir(parents=True,exist_ok=True);results=[]
with sync_playwright() as pw:
 for engine in ['chromium','firefox']:
  b=getattr(pw,engine).launch()
  for motion in ['no-preference','reduce']:
   ctx=b.new_context(viewport={'width':390,'height':844},reduced_motion=motion);page=ctx.new_page();errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   page.add_init_script('''window.__layoutSamples=[];window.__shifts=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__shifts.push({value:e.value,startTime:e.startTime,sources:e.sources?.map(s=>({node:s.node?.className,previous:s.previousRect,current:s.currentRect}))})}).observe({type:'layout-shift',buffered:true});
   const sample=()=>{let e=document.querySelector('#opening .op-s1');if(e){const q=e.querySelector('h1'),a=e.querySelector('a');window.__layoutSamples.push({t:performance.now(),fonts:document.fonts.status,ready:!!document.querySelector('[data-motion-ready]'),hero:e.getBoundingClientRect().toJSON(),heading:q.getBoundingClientRect().toJSON(),cta:a.getBoundingClientRect().toJSON()});}if(performance.now()<3500)requestAnimationFrame(sample)};requestAnimationFrame(sample);''')
   page.goto(a.url,wait_until='load');page.wait_for_function("document.querySelector('[data-motion-ready]')");page.wait_for_timeout(1700)
   assert not page.locator('#analytics-consent-panel').evaluate('(e)=>e.contains(document.activeElement)')
   page.add_script_tag(path=a.axe)
   scan=lambda:page.evaluate("async()=>await axe.run(document.querySelector('#analytics-consent-panel'))")
   compact=scan();assert not compact['violations'],compact['violations']
   page.get_by_role('button',name='Open the menu',exact=True).click();assert not page.locator('#analytics-consent-panel').is_visible()
   page.keyboard.press('Escape');page.wait_for_timeout(700);assert page.locator('#analytics-consent-panel').is_visible()
   assert page.evaluate("localStorage.getItem('horizon.analytics.consent.v1')") is None
   page.evaluate('window.scrollTo(0,450)');page.wait_for_timeout(500)
   assert page.locator('#analytics-consent-panel').is_visible()
   assert page.evaluate("localStorage.getItem('horizon.analytics.consent.v1')") is None
   page.get_by_role('button',name='No thanks',exact=True).click()
   opener=page.get_by_role('button',name='Analytics preferences',exact=True);opener.click()
   expanded=scan();assert not expanded['violations'],expanded['violations']
   page.screenshot(path=str(out/f'{engine}-{motion}-reopened.png'))
   page.get_by_role('button',name='Close',exact=True).focus();page.keyboard.press('Enter');assert opener.evaluate('(e)=>e===document.activeElement')
   assert not errors,errors
   loading=page.evaluate('({samples:window.__layoutSamples,shifts:window.__shifts})')
   results.append({'engine':engine,'motion':motion,'compactAxeViolations':compact['violations'],'expandedAxeViolations':expanded['violations'],'errors':errors,'loadingObservation':loading})
   ctx.close()
  b.close()
(out/'states-result.json').write_text(json.dumps({'pass':True,'cases':len(results),'scope':'panel-only axe; real keyboard/menu/scroll, 390x844; loading observations are diagnostic, not matched performance evidence','results':results},indent=2))
print(json.dumps({'pass':True,'cases':len(results)}))
