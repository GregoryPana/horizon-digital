from pathlib import Path
import json,collections,statistics
root=Path(__file__).resolve().parents[1];out=root/'docs/release-evidence/performance-remediation/round2/phone-isolation'
rows=[]
for p in sorted(out.glob('mobile-*.json')):
 if p.name.endswith('.trace.json'):continue
 r=json.loads(p.read_text());events=json.loads(p.with_name(p.stem+'.trace.json').read_text())['traceEvents'];marks={e['name']:e for e in events if e['name'].startswith('remediation-')};anchor=marks['remediation-scroll-start'];origin=anchor['ts']-r['perf']['marks']['scrollStart']*1000
 thread=[e for e in events if e.get('ph')=='X' and e.get('tid')==anchor['tid'] and e.get('pid')==anchor['pid'] and 'dur' in e]
 phases={'startup':(origin,anchor['ts']),'scroll':(anchor['ts'],marks['remediation-scroll-end']['ts']),'opening':(anchor['ts'],marks['remediation-opening-end']['ts'])}
 row={'key':r['key'],'arm':r['arm'],'phases':{}}
 for phase,(start,end) in phases.items():
  selected=[e for e in thread if start<=e['ts']<end]
  total=lambda name:sum(min(e['dur'],end-e['ts']) for e in selected if e['name']==name)/1000
  calls=collections.defaultdict(lambda:{'ms':0,'count':0})
  for e in selected:
   if e['name']!='FunctionCall':continue
   d=e.get('args',{}).get('data',{});key=(d.get('functionName',''),d.get('url',''),d.get('lineNumber'),d.get('columnNumber'));calls[key]['ms']+=e['dur']/1000;calls[key]['count']+=1
  frames=[e for e in selected if e['name']=='FunctionCall' and e.get('args',{}).get('data',{}).get('functionName')=='frame' and not e.get('args',{}).get('data',{}).get('url')]
  nested=[e for e in selected if e['name'] in ['Layout','UpdateLayoutTree'] and any(f['ts']<=e['ts'] and e['ts']+e['dur']<=f['ts']+f['dur'] for f in frames)]
  tasks=sorted((e for e in selected if e['name']=='RunTask'),key=lambda e:e['dur'],reverse=True)
  largest=tasks[0] if tasks else None
  largest_children=[e for e in selected if largest and e['name'] in ['Layout','UpdateLayoutTree','FunctionCall','EvaluateScript'] and e['ts']>=largest['ts'] and e['ts']+e['dur']<=largest['ts']+largest['dur']]
  row['phases'][phase]={'styleMs':total('UpdateLayoutTree'),'layoutMs':total('Layout'),'paintMs':total('Paint'),'functionCallInclusiveMs':total('FunctionCall'),'evaluateScriptMs':total('EvaluateScript'),'probeFrames':len(frames),'probeNestedLayoutCount':len(nested),'probeNestedLayoutMs':sum(e['dur'] for e in nested)/1000,'largestTaskMs':largest['dur']/1000 if largest else None,'largestTaskChildren':[{ 'name':e['name'],'ms':e['dur']/1000,'data':e.get('args',{}).get('data',{})} for e in sorted(largest_children,key=lambda e:e['dur'],reverse=True)[:8]],'topFunctionCalls':[{'function':key[0],'url':key[1],'line':key[2],'column':key[3],**v} for key,v in sorted(calls.items(),key=lambda x:x[1]['ms'],reverse=True)[:8]]}
 rows.append(row)
summary={}
for arm in ['baseline','consent','gutter','images','merged']:
 selected=[r for r in rows if r['arm']==arm];summary[arm]={}
 for phase in ['startup','scroll','opening']:
  summary[arm][phase]={}
  for key in ['styleMs','layoutMs','paintMs','functionCallInclusiveMs','evaluateScriptMs','largestTaskMs','probeNestedLayoutMs']:
   a=[r['phases'][phase][key] for r in selected];summary[arm][phase][key]={'median':statistics.median(a),'min':min(a),'max':max(a)}
result={'note':'Main renderer thread; phase by User Timing timestamps. FunctionCall inclusive costs overlap child style/layout: never sum as independent CPU buckets. Probe controls are separate synthetic fixtures.','expected':15,'count':len(rows),'rows':rows,'summary':summary}
assert len(rows)==15
assert all(r['phases']['startup']['probeNestedLayoutCount']==0 for r in rows)
(out/'trace-attribution.json').write_text(json.dumps(result,indent=2))
for arm,ph in summary.items():print(arm, {p:{k:round(v['median'],2) for k,v in vals.items()} for p,vals in ph.items()})
