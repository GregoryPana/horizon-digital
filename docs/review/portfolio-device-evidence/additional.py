"""Additional per-project link, focus, offscreen, palette and end-of-scroll checks."""
import json
from urllib.parse import urljoin
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path('/home/gpanagary/.hermes/cache/scratch/portfolio-device-qa');rows=[]
ids=['drake','horizon-auto','takamaka','forma','beauty']
with sync_playwright() as p:
 for engine in ['chromium','firefox']:
  b=getattr(p,engine).launch();c=b.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
  for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
  pg=c.new_page();pg.goto('http://127.0.0.1:4188/work',wait_until='networkidle')
  for i,id in enumerate(ids):
   text=pg.locator(f'.project-text-{i}');root=pg.locator(f'[data-project="{id}"]')
   text.scroll_into_view_if_needed();cta=text.locator('a').first;raw=cta.get_attribute('href');assert root.locator('a').get_attribute('href')==raw;expected=urljoin(pg.url,raw)
   with pg.expect_popup() as popup_info:root.locator('a').click()
   popup=popup_info.value;popup.wait_for_url(lambda url: url!='about:blank');popup.wait_for_load_state('domcontentloaded');print(engine,id,'destination',popup.url,flush=True);assert popup.url.startswith(expected.split('?')[0]),(expected,popup.url);assert popup.evaluate('window.opener===null');popup.close()
   rows.append({'engine':engine,'id':id,'check':'actual visual link opens target','url':expected,'passed':True})
   text.locator('a').nth(1).click();pg.wait_for_url('**/contact?request=*');assert pg.locator('h1').count()==1;pg.go_back(wait_until='networkidle');rows.append({'engine':engine,'id':id,'check':'request-similar and Back','passed':True})
  b.close()
 # Focus and inactive behavior in normal presentation, including Auto's selected palette.
 b=p.chromium.launch();c=b.new_context(viewport={'width':1440,'height':900},reduced_motion='no-preference');pg=c.new_page()
 c.route('**/*.googletagmanager.com/**',lambda r:r.fulfill(status=204,body=''))
 pg.goto('http://127.0.0.1:4188/work',wait_until='networkidle');pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")')
 def activate(i):
  box=pg.locator('.pin-spacer').bounding_box();y=box['y']+pg.evaluate('scrollY')-45+(box['height']-900)*((i*9.3+4.9)/43);pg.evaluate('(y)=>scrollTo(0,y)',y);pg.wait_for_timeout(2600)
 def ys(id):return pg.locator(f'[data-project="{id}"] img').evaluate_all('(a)=>a.map(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m42)')
 for i,id in enumerate(ids):
  activate(i);root=pg.locator(f'[data-project="{id}"]');root.locator('a').focus();before=ys(id);pg.wait_for_timeout(400);assert ys(id)==before;rows.append({'id':id,'engine':'chromium','check':'keyboard focus pauses both','passed':True});pg.locator('body').evaluate('(e)=>{document.activeElement.blur()}')
 activate(1)
 colour=pg.locator('[class*="project-text-1"]').evaluate('(e)=>getComputedStyle(e.parentElement.parentElement.previousElementSibling).backgroundColor')
 # The scene background is the preceding sibling of the presentation grid.
 assert colour=='rgba(72, 66, 58, 0.92)',colour
 rows.append({'id':'horizon-auto','engine':'chromium','check':'warm selected background','colour':colour,'passed':True})
 for id in ['drake','takamaka','forma','beauty']:
  before=ys(id);pg.wait_for_timeout(250);assert ys(id)==before;rows.append({'id':id,'engine':'chromium','check':'inactive playback stopped','passed':True})
 b.close()
assert len(rows)==30
(OUT/'additional.json').write_text(json.dumps(rows,indent=2));print({'expected':30,'collected':len(rows),'passed':sum(r['passed'] for r in rows)})
