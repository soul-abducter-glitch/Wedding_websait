const fs = require('fs');
const text = fs.readFileSync('i18n/messages/ru.ts','utf8');
const match = text.match(/aboutImageAlt: "(.*?)"/);
console.log(match && match[1]);
