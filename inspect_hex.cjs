const fs=require("fs");
const m=fs.readFileSync('i18n/messages/ru.ts','utf8').match(/aboutImageAlt:[^\n\r]*/)[0];
console.log(m);
console.log(Buffer.from(m,'utf8').toString('hex'));
