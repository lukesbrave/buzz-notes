import {build} from 'esbuild';
import {mkdir, copyFile, readFile} from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await build({entryPoints:['src/plugin.jsx'], outfile:'dist/plugin.js', bundle:true, format:'esm', target:'es2022', jsxFactory:'React.createElement', jsxFragment:'React.Fragment', loader:{'.css':'text'}, minify:true, legalComments:'none', banner:{js:'/*!\n'+(await readFile('THIRD-PARTY-NOTICES.txt','utf8')).replaceAll('*/','* /')+'\n*/'}});
await copyFile('src/manifest.json','dist/manifest.json');
if (process.argv.includes('--preview')) await build({entryPoints:['tests/preview.jsx'], outfile:'tests/preview.js', bundle:true, format:'esm', jsx:'automatic', target:'es2022'});
