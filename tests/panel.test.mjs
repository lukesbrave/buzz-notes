import {test} from 'node:test';
import assert from 'node:assert/strict';
import {apply,inject} from '../dist/plugin.js';
function activate(){
  const pages=[],panels=[],tools=[],instructions=[];
  const react={createElement:(type,props,...children)=>({type,props:{...props,children}})};
  apply({react,agents:{addTool:t=>tools.push(t),addInstructions:i=>instructions.push(i),relay(){}},pages:{register:p=>pages.push(p)},panels:{register:p=>panels.push(p)}});
  return {pages,panels,tools,instructions};
}
test('install bundle registers note tools and discovery instructions at activation',()=>{
  const {tools,instructions}=activate();
  assert.ok(inject.includes('agents'));assert.equal(tools.length,6);
  assert.equal(new Set(tools.map(t=>t.name)).size,6);
  assert.ok(tools.every(t=>t.name.startsWith('brave_notes_')&&t.inputSchema.type==='object'&&typeof t.call==='function'));
  assert.equal(instructions.length,1);assert.match(instructions[0].text,/brave_notes/);
});
test('notebook opens in a retained conversation tab without replacing chat navigation',()=>{
  const {pages,panels}=activate();
  assert.ok(inject.includes('panels'));
  assert.equal(panels.length,1);assert.equal(panels[0].channelPlacement,'tab');
  assert.equal(panels[0].keepOpen,true);
  assert.equal(pages[0].id,'main');assert.notEqual(pages[0].primary,true);
  assert.equal(pages[0].component,panels[0].component);
  assert.ok(panels[0].matches('bravebrand-notes:personal'));
  assert.equal(panels[0].matches('https://example.com'),false);
});
test('top launcher uses host toggle and rejects retired conversation bindings',()=>{
  const {panels}=activate();const calls=[];let active=true;
  const button=panels[0].channelLauncher({pressed:true,available:()=>active,toggle:target=>calls.push(target)});
  assert.equal(button.props['aria-expanded'],true);
  const event={currentTarget:{focus(){}}};
  button.props.onClick(event);active=false;button.props.onClick(event);
  assert.deepEqual(calls,['bravebrand-notes:personal']);
});
