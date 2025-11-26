const fs=require('fs');
[{
  path:'i18n/messages/en.ts',
  translation:'Photographer at work'
},{
  path:'i18n/messages/ru.ts',
  translation:'Фотограф за работой'
}].forEach(({path,translation})=>{
  let text=fs.readFileSync(path,'utf8');
  const pattern=/([ \t]+aboutImageAlt: ".*?",)(\r?\n)([ \t]*})(\r?\n[ \t]*forWhom)/s;
  if(!pattern.test(text)) throw new Error(path+' pattern not found');
  text=text.replace(pattern,(match,p1,newline,closing,rest)=>{
    return closing+newline+'    aboutImageAlt: "'+translation+'",'+newline+rest;
  });
  fs.writeFileSync(path,text,'utf8');
});
