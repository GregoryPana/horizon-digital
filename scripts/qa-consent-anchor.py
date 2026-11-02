"""Prove compact top anchor does not follow the legacy header-token correction."""
import argparse,json
from pathlib import Path
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--url',required=True);p.add_argument('--output',required=True);a=p.parse_args();rows=[]
with sync_playwright() as pw:
 b=pw.chromium.launch()
 for w,h in [(390,844),(768,1024),(1440,900)]:
  page=b.new_page(viewport={'width':w,'height':h});page.goto(a.url);page.wait_for_function("document.querySelector('[data-motion-ready]')")
  r=page.evaluate('''()=>{const root=document.documentElement,p=document.querySelector('#analytics-consent-panel'),previous=root.style.getPropertyValue('--header-height');root.style.setProperty('--header-height',innerWidth<=600?'64px':'72px');const first=p.getBoundingClientRect().top;root.style.setProperty('--header-height',innerWidth<=600?'76px':'88px');const final=p.getBoundingClientRect().top;previous?root.style.setProperty('--header-height',previous):root.style.removeProperty('--header-height');return {first,final,delta:final-first}}''');rows.append({'viewport':[w,h],**r});page.close()
 b.close()
Path(a.output).write_text(json.dumps({'pass':all(r['delta']==0 for r in rows),'rows':rows},indent=2));assert all(r['delta']==0 for r in rows),rows
