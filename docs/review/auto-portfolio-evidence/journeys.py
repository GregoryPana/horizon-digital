import json
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('/home/gpanagary/.hermes/cache/scratch/auto-portfolio')
results=[]
with sync_playwright() as p:
 for engine in ['chromium','firefox']:
  b=getattr(p,engine).launch()
  c=b.new_context(viewport={'width':1280,'height':900},reduced_motion='reduce')
  for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**']:
   c.route(pattern,lambda route:route.fulfill(status=204,body=''))
  pg=c.new_page();pg.goto('http://127.0.0.1:4188/work',wait_until='networkidle')
  text=pg.locator('.project-text-4');text.scroll_into_view_if_needed()
  for kind,link in [('text CTA',text.get_by_role('link',name='View demo',exact=True)),('visual link',pg.get_by_role('link',name='View Horizon Auto project',exact=True))]:
   with pg.expect_popup() as popup_info:link.click()
   popup=popup_info.value;popup.wait_for_load_state('networkidle');assert popup.url=='https://auto.horizondigitalsey.com/';assert popup.locator('h1').inner_text()=='The Corvane range.';assert popup.evaluate('window.opener === null');results.append({'engine':engine,'check':kind,'destination':popup.url,'passed':True});popup.close()
  text.get_by_role('link',name='Request similar site').click();pg.wait_for_url('**/contact?request=Horizon%20Auto');assert pg.locator('h1').count()==1;results.append({'engine':engine,'check':'request-similar contact navigation','url':pg.url,'passed':True})
  pg.go_back(wait_until='networkidle');assert pg.locator('.project-text-4 h2').inner_text()=='Horizon Auto';results.append({'engine':engine,'check':'Back restores portfolio','passed':True})
  for route in ['/','/pricing','/services','/contact']:
   response=pg.goto('http://127.0.0.1:4188'+route,wait_until='networkidle');assert response.status==200;assert pg.locator('h1').count()==1;assert pg.locator('meta[name="robots"]').get_attribute('content')!='noindex, nofollow';results.append({'engine':engine,'check':'unrelated route smoke','route':route,'h1':pg.locator('h1').inner_text(),'passed':True})
  b.close()
assert len(results)==16
(out/'journeys.json').write_text(json.dumps(results,indent=2));print(json.dumps({'expected':16,'collected':len(results),'passed':sum(r['passed'] for r in results)}))
