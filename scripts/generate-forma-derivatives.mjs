// Same-capture width derivatives only. Originals remain restoration authority.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const rows=[];
for(const kind of ['scroll','poster']){
 const source=`public/editorial-home/work-forma-${kind}.webp`,input=await fs.readFile(source),metadata=await sharp(input).metadata();
 for(const width of [320,480,640,960]){
  const target=`public/editorial-home/work-forma-${kind}-${width}.webp`;
  await sharp(input).resize({width,withoutEnlargement:true,kernel:'lanczos3'}).webp({quality:90,effort:6}).toFile(target);
  const bytes=await fs.readFile(target),m=await sharp(bytes).metadata();rows.push({source,sourceSHA256:crypto.createHash('sha256').update(input).digest('hex'),sourceWidth:metadata.width,sourceHeight:metadata.height,target,width:m.width,height:m.height,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
 }
}
await fs.writeFile('docs/release-evidence/performance-remediation/forma-derivatives.json',JSON.stringify(rows,null,2));console.log(rows);
