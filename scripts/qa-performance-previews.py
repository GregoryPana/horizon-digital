"""Real preview clocks, responsive source and SPA cleanup; serial functional QA."""
import argparse,json
from pathlib import Path
from playwright.sync_api import sync_playwright
ap=argparse.ArgumentParser();ap.add_argument('--url',required=True);ap.add_argument('--output',required=True);a=ap.parse_args();out=Path(a.output);out.mkdir(parents=True,exist_ok=False);rows=[]
clock="""e=>({time:e.__preview?.tl.time(),paused:e.__preview?.tl.paused(),ready:e.__preview?.ready,playing:e.dataset.previewPlaying,phase:e.dataset.previewPhase,travel:e.__preview?.travel,src:e.querySelector('img').currentSrc,poster:getComputedStyle(e.querySelector('.hd-work-poster')).opacity,transform:getComputedStyle(e.querySelector('img')).transform})"""
with sync_playwright() as p:
 for engine in ['chromium','firefox']:
  b=getattr(p,engine).launch()
  for width,height,dpr in [(390,844,1),(390,844,3),(768,1024,2),(844,390,1),(1440,900,1),(1440,900,2)]:
   c=b.new_context(viewport={'width':width,'height':height},device_scale_factor=dpr);page=c.new_page();errors=[];responses=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   def response(r):
    if 'work-forma-' in r.url:responses.append({'url':r.url,'status':r.status,'length':r.headers.get('content-length')})
   page.on('response',response)
   try:
    page.goto(a.url);page.wait_for_function("document.querySelector('.editorial-home')?.dataset.motionReady==='true'");page.get_by_role('button',name='No thanks',exact=True).click()
    el=page.locator('[data-work-preview="forma"]');el.scroll_into_view_if_needed();page.wait_for_function("document.querySelector('[data-work-preview=forma]').__preview?.ready===true");page.wait_for_timeout(700)
    page.mouse.move(1,1);page.wait_for_timeout(200);idle=el.evaluate(clock);assert idle['paused'] and idle['playing']=='false'
    image=el.locator('img').first;media=image.evaluate('(e)=>({width:e.clientWidth,naturalWidth:e.naturalWidth,currentSrc:e.currentSrc,complete:e.complete})');assert media['complete'] and media['naturalWidth']>0
    page.screenshot(path=str(out/f'{engine}-{width}x{height}-dpr{dpr}-portfolio.png'))
    el.hover();page.wait_for_timeout(1700);moving=el.evaluate(clock);assert moving['ready'] and moving['playing']=='true' and moving['time']>idle['time']+1
    page.mouse.move(1,1);page.wait_for_timeout(250);paused=el.evaluate(clock);page.wait_for_timeout(450);paused2=el.evaluate(clock);assert abs(paused2['time']-paused['time'])<.02 and paused2['playing']=='false'
    page.set_viewport_size({'width':width-20,'height':height});page.wait_for_timeout(450);resized=el.evaluate(clock);assert abs(resized['time']-paused2['time'])<.02
    page.set_viewport_size({'width':width,'height':height});page.wait_for_timeout(250)
    # Focus is deliberately not decorative playback.
    el.locator('xpath=ancestor::a').focus();page.wait_for_timeout(250);assert el.evaluate(clock)['playing']=='false'
    el.hover();page.wait_for_timeout(350);page.locator('#membership').scroll_into_view_if_needed();page.wait_for_timeout(400);off=el.evaluate(clock);page.wait_for_timeout(450);off2=el.evaluate(clock);assert off2['paused'] and abs(off2['time']-off['time'])<.02
    el.scroll_into_view_if_needed();el.hover();page.wait_for_timeout(250);page.emulate_media(reduced_motion='reduce');page.wait_for_timeout(350);reduced=el.evaluate(clock);assert reduced['playing']=='false' and reduced['paused'] and reduced['time']==0
    page.emulate_media(reduced_motion='no-preference');page.mouse.move(1,1);page.wait_for_timeout(250);assert el.evaluate(clock)['paused']
    # Keep detached identity to verify context-owned async resources really stop.
    page.evaluate("window.__oldHome=document.querySelector('.editorial-home');window.__oldState=window.__oldHome.__editorialHome;window.__oldPreview=document.querySelector('[data-work-preview=forma]').__preview")
    page.locator('footer a[href="/work"]').first.click();page.wait_for_function("!document.querySelector('.editorial-home')");assert page.evaluate('window.__oldState.active===false && window.__oldHome.__editorialHome===undefined')
    oldtime=page.evaluate('window.__oldPreview.tl.time()');page.wait_for_timeout(300);assert page.evaluate('window.__oldPreview.tl.time()')==oldtime
    page.go_back();page.wait_for_function("document.querySelector('.editorial-home')?.dataset.motionReady==='true'");assert page.evaluate('document.querySelector(".editorial-home")!==window.__oldHome')
    assert not errors,errors
    row={'engine':engine,'width':width,'height':height,'dpr':dpr,'pass':True,'media':media,'responses':responses[:],'idle':idle,'moving':moving,'paused':paused2,'resize':resized,'offscreen':off2,'reduced':reduced};rows.append(row);print(engine,width,dpr,'PASS',flush=True)
   except Exception as e:
    rows.append({'engine':engine,'width':width,'height':height,'dpr':dpr,'pass':False,'error':str(e),'errors':errors});print(engine,width,dpr,'FAIL',e,flush=True)
   finally:
    (out/'result.json').write_text(json.dumps({'expected':12,'rows':rows},indent=2));c.close()
  b.close()
assert len(rows)==12 and all(r['pass'] for r in rows),rows
