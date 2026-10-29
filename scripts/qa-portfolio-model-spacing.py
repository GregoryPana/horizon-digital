"""Rendered model/spacing gates: shared camera, connected hinges and explicit tilt control."""
import argparse,json,math
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--engine',choices=['chromium','firefox'],default='chromium');parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--output',required=True);args=parser.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True);rows=[]
ids=['drake','horizon-auto','takamaka','forma','beauty']
def save(): (out/'report.json').write_text(json.dumps(rows,indent=2))
with sync_playwright() as p:
 b=getattr(p,args.engine).launch()
 for w,h in [(320,568),(390,844),(768,1024),(844,390),(1280,700),(1440,900)]:
  context=b.new_context(viewport={'width':w,'height':h});pg=context.new_page();errors=[]
  for pattern in ['**/*.google-analytics.com/**','**/*.googletagmanager.com/**','**/cdn-cgi/rum*']:context.route(pattern,lambda r:r.fulfill(status=204,body=''))
  pg.on('pageerror',lambda e:errors.append(str(e)));pg.goto(args.base+'/work',wait_until='networkidle');pg.evaluate('document.fonts.ready');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');pg.wait_for_function('Array.from(document.images).filter(i=>i.hasAttribute("src")).every(i=>i.complete&&i.naturalWidth>0)')
  for i,id in enumerate(ids):
   box=pg.locator('.pin-spacer').bounding_box();start=box['y']+pg.evaluate('scrollY');pg.evaluate('(y)=>scrollTo(0,y)',start+(box['height']-h)*((i*9.3+4.9)/43));pg.wait_for_timeout(2700)
   row={'id':id,'viewport':[w,h]};rows.append(row);selector=f'[data-project="{id}"]'
   try:
    row['spacing']=pg.locator(selector).evaluate('''(e)=>{const project=e.closest('.work-project'),copy=project.querySelector('.work-copy').getBoundingClientRect(),lid=e.querySelector('.portfolio-laptop-lid').getBoundingClientRect(),phone=e.querySelector('.portfolio-phone').getBoundingClientRect(),button=e.querySelector('.portfolio-playback').getBoundingClientRect();const parts=['.portfolio-laptop-lid','.portfolio-laptop-base','.portfolio-laptop-front','.portfolio-phone'].map(s=>e.querySelector(s).getBoundingClientRect());const pair={left:Math.min(...parts.map(r=>r.left)),right:Math.max(...parts.map(r=>r.right))};let columns=getComputedStyle(project).gridTemplateColumns.split(' ').length;return {columns,copyGap:columns===1?lid.top-copy.bottom:(project.dataset.align==='left'?pair.left-copy.right:copy.left-pair.right),controlGap:button.top-phone.bottom,lid:lid.toJSON(),phone:phone.toJSON()};}''')
    # Mobile is now deliberately distributed into copy/model/bottom actions,
    # not the preceding tightly top-aligned composition. Hardware is unchanged.
    s=row['spacing'];assert 8<=s['copyGap']<=(120 if s['columns']==1 else 104),s;assert 10<=s['controlGap']<=24,s
    row['model']=pg.locator(selector+' .portfolio-laptop-assembly').evaluate('''(e)=>{const lid=e.querySelector('.portfolio-laptop-lid'),deck=e.querySelector('.portfolio-laptop-base'),front=e.querySelector('.portfolio-laptop-front');function point(el,x,y){const p=document.createElement('i');Object.assign(p.style,{position:'absolute',left:x+'%',top:y+'%',width:'0px',height:'0px',pointerEvents:'none'});el.append(p);let r=p.getBoundingClientRect();p.remove();return {x:r.x,y:r.y};}let old=lid.style.getPropertyValue('--lid-angle');const samples=[];for(const angle of [5,18,30]){lid.style.setProperty('--lid-angle',angle+'deg');let m=new DOMMatrixReadOnly(getComputedStyle(lid).transform);samples.push({angle,observed:Math.atan2(m.m23,m.m22)*180/Math.PI,lidHinge:point(lid,50,100),deckHinge:point(deck,50,0),frontJoin:point(front,50,0),deckJoin:point(deck,50,100)});}old?lid.style.setProperty('--lid-angle',old):lid.style.removeProperty('--lid-angle');return {sharedCamera:lid.parentElement===deck.parentElement,perspective:getComputedStyle(e).perspective,keyboardRows:e.querySelectorAll('.portfolio-key-row').length,keys:e.querySelectorAll('.portfolio-key').length,samples};}''')
    model=row['model'];assert model['sharedCamera'] and model['perspective']!='none';assert model['keyboardRows']==6 and model['keys']>=60
    for sample in model['samples']:
     assert abs(sample['observed']-sample['angle'])<.05,sample
     for a,z in [('lidHinge','deckHinge'),('frontJoin','deckJoin')]:assert math.hypot(sample[a]['x']-sample[z]['x'],sample[a]['y']-sample[z]['y'])<4,sample
    if id in ['drake','horizon-auto']:pg.screenshot(path=str(out/f'{id}-{w}.png'))
    row['passed']=True
   except Exception as e:row['passed']=False;row['error']=str(e);pg.screenshot(path=str(out/f'failed-{id}-{w}.png'))
   save()
  assert not errors,errors;context.close()
 b.close()
summary={'engine':args.engine,'expected':30,'collected':len(rows),'passed':sum(row.get('passed',False) for row in rows)};(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary))
for row in rows:
 if not row.get('passed'):print('FAIL',row)
assert summary['expected']==summary['collected']==summary['passed']
