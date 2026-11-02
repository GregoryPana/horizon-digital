import os,subprocess,tempfile,time,json,urllib.request,argparse
from pathlib import Path
from playwright.sync_api import sync_playwright
ap=argparse.ArgumentParser();ap.add_argument('--url',required=True);ap.add_argument('--output',required=True);a=ap.parse_args();out=Path(a.output);out.mkdir(parents=True,exist_ok=False)
with tempfile.TemporaryDirectory(prefix='horizon-remediation-native-',dir=os.environ['TMPDIR']) as profile,sync_playwright() as p:
 log=open(out/'chromium.log','w');chrome=subprocess.Popen([p.chromium.executable_path,'--no-sandbox','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=9451','--user-data-dir='+profile,'about:blank'],env={**os.environ,'DISPLAY':os.environ.get('DISPLAY',':0')},stdout=subprocess.DEVNULL,stderr=log)
 try:
  for i in range(100):
   if chrome.poll() is not None:raise RuntimeError('Native Chromium exited before readiness')
   try:urllib.request.urlopen('http://127.0.0.1:9451/json/version',timeout=1);break
   except OSError:time.sleep(.1)
  b=p.chromium.connect_over_cdp('http://127.0.0.1:9451',no_defaults=True);c=b.contexts[0];page=c.new_page();page.set_viewport_size({'width':1440,'height':900});page.bring_to_front();page.goto(a.url);page.wait_for_function("document.querySelector('.editorial-home')?.dataset.motionReady==='true'");page.get_by_role('button',name='No thanks',exact=True).click();el=page.locator('[data-work-preview="forma"]');el.scroll_into_view_if_needed();page.wait_for_function("document.querySelector('[data-work-preview=forma]').__preview?.ready");el.hover();page.wait_for_timeout(1500)
  clock="""()=>{const e=document.querySelector('[data-work-preview=forma]');return {hidden:document.hidden,visibility:document.visibilityState,ownedHidden:document.querySelector('.editorial-home').hasAttribute('data-home-hidden'),time:e.__preview.tl.time(),paused:e.__preview.tl.paused(),playing:e.dataset.previewPlaying}}"""
  before=page.evaluate(clock);assert before['playing']=='true',before
  other=c.new_page();other.goto('about:blank');other.bring_to_front();page.wait_for_function('document.hidden===true');page.wait_for_timeout(250);h1=page.evaluate(clock);page.wait_for_timeout(750);h2=page.evaluate(clock);assert h1['ownedHidden'] and h1['visibility']=='hidden' and h2['paused'] and abs(h2['time']-h1['time'])<.02,(h1,h2)
  page.bring_to_front();page.wait_for_function('!document.hidden');el.hover();page.wait_for_timeout(300);r1=page.evaluate(clock);page.wait_for_timeout(500);r2=page.evaluate(clock);assert r2['time']>r1['time']+.3,(r1,r2)
  result={'pass':True,'environment':'isolated native WSLg Chromium, no focus emulation defaults','before':before,'hidden':[h1,h2],'resumed':[r1,r2]};(out/'result.json').write_text(json.dumps(result,indent=2));print(result);b.close()
 finally:
  chrome.terminate();chrome.wait(timeout=10);log.close()
