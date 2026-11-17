import {build} from 'esbuild';
import {mkdir, copyFile} from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await build({entryPoints:['src/plugin.jsx'], outfile:'dist/plugin.js', bundle:true, format:'esm', target:'es2022', jsxFactory:'React.createElement', jsxFragment:'React.Fragment', loader:{'.css':'text'}, legalComments:'none'});
await copyFile('src/manifest.json','dist/manifest.json');
if (process.argv.includes('--preview')) await build({entryPoints:['tests/preview.jsx'], outfile:'tests/preview.js', bundle:true, format:'esm', jsx:'automatic', target:'es2022'});
