from pathlib import Path
import subprocess,json,hashlib,shutil,tarfile,io,os
root=Path('/home/gpanagary/projects/horizon-digital-performance-remediation');os.chdir(root)
out=root/'docs/release-evidence/performance-remediation/round2';scratch=Path(os.environ['TMPDIR'])/'horizon-round2-isolation';scratch.mkdir(exist_ok=True)
base='c0b14be2f30074e4a476f3dc03dbc194e1166e5c'
slices={'baseline':[],'consent':['src/components/AnalyticsConsent.tsx','src/styles/analytics-consent.css'],'gutter':['src/index.css','src/components/editorial-home/editorial-home.css'],'images':['src/components/editorial-home/content.ts','src/components/editorial-home/original-scenes.ts','src/components/editorial-home/runtime.ts']}
slices['merged']=sorted(set(sum(slices.values(),[])))
derivatives=sorted(str(p.relative_to(root)) for p in (root/'public/editorial-home').glob('work-forma-*-*.webp'))
assert len(derivatives)==8
manifest={}
for arm,paths in slices.items():
 dest=scratch/arm
 if dest.exists():raise RuntimeError('refuse overwrite '+str(dest))
 dest.mkdir()
 with tarfile.open(fileobj=io.BytesIO(subprocess.check_output(['git','archive',base]))) as tar:tar.extractall(dest,filter='data')
 shutil.copytree(root/'public',dest/'public',dirs_exist_ok=True)
 if arm not in ['images','merged']:
  for p in derivatives:(dest/p).unlink()
 else:paths=paths+derivatives
 for p in paths:shutil.copy2(root/p,dest/p)
 (dest/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
 source={str(p.relative_to(dest)):hashlib.sha256(p.read_bytes()).hexdigest() for top in ['src','public','scripts'] for p in (dest/top).rglob('*') if p.is_file()}
 for name in ['package.json','package-lock.json','vite.config.ts','index.html']:
  source[name]=hashlib.sha256((dest/name).read_bytes()).hexdigest()
 build=out/'builds'/arm;build.parent.mkdir(exist_ok=True)
 with (out/f'build-{arm}.log').open('w') as log:
  subprocess.run([str(root/'node_modules/.bin/vite'),'build','--outDir',str(build)],cwd=dest,stdout=log,stderr=subprocess.STDOUT,check=True)
 output={str(p.relative_to(build)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(build.rglob('*')) if p.is_file()}
 config={'name':'horizon-round2-'+arm,'compatibility_date':'2026-02-21','main':str(dest/'src/worker.ts'),'assets':{'directory':str(build),'binding':'ASSETS','run_worker_first':True}}
 (out/f'wrangler-{arm}.json').write_text(json.dumps(config,indent=2))
 manifest[arm]={'base':base,'deltaPaths':paths,'sourceRoot':str(dest),'source':source,'build':output,'outputCount':len(output)}
 print(arm,len(output),flush=True)
old={str(p.relative_to(root/'review-performance-baseline-dist')):hashlib.sha256(p.read_bytes()).hexdigest() for p in (root/'review-performance-baseline-dist').rglob('*') if p.is_file()}
assert manifest['baseline']['build']==old,'baseline137 reproduction mismatch'
(out/'ARM-MANIFESTS.json').write_text(json.dumps(manifest,indent=2))
configs={a:str(out/f'wrangler-{a}.json') for a in slices};(out/'configs.json').write_text(json.dumps(configs,indent=2))
