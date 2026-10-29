"""Real-browser performance gates for portfolio previews. No mocked visibility/IO.
Run native hidden-tab test under Xvfb: DISPLAY=:97 python ... --hidden-tabs.
Playwright focus emulation is bypassed for native visibility via CDP no_defaults.
"""
import argparse,json,subprocess,tempfile,time,os
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://127.0.0.1:4188');parser.add_argument('--engine',choices=['chromium','firefox'],default='chromium');parser.add_argument('--output',required=True);parser.add_argument('--hidden-tabs',action='store_true');args=parser.parse_args()
out=Path(args.output);out.mkdir(parents=True,exist_ok=True);results=[]
ids=['drake','horizon-auto','takamaka','forma','beauty']
def save(): (out/'report.json').write_text(json.dumps(results,indent=2))
def block(c):
 for pattern in ['**/*.googletagmanager.com/**','**/*.google-analytics.com/**','**/cdn-cgi/rum*','**/cloudflareinsights.com/**']:c.route(pattern,lambda r:r.fulfill(status=204,body=''))
def snapshot(pg):
 return pg.locator('.portfolio-devices').evaluate_all('(a)=>a.map(e=>({id:e.dataset.project,state:e.dataset.playback,reason:e.dataset.pauseReason,phase:e.dataset.phase,cycles:e.dataset.cycles,images:[...e.querySelectorAll(".portfolio-device-page")].map(i=>getComputedStyle(i).transform)}))')
def activate(pg,i,w,h):
 box=pg.locator('.pin-spacer').bounding_box();start=box['y']+pg.evaluate('scrollY');pg.evaluate('(y)=>scrollTo(0,y)',start+(box['height']-h)*((i*9.3+4.9)/43));pg.wait_for_timeout(2600);pg.mouse.move(1,1)
 pg.wait_for_function('(id)=>document.querySelector(`[data-project="${id}"]`).dataset.playback==="playing"',arg=ids[i])
def unchanged(pg,id,ms=650):
 a=next(x for x in snapshot(pg) if x['id']==id);pg.wait_for_timeout(ms);b=next(x for x in snapshot(pg) if x['id']==id);assert a==b,(a,b);return b
def load(pg):
 response=pg.goto(args.base+'/work',wait_until='networkidle');assert response and response.status==200
 pg.locator('img').evaluate_all('(a)=>a.forEach(i=>i.loading="eager")');pg.wait_for_function('Array.from(document.images).filter(i=>i.hasAttribute("src")).every(i=>i.complete&&i.naturalWidth>0)')
with sync_playwright() as p:
 if args.hidden_tabs:
  assert args.engine=='chromium'
  with tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR','/home/gpanagary/.hermes/cache/scratch')) as profile:
   proc=subprocess.Popen([p.chromium.executable_path,'--no-sandbox','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
   try:
    portfile=Path(profile)/'DevToolsActivePort'
    for _ in range(100):
     if portfile.exists():break
     time.sleep(.1)
    browser=p.chromium.connect_over_cdp('http://127.0.0.1:'+portfile.read_text().splitlines()[0],no_defaults=True)
    context=browser.contexts[0];block(context);pg=context.pages[0];pg.set_viewport_size({'width':1440,'height':900});load(pg)
    with pg.expect_popup() as popup:pg.evaluate('window.open("about:blank","_blank")')
    other=popup.value
    for i,id in enumerate(ids):
     pg.bring_to_front();pg.wait_for_function('!document.hidden');activate(pg,i,1440,900)
     pg.wait_for_function('(id)=>[...document.querySelectorAll(`[data-project="${id}"] .portfolio-device-page`)].every(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m42 < -1)',arg=id,timeout=6000)
     other.bring_to_front();pg.wait_for_function('document.hidden && document.visibilityState==="hidden"');pg.wait_for_function('(id)=>document.querySelector(`[data-project="${id}"]`).dataset.pauseReason==="hidden-tab"',arg=id)
     frozen=unchanged(pg,id,900);all_before=snapshot(pg);pg.wait_for_timeout(500);assert snapshot(pg)==all_before
     pg.bring_to_front();pg.wait_for_function('!document.hidden');pg.mouse.move(1,1);pg.wait_for_function('(id)=>document.querySelector(`[data-project="${id}"]`).dataset.playback==="playing"',arg=id);pg.wait_for_function('(data)=>[...document.querySelectorAll(`[data-project="${data.id}"] .portfolio-device-page`)].some((e,i)=>getComputedStyle(e).transform!==data.images[i])',arg=frozen,timeout=5000);resumed=next(x for x in snapshot(pg) if x['id']==id);assert resumed['images']!=frozen['images']
     results.append({'id':id,'check':'native hidden tab freezes all previews and foreground resumes','documentHiddenObserved':True,'frozen':frozen,'resumed':resumed,'passed':True});save()
    browser.close()
   finally:
    if proc.poll() is None:proc.terminate();proc.wait(timeout=10)
  expected=5
 else:
  browser=getattr(p,args.engine).launch()
  for w,h in [(390,844),(1440,900)]:
   context=browser.new_context(viewport={'width':w,'height':h});block(context);pg=context.new_page();load(pg)
   for i,id in enumerate(ids):
    activate(pg,i,w,h)
    others=[x for x in snapshot(pg) if x['id']!=id];assert all(x['state']=='paused' and x['reason']=='inactive' for x in others),others
    pg.wait_for_timeout(500);assert [x for x in snapshot(pg) if x['id']!=id]==others
    results.append({'id':id,'viewport':[w,h],'check':'four inactive previews frozen','passed':True});save()
    # The page now starts inside Drake, so scrollY=0 is deliberately visible,
    # not an offscreen region above the portfolio. Prove the new initial contract.
    pg.evaluate('scrollTo(0,0)');pg.wait_for_timeout(2800);before=snapshot(pg)
    first=next(x for x in before if x['id']=='drake');assert first['state']=='playing',first
    others=[x for x in before if x['id']!='drake'];assert all(x['state']=='paused' and x['reason']=='inactive' for x in others)
    pg.wait_for_function('(data)=>[...document.querySelectorAll("[data-project=drake] .portfolio-device-page")].some((e,i)=>getComputedStyle(e).transform!==data.images[i])',arg=first,timeout=5000)
    assert [x for x in snapshot(pg) if x['id']!='drake']==others
    results.append({'id':id,'viewport':[w,h],'check':'top of page Drake visible/playing and four inactive previews frozen','passed':True});save()
    activate(pg,i,w,h);a=next(x for x in snapshot(pg) if x['id']==id);pg.wait_for_timeout(700);b=next(x for x in snapshot(pg) if x['id']==id);assert a['images']!=b['images'],(a,b)
    results.append({'id':id,'viewport':[w,h],'check':'visible reentry resumes without recreation','passed':True});save()
    pg.evaluate('scrollTo(0,document.documentElement.scrollHeight)');pg.wait_for_timeout(2800);before=snapshot(pg);assert all(x['state']=='paused' for x in before),before
    pg.wait_for_timeout(700);assert snapshot(pg)==before
    results.append({'id':id,'viewport':[w,h],'check':'below portfolio all screen transforms/phases/cycles frozen','passed':True});save()
   context.close()
  browser.close();expected=40
summary={'engine':args.engine,'nativeHiddenTabs':args.hidden_tabs,'expected':expected,'collected':len(results),'passed':sum(r['passed'] for r in results)};(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary));assert summary['expected']==summary['collected']==summary['passed']
