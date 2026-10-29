"""Full-scene geometry plus real reversible object motion at all breakpoints."""
import argparse,json,math
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--engine',default='chromium',choices=['chromium','firefox']);parser.add_argument('--output',required=True);args=parser.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True)
ids=['drake','horizon-auto','takamaka','forma','beauty'];results=[]
def save(): (out/'report.json').write_text(json.dumps(results,indent=2))
def seek(pg,i,h,time=4.9):
 box=pg.locator('.pin-spacer').bounding_box();start=box['y']+pg.evaluate('scrollY');pg.evaluate('(y)=>scrollTo(0,y)',start+(box['height']-h)*((i*9.3+time)/43));pg.wait_for_timeout(2700)
def objects(pg,id):return pg.locator(f'[data-project="{id}"] .portfolio-laptop-lid, [data-project="{id}"] .portfolio-phone').evaluate_all('(a)=>a.map(e=>{let m=new DOMMatrixReadOnly(getComputedStyle(e).transform);return {matrix:getComputedStyle(e).transform,rotateX:Math.atan2(m.m23,m.m22)*180/Math.PI,y:m.m42}})')
with sync_playwright() as p:
 b=getattr(p,args.engine).launch()
 for w,h in [(320,568),(390,844),(768,1024),(844,390),(1280,700),(1440,900)]:
  c=b.new_context(viewport={'width':w,'height':h});
  for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**','**/cdn-cgi/rum*']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
  pg=c.new_page();errors=[];pg.on('pageerror',lambda e:errors.append(str(e)));pg.goto(args.base+'/work',wait_until='networkidle');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');pg.wait_for_function('Array.from(document.images).filter(i=>i.hasAttribute("src")).every(i=>i.complete&&i.naturalWidth>0)')
  for i,id in enumerate(ids):
   seek(pg,i,h)
   row={'id':id,'viewport':[w,h],'check':'full-viewport scene geometry'};results.append(row)
   try:
    row['stage']=pg.locator('.work-stage').bounding_box();stage=row['stage'];assert abs(stage['y'])<1 and stage['x']==0 and stage['width']==w and abs(stage['height']-h)<1,stage
    row['background']=pg.locator('.work-stage>div').first.bounding_box();assert abs(row['background']['height']-h)<1 and row['background']['width']==w
    row['projectRadius']=pg.locator(f'.project-text-{i}').evaluate('(e)=>getComputedStyle(e.parentElement).borderRadius');assert row['projectRadius']=='0px'
    row['activeProjects']=pg.locator('.work-project:not([aria-hidden="true"])').count();assert row['activeProjects']==1
    row['overflow']=pg.evaluate('document.documentElement.scrollWidth-innerWidth');assert row['overflow']==0
    header=pg.locator('header').first.bounding_box();copy=pg.locator(f'.project-text-{i}').bounding_box();assert copy['y']>=header['y']+header['height']-1,(copy,header)
    for selector in [f'.project-text-{i}',f'[data-project="{id}"]',f'[data-project="{id}"] button']:
     rect=pg.locator(selector).bounding_box();assert rect['x']>=-1 and rect['x']+rect['width']<=w+1 and rect['y']>=-1 and rect['y']+rect['height']<=h+1,(selector,rect)
    pause=pg.locator(f'[data-project="{id}"] button').bounding_box();top=pg.get_by_role('button',name='Back to top',exact=True).bounding_box()
    if top:
     overlap_x=max(0,min(pause['x']+pause['width'],top['x']+top['width'])-max(pause['x'],top['x']));overlap_y=max(0,min(pause['y']+pause['height'],top['y']+top['height'])-max(pause['y'],top['y']));assert overlap_x*overlap_y==0,(pause,top)
    row['objects']=objects(pg,id);assert abs(row['objects'][0]['rotateX'])>5
    if id=='horizon-auto':pg.screenshot(path=str(out/f'auto-{w}.png'))
    row['passed']=True
   except Exception as e:row['passed']=False;row['error']=str(e);pg.screenshot(path=str(out/f'failed-{id}-{w}.png'))
   save()
  seek(pg,1,h,.8);start=objects(pg,'horizon-auto');seek(pg,1,h);settled=objects(pg,'horizon-auto');seek(pg,1,h,.8);reverse=objects(pg,'horizon-auto')
  assert abs(start[0]['rotateX'])>abs(settled[0]['rotateX'])+.5,(start,settled)
  assert abs(reverse[0]['rotateX'])>abs(settled[0]['rotateX'])+.5,(reverse,settled)
  assert start[1]['y']>settled[1]['y']+.1 and reverse[1]['y']>settled[1]['y']+.1,(start,settled,reverse)
  results.append({'id':'horizon-auto','viewport':[w,h],'check':'real laptop tilt and phone object motion forward/reverse','start':start,'settled':settled,'reverse':reverse,'passed':True});save()
  assert not errors,errors;c.close()
 b.close()
summary={'engine':args.engine,'expected':36,'collected':len(results),'passed':sum(r['passed'] for r in results)};(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary))
for r in results:
 if not r.get('passed'):print('FAIL',r)
assert summary['expected']==summary['collected']==summary['passed']
