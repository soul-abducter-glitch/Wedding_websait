const fs=require('fs');
const path='i18n/messages/ru.ts';
let text=fs.readFileSync(path,'utf8');
const before=text.match(/aboutImageAlt:[^\n\r]*/)[0];
text=text.replace(/aboutImageAlt:[^\n\r]*/, 'aboutImageAlt: "Фотограф за работой"');
const after=text.match(/aboutImageAlt:[^\n\r]*/)[0];
console.log('before:',before);
console.log('after:',after);
fs.writeFileSync(path,text,'utf8');
