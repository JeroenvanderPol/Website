const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function compile(path,deps={}){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,Response,TextDecoder,...deps});return exports;}
const schema=compile('lib/contact.ts');
const valid={name:'Test',phone:'',email:'test@example.com',subject:'',message:'Vraag',consent:true};
test('required fields reject whitespace and consent must be true',()=>{for(const field of ['name','email','message'])assert.ok(schema.validateContact({...valid,[field]:'   '}).errors[field]);assert.ok(schema.validateContact({...valid,consent:'true'}).errors.consent);});
test('each field enforces the exact length boundary',()=>{for(const field of ['name','phone','subject','message']){const n=field==='message'?1000:100;assert.ok(schema.validateContact({...valid,[field]:'a'.repeat(n)}).data);assert.ok(schema.validateContact({...valid,[field]:'a'.repeat(n+1)}).errors[field]);}for(const n of [100,101]){const r=schema.validateContact({...valid,email:'a'.repeat(n-6)+'@b.com'});assert.equal(!!r.data,n===100);}});
test('invalid email, unexpected types and header newlines are rejected',()=>{for(const email of ['invalid','a@b','a b@c.nl','a@b.nl\r\nBcc: x'])assert.ok(schema.validateContact({...valid,email}).errors.email);assert.ok(schema.validateContact({...valid,name:42}).errors.name);assert.ok(schema.validateContact(null).errors.name);});
const delivery=compile('lib/contact-delivery.ts');
const route=compile('app/api/contact/route.ts',{require:n=>n==='@/lib/contact'?schema:delivery}).POST;
function request(body,type='application/json'){return new Request('http://localhost/api/contact',{method:'POST',headers:{'Content-Type':type},body});}
test('valid request reaches no-op backend without claiming delivery',async()=>{const r=await route(request(JSON.stringify(valid)));assert.equal(r.status,503);assert.equal((await r.json()).status,'not-configured');assert.equal(r.headers.get('cache-control'),'no-store');});
test('API rejects invalid data, malformed JSON, wrong content type and oversized streams',async()=>{assert.equal((await route(request(JSON.stringify({...valid,message:'x'.repeat(1001)})))).status,400);assert.equal((await route(request('{'))).status,400);assert.equal((await route(request('{}','text/plain'))).status,415);assert.equal((await route(request('x'.repeat(17000)))).status,413);});
