import Re from"https://esm.sh/msgroom@nightly";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=window,Lt=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,jt=Symbol(),Kt=new WeakMap;let ge=class{constructor(r,t,e){if(this._$cssResult$=!0,e!==jt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t}get styleSheet(){let r=this.o;const t=this.t;if(Lt&&r===void 0){const e=t!==void 0&&t.length===1;e&&(r=Kt.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&Kt.set(t,r))}return r}toString(){return this.cssText}};const fe=r=>new ge(typeof r=="string"?r:r+"",void 0,jt),g=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ge(e,r,jt)},Le=(r,t)=>{Lt?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=st.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)})},Jt=Lt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return fe(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t;const rt=window,Zt=rt.trustedTypes,je=Zt?Zt.emptyScript:"",Ft=rt.reactiveElementPolyfillSupport,Ot={toAttribute(r,t){switch(t){case Boolean:r=r?je:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},me=(r,t)=>t!==r&&(t==t||r==r),gt={attribute:!0,type:String,converter:Ot,reflect:!1,hasChanged:me},Ut="finalized";let O=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=gt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||gt}static finalize(){if(this.hasOwnProperty(Ut))return!1;this[Ut]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Jt(i))}else t!==void 0&&e.push(Jt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Le(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=gt){var i;const n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){const o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:Ot).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=i.getPropertyOptions(n),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:Ot;this._$El=n,this[n]=h.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||me)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,n)=>this[n]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdate)===null||n===void 0?void 0:n.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};O[Ut]=!0,O.elementProperties=new Map,O.elementStyles=[],O.shadowRootOptions={mode:"open"},Ft==null||Ft({ReactiveElement:O}),(($t=rt.reactiveElementVersions)!==null&&$t!==void 0?$t:rt.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft;const nt=window,N=nt.trustedTypes,Gt=N?N.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ht="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,_e="?"+y,ze=`<${_e}>`,C=document,V=()=>C.createComment(""),W=r=>r===null||typeof r!="object"&&typeof r!="function",ye=Array.isArray,De=r=>ye(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",mt=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qt=/-->/g,Xt=/>/g,b=RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yt=/'/g,te=/"/g,Ae=/^(?:script|style|textarea|title)$/i,Ie=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),X=Ie(1),T=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ee=new WeakMap,S=C.createTreeWalker(C,129,null,!1);function be(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gt!==void 0?Gt.createHTML(t):t}const Be=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=I;for(let h=0;h<e;h++){const l=r[h];let a,c,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,c=o.exec(l),c!==null);)u=o.lastIndex,o===I?c[1]==="!--"?o=Qt:c[1]!==void 0?o=Xt:c[2]!==void 0?(Ae.test(c[2])&&(i=RegExp("</"+c[2],"g")),o=b):c[3]!==void 0&&(o=b):o===b?c[0]===">"?(o=i??I,d=-1):c[1]===void 0?d=-2:(d=o.lastIndex-c[2].length,a=c[1],o=c[3]===void 0?b:c[3]==='"'?te:Yt):o===te||o===Yt?o=b:o===Qt||o===Xt?o=I:(o=b,i=void 0);const p=o===b&&r[h+1].startsWith("/>")?" ":"";n+=o===I?l+ze:d>=0?(s.push(a),l.slice(0,d)+Ht+l.slice(d)+y+p):l+y+(d===-2?(s.push(void 0),h):p)}return[be(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const h=t.length-1,l=this.parts,[a,c]=Be(t,e);if(this.el=q.createElement(a,s),S.currentNode=this.el.content,e===2){const d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=S.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes()){const d=[];for(const u of i.getAttributeNames())if(u.endsWith(Ht)||u.startsWith(y)){const p=c[o++];if(d.push(u),p!==void 0){const vt=i.getAttribute(p.toLowerCase()+Ht).split(y),m=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:m[2],strings:vt,ctor:m[1]==="."?We:m[1]==="?"?Ke:m[1]==="@"?Je:ct})}else l.push({type:6,index:n})}for(const u of d)i.removeAttribute(u)}if(Ae.test(i.tagName)){const d=i.textContent.split(y),u=d.length-1;if(u>0){i.textContent=N?N.emptyScript:"";for(let p=0;p<u;p++)i.append(d[p],V()),S.nextNode(),l.push({type:2,index:++n});i.append(d[u],V())}}}else if(i.nodeType===8)if(i.data===_e)l.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(y,d+1))!==-1;)l.push({type:7,index:n}),d+=y.length-1}n++}}static createElement(t,e){const s=C.createElement("template");return s.innerHTML=t,s}}function M(r,t,e=r,s){var i,n,o,h;if(t===T)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const a=W(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,s)),s!==void 0?((o=(h=e)._$Co)!==null&&o!==void 0?o:h._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=M(r,l._$AS(r,t.values),l,s)),t}class Ve{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:C).importNode(s,!0);S.currentNode=n;let o=S.nextNode(),h=0,l=0,a=i[0];for(;a!==void 0;){if(h===a.index){let c;a.type===2?c=new zt(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Ze(o,this,t)),this._$AV.push(c),a=i[++l]}h!==(a==null?void 0:a.index)&&(o=S.nextNode(),h++)}return S.currentNode=C,n}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}let zt=class Ee{constructor(t,e,s,i){var n;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(n=i==null?void 0:i.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),W(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):De(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&W(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=q.createElement(be(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(s);else{const o=new Ve(n,this),h=o.u(this.options);o.v(s),this.$(h),this._$AH=o}}_$AC(t){let e=ee.get(t.strings);return e===void 0&&ee.set(t.strings,e=new q(t)),e}T(t){ye(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Ee(this.k(V()),this.k(V()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}};class ct{constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=M(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else{const h=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=M(this,h[s+l],e,l),a===T&&(a=this._$AH[l]),o||(o=!W(a)||a!==this._$AH[l]),a===v?t=v:t!==v&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class We extends ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const qe=N?N.emptyScript:"";class Ke extends ct{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,qe):this.element.removeAttribute(this.name)}}class Je extends ct{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=M(this,t,e,0))!==null&&s!==void 0?s:v)===T)return;const i=this._$AH,n=t===v&&i!==v||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==v&&(i===v||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Ze{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const se=nt.litHtmlPolyfillSupport;se==null||se(q,zt),((ft=nt.litHtmlVersions)!==null&&ft!==void 0?ft:nt.litHtmlVersions=[]).push("2.8.0");const Fe=(r,t,e)=>{var s,i;const n=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=n._$litPart$;if(o===void 0){const h=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;n._$litPart$=o=new zt(t.insertBefore(V(),h),h,void 0,e??{})}return o._$AI(r),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t,yt;let _=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Fe(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return T}};_.finalized=!0,_._$litElement$=!0,(_t=globalThis.litElementHydrateSupport)===null||_t===void 0||_t.call(globalThis,{LitElement:_});const ie=globalThis.litElementPolyfillSupport;ie==null||ie({LitElement:_});((yt=globalThis.litElementVersions)!==null&&yt!==void 0?yt:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=r=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(r,t):((e,s)=>{const{kind:i,elements:n}=s;return{kind:i,elements:n,finisher(o){customElements.define(e,o)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},Qe=(r,t,e)=>{t.constructor.createProperty(e,r)};function f(r){return(t,e)=>e!==void 0?Qe(r,t,e):Ge(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=({finisher:r,descriptor:t})=>(e,s)=>{var i;if(s===void 0){const n=(i=e.originalKey)!==null&&i!==void 0?i:e.key,o=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(e.key)}:{...e,key:n};return r!=null&&(o.finisher=function(h){r(h,n)}),o}{const n=e.constructor;t!==void 0&&Object.defineProperty(e,s,t(s)),r==null||r(n,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ye(r,t){return Xe({descriptor:e=>{const s={get(){var i,n;return(n=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(r))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0};if(t){const i=typeof e=="symbol"?Symbol():"__"+e;s.get=function(){var n,o;return this[i]===void 0&&(this[i]=(o=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(r))!==null&&o!==void 0?o:null),this[i]}}return s}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var At;((At=window.HTMLSlotElement)===null||At===void 0?void 0:At.prototype.assignedElements)!=null;function D(r){switch(r){case"red":case"danger":return g` var(--redow) `;case"green":case"success":return g` var(--grenn) `;case"blue":case"info":return g` var(--blooy) `;case"orange":case"warning":return g` var(--orang) `;case"yellow":return g` var(--yelli) `;case"purple":return g` var(--puple) `;case"black":case"dark":return g` var(--bluck) `;case"white":case"light":return g` var(--kream) `;default:return}}const ts=g`
  /* Color variants */
  --accent-dark: color-mix(in srgb, var(--accent), var(--bluck) 50%);
  --accent-darker: color-mix(in srgb, var(--accent), var(--bluck) 80%);

  --accent-light: color-mix(in srgb, var(--accent), var(--kream) 50%);
  --accent-lighter: color-mix(in srgb, var(--accent), var(--kream) 80%);
`,dt=g`
  ${ts}

  --gradient: linear-gradient(
    to top right,
    color-mix(in srgb, var(--accent) 95%, var(--background)),
    color-mix(in srgb, var(--accent) 80%, var(--background))
  );

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background: var(--accent-light);
  color: var(--accent-dark);

  font-family: var(--font-sans);
  font-size: var(--font-size);
  font-weight: 500;

  border: 2px solid var(--foreground);
  border-radius: var(--border-radius);

  box-shadow: var(--foreground) 0 2px 0 0;

  padding: var(--padding-2);

  transition: all 0.1s ease-out;
`;var es=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,Se=(r,t,e,s)=>{for(var i=s>1?void 0:s?ss(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&es(t,e,i),i};let ot=class extends _{constructor(){super(...arguments),this.accent="dark"}render(){return X`
      <button
        style="--accent: ${D(this.accent)??"var(--foreground)"};"
      >
        <slot></slot>
      </button>
    `}};ot.styles=[g`
      button {
        ${dt}

        margin: 1px 0 2px 0;

        &:hover:not(:disabled) {
          border-color: var(--accent-dark);
          color: var(--accent-darker);

          translate: 0 -1px;
          box-shadow: var(--accent-dark) 0 3px 0 0;
        }

        &:active:not(:disabled) {
          box-shadow: var(--foreground) 0 0 0 0;
          translate: 0 2px;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    `];Se([f({type:String})],ot.prototype,"accent",2);ot=Se([Y("kz-button")],ot);var is=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,Dt=(r,t,e,s)=>{for(var i=s>1?void 0:s?rs(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&is(t,e,i),i};let K=class extends _{constructor(){super(...arguments),this.accent="dark",this.checked=!1}render(){return X`
      <input
        style="--accent: ${D(this.accent)??"var(--foreground)"};"
        type="checkbox"
        checked=${this.checked}
        @change=${t=>this.checked=t.target.checked}
      />
    `}};K.styles=[g`
      input {
        appearance: none;
        position: relative;

        ${dt};

        --border-size: 2px;
        --height: 30px;
        --padding: 2px;

        height: var(--height);
        width: 45px;

        &::after {
          --size: calc(
            (var(--height) - (var(--border-size) * 2)) - (var(--padding) * 2)
          );

          transition: all 0.2s var(--wavey-out);

          content: "";
          display: block;

          position: absolute;
          top: var(--padding);
          left: var(--padding);

          height: var(--size);
          aspect-ratio: 1;

          background-color: var(--bluck);
          border-radius: calc(4px);
        }

        &:checked {
          &::after {
            background-color: var(--accent-dark);
            left: calc(100% - var(--size) - var(--padding));
          }
        }
      }
    `];Dt([f({type:String,reflect:!0})],K.prototype,"accent",2);Dt([f({type:Boolean,reflect:!0})],K.prototype,"checked",2);K=Dt([Y("kz-checkbox")],K);var ns=Object.defineProperty,os=Object.getOwnPropertyDescriptor,tt=(r,t,e,s)=>{for(var i=s>1?void 0:s?os(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ns(t,e,i),i};let k=class extends _{constructor(){super(...arguments),this.accent="dark",this.indeterminate=!1,this.value=0}updated(t){this.updateProgressWidth(t)}updateProgressWidth(t){t.has("indeterminate")&&(!t.get("indeterminate")&&this.indeterminate?this.progress.animate({translate:"0 150%"},{duration:500,easing:"ease"}).addEventListener("finish",()=>{this.progress.classList.add("indeterminate")}):t.get("indeterminate")&&(this.progress.animate([{translate:`0 ${this.value}%`}],{duration:500,easing:"ease"}),this.progress.animate([{translate:"0 150%"}],{duration:500,easing:"ease"}).addEventListener("finish",()=>{this.progress.classList.remove("indeterminate"),this.progress.animate([{translate:"0 -150%"},{translate:"0"}],{duration:500,easing:"ease"})})))}render(){return X`
      <div
        role="progressbar"
        class="container"
        style="--accent: ${D(this.accent)??"var(--foreground)"}"
      >
        <div class="progress" style="width: ${this.value}%"></div>
      </div>
    `}};k.styles=[g`
      .container {
        ${dt};

        --height: 24px;
        --padding: 4px;

        overflow: hidden;

        height: var(--height);
        width: 200px;

        padding: var(--padding);

        > .progress {
          transition: all 0.2s var(--wavey-out);

          border-radius: calc(var(--border-radius) - var(--padding));
          background-color: var(--accent-dark);

          height: 100%;
          max-width: 100%;

          &.indeterminate {
            animation: loading 1.5s ease infinite;
          }
        }
      }

      @keyframes loading {
        0% {
          width: 0%;
          margin-left: 0;
        }
        50% {
          width: 100%;
          margin-left: 0;
        }
        100% {
          width: 0%;
          margin-left: 100%;
        }
      }
    `];tt([f({type:String})],k.prototype,"accent",2);tt([f({type:Boolean})],k.prototype,"indeterminate",2);tt([f({type:Number})],k.prototype,"value",2);tt([Ye(".progress")],k.prototype,"progress",2);k=tt([Y("kz-loader")],k);var ls=Object.defineProperty,as=Object.getOwnPropertyDescriptor,ut=(r,t,e,s)=>{for(var i=s>1?void 0:s?as(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ls(t,e,i),i};let R=class extends _{constructor(){super(...arguments),this.placeholder="",this.accent="dark",this.value=""}render(){return X` <input
      type="text"
      style="--accent: ${D(this.accent)??"var(--foreground)"};"
      placeholder=${this.placeholder}
      
      value=${this.value}
      @input=${t=>this.value=t.target.value}
    />`}};R.styles=[g`
      input {
        ${dt}

        background: var(--kream);
        color: var(--accent-dark);

        &::placeholder {
          font-style: italic;
          color: var(--accent);

          opacity: 0.5;
        }
      }
    `];ut([f({type:String,reflect:!0})],R.prototype,"placeholder",2);ut([f({type:String,reflect:!0})],R.prototype,"accent",2);ut([f({type:String,reflect:!0})],R.prototype,"value",2);R=ut([Y("kz-textbox")],R);function bt(r,t=2,e=2){const s=[];for(let n=-t;n<=t;n++)for(let o=-t;o<=t;o++)n===0&&o===0||s.push({x:n,y:o});for(let n=t+1;n<=t+e;n++)for(let o=-t;o<=t;o++)o===0&&n===0||s.push({x:o,y:n});const i=s.map(({x:n,y:o})=>`${n}px ${o}px 0 ${D(r)??"var(--foreground)"}`);return g`
    text-shadow: ${fe(i.join(", "))};
  `}var hs=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,It=(r,t,e,s)=>{for(var i=s>1?void 0:s?cs(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&hs(t,e,i),i};let J=class extends _{constructor(){super(...arguments),this.type="title",this.accent="blooy"}getHeaderType(t){switch(t.toLowerCase()){case"h1":case"title":return"title";case"h2":case"subtitle":return"subtitle";case"h3":case"subheading":return"subheading";default:return"title"}}render(){return X`
      <div style="--accent: ${D(this.accent)??"var(--blooy)"};" class=${this.getHeaderType(this.type)??"title"}>
        <slot></slot>
      </div>
    `}};J.styles=[g`
      div {
        font-weight: bold;
        margin: 0;

        color: var(--accent);
      }

      .title {
        font-size: 8em;

        ${bt("",4,4)}
      }

      .subtitle {
        font-size: 4em;

        ${bt("",2,4)}
      }

      .subheading {
        font-size: 2em;

        ${bt("",2,2)}
      }
    `];It([f({type:String})],J.prototype,"type",2);It([f({type:String})],J.prototype,"accent",2);J=It([Y("kz-title")],J);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=window,Bt=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Vt=Symbol(),re=new WeakMap;let we=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Vt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Bt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=re.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&re.set(e,t))}return t}toString(){return this.cssText}};const ds=r=>new we(typeof r=="string"?r:r+"",void 0,Vt),xe=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new we(e,r,Vt)},us=(r,t)=>{Bt?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=it.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)})},ne=Bt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ds(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Et;const lt=window,oe=lt.trustedTypes,ps=oe?oe.emptyScript:"",le=lt.reactiveElementPolyfillSupport,Nt={toAttribute(r,t){switch(t){case Boolean:r=r?ps:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ce=(r,t)=>t!==r&&(t==t||r==r),St={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:Ce},Tt="finalized";let U=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=St){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||St}static finalize(){if(this.hasOwnProperty(Tt))return!1;this[Tt]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ne(i))}else t!==void 0&&e.push(ne(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return us(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=St){var i;const n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){const o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:Nt).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=i.getPropertyOptions(n),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:Nt;this._$El=n,this[n]=h.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||Ce)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,n)=>this[n]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdate)===null||n===void 0?void 0:n.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};U[Tt]=!0,U.elementProperties=new Map,U.elementStyles=[],U.shadowRootOptions={mode:"open"},le==null||le({ReactiveElement:U}),((Et=lt.reactiveElementVersions)!==null&&Et!==void 0?Et:lt.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var wt;const at=window,L=at.trustedTypes,ae=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,Mt="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,ke="?"+A,vs=`<${ke}>`,P=document,Z=()=>P.createComment(""),F=r=>r===null||typeof r!="object"&&typeof r!="function",Pe=Array.isArray,$s=r=>Pe(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",xt=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ce=/>/g,E=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,ue=/"/g,Oe=/^(?:script|style|textarea|title)$/i,gs=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),w=gs(1),j=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),pe=new WeakMap,x=P.createTreeWalker(P,129,null,!1);function Ue(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(t):t}const fs=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=B;for(let h=0;h<e;h++){const l=r[h];let a,c,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,c=o.exec(l),c!==null);)u=o.lastIndex,o===B?c[1]==="!--"?o=he:c[1]!==void 0?o=ce:c[2]!==void 0?(Oe.test(c[2])&&(i=RegExp("</"+c[2],"g")),o=E):c[3]!==void 0&&(o=E):o===E?c[0]===">"?(o=i??B,d=-1):c[1]===void 0?d=-2:(d=o.lastIndex-c[2].length,a=c[1],o=c[3]===void 0?E:c[3]==='"'?ue:de):o===ue||o===de?o=E:o===he||o===ce?o=B:(o=E,i=void 0);const p=o===E&&r[h+1].startsWith("/>")?" ":"";n+=o===B?l+vs:d>=0?(s.push(a),l.slice(0,d)+Mt+l.slice(d)+A+p):l+A+(d===-2?(s.push(void 0),h):p)}return[Ue(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const h=t.length-1,l=this.parts,[a,c]=fs(t,e);if(this.el=G.createElement(a,s),x.currentNode=this.el.content,e===2){const d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=x.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes()){const d=[];for(const u of i.getAttributeNames())if(u.endsWith(Mt)||u.startsWith(A)){const p=c[o++];if(d.push(u),p!==void 0){const vt=i.getAttribute(p.toLowerCase()+Mt).split(A),m=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:m[2],strings:vt,ctor:m[1]==="."?_s:m[1]==="?"?As:m[1]==="@"?bs:pt})}else l.push({type:6,index:n})}for(const u of d)i.removeAttribute(u)}if(Oe.test(i.tagName)){const d=i.textContent.split(A),u=d.length-1;if(u>0){i.textContent=L?L.emptyScript:"";for(let p=0;p<u;p++)i.append(d[p],Z()),x.nextNode(),l.push({type:2,index:++n});i.append(d[u],Z())}}}else if(i.nodeType===8)if(i.data===ke)l.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(A,d+1))!==-1;)l.push({type:7,index:n}),d+=A.length-1}n++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function z(r,t,e=r,s){var i,n,o,h;if(t===j)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const a=F(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,s)),s!==void 0?((o=(h=e)._$Co)!==null&&o!==void 0?o:h._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=z(r,l._$AS(r,t.values),l,s)),t}class ms{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:P).importNode(s,!0);x.currentNode=n;let o=x.nextNode(),h=0,l=0,a=i[0];for(;a!==void 0;){if(h===a.index){let c;a.type===2?c=new et(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Es(o,this,t)),this._$AV.push(c),a=i[++l]}h!==(a==null?void 0:a.index)&&(o=x.nextNode(),h++)}return x.currentNode=P,n}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class et{constructor(t,e,s,i){var n;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(n=i==null?void 0:i.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),F(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):$s(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$&&F(this._$AH)?this._$AA.nextSibling.data=t:this.$(P.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=G.createElement(Ue(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(s);else{const o=new ms(n,this),h=o.u(this.options);o.v(s),this.$(h),this._$AH=o}}_$AC(t){let e=pe.get(t.strings);return e===void 0&&pe.set(t.strings,e=new G(t)),e}T(t){Pe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new et(this.k(Z()),this.k(Z()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class pt{constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=z(this,t,e,0),o=!F(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const h=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=z(this,h[s+l],e,l),a===j&&(a=this._$AH[l]),o||(o=!F(a)||a!==this._$AH[l]),a===$?t=$:t!==$&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class _s extends pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}const ys=L?L.emptyScript:"";class As extends pt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,ys):this.element.removeAttribute(this.name)}}class bs extends pt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=z(this,t,e,0))!==null&&s!==void 0?s:$)===j)return;const i=this._$AH,n=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Es{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const ve=at.litHtmlPolyfillSupport;ve==null||ve(G,et),((wt=at.litHtmlVersions)!==null&&wt!==void 0?wt:at.litHtmlVersions=[]).push("2.8.0");const He=(r,t,e)=>{var s,i;const n=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=n._$litPart$;if(o===void 0){const h=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;n._$litPart$=o=new et(t.insertBefore(Z(),h),h,void 0,e??{})}return o._$AI(r),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ct,kt;class H extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=He(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return j}}H.finalized=!0,H._$litElement$=!0,(Ct=globalThis.litElementHydrateSupport)===null||Ct===void 0||Ct.call(globalThis,{LitElement:H});const $e=globalThis.litElementPolyfillSupport;$e==null||$e({LitElement:H});((kt=globalThis.litElementVersions)!==null&&kt!==void 0?kt:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne=r=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(r,t):((e,s)=>{const{kind:i,elements:n}=s;return{kind:i,elements:n,finisher(o){customElements.define(e,o)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ss=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},ws=(r,t,e)=>{t.constructor.createProperty(e,r)};function Wt(r){return(t,e)=>e!==void 0?ws(r,t,e):Ss(r,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Pt;((Pt=window.HTMLSlotElement)===null||Pt===void 0?void 0:Pt.prototype.assignedElements)!=null;var xs=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,Te=(r,t,e,s)=>{for(var i=s>1?void 0:s?Cs(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&xs(t,e,i),i};let ht=class extends H{constructor(){super(...arguments),this.tag=""}render(){return w`
      <span class="username"><slot></slot></span>
      ${this.tag&&this.tag.split(" ").map(r=>w`<span class="tag">${r}</span>`)}
    `}};ht.styles=[xe`
      :host {
        display: flex;

        align-items: center;
        gap: 4px;
      }

      span.username {
        font-weight: bold;
        color: var(--dark-puple);
      }

      span.tag {
        font-size: 12px;

        color: var(--light-puple);
        background-color: var(--dark-puple);

        padding: 4px;
        border-radius: 4px;
      }
    `];Te([Wt({type:String})],ht.prototype,"tag",2);ht=Te([Ne("user-name")],ht);var ks=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,qt=(r,t,e,s)=>{for(var i=s>1?void 0:s?Ps(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ks(t,e,i),i};let Q=class extends H{constructor(){super(...arguments),this.tag="",this.username=""}render(){return w`
      <img class="avatar" alt="avatar" src="./src/assets/user.png" />
      <div class="content">
        <user-name tag="${this.tag}" >${this.username}</user-name>
        <div class="message"><slot></slot></div>
      </div>
    `}};Q.styles=[xe`
      :host {
        display: flex;

        align-items: flex-start;
        gap: 8px;

        /* Boxy look */
        padding: 8px;

        border: 2px solid var(--bluck);
        border-radius: 8px;

        background-color: var(--kream);
        box-shadow: 0 2px var(--bluck);
      }

      img.avatar {
        width: 32px;
        aspect-ratio: 1;
      }
    `];qt([Wt({type:String,reflect:!0})],Q.prototype,"tag",2);qt([Wt({type:String,reflect:!0})],Q.prototype,"username",2);Q=qt([Ne("message-box")],Q);const Me=class Rt{constructor(){this.checkData(),this.client=new Re(localStorage.getItem("nick"),"",{welcomeMessage:"",blockSelf:!1}),this.sendButton=document.querySelector("#send-button"),this.messageInput=document.querySelector("#msg-box"),this.msgContainer=document.querySelector("#msg-container"),this.userList=document.querySelector("#user-list"),this.welcomeMessage()}checkData(){localStorage.getItem("nick")||localStorage.setItem("nick",prompt("Enter your nickname",Rt.defaultNick)||Rt.defaultNick)}welcomeMessage(){this.addInfoMessage("Welcome to Forum! The best MsgRoom client!")}async connect(){await this.client.connect(),this.addEventListeners(),this.renderUserList()}addEventListeners(){this.sendButton.addEventListener("click",this.handleSending.bind(this)),this.messageInput.addEventListener("keydown",this.handleKeyDown.bind(this)),this.client.on("message",this.handleMessage.bind(this)),this.client.on("user-join",this.handleUserJoin.bind(this)),this.client.on("user-leave",this.handleUserLeave.bind(this))}handleSending(){const t=this.messageInput.value;t&&!t.startsWith("/")&&(this.client.sendMessage(t),this.messageInput.shadowRoot.querySelector("input").value="")}handleKeyDown(t){const{key:e,shiftKey:s}=t;e==="Enter"&&!s&&this.handleSending()}handleMessage(t){const e=document.createElement("message-box");e.tag=t.author.flags.join(" "),e.username=t.author.nickname,e.innerHTML=t.content,this.msgContainer.insertAdjacentElement("afterbegin",e)}handleUserJoin(t){this.addInfoMessage(`${t.nickname} has joined the chat`),this.client.users[t.sessionID]=t,this.renderUserList()}handleUserLeave(t){this.addInfoMessage(`${t.nickname} has left the chat`),delete this.client.users[t.sessionID],this.renderUserList()}addInfoMessage(t){const e=document.createElement("div");e.classList.add("info-box"),e.innerHTML=t,this.msgContainer.insertAdjacentElement("afterbegin",e)}renderUserList(){const t=Object.values(this.client.users),e=[],s=[];t.forEach(i=>{const{flags:n}=i;n.includes("staff")?(e.push(i),t.splice(t.indexOf(i),1)):n.includes("bot")&&(s.push(i),t.splice(t.indexOf(i),1))}),He(w`
        <div class="user-list-header">
          <img src="src/assets/staff.png" alt="logo"/>
          <b>Staff</b>
        </div>
        <ul>
          ${e.map(i=>w`<li>${i.nickname}</li>`)}
        </ul>

        <div class="user-list-header">
          <img src="src/assets/users.png" alt="logo"/>
          <b>Users</b>
        </div>
        <ul>
          ${t.map(i=>w`<li>${i.nickname}</li>`)}
        </ul>

        <div class="user-list-header">
          <img src="src/assets/bots.png" alt="logo"/>
          <b>Bots</b>
        </div>
        <ul>
          ${s.map(i=>w`<li>${i.nickname}</li>`)}
        </ul>
      `,this.userList)}};Me.defaultNick="Forum User";let Os=Me;const Us=new Os;Us.connect();
