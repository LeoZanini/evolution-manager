var Bt = Object.defineProperty;
var Dt = (t, e, r) => e in t ? Bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Te = (t, e, r) => Dt(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx as o, jsxs as g } from "react/jsx-runtime";
import { createContext as _t, useState as F, useEffect as oe, useCallback as H, useContext as $t, useRef as It } from "react";
const at = _t(
  void 0
), zt = {
  name: "light",
  colors: {
    background: "#ffffff",
    text: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444"
  }
}, Ht = {
  name: "dark",
  colors: {
    background: "#1f2937",
    text: "#f9fafb",
    primary: "#60a5fa",
    secondary: "#9ca3af",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171"
  }
}, Rn = ({ children: t }) => {
  const [e, r] = F(!1);
  oe(() => {
    const i = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    r(i), i ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }, []);
  const n = () => {
    r(!e), e ? document.documentElement.classList.remove("dark") : document.documentElement.classList.add("dark");
  }, s = e ? Ht : zt;
  return /* @__PURE__ */ o(at.Provider, { value: { theme: s, toggleTheme: n }, children: t });
};
function it(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: qt } = Object.prototype, { getPrototypeOf: De } = Object, { iterator: Se, toStringTag: ot } = Symbol, ke = /* @__PURE__ */ ((t) => (e) => {
  const r = qt.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), G = (t) => (t = t.toLowerCase(), (e) => ke(e) === t), ve = (t) => (e) => typeof e === t, { isArray: de } = Array, le = ve("undefined");
function me(t) {
  return t !== null && !le(t) && t.constructor !== null && !le(t.constructor) && V(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const ct = G("ArrayBuffer");
function Wt(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && ct(t.buffer), e;
}
const Vt = ve("string"), V = ve("function"), lt = ve("number"), ge = (t) => t !== null && typeof t == "object", Jt = (t) => t === !0 || t === !1, we = (t) => {
  if (ke(t) !== "object")
    return !1;
  const e = De(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(ot in t) && !(Se in t);
}, Kt = (t) => {
  if (!ge(t) || me(t))
    return !1;
  try {
    return Object.keys(t).length === 0 && Object.getPrototypeOf(t) === Object.prototype;
  } catch {
    return !1;
  }
}, Qt = G("Date"), Xt = G("File"), Gt = G("Blob"), Yt = G("FileList"), Zt = (t) => ge(t) && V(t.pipe), er = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || V(t.append) && ((e = ke(t)) === "formdata" || // detect form-data instance
  e === "object" && V(t.toString) && t.toString() === "[object FormData]"));
}, tr = G("URLSearchParams"), [rr, nr, sr, ar] = ["ReadableStream", "Request", "Response", "Headers"].map(G), ir = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function pe(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, s;
  if (typeof t != "object" && (t = [t]), de(t))
    for (n = 0, s = t.length; n < s; n++)
      e.call(null, t[n], n, t);
  else {
    if (me(t))
      return;
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), a = i.length;
    let l;
    for (n = 0; n < a; n++)
      l = i[n], e.call(null, t[l], l, t);
  }
}
function dt(t, e) {
  if (me(t))
    return null;
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], e === s.toLowerCase())
      return s;
  return null;
}
const ae = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ut = (t) => !le(t) && t !== ae;
function je() {
  const { caseless: t, skipUndefined: e } = ut(this) && this || {}, r = {}, n = (s, i) => {
    const a = t && dt(r, i) || i;
    we(r[a]) && we(s) ? r[a] = je(r[a], s) : we(s) ? r[a] = je({}, s) : de(s) ? r[a] = s.slice() : (!e || !le(s)) && (r[a] = s);
  };
  for (let s = 0, i = arguments.length; s < i; s++)
    arguments[s] && pe(arguments[s], n);
  return r;
}
const or = (t, e, r, { allOwnKeys: n } = {}) => (pe(e, (s, i) => {
  r && V(s) ? t[i] = it(s, r) : t[i] = s;
}, { allOwnKeys: n }), t), cr = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), lr = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, dr = (t, e, r, n) => {
  let s, i, a;
  const l = {};
  if (e = e || {}, t == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t), i = s.length; i-- > 0; )
      a = s[i], (!n || n(a, t, e)) && !l[a] && (e[a] = t[a], l[a] = !0);
    t = r !== !1 && De(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, ur = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, fr = (t) => {
  if (!t) return null;
  if (de(t)) return t;
  let e = t.length;
  if (!lt(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, hr = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && De(Uint8Array)), mr = (t, e) => {
  const n = (t && t[Se]).call(t);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const i = s.value;
    e.call(t, i[0], i[1]);
  }
}, gr = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, pr = G("HTMLFormElement"), yr = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, s) {
    return n.toUpperCase() + s;
  }
), He = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), br = G("RegExp"), ft = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  pe(r, (s, i) => {
    let a;
    (a = e(s, i, t)) !== !1 && (n[i] = a || s);
  }), Object.defineProperties(t, n);
}, wr = (t) => {
  ft(t, (e, r) => {
    if (V(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (V(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, xr = (t, e) => {
  const r = {}, n = (s) => {
    s.forEach((i) => {
      r[i] = !0;
    });
  };
  return de(t) ? n(t) : n(String(t).split(e)), r;
}, Nr = () => {
}, Er = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function Sr(t) {
  return !!(t && V(t.append) && t[ot] === "FormData" && t[Se]);
}
const kr = (t) => {
  const e = new Array(10), r = (n, s) => {
    if (ge(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (me(n))
        return n;
      if (!("toJSON" in n)) {
        e[s] = n;
        const i = de(n) ? [] : {};
        return pe(n, (a, l) => {
          const m = r(a, s + 1);
          !le(m) && (i[l] = m);
        }), e[s] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, vr = G("AsyncFunction"), Cr = (t) => t && (ge(t) || V(t)) && V(t.then) && V(t.catch), ht = ((t, e) => t ? setImmediate : e ? ((r, n) => (ae.addEventListener("message", ({ source: s, data: i }) => {
  s === ae && i === r && n.length && n.shift()();
}, !1), (s) => {
  n.push(s), ae.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  V(ae.postMessage)
), Rr = typeof queueMicrotask < "u" ? queueMicrotask.bind(ae) : typeof process < "u" && process.nextTick || ht, Ar = (t) => t != null && V(t[Se]), c = {
  isArray: de,
  isArrayBuffer: ct,
  isBuffer: me,
  isFormData: er,
  isArrayBufferView: Wt,
  isString: Vt,
  isNumber: lt,
  isBoolean: Jt,
  isObject: ge,
  isPlainObject: we,
  isEmptyObject: Kt,
  isReadableStream: rr,
  isRequest: nr,
  isResponse: sr,
  isHeaders: ar,
  isUndefined: le,
  isDate: Qt,
  isFile: Xt,
  isBlob: Gt,
  isRegExp: br,
  isFunction: V,
  isStream: Zt,
  isURLSearchParams: tr,
  isTypedArray: hr,
  isFileList: Yt,
  forEach: pe,
  merge: je,
  extend: or,
  trim: ir,
  stripBOM: cr,
  inherits: lr,
  toFlatObject: dr,
  kindOf: ke,
  kindOfTest: G,
  endsWith: ur,
  toArray: fr,
  forEachEntry: mr,
  matchAll: gr,
  isHTMLForm: pr,
  hasOwnProperty: He,
  hasOwnProp: He,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ft,
  freezeMethods: wr,
  toObjectSet: xr,
  toCamelCase: yr,
  noop: Nr,
  toFiniteNumber: Er,
  findKey: dt,
  global: ae,
  isContextDefined: ut,
  isSpecCompliantForm: Sr,
  toJSONObject: kr,
  isAsyncFn: vr,
  isThenable: Cr,
  setImmediate: ht,
  asap: Rr,
  isIterable: Ar
};
function S(t, e, r, n, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), s && (this.response = s, this.status = s.status ? s.status : null);
}
c.inherits(S, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: c.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const mt = S.prototype, gt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  gt[t] = { value: t };
});
Object.defineProperties(S, gt);
Object.defineProperty(mt, "isAxiosError", { value: !0 });
S.from = (t, e, r, n, s, i) => {
  const a = Object.create(mt);
  c.toFlatObject(t, a, function(f) {
    return f !== Error.prototype;
  }, (u) => u !== "isAxiosError");
  const l = t && t.message ? t.message : "Error", m = e == null && t ? t.code : e;
  return S.call(a, l, m, r, n, s), t && a.cause == null && Object.defineProperty(a, "cause", { value: t, configurable: !0 }), a.name = t && t.name || "Error", i && Object.assign(a, i), a;
};
const Tr = null;
function Le(t) {
  return c.isPlainObject(t) || c.isArray(t);
}
function pt(t) {
  return c.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function qe(t, e, r) {
  return t ? t.concat(e).map(function(s, i) {
    return s = pt(s), !r && i ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function Or(t) {
  return c.isArray(t) && !t.some(Le);
}
const Fr = c.toFlatObject(c, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Ce(t, e, r) {
  if (!c.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), r = c.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, h) {
    return !c.isUndefined(h[p]);
  });
  const n = r.metaTokens, s = r.visitor || f, i = r.dots, a = r.indexes, m = (r.Blob || typeof Blob < "u" && Blob) && c.isSpecCompliantForm(e);
  if (!c.isFunction(s))
    throw new TypeError("visitor must be a function");
  function u(d) {
    if (d === null) return "";
    if (c.isDate(d))
      return d.toISOString();
    if (c.isBoolean(d))
      return d.toString();
    if (!m && c.isBlob(d))
      throw new S("Blob is not supported. Use a Buffer instead.");
    return c.isArrayBuffer(d) || c.isTypedArray(d) ? m && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function f(d, p, h) {
    let k = d;
    if (d && !h && typeof d == "object") {
      if (c.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), d = JSON.stringify(d);
      else if (c.isArray(d) && Or(d) || (c.isFileList(d) || c.endsWith(p, "[]")) && (k = c.toArray(d)))
        return p = pt(p), k.forEach(function(R, T) {
          !(c.isUndefined(R) || R === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? qe([p], T, i) : a === null ? p : p + "[]",
            u(R)
          );
        }), !1;
    }
    return Le(d) ? !0 : (e.append(qe(h, p, i), u(d)), !1);
  }
  const y = [], w = Object.assign(Fr, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: Le
  });
  function A(d, p) {
    if (!c.isUndefined(d)) {
      if (y.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      y.push(d), c.forEach(d, function(k, P) {
        (!(c.isUndefined(k) || k === null) && s.call(
          e,
          k,
          c.isString(P) ? P.trim() : P,
          p,
          w
        )) === !0 && A(k, p ? p.concat(P) : [P]);
      }), y.pop();
    }
  }
  if (!c.isObject(t))
    throw new TypeError("data must be an object");
  return A(t), e;
}
function We(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function _e(t, e) {
  this._pairs = [], t && Ce(t, this, e);
}
const yt = _e.prototype;
yt.append = function(e, r) {
  this._pairs.push([e, r]);
};
yt.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, We);
  } : We;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Pr(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function bt(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || Pr;
  c.isFunction(r) && (r = {
    serialize: r
  });
  const s = r && r.serialize;
  let i;
  if (s ? i = s(e, r) : i = c.isURLSearchParams(e) ? e.toString() : new _e(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Ve {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    c.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const wt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, jr = typeof URLSearchParams < "u" ? URLSearchParams : _e, Lr = typeof FormData < "u" ? FormData : null, Ur = typeof Blob < "u" ? Blob : null, Mr = {
  isBrowser: !0,
  classes: {
    URLSearchParams: jr,
    FormData: Lr,
    Blob: Ur
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, $e = typeof window < "u" && typeof document < "u", Ue = typeof navigator == "object" && navigator || void 0, Br = $e && (!Ue || ["ReactNative", "NativeScript", "NS"].indexOf(Ue.product) < 0), Dr = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", _r = $e && window.location.href || "http://localhost", $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: $e,
  hasStandardBrowserEnv: Br,
  hasStandardBrowserWebWorkerEnv: Dr,
  navigator: Ue,
  origin: _r
}, Symbol.toStringTag, { value: "Module" })), z = {
  ...$r,
  ...Mr
};
function Ir(t, e) {
  return Ce(t, new z.classes.URLSearchParams(), {
    visitor: function(r, n, s, i) {
      return z.isNode && c.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...e
  });
}
function zr(t) {
  return c.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Hr(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const s = r.length;
  let i;
  for (n = 0; n < s; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function xt(t) {
  function e(r, n, s, i) {
    let a = r[i++];
    if (a === "__proto__") return !0;
    const l = Number.isFinite(+a), m = i >= r.length;
    return a = !a && c.isArray(s) ? s.length : a, m ? (c.hasOwnProp(s, a) ? s[a] = [s[a], n] : s[a] = n, !l) : ((!s[a] || !c.isObject(s[a])) && (s[a] = []), e(r, n, s[a], i) && c.isArray(s[a]) && (s[a] = Hr(s[a])), !l);
  }
  if (c.isFormData(t) && c.isFunction(t.entries)) {
    const r = {};
    return c.forEachEntry(t, (n, s) => {
      e(zr(n), s, r, 0);
    }), r;
  }
  return null;
}
function qr(t, e, r) {
  if (c.isString(t))
    try {
      return (e || JSON.parse)(t), c.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const ye = {
  transitional: wt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, r) {
    const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, i = c.isObject(e);
    if (i && c.isHTMLForm(e) && (e = new FormData(e)), c.isFormData(e))
      return s ? JSON.stringify(xt(e)) : e;
    if (c.isArrayBuffer(e) || c.isBuffer(e) || c.isStream(e) || c.isFile(e) || c.isBlob(e) || c.isReadableStream(e))
      return e;
    if (c.isArrayBufferView(e))
      return e.buffer;
    if (c.isURLSearchParams(e))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ir(e, this.formSerializer).toString();
      if ((l = c.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const m = this.env && this.env.FormData;
        return Ce(
          l ? { "files[]": e } : e,
          m && new m(),
          this.formSerializer
        );
      }
    }
    return i || s ? (r.setContentType("application/json", !1), qr(e)) : e;
  }],
  transformResponse: [function(e) {
    const r = this.transitional || ye.transitional, n = r && r.forcedJSONParsing, s = this.responseType === "json";
    if (c.isResponse(e) || c.isReadableStream(e))
      return e;
    if (e && c.isString(e) && (n && !this.responseType || s)) {
      const a = !(r && r.silentJSONParsing) && s;
      try {
        return JSON.parse(e, this.parseReviver);
      } catch (l) {
        if (a)
          throw l.name === "SyntaxError" ? S.from(l, S.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: z.classes.FormData,
    Blob: z.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
c.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  ye.headers[t] = {};
});
const Wr = c.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Vr = (t) => {
  const e = {};
  let r, n, s;
  return t && t.split(`
`).forEach(function(a) {
    s = a.indexOf(":"), r = a.substring(0, s).trim().toLowerCase(), n = a.substring(s + 1).trim(), !(!r || e[r] && Wr[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Je = Symbol("internals");
function he(t) {
  return t && String(t).trim().toLowerCase();
}
function xe(t) {
  return t === !1 || t == null ? t : c.isArray(t) ? t.map(xe) : String(t);
}
function Jr(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const Kr = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Oe(t, e, r, n, s) {
  if (c.isFunction(n))
    return n.call(this, e, r);
  if (s && (e = r), !!c.isString(e)) {
    if (c.isString(n))
      return e.indexOf(n) !== -1;
    if (c.isRegExp(n))
      return n.test(e);
  }
}
function Qr(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Xr(t, e) {
  const r = c.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(s, i, a) {
        return this[n].call(this, e, s, i, a);
      },
      configurable: !0
    });
  });
}
let J = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const s = this;
    function i(l, m, u) {
      const f = he(m);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const y = c.findKey(s, f);
      (!y || s[y] === void 0 || u === !0 || u === void 0 && s[y] !== !1) && (s[y || m] = xe(l));
    }
    const a = (l, m) => c.forEach(l, (u, f) => i(u, f, m));
    if (c.isPlainObject(e) || e instanceof this.constructor)
      a(e, r);
    else if (c.isString(e) && (e = e.trim()) && !Kr(e))
      a(Vr(e), r);
    else if (c.isObject(e) && c.isIterable(e)) {
      let l = {}, m, u;
      for (const f of e) {
        if (!c.isArray(f))
          throw TypeError("Object iterator must return a key-value pair");
        l[u = f[0]] = (m = l[u]) ? c.isArray(m) ? [...m, f[1]] : [m, f[1]] : f[1];
      }
      a(l, r);
    } else
      e != null && i(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = he(e), e) {
      const n = c.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return Jr(s);
        if (c.isFunction(r))
          return r.call(this, s, n);
        if (c.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = he(e), e) {
      const n = c.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Oe(this, this[n], n, r)));
    }
    return !1;
  }
  delete(e, r) {
    const n = this;
    let s = !1;
    function i(a) {
      if (a = he(a), a) {
        const l = c.findKey(n, a);
        l && (!r || Oe(n, n[l], l, r)) && (delete n[l], s = !0);
      }
    }
    return c.isArray(e) ? e.forEach(i) : i(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const i = r[n];
      (!e || Oe(this, this[i], i, e, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return c.forEach(this, (s, i) => {
      const a = c.findKey(n, i);
      if (a) {
        r[a] = xe(s), delete r[i];
        return;
      }
      const l = e ? Qr(i) : String(i).trim();
      l !== i && delete r[i], r[l] = xe(s), n[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return c.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = e && c.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const n = new this(e);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(e) {
    const n = (this[Je] = this[Je] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(a) {
      const l = he(a);
      n[l] || (Xr(s, a), n[l] = !0);
    }
    return c.isArray(e) ? e.forEach(i) : i(e), this;
  }
};
J.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
c.reduceDescriptors(J.prototype, ({ value: t }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[r] = n;
    }
  };
});
c.freezeMethods(J);
function Fe(t, e) {
  const r = this || ye, n = e || r, s = J.from(n.headers);
  let i = n.data;
  return c.forEach(t, function(l) {
    i = l.call(r, i, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), i;
}
function Nt(t) {
  return !!(t && t.__CANCEL__);
}
function ue(t, e, r) {
  S.call(this, t ?? "canceled", S.ERR_CANCELED, e, r), this.name = "CanceledError";
}
c.inherits(ue, S, {
  __CANCEL__: !0
});
function Et(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new S(
    "Request failed with status code " + r.status,
    [S.ERR_BAD_REQUEST, S.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function Gr(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Yr(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let s = 0, i = 0, a;
  return e = e !== void 0 ? e : 1e3, function(m) {
    const u = Date.now(), f = n[i];
    a || (a = u), r[s] = m, n[s] = u;
    let y = i, w = 0;
    for (; y !== s; )
      w += r[y++], y = y % t;
    if (s = (s + 1) % t, s === i && (i = (i + 1) % t), u - a < e)
      return;
    const A = f && u - f;
    return A ? Math.round(w * 1e3 / A) : void 0;
  };
}
function Zr(t, e) {
  let r = 0, n = 1e3 / e, s, i;
  const a = (u, f = Date.now()) => {
    r = f, s = null, i && (clearTimeout(i), i = null), t(...u);
  };
  return [(...u) => {
    const f = Date.now(), y = f - r;
    y >= n ? a(u, f) : (s = u, i || (i = setTimeout(() => {
      i = null, a(s);
    }, n - y)));
  }, () => s && a(s)];
}
const Ee = (t, e, r = 3) => {
  let n = 0;
  const s = Yr(50, 250);
  return Zr((i) => {
    const a = i.loaded, l = i.lengthComputable ? i.total : void 0, m = a - n, u = s(m), f = a <= l;
    n = a;
    const y = {
      loaded: a,
      total: l,
      progress: l ? a / l : void 0,
      bytes: m,
      rate: u || void 0,
      estimated: u && l && f ? (l - a) / u : void 0,
      event: i,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    t(y);
  }, r);
}, Ke = (t, e) => {
  const r = t != null;
  return [(n) => e[0]({
    lengthComputable: r,
    total: t,
    loaded: n
  }), e[1]];
}, Qe = (t) => (...e) => c.asap(() => t(...e)), en = z.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (r) => (r = new URL(r, z.origin), t.protocol === r.protocol && t.host === r.host && (e || t.port === r.port)))(
  new URL(z.origin),
  z.navigator && /(msie|trident)/i.test(z.navigator.userAgent)
) : () => !0, tn = z.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, r, n, s, i) {
      const a = [t + "=" + encodeURIComponent(e)];
      c.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), c.isString(n) && a.push("path=" + n), c.isString(s) && a.push("domain=" + s), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function rn(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function nn(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function St(t, e, r) {
  let n = !rn(e);
  return t && (n || r == !1) ? nn(t, e) : e;
}
const Xe = (t) => t instanceof J ? { ...t } : t;
function ce(t, e) {
  e = e || {};
  const r = {};
  function n(u, f, y, w) {
    return c.isPlainObject(u) && c.isPlainObject(f) ? c.merge.call({ caseless: w }, u, f) : c.isPlainObject(f) ? c.merge({}, f) : c.isArray(f) ? f.slice() : f;
  }
  function s(u, f, y, w) {
    if (c.isUndefined(f)) {
      if (!c.isUndefined(u))
        return n(void 0, u, y, w);
    } else return n(u, f, y, w);
  }
  function i(u, f) {
    if (!c.isUndefined(f))
      return n(void 0, f);
  }
  function a(u, f) {
    if (c.isUndefined(f)) {
      if (!c.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, f);
  }
  function l(u, f, y) {
    if (y in e)
      return n(u, f);
    if (y in t)
      return n(void 0, u);
  }
  const m = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: l,
    headers: (u, f, y) => s(Xe(u), Xe(f), y, !0)
  };
  return c.forEach(Object.keys({ ...t, ...e }), function(f) {
    const y = m[f] || s, w = y(t[f], e[f], f);
    c.isUndefined(w) && y !== l || (r[f] = w);
  }), r;
}
const kt = (t) => {
  const e = ce({}, t);
  let { data: r, withXSRFToken: n, xsrfHeaderName: s, xsrfCookieName: i, headers: a, auth: l } = e;
  if (e.headers = a = J.from(a), e.url = bt(St(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), l && a.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), c.isFormData(r)) {
    if (z.hasStandardBrowserEnv || z.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if (c.isFunction(r.getHeaders)) {
      const m = r.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(m).forEach(([f, y]) => {
        u.includes(f.toLowerCase()) && a.set(f, y);
      });
    }
  }
  if (z.hasStandardBrowserEnv && (n && c.isFunction(n) && (n = n(e)), n || n !== !1 && en(e.url))) {
    const m = s && i && tn.read(i);
    m && a.set(s, m);
  }
  return e;
}, sn = typeof XMLHttpRequest < "u", an = sn && function(t) {
  return new Promise(function(r, n) {
    const s = kt(t);
    let i = s.data;
    const a = J.from(s.headers).normalize();
    let { responseType: l, onUploadProgress: m, onDownloadProgress: u } = s, f, y, w, A, d;
    function p() {
      A && A(), d && d(), s.cancelToken && s.cancelToken.unsubscribe(f), s.signal && s.signal.removeEventListener("abort", f);
    }
    let h = new XMLHttpRequest();
    h.open(s.method.toUpperCase(), s.url, !0), h.timeout = s.timeout;
    function k() {
      if (!h)
        return;
      const R = J.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), j = {
        data: !l || l === "text" || l === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: R,
        config: t,
        request: h
      };
      Et(function(O) {
        r(O), p();
      }, function(O) {
        n(O), p();
      }, j), h = null;
    }
    "onloadend" in h ? h.onloadend = k : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(k);
    }, h.onabort = function() {
      h && (n(new S("Request aborted", S.ECONNABORTED, t, h)), h = null);
    }, h.onerror = function(T) {
      const j = T && T.message ? T.message : "Network Error", b = new S(j, S.ERR_NETWORK, t, h);
      b.event = T || null, n(b), h = null;
    }, h.ontimeout = function() {
      let T = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const j = s.transitional || wt;
      s.timeoutErrorMessage && (T = s.timeoutErrorMessage), n(new S(
        T,
        j.clarifyTimeoutError ? S.ETIMEDOUT : S.ECONNABORTED,
        t,
        h
      )), h = null;
    }, i === void 0 && a.setContentType(null), "setRequestHeader" in h && c.forEach(a.toJSON(), function(T, j) {
      h.setRequestHeader(j, T);
    }), c.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials), l && l !== "json" && (h.responseType = s.responseType), u && ([w, d] = Ee(u, !0), h.addEventListener("progress", w)), m && h.upload && ([y, A] = Ee(m), h.upload.addEventListener("progress", y), h.upload.addEventListener("loadend", A)), (s.cancelToken || s.signal) && (f = (R) => {
      h && (n(!R || R.type ? new ue(null, t, h) : R), h.abort(), h = null);
    }, s.cancelToken && s.cancelToken.subscribe(f), s.signal && (s.signal.aborted ? f() : s.signal.addEventListener("abort", f)));
    const P = Gr(s.url);
    if (P && z.protocols.indexOf(P) === -1) {
      n(new S("Unsupported protocol " + P + ":", S.ERR_BAD_REQUEST, t));
      return;
    }
    h.send(i || null);
  });
}, on = (t, e) => {
  const { length: r } = t = t ? t.filter(Boolean) : [];
  if (e || r) {
    let n = new AbortController(), s;
    const i = function(u) {
      if (!s) {
        s = !0, l();
        const f = u instanceof Error ? u : this.reason;
        n.abort(f instanceof S ? f : new ue(f instanceof Error ? f.message : f));
      }
    };
    let a = e && setTimeout(() => {
      a = null, i(new S(`timeout ${e} of ms exceeded`, S.ETIMEDOUT));
    }, e);
    const l = () => {
      t && (a && clearTimeout(a), a = null, t.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener("abort", i);
      }), t = null);
    };
    t.forEach((u) => u.addEventListener("abort", i));
    const { signal: m } = n;
    return m.unsubscribe = () => c.asap(l), m;
  }
}, cn = function* (t, e) {
  let r = t.byteLength;
  if (r < e) {
    yield t;
    return;
  }
  let n = 0, s;
  for (; n < r; )
    s = n + e, yield t.slice(n, s), n = s;
}, ln = async function* (t, e) {
  for await (const r of dn(t))
    yield* cn(r, e);
}, dn = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await e.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await e.cancel();
  }
}, Ge = (t, e, r, n) => {
  const s = ln(t, e);
  let i = 0, a, l = (m) => {
    a || (a = !0, n && n(m));
  };
  return new ReadableStream({
    async pull(m) {
      try {
        const { done: u, value: f } = await s.next();
        if (u) {
          l(), m.close();
          return;
        }
        let y = f.byteLength;
        if (r) {
          let w = i += y;
          r(w);
        }
        m.enqueue(new Uint8Array(f));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(m) {
      return l(m), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ye = 64 * 1024, { isFunction: be } = c, un = (({ Request: t, Response: e }) => ({
  Request: t,
  Response: e
}))(c.global), {
  ReadableStream: Ze,
  TextEncoder: et
} = c.global, tt = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, fn = (t) => {
  t = c.merge.call({
    skipUndefined: !0
  }, un, t);
  const { fetch: e, Request: r, Response: n } = t, s = e ? be(e) : typeof fetch == "function", i = be(r), a = be(n);
  if (!s)
    return !1;
  const l = s && be(Ze), m = s && (typeof et == "function" ? /* @__PURE__ */ ((d) => (p) => d.encode(p))(new et()) : async (d) => new Uint8Array(await new r(d).arrayBuffer())), u = i && l && tt(() => {
    let d = !1;
    const p = new r(z.origin, {
      body: new Ze(),
      method: "POST",
      get duplex() {
        return d = !0, "half";
      }
    }).headers.has("Content-Type");
    return d && !p;
  }), f = a && l && tt(() => c.isReadableStream(new n("").body)), y = {
    stream: f && ((d) => d.body)
  };
  s && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((d) => {
    !y[d] && (y[d] = (p, h) => {
      let k = p && p[d];
      if (k)
        return k.call(p);
      throw new S(`Response type '${d}' is not supported`, S.ERR_NOT_SUPPORT, h);
    });
  });
  const w = async (d) => {
    if (d == null)
      return 0;
    if (c.isBlob(d))
      return d.size;
    if (c.isSpecCompliantForm(d))
      return (await new r(z.origin, {
        method: "POST",
        body: d
      }).arrayBuffer()).byteLength;
    if (c.isArrayBufferView(d) || c.isArrayBuffer(d))
      return d.byteLength;
    if (c.isURLSearchParams(d) && (d = d + ""), c.isString(d))
      return (await m(d)).byteLength;
  }, A = async (d, p) => {
    const h = c.toFiniteNumber(d.getContentLength());
    return h ?? w(p);
  };
  return async (d) => {
    let {
      url: p,
      method: h,
      data: k,
      signal: P,
      cancelToken: R,
      timeout: T,
      onDownloadProgress: j,
      onUploadProgress: b,
      responseType: O,
      headers: W,
      withCredentials: B = "same-origin",
      fetchOptions: _
    } = kt(d), re = e || fetch;
    O = O ? (O + "").toLowerCase() : "text";
    let Y = on([P, R && R.toAbortSignal()], T), X = null;
    const x = Y && Y.unsubscribe && (() => {
      Y.unsubscribe();
    });
    let N;
    try {
      if (b && u && h !== "get" && h !== "head" && (N = await A(W, k)) !== 0) {
        let Q = new r(p, {
          method: "POST",
          body: k,
          duplex: "half"
        }), E;
        if (c.isFormData(k) && (E = Q.headers.get("content-type")) && W.setContentType(E), Q.body) {
          const [I, ee] = Ke(
            N,
            Ee(Qe(b))
          );
          k = Ge(Q.body, Ye, I, ee);
        }
      }
      c.isString(B) || (B = B ? "include" : "omit");
      const v = i && "credentials" in r.prototype, L = {
        ..._,
        signal: Y,
        method: h.toUpperCase(),
        headers: W.normalize().toJSON(),
        body: k,
        duplex: "half",
        credentials: v ? B : void 0
      };
      X = i && new r(p, L);
      let D = await (i ? re(X, _) : re(p, L));
      const Z = f && (O === "stream" || O === "response");
      if (f && (j || Z && x)) {
        const Q = {};
        ["status", "statusText", "headers"].forEach((U) => {
          Q[U] = D[U];
        });
        const E = c.toFiniteNumber(D.headers.get("content-length")), [I, ee] = j && Ke(
          E,
          Ee(Qe(j), !0)
        ) || [];
        D = new n(
          Ge(D.body, Ye, I, () => {
            ee && ee(), x && x();
          }),
          Q
        );
      }
      O = O || "text";
      let fe = await y[c.findKey(y, O) || "text"](D, d);
      return !Z && x && x(), await new Promise((Q, E) => {
        Et(Q, E, {
          data: fe,
          headers: J.from(D.headers),
          status: D.status,
          statusText: D.statusText,
          config: d,
          request: X
        });
      });
    } catch (v) {
      throw x && x(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
        new S("Network Error", S.ERR_NETWORK, d, X),
        {
          cause: v.cause || v
        }
      ) : S.from(v, v && v.code, d, X);
    }
  };
}, hn = /* @__PURE__ */ new Map(), vt = (t) => {
  let e = t ? t.env : {};
  const { fetch: r, Request: n, Response: s } = e, i = [
    n,
    s,
    r
  ];
  let a = i.length, l = a, m, u, f = hn;
  for (; l--; )
    m = i[l], u = f.get(m), u === void 0 && f.set(m, u = l ? /* @__PURE__ */ new Map() : fn(e)), f = u;
  return u;
};
vt();
const Me = {
  http: Tr,
  xhr: an,
  fetch: {
    get: vt
  }
};
c.forEach(Me, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const rt = (t) => `- ${t}`, mn = (t) => c.isFunction(t) || t === null || t === !1, Ct = {
  getAdapter: (t, e) => {
    t = c.isArray(t) ? t : [t];
    const { length: r } = t;
    let n, s;
    const i = {};
    for (let a = 0; a < r; a++) {
      n = t[a];
      let l;
      if (s = n, !mn(n) && (s = Me[(l = String(n)).toLowerCase()], s === void 0))
        throw new S(`Unknown adapter '${l}'`);
      if (s && (c.isFunction(s) || (s = s.get(e))))
        break;
      i[l || "#" + a] = s;
    }
    if (!s) {
      const a = Object.entries(i).map(
        ([m, u]) => `adapter ${m} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = r ? a.length > 1 ? `since :
` + a.map(rt).join(`
`) : " " + rt(a[0]) : "as no adapter specified";
      throw new S(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: Me
};
function Pe(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ue(null, t);
}
function nt(t) {
  return Pe(t), t.headers = J.from(t.headers), t.data = Fe.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Ct.getAdapter(t.adapter || ye.adapter, t)(t).then(function(n) {
    return Pe(t), n.data = Fe.call(
      t,
      t.transformResponse,
      n
    ), n.headers = J.from(n.headers), n;
  }, function(n) {
    return Nt(n) || (Pe(t), n && n.response && (n.response.data = Fe.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = J.from(n.response.headers))), Promise.reject(n);
  });
}
const Rt = "1.12.2", Re = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Re[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const st = {};
Re.transitional = function(e, r, n) {
  function s(i, a) {
    return "[Axios v" + Rt + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, l) => {
    if (e === !1)
      throw new S(
        s(a, " has been removed" + (r ? " in " + r : "")),
        S.ERR_DEPRECATED
      );
    return r && !st[a] && (st[a] = !0, console.warn(
      s(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(i, a, l) : !0;
  };
};
Re.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function gn(t, e, r) {
  if (typeof t != "object")
    throw new S("options must be an object", S.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let s = n.length;
  for (; s-- > 0; ) {
    const i = n[s], a = e[i];
    if (a) {
      const l = t[i], m = l === void 0 || a(l, i, t);
      if (m !== !0)
        throw new S("option " + i + " must be " + m, S.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new S("Unknown option " + i, S.ERR_BAD_OPTION);
  }
}
const Ne = {
  assertOptions: gn,
  validators: Re
}, te = Ne.validators;
let ie = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new Ve(),
      response: new Ve()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? i && !String(n.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + i) : n.stack = i;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = ce(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: i } = r;
    n !== void 0 && Ne.assertOptions(n, {
      silentJSONParsing: te.transitional(te.boolean),
      forcedJSONParsing: te.transitional(te.boolean),
      clarifyTimeoutError: te.transitional(te.boolean)
    }, !1), s != null && (c.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : Ne.assertOptions(s, {
      encode: te.function,
      serialize: te.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), Ne.assertOptions(r, {
      baseUrl: te.spelling("baseURL"),
      withXsrfToken: te.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a = i && c.merge(
      i.common,
      i[r.method]
    );
    i && c.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete i[d];
      }
    ), r.headers = J.concat(a, i);
    const l = [];
    let m = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (m = m && p.synchronous, l.unshift(p.fulfilled, p.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(p) {
      u.push(p.fulfilled, p.rejected);
    });
    let f, y = 0, w;
    if (!m) {
      const d = [nt.bind(this), void 0];
      for (d.unshift(...l), d.push(...u), w = d.length, f = Promise.resolve(r); y < w; )
        f = f.then(d[y++], d[y++]);
      return f;
    }
    w = l.length;
    let A = r;
    for (; y < w; ) {
      const d = l[y++], p = l[y++];
      try {
        A = d(A);
      } catch (h) {
        p.call(this, h);
        break;
      }
    }
    try {
      f = nt.call(this, A);
    } catch (d) {
      return Promise.reject(d);
    }
    for (y = 0, w = u.length; y < w; )
      f = f.then(u[y++], u[y++]);
    return f;
  }
  getUri(e) {
    e = ce(this.defaults, e);
    const r = St(e.baseURL, e.url, e.allowAbsoluteUrls);
    return bt(r, e.params, e.paramsSerializer);
  }
};
c.forEach(["delete", "get", "head", "options"], function(e) {
  ie.prototype[e] = function(r, n) {
    return this.request(ce(n || {}, {
      method: e,
      url: r,
      data: (n || {}).data
    }));
  };
});
c.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
    return function(i, a, l) {
      return this.request(ce(l || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  ie.prototype[e] = r(), ie.prototype[e + "Form"] = r(!0);
});
let pn = class At {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const a = new Promise((l) => {
        n.subscribe(l), i = l;
      }).then(s);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, e(function(i, a, l) {
      n.reason || (n.reason = new ue(i, a, l), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), r = (n) => {
      e.abort(n);
    };
    return this.subscribe(r), e.signal.unsubscribe = () => this.unsubscribe(r), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new At(function(s) {
        e = s;
      }),
      cancel: e
    };
  }
};
function yn(t) {
  return function(r) {
    return t.apply(null, r);
  };
}
function bn(t) {
  return c.isObject(t) && t.isAxiosError === !0;
}
const Be = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Be).forEach(([t, e]) => {
  Be[e] = t;
});
function Tt(t) {
  const e = new ie(t), r = it(ie.prototype.request, e);
  return c.extend(r, ie.prototype, e, { allOwnKeys: !0 }), c.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(s) {
    return Tt(ce(t, s));
  }, r;
}
const M = Tt(ye);
M.Axios = ie;
M.CanceledError = ue;
M.CancelToken = pn;
M.isCancel = Nt;
M.VERSION = Rt;
M.toFormData = Ce;
M.AxiosError = S;
M.Cancel = M.CanceledError;
M.all = function(e) {
  return Promise.all(e);
};
M.spread = yn;
M.isAxiosError = bn;
M.mergeConfig = ce;
M.AxiosHeaders = J;
M.formToJSON = (t) => xt(c.isHTMLForm(t) ? new FormData(t) : t);
M.getAdapter = Ct.getAdapter;
M.HttpStatusCode = Be;
M.default = M;
const {
  Axios: On,
  AxiosError: Fn,
  CanceledError: Pn,
  isCancel: jn,
  CancelToken: Ln,
  VERSION: Un,
  all: Mn,
  Cancel: Bn,
  isAxiosError: Dn,
  spread: _n,
  toFormData: $n,
  AxiosHeaders: In,
  HttpStatusCode: zn,
  formToJSON: Hn,
  getAdapter: qn,
  mergeConfig: Wn
} = M;
class wn {
  constructor(e, r) {
    Te(this, "baseUrl");
    Te(this, "client");
    if (!e || !r)
      throw new Error("baseUrl and apiKey are required");
    this.baseUrl = e.endsWith("/") ? e.slice(0, -1) : e, this.client = M.create({
      baseURL: this.baseUrl,
      headers: {
        apikey: r,
        "Content-Type": "application/json"
      }
    });
  }
  /**
   * Get a specific instance by name
   */
  async getInstance(e) {
    try {
      const s = (await this.client.get(
        "/instance/fetchInstances"
      )).data.find((i) => i.name === e);
      if (!s)
        throw new Error(`Instance '${e}' not found`);
      return s;
    } catch (r) {
      throw new Error(`Failed to get instance: ${r.message}`);
    }
  }
  /**
   * Create a new WhatsApp instance
   */
  async createInstance(e, r = "WHATSAPP-BAILEYS") {
    try {
      return (await this.client.post(
        "/instance/create",
        {
          instanceName: e,
          integration: r
        }
      )).data;
    } catch (n) {
      throw new Error(`Failed to create instance: ${n.message}`);
    }
  }
  /**
   * List all instances
   */
  async listInstances() {
    try {
      return (await this.client.get(
        "/instance/fetchInstances"
      )).data;
    } catch (e) {
      throw new Error(`Failed to list instances: ${e.message}`);
    }
  }
  /**
   * Connect an instance and get QR code
   */
  async connectInstance(e) {
    try {
      return (await this.client.get(
        `/instance/connect/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to connect instance: ${r.message}`);
    }
  }
  /**
   * Disconnect/logout an instance
   */
  async disconnectInstance(e) {
    try {
      return (await this.client.delete(
        `/instance/logout/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to disconnect instance: ${r.message}`);
    }
  }
  /**
   * Delete an instance
   */
  async deleteInstance(e) {
    try {
      return (await this.client.delete(
        `/instance/delete/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to delete instance: ${r.message}`);
    }
  }
  /**
   * Get instance connection status
   */
  async getInstanceStatus(e) {
    try {
      return (await this.client.get(
        `/instance/connectionState/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get instance status: ${r.message}`);
    }
  }
  /**
   * Send a text message
   */
  async sendMessage(e, r, n) {
    try {
      const s = {
        number: r,
        text: n
      };
      return (await this.client.post(
        `/message/sendText/${e}`,
        s
      )).data;
    } catch (s) {
      throw new Error(`Failed to send message: ${s.message}`);
    }
  }
  /**
   * Send media (image, video, audio, document)
   */
  async sendMedia(e, r, n, s = "image", i = "") {
    try {
      const a = `/message/sendMedia/${e}`, l = {
        number: r,
        mediatype: s,
        media: n
      };
      return i && (l.caption = i), (await this.client.post(
        a,
        l
      )).data;
    } catch (a) {
      throw new Error(`Failed to send media: ${a.message}`);
    }
  }
  /**
   * Get chat messages
   */
  async getChatMessages(e, r, n = 50) {
    try {
      return (await this.client.get(
        `/chat/findMessages/${e}`,
        {
          params: { remoteJid: r, limit: n }
        }
      )).data;
    } catch (s) {
      throw new Error(`Failed to get messages: ${s.message}`);
    }
  }
  /**
   * Get all chats
   */
  async getChats(e) {
    try {
      return (await this.client.get(
        `/chat/findChats/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get chats: ${r.message}`);
    }
  }
  /**
   * Get contacts
   */
  async getContacts(e) {
    try {
      return (await this.client.get(
        `/chat/findContacts/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get contacts: ${r.message}`);
    }
  }
  /**
   * Set instance settings
   */
  async setInstanceSettings(e, r) {
    try {
      return (await this.client.post(
        `/settings/set/${e}`,
        r
      )).data;
    } catch (n) {
      throw new Error(`Failed to set settings: ${n.message}`);
    }
  }
  /**
   * Get instance settings
   */
  async getInstanceSettings(e) {
    try {
      return (await this.client.get(
        `/settings/find/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get settings: ${r.message}`);
    }
  }
  /**
   * Set webhook URL
   */
  async setWebhook(e, r, n = []) {
    try {
      const s = {
        url: r,
        events: n
      };
      return (await this.client.post(
        `/webhook/set/${e}`,
        s
      )).data;
    } catch (s) {
      throw new Error(`Failed to set webhook: ${s.message}`);
    }
  }
  /**
   * Get API status
   */
  async getApiStatus() {
    try {
      return (await this.client.get("/")).data;
    } catch (e) {
      throw new Error(`Failed to get API status: ${e.message}`);
    }
  }
  /**
   * Get instance profile
   */
  async getProfile(e) {
    try {
      return (await this.client.get(
        `/chat/fetchProfile/${e}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get profile: ${r.message}`);
    }
  }
  /**
   * Mark message as read
   */
  async markAsRead(e, r, n = !1, s) {
    try {
      const i = {
        remoteJid: r,
        fromMe: n,
        id: s
      };
      return (await this.client.post(
        `/chat/markMessageAsRead/${e}`,
        i
      )).data;
    } catch (i) {
      throw new Error(`Failed to mark as read: ${i.message}`);
    }
  }
  // Legacy method names for backward compatibility
  async get(e) {
    return this.getInstance(e);
  }
  async create(e, r) {
    return this.createInstance(e, r);
  }
  async list() {
    return this.listInstances();
  }
  async connect(e) {
    return this.connectInstance(e);
  }
  async disconnect(e) {
    return this.disconnectInstance(e);
  }
  async getQRCode(e) {
    return this.connectInstance(e);
  }
  async getStatus() {
    return this.getApiStatus();
  }
}
const Ot = (t) => {
  const [e, r] = F(null), [n, s] = F([]), [i, a] = F([]), [l, m] = F([]), [u, f] = F([]), [y, w] = F(!1), [A, d] = F(null);
  oe(() => {
    if (t.baseUrl && t.apiKey)
      try {
        const x = new wn(
          t.baseUrl,
          t.apiKey
        );
        r(x), d(null);
      } catch (x) {
        d(x.message);
      }
  }, [t.baseUrl, t.apiKey]);
  const p = H((x) => {
    d(x.message || "An error occurred"), w(!1);
  }, []), h = H(() => {
    d(null);
  }, []), k = H(
    async (x, N) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        w(!0), d(null);
        const v = await e.createInstance(x, N);
        return await _(), v;
      } catch (v) {
        throw p(v), v;
      } finally {
        w(!1);
      }
    },
    [e]
  ), P = H(
    async (x) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        w(!0), d(null);
        const N = await e.deleteInstance(x);
        return await _(), N;
      } catch (N) {
        throw p(N), N;
      } finally {
        w(!1);
      }
    },
    [e]
  ), R = H(
    async (x) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return w(!0), d(null), await e.connectInstance(x);
      } catch (N) {
        throw p(N), N;
      } finally {
        w(!1);
      }
    },
    [e]
  ), T = H(
    async (x) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        w(!0), d(null);
        const N = await e.disconnectInstance(x);
        return await _(), N;
      } catch (N) {
        throw p(N), N;
      } finally {
        w(!1);
      }
    },
    [e]
  ), j = H(
    async (x) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return d(null), await e.getInstanceStatus(x);
      } catch (N) {
        throw p(N), N;
      }
    },
    [e]
  ), b = H(
    async (x, N, v) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return w(!0), d(null), await e.sendMessage(x, N, v);
      } catch (L) {
        throw p(L), L;
      } finally {
        w(!1);
      }
    },
    [e]
  ), O = H(
    async (x, N, v, L = "image", D = "") => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return w(!0), d(null), await e.sendMedia(
          x,
          N,
          v,
          L,
          D
        );
      } catch (Z) {
        throw p(Z), Z;
      } finally {
        w(!1);
      }
    },
    [e]
  ), W = H(
    async (x, N, v = 50) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return d(null), await e.getChatMessages(
          x,
          N,
          v
        );
      } catch (L) {
        throw p(L), L;
      }
    },
    [e]
  ), B = H(
    async (x, N, v, L) => {
      if (!e) throw new Error("Manager not initialized");
      try {
        return d(null), await e.markAsRead(
          x,
          N,
          v,
          L
        );
      } catch (D) {
        throw p(D), D;
      }
    },
    [e]
  ), _ = H(async () => {
    if (e)
      try {
        w(!0), d(null);
        const x = await e.listInstances();
        s(x);
      } catch (x) {
        p(x);
      } finally {
        w(!1);
      }
  }, [e]), re = H(
    async (x) => {
      if (e)
        try {
          w(!0), d(null);
          const N = await e.getContacts(x);
          m(N);
        } catch (N) {
          p(N);
        } finally {
          w(!1);
        }
    },
    [e]
  ), Y = H(
    async (x) => {
      if (e)
        try {
          w(!0), d(null);
          const N = await e.getChats(x);
          f(N);
        } catch (N) {
          p(N);
        } finally {
          w(!1);
        }
    },
    [e]
  ), X = H(
    async (x, N, v = 50) => {
      if (e)
        try {
          w(!0), d(null);
          const L = await e.getChatMessages(
            x,
            N,
            v
          );
          a(L);
        } catch (L) {
          p(L);
        } finally {
          w(!1);
        }
    },
    [e]
  );
  return oe(() => {
    e && _();
  }, [e, _]), {
    manager: e,
    instances: n,
    messages: i,
    contacts: l,
    chats: u,
    loading: y,
    error: A,
    // Instance methods
    createInstance: k,
    deleteInstance: P,
    connectInstance: R,
    disconnectInstance: T,
    getInstanceStatus: j,
    // Message methods
    sendMessage: b,
    sendMedia: O,
    getChatMessages: W,
    markAsRead: B,
    // Data fetching methods
    refreshInstances: _,
    refreshContacts: re,
    refreshChats: Y,
    refreshMessages: X,
    // Utility methods
    clearError: h,
    setLoading: w
  };
}, xn = () => {
  const t = $t(at);
  if (!t)
    throw new Error("useTheme must be used within a ThemeProvider");
  return t;
};
function Ft(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (r = Ft(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function K() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++) (t = arguments[r]) && (e = Ft(t)) && (n && (n += " "), n += e);
  return n;
}
const q = ({
  className: t,
  children: e,
  ...r
}) => /* @__PURE__ */ o(
  "div",
  {
    className: K(
      "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6",
      t
    ),
    ...r,
    children: e
  }
), C = ({
  variant: t = "primary",
  size: e = "md",
  className: r,
  children: n,
  disabled: s,
  ...i
}) => {
  const a = "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", l = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500",
    danger: "bg-danger-500 hover:bg-danger-600 text-white focus:ring-danger-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:ring-gray-500"
  }, m = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return /* @__PURE__ */ o(
    "button",
    {
      className: K(a, l[t], m[e], r),
      disabled: s,
      ...i,
      children: n
    }
  );
}, ne = ({
  variant: t = "default",
  children: e,
  className: r
}) => /* @__PURE__ */ o(
  "span",
  {
    className: K(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      {
        success: "bg-success-500 text-white",
        warning: "bg-warning-500 text-white",
        danger: "bg-danger-500 text-white",
        default: "bg-gray-500 text-white"
      }[t],
      r
    ),
    children: e
  }
), Pt = (t) => {
  switch (t) {
    case "connected":
      return {
        bg: "bg-success-50 dark:bg-success-500/10",
        border: "border-success-500",
        text: "text-success-600 dark:text-success-400",
        badge: "bg-success-500"
      };
    case "connecting":
      return {
        bg: "bg-warning-50 dark:bg-warning-500/10",
        border: "border-warning-500",
        text: "text-warning-600 dark:text-warning-400",
        badge: "bg-warning-500"
      };
    case "disconnected":
      return {
        bg: "bg-danger-50 dark:bg-danger-500/10",
        border: "border-danger-500",
        text: "text-danger-600 dark:text-danger-400",
        badge: "bg-danger-500"
      };
    default:
      return {
        bg: "bg-gray-50 dark:bg-gray-500/10",
        border: "border-gray-500",
        text: "text-gray-600 dark:text-gray-400",
        badge: "bg-gray-500"
      };
  }
}, jt = (t) => {
  switch (t) {
    case "connected":
      return "Conectado";
    case "connecting":
      return "Conectando";
    case "disconnected":
      return "Desconectado";
    default:
      return "Desconhecido";
  }
}, Nn = ({
  instance: t,
  onConnect: e,
  onDisconnect: r,
  onDelete: n,
  onViewQR: s,
  onSettings: i
}) => {
  const a = Pt(t.status || "disconnected"), l = jt(t.status || "disconnected"), m = (u) => {
    switch (u) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      case "disconnected":
        return "danger";
      default:
        return "default";
    }
  };
  return /* @__PURE__ */ g(q, { className: "relative", children: [
    /* @__PURE__ */ g("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ g("div", { className: "flex-1", children: [
        /* @__PURE__ */ o("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-1", children: t.name }),
        /* @__PURE__ */ o("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: t.integration || "WHATSAPP-BAILEYS" })
      ] }),
      /* @__PURE__ */ o(ne, { variant: m(t.status || "disconnected"), children: l })
    ] }),
    /* @__PURE__ */ g(
      "div",
      {
        className: K(
          "flex items-center gap-2 p-3 rounded-lg mb-4",
          a.bg,
          a.border,
          "border"
        ),
        children: [
          /* @__PURE__ */ o("div", { className: K("w-2 h-2 rounded-full", a.badge) }),
          /* @__PURE__ */ o("span", { className: K("text-sm", a.text), children: l })
        ]
      }
    ),
    /* @__PURE__ */ g("div", { className: "space-y-2 mb-4", children: [
      /* @__PURE__ */ g("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ o("span", { className: "text-gray-500 dark:text-gray-400", children: "Integração:" }),
        /* @__PURE__ */ o("span", { className: "text-gray-900 dark:text-white", children: t.integration || "WHATSAPP-BAILEYS" })
      ] }),
      t.connectionState && /* @__PURE__ */ g("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ o("span", { className: "text-gray-500 dark:text-gray-400", children: "Estado:" }),
        /* @__PURE__ */ o("span", { className: "text-gray-900 dark:text-white", children: t.connectionState })
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-2", children: [
      t.status === "disconnected" && e && /* @__PURE__ */ o(
        C,
        {
          variant: "primary",
          size: "sm",
          onClick: () => e(t.name),
          children: "🔗 Conectar"
        }
      ),
      t.status === "connected" && r && /* @__PURE__ */ o(
        C,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => r(t.name),
          children: "⏸️ Desconectar"
        }
      ),
      s && /* @__PURE__ */ o(
        C,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => s(t.name),
          children: "📱 QR Code"
        }
      ),
      i && /* @__PURE__ */ o(
        C,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(t.name),
          children: "⚙️ Config"
        }
      ),
      n && /* @__PURE__ */ o(
        C,
        {
          variant: "danger",
          size: "sm",
          onClick: () => n(t.name),
          className: "ml-auto",
          children: "🗑️ Deletar"
        }
      )
    ] })
  ] });
}, Ie = ({
  isOpen: t,
  onClose: e,
  children: r,
  className: n
}) => t ? /* @__PURE__ */ o("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ g("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: [
  /* @__PURE__ */ o(
    "div",
    {
      className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
      onClick: e
    }
  ),
  /* @__PURE__ */ o(
    "div",
    {
      className: K(
        "relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",
        n
      ),
      children: /* @__PURE__ */ o("div", { className: "p-6", children: r })
    }
  )
] }) }) : null, Ae = ({
  label: t,
  helperText: e,
  error: r,
  className: n,
  ...s
}) => /* @__PURE__ */ g("div", { className: "w-full", children: [
  t && /* @__PURE__ */ o("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: t }),
  /* @__PURE__ */ o(
    "input",
    {
      className: K(
        "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200",
        r ? "border-danger-500 focus:ring-danger-500" : "border-gray-300 dark:border-gray-600",
        n
      ),
      ...s
    }
  ),
  e && /* @__PURE__ */ o(
    "p",
    {
      className: K(
        "mt-1 text-xs",
        r ? "text-danger-500" : "text-gray-500 dark:text-gray-400"
      ),
      children: e
    }
  )
] }), se = ({ size: t = "md", className: e }) => /* @__PURE__ */ o(
  "div",
  {
    className: K(
      "animate-spin rounded-full border-2 border-gray-300 border-t-primary-500",
      {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
      }[t],
      e
    )
  }
), Lt = ({
  isOpen: t,
  onClose: e,
  onSubmit: r,
  defaultName: n = ""
}) => {
  const [s, i] = F(n), [a, l] = F(!1);
  return /* @__PURE__ */ o(Ie, { isOpen: t, onClose: e, children: /* @__PURE__ */ o(q, { className: "max-w-md p-0", children: /* @__PURE__ */ g("div", { className: "p-6", children: [
    /* @__PURE__ */ o("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Nova Instância WhatsApp" }),
    /* @__PURE__ */ g("form", { onSubmit: async (u) => {
      if (u.preventDefault(), !!s.trim()) {
        l(!0);
        try {
          await r(s.trim()), i(""), e();
        } finally {
          l(!1);
        }
      }
    }, className: "space-y-4", children: [
      /* @__PURE__ */ o(
        Ae,
        {
          label: "Nome da Instância",
          placeholder: "ex: minha-instancia",
          value: s,
          onChange: (u) => i(u.target.value),
          helperText: "Use apenas letras, números, hífens e underscores",
          required: !0
        }
      ),
      /* @__PURE__ */ g("div", { className: "flex gap-3 justify-end pt-2", children: [
        /* @__PURE__ */ o(
          C,
          {
            type: "button",
            variant: "secondary",
            onClick: e,
            disabled: a,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ o(
          C,
          {
            type: "submit",
            variant: "primary",
            disabled: !s.trim() || a,
            className: "min-w-[100px]",
            children: a ? /* @__PURE__ */ o(se, { size: "sm" }) : "Criar"
          }
        )
      ] })
    ] })
  ] }) }) });
}, En = ({
  qrCode: t,
  size: e = 256,
  className: r = ""
}) => t ? /* @__PURE__ */ o(
  "div",
  {
    className: `inline-block p-4 bg-white rounded-lg shadow-sm ${r}`,
    children: /* @__PURE__ */ o(
      "img",
      {
        src: t,
        alt: "QR Code para conectar WhatsApp",
        className: "block",
        style: { width: e, height: e }
      }
    )
  }
) : /* @__PURE__ */ o(
  "div",
  {
    className: `flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg ${r}`,
    style: { width: e, height: e },
    children: /* @__PURE__ */ g("div", { className: "text-center", children: [
      /* @__PURE__ */ o(se, { size: "lg", className: "mb-2" }),
      /* @__PURE__ */ o("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Gerando QR Code..." })
    ] })
  }
), Ut = ({
  isOpen: t,
  onClose: e,
  instanceName: r,
  qrCode: n
}) => /* @__PURE__ */ o(Ie, { isOpen: t, onClose: e, children: /* @__PURE__ */ o(q, { className: "max-w-md p-0 text-center", children: /* @__PURE__ */ g("div", { className: "p-6", children: [
  /* @__PURE__ */ g("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: [
    "Conectar: ",
    r
  ] }),
  /* @__PURE__ */ o("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-6", children: "Escaneie o QR Code com seu WhatsApp" }),
  /* @__PURE__ */ o("div", { className: "mb-6", children: /* @__PURE__ */ o(En, { qrCode: n }) }),
  /* @__PURE__ */ o(C, { variant: "secondary", onClick: e, children: "Fechar" })
] }) }) }), Mt = ({
  isOpen: t,
  onClose: e,
  instanceName: r,
  settings: n,
  onSettingsChange: s,
  onSave: i
}) => {
  const a = (m, u) => {
    s({ ...n, [m]: u });
  };
  return /* @__PURE__ */ o(Ie, { isOpen: t, onClose: e, children: /* @__PURE__ */ o(q, { className: "max-w-lg p-0", children: /* @__PURE__ */ g("div", { className: "p-6", children: [
    /* @__PURE__ */ g("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: [
      "Configurações: ",
      r
    ] }),
    /* @__PURE__ */ g("div", { className: "space-y-4", children: [
      [
        { key: "rejectCall", label: "Auto-rejeitar chamadas" },
        { key: "groupsIgnore", label: "Ignorar mensagens de grupo" },
        { key: "alwaysOnline", label: "Sempre mostrar como online" },
        { key: "readMessages", label: "Auto-ler mensagens" },
        { key: "readStatus", label: "Auto-ler atualizações de status" },
        { key: "syncFullHistory", label: "Sincronizar histórico completo" }
      ].map(({ key: m, label: u }) => /* @__PURE__ */ g("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: m,
            checked: n[m],
            onChange: (f) => a(
              m,
              f.target.checked
            ),
            className: "w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          }
        ),
        /* @__PURE__ */ o(
          "label",
          {
            htmlFor: m,
            className: "text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
            children: u
          }
        )
      ] }, m)),
      n.rejectCall && /* @__PURE__ */ o("div", { className: "mt-4", children: /* @__PURE__ */ o(
        Ae,
        {
          label: "Mensagem ao rejeitar chamadas",
          value: n.msgCall,
          onChange: (m) => a("msgCall", m.target.value),
          placeholder: "Digite a mensagem..."
        }
      ) })
    ] }),
    /* @__PURE__ */ g("div", { className: "flex gap-3 justify-end pt-6 border-t border-gray-200 dark:border-gray-600 mt-6", children: [
      /* @__PURE__ */ o(C, { variant: "secondary", onClick: e, children: "Cancelar" }),
      /* @__PURE__ */ o(C, { variant: "primary", onClick: i, children: "Salvar" })
    ] })
  ] }) }) });
};
function Vn({
  baseUrl: t,
  apiKey: e,
  refreshInterval: r = 1e4,
  autoRefresh: n = !0,
  showCreateButton: s = !0,
  showThemeToggle: i = !1,
  maxInstances: a,
  className: l,
  style: m,
  onInstanceCreated: u,
  onInstanceDeleted: f,
  onInstanceConnected: y
}) {
  const { theme: w, toggleTheme: A } = xn(), [d, p] = F(!1), [h, k] = F(null), [P, R] = F(null), [T, j] = F(null), [b, O] = F({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: W,
    instances: B,
    loading: _,
    error: re,
    createInstance: Y,
    deleteInstance: X,
    connectInstance: x,
    refreshInstances: N,
    clearError: v
  } = Ot({ baseUrl: t, apiKey: e });
  oe(() => {
    if (!n) return;
    const E = setInterval(() => {
      N();
    }, r);
    return () => clearInterval(E);
  }, [N, n, r]);
  const L = async (E) => {
    try {
      await Y(E, "WHATSAPP-BAILEYS"), await N(), u == null || u(E);
    } catch (I) {
      console.error("Erro ao criar instância:", I);
    }
  }, D = async (E) => {
    var I, ee;
    try {
      const $ = await x(E), ze = ((I = $ == null ? void 0 : $.data) == null ? void 0 : I.qrcode) || ((ee = $ == null ? void 0 : $.data) == null ? void 0 : ee.base64) || ($ == null ? void 0 : $.qrcode) || ($ == null ? void 0 : $.base64) || ($ == null ? void 0 : $.qr);
      ze && (R(ze), k(E), y == null || y(E));
    } catch (U) {
      console.error("Erro ao conectar instância:", U);
    }
  }, Z = async (E) => {
    if (window.confirm(
      `Tem certeza que deseja deletar a instância "${E}"?`
    ))
      try {
        await X(E), await N(), f == null || f(E);
      } catch (I) {
        console.error("Erro ao deletar instância:", I);
      }
  }, fe = async (E) => {
    try {
      W && W.setInstanceSettings && (await W.setInstanceSettings(E, b), j(null), alert("Configurações salvas com sucesso!"));
    } catch (I) {
      console.error("Erro ao configurar instância:", I), alert("Erro ao salvar configurações");
    }
  }, Q = !a || B.length < a;
  return _ && B.length === 0 ? /* @__PURE__ */ o(
    "div",
    {
      className: `flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900 ${l}`,
      style: m,
      children: /* @__PURE__ */ o(se, { size: "lg" })
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: `min-h-screen bg-gray-50 dark:bg-gray-900 p-4 ${l}`,
      style: m,
      children: /* @__PURE__ */ g("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ g("div", { className: "flex justify-between items-center mb-8 flex-wrap gap-4", children: [
          /* @__PURE__ */ g("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [
            "Instâncias WhatsApp (",
            B.length,
            a && `/${a}`,
            ")"
          ] }),
          /* @__PURE__ */ g("div", { className: "flex gap-2 flex-wrap", children: [
            i && /* @__PURE__ */ o(C, { variant: "ghost", size: "sm", onClick: A, children: w.name === "light" ? "🌙" : "☀️" }),
            /* @__PURE__ */ o(C, { variant: "secondary", size: "sm", onClick: N, children: "🔄 Atualizar" }),
            s && Q && /* @__PURE__ */ o(
              C,
              {
                variant: "primary",
                size: "sm",
                onClick: () => p(!0),
                children: "➕ Nova Instância"
              }
            )
          ] })
        ] }),
        re && /* @__PURE__ */ o(q, { className: "mb-6 bg-danger-50 dark:bg-danger-500/10 border border-danger-500", children: /* @__PURE__ */ g("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ g("span", { className: "text-danger-600 dark:text-danger-400", children: [
            "❌ ",
            re
          ] }),
          /* @__PURE__ */ o(C, { variant: "ghost", size: "sm", onClick: v, children: "✕" })
        ] }) }),
        _ && /* @__PURE__ */ o("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ o(se, { size: "md" }) }),
        a && B.length >= a && /* @__PURE__ */ o(q, { className: "mb-6 bg-warning-50 dark:bg-warning-500/10 border border-warning-500", children: /* @__PURE__ */ g("span", { className: "text-warning-600 dark:text-warning-400", children: [
          "⚠️ Limite máximo de ",
          a,
          " instâncias atingido"
        ] }) }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: B.map((E) => /* @__PURE__ */ o(
          Nn,
          {
            instance: E,
            onConnect: () => D(E.name),
            onDelete: () => Z(E.name),
            onViewQR: () => k(E.name),
            onSettings: () => j(E.name)
          },
          E.name
        )) }),
        B.length === 0 && !_ && /* @__PURE__ */ g(q, { className: "text-center py-12", children: [
          /* @__PURE__ */ o("div", { className: "text-6xl mb-4", children: "📱" }),
          /* @__PURE__ */ o("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: "Nenhuma instância encontrada" }),
          /* @__PURE__ */ o("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Crie sua primeira instância WhatsApp para começar" }),
          s && /* @__PURE__ */ o(C, { variant: "primary", onClick: () => p(!0), children: "Criar Primeira Instância" })
        ] }),
        /* @__PURE__ */ o(
          Lt,
          {
            isOpen: d,
            onClose: () => p(!1),
            onSubmit: L
          }
        ),
        h && P && /* @__PURE__ */ o(
          Ut,
          {
            isOpen: !!h,
            instanceName: h,
            qrCode: P,
            onClose: () => {
              k(null), R(null);
            }
          }
        ),
        T && /* @__PURE__ */ o(
          Mt,
          {
            isOpen: !!T,
            instanceName: T,
            settings: b,
            onSettingsChange: O,
            onSave: () => fe(T),
            onClose: () => j(null)
          }
        )
      ] })
    }
  );
}
const Sn = ({
  status: t,
  instanceName: e,
  lastUpdate: r
}) => {
  const n = Pt(t), s = jt(t), i = (a) => {
    switch (a) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      case "disconnected":
        return "danger";
      default:
        return "default";
    }
  };
  return /* @__PURE__ */ g(
    "div",
    {
      className: K(
        "flex items-center justify-between p-3 border rounded-lg",
        n.bg,
        n.border
      ),
      children: [
        /* @__PURE__ */ g("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o("div", { className: K("w-3 h-3 rounded-full", n.badge) }),
          /* @__PURE__ */ g("div", { children: [
            /* @__PURE__ */ o("p", { className: K("text-sm font-medium", n.text), children: s }),
            /* @__PURE__ */ o("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: e })
          ] })
        ] }),
        /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o(ne, { variant: i(t), children: s }),
          r && /* @__PURE__ */ o("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: r.toLocaleTimeString() })
        ] })
      ]
    }
  );
}, Jn = ({
  baseUrl: t,
  apiKey: e,
  instanceId: r,
  showControls: n = !0,
  showStatus: s = !0,
  showSettings: i = !0,
  autoRefresh: a = !0,
  refreshInterval: l = 1e4,
  onInstanceCreated: m,
  onInstanceDeleted: u,
  onInstanceConnected: f,
  className: y,
  style: w
}) => {
  const [A, d] = F(!1), [p, h] = F(!1), [k, P] = F(null), [R, T] = F(!1), [j, b] = F({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: O,
    instances: W,
    loading: B,
    error: _,
    createInstance: re,
    deleteInstance: Y,
    connectInstance: X,
    refreshInstances: x,
    clearError: N
  } = Ot({
    baseUrl: t,
    apiKey: e
  }), v = W.find(
    (E) => E.name === r
  );
  oe(() => {
    if (!a) return;
    const E = setInterval(() => {
      x();
    }, l);
    return () => clearInterval(E);
  }, [x, a, l]), oe(() => {
    x();
  }, [r, x]);
  const L = async (E) => {
    try {
      await re(E || r, "WHATSAPP-BAILEYS"), await x(), m == null || m(E || r);
    } catch (I) {
      console.error("Erro ao criar instância:", I);
    }
  }, D = async () => {
    var E, I;
    if (r)
      try {
        const U = await X(r), $ = ((E = U == null ? void 0 : U.data) == null ? void 0 : E.qrcode) || ((I = U == null ? void 0 : U.data) == null ? void 0 : I.base64) || (U == null ? void 0 : U.qrcode) || (U == null ? void 0 : U.base64) || (U == null ? void 0 : U.qr);
        $ && (P($), h(!0), f == null || f(r));
      } catch (ee) {
        console.error("Erro ao conectar instância:", ee);
      }
  }, Z = async () => {
    if (r && window.confirm(
      `Tem certeza que deseja deletar a instância "${r}"?`
    ))
      try {
        await Y(r), await x(), u == null || u(r);
      } catch (E) {
        console.error("Erro ao deletar instância:", E);
      }
  }, fe = async () => {
    try {
      O && O.setInstanceSettings && r && (await O.setInstanceSettings(r, j), T(!1), alert("Configurações salvas com sucesso!"));
    } catch (E) {
      console.error("Erro ao configurar instância:", E), alert("Erro ao salvar configurações");
    }
  }, Q = (E) => {
    switch (E) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando";
      case "disconnected":
        return "Desconectado";
      default:
        return "Desconhecido";
    }
  };
  return B ? /* @__PURE__ */ o(
    "div",
    {
      className: `flex justify-center items-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg ${y}`,
      style: w,
      children: /* @__PURE__ */ o(se, { size: "lg" })
    }
  ) : v ? /* @__PURE__ */ g("div", { className: y, style: w, children: [
    /* @__PURE__ */ g(q, { className: "p-6", children: [
      /* @__PURE__ */ g("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ o("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-2", children: v.name }),
          s && /* @__PURE__ */ o(
            ne,
            {
              variant: v.status === "connected" ? "success" : v.status === "connecting" ? "warning" : "danger",
              children: Q(v.status || "disconnected")
            }
          )
        ] }),
        /* @__PURE__ */ o(
          C,
          {
            variant: "ghost",
            size: "sm",
            onClick: x,
            disabled: B,
            children: "🔄"
          }
        )
      ] }),
      s && /* @__PURE__ */ o("div", { className: "mb-4", children: /* @__PURE__ */ o(
        Sn,
        {
          status: v.status || "disconnected",
          instanceName: v.name,
          lastUpdate: /* @__PURE__ */ new Date(),
          onReconnect: D
        }
      ) }),
      n && /* @__PURE__ */ g("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4", children: [
        /* @__PURE__ */ o(
          C,
          {
            variant: "primary",
            size: "sm",
            onClick: D,
            disabled: B,
            children: "🔗 Conectar"
          }
        ),
        i && /* @__PURE__ */ o(
          C,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => T(!0),
            disabled: B,
            children: "⚙️ Configurar"
          }
        ),
        /* @__PURE__ */ o(
          C,
          {
            variant: "danger",
            size: "sm",
            onClick: Z,
            disabled: B,
            children: "🗑️ Deletar"
          }
        )
      ] }),
      /* @__PURE__ */ g("div", { className: "text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3", children: [
        /* @__PURE__ */ g("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ o("span", { children: "Integração:" }),
          /* @__PURE__ */ o("span", { children: v.integration || "WHATSAPP-BAILEYS" })
        ] }),
        /* @__PURE__ */ g("div", { className: "flex justify-between mt-1", children: [
          /* @__PURE__ */ o("span", { children: "Última atualização:" }),
          /* @__PURE__ */ o("span", { children: (/* @__PURE__ */ new Date()).toLocaleString() })
        ] })
      ] }),
      _ && /* @__PURE__ */ g("div", { className: "mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center", children: [
        /* @__PURE__ */ g("span", { className: "text-danger-600 dark:text-danger-400 text-sm", children: [
          "❌ ",
          _
        ] }),
        /* @__PURE__ */ o(C, { variant: "ghost", size: "sm", onClick: N, children: "✕" })
      ] })
    ] }),
    p && k && /* @__PURE__ */ o(
      Ut,
      {
        isOpen: p,
        instanceName: r,
        qrCode: k,
        onClose: () => {
          h(!1), P(null);
        }
      }
    ),
    R && /* @__PURE__ */ o(
      Mt,
      {
        isOpen: R,
        instanceName: r,
        settings: j,
        onSettingsChange: b,
        onSave: fe,
        onClose: () => T(!1)
      }
    )
  ] }) : /* @__PURE__ */ o("div", { className: y, style: w, children: /* @__PURE__ */ g(q, { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center", children: [
    /* @__PURE__ */ o("div", { className: "text-6xl mb-4", children: "📱" }),
    /* @__PURE__ */ g("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: [
      'Instância "',
      r,
      '" não encontrada'
    ] }),
    /* @__PURE__ */ o("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Esta instância não existe. Deseja criá-la?" }),
    /* @__PURE__ */ g("div", { className: "flex gap-2 justify-center", children: [
      /* @__PURE__ */ o(C, { variant: "primary", onClick: () => d(!0), children: "➕ Criar Instância" }),
      /* @__PURE__ */ o(C, { variant: "ghost", onClick: x, children: "🔄 Atualizar" })
    ] }),
    _ && /* @__PURE__ */ g("div", { className: "mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center", children: [
      /* @__PURE__ */ g("span", { className: "text-danger-600 dark:text-danger-400 text-sm", children: [
        "❌ ",
        _
      ] }),
      /* @__PURE__ */ o(C, { variant: "ghost", size: "sm", onClick: N, children: "✕" })
    ] }),
    /* @__PURE__ */ o(
      Lt,
      {
        isOpen: A,
        onClose: () => d(!1),
        onSubmit: L,
        defaultName: r
      }
    )
  ] }) });
}, Kn = ({
  instanceId: t,
  contactId: e,
  messages: r = [],
  loading: n = !1,
  onSendMessage: s,
  onMessageAction: i,
  showInput: a = !0,
  autoScroll: l = !0,
  className: m
}) => {
  const [u, f] = F(""), [y, w] = F(!1), A = It(null), d = () => {
    var b;
    (b = A.current) == null || b.scrollIntoView({ behavior: "smooth" });
  };
  oe(() => {
    l && d();
  }, [r, l]);
  const p = (b) => {
    switch (b) {
      case "text":
        return "default";
      case "image":
        return "success";
      case "audio":
        return "warning";
      case "video":
        return "success";
      case "document":
        return "default";
      default:
        return "default";
    }
  }, h = (b) => b.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }), k = (b) => {
    if (!b) return "";
    const O = ["Bytes", "KB", "MB", "GB"], W = Math.floor(Math.log(b) / Math.log(1024));
    return Math.round(b / Math.pow(1024, W) * 100) / 100 + " " + O[W];
  }, P = async () => {
    if (!(!u.trim() || !e || y)) {
      w(!0);
      try {
        await (s == null ? void 0 : s(u.trim(), e)), f("");
      } catch (b) {
        console.error("Erro ao enviar mensagem:", b);
      } finally {
        w(!1);
      }
    }
  }, R = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), P());
  }, T = (b, O) => {
    i == null || i(b, O);
  }, j = (b) => {
    switch (b.type) {
      case "image":
        return /* @__PURE__ */ g("div", { className: "max-w-xs", children: [
          b.mediaUrl && /* @__PURE__ */ o(
            "img",
            {
              src: b.mediaUrl,
              alt: "Imagem",
              className: "rounded-lg max-w-full h-auto"
            }
          ),
          b.text && /* @__PURE__ */ o("p", { className: "mt-2 text-sm", children: b.text })
        ] });
      case "audio":
        return /* @__PURE__ */ g("div", { className: "flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
          /* @__PURE__ */ o("span", { className: "text-2xl", children: "🎵" }),
          /* @__PURE__ */ g("div", { children: [
            /* @__PURE__ */ o("p", { className: "text-sm font-medium", children: "Áudio" }),
            b.fileName && /* @__PURE__ */ o("p", { className: "text-xs text-gray-500", children: b.fileName })
          ] })
        ] });
      case "video":
        return /* @__PURE__ */ g("div", { className: "max-w-xs", children: [
          b.mediaUrl ? /* @__PURE__ */ o(
            "video",
            {
              controls: !0,
              className: "rounded-lg max-w-full h-auto",
              src: b.mediaUrl
            }
          ) : /* @__PURE__ */ g("div", { className: "flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
            /* @__PURE__ */ o("span", { className: "text-2xl", children: "🎥" }),
            /* @__PURE__ */ g("div", { children: [
              /* @__PURE__ */ o("p", { className: "text-sm font-medium", children: "Vídeo" }),
              b.fileName && /* @__PURE__ */ o("p", { className: "text-xs text-gray-500", children: b.fileName })
            ] })
          ] }),
          b.text && /* @__PURE__ */ o("p", { className: "mt-2 text-sm", children: b.text })
        ] });
      case "document":
        return /* @__PURE__ */ g("div", { className: "flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs", children: [
          /* @__PURE__ */ o("span", { className: "text-2xl", children: "📄" }),
          /* @__PURE__ */ g("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("p", { className: "text-sm font-medium truncate", children: b.fileName || "Documento" }),
            b.fileSize && /* @__PURE__ */ o("p", { className: "text-xs text-gray-500", children: k(b.fileSize) })
          ] })
        ] });
      case "sticker":
        return /* @__PURE__ */ o("div", { className: "w-24 h-24", children: b.mediaUrl ? /* @__PURE__ */ o(
          "img",
          {
            src: b.mediaUrl,
            alt: "Sticker",
            className: "w-full h-full object-contain"
          }
        ) : /* @__PURE__ */ o("div", { className: "w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ o("span", { className: "text-2xl", children: "😀" }) }) });
      default:
        return /* @__PURE__ */ o("p", { className: "text-sm", children: b.text });
    }
  };
  return n ? /* @__PURE__ */ o(q, { className: `p-6 ${m}`, children: /* @__PURE__ */ g("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ o(se, { size: "lg" }),
    /* @__PURE__ */ o("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando mensagens..." })
  ] }) }) : e ? /* @__PURE__ */ g(q, { className: `flex flex-col h-96 ${m}`, children: [
    /* @__PURE__ */ g("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ o("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Mensagens" }),
      /* @__PURE__ */ g("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ o(ne, { variant: "default", children: t }),
        /* @__PURE__ */ o(ne, { variant: "default", children: r.length })
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      r.length === 0 ? /* @__PURE__ */ g("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ o("div", { className: "text-4xl mb-2", children: "📱" }),
        /* @__PURE__ */ o("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: "Nenhuma mensagem ainda" })
      ] }) : r.map((b) => /* @__PURE__ */ o(
        "div",
        {
          className: `flex ${b.isFromMe ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ g(
            "div",
            {
              className: `
                  max-w-[70%] rounded-lg p-3 relative group
                  ${b.isFromMe ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"}
                `,
              children: [
                b.quotedMessage && /* @__PURE__ */ g("div", { className: "mb-2 p-2 border-l-4 border-gray-300 bg-black/10 rounded text-xs", children: [
                  /* @__PURE__ */ o("p", { className: "font-medium opacity-70", children: b.quotedMessage.from }),
                  /* @__PURE__ */ o("p", { className: "opacity-70 truncate", children: b.quotedMessage.text })
                ] }),
                /* @__PURE__ */ o("div", { children: j(b) }),
                /* @__PURE__ */ g("div", { className: "flex items-center justify-between mt-2 text-xs opacity-70", children: [
                  /* @__PURE__ */ g("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ o(ne, { variant: p(b.type), children: b.type }),
                    /* @__PURE__ */ o("span", { children: h(b.timestamp) })
                  ] }),
                  b.isFromMe && /* @__PURE__ */ o("span", { children: b.isRead ? "✓✓" : "✓" })
                ] }),
                /* @__PURE__ */ o("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ o(
                  C,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => T(b.id, "reply"),
                    className: "text-xs p-1",
                    title: "Responder",
                    children: "↩️"
                  }
                ) })
              ]
            }
          )
        },
        b.id
      )),
      /* @__PURE__ */ o("div", { ref: A })
    ] }),
    a && e && /* @__PURE__ */ o("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ g("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ o(
        Ae,
        {
          type: "text",
          placeholder: "Digite sua mensagem...",
          value: u,
          onChange: (b) => f(b.target.value),
          onKeyPress: R,
          disabled: y,
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ o(
        C,
        {
          variant: "primary",
          onClick: P,
          disabled: !u.trim() || y,
          children: y ? /* @__PURE__ */ o(se, { size: "sm" }) : "📤"
        }
      )
    ] }) })
  ] }) : /* @__PURE__ */ o(q, { className: `p-6 ${m}`, children: /* @__PURE__ */ g("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ o("div", { className: "text-6xl mb-4", children: "💬" }),
    /* @__PURE__ */ o("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Selecione um contato" }),
    /* @__PURE__ */ o("p", { className: "text-gray-500 dark:text-gray-400", children: "Escolha um contato para ver as mensagens." })
  ] }) });
}, Qn = ({
  instanceId: t,
  contacts: e = [],
  loading: r = !1,
  onContactSelect: n,
  onContactAction: s,
  showSearch: i = !0,
  showActions: a = !0,
  className: l
}) => {
  const [m, u] = F(""), [f, y] = F(null), w = e.filter(
    (h) => h.name.toLowerCase().includes(m.toLowerCase()) || h.phone.includes(m)
  ), A = (h) => h ? "success" : "default", d = (h) => {
    y(h.id), n == null || n(h);
  }, p = (h, k) => {
    s == null || s(h, k);
  };
  return r ? /* @__PURE__ */ o(q, { className: `p-6 ${l}`, children: /* @__PURE__ */ g("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ o(se, { size: "lg" }),
    /* @__PURE__ */ o("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando contatos..." })
  ] }) }) : e.length === 0 ? /* @__PURE__ */ o(q, { className: `p-6 ${l}`, children: /* @__PURE__ */ g("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ o("div", { className: "text-6xl mb-4", children: "👥" }),
    /* @__PURE__ */ o("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Nenhum contato encontrado" }),
    /* @__PURE__ */ o("p", { className: "text-gray-500 dark:text-gray-400", children: "Os contatos aparecerão aqui quando a instância estiver conectada." })
  ] }) }) : /* @__PURE__ */ g(q, { className: `p-4 ${l}`, children: [
    /* @__PURE__ */ g("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ g("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: [
        "Contatos (",
        e.length,
        ")"
      ] }),
      /* @__PURE__ */ o(ne, { variant: "default", children: t })
    ] }),
    i && /* @__PURE__ */ o("div", { className: "mb-4", children: /* @__PURE__ */ o(
      Ae,
      {
        type: "search",
        placeholder: "Buscar contatos...",
        value: m,
        onChange: (h) => u(h.target.value),
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: w.map((h) => /* @__PURE__ */ o(
      "div",
      {
        className: `
              p-3 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors
              ${f === h.id ? "bg-primary-50 dark:bg-primary-500/10 border-primary-500" : "bg-white dark:bg-gray-800"}
            `,
        onClick: () => d(h),
        children: /* @__PURE__ */ g("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ g("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ o("div", { className: "w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden", children: h.profilePicture ? /* @__PURE__ */ o(
              "img",
              {
                src: h.profilePicture,
                alt: h.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ o("span", { className: "text-sm font-medium text-gray-600 dark:text-gray-300", children: h.name.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ g("div", { className: "flex-1", children: [
              /* @__PURE__ */ g("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ o("h4", { className: "font-medium text-gray-900 dark:text-white text-sm", children: h.name }),
                h.isGroup && /* @__PURE__ */ g(ne, { variant: "default", children: [
                  "👥 ",
                  h.groupParticipants || 0
                ] }),
                /* @__PURE__ */ o(ne, { variant: A(h.isOnline), children: h.isOnline ? "Online" : "Offline" })
              ] }),
              /* @__PURE__ */ o("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: h.phone }),
              h.lastSeen && !h.isOnline && /* @__PURE__ */ g("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: [
                "Visto por último: ",
                h.lastSeen.toLocaleString()
              ] })
            ] })
          ] }),
          a && /* @__PURE__ */ g("div", { className: "flex space-x-1", children: [
            /* @__PURE__ */ o(
              C,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), p(h.id, "message");
                },
                title: "Enviar mensagem",
                children: "💬"
              }
            ),
            /* @__PURE__ */ o(
              C,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), p(h.id, "call");
                },
                title: "Ligar",
                children: "📞"
              }
            ),
            h.isBlocked ? /* @__PURE__ */ o(
              C,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), p(h.id, "unblock");
                },
                title: "Desbloquear",
                children: "🔓"
              }
            ) : /* @__PURE__ */ o(
              C,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), p(h.id, "block");
                },
                title: "Bloquear",
                children: "🚫"
              }
            )
          ] })
        ] })
      },
      h.id
    )) }),
    m && /* @__PURE__ */ o("div", { className: "mt-3 pt-3 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ g("p", { className: "text-sm text-gray-500 dark:text-gray-400 text-center", children: [
      w.length,
      " contato(s) encontrado(s)"
    ] }) })
  ] });
}, Xn = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#f3f4f6",
    secondaryHover: "#e5e7eb",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#d1d5db",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444"
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  borderRadius: "8px"
}, Gn = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#374151",
    secondaryHover: "#4b5563",
    background: "#111827",
    surface: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    border: "#374151",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444"
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  borderRadius: "8px"
};
export {
  ne as Badge,
  C as Button,
  q as Card,
  Sn as ConnectionStatus,
  Qn as ContactList,
  wn as EvolutionManager,
  Ae as Input,
  Nn as InstanceCard,
  Jn as InstanceController,
  Vn as InstanceManager,
  se as Loading,
  Kn as MessageList,
  Ie as Modal,
  En as QRCodeDisplay,
  Rn as ThemeProvider,
  Gn as darkTheme,
  Xn as defaultTheme,
  Ot as useEvolutionManager,
  xn as useTheme
};
