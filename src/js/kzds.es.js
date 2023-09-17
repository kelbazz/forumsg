/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = window, it = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== nt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (i) => new mt(typeof i == "string" ? i : i + "", void 0, nt), v = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, n) => r + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[n + 1], i[0]);
  return new mt(e, i, nt);
}, kt = (i, t) => {
  it ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const r = document.createElement("style"), s = L.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  });
}, ct = it ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules)
    e += r.cssText;
  return bt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;
const B = window, ht = B.trustedTypes, Ot = ht ? ht.emptyScript : "", dt = B.reactiveElementPolyfillSupport, et = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ot : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, At = (i, t) => t !== i && (t == t || i == i), J = { attribute: !0, type: String, converter: et, reflect: !1, hasChanged: At }, rt = "finalized";
let w = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, r) => {
      const s = this._$Ep(r, e);
      s !== void 0 && (this._$Ev.set(s, r), t.push(s));
    }), t;
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    return { get() {
      return this[e];
    }, set(s) {
      const n = this[t];
      this[e] = s, this.requestUpdate(t, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || J;
  }
  static finalize() {
    if (this.hasOwnProperty(rt))
      return !1;
    this[rt] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, r = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of r)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r)
        e.unshift(ct(s));
    } else
      t !== void 0 && e.push(ct(t));
    return e;
  }
  static _$Ep(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, r;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) === null || r === void 0 || r.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return kt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) === null || r === void 0 ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) === null || r === void 0 ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$EO(t, e, r = J) {
    var s;
    const n = this.constructor._$Ep(t, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : et).toAttribute(e, r.type);
      this._$El = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, n = s._$Ev.get(t);
    if (n !== void 0 && this._$El !== n) {
      const o = s.getPropertyOptions(n), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? o.converter : et;
      this._$El = n, this[n] = c.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, r) {
    let s = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || At)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, n) => this[n] = s), this._$Ei = void 0);
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var n;
        return (n = s.hostUpdate) === null || n === void 0 ? void 0 : n.call(s);
      }), this.update(r)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, r) => this._$EO(r, this[r], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
w[rt] = !0, w.elementProperties = /* @__PURE__ */ new Map(), w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, dt == null || dt({ ReactiveElement: w }), ((Z = B.reactiveElementVersions) !== null && Z !== void 0 ? Z : B.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var F;
const I = window, E = I.trustedTypes, ut = E ? E.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, st = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, wt = "?" + _, Ht = `<${wt}>`, b = document, O = () => b.createComment(""), H = (i) => i === null || typeof i != "object" && typeof i != "function", Et = Array.isArray, Ut = (i) => Et(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, vt = />/g, y = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $t = /'/g, ft = /"/g, xt = /^(?:script|style|textarea|title)$/i, Nt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), R = Nt(1), x = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), m = b.createTreeWalker(b, 129, null, !1);
function St(i, t) {
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Tt = (i, t) => {
  const e = i.length - 1, r = [];
  let s, n = t === 2 ? "<svg>" : "", o = k;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let l, h, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); )
      p = o.lastIndex, o === k ? h[1] === "!--" ? o = pt : h[1] !== void 0 ? o = vt : h[2] !== void 0 ? (xt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = s ?? k, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? ft : $t) : o === ft || o === $t ? o = y : o === pt || o === vt ? o = k : (o = y, s = void 0);
    const f = o === y && i[c + 1].startsWith("/>") ? " " : "";
    n += o === k ? a + Ht : d >= 0 ? (r.push(l), a.slice(0, d) + st + a.slice(d) + _ + f) : a + _ + (d === -2 ? (r.push(void 0), c) : f);
  }
  return [St(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), r];
};
class U {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, h] = Tt(t, e);
    if (this.el = U.createElement(l, r), m.currentNode = this.el.content, e === 2) {
      const d = this.el.content, p = d.firstChild;
      p.remove(), d.append(...p.childNodes);
    }
    for (; (s = m.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const d = [];
          for (const p of s.getAttributeNames())
            if (p.endsWith(st) || p.startsWith(_)) {
              const f = h[o++];
              if (d.push(p), f !== void 0) {
                const Pt = s.getAttribute(f.toLowerCase() + st).split(_), D = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: n, name: D[2], strings: Pt, ctor: D[1] === "." ? Mt : D[1] === "?" ? zt : D[1] === "@" ? Dt : W });
              } else
                a.push({ type: 6, index: n });
            }
          for (const p of d)
            s.removeAttribute(p);
        }
        if (xt.test(s.tagName)) {
          const d = s.textContent.split(_), p = d.length - 1;
          if (p > 0) {
            s.textContent = E ? E.emptyScript : "";
            for (let f = 0; f < p; f++)
              s.append(d[f], O()), m.nextNode(), a.push({ type: 2, index: ++n });
            s.append(d[p], O());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === wt)
          a.push({ type: 2, index: n });
        else {
          let d = -1;
          for (; (d = s.data.indexOf(_, d + 1)) !== -1; )
            a.push({ type: 7, index: n }), d += _.length - 1;
        }
      n++;
    }
  }
  static createElement(t, e) {
    const r = b.createElement("template");
    return r.innerHTML = t, r;
  }
}
function S(i, t, e = i, r) {
  var s, n, o, c;
  if (t === x)
    return t;
  let a = r !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[r] : e._$Cl;
  const l = H(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((n = a == null ? void 0 : a._$AO) === null || n === void 0 || n.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, r)), r !== void 0 ? ((o = (c = e)._$Co) !== null && o !== void 0 ? o : c._$Co = [])[r] = a : e._$Cl = a), a !== void 0 && (t = S(i, a._$AS(i, t.values), a, r)), t;
}
class Rt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: r }, parts: s } = this._$AD, n = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : b).importNode(r, !0);
    m.currentNode = n;
    let o = m.nextNode(), c = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (c === l.index) {
        let h;
        l.type === 2 ? h = new M(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new Lt(o, this, t)), this._$AV.push(h), l = s[++a];
      }
      c !== (l == null ? void 0 : l.index) && (o = m.nextNode(), c++);
    }
    return m.currentNode = b, n;
  }
  v(t) {
    let e = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, r, s) {
    var n;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$Cp = (n = s == null ? void 0 : s.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), H(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Ut(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && H(this._$AH) ? this._$AA.nextSibling.data = t : this.$(b.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: r, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(St(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === n)
      this._$AH.v(r);
    else {
      const o = new Rt(n, this), c = o.u(this.options);
      o.v(r), this.$(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new U(t)), e;
  }
  T(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const n of t)
      s === e.length ? e.push(r = new M(this.k(O()), this.k(O()), this, this.options)) : r = e[s], r._$AI(n), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class W {
  constructor(t, e, r, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, r, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      t = S(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== x, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++)
        l = S(this, c[r + a], e, a), l === x && (l = this._$AH[a]), o || (o = !H(l) || l !== this._$AH[a]), l === u ? t = u : t !== u && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const jt = E ? E.emptyScript : "";
class zt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, jt) : this.element.removeAttribute(this.name);
  }
}
class Dt extends W {
  constructor(t, e, r, s, n) {
    super(t, e, r, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = S(this, t, e, 0)) !== null && r !== void 0 ? r : u) === x)
      return;
    const s = this._$AH, n = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const _t = I.litHtmlPolyfillSupport;
_t == null || _t(U, M), ((F = I.litHtmlVersions) !== null && F !== void 0 ? F : I.litHtmlVersions = []).push("2.8.0");
const Bt = (i, t, e) => {
  var r, s;
  const n = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let o = n._$litPart$;
  if (o === void 0) {
    const c = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    n._$litPart$ = o = new M(t.insertBefore(O(), c), c, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q, X;
class g extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const r = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = r.firstChild), r;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
g.finalized = !0, g._$litElement$ = !0, (Q = globalThis.litElementHydrateSupport) === null || Q === void 0 || Q.call(globalThis, { LitElement: g });
const yt = globalThis.litElementPolyfillSupport;
yt == null || yt({ LitElement: g });
((X = globalThis.litElementVersions) !== null && X !== void 0 ? X : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = (i) => (t) => typeof t == "function" ? ((e, r) => (customElements.define(e, r), r))(i, t) : ((e, r) => {
  const { kind: s, elements: n } = r;
  return { kind: s, elements: n, finisher(o) {
    customElements.define(e, o);
  } };
})(i, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} }, Vt = (i, t, e) => {
  t.constructor.createProperty(e, i);
};
function $(i) {
  return (t, e) => e !== void 0 ? Vt(i, t, e) : It(i, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = ({ finisher: i, descriptor: t }) => (e, r) => {
  var s;
  if (r === void 0) {
    const n = (s = e.originalKey) !== null && s !== void 0 ? s : e.key, o = t != null ? { kind: "method", placement: "prototype", key: n, descriptor: t(e.key) } : { ...e, key: n };
    return i != null && (o.finisher = function(c) {
      i(c, n);
    }), o;
  }
  {
    const n = e.constructor;
    t !== void 0 && Object.defineProperty(e, r, t(r)), i == null || i(n, r);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qt(i, t) {
  return Wt({ descriptor: (e) => {
    const r = { get() {
      var s, n;
      return (n = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(i)) !== null && n !== void 0 ? n : null;
    }, enumerable: !0, configurable: !0 };
    if (t) {
      const s = typeof e == "symbol" ? Symbol() : "__" + e;
      r.get = function() {
        var n, o;
        return this[s] === void 0 && (this[s] = (o = (n = this.renderRoot) === null || n === void 0 ? void 0 : n.querySelector(i)) !== null && o !== void 0 ? o : null), this[s];
      };
    }
    return r;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y;
((Y = window.HTMLSlotElement) === null || Y === void 0 ? void 0 : Y.prototype.assignedElements) != null;
function P(i) {
  switch (i) {
    case "red":
    case "danger":
      return v` var(--redow) `;
    case "green":
    case "success":
      return v` var(--grenn) `;
    case "blue":
    case "info":
      return v` var(--blooy) `;
    case "orange":
    case "warning":
      return v` var(--orang) `;
    case "yellow":
      return v` var(--yelli) `;
    case "purple":
      return v` var(--puple) `;
    case "black":
    case "dark":
      return v` var(--bluck) `;
    case "white":
    case "light":
      return v` var(--kream) `;
    default:
      return;
  }
}
const Kt = v`
  /* Color variants */
  --accent-dark: color-mix(in srgb, var(--accent), var(--bluck) 50%);
  --accent-darker: color-mix(in srgb, var(--accent), var(--bluck) 80%);

  --accent-light: color-mix(in srgb, var(--accent), var(--kream) 50%);
  --accent-lighter: color-mix(in srgb, var(--accent), var(--kream) 80%);
`, q = v`
  ${Kt}

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
`;
var Zt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, Ct = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? Jt(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (r ? o(t, e, s) : o(s)) || s);
  return r && s && Zt(t, e, s), s;
};
let V = class extends g {
  constructor() {
    super(...arguments), this.accent = "dark";
  }
  render() {
    return R`
      <button
        style="--accent: ${P(this.accent) ?? "var(--foreground)"};"
      >
        <slot></slot>
      </button>
    `;
  }
};
V.styles = [
  v`
      button {
        ${q}

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
    `
];
Ct([
  $({ type: String })
], V.prototype, "accent", 2);
V = Ct([
  j("kz-button")
], V);
var Ft = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, ot = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? Gt(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (r ? o(t, e, s) : o(s)) || s);
  return r && s && Ft(t, e, s), s;
};
let N = class extends g {
  constructor() {
    super(...arguments), this.accent = "dark", this.checked = !1;
  }
  render() {
    return R`
      <input
        style="--accent: ${P(this.accent) ?? "var(--foreground)"};"
        type="checkbox"
        checked=${this.checked}
        @change=${(i) => this.checked = i.target.checked}
      />
    `;
  }
};
N.styles = [
  v`
      input {
        appearance: none;
        position: relative;

        ${q};

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
    `
];
ot([
  $({ type: String, reflect: !0 })
], N.prototype, "accent", 2);
ot([
  $({ type: Boolean, reflect: !0 })
], N.prototype, "checked", 2);
N = ot([
  j("kz-checkbox")
], N);
var Qt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, z = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? Xt(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (r ? o(t, e, s) : o(s)) || s);
  return r && s && Qt(t, e, s), s;
};
let A = class extends g {
  constructor() {
    super(...arguments), this.accent = "dark", this.indeterminate = !1, this.value = 0;
  }
  updated(i) {
    this.updateProgressWidth(i);
  }
  updateProgressWidth(i) {
    i.has("indeterminate") && (!i.get("indeterminate") && this.indeterminate ? this.progress.animate({ translate: "0 150%" }, { duration: 500, easing: "ease" }).addEventListener("finish", () => {
      this.progress.classList.add("indeterminate");
    }) : i.get("indeterminate") && (this.progress.animate([{ translate: `0 ${this.value}%` }], {
      duration: 500,
      easing: "ease"
    }), this.progress.animate([{ translate: "0 150%" }], {
      duration: 500,
      easing: "ease"
    }).addEventListener("finish", () => {
      this.progress.classList.remove("indeterminate"), this.progress.animate(
        [{ translate: "0 -150%" }, { translate: "0" }],
        {
          duration: 500,
          easing: "ease"
        }
      );
    })));
  }
  render() {
    return R`
      <div
        role="progressbar"
        class="container"
        style="--accent: ${P(this.accent) ?? "var(--foreground)"}"
      >
        <div class="progress" style="width: ${this.value}%"></div>
      </div>
    `;
  }
};
A.styles = [
  v`
      .container {
        ${q};

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
    `
];
z([
  $({ type: String })
], A.prototype, "accent", 2);
z([
  $({ type: Boolean })
], A.prototype, "indeterminate", 2);
z([
  $({ type: Number })
], A.prototype, "value", 2);
z([
  qt(".progress")
], A.prototype, "progress", 2);
A = z([
  j("kz-loader")
], A);
var Yt = Object.defineProperty, te = Object.getOwnPropertyDescriptor, K = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? te(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (r ? o(t, e, s) : o(s)) || s);
  return r && s && Yt(t, e, s), s;
};
let C = class extends g {
  constructor() {
    super(...arguments), this.placeholder = "", this.accent = "dark", this.value = "";
  }
  render() {
    return R` <input
      type="text"
      style="--accent: ${P(this.accent) ?? "var(--foreground)"};"
      placeholder=${this.placeholder}
      
      value=${this.value}
      @input=${(i) => this.value = i.target.value}
    />`;
  }
};
C.styles = [
  v`
      input {
        ${q}

        background: var(--kream);
        color: var(--accent-dark);

        &::placeholder {
          font-style: italic;
          color: var(--accent);

          opacity: 0.5;
        }
      }
    `
];
K([
  $({ type: String, reflect: !0 })
], C.prototype, "placeholder", 2);
K([
  $({ type: String, reflect: !0 })
], C.prototype, "accent", 2);
K([
  $({ type: String, reflect: !0 })
], C.prototype, "value", 2);
C = K([
  j("kz-textbox")
], C);
function tt(i, t = 2, e = 2) {
  const r = [];
  for (let n = -t; n <= t; n++)
    for (let o = -t; o <= t; o++)
      n === 0 && o === 0 || r.push({ x: n, y: o });
  for (let n = t + 1; n <= t + e; n++)
    for (let o = -t; o <= t; o++)
      o === 0 && n === 0 || r.push({ x: o, y: n });
  const s = r.map(({ x: n, y: o }) => `${n}px ${o}px 0 ${P(i) ?? "var(--foreground)"}`);
  return v`
    text-shadow: ${bt(s.join(", "))};
  `;
}
var ee = Object.defineProperty, re = Object.getOwnPropertyDescriptor, at = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? re(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (r ? o(t, e, s) : o(s)) || s);
  return r && s && ee(t, e, s), s;
};
let T = class extends g {
  constructor() {
    super(...arguments), this.type = "title", this.accent = "blooy";
  }
  getHeaderType(i) {
    switch (i.toLowerCase()) {
      case "h1":
      case "title":
        return "title";
      case "h2":
      case "subtitle":
        return "subtitle";
      case "h3":
      case "subheading":
        return "subheading";
      default:
        return "title";
    }
  }
  render() {
    return R`
      <div style="--accent: ${P(this.accent) ?? "var(--blooy)"};" class=${this.getHeaderType(this.type) ?? "title"}>
        <slot></slot>
      </div>
    `;
  }
};
T.styles = [
  v`
      div {
        font-weight: bold;
        margin: 0;

        color: var(--accent);
      }

      .title {
        font-size: 8em;

        ${tt("", 4, 4)}
      }

      .subtitle {
        font-size: 4em;

        ${tt("", 2, 4)}
      }

      .subheading {
        font-size: 2em;

        ${tt("", 2, 2)}
      }
    `
];
at([
  $({ type: String })
], T.prototype, "type", 2);
at([
  $({ type: String })
], T.prototype, "accent", 2);
T = at([
  j("kz-title")
], T);
