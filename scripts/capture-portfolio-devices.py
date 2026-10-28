"""Capture actual responsive target pages; no device-width stretching.
Requires Python Playwright (Chromium). Re-run explicitly to refresh public captures.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/assets/portfolio-devices'
OUT.mkdir(parents=True, exist_ok=True)
TARGETS = [
 ('drake', 'https://thedrake-seaside.com/'),
 ('horizon-auto', 'https://auto.horizondigitalsey.com/'),
 ('takamaka', 'https://horizondigitalsey.com/takamaka-house'),
 ('forma', 'https://horizondigitalsey.com/forma-studio'),
 ('beauty', 'https://demo-beauty.horizondigitalsey.com/'),
]
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 for project,url in TARGETS:
  for device,w,h in [('desktop',1440,900),('mobile',390,844)]:
   context=b.new_context(viewport={'width':w,'height':h},device_scale_factor=1,reduced_motion='reduce',is_mobile=device=='mobile',has_touch=device=='mobile')
   for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**','**/static.cloudflareinsights.com/**','**/cloudflareinsights.com/**']:
    context.route(pattern,lambda route:route.fulfill(status=204,body=''))
   page=context.new_page()
   try:
    response=page.goto(url,wait_until='networkidle',timeout=60000)
    assert response is not None and response.status==200,url
    page.evaluate('document.fonts.ready')
    page.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")')
    page.wait_for_timeout(1200)
    # Exercise native scrolling so intersection-revealed content is actually visible.
    total=page.evaluate('document.documentElement.scrollHeight')
    for y in range(0,total,h//2):
     page.evaluate('(y)=>window.scrollTo(0,y)',y);page.wait_for_timeout(100)
    page.evaluate('window.scrollTo(0,0)');page.wait_for_timeout(800)
    # Capture a bounded opening-page tour, excluding testimonial sections.
    # Existing fictional sample business details remain concept content, not verified proof.
    # Each screenshot is wide enough for its real device, never a desktop crop on a phone.
    text=page.locator('body').inner_text()
    geometry=page.evaluate('({width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight})')
    capture_height=min(geometry['documentHeight'],h*3)
    if project=='forma':capture_height=min(capture_height,1700 if device=='desktop' else 1900)
    if project=='takamaka':capture_height=min(capture_height,1800 if device=='desktop' else 2200)
    page.screenshot(path=str(OUT/f'{project}-{device}.png'),clip={'x':0,'y':0,'width':w,'height':capture_height},full_page=True,animations='disabled',timeout=60000)
    geometry['captureHeight']=capture_height
    row={'id':project,'device':device,'url':url,'status':response.status,'title':page.title(),'geometry':geometry,'text':text[:18000],'file':f'{project}-{device}.png'}
    results.append(row);(OUT/'captures.json').write_text(json.dumps(results,indent=2));print(project,device,geometry,flush=True)
   except Exception as e:
    results.append({'id':project,'device':device,'url':url,'error':str(e)});(OUT/'captures.json').write_text(json.dumps(results,indent=2));print('FAIL',project,device,str(e),flush=True)
   finally:context.close()
 b.close()
assert len(results)==10
assert not any('error' in r for r in results)
