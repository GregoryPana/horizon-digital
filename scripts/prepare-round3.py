from pathlib import Path
import json,hashlib,shutil,subprocess,os,tarfile
root=Path(__file__).resolve().parents[1];out=root/'docs/release-evidence/performance-remediation/round3';scratch=Path(os.environ['TMPDIR'])/'horizon-round3'
scratch.mkdir(exist_ok=True)
paths=sorted(set(subprocess.check_output(['git','ls-files'],cwd=root,text=True).splitlines()+[str(p.relative_to(root)) for d in ['src','public','scripts'] for p in (root/d).rglob('*') if p.is_file()]))
paths=[p for p in paths if not p.startswith(('docs/','.wrangler')) and (root/p).is_file()]
manifest={}
for arm in ['baseline','candidate']:
 dest=scratch/arm;dest.mkdir() # refuse overwrite
 for p in paths:
  (dest/p).parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/p,dest/p)
 if arm=='candidate':
  p=dest/'src/components/editorial-home/original-scenes.ts';s=p.read_text();old="filter: context.conditions.blur ? 'blur(10px)' : 'none',";assert s.count(old)==1;p.write_text(s.replace(old,"...(context.conditions.blur ? { filter: 'blur(10px)' } : {}),"))
 (dest/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
 source={p:hashlib.sha256((dest/p).read_bytes()).hexdigest() for p in paths}
 with tarfile.open(out/f'{arm}-source.tar.gz','w:gz') as tar:
  for p in paths:tar.add(dest/p,arcname=p)
 build=out/'builds'/arm
 with (out/f'build-{arm}.log').open('w') as log:subprocess.run([str(root/'node_modules/.bin/vite'),'build','--outDir',str(build)],cwd=dest,stdout=log,stderr=subprocess.STDOUT,check=True)
 output={str(p.relative_to(build)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(build.rglob('*')) if p.is_file()}
 config={'name':'horizon-round3-'+arm,'compatibility_date':'2026-02-21','main':str(dest/'src/worker.ts'),'assets':{'directory':str(build),'binding':'ASSETS','run_worker_first':True}}
 (out/f'wrangler-{arm}.json').write_text(json.dumps(config,indent=2));manifest[arm]={'sourceRoot':str(dest),'source':source,'output':output,'outputCount':len(output)};print(arm,len(output),flush=True)
assert [p for p in paths if manifest['baseline']['source'][p]!=manifest['candidate']['source'][p]]==['src/components/editorial-home/original-scenes.ts']
(out/'ARM-MANIFESTS.json').write_text(json.dumps(manifest,indent=2))
