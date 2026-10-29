"""Regression gates for initial Drake paint and independently layered device geometry.
Use real browser hit testing and projected hinge corners, not z-index declarations alone.
"""
import argparse,json,math
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--engine',choices=['chromium','firefox'],default='chromium');parser.add_argument('--output',required=True);args=parser.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True)
rows=[];ids=['drake','horizon-auto','takamaka','forma','beauty']
def save(): (out/'report.json').write_text(json.dumps(rows,indent=2))
with sync_playwright() as p:
 b=getattr(p,args.engine).launch()
 for w,h in [(320,568),(390,844),(768,1024),(844,390),(1280,700),(1440,900)]:
  c=b.new_context(viewport={'width':w,'height':h});pg=c.new_page();errors=[]
  for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**','**/cdn-cgi/rum*']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
  pg.on('pageerror',lambda e:errors.append(str(e)))
  pg.goto(args.base+'/work',wait_until='domcontentloaded');pg.locator('.project-visual-0').wait_for(state='visible')
  row={'check':'initial Drake without scroll','viewport':[w,h]};rows.append(row)
  try:
   row['initial']=pg.locator('.project-visual-0').evaluate('(e)=>({scrollY,opacity:getComputedStyle(e).opacity,stage:document.querySelector(".work-stage").getBoundingClientRect().toJSON(),background:getComputedStyle(document.querySelector(".work-stage>div")).backgroundColor})')
   initial=row['initial'];assert initial['scrollY']==0;assert initial['opacity']=='1';assert abs(initial['stage']['y'])<1;assert initial['background']=='rgba(16, 63, 76, 0.85)',initial
   pg.evaluate('document.fonts.ready');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');pg.wait_for_function('Array.from(document.images).filter(i=>i.hasAttribute("src")).every(i=>i.complete&&i.naturalWidth>0)')
   rect=pg.locator('.project-text-0').bounding_box();header=pg.locator('header').bounding_box();assert rect['y']>=header['height']-1;assert rect['y']+rect['height']<=h
   pg.screenshot(path=str(out/f'initial-drake-{w}.png'));row['passed']=True
  except Exception as e:row['passed']=False;row['error']=str(e)
  save()
  for i,id in enumerate(ids):
   box=pg.locator('.pin-spacer').bounding_box();start=box['y']+pg.evaluate('scrollY');pg.evaluate('(y)=>scrollTo(0,y)',start+(box['height']-h)*((i*9.3+4.9)/43));pg.wait_for_timeout(2700)
   row={'check':'phone foreground and lid hinge','id':id,'viewport':[w,h]};rows.append(row)
   try:
    row['hitTest']=pg.locator(f'[data-project="{id}"]').evaluate('''(e)=>{
      const phone=e.querySelector('.portfolio-phone'),laptop=e.querySelector('.portfolio-laptop'),p=phone.getBoundingClientRect(),l=laptop.getBoundingClientRect();
      const left=Math.max(p.left,l.left),right=Math.min(p.right,l.right),top=Math.max(p.top,l.top),bottom=Math.min(p.bottom,l.bottom);let hits=[];
      for(const fx of [.25,.5,.75])for(const fy of [.25,.5,.75]){const x=left+(right-left)*fx,y=top+(bottom-top)*fy;const target=document.elementFromPoint(x,y);hits.push({x,y,phone:!!target?.closest('.portfolio-phone')});}
      return {overlapWidth:right-left,overlapHeight:bottom-top,hits};
    }''')
    hit=row['hitTest'];assert hit['overlapWidth']>0 and hit['overlapHeight']>0;assert all(item['phone'] for item in hit['hits']),hit
    row['hinge']=pg.locator(f'[data-project="{id}"] .portfolio-laptop-lid').evaluate('''(e)=>{
      const points=[];for(const [x,y] of [[0,0],[1,0],[0,1],[1,1]]){let probe=document.createElement('span');Object.assign(probe.style,{position:'absolute',left:x?'100%':'0',top:y?'100%':'0',width:'0px',height:'0px',pointerEvents:'none'});e.append(probe);let r=probe.getBoundingClientRect();points.push({x:r.x,y:r.y});probe.remove();}
      let m=new DOMMatrixReadOnly(getComputedStyle(e).transform);return {points,rotateX:Math.atan2(m.m23,m.m22)*180/Math.PI,baseRotateX:(()=>{const m=new DOMMatrixReadOnly(getComputedStyle(e.parentElement).transform);return Math.atan2(m.m23,m.m22)*180/Math.PI})()};
    }''')
    hinge=row['hinge'];a,z,corn,d=hinge['points'];topWidth=math.hypot(z['x']-a['x'],z['y']-a['y']);bottomWidth=math.hypot(d['x']-corn['x'],d['y']-corn['y']);assert bottomWidth>topWidth+.1,(topWidth,bottomWidth);assert 5<hinge['rotateX']<25;assert abs(hinge['baseRotateX'])<.1
    row['passed']=True
    if id=='horizon-auto':pg.screenshot(path=str(out/f'auto-layered-{w}.png'))
   except Exception as e:row['passed']=False;row['error']=str(e);pg.screenshot(path=str(out/f'failed-{id}-{w}.png'))
   save()
  assert not errors,errors;c.close()
 b.close()
summary={'engine':args.engine,'expected':36,'collected':len(rows),'passed':sum(row.get('passed',False) for row in rows)};(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary))
for row in rows:
 if not row.get('passed'):print('FAIL',row)
assert summary['expected']==summary['collected']==summary['passed']
