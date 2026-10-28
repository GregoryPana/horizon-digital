"""Verify all five device showcases against the final local Worker.
Prerequisites: Python Playwright and the selected installed browser engine.
"""
import argparse,json
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--engine',choices=['chromium','firefox'],default='chromium');parser.add_argument('--output',required=True);parser.add_argument('--interactions',action='store_true');args=parser.parse_args()
out=Path(args.output);out.mkdir(parents=True,exist_ok=True)
ids=['drake','horizon-auto','takamaka','forma','beauty'];titles=['Drake Seaside','Horizon Auto','Takamaka House','Forma Studio','Beauty Demo'];cases=[];journeys=[]
def save(): (out/'report.json').write_text(json.dumps({'engine':args.engine,'cases':cases,'journeys':journeys},indent=2))
def setup(browser,w,h,motion):
 c=browser.new_context(viewport={'width':w,'height':h},reduced_motion=motion)
 # Let the genuine integrity-protected Cloudflare beacon script load; suppress only
 # its reporting endpoint in the isolated QA browser, not the script or production config.
 for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**','**/cdn-cgi/rum*','**/cloudflareinsights.com/**']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
 pg=c.new_page();return c,pg
def activate(pg,index,motion,width,height):
 if motion=='reduce' or width<768:
  pg.locator(f'.project-visual-{index}').evaluate('(e)=>e.scrollIntoView({block:"center"})');pg.wait_for_timeout(180)
 else:
  box=pg.locator('.pin-spacer').bounding_box();y=box['y']+pg.evaluate('scrollY')-height*.05+(box['height']-height)*((index*9.3+4.9)/43)
  pg.evaluate('(y)=>window.scrollTo(0,y)',y);pg.wait_for_timeout(2400)
 pg.wait_for_function('(i)=>getComputedStyle(document.querySelector(`.project-visual-${i}`)).opacity === "1"',arg=index)

def offsets(pg,id):return pg.locator(f'[data-project="{id}"] .portfolio-device-page').evaluate_all('(a)=>a.map(e=>({y:new DOMMatrixReadOnly(getComputedStyle(e).transform).m42,blur:getComputedStyle(e).filter}))')
with sync_playwright() as p:
 b=getattr(p,args.engine).launch()
 for motion in ['reduce','no-preference']:
  for width,height in [(320,568),(390,844),(768,1024),(1280,700),(1440,900)]:
   context,pg=setup(b,width,height,motion);errors=[];failed=[]
   pg.on('pageerror',lambda e:errors.append(str(e)));pg.on('console',lambda e:errors.append(e.text) if e.type=='error' else None);pg.on('response',lambda r:failed.append({'url':r.url,'status':r.status}) if r.status>=400 else None)
   try:
    response=pg.goto(args.base+'/work',wait_until='networkidle');assert response.status==200
    pg.evaluate('document.fonts.ready');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');pg.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
    assert pg.locator('.portfolio-devices').evaluate_all('(a)=>a.map(e=>e.dataset.project)')==ids
    for index,id in enumerate(ids):
     row={'id':id,'viewport':[width,height],'motion':motion};cases.append(row)
     try:
      activate(pg,index,motion,width,height)
      root=pg.locator(f'[data-project="{id}"]');row['devices']=root.locator('[data-device]').count();assert row['devices']==2
      row['screens']=root.locator('.portfolio-device-screen').evaluate_all('(a)=>a.map(e=>{let b=e.getBoundingClientRect(),i=e.querySelector("img"),r=i.getBoundingClientRect();return {width:b.width,height:b.height,imageWidth:r.width,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,x:b.x,right:b.right}})')
      for screen,ratio in zip(row['screens'],[1440/900,390/844]):
       assert abs(screen['width']/screen['height']-ratio)<.02,screen
       assert abs(screen['imageWidth']-screen['width'])<1,screen
       assert screen['x']>=-1 and screen['right']<=width+1,screen
      row['overflow']=pg.evaluate('Math.max(0,document.documentElement.scrollWidth-innerWidth)');assert row['overflow']==0
      row['h1']=pg.locator('h1').count();assert row['h1']==1
      if motion=='reduce':
       before=offsets(pg,id);pg.wait_for_timeout(200);after=offsets(pg,id);assert before==after;assert all(x['y']==0 for x in after)
      if width==1440:
       pg.screenshot(path=str(out/f'{motion}-{id}-{width}.png'))
      if width==390 and motion=='no-preference':
       pg.locator(f'.project-text-{index}').evaluate('(e)=>e.scrollIntoView({block:"start"})');pg.evaluate('window.scrollBy(0,-100)');pg.screenshot(path=str(out/f'{motion}-{id}-{width}.png'))
      row['passed']=True
     except Exception as e:row['passed']=False;row['error']=str(e);pg.screenshot(path=str(out/f'failed-{motion}-{width}-{id}.png'))
     save()
    assert not errors and not failed,(errors,failed)
   finally:
    if errors or failed:cases.append({'runtimeFailure':True,'errors':errors,'httpFailures':failed,'passed':False})
    save();context.close()
 if args.interactions:
  # Actual cycle, both hover targets, resume, explicit pause and reduced motion are measured.
  for index,id in enumerate(ids):
   c,pg=setup(b,1440,900,'no-preference');pg.goto(args.base+'/work',wait_until='networkidle');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');activate(pg,index,'no-preference',1440,900)
   root=pg.locator(f'[data-project="{id}"]');pg.mouse.move(1,1);pg.wait_for_timeout(1600)
   start=offsets(pg,id);pg.wait_for_timeout(1200);moving=offsets(pg,id);assert all(a['y']>z['y'] for a,z in zip(start,moving)),(id,start,moving)
   for device in ['desktop','mobile']:
    root.locator(f'[data-device="{device}"]').hover();before=offsets(pg,id);pg.wait_for_timeout(600);after=offsets(pg,id);assert before==after,(id,device,before,after);journeys.append({'id':id,'check':device+' hover pauses both in place','passed':True});save()
   pg.mouse.move(1,1);pg.wait_for_timeout(700);assert offsets(pg,id)!=after;journeys.append({'id':id,'check':'mouseleave resumes','passed':True})
   # Observe a real blur frame and the return to the start across an actual complete cycle.
   pg.wait_for_function('(id)=>document.querySelector(`[data-project="${id}"]`).dataset.phase==="blur-out"',arg=id,timeout=26000)
   pg.wait_for_timeout(200);blur=offsets(pg,id);assert all(x['blur']!='blur(0px)' for x in blur)
   pg.wait_for_function('(id)=>Number(document.querySelector(`[data-project="${id}"]`).dataset.cycles)>0',arg=id,timeout=3000)
   pg.wait_for_timeout(800);reset=offsets(pg,id);assert all(abs(x['y'])<1 for x in reset),reset
   journeys.append({'id':id,'check':'real blur/reset loop','blur':blur,'reset':reset,'passed':True});save()
   root.get_by_role('button').click();pg.mouse.move(1,1);pg.locator('h1').evaluate('(e)=>e.focus()');before=offsets(pg,id);pg.wait_for_timeout(500);assert offsets(pg,id)==before;assert root.get_by_role('button').get_attribute('aria-pressed')=='true';journeys.append({'id':id,'check':'explicit pause holds','passed':True});save();c.close()
 b.close()
expected=50
summary={'expected':expected,'collected':len(cases),'passed':sum(x.get('passed',False) for x in cases),'journeys':len(journeys)}
(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary))
for r in cases:
 if not r.get('passed'):print('FAIL',r)
assert summary['collected']==summary['passed']==expected
if args.interactions:assert len(journeys)==25
