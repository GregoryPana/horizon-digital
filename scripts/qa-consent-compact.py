"""Serial built-Worker consent geometry review; no Lighthouse or live submissions.
Requires the installed Python Playwright engines. Explicit URLs/output protect old receipts.
"""
import argparse, json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--baseline', required=True)
parser.add_argument('--candidate', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()
out = Path(args.output); out.mkdir(parents=True, exist_ok=True)
viewports = [(320,568),(360,640),(390,844),(430,932),(844,390),(768,1024),(1440,900)]
rows, failures = [], []
geometry = '''() => {
 const box = e => e.getBoundingClientRect().toJSON();
 const panel = document.querySelector('#analytics-consent-panel');
 const p = box(panel), header = box(document.querySelector('[data-site-header]'));
 const actions = [...document.querySelectorAll('#opening .op-s1 a')].map(e => ({text:e.textContent,rect:box(e)}));
 const overlaps = r => p.left < r.right && p.right > r.left && p.top < r.bottom && p.bottom > r.top;
 return {panel:p,coverage:p.width*p.height/(innerWidth*innerHeight),header,actions,
   overlapsActions:actions.filter(a=>overlaps(a.rect)).map(a=>a.text),overlapsHeader:overlaps(header),
   overlapsHeadline:[...document.querySelectorAll('#opening .op-line')].some(e=>overlaps(box(e))),
   targets:[...panel.querySelectorAll('button')].map(e=>({text:e.textContent,rect:box(e),hit:e.contains(document.elementFromPoint(box(e).x+box(e).width/2,box(e).y+box(e).height/2))})),
   bodyHeight:document.body.scrollHeight,rootWidth:document.documentElement.scrollWidth,
   width:innerWidth,height:innerHeight,font:getComputedStyle(panel.querySelector('p')).fontSize,
   choice:localStorage.getItem('horizon.analytics.consent.v1'),gtag:typeof window.gtag};
}'''
with sync_playwright() as p:
 for engine in ['chromium','firefox']:
  browser = getattr(p,engine).launch()
  for motion in ['no-preference','reduce']:
   for version,url in [('baseline',args.baseline),('candidate',args.candidate)]:
    for w,h in viewports:
     key=f'{engine}-{motion}-{version}-{w}x{h}'
     context=browser.new_context(viewport={'width':w,'height':h},reduced_motion=motion)
     page=context.new_page(); errors=[];google=[]
     page.on('pageerror',lambda e:errors.append(str(e)))
     page.on('request',lambda r:google.append(r.url) if 'google-analytics' in r.url or 'googletagmanager' in r.url else None)
     try:
      page.goto(url+'/',wait_until='load');page.wait_for_function("document.querySelector('[data-motion-ready]')")
      page.evaluate('document.fonts.ready');page.wait_for_timeout(700)
      row={'key':key,**page.evaluate(geometry),'errors':errors}
      page.screenshot(path=str(out/(key+'.png')))
      if version=='candidate':
       assert not row['overlapsActions'], row['overlapsActions']
       assert not row['overlapsHeader']
       assert not row['overlapsHeadline'], 'notice obscures headline ink'
       assert row['panel']['top']>=0 and row['panel']['bottom']<=h
       assert all(t['rect']['height']>=44 and t['rect']['width']>=44 and t['hit'] for t in row['targets'])
       assert row['font']=='14px'
       assert row['rootWidth']<=w
       assert row['choice'] is None and row['gtag']=='undefined' and not google
       # Keyboard reaches both choices without trapping the background.
       allow=page.get_by_role('button',name='Allow analytics',exact=True)
       allow.focus();page.keyboard.press('Tab');assert page.get_by_role('button',name='No thanks',exact=True).evaluate('(e)=>e===document.activeElement')
       page.keyboard.press('Escape');assert page.locator('#analytics-consent-panel').is_visible()
       before=page.locator('#opening .op-s1').bounding_box()
       before_document=page.locator('#opening').evaluate('(e)=>e.getBoundingClientRect().top+scrollY')
       page.get_by_role('button',name='No thanks',exact=True).click()
       assert not page.locator('#analytics-consent-panel').is_visible()
       after=page.locator('#opening .op-s1').bounding_box()
       if h>500 and w>340:
        assert before==after, 'ordinary notice changed document geometry'
       else:
        reserved=120 if h<=500 else 24
        after_document=page.locator('#opening').evaluate('(e)=>e.getBoundingClientRect().top+scrollY')
        assert abs(before_document-after_document-reserved)<1, 'bounded reserved row not released exactly in document coordinates'
       page.reload(wait_until='load');page.wait_for_function("document.querySelector('[data-motion-ready]')")
       assert not page.locator('#analytics-consent-panel').is_visible()
       opener=page.get_by_role('button',name='Analytics preferences',exact=True)
       opener.click(); assert page.locator('#analytics-consent-title').evaluate('(e)=>e===document.activeElement')
       close=page.get_by_role('button',name='Close',exact=True);close.scroll_into_view_if_needed()
       assert close.evaluate('(e)=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}')
       page.keyboard.press('Escape');assert opener.evaluate('(e)=>e===document.activeElement')
       assert not google
      assert not errors, errors
      rows.append(row)
     except Exception as e:
      failures.append({'key':key,'error':str(e)})
     finally:
      context.close()
      (out/'geometry-result.json').write_text(json.dumps({'expected':56,'rows':rows,'failures':failures},indent=2))
  browser.close()
assert len(rows)==56 and not failures, failures
print(json.dumps({'pass':True,'cases':len(rows),'output':str(out)}))
