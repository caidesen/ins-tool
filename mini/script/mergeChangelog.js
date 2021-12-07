const md = require('markdown-it');
const fs = require('fs');
const path = require('path');
const changelogContent = md().render(
  fs.readFileSync(path.join(__dirname, '..', 'CHANGELOG.md')).toString()
);
const sign = `

__changelog-content-scope__

`;
const mergedContent = fs
  .readFileSync(path.join(__dirname, '..', './src/pages/changelog/index.vue.template'))
  .toString()
  .replace(sign, `${changelogContent}`);
console.log(mergedContent);
fs.writeFileSync(path.join(__dirname, '..', './src/pages/changelog/index.vue'), mergedContent);
