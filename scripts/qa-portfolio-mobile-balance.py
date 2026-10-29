"""Balanced mobile/CTA touch and progressive-loading acceptance against a real Worker."""
import argparse,json
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--engine',choices=['chromium','firefox'],default='chromium');parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--output',required=True);args=parser.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True);rows=[]
ids=['drake','horizon-auto','takamaka','forma','beauty']
def save(): (out/'report.json').write_text(json.dumps(rows,indent=2))
with sync_playwright() as p:
 b=getattr(p,args.engine).launch()
 for w,h in [(320,568),(390,844),(430,932),(768,1024),(844,390),(1440,900)]:
  c=b.new_context(viewport={'width':w,'height':h},has_touch=True);pg=c.new_page();errors=[];image_responses=[]
  pg.on('response',lambda r:image_responses.append({'url':r.url,'status':r.status}) if '-desktop-' in r.url or '-mobile-' in r.url else None)
  for pattern in ['**/*.google-analytics.com/**','**/*.googletagmanager.com/**','**/cdn-cgi/rum*']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
  pg.on('pageerror',lambda e:errors.append(str(e)));response=pg.goto(args.base+'/work',wait_until='networkidle');assert response.status==200;pg.evaluate('document.fonts.ready');pg.wait_for_function('[...document.querySelectorAll("[data-project=drake] img")].every(i=>i.complete&&i.naturalWidth>0)');pg.wait_for_timeout(700)
  resource=pg.evaluate('performance.getEntriesByType("resource").filter(e=>/assets\\/.*-(desktop|mobile)-/.test(e.name)).map(e=>({url:e.name,bytes:e.encodedBodySize}))')
  # Firefox can revalidate the same responsive image with HTTP 304 on decode.
  # Keep those actual responses; assert two unique images and two 200 bodies,
  # not two ResourceTiming entries or duplicated encodedBodySize accounting.
  assert len({r['url'] for r in resource})==2,resource
  # Playwright route interception disables HTTP caching. Firefox's decode
  # revalidation therefore becomes a second 200 in this routed harness.
  # Ordinary uncached-browser profiling is collected separately without routes
  # and observes two 200 image bodies plus optional 304s, not four body loads.
  body_count=len([r for r in image_responses if r['status']==200])
  assert body_count in ([2,3,4] if args.engine=='firefox' else [2]),image_responses
  assert all(sum(r['url']==url and r['status']==200 for r in image_responses)<=2 for url in {r['url'] for r in image_responses}),image_responses
  assert all(r['status'] in [200,304] for r in image_responses),image_responses
  assert pg.locator('.portfolio-device-page[src]').count()==2
  rows.append({'check':'cold start fetches only Drake pair','viewport':[w,h],'images':resource,'responses':image_responses,'passed':True});save()
  # Real keyboard sequence follows visible mobile reading order: devices,
  # pause, primary CTA, secondary CTA. No duplicated hidden action set.
  pg.locator('[data-project=drake] .portfolio-device-link').focus();pg.keyboard.press('Tab');assert pg.locator('[data-project=drake] button').evaluate('(e)=>e===document.activeElement');pg.keyboard.press('Tab');assert pg.locator('.project-actions-0>a').first.evaluate('(e)=>e===document.activeElement');pg.keyboard.press('Tab');assert pg.locator('.project-actions-0>a').last.evaluate('(e)=>e===document.activeElement');pg.locator('h1').evaluate('(e)=>e.focus()')
  rows.append({'check':'keyboard order and named nonduplicated actions','viewport':[w,h],'passed':True});save()
  for i,id in enumerate(ids):
   box=pg.locator('.pin-spacer').bounding_box();start=box['y']+pg.evaluate('scrollY');pg.evaluate('(y)=>scrollTo(0,y)',start+(box['height']-h)*((i*9.3+4.9)/43));pg.wait_for_timeout(2700);pg.wait_for_function('(id)=>[...document.querySelectorAll(`[data-project="${id}"] img`)].every(e=>e.complete&&e.naturalWidth>0)',arg=id)
   row={'check':'balanced scene and bottom touch targets','id':id,'viewport':[w,h]};rows.append(row)
   try:
    row['geometry']=pg.locator(f'[data-project="{id}"]').evaluate('''(e)=>{const project=e.closest('.work-project'),copy=project.querySelector('.work-copy').getBoundingClientRect(),action=project.querySelector('.work-actions').getBoundingClientRect(),parts=['.portfolio-laptop-lid','.portfolio-laptop-base','.portfolio-laptop-front','.portfolio-phone','.portfolio-playback'].map(s=>e.querySelector(s).getBoundingClientRect()),buttons=[...project.querySelectorAll('.work-actions>a')].map(a=>{let r=a.getBoundingClientRect(),target=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {text:a.textContent.trim(),width:r.width,height:r.height,y:r.y,bottom:r.bottom,hit:target===a||a.contains(target),href:a.getAttribute('href')};});return {copy:copy.toJSON(),action:action.toJSON(),hardwareBottom:Math.max(...parts.map(r=>r.bottom)),buttons,topClearance:copy.top-document.querySelector('header').getBoundingClientRect().bottom,bottomClearance:innerHeight-action.bottom,active:getComputedStyle(project.querySelector('.work-actions')).opacity,overflow:document.documentElement.scrollWidth-innerWidth};}''')
    g=row['geometry'];assert g['active']=='1' and g['overflow']==0;assert len(g['buttons'])==2
    for button in g['buttons']:assert button['width']>=44 and button['height']>=44 and button['hit'],button
    if w<1024:
     assert g['action']['y']>=g['hardwareBottom']+6,g
     assert g['bottomClearance']>=60,g
     assert abs(g['topClearance']-g['bottomClearance'])<=(84 if h<=650 else 56),g
    assert g['copy']['y']>=64 and g['action']['bottom']<=h-1,g
    assert parse_qs(urlparse(g['buttons'][1]['href']).query)['request'],g
    action_boxes=pg.locator(f'.project-actions-{i}>a').evaluate_all('(a)=>a.map(e=>e.getBoundingClientRect().toJSON())')
    def clear_of_controls():
     for name in ['Back to top','Chat on WhatsApp']:
      control=pg.get_by_label(name,exact=True)
      if control.count() and control.is_visible() and control.evaluate('(e)=>Number(getComputedStyle(e).opacity)>.9'):
       box=control.bounding_box()
       for action in action_boxes:
        ox=max(0,min(action['right'],box['x']+box['width'])-max(action['left'],box['x']));oy=max(0,min(action['bottom'],box['y']+box['height'])-max(action['top'],box['y']));assert ox*oy==0,(name,action,box)
    clear_of_controls()
    top=pg.get_by_role('button',name='Back to top',exact=True)
    if top.is_visible() and top.evaluate('(e)=>Number(getComputedStyle(e).opacity)>.9'):
     top.hover();pg.wait_for_timeout(600);clear_of_controls();pg.mouse.move(1,1);pg.wait_for_timeout(600)
    pg.screenshot(path=str(out/f'{id}-{w}.png'))
    row['passed']=True
   except Exception as e:row['passed']=False;row['error']=str(e);pg.screenshot(path=str(out/f'failed-{id}-{w}.png'))
   save()
  # Real touch activation after returning to initial project, not only href inspection.
  pg.evaluate('scrollTo(0,0)');pg.wait_for_timeout(2800)
  with pg.expect_popup() as popup:pg.locator('.project-actions-0>a').first.tap()
  popup.value.wait_for_url('**thedrake-seaside.com/**');popup.value.close()
  pg.locator('.project-actions-0>a').last.tap();pg.wait_for_url('**/contact?request=Drake%20Seaside');assert parse_qs(urlparse(pg.url).query)['request']==['Drake Seaside']
  rows.append({'check':'real primary and enquiry touch activation','viewport':[w,h],'passed':True});save();assert not errors,errors;c.close()
 b.close()
summary={'engine':args.engine,'expected':48,'collected':len(rows),'passed':sum(row.get('passed',False) for row in rows)};(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary))
for row in rows:
 if not row.get('passed'):print('FAIL',row)
assert summary['expected']==summary['collected']==summary['passed']
