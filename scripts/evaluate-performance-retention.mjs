import fs from 'node:fs/promises';import path from 'node:path';import {evaluateArms,validateCompletion} from './performance-probe-v3.mjs';
// Explicit files avoid silently inheriting a historical completion/authority.
const [dir,inventoryPath,completionPath,outputPath]=process.argv.slice(2);
try{
 if(!dir||!inventoryPath||!completionPath||!outputPath)throw Error('usage: directory inventory.json completion.json NEW-output.json');
 const inventory=JSON.parse(await fs.readFile(inventoryPath,'utf8'));
 const names=(await fs.readdir(dir)).filter(n=>/^(mobile|desktop)-\d+-.*\.json$/.test(n)&&!n.endsWith('.trace.json'));
 const rows=await Promise.all(names.map(n=>fs.readFile(path.join(dir,n),'utf8').then(JSON.parse)));
 validateCompletion(JSON.parse(await fs.readFile(completionPath,'utf8')),rows,inventory);
 const result=evaluateArms(rows,inventory);await fs.writeFile(outputPath,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify(result.verdicts));if(result.pass!==true)process.exitCode=1;
}catch(error){console.error(String(error));process.exitCode=1;}
