const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function compile(path,deps={}){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,Response,TextDecoder,...deps});return exports;}
const schema=compile('lib/contact.ts');
const valid={name:'Test',phone:'',email:'test@example.com',subject:'',message:'Vraag',privacyAcknowledged:true,website:''};
test('required fields reject whitespace and privacy acknowledgment must be true',()=>{for(const field of ['name','email','message'])assert.ok(schema.validateContact({...valid,[field]:'   '}).errors[field]);assert.ok(schema.validateContact({...valid,privacyAcknowledged:false}).errors.privacyAcknowledged);});
test('each field enforces the exact length boundary',()=>{for(const field of ['name','phone','subject','message']){const n=field==='message'?1000:100;assert.ok(schema.validateContact({...valid,[field]:'a'.repeat(n)}).data);assert.ok(schema.validateContact({...valid,[field]:'a'.repeat(n+1)}).errors[field]);}for(const n of [100,101]){const r=schema.validateContact({...valid,email:'a'.repeat(n-6)+'@b.com'});assert.equal(!!r.data,n===100);}});
test('invalid email, unexpected types and header newlines are rejected',()=>{for(const email of ['invalid','a@b','a b@c.nl','a@b.nl\r\nBcc: x'])assert.ok(schema.validateContact({...valid,email}).errors.email);assert.ok(schema.validateContact({...valid,name:42}).errors.name);assert.ok(schema.validateContact(null).errors.name);});
const env={STRATO_SMTP_HOST:'smtp.example.test',STRATO_SMTP_PORT:'465',STRATO_SMTP_SECURE:'true',STRATO_SMTP_USER:'info@example.test',STRATO_SMTP_PASS:'secret',STRATO_SMTP_FROM:'info@example.test'};
const sentMessages=[];
let sendFailure;
let transportOptions;
const nodemailerMock={createTransport(options){transportOptions=options;return{sendMail:async message=>{sentMessages.push(message);if(sendFailure)throw sendFailure;return{messageId:'accepted'};}};}};
const delivery=compile('lib/contact-delivery.ts',{process:{env},require:n=>n==='nodemailer'?{__esModule:true,default:nodemailerMock}:n==='../data/business.json'?{default:{email:'info@vandevoortgrondwerken.nl'}}:require(n)});
let routeDeliveryCalls=0;
const routeDelivery={deliverContactMessage:async()=>{routeDeliveryCalls++;return{status:'not-configured'};}};
const route=compile('app/api/contact/route.ts',{require:n=>n==='@/lib/contact'?schema:routeDelivery}).POST;
function request(body,type='application/json'){return new Request('http://localhost/api/contact',{method:'POST',headers:{'Content-Type':type},body});}
test('missing SMTP configuration does not claim delivery',async()=>{const unconfigured=compile('lib/contact-delivery.ts',{process:{env:{}},require:n=>n==='nodemailer'?{__esModule:true,default:nodemailerMock}:n==='../data/business.json'?{default:{email:'info@vandevoortgrondwerken.nl'}}:require(n)});assert.equal((await unconfigured.deliverContactMessage(valid)).status,'not-configured');});
test('Strato SMTP delivery routes mail to the business inbox and uses visitor email only as Reply-To',async()=>{const result=await delivery.deliverContactMessage(valid);assert.equal(result.status,'sent');assert.equal(transportOptions.host,'smtp.example.test');assert.equal(transportOptions.port,465);assert.equal(transportOptions.secure,true);assert.equal(transportOptions.requireTLS,false);assert.equal(sentMessages[0].from,'info@example.test');assert.equal(sentMessages[0].to,'info@vandevoortgrondwerken.nl');assert.equal(sentMessages[0].replyTo,valid.email);assert.equal(sentMessages[0].text.includes(valid.email),false);});
test('SMTP rejection is unavailable and does not claim delivery',async()=>{sendFailure=new Error('private SMTP error');assert.equal((await delivery.deliverContactMessage(valid)).status,'unavailable');sendFailure=undefined;});
test('API rejects missing, non-string and filled honeypot values before delivery',async()=>{const calls=routeDeliveryCalls;for(const website of [undefined,null,42,'https://spam.example']){const payload={...valid};if(website===undefined)delete payload.website;else payload.website=website;const r=await route(request(JSON.stringify(payload)));assert.equal(r.status,400);}assert.equal(routeDeliveryCalls,calls);});
test('valid request without configured delivery returns 503',async()=>{const r=await route(request(JSON.stringify(valid)));assert.equal(r.status,503);assert.equal((await r.json()).status,'not-configured');assert.equal(r.headers.get('cache-control'),'no-store');});
test('API maps delivery failures and thrown SMTP errors to 503',async()=>{routeDelivery.deliverContactMessage=async()=>({status:'unavailable'});let r=await route(request(JSON.stringify(valid)));assert.equal(r.status,503);assert.equal((await r.json()).status,'unavailable');routeDelivery.deliverContactMessage=async()=>{throw new Error('private SMTP error');};r=await route(request(JSON.stringify(valid)));assert.equal(r.status,503);assert.equal((await r.json()).status,'unavailable');});
test('API rejects invalid data, malformed JSON, wrong content type and oversized streams',async()=>{assert.equal((await route(request(JSON.stringify({...valid,message:'x'.repeat(1001)})))).status,400);assert.equal((await route(request('{'))).status,400);assert.equal((await route(request('{}','text/plain'))).status,415);assert.equal((await route(request('x'.repeat(17000)))).status,413);});
