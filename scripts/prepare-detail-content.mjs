import fs from 'node:fs';
const s=fs.readFileSync(process.argv[2],'utf8').replace(/\r/g,'');
const pages=s.split(/#{10,}\s*PAGE \d+ — [^\n]+\s*#{10,}/).slice(1);
const paras=t=>t.trim().split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean), after=(t,k)=>t.slice(t.indexOf(k)+k.length).trim(), cut=t=>t.split(/\n(?:DESIGN:|VISUAL DIRECTION:|Use the established|Use accordion|Give this section|Use three visually|Make these two)/)[0].trim(), bullets=t=>[...t.matchAll(/^• (.+)$/gm)].map(m=>m[1]);
const out=pages.map((p,i)=>{
 const parts=p.split(/={10,}\s*([^\n]+)\s*={10,}/),sec={};for(let j=1;j<parts.length;j+=2)sec[parts[j].trim()]=parts[j+1].trim();
 const keys=Object.keys(sec), hero=Object.values(sec)[0];
 const d={id:['banking','golden-visa-residency','investment-real-estate','family-protection-succession'][i],kind:['banking','residency','investment','family'][i],label:['Banking','Golden Visa & Residency','Investment & Real Estate','Family Protection & Succession'][i],number:`0${i+2}`,heading:['Prepare for UAE Banking with Greater Clarity.','Structure Your UAE Residency with Purpose.','Invest with a Wider Perspective.','Protect What You Build. Plan What Comes Next.'][i],intro:paras(cut(after(hero,'INTRODUCTION:')))};
 d.help=bullets(sec[i===3?'HOW GLOWBIZ SUPPORTS THIS AREA':'WHAT GLOWBIZ HELPS WITH']);
 d.faqs=cut(sec[keys.find(k=>k.includes('FAQs'))]).split(/FAQ \d+/).slice(1).map(f=>{const pp=paras(f);return {question:pp[0],answer:pp.slice(1)}});
 const c=sec[keys.find(k=>k.endsWith('CTA'))];d.cta=after(c,'Heading:').split('BUTTON:')[0].trim();d.button=after(c,'BUTTON:').split('Destination:')[0].trim().replace(' →','');
 if(i!==1)d.solutions=cut(sec[['BANKING SERVICES','','RELATED SOLUTIONS','KEY PLANNING AREAS'][i]]).split(/(?:^|\n)0\d — /).slice(1).map(ch=>{const pp=paras(ch);return {title:pp[0],paragraphs:pp.slice(1)}});
 if(i===0)d.documents=bullets(sec['TYPICAL DOCUMENTATION AREAS']);
 if(i===1){d.service=paras(cut(after(sec['VISA & RESIDENCY SERVICES'],'CONTENT:')));const t=sec['WHY SERIOUS INVESTORS CHOOSE THE UAE GOLDEN VISA'];d.benefitIntro=after(t,'INTRODUCTION:').split('KEY BENEFITS:')[0].trim();d.benefits=cut(after(t,'KEY BENEFITS:')).split(/(?:^|\n)0\d\n/).slice(1).map(ch=>{const pp=paras(ch);return {title:pp[0],text:pp[1]}})}
 if(i===2){d.considerations=bullets(sec['KEY CONSIDERATIONS']);d.returns=paras(cut(after(sec['RETURN EXPECTATIONS'],'CONTENT:')))}
 if(i===3)d.support=['WILLS, SUCCESSION & LEGACY SUPPORT','INVESTMENT & INSURANCE COORDINATION'].map(k=>({title:k.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()),paragraphs:paras(cut(after(sec[k],'CONTENT:')))}));
 return d;
});fs.writeFileSync('src/service-detail-data.json',JSON.stringify(out,null,2));console.log(out.map(d=>[d.id,d.faqs.length,d.solutions?.length,d.benefits?.length]));
