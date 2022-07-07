var Wt=Object.defineProperty;var Kt=(t,e,r)=>e in t?Wt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var _e=(t,e,r)=>(Kt(t,typeof e!="symbol"?e+"":e,r),r);const Gt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=r(i);fetch(i.href,l)}};Gt();function M(){}const Pe=t=>t;function J(t,e){for(const r in e)t[r]=e[r];return t}function jt(t){return t()}function lt(){return Object.create(null)}function Z(t){t.forEach(jt)}function oe(t){return typeof t=="function"}function F(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Yt(t){return Object.keys(t).length===0}function We(t,...e){if(t==null)return M;const r=t.subscribe(...e);return r.unsubscribe?()=>r.unsubscribe():r}function Jt(t){let e;return We(t,r=>e=r)(),e}function K(t,e,r){t.$$.on_destroy.push(We(e,r))}function Ke(t,e,r,n){if(t){const i=Lt(t,e,r,n);return t[0](i)}}function Lt(t,e,r,n){return t[1]&&n?J(r.ctx.slice(),t[1](n(e))):r.ctx}function Ge(t,e,r,n){if(t[2]&&n){const i=t[2](n(r));if(e.dirty===void 0)return i;if(typeof i=="object"){const l=[],o=Math.max(e.dirty.length,i.length);for(let a=0;a<o;a+=1)l[a]=e.dirty[a]|i[a];return l}return e.dirty|i}return e.dirty}function Ye(t,e,r,n,i,l){if(i){const o=Lt(e,r,n,l);t.p(o,i)}}function Je(t){if(t.ctx.length>32){const e=[],r=t.ctx.length/32;for(let n=0;n<r;n++)e[n]=-1;return e}return-1}function De(t){const e={};for(const r in t)r[0]!=="$"&&(e[r]=t[r]);return e}function ot(t,e){const r={};e=new Set(e);for(const n in t)!e.has(n)&&n[0]!=="$"&&(r[n]=t[n]);return r}function ke(t){return t==null?"":t}function Qt(t){return t&&oe(t.destroy)?t.destroy:M}const Mt=typeof window!="undefined";let Qe=Mt?()=>window.performance.now():()=>Date.now(),Ze=Mt?t=>requestAnimationFrame(t):M;const re=new Set;function It(t){re.forEach(e=>{e.c(t)||(re.delete(e),e.f())}),re.size!==0&&Ze(It)}function Ve(t){let e;return re.size===0&&Ze(It),{promise:new Promise(r=>{re.add(e={c:t,f:r})}),abort(){re.delete(e)}}}function $(t,e){t.appendChild(e)}function Nt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Zt(t){const e=R("style");return Vt(Nt(t),e),e.sheet}function Vt(t,e){$(t.head||t,e)}function S(t,e,r){t.insertBefore(e,r||null)}function C(t){t.parentNode.removeChild(t)}function Xe(t,e){for(let r=0;r<t.length;r+=1)t[r]&&t[r].d(e)}function R(t){return document.createElement(t)}function W(t){return document.createTextNode(t)}function z(){return W(" ")}function V(){return W("")}function et(t,e,r,n){return t.addEventListener(e,r,n),()=>t.removeEventListener(e,r,n)}function O(t,e,r){r==null?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function we(t,e){const r=Object.getOwnPropertyDescriptors(t.__proto__);for(const n in e)e[n]==null?t.removeAttribute(n):n==="style"?t.style.cssText=e[n]:n==="__value"?t.value=t[n]=e[n]:r[n]&&r[n].set?t[n]=e[n]:O(t,n,e[n])}function Xt(t){return Array.from(t.childNodes)}function je(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ne(t,e,r){t.classList[r?"add":"remove"](e)}function At(t,e,{bubbles:r=!1,cancelable:n=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,r,n,e),i}const $e=new Map;let Re=0;function en(t){let e=5381,r=t.length;for(;r--;)e=(e<<5)-e^t.charCodeAt(r);return e>>>0}function tn(t,e){const r={stylesheet:Zt(e),rules:{}};return $e.set(t,r),r}function Ce(t,e,r,n,i,l,o,a=0){const s=16.666/n;let c=`{
`;for(let u=0;u<=1;u+=s){const h=e+(r-e)*l(u);c+=u*100+`%{${o(h,1-h)}}
`}const d=c+`100% {${o(r,1-r)}}
}`,f=`__svelte_${en(d)}_${a}`,p=Nt(t),{stylesheet:m,rules:g}=$e.get(p)||tn(p,t);g[f]||(g[f]=!0,m.insertRule(`@keyframes ${f} ${d}`,m.cssRules.length));const v=t.style.animation||"";return t.style.animation=`${v?`${v}, `:""}${f} ${n}ms linear ${i}ms 1 both`,Re+=1,f}function Se(t,e){const r=(t.style.animation||"").split(", "),n=r.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),i=r.length-n.length;i&&(t.style.animation=n.join(", "),Re-=i,Re||nn())}function nn(){Ze(()=>{Re||($e.forEach(t=>{const{stylesheet:e}=t;let r=e.cssRules.length;for(;r--;)e.deleteRule(r);t.rules={}}),$e.clear())})}let de;function ue(t){de=t}function me(){if(!de)throw new Error("Function called outside component initialization");return de}function Le(t){me().$$.on_mount.push(t)}function he(t){me().$$.on_destroy.push(t)}function rn(){const t=me();return(e,r,{cancelable:n=!1}={})=>{const i=t.$$.callbacks[e];if(i){const l=At(e,r,{cancelable:n});return i.slice().forEach(o=>{o.call(t,l)}),!l.defaultPrevented}return!0}}function ze(t,e){return me().$$.context.set(t,e),e}function ee(t){return me().$$.context.get(t)}function ln(t,e){const r=t.$$.callbacks[e.type];r&&r.slice().forEach(n=>n.call(this,e))}const ce=[],st=[],ye=[],at=[],on=Promise.resolve();let Fe=!1;function sn(){Fe||(Fe=!0,on.then(Dt))}function B(t){ye.push(t)}const Me=new Set;let be=0;function Dt(){const t=de;do{for(;be<ce.length;){const e=ce[be];be++,ue(e),an(e.$$)}for(ue(null),ce.length=0,be=0;st.length;)st.pop()();for(let e=0;e<ye.length;e+=1){const r=ye[e];Me.has(r)||(Me.add(r),r())}ye.length=0}while(ce.length);for(;at.length;)at.pop()();Fe=!1,Me.clear(),ue(t)}function an(t){if(t.fragment!==null){t.update(),Z(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}let ae;function tt(){return ae||(ae=Promise.resolve(),ae.then(()=>{ae=null})),ae}function X(t,e,r){t.dispatchEvent(At(`${e?"intro":"outro"}${r}`))}const ve=new Set;let U;function A(){U={r:0,c:[],p:U}}function D(){U.r||Z(U.c),U=U.p}function _(t,e){t&&t.i&&(ve.delete(t),t.i(e))}function y(t,e,r,n){if(t&&t.o){if(ve.has(t))return;ve.add(t),U.c.push(()=>{ve.delete(t),n&&(r&&t.d(1),n())}),t.o(e)}}const nt={duration:0};function Be(t,e,r){let n=e(t,r),i=!1,l,o,a=0;function s(){l&&Se(t,l)}function c(){const{delay:f=0,duration:p=300,easing:m=Pe,tick:g=M,css:v}=n||nt;v&&(l=Ce(t,0,1,p,f,m,v,a++)),g(0,1);const u=Qe()+f,h=u+p;o&&o.abort(),i=!0,B(()=>X(t,!0,"start")),o=Ve(x=>{if(i){if(x>=h)return g(1,0),X(t,!0,"end"),s(),i=!1;if(x>=u){const b=m((x-u)/p);g(b,1-b)}}return i})}let d=!1;return{start(){d||(d=!0,Se(t),oe(n)?(n=n(),tt().then(c)):c())},invalidate(){d=!1},end(){i&&(s(),i=!1)}}}function zt(t,e,r){let n=e(t,r),i=!0,l;const o=U;o.r+=1;function a(){const{delay:s=0,duration:c=300,easing:d=Pe,tick:f=M,css:p}=n||nt;p&&(l=Ce(t,1,0,c,s,d,p));const m=Qe()+s,g=m+c;B(()=>X(t,!1,"start")),Ve(v=>{if(i){if(v>=g)return f(0,1),X(t,!1,"end"),--o.r||Z(o.c),!1;if(v>=m){const u=d((v-m)/c);f(1-u,u)}}return i})}return oe(n)?tt().then(()=>{n=n(),a()}):a(),{end(s){s&&n.tick&&n.tick(1,0),i&&(l&&Se(t,l),i=!1)}}}function Q(t,e,r,n){let i=e(t,r),l=n?0:1,o=null,a=null,s=null;function c(){s&&Se(t,s)}function d(p,m){const g=p.b-l;return m*=Math.abs(g),{a:l,b:p.b,d:g,duration:m,start:p.start,end:p.start+m,group:p.group}}function f(p){const{delay:m=0,duration:g=300,easing:v=Pe,tick:u=M,css:h}=i||nt,x={start:Qe()+m,b:p};p||(x.group=U,U.r+=1),o||a?a=x:(h&&(c(),s=Ce(t,l,p,g,m,v,h)),p&&u(0,1),o=d(x,g),B(()=>X(t,p,"start")),Ve(b=>{if(a&&b>a.start&&(o=d(a,g),a=null,X(t,o.b,"start"),h&&(c(),s=Ce(t,l,o.b,o.duration,0,v,i.css))),o){if(b>=o.end)u(l=o.b,1-l),X(t,o.b,"end"),a||(o.b?c():--o.group.r||Z(o.group.c)),o=null;else if(b>=o.start){const w=b-o.start;l=o.a+o.d*v(w/o.duration),u(l,1-l)}}return!!(o||a)}))}return{run(p){oe(i)?tt().then(()=>{i=i(),f(p)}):f(p)},end(){c(),o=a=null}}}function cn(t,e){y(t,1,1,()=>{e.delete(t.key)})}function un(t,e,r,n,i,l,o,a,s,c,d,f){let p=t.length,m=l.length,g=p;const v={};for(;g--;)v[t[g].key]=g;const u=[],h=new Map,x=new Map;for(g=m;g--;){const k=f(i,l,g),E=r(k);let H=o.get(E);H?n&&H.p(k,e):(H=c(E,k),H.c()),h.set(E,u[g]=H),E in v&&x.set(E,Math.abs(g-v[E]))}const b=new Set,w=new Set;function P(k){_(k,1),k.m(a,d),o.set(k.key,k),d=k.first,m--}for(;p&&m;){const k=u[m-1],E=t[p-1],H=k.key,se=E.key;k===E?(d=k.first,p--,m--):h.has(se)?!o.has(H)||b.has(H)?P(k):w.has(se)?p--:x.get(H)>x.get(se)?(w.add(H),P(k)):(b.add(se),p--):(s(E,o),p--)}for(;p--;){const k=t[p];h.has(k.key)||s(k,o)}for(;m;)P(u[m-1]);return u}function rt(t,e){const r={},n={},i={$$scope:1};let l=t.length;for(;l--;){const o=t[l],a=e[l];if(a){for(const s in o)s in a||(n[s]=1);for(const s in a)i[s]||(r[s]=a[s],i[s]=1);t[l]=a}else for(const s in o)i[s]=1}for(const o in n)o in r||(r[o]=void 0);return r}function ct(t){return typeof t=="object"&&t!==null?t:{}}function I(t){t&&t.c()}function j(t,e,r,n){const{fragment:i,on_mount:l,on_destroy:o,after_update:a}=t.$$;i&&i.m(e,r),n||B(()=>{const s=l.map(jt).filter(oe);o?o.push(...s):Z(s),t.$$.on_mount=[]}),a.forEach(B)}function L(t,e){const r=t.$$;r.fragment!==null&&(Z(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function fn(t,e){t.$$.dirty[0]===-1&&(ce.push(t),sn(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function T(t,e,r,n,i,l,o,a=[-1]){const s=de;ue(t);const c=t.$$={fragment:null,ctx:null,props:l,update:M,not_equal:i,bound:lt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:lt(),dirty:a,skip_bound:!1,root:e.target||s.$$.root};o&&o(c.root);let d=!1;if(c.ctx=r?r(t,e.props||{},(f,p,...m)=>{const g=m.length?m[0]:p;return c.ctx&&i(c.ctx[f],c.ctx[f]=g)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](g),d&&fn(t,f)),p}):[],c.update(),d=!0,Z(c.before_update),c.fragment=n?n(c.ctx):!1,e.target){if(e.hydrate){const f=Xt(e.target);c.fragment&&c.fragment.l(f),f.forEach(C)}else c.fragment&&c.fragment.c();e.intro&&_(t.$$.fragment),j(t,e.target,e.anchor,e.customElement),Dt()}ue(s)}class q{$destroy(){L(this,1),this.$destroy=M}$on(e,r){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(r),()=>{const i=n.indexOf(r);i!==-1&&n.splice(i,1)}}$set(e){this.$$set&&!Yt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const dn=window.WEB_APP_BASE_URL,ie=window.WEB_APP_API_HOST,ut=ie.startsWith("https"),pn=ie.replace(ut?"https":"http",ut?"wss":"ws");class gn{constructor(e,r){_e(this,"wss");_e(this,"callbacks",{board:null,eat:null,participantRole:null,error:null,participantIn:null,participantOut:null,highlight:null,gameOver:null});_e(this,"callbacksOnMessage",{board:e=>(this.callbacks.board=e,this.callbacksOnMessage),eat:e=>(this.callbacks.eat=e,this.callbacksOnMessage),participantRole:e=>(this.callbacks.participantRole=e,this.callbacksOnMessage),error:e=>(this.callbacks.error=e,this.callbacksOnMessage),participantIn:e=>(this.callbacks.participantIn=e,this.callbacksOnMessage),participantOut:e=>(this.callbacks.participantOut=e,this.callbacksOnMessage),highlight:e=>(this.callbacks.highlight=e,this.callbacksOnMessage),gameOver:e=>(this.callbacks.gameOver=e,this.callbacksOnMessage)});this.wss=new WebSocket(`${pn}?roomId=${e}&userName=${r}`)}onEvents(){return this.wss.onmessage=({data:e})=>{var i,l;const{type:r,message:n}=this.parsePayload(e);(l=(i=this.callbacks)[r])==null||l.call(i,n)},this.callbacksOnMessage}onConnect(e){return this.wss.onopen=e,this.onEvents()}onClose(e){this.wss.onclose=e}sendEvent(e,r){this.wss.send(this.getPayload(e,r))}end(){this.wss.close()}parsePayload(e){return JSON.parse(e)}getPayload(e,r){return JSON.stringify({type:e,message:r})}}const te=[];function mn(t,e){return{subscribe:N(t,e).subscribe}}function N(t,e=M){let r;const n=new Set;function i(a){if(F(t,a)&&(t=a,r)){const s=!te.length;for(const c of n)c[1](),te.push(c,t);if(s){for(let c=0;c<te.length;c+=2)te[c][0](te[c+1]);te.length=0}}}function l(a){i(a(t))}function o(a,s=M){const c=[a,s];return n.add(c),n.size===1&&(r=e(i)||M),a(t),()=>{n.delete(c),n.size===0&&(r(),r=null)}}return{set:i,update:l,subscribe:o}}function hn(t,e,r){const n=!Array.isArray(t),i=n?[t]:t,l=e.length<2;return mn(r,o=>{let a=!1;const s=[];let c=0,d=M;const f=()=>{if(c)return;d();const m=e(n?s[0]:s,o);l?o(m):d=oe(m)?m:M},p=i.map((m,g)=>We(m,v=>{s[g]=v,c&=~(1<<g),a&&f()},()=>{c|=1<<g}));return a=!0,f(),function(){Z(p),d()}})}const pe=N(null);pe.subscribe(t=>console.log("err",t));const fe={error:N(null),eat:N(null),board:N([]),participantRole:N(null),participantIn:N(null),participantOut:N(null),highlight:N([]),gameOver:N(!1)},Ft=N(null);var Te=(t=>(t.Move="move",t.Highlight="highlight",t))(Te||{});function Bt(t){const e=t-1;return e*e*e+1}function G(t,{delay:e=0,duration:r=400,easing:n=Pe}={}){const i=+getComputedStyle(t).opacity;return{delay:e,duration:r,easing:n,css:l=>`opacity: ${l*i}`}}function le(t,{delay:e=0,duration:r=400,easing:n=Bt,x:i=0,y:l=0,opacity:o=0}={}){const a=getComputedStyle(t),s=+a.opacity,c=a.transform==="none"?"":a.transform,d=s*(1-o);return{delay:e,duration:r,easing:n,css:(f,p)=>`
			transform: ${c} translate(${(1-f)*i}px, ${(1-f)*l}px);
			opacity: ${s-d*p}`}}function _n(t,{delay:e=0,duration:r=400,easing:n=Bt,start:i=0,opacity:l=0}={}){const o=getComputedStyle(t),a=+o.opacity,s=o.transform==="none"?"":o.transform,c=1-i,d=a*(1-l);return{delay:e,duration:r,easing:n,css:(f,p)=>`
			transform: ${s} scale(${1-c*p});
			opacity: ${a-d*p}
		`}}function bn(t){let e,r,n,i,l;return{c(){e=R("div"),O(e,"class",r=ke(`figure ${t[0].color}`)+" svelte-yq1388")},m(o,a){S(o,e,a),l=!0},p(o,[a]){t=o,(!l||a&1&&r!==(r=ke(`figure ${t[0].color}`)+" svelte-yq1388"))&&O(e,"class",r)},i(o){l||(B(()=>{i&&i.end(1),n=Be(e,t[2],{delay:t[1]}),n.start()}),l=!0)},o(o){n&&n.invalidate(),i=zt(e,t[3],{delay:t[1]}),l=!1},d(o){o&&C(e),o&&i&&i.end()}}}function yn(t,e,r){let n,i,l,{figure:o}=e,{animDelay:a=0}=e,{isFirstRender:s=!0}=e;return t.$$set=c=>{"figure"in c&&r(0,o=c.figure),"animDelay"in c&&r(4,a=c.animDelay),"isFirstRender"in c&&r(5,s=c.isFirstRender)},t.$$.update=()=>{t.$$.dirty&32&&r(3,n=G),t.$$.dirty&32&&r(2,i=s?_n:G),t.$$.dirty&48&&r(1,l=s?500+a:0)},[o,l,i,n,a,s]}class it extends q{constructor(e){super(),T(this,e,yn,bn,F,{figure:0,animDelay:4,isFirstRender:5})}}function ft(t){let e,r;return e=new it({props:{figure:t[0].figure,animDelay:t[1],isFirstRender:t[2]}}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},p(n,i){const l={};i&1&&(l.figure=n[0].figure),i&2&&(l.animDelay=n[1]),i&4&&(l.isFirstRender=n[2]),e.$set(l)},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function vn(t){let e,r,n,i,l,o=t[0].figure&&ft(t);return{c(){e=R("div"),o&&o.c(),O(e,"class",r=ke(`cell ${t[0].color} d-flex center`)+" svelte-1schn10"),ne(e,"highlight",t[3])},m(a,s){S(a,e,s),o&&o.m(e,null),n=!0,i||(l=et(e,"click",t[4]),i=!0)},p(a,[s]){a[0].figure?o?(o.p(a,s),s&1&&_(o,1)):(o=ft(a),o.c(),_(o,1),o.m(e,null)):o&&(A(),y(o,1,1,()=>{o=null}),D()),(!n||s&1&&r!==(r=ke(`cell ${a[0].color} d-flex center`)+" svelte-1schn10"))&&O(e,"class",r),s&9&&ne(e,"highlight",a[3])},i(a){n||(_(o),n=!0)},o(a){y(o),n=!1},d(a){a&&C(e),o&&o.d(),i=!1,l()}}}function xn(t,e,r){let{cell:n}=e,{animFigureDelay:i=0}=e,{isFirstRender:l}=e,o=!1;const a=f=>f.findIndex(({col:p,row:m})=>p===n.col&&m===n.row)!==-1,s=fe.highlight.subscribe(f=>{r(3,o=a(f))}),c=(f,p)=>({[f]:{id:p.id}}),d=()=>{Ft.update(f=>f?f.from.id===n.id?null:a(Jt(fe.highlight))?{...f,...c("to",n)}:n.figure?c("from",n):null:c("from",n))};return he(()=>{s()}),t.$$set=f=>{"cell"in f&&r(0,n=f.cell),"animFigureDelay"in f&&r(1,i=f.animFigureDelay),"isFirstRender"in f&&r(2,l=f.isFirstRender)},[n,i,l,o,d]}class kn extends q{constructor(e){super(),T(this,e,xn,vn,F,{cell:0,animFigureDelay:1,isFirstRender:2})}}function dt(t,e,r){const n=t.slice();return n[7]=e[r],n[9]=r,n}function pt(t){let e,r=[],n=new Map,i,l,o=t[0];const a=s=>s[7].id;for(let s=0;s<o.length;s+=1){let c=dt(t,o,s),d=a(c);n.set(d,r[s]=gt(d,c))}return{c(){e=R("div");for(let s=0;s<r.length;s+=1)r[s].c();O(e,"class","board svelte-my1oz1")},m(s,c){S(s,e,c);for(let d=0;d<r.length;d+=1)r[d].m(e,null);l=!0},p(s,c){c&3&&(o=s[0],A(),r=un(r,c,a,1,s,o,n,e,cn,gt,null,dt),D())},i(s){if(!l){for(let c=0;c<o.length;c+=1)_(r[c]);B(()=>{i||(i=Q(e,le,{y:-100,duration:500},!0)),i.run(1)}),l=!0}},o(s){for(let c=0;c<r.length;c+=1)y(r[c]);i||(i=Q(e,le,{y:-100,duration:500},!1)),i.run(0),l=!1},d(s){s&&C(e);for(let c=0;c<r.length;c+=1)r[c].d();s&&i&&i.end()}}}function gt(t,e){let r,n,i;return n=new kn({props:{cell:e[7],animFigureDelay:e[9]*5,isFirstRender:e[1]}}),n.$on("unselect",e[5]),{key:t,first:null,c(){r=V(),I(n.$$.fragment),this.first=r},m(l,o){S(l,r,o),j(n,l,o),i=!0},p(l,o){e=l;const a={};o&1&&(a.cell=e[7]),o&1&&(a.animFigureDelay=e[9]*5),o&2&&(a.isFirstRender=e[1]),n.$set(a)},i(l){i||(_(n.$$.fragment,l),i=!0)},o(l){y(n.$$.fragment,l),i=!1},d(l){l&&C(r),L(n,l)}}}function wn(t){let e,r,n=t[2]&&pt(t);return{c(){n&&n.c(),e=V()},m(i,l){n&&n.m(i,l),S(i,e,l),r=!0},p(i,[l]){i[2]?n?(n.p(i,l),l&4&&_(n,1)):(n=pt(i),n.c(),_(n,1),n.m(e.parentNode,e)):n&&(A(),y(n,1,1,()=>{n=null}),D())},i(i){r||(_(n),r=!0)},o(i){y(n),r=!1},d(i){n&&n.d(i),i&&C(e)}}}function $n(t,e,r){let n,i,{cells:l=[]}=e,{highlightedCells:o=[]}=e,a=!0;Le(()=>{setTimeout(()=>{r(1,a=!1)},100)});function s(c){ln.call(this,t,c)}return t.$$set=c=>{"cells"in c&&r(3,l=c.cells),"highlightedCells"in c&&r(4,o=c.highlightedCells)},t.$$.update=()=>{t.$$.dirty&24&&r(0,n=l.map(c=>(o.find(({col:f,row:p})=>f===c.col&&p===c.row)&&(c={...c},c.isHighlight=!0),c))),t.$$.dirty&1&&r(2,i=n.length>0),t.$$.dirty&1&&console.log(n)},[n,a,i,l,o,s]}class Rn extends q{constructor(e){super(),T(this,e,$n,wn,F,{cells:3,highlightedCells:4})}}function mt(t){let e,r,n,i,l,o,a,s,c;return{c(){e=R("div"),r=R("div"),n=W("! "),i=W(t[0]),l=W(" !"),O(r,"class","msg svelte-1i1odkc"),O(e,"class","msg-wrapp svelte-1i1odkc")},m(d,f){S(d,e,f),$(e,r),$(r,n),$(r,i),$(r,l),c=!0},p(d,f){(!c||f&1)&&je(i,d[0])},i(d){c||(o||B(()=>{o=Be(r,G,{duration:100,delay:100}),o.start()}),B(()=>{s&&s.end(1),a=Be(e,G,{duration:100}),a.start()}),c=!0)},o(d){a&&a.invalidate(),s=zt(e,G,{duration:500}),c=!1},d(d){d&&C(e),d&&s&&s.end()}}}function Cn(t){let e,r,n=t[0]&&mt(t);return{c(){n&&n.c(),e=V()},m(i,l){n&&n.m(i,l),S(i,e,l),r=!0},p(i,[l]){i[0]?n?(n.p(i,l),l&1&&_(n,1)):(n=mt(i),n.c(),_(n,1),n.m(e.parentNode,e)):n&&(A(),y(n,1,1,()=>{n=null}),D())},i(i){r||(_(n),r=!0)},o(i){y(n),r=!1},d(i){n&&n.d(i),i&&C(e)}}}let Sn=1e3;function On(t,e,r){let n=null;const i=pe.subscribe(l=>{r(0,n=l),setTimeout(()=>{pe.set(null)},Sn)});return he(()=>{i()}),[n]}class En extends q{constructor(e){super(),T(this,e,On,Cn,F,{})}}function Pn(t){let e,r=[{class:"avatar"},t[1]],n={};for(let i=0;i<r.length;i+=1)n=J(n,r[i]);return{c(){e=R("div"),we(e,n),ne(e,"no-avatar",!t[0].photo_url),ne(e,"svelte-1iem2ua",!0)},m(i,l){S(i,e,l)},p(i,[l]){we(e,n=rt(r,[{class:"avatar"},l&2&&i[1]])),ne(e,"no-avatar",!i[0].photo_url),ne(e,"svelte-1iem2ua",!0)},i:M,o:M,d(i){i&&C(e)}}}function jn(t,e,r){let n,{user:i}=e;return t.$$set=l=>{"user"in l&&r(0,i=l.user)},t.$$.update=()=>{t.$$.dirty&1&&r(1,n=i.photo_url?{"style:backgroundImage":"url(user.photo_url)"}:{"data-letter":i.name[0]})},[i,n]}class Tt extends q{constructor(e){super(),T(this,e,jn,Pn,F,{user:0})}}const Y=N(!1);var qe=(t=>(t.Black="black",t.White="white",t.Watcher="watcher",t))(qe||{});function ht(t,e,r){const n=t.slice();return n[14]=e[r],n}function _t(t,e,r){const n=t.slice();return n[14]=e[r],n}function bt(t){let e,r,n,i=t[6]&&yt(t),l=t[5]&&xt(t);return{c(){e=R("div"),i&&i.c(),r=z(),l&&l.c(),O(e,"class","players-container d-flex space-between")},m(o,a){S(o,e,a),i&&i.m(e,null),$(e,r),l&&l.m(e,null),n=!0},p(o,a){o[6]?i?(i.p(o,a),a&64&&_(i,1)):(i=yt(o),i.c(),_(i,1),i.m(e,r)):i&&(A(),y(i,1,1,()=>{i=null}),D()),o[5]?l?(l.p(o,a),a&32&&_(l,1)):(l=xt(o),l.c(),_(l,1),l.m(e,null)):l&&(A(),y(l,1,1,()=>{l=null}),D())},i(o){n||(_(i),_(l),n=!0)},o(o){y(i),y(l),n=!1},d(o){o&&C(e),i&&i.d(),l&&l.d()}}}function yt(t){let e,r,n,i,l,o=t[6].name+"",a,s,c,d,f,p;n=new Tt({props:{user:t[6]}});let m=t[3],g=[];for(let u=0;u<m.length;u+=1)g[u]=vt(_t(t,m,u));const v=u=>y(g[u],1,1,()=>{g[u]=null});return{c(){e=R("div"),r=R("div"),I(n.$$.fragment),i=z(),l=R("div"),a=W(o),s=z(),c=R("br"),d=z();for(let u=0;u<g.length;u+=1)g[u].c();O(l,"class","name mx-2"),O(r,"class","d-flex y-center p-4"),O(e,"class","player-info")},m(u,h){S(u,e,h),$(e,r),j(n,r,null),$(r,i),$(r,l),$(l,a),$(e,s),$(e,c),$(e,d);for(let x=0;x<g.length;x+=1)g[x].m(e,null);p=!0},p(u,h){const x={};if(h&64&&(x.user=u[6]),n.$set(x),(!p||h&64)&&o!==(o=u[6].name+"")&&je(a,o),h&8){m=u[3];let b;for(b=0;b<m.length;b+=1){const w=_t(u,m,b);g[b]?(g[b].p(w,h),_(g[b],1)):(g[b]=vt(w),g[b].c(),_(g[b],1),g[b].m(e,null))}for(A(),b=m.length;b<g.length;b+=1)v(b);D()}},i(u){if(!p){_(n.$$.fragment,u);for(let h=0;h<m.length;h+=1)_(g[h]);B(()=>{f||(f=Q(e,le,{y:20,duration:500},!0)),f.run(1)}),p=!0}},o(u){y(n.$$.fragment,u),g=g.filter(Boolean);for(let h=0;h<g.length;h+=1)y(g[h]);f||(f=Q(e,le,{y:20,duration:500},!1)),f.run(0),p=!1},d(u){u&&C(e),L(n),Xe(g,u),u&&f&&f.end()}}}function vt(t){let e,r;return e=new it({props:{figure:t[14]}}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},p(n,i){const l={};i&8&&(l.figure=n[14]),e.$set(l)},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function xt(t){let e,r,n,i=t[5].name+"",l,o,a,s,c,d,f,p;a=new Tt({props:{user:t[5]}});let m=t[4],g=[];for(let u=0;u<m.length;u+=1)g[u]=kt(ht(t,m,u));const v=u=>y(g[u],1,1,()=>{g[u]=null});return{c(){e=R("div"),r=R("div"),n=R("div"),l=W(i),o=z(),I(a.$$.fragment),s=z(),c=R("br"),d=z();for(let u=0;u<g.length;u+=1)g[u].c();O(n,"class","name mx-2"),O(r,"class","d-flex y-center p-4 text-right"),O(e,"class","player-info")},m(u,h){S(u,e,h),$(e,r),$(r,n),$(n,l),$(r,o),j(a,r,null),$(e,s),$(e,c),$(e,d);for(let x=0;x<g.length;x+=1)g[x].m(e,null);p=!0},p(u,h){(!p||h&32)&&i!==(i=u[5].name+"")&&je(l,i);const x={};if(h&32&&(x.user=u[5]),a.$set(x),h&16){m=u[4];let b;for(b=0;b<m.length;b+=1){const w=ht(u,m,b);g[b]?(g[b].p(w,h),_(g[b],1)):(g[b]=kt(w),g[b].c(),_(g[b],1),g[b].m(e,null))}for(A(),b=m.length;b<g.length;b+=1)v(b);D()}},i(u){if(!p){_(a.$$.fragment,u);for(let h=0;h<m.length;h+=1)_(g[h]);B(()=>{f||(f=Q(e,le,{y:20,duration:500},!0)),f.run(1)}),p=!0}},o(u){y(a.$$.fragment,u),g=g.filter(Boolean);for(let h=0;h<g.length;h+=1)y(g[h]);f||(f=Q(e,le,{y:20,duration:500},!1)),f.run(0),p=!1},d(u){u&&C(e),L(a),Xe(g,u),u&&f&&f.end()}}}function kt(t){let e,r;return e=new it({props:{figure:t[14]}}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},p(n,i){const l={};i&16&&(l.figure=n[14]),e.$set(l)},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function Ln(t){let e,r,n,i,l,o,a,s,c,d;e=new En({}),o=new Rn({props:{cells:t[2],highlightedCells:t[7]}});let f=t[1]&&bt(t);return{c(){I(e.$$.fragment),r=z(),n=R("div"),i=R("div"),l=R("div"),I(o.$$.fragment),a=z(),f&&f.c(),O(l,"class","board-wrapp svelte-ez6xnd"),O(i,"class","board-container svelte-ez6xnd"),O(n,"class","h-100 w-100 d-flex column")},m(p,m){j(e,p,m),S(p,r,m),S(p,n,m),$(n,i),$(i,l),j(o,l,null),$(n,a),f&&f.m(n,null),s=!0,c||(d=Qt(t[0].call(null,n)),c=!0)},p(p,[m]){const g={};m&4&&(g.cells=p[2]),o.$set(g),p[1]?f?(f.p(p,m),m&2&&_(f,1)):(f=bt(p),f.c(),_(f,1),f.m(n,null)):f&&(A(),y(f,1,1,()=>{f=null}),D())},i(p){s||(_(e.$$.fragment,p),_(o.$$.fragment,p),_(f),s=!0)},o(p){y(e.$$.fragment,p),y(o.$$.fragment,p),y(f),s=!1},d(p){L(e,p),p&&C(r),p&&C(n),L(o),f&&f.d(),c=!1,d()}}}function Mn(t,e,r){let n,i,{roomId:l="Rhmw41bl55d02ae"}=e,{useLoading:o}=e,{username:a}=ee("user"),s,c=[],d=[],f=[],p=[],m,g;const v=async()=>{r(1,m=await fetch(`${ie}/api/room/${l}`).then(h=>h.json()))};Le(()=>{Y.set(!0),g=new gn(l,a),g.onConnect(async()=>{await v(),Y.set(!1)}).board(h=>{r(2,c=h),fe.highlight.set([])}).eat(({white:h,black:x})=>{h.length!==f.length&&r(3,f=h),x.length!==p.length&&r(4,p=x),console.log(h,x)}).participantRole(h=>{r(9,s=h)}).participantIn(()=>v()).participantOut(()=>v()).highlight(h=>{fe.highlight.set(h)}).error(h=>{pe.set(h)})});const u=Ft.subscribe(h=>{if(!m)return;if(!h){fe.highlight.set([]);return}console.log(h);const{from:x,to:b}=h;b?x&&b&&g.sendEvent(Te.Move,{from:x,to:b}):g.sendEvent(Te.Highlight,{from:x})});return he(()=>{u(),g.end()}),t.$$set=h=>{"roomId"in h&&r(8,l=h.roomId),"useLoading"in h&&r(0,o=h.useLoading)},t.$$.update=()=>{t.$$.dirty&514&&r(6,n=m&&m.players[s]),t.$$.dirty&514&&r(5,i=m&&m.players&&s===qe.Watcher?m.watchers.find(h=>h.name===a):s===qe.Black?m==null?void 0:m.players.white:m==null?void 0:m.players.black)},[o,m,c,f,p,i,n,d,l,s]}class In extends q{constructor(e){super(),T(this,e,Mn,Ln,F,{roomId:8,useLoading:0})}}const Oe={},Ee={};function Ie(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}function Nn(t,e){const r=[];let n=Ie(t);return{get location(){return n},listen(i){r.push(i);const l=()=>{n=Ie(t),i({location:n,action:"POP"})};return t.addEventListener("popstate",l),()=>{t.removeEventListener("popstate",l);const o=r.indexOf(i);r.splice(o,1)}},navigate(i,{state:l,replace:o=!1}={}){l={...l,key:Date.now()+""};try{o?t.history.replaceState(l,null,i):t.history.pushState(l,null,i)}catch{t.location[o?"replace":"assign"](i)}n=Ie(t),r.forEach(a=>a({location:n,action:"PUSH"}))}}}function An(t="/"){let e=0;const r=[{pathname:t,search:""}],n=[];return{get location(){return r[e]},addEventListener(i,l){},removeEventListener(i,l){},history:{get entries(){return r},get index(){return e},get state(){return n[e]},pushState(i,l,o){const[a,s=""]=o.split("?");e++,r.push({pathname:a,search:s}),n.push(i)},replaceState(i,l,o){const[a,s=""]=o.split("?");r[e]={pathname:a,search:s},n[e]=i}}}}const Dn=Boolean(typeof window!="undefined"&&window.document&&window.document.createElement),He=Nn(Dn?window:An()),{navigate:zn}=He,qt=/^:(.+)/,wt=4,Fn=3,Bn=2,Tn=1,qn=1;function Ue(t,e){return t.substr(0,e.length)===e}function Hn(t){return t===""}function Un(t){return qt.test(t)}function Ht(t){return t[0]==="*"}function ge(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function Ne(t){return t.replace(/(^\/+|\/+$)/g,"")}function Wn(t,e){const r=t.default?0:ge(t.path).reduce((n,i)=>(n+=wt,Hn(i)?n+=qn:Un(i)?n+=Bn:Ht(i)?n-=wt+Tn:n+=Fn,n),0);return{route:t,score:r,index:e}}function Kn(t){return t.map(Wn).sort((e,r)=>e.score<r.score?1:e.score>r.score?-1:e.index-r.index)}function Ut(t,e){let r,n;const[i]=e.split("?"),l=ge(i),o=l[0]==="",a=Kn(t);for(let s=0,c=a.length;s<c;s++){const d=a[s].route;let f=!1;if(d.default){n={route:d,params:{},uri:e};continue}const p=ge(d.path),m={},g=Math.max(l.length,p.length);let v=0;for(;v<g;v++){const u=p[v],h=l[v];if(u!==void 0&&Ht(u)){const b=u==="*"?"*":u.slice(1);m[b]=l.slice(v).map(decodeURIComponent).join("/");break}if(h===void 0){f=!0;break}let x=qt.exec(u);if(x&&!o){const b=decodeURIComponent(h);m[x[1]]=b}else if(u!==h){f=!0;break}}if(!f){r={route:d,params:m,uri:"/"+l.slice(0,v).join("/")};break}}return r||n||null}function Gn(t,e){return Ut([t],e)}function Ae(t,e){return t+(e?`?${e}`:"")}function Yn(t,e){if(Ue(t,"/"))return t;const[r,n]=t.split("?"),[i]=e.split("?"),l=ge(r),o=ge(i);if(l[0]==="")return Ae(i,n);if(!Ue(l[0],".")){const c=o.concat(l).join("/");return Ae((i==="/"?"":"/")+c,n)}const a=o.concat(l),s=[];return a.forEach(c=>{c===".."?s.pop():c!=="."&&s.push(c)}),Ae("/"+s.join("/"),n)}function $t(t,e){return`${Ne(e==="/"?t:`${Ne(t)}/${Ne(e)}`)}/`}function Jn(t){return!t.defaultPrevented&&t.button===0&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function Qn(t){let e;const r=t[9].default,n=Ke(r,t,t[8],null);return{c(){n&&n.c()},m(i,l){n&&n.m(i,l),e=!0},p(i,[l]){n&&n.p&&(!e||l&256)&&Ye(n,r,i,i[8],e?Ge(r,i[8],l,null):Je(i[8]),null)},i(i){e||(_(n,i),e=!0)},o(i){y(n,i),e=!1},d(i){n&&n.d(i)}}}function Zn(t,e,r){let n,i,l,{$$slots:o={},$$scope:a}=e,{basepath:s="/"}=e,{url:c=null}=e;const d=ee(Oe),f=ee(Ee),p=N([]);K(t,p,w=>r(6,i=w));const m=N(null);let g=!1;const v=d||N(c?{pathname:c}:He.location);K(t,v,w=>r(5,n=w));const u=f?f.routerBase:N({path:s,uri:s});K(t,u,w=>r(7,l=w));const h=hn([u,m],([w,P])=>{if(P===null)return w;const{path:k}=w,{route:E,uri:H}=P;return{path:E.default?k:E.path.replace(/\*.*$/,""),uri:H}});function x(w){const{path:P}=l;let{path:k}=w;if(w._path=k,w.path=$t(P,k),typeof window=="undefined"){if(g)return;const E=Gn(w,n.pathname);E&&(m.set(E),g=!0)}else p.update(E=>(E.push(w),E))}function b(w){p.update(P=>{const k=P.indexOf(w);return P.splice(k,1),P})}return d||(Le(()=>He.listen(P=>{v.set(P.location)})),ze(Oe,v)),ze(Ee,{activeRoute:m,base:u,routerBase:h,registerRoute:x,unregisterRoute:b}),t.$$set=w=>{"basepath"in w&&r(3,s=w.basepath),"url"in w&&r(4,c=w.url),"$$scope"in w&&r(8,a=w.$$scope)},t.$$.update=()=>{if(t.$$.dirty&128){const{path:w}=l;p.update(P=>(P.forEach(k=>k.path=$t(w,k._path)),P))}if(t.$$.dirty&96){const w=Ut(i,n.pathname);m.set(w)}},[p,v,u,s,c,n,i,l,a,o]}class Vn extends q{constructor(e){super(),T(this,e,Zn,Qn,F,{basepath:3,url:4})}}const Xn=t=>({params:t&4,location:t&16}),Rt=t=>({params:t[2],location:t[4]});function Ct(t){let e,r,n,i;const l=[tr,er],o=[];function a(s,c){return s[0]!==null?0:1}return e=a(t),r=o[e]=l[e](t),{c(){r.c(),n=V()},m(s,c){o[e].m(s,c),S(s,n,c),i=!0},p(s,c){let d=e;e=a(s),e===d?o[e].p(s,c):(A(),y(o[d],1,1,()=>{o[d]=null}),D(),r=o[e],r?r.p(s,c):(r=o[e]=l[e](s),r.c()),_(r,1),r.m(n.parentNode,n))},i(s){i||(_(r),i=!0)},o(s){y(r),i=!1},d(s){o[e].d(s),s&&C(n)}}}function er(t){let e;const r=t[10].default,n=Ke(r,t,t[9],Rt);return{c(){n&&n.c()},m(i,l){n&&n.m(i,l),e=!0},p(i,l){n&&n.p&&(!e||l&532)&&Ye(n,r,i,i[9],e?Ge(r,i[9],l,Xn):Je(i[9]),Rt)},i(i){e||(_(n,i),e=!0)},o(i){y(n,i),e=!1},d(i){n&&n.d(i)}}}function tr(t){let e,r,n;const i=[{location:t[4]},t[2],t[3]];var l=t[0];function o(a){let s={};for(let c=0;c<i.length;c+=1)s=J(s,i[c]);return{props:s}}return l&&(e=new l(o())),{c(){e&&I(e.$$.fragment),r=V()},m(a,s){e&&j(e,a,s),S(a,r,s),n=!0},p(a,s){const c=s&28?rt(i,[s&16&&{location:a[4]},s&4&&ct(a[2]),s&8&&ct(a[3])]):{};if(l!==(l=a[0])){if(e){A();const d=e;y(d.$$.fragment,1,0,()=>{L(d,1)}),D()}l?(e=new l(o()),I(e.$$.fragment),_(e.$$.fragment,1),j(e,r.parentNode,r)):e=null}else l&&e.$set(c)},i(a){n||(e&&_(e.$$.fragment,a),n=!0)},o(a){e&&y(e.$$.fragment,a),n=!1},d(a){a&&C(r),e&&L(e,a)}}}function nr(t){let e,r,n=t[1]!==null&&t[1].route===t[7]&&Ct(t);return{c(){n&&n.c(),e=V()},m(i,l){n&&n.m(i,l),S(i,e,l),r=!0},p(i,[l]){i[1]!==null&&i[1].route===i[7]?n?(n.p(i,l),l&2&&_(n,1)):(n=Ct(i),n.c(),_(n,1),n.m(e.parentNode,e)):n&&(A(),y(n,1,1,()=>{n=null}),D())},i(i){r||(_(n),r=!0)},o(i){y(n),r=!1},d(i){n&&n.d(i),i&&C(e)}}}function rr(t,e,r){let n,i,{$$slots:l={},$$scope:o}=e,{path:a=""}=e,{component:s=null}=e;const{registerRoute:c,unregisterRoute:d,activeRoute:f}=ee(Ee);K(t,f,u=>r(1,n=u));const p=ee(Oe);K(t,p,u=>r(4,i=u));const m={path:a,default:a===""};let g={},v={};return c(m),typeof window!="undefined"&&he(()=>{d(m)}),t.$$set=u=>{r(13,e=J(J({},e),De(u))),"path"in u&&r(8,a=u.path),"component"in u&&r(0,s=u.component),"$$scope"in u&&r(9,o=u.$$scope)},t.$$.update=()=>{t.$$.dirty&2&&n&&n.route===m&&r(2,g=n.params);{const{path:u,component:h,...x}=e;r(3,v=x)}},e=De(e),[s,n,g,v,i,f,p,m,a,o,l]}class St extends q{constructor(e){super(),T(this,e,rr,nr,F,{path:8,component:0})}}function ir(t){let e,r,n,i;const l=t[16].default,o=Ke(l,t,t[15],null);let a=[{href:t[0]},{"aria-current":t[2]},t[1],t[6]],s={};for(let c=0;c<a.length;c+=1)s=J(s,a[c]);return{c(){e=R("a"),o&&o.c(),we(e,s)},m(c,d){S(c,e,d),o&&o.m(e,null),r=!0,n||(i=et(e,"click",t[5]),n=!0)},p(c,[d]){o&&o.p&&(!r||d&32768)&&Ye(o,l,c,c[15],r?Ge(l,c[15],d,null):Je(c[15]),null),we(e,s=rt(a,[(!r||d&1)&&{href:c[0]},(!r||d&4)&&{"aria-current":c[2]},d&2&&c[1],d&64&&c[6]]))},i(c){r||(_(o,c),r=!0)},o(c){y(o,c),r=!1},d(c){c&&C(e),o&&o.d(c),n=!1,i()}}}function lr(t,e,r){let n;const i=["to","replace","state","getProps"];let l=ot(e,i),o,a,{$$slots:s={},$$scope:c}=e,{to:d="#"}=e,{replace:f=!1}=e,{state:p={}}=e,{getProps:m=()=>({})}=e;const{base:g}=ee(Ee);K(t,g,k=>r(14,a=k));const v=ee(Oe);K(t,v,k=>r(13,o=k));const u=rn();let h,x,b,w;function P(k){if(u("click",k),Jn(k)){k.preventDefault();const E=o.pathname===h||f;zn(h,{state:p,replace:E})}}return t.$$set=k=>{e=J(J({},e),De(k)),r(6,l=ot(e,i)),"to"in k&&r(7,d=k.to),"replace"in k&&r(8,f=k.replace),"state"in k&&r(9,p=k.state),"getProps"in k&&r(10,m=k.getProps),"$$scope"in k&&r(15,c=k.$$scope)},t.$$.update=()=>{t.$$.dirty&16512&&r(0,h=d==="/"?a.uri:Yn(d,a.uri)),t.$$.dirty&8193&&r(11,x=Ue(o.pathname,h)),t.$$.dirty&8193&&r(12,b=h===o.pathname),t.$$.dirty&4096&&r(2,n=b?"page":void 0),t.$$.dirty&15361&&r(1,w=m({location:o,href:h,isPartiallyCurrent:x,isCurrent:b}))},[h,w,n,g,v,P,l,d,f,p,m,x,b,o,a,c,s]}class or extends q{constructor(e){super(),T(this,e,lr,ir,F,{to:7,replace:8,state:9,getProps:10})}}function Ot(t){let e,r,n;return{c(){e=R("div"),e.innerHTML=`<div class="spinner-wrapp d-flex center svelte-upyxi7"></div> 
    <svg class="spinner svelte-upyxi7" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.4625 20.5C40.3116 20.5 41.006 21.1893 40.9424 22.0361C40.6784 25.5496 39.5122 28.9452 37.5451 31.8892C35.2926 35.2604 32.0909 37.8879 28.345 39.4395C24.5991 40.9911 20.4773 41.3971 16.5006 40.6061C12.524 39.8151 8.87129 37.8627 6.00431 34.9957C3.13733 32.1287 1.1849 28.476 0.393902 24.4994C-0.397095 20.5227 0.00887314 16.4009 1.56047 12.655C3.11207 8.9091 5.7396 5.70744 9.11081 3.45487C12.0548 1.48777 15.4504 0.321606 18.9639 0.0576201C19.8107 -0.00600024 20.5 0.688362 20.5 1.5375C20.5 2.38664 19.8103 3.06795 18.9644 3.14278C16.0599 3.39972 13.2573 4.38254 10.8192 6.01164C7.95366 7.92632 5.72026 10.6477 4.4014 13.8317C3.08254 17.0157 2.73747 20.5193 3.40982 23.8994C4.08216 27.2796 5.74173 30.3844 8.17866 32.8213C10.6156 35.2583 13.7204 36.9178 17.1006 37.5902C20.4807 38.2625 23.9843 37.9175 27.1683 36.5986C30.3523 35.2797 33.0737 33.0463 34.9884 30.1808C36.6175 27.7427 37.6003 24.9401 37.8572 22.0356C37.932 21.1897 38.6134 20.5 39.4625 20.5Z" fill="#6B7278" class="svelte-upyxi7"></path></svg>`,O(e,"class","spinner-bg d-flex center svelte-upyxi7")},m(i,l){S(i,e,l),n=!0},i(i){n||(B(()=>{r||(r=Q(e,G,{},!0)),r.run(1)}),n=!0)},o(i){r||(r=Q(e,G,{},!1)),r.run(0),n=!1},d(i){i&&C(e),i&&r&&r.end()}}}function sr(t){let e,r,n=t[0]&&Ot();return{c(){n&&n.c(),e=V()},m(i,l){n&&n.m(i,l),S(i,e,l),r=!0},p(i,[l]){i[0]?n?l&1&&_(n,1):(n=Ot(),n.c(),_(n,1),n.m(e.parentNode,e)):n&&(A(),y(n,1,1,()=>{n=null}),D())},i(i){r||(_(n),r=!0)},o(i){y(n),r=!1},d(i){n&&n.d(i),i&&C(e)}}}function ar(t,e,r){let n=!1;const i=Y.subscribe(l=>{r(0,n=l)});return he(()=>{i()}),[n]}class cr extends q{constructor(e){super(),T(this,e,ar,sr,F,{})}}var xe=(t=>(t.users="/api/users",t.rooms="/api/rooms",t.createRoom="/api/room",t))(xe||{});function ur(t){let e;return{c(){e=W("Play")},m(r,n){S(r,e,n)},d(r){r&&C(e)}}}function fr(t){let e,r,n,i=t[0].id+"",l,o,a,s;return a=new or({props:{to:"./game/"+t[0].id,class:"btn medium h-100 mr-4",$$slots:{default:[ur]},$$scope:{ctx:t}}}),{c(){e=R("div"),r=R("div"),n=R("span"),l=W(i),o=z(),I(a.$$.fragment),O(n,"class","headline"),O(r,"class","room-info pl-4 d-flex space-between y-center svelte-17jgl3g"),O(e,"class","room d-flex svelte-17jgl3g")},m(c,d){S(c,e,d),$(e,r),$(r,n),$(n,l),$(r,o),j(a,r,null),s=!0},p(c,[d]){(!s||d&1)&&i!==(i=c[0].id+"")&&je(l,i);const f={};d&1&&(f.to="./game/"+c[0].id),d&2&&(f.$$scope={dirty:d,ctx:c}),a.$set(f)},i(c){s||(_(a.$$.fragment,c),s=!0)},o(c){y(a.$$.fragment,c),s=!1},d(c){c&&C(e),L(a)}}}function dr(t,e,r){let{room:n}=e;return t.$$set=i=>{"room"in i&&r(0,n=i.room)},[n]}class pr extends q{constructor(e){super(),T(this,e,dr,fr,F,{room:0})}}function Et(t,e,r){const n=t.slice();return n[6]=e[r],n}function gr(t){let e;return{c(){e=R("div"),e.innerHTML='<div class="text my-5 svelte-jw8n2v">No rooms</div>',O(e,"class","wrapp py-5 text-center svelte-jw8n2v")},m(r,n){S(r,e,n)},p:M,i:M,o:M,d(r){r&&C(e)}}}function mr(t){let e,r,n=t[0],i=[];for(let o=0;o<n.length;o+=1)i[o]=Pt(Et(t,n,o));const l=o=>y(i[o],1,1,()=>{i[o]=null});return{c(){for(let o=0;o<i.length;o+=1)i[o].c();e=V()},m(o,a){for(let s=0;s<i.length;s+=1)i[s].m(o,a);S(o,e,a),r=!0},p(o,a){if(a&1){n=o[0];let s;for(s=0;s<n.length;s+=1){const c=Et(o,n,s);i[s]?(i[s].p(c,a),_(i[s],1)):(i[s]=Pt(c),i[s].c(),_(i[s],1),i[s].m(e.parentNode,e))}for(A(),s=n.length;s<i.length;s+=1)l(s);D()}},i(o){if(!r){for(let a=0;a<n.length;a+=1)_(i[a]);r=!0}},o(o){i=i.filter(Boolean);for(let a=0;a<i.length;a+=1)y(i[a]);r=!1},d(o){Xe(i,o),o&&C(e)}}}function Pt(t){let e,r;return e=new pr({props:{room:t[6]}}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},p(n,i){const l={};i&1&&(l.room=n[6]),e.$set(l)},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function hr(t){let e,r,n,i,l,o,a,s,c,d,f,p;const m=[mr,gr],g=[];function v(u,h){return u[1]?0:1}return i=v(t),l=g[i]=m[i](t),{c(){e=R("h3"),e.textContent="Rooms:",r=z(),n=R("div"),l.c(),o=z(),a=R("div"),s=R("button"),c=W("Create room"),O(e,"class","px-2 title text-left"),O(s,"class","btn large outlined"),s.disabled=t[2],O(a,"class","text-center my-5"),O(n,"class","rooms-list mt-2")},m(u,h){S(u,e,h),S(u,r,h),S(u,n,h),g[i].m(n,null),$(n,o),$(n,a),$(a,s),$(s,c),d=!0,f||(p=et(s,"click",t[3]),f=!0)},p(u,[h]){let x=i;i=v(u),i===x?g[i].p(u,h):(A(),y(g[x],1,1,()=>{g[x]=null}),D(),l=g[i],l?l.p(u,h):(l=g[i]=m[i](u),l.c()),_(l,1),l.m(n,o)),(!d||h&4)&&(s.disabled=u[2])},i(u){d||(_(l),d=!0)},o(u){y(l),d=!1},d(u){u&&C(e),u&&C(r),u&&C(n),g[i].d(),f=!1,p()}}}function _r(t,e,r){let n,i;K(t,Y,c=>r(4,i=c));let l=[],o=!1;const a=async()=>{console.log("here",ie+xe.rooms);const d=await(await fetch(ie+xe.rooms)).json();console.log("here"),r(0,l=d),r(1,o=l.length>0)};Le(async()=>{await a()});const s=async()=>{Y.set(!0);try{const c=await fetch(ie+xe.createRoom,{method:"POST"}).then(d=>d.json());console.log(c),c&&await a(),Y.set(!1)}catch{pe.set("Something went wrong")}};return t.$$.update=()=>{t.$$.dirty&17&&r(2,n=l.length===0&&i)},[l,o,n,s,i]}class br extends q{constructor(e){super(),T(this,e,_r,hr,F,{})}}function yr(t){let e,r;return e=new In({props:{roomId:t[1].id,useLoading:t[0]}}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},p(n,i){const l={};i&2&&(l.roomId=n[1].id),e.$set(l)},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function vr(t){let e,r;return e=new br({}),{c(){I(e.$$.fragment)},m(n,i){j(e,n,i),r=!0},i(n){r||(_(e.$$.fragment,n),r=!0)},o(n){y(e.$$.fragment,n),r=!1},d(n){L(e,n)}}}function xr(t){let e,r,n,i;return e=new St({props:{path:"/game/:id",$$slots:{default:[yr,({params:l})=>({1:l}),({params:l})=>l?2:0]},$$scope:{ctx:t}}}),n=new St({props:{$$slots:{default:[vr]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),r=z(),I(n.$$.fragment)},m(l,o){j(e,l,o),S(l,r,o),j(n,l,o),i=!0},p(l,o){const a={};o&6&&(a.$$scope={dirty:o,ctx:l}),e.$set(a);const s={};o&4&&(s.$$scope={dirty:o,ctx:l}),n.$set(s)},i(l){i||(_(e.$$.fragment,l),_(n.$$.fragment,l),i=!0)},o(l){y(e.$$.fragment,l),y(n.$$.fragment,l),i=!1},d(l){L(e,l),l&&C(r),L(n,l)}}}function kr(t){let e,r,n,i,l;return e=new cr({}),i=new Vn({props:{basepath:dn,$$slots:{default:[xr]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),r=z(),n=R("main"),I(i.$$.fragment),O(n,"class","main svelte-1gwloq6")},m(o,a){j(e,o,a),S(o,r,a),S(o,n,a),j(i,n,null),l=!0},p(o,[a]){const s={};a&4&&(s.$$scope={dirty:a,ctx:o}),i.$set(s)},i(o){l||(_(e.$$.fragment,o),_(i.$$.fragment,o),l=!0)},o(o){y(e.$$.fragment,o),y(i.$$.fragment,o),l=!1},d(o){L(e,o),o&&C(r),o&&C(n),L(i)}}}function wr(t){var r,n;return ze("user",(n=(r=window.Telegram.WebApp.initDataUnsafe)==null?void 0:r.user)!=null?n:{username:prompt("username","serg"),id:Date.now(),first_name:"Serg",last_name:"",language_code:"en"}),[()=>(Y.set(!1),()=>({destroy(){Y.set(!0)}}))]}class $r extends q{constructor(e){super(),T(this,e,wr,kr,F,{})}}new $r({target:document.getElementById("app")});
