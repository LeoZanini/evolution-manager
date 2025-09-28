var tn = Object.defineProperty;
var rn = (e, t, r) => t in e ? tn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var rt = (e, t, r) => rn(e, typeof t != "symbol" ? t + "" : t, r);
import { jsx as i, jsxs as m, Fragment as Pt } from "react/jsx-runtime";
import * as x from "react";
import { createContext as nn, useState as L, useEffect as ve, useCallback as X, useContext as an, forwardRef as sn, createElement as Ot, useRef as on } from "react";
const sr = nn(
  void 0
), ln = {
  name: "light",
  isDark: !1,
  colors: {
    background: "#ffffff",
    foreground: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "#e5e7eb",
    muted: "#f3f4f6",
    text: "#1f2937"
    // Legacy compatibility
  }
}, cn = {
  name: "dark",
  isDark: !0,
  colors: {
    background: "#1f2937",
    foreground: "#f9fafb",
    primary: "#60a5fa",
    secondary: "#9ca3af",
    accent: "#a78bfa",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    border: "#374151",
    muted: "#111827",
    text: "#f9fafb"
    // Legacy compatibility
  }
}, mo = ({ children: e }) => {
  const [t, r] = L(!1), [n, a] = L(!1);
  ve(() => {
    const f = localStorage.getItem("evolution-theme-mode"), y = localStorage.getItem("evolution-theme-is-custom"), k = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches, h = f || (k ? "dark" : "light"), b = y === "true";
    r(h === "dark"), a(b), console.log("Inicializando tema:", {
      mode: h,
      isCustom: b
    });
    const g = o(h, b);
    s(g);
  }, []);
  const o = (f, y) => {
    if (y) {
      const h = localStorage.getItem(
        `evolution-custom-theme-${f}`
      );
      if (h)
        try {
          const b = JSON.parse(h);
          return console.log(`Carregando tema personalizado ${f}:`, b), b;
        } catch (b) {
          console.error(`Erro ao carregar tema personalizado ${f}:`, b);
        }
    }
    const k = f === "dark" ? cn : ln;
    return console.log(`Usando tema padrão ${f}:`, k), k;
  }, s = (f) => {
    const y = document.documentElement, k = y.style;
    for (let h = k.length - 1; h >= 0; h--) {
      const b = k[h];
      b.startsWith("--theme-") && k.removeProperty(b);
    }
    Object.entries(f.colors).forEach(([h, b]) => {
      y.style.setProperty(`--theme-${h}`, b);
    }), f.isDark ? y.classList.add("dark") : y.classList.remove("dark");
  }, l = () => {
    const f = t ? "light" : "dark";
    r(!t), localStorage.setItem("evolution-theme-mode", f), console.log("Toggle theme:", {
      fromMode: t ? "dark" : "light",
      toMode: f,
      isCustom: n
    });
    const y = o(f, n);
    s(y);
  }, u = (f) => {
    console.log("Definindo novo tema personalizado:", f);
    const y = f.isDark ? "dark" : "light";
    localStorage.setItem(
      `evolution-custom-theme-${y}`,
      JSON.stringify(f)
    ), localStorage.setItem("evolution-theme-is-custom", "true"), localStorage.setItem("evolution-theme-mode", y), a(!0), r(f.isDark), s(f);
  }, c = () => {
    console.log("Resetando para tema padrão"), localStorage.setItem("evolution-theme-is-custom", "false"), a(!1);
    const y = o(t ? "dark" : "light", !1);
    s(y);
  }, d = o(
    t ? "dark" : "light",
    n
  );
  return /* @__PURE__ */ i(
    sr.Provider,
    {
      value: {
        theme: d,
        toggleTheme: l,
        setCustomTheme: u,
        resetToDefaultTheme: c,
        isCustomTheme: n,
        isDarkMode: t
      },
      children: e
    }
  );
};
function or(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: dn } = Object.prototype, { getPrototypeOf: pt } = Object, { iterator: Ke, toStringTag: ir } = Symbol, Qe = /* @__PURE__ */ ((e) => (t) => {
  const r = dn.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ae = (e) => (e = e.toLowerCase(), (t) => Qe(t) === e), Ge = (e) => (t) => typeof t === e, { isArray: Ce } = Array, ke = Ge("undefined");
function Oe(e) {
  return e !== null && !ke(e) && e.constructor !== null && !ke(e.constructor) && Z(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const lr = ae("ArrayBuffer");
function un(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && lr(e.buffer), t;
}
const hn = Ge("string"), Z = Ge("function"), cr = Ge("number"), Le = (e) => e !== null && typeof e == "object", fn = (e) => e === !0 || e === !1, ze = (e) => {
  if (Qe(e) !== "object")
    return !1;
  const t = pt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(ir in e) && !(Ke in e);
}, mn = (e) => {
  if (!Le(e) || Oe(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, pn = ae("Date"), gn = ae("File"), yn = ae("Blob"), bn = ae("FileList"), xn = (e) => Le(e) && Z(e.pipe), wn = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Z(e.append) && ((t = Qe(e)) === "formdata" || // detect form-data instance
  t === "object" && Z(e.toString) && e.toString() === "[object FormData]"));
}, vn = ae("URLSearchParams"), [kn, Nn, Cn, En] = ["ReadableStream", "Request", "Response", "Headers"].map(ae), Sn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Me(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, a;
  if (typeof e != "object" && (e = [e]), Ce(e))
    for (n = 0, a = e.length; n < a; n++)
      t.call(null, e[n], n, e);
  else {
    if (Oe(e))
      return;
    const o = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let l;
    for (n = 0; n < s; n++)
      l = o[n], t.call(null, e[l], l, e);
  }
}
function dr(e, t) {
  if (Oe(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, a;
  for (; n-- > 0; )
    if (a = r[n], t === a.toLowerCase())
      return a;
  return null;
}
const pe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ur = (e) => !ke(e) && e !== pe;
function lt() {
  const { caseless: e, skipUndefined: t } = ur(this) && this || {}, r = {}, n = (a, o) => {
    const s = e && dr(r, o) || o;
    ze(r[s]) && ze(a) ? r[s] = lt(r[s], a) : ze(a) ? r[s] = lt({}, a) : Ce(a) ? r[s] = a.slice() : (!t || !ke(a)) && (r[s] = a);
  };
  for (let a = 0, o = arguments.length; a < o; a++)
    arguments[a] && Me(arguments[a], n);
  return r;
}
const Rn = (e, t, r, { allOwnKeys: n } = {}) => (Me(t, (a, o) => {
  r && Z(a) ? e[o] = or(a, r) : e[o] = a;
}, { allOwnKeys: n }), e), Tn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), An = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Pn = (e, t, r, n) => {
  let a, o, s;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (a = Object.getOwnPropertyNames(e), o = a.length; o-- > 0; )
      s = a[o], (!n || n(s, e, t)) && !l[s] && (t[s] = e[s], l[s] = !0);
    e = r !== !1 && pt(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, On = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Ln = (e) => {
  if (!e) return null;
  if (Ce(e)) return e;
  let t = e.length;
  if (!cr(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Mn = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && pt(Uint8Array)), $n = (e, t) => {
  const n = (e && e[Ke]).call(e);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const o = a.value;
    t.call(e, o[0], o[1]);
  }
}, Fn = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Dn = ae("HTMLFormElement"), In = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, a) {
    return n.toUpperCase() + a;
  }
), Lt = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), jn = ae("RegExp"), hr = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Me(r, (a, o) => {
    let s;
    (s = t(a, o, e)) !== !1 && (n[o] = s || a);
  }), Object.defineProperties(e, n);
}, Bn = (e) => {
  hr(e, (t, r) => {
    if (Z(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Z(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, zn = (e, t) => {
  const r = {}, n = (a) => {
    a.forEach((o) => {
      r[o] = !0;
    });
  };
  return Ce(e) ? n(e) : n(String(e).split(t)), r;
}, Un = () => {
}, _n = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Hn(e) {
  return !!(e && Z(e.append) && e[ir] === "FormData" && e[Ke]);
}
const qn = (e) => {
  const t = new Array(10), r = (n, a) => {
    if (Le(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Oe(n))
        return n;
      if (!("toJSON" in n)) {
        t[a] = n;
        const o = Ce(n) ? [] : {};
        return Me(n, (s, l) => {
          const u = r(s, a + 1);
          !ke(u) && (o[l] = u);
        }), t[a] = void 0, o;
      }
    }
    return n;
  };
  return r(e, 0);
}, Wn = ae("AsyncFunction"), Vn = (e) => e && (Le(e) || Z(e)) && Z(e.then) && Z(e.catch), fr = ((e, t) => e ? setImmediate : t ? ((r, n) => (pe.addEventListener("message", ({ source: a, data: o }) => {
  a === pe && o === r && n.length && n.shift()();
}, !1), (a) => {
  n.push(a), pe.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Z(pe.postMessage)
), Jn = typeof queueMicrotask < "u" ? queueMicrotask.bind(pe) : typeof process < "u" && process.nextTick || fr, Kn = (e) => e != null && Z(e[Ke]), p = {
  isArray: Ce,
  isArrayBuffer: lr,
  isBuffer: Oe,
  isFormData: wn,
  isArrayBufferView: un,
  isString: hn,
  isNumber: cr,
  isBoolean: fn,
  isObject: Le,
  isPlainObject: ze,
  isEmptyObject: mn,
  isReadableStream: kn,
  isRequest: Nn,
  isResponse: Cn,
  isHeaders: En,
  isUndefined: ke,
  isDate: pn,
  isFile: gn,
  isBlob: yn,
  isRegExp: jn,
  isFunction: Z,
  isStream: xn,
  isURLSearchParams: vn,
  isTypedArray: Mn,
  isFileList: bn,
  forEach: Me,
  merge: lt,
  extend: Rn,
  trim: Sn,
  stripBOM: Tn,
  inherits: An,
  toFlatObject: Pn,
  kindOf: Qe,
  kindOfTest: ae,
  endsWith: On,
  toArray: Ln,
  forEachEntry: $n,
  matchAll: Fn,
  isHTMLForm: Dn,
  hasOwnProperty: Lt,
  hasOwnProp: Lt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: hr,
  freezeMethods: Bn,
  toObjectSet: zn,
  toCamelCase: In,
  noop: Un,
  toFiniteNumber: _n,
  findKey: dr,
  global: pe,
  isContextDefined: ur,
  isSpecCompliantForm: Hn,
  toJSONObject: qn,
  isAsyncFn: Wn,
  isThenable: Vn,
  setImmediate: fr,
  asap: Jn,
  isIterable: Kn
};
function T(e, t, r, n, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), a && (this.response = a, this.status = a.status ? a.status : null);
}
p.inherits(T, Error, {
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
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const mr = T.prototype, pr = {};
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
].forEach((e) => {
  pr[e] = { value: e };
});
Object.defineProperties(T, pr);
Object.defineProperty(mr, "isAxiosError", { value: !0 });
T.from = (e, t, r, n, a, o) => {
  const s = Object.create(mr);
  p.toFlatObject(e, s, function(d) {
    return d !== Error.prototype;
  }, (c) => c !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", u = t == null && e ? e.code : t;
  return T.call(s, l, u, r, n, a), e && s.cause == null && Object.defineProperty(s, "cause", { value: e, configurable: !0 }), s.name = e && e.name || "Error", o && Object.assign(s, o), s;
};
const Qn = null;
function ct(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function gr(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Mt(e, t, r) {
  return e ? e.concat(t).map(function(a, o) {
    return a = gr(a), !r && o ? "[" + a + "]" : a;
  }).join(r ? "." : "") : t;
}
function Gn(e) {
  return p.isArray(e) && !e.some(ct);
}
const Xn = p.toFlatObject(p, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Xe(e, t, r) {
  if (!p.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = p.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, g) {
    return !p.isUndefined(g[b]);
  });
  const n = r.metaTokens, a = r.visitor || d, o = r.dots, s = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(t);
  if (!p.isFunction(a))
    throw new TypeError("visitor must be a function");
  function c(h) {
    if (h === null) return "";
    if (p.isDate(h))
      return h.toISOString();
    if (p.isBoolean(h))
      return h.toString();
    if (!u && p.isBlob(h))
      throw new T("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(h) || p.isTypedArray(h) ? u && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function d(h, b, g) {
    let v = h;
    if (h && !g && typeof h == "object") {
      if (p.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), h = JSON.stringify(h);
      else if (p.isArray(h) && Gn(h) || (p.isFileList(h) || p.endsWith(b, "[]")) && (v = p.toArray(h)))
        return b = gr(b), v.forEach(function(C, P) {
          !(p.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Mt([b], P, o) : s === null ? b : b + "[]",
            c(C)
          );
        }), !1;
    }
    return ct(h) ? !0 : (t.append(Mt(g, b, o), c(h)), !1);
  }
  const f = [], y = Object.assign(Xn, {
    defaultVisitor: d,
    convertValue: c,
    isVisitable: ct
  });
  function k(h, b) {
    if (!p.isUndefined(h)) {
      if (f.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(h), p.forEach(h, function(v, N) {
        (!(p.isUndefined(v) || v === null) && a.call(
          t,
          v,
          p.isString(N) ? N.trim() : N,
          b,
          y
        )) === !0 && k(v, b ? b.concat(N) : [N]);
      }), f.pop();
    }
  }
  if (!p.isObject(e))
    throw new TypeError("data must be an object");
  return k(e), t;
}
function $t(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function gt(e, t) {
  this._pairs = [], e && Xe(e, this, t);
}
const yr = gt.prototype;
yr.append = function(t, r) {
  this._pairs.push([t, r]);
};
yr.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, $t);
  } : $t;
  return this._pairs.map(function(a) {
    return r(a[0]) + "=" + r(a[1]);
  }, "").join("&");
};
function Yn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function br(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Yn;
  p.isFunction(r) && (r = {
    serialize: r
  });
  const a = r && r.serialize;
  let o;
  if (a ? o = a(t, r) : o = p.isURLSearchParams(t) ? t.toString() : new gt(t, r).toString(n), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Ft {
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
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
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
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
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
  forEach(t) {
    p.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const xr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Zn = typeof URLSearchParams < "u" ? URLSearchParams : gt, ea = typeof FormData < "u" ? FormData : null, ta = typeof Blob < "u" ? Blob : null, ra = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Zn,
    FormData: ea,
    Blob: ta
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, yt = typeof window < "u" && typeof document < "u", dt = typeof navigator == "object" && navigator || void 0, na = yt && (!dt || ["ReactNative", "NativeScript", "NS"].indexOf(dt.product) < 0), aa = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", sa = yt && window.location.href || "http://localhost", oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: yt,
  hasStandardBrowserEnv: na,
  hasStandardBrowserWebWorkerEnv: aa,
  navigator: dt,
  origin: sa
}, Symbol.toStringTag, { value: "Module" })), K = {
  ...oa,
  ...ra
};
function ia(e, t) {
  return Xe(e, new K.classes.URLSearchParams(), {
    visitor: function(r, n, a, o) {
      return K.isNode && p.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function la(e) {
  return p.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ca(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const a = r.length;
  let o;
  for (n = 0; n < a; n++)
    o = r[n], t[o] = e[o];
  return t;
}
function wr(e) {
  function t(r, n, a, o) {
    let s = r[o++];
    if (s === "__proto__") return !0;
    const l = Number.isFinite(+s), u = o >= r.length;
    return s = !s && p.isArray(a) ? a.length : s, u ? (p.hasOwnProp(a, s) ? a[s] = [a[s], n] : a[s] = n, !l) : ((!a[s] || !p.isObject(a[s])) && (a[s] = []), t(r, n, a[s], o) && p.isArray(a[s]) && (a[s] = ca(a[s])), !l);
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const r = {};
    return p.forEachEntry(e, (n, a) => {
      t(la(n), a, r, 0);
    }), r;
  }
  return null;
}
function da(e, t, r) {
  if (p.isString(e))
    try {
      return (t || JSON.parse)(e), p.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const $e = {
  transitional: xr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", a = n.indexOf("application/json") > -1, o = p.isObject(t);
    if (o && p.isHTMLForm(t) && (t = new FormData(t)), p.isFormData(t))
      return a ? JSON.stringify(wr(t)) : t;
    if (p.isArrayBuffer(t) || p.isBuffer(t) || p.isStream(t) || p.isFile(t) || p.isBlob(t) || p.isReadableStream(t))
      return t;
    if (p.isArrayBufferView(t))
      return t.buffer;
    if (p.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ia(t, this.formSerializer).toString();
      if ((l = p.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Xe(
          l ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return o || a ? (r.setContentType("application/json", !1), da(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || $e.transitional, n = r && r.forcedJSONParsing, a = this.responseType === "json";
    if (p.isResponse(t) || p.isReadableStream(t))
      return t;
    if (t && p.isString(t) && (n && !this.responseType || a)) {
      const s = !(r && r.silentJSONParsing) && a;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (s)
          throw l.name === "SyntaxError" ? T.from(l, T.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
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
    FormData: K.classes.FormData,
    Blob: K.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  $e.headers[e] = {};
});
const ua = p.toObjectSet([
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
]), ha = (e) => {
  const t = {};
  let r, n, a;
  return e && e.split(`
`).forEach(function(s) {
    a = s.indexOf(":"), r = s.substring(0, a).trim().toLowerCase(), n = s.substring(a + 1).trim(), !(!r || t[r] && ua[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Dt = Symbol("internals");
function Te(e) {
  return e && String(e).trim().toLowerCase();
}
function Ue(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(Ue) : String(e);
}
function fa(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const ma = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function nt(e, t, r, n, a) {
  if (p.isFunction(n))
    return n.call(this, t, r);
  if (a && (t = r), !!p.isString(t)) {
    if (p.isString(n))
      return t.indexOf(n) !== -1;
    if (p.isRegExp(n))
      return n.test(t);
  }
}
function pa(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function ga(e, t) {
  const r = p.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(a, o, s) {
        return this[n].call(this, t, a, o, s);
      },
      configurable: !0
    });
  });
}
let ee = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const a = this;
    function o(l, u, c) {
      const d = Te(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const f = p.findKey(a, d);
      (!f || a[f] === void 0 || c === !0 || c === void 0 && a[f] !== !1) && (a[f || u] = Ue(l));
    }
    const s = (l, u) => p.forEach(l, (c, d) => o(c, d, u));
    if (p.isPlainObject(t) || t instanceof this.constructor)
      s(t, r);
    else if (p.isString(t) && (t = t.trim()) && !ma(t))
      s(ha(t), r);
    else if (p.isObject(t) && p.isIterable(t)) {
      let l = {}, u, c;
      for (const d of t) {
        if (!p.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        l[c = d[0]] = (u = l[c]) ? p.isArray(u) ? [...u, d[1]] : [u, d[1]] : d[1];
      }
      s(l, r);
    } else
      t != null && o(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = Te(t), t) {
      const n = p.findKey(this, t);
      if (n) {
        const a = this[n];
        if (!r)
          return a;
        if (r === !0)
          return fa(a);
        if (p.isFunction(r))
          return r.call(this, a, n);
        if (p.isRegExp(r))
          return r.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Te(t), t) {
      const n = p.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || nt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let a = !1;
    function o(s) {
      if (s = Te(s), s) {
        const l = p.findKey(n, s);
        l && (!r || nt(n, n[l], l, r)) && (delete n[l], a = !0);
      }
    }
    return p.isArray(t) ? t.forEach(o) : o(t), a;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, a = !1;
    for (; n--; ) {
      const o = r[n];
      (!t || nt(this, this[o], o, t, !0)) && (delete this[o], a = !0);
    }
    return a;
  }
  normalize(t) {
    const r = this, n = {};
    return p.forEach(this, (a, o) => {
      const s = p.findKey(n, o);
      if (s) {
        r[s] = Ue(a), delete r[o];
        return;
      }
      const l = t ? pa(o) : String(o).trim();
      l !== o && delete r[o], r[l] = Ue(a), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (n, a) => {
      n != null && n !== !1 && (r[a] = t && p.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((a) => n.set(a)), n;
  }
  static accessor(t) {
    const n = (this[Dt] = this[Dt] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function o(s) {
      const l = Te(s);
      n[l] || (ga(a, s), n[l] = !0);
    }
    return p.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
ee.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(ee.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
p.freezeMethods(ee);
function at(e, t) {
  const r = this || $e, n = t || r, a = ee.from(n.headers);
  let o = n.data;
  return p.forEach(e, function(l) {
    o = l.call(r, o, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), o;
}
function vr(e) {
  return !!(e && e.__CANCEL__);
}
function Ee(e, t, r) {
  T.call(this, e ?? "canceled", T.ERR_CANCELED, t, r), this.name = "CanceledError";
}
p.inherits(Ee, T, {
  __CANCEL__: !0
});
function kr(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new T(
    "Request failed with status code " + r.status,
    [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function ya(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ba(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let a = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const c = Date.now(), d = n[o];
    s || (s = c), r[a] = u, n[a] = c;
    let f = o, y = 0;
    for (; f !== a; )
      y += r[f++], f = f % e;
    if (a = (a + 1) % e, a === o && (o = (o + 1) % e), c - s < t)
      return;
    const k = d && c - d;
    return k ? Math.round(y * 1e3 / k) : void 0;
  };
}
function xa(e, t) {
  let r = 0, n = 1e3 / t, a, o;
  const s = (c, d = Date.now()) => {
    r = d, a = null, o && (clearTimeout(o), o = null), e(...c);
  };
  return [(...c) => {
    const d = Date.now(), f = d - r;
    f >= n ? s(c, d) : (a = c, o || (o = setTimeout(() => {
      o = null, s(a);
    }, n - f)));
  }, () => a && s(a)];
}
const Ve = (e, t, r = 3) => {
  let n = 0;
  const a = ba(50, 250);
  return xa((o) => {
    const s = o.loaded, l = o.lengthComputable ? o.total : void 0, u = s - n, c = a(u), d = s <= l;
    n = s;
    const f = {
      loaded: s,
      total: l,
      progress: l ? s / l : void 0,
      bytes: u,
      rate: c || void 0,
      estimated: c && l && d ? (l - s) / c : void 0,
      event: o,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, r);
}, It = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, jt = (e) => (...t) => p.asap(() => e(...t)), wa = K.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, K.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(K.origin),
  K.navigator && /(msie|trident)/i.test(K.navigator.userAgent)
) : () => !0, va = K.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, a, o) {
      const s = [e + "=" + encodeURIComponent(t)];
      p.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), p.isString(n) && s.push("path=" + n), p.isString(a) && s.push("domain=" + a), o === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
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
function ka(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Na(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Nr(e, t, r) {
  let n = !ka(t);
  return e && (n || r == !1) ? Na(e, t) : t;
}
const Bt = (e) => e instanceof ee ? { ...e } : e;
function be(e, t) {
  t = t || {};
  const r = {};
  function n(c, d, f, y) {
    return p.isPlainObject(c) && p.isPlainObject(d) ? p.merge.call({ caseless: y }, c, d) : p.isPlainObject(d) ? p.merge({}, d) : p.isArray(d) ? d.slice() : d;
  }
  function a(c, d, f, y) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(c))
        return n(void 0, c, f, y);
    } else return n(c, d, f, y);
  }
  function o(c, d) {
    if (!p.isUndefined(d))
      return n(void 0, d);
  }
  function s(c, d) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, d);
  }
  function l(c, d, f) {
    if (f in t)
      return n(c, d);
    if (f in e)
      return n(void 0, c);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: l,
    headers: (c, d, f) => a(Bt(c), Bt(d), f, !0)
  };
  return p.forEach(Object.keys({ ...e, ...t }), function(d) {
    const f = u[d] || a, y = f(e[d], t[d], d);
    p.isUndefined(y) && f !== l || (r[d] = y);
  }), r;
}
const Cr = (e) => {
  const t = be({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: a, xsrfCookieName: o, headers: s, auth: l } = t;
  if (t.headers = s = ee.from(s), t.url = br(Nr(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && s.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), p.isFormData(r)) {
    if (K.hasStandardBrowserEnv || K.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if (p.isFunction(r.getHeaders)) {
      const u = r.getHeaders(), c = ["content-type", "content-length"];
      Object.entries(u).forEach(([d, f]) => {
        c.includes(d.toLowerCase()) && s.set(d, f);
      });
    }
  }
  if (K.hasStandardBrowserEnv && (n && p.isFunction(n) && (n = n(t)), n || n !== !1 && wa(t.url))) {
    const u = a && o && va.read(o);
    u && s.set(a, u);
  }
  return t;
}, Ca = typeof XMLHttpRequest < "u", Ea = Ca && function(e) {
  return new Promise(function(r, n) {
    const a = Cr(e);
    let o = a.data;
    const s = ee.from(a.headers).normalize();
    let { responseType: l, onUploadProgress: u, onDownloadProgress: c } = a, d, f, y, k, h;
    function b() {
      k && k(), h && h(), a.cancelToken && a.cancelToken.unsubscribe(d), a.signal && a.signal.removeEventListener("abort", d);
    }
    let g = new XMLHttpRequest();
    g.open(a.method.toUpperCase(), a.url, !0), g.timeout = a.timeout;
    function v() {
      if (!g)
        return;
      const C = ee.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), E = {
        data: !l || l === "text" || l === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: C,
        config: e,
        request: g
      };
      kr(function(O) {
        r(O), b();
      }, function(O) {
        n(O), b();
      }, E), g = null;
    }
    "onloadend" in g ? g.onloadend = v : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, g.onabort = function() {
      g && (n(new T("Request aborted", T.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function(P) {
      const E = P && P.message ? P.message : "Network Error", w = new T(E, T.ERR_NETWORK, e, g);
      w.event = P || null, n(w), g = null;
    }, g.ontimeout = function() {
      let P = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const E = a.transitional || xr;
      a.timeoutErrorMessage && (P = a.timeoutErrorMessage), n(new T(
        P,
        E.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
        e,
        g
      )), g = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in g && p.forEach(s.toJSON(), function(P, E) {
      g.setRequestHeader(E, P);
    }), p.isUndefined(a.withCredentials) || (g.withCredentials = !!a.withCredentials), l && l !== "json" && (g.responseType = a.responseType), c && ([y, h] = Ve(c, !0), g.addEventListener("progress", y)), u && g.upload && ([f, k] = Ve(u), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", k)), (a.cancelToken || a.signal) && (d = (C) => {
      g && (n(!C || C.type ? new Ee(null, e, g) : C), g.abort(), g = null);
    }, a.cancelToken && a.cancelToken.subscribe(d), a.signal && (a.signal.aborted ? d() : a.signal.addEventListener("abort", d)));
    const N = ya(a.url);
    if (N && K.protocols.indexOf(N) === -1) {
      n(new T("Unsupported protocol " + N + ":", T.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(o || null);
  });
}, Sa = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), a;
    const o = function(c) {
      if (!a) {
        a = !0, l();
        const d = c instanceof Error ? c : this.reason;
        n.abort(d instanceof T ? d : new Ee(d instanceof Error ? d.message : d));
      }
    };
    let s = t && setTimeout(() => {
      s = null, o(new T(`timeout ${t} of ms exceeded`, T.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(o) : c.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", o));
    const { signal: u } = n;
    return u.unsubscribe = () => p.asap(l), u;
  }
}, Ra = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, a;
  for (; n < r; )
    a = n + t, yield e.slice(n, a), n = a;
}, Ta = async function* (e, t) {
  for await (const r of Aa(e))
    yield* Ra(r, t);
}, Aa = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, zt = (e, t, r, n) => {
  const a = Ta(e, t);
  let o = 0, s, l = (u) => {
    s || (s = !0, n && n(u));
  };
  return new ReadableStream({
    async pull(u) {
      try {
        const { done: c, value: d } = await a.next();
        if (c) {
          l(), u.close();
          return;
        }
        let f = d.byteLength;
        if (r) {
          let y = o += f;
          r(y);
        }
        u.enqueue(new Uint8Array(d));
      } catch (c) {
        throw l(c), c;
      }
    },
    cancel(u) {
      return l(u), a.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ut = 64 * 1024, { isFunction: je } = p, Pa = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(p.global), {
  ReadableStream: _t,
  TextEncoder: Ht
} = p.global, qt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Oa = (e) => {
  e = p.merge.call({
    skipUndefined: !0
  }, Pa, e);
  const { fetch: t, Request: r, Response: n } = e, a = t ? je(t) : typeof fetch == "function", o = je(r), s = je(n);
  if (!a)
    return !1;
  const l = a && je(_t), u = a && (typeof Ht == "function" ? /* @__PURE__ */ ((h) => (b) => h.encode(b))(new Ht()) : async (h) => new Uint8Array(await new r(h).arrayBuffer())), c = o && l && qt(() => {
    let h = !1;
    const b = new r(K.origin, {
      body: new _t(),
      method: "POST",
      get duplex() {
        return h = !0, "half";
      }
    }).headers.has("Content-Type");
    return h && !b;
  }), d = s && l && qt(() => p.isReadableStream(new n("").body)), f = {
    stream: d && ((h) => h.body)
  };
  a && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((h) => {
    !f[h] && (f[h] = (b, g) => {
      let v = b && b[h];
      if (v)
        return v.call(b);
      throw new T(`Response type '${h}' is not supported`, T.ERR_NOT_SUPPORT, g);
    });
  });
  const y = async (h) => {
    if (h == null)
      return 0;
    if (p.isBlob(h))
      return h.size;
    if (p.isSpecCompliantForm(h))
      return (await new r(K.origin, {
        method: "POST",
        body: h
      }).arrayBuffer()).byteLength;
    if (p.isArrayBufferView(h) || p.isArrayBuffer(h))
      return h.byteLength;
    if (p.isURLSearchParams(h) && (h = h + ""), p.isString(h))
      return (await u(h)).byteLength;
  }, k = async (h, b) => {
    const g = p.toFiniteNumber(h.getContentLength());
    return g ?? y(b);
  };
  return async (h) => {
    let {
      url: b,
      method: g,
      data: v,
      signal: N,
      cancelToken: C,
      timeout: P,
      onDownloadProgress: E,
      onUploadProgress: w,
      responseType: O,
      headers: B,
      withCredentials: F = "same-origin",
      fetchOptions: D
    } = Cr(h), z = t || fetch;
    O = O ? (O + "").toLowerCase() : "text";
    let re = Sa([N, C && C.toAbortSignal()], P), W = null;
    const S = re && re.unsubscribe && (() => {
      re.unsubscribe();
    });
    let R;
    try {
      if (w && c && g !== "get" && g !== "head" && (R = await k(B, v)) !== 0) {
        let _ = new r(b, {
          method: "POST",
          body: v,
          duplex: "half"
        }), se;
        if (p.isFormData(v) && (se = _.headers.get("content-type")) && B.setContentType(se), _.body) {
          const [I, Q] = It(
            R,
            Ve(jt(w))
          );
          v = zt(_.body, Ut, I, Q);
        }
      }
      p.isString(F) || (F = F ? "include" : "omit");
      const M = o && "credentials" in r.prototype, U = {
        ...D,
        signal: re,
        method: g.toUpperCase(),
        headers: B.normalize().toJSON(),
        body: v,
        duplex: "half",
        credentials: M ? F : void 0
      };
      W = o && new r(b, U);
      let j = await (o ? z(W, D) : z(b, U));
      const ne = d && (O === "stream" || O === "response");
      if (d && (E || ne && S)) {
        const _ = {};
        ["status", "statusText", "headers"].forEach((fe) => {
          _[fe] = j[fe];
        });
        const se = p.toFiniteNumber(j.headers.get("content-length")), [I, Q] = E && It(
          se,
          Ve(jt(E), !0)
        ) || [];
        j = new n(
          zt(j.body, Ut, I, () => {
            Q && Q(), S && S();
          }),
          _
        );
      }
      O = O || "text";
      let Re = await f[p.findKey(f, O) || "text"](j, h);
      return !ne && S && S(), await new Promise((_, se) => {
        kr(_, se, {
          data: Re,
          headers: ee.from(j.headers),
          status: j.status,
          statusText: j.statusText,
          config: h,
          request: W
        });
      });
    } catch (M) {
      throw S && S(), M && M.name === "TypeError" && /Load failed|fetch/i.test(M.message) ? Object.assign(
        new T("Network Error", T.ERR_NETWORK, h, W),
        {
          cause: M.cause || M
        }
      ) : T.from(M, M && M.code, h, W);
    }
  };
}, La = /* @__PURE__ */ new Map(), Er = (e) => {
  let t = e ? e.env : {};
  const { fetch: r, Request: n, Response: a } = t, o = [
    n,
    a,
    r
  ];
  let s = o.length, l = s, u, c, d = La;
  for (; l--; )
    u = o[l], c = d.get(u), c === void 0 && d.set(u, c = l ? /* @__PURE__ */ new Map() : Oa(t)), d = c;
  return c;
};
Er();
const ut = {
  http: Qn,
  xhr: Ea,
  fetch: {
    get: Er
  }
};
p.forEach(ut, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Wt = (e) => `- ${e}`, Ma = (e) => p.isFunction(e) || e === null || e === !1, Sr = {
  getAdapter: (e, t) => {
    e = p.isArray(e) ? e : [e];
    const { length: r } = e;
    let n, a;
    const o = {};
    for (let s = 0; s < r; s++) {
      n = e[s];
      let l;
      if (a = n, !Ma(n) && (a = ut[(l = String(n)).toLowerCase()], a === void 0))
        throw new T(`Unknown adapter '${l}'`);
      if (a && (p.isFunction(a) || (a = a.get(t))))
        break;
      o[l || "#" + s] = a;
    }
    if (!a) {
      const s = Object.entries(o).map(
        ([u, c]) => `adapter ${u} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = r ? s.length > 1 ? `since :
` + s.map(Wt).join(`
`) : " " + Wt(s[0]) : "as no adapter specified";
      throw new T(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: ut
};
function st(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ee(null, e);
}
function Vt(e) {
  return st(e), e.headers = ee.from(e.headers), e.data = at.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Sr.getAdapter(e.adapter || $e.adapter, e)(e).then(function(n) {
    return st(e), n.data = at.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ee.from(n.headers), n;
  }, function(n) {
    return vr(n) || (st(e), n && n.response && (n.response.data = at.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ee.from(n.response.headers))), Promise.reject(n);
  });
}
const Rr = "1.12.2", Ye = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ye[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Jt = {};
Ye.transitional = function(t, r, n) {
  function a(o, s) {
    return "[Axios v" + Rr + "] Transitional option '" + o + "'" + s + (n ? ". " + n : "");
  }
  return (o, s, l) => {
    if (t === !1)
      throw new T(
        a(s, " has been removed" + (r ? " in " + r : "")),
        T.ERR_DEPRECATED
      );
    return r && !Jt[s] && (Jt[s] = !0, console.warn(
      a(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(o, s, l) : !0;
  };
};
Ye.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function $a(e, t, r) {
  if (typeof e != "object")
    throw new T("options must be an object", T.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let a = n.length;
  for (; a-- > 0; ) {
    const o = n[a], s = t[o];
    if (s) {
      const l = e[o], u = l === void 0 || s(l, o, e);
      if (u !== !0)
        throw new T("option " + o + " must be " + u, T.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new T("Unknown option " + o, T.ERR_BAD_OPTION);
  }
}
const _e = {
  assertOptions: $a,
  validators: Ye
}, oe = _e.validators;
let ge = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Ft(),
      response: new Ft()
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
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let a = {};
        Error.captureStackTrace ? Error.captureStackTrace(a) : a = new Error();
        const o = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = be(this.defaults, r);
    const { transitional: n, paramsSerializer: a, headers: o } = r;
    n !== void 0 && _e.assertOptions(n, {
      silentJSONParsing: oe.transitional(oe.boolean),
      forcedJSONParsing: oe.transitional(oe.boolean),
      clarifyTimeoutError: oe.transitional(oe.boolean)
    }, !1), a != null && (p.isFunction(a) ? r.paramsSerializer = {
      serialize: a
    } : _e.assertOptions(a, {
      encode: oe.function,
      serialize: oe.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), _e.assertOptions(r, {
      baseUrl: oe.spelling("baseURL"),
      withXsrfToken: oe.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let s = o && p.merge(
      o.common,
      o[r.method]
    );
    o && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), r.headers = ee.concat(s, o);
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(r) === !1 || (u = u && b.synchronous, l.unshift(b.fulfilled, b.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(b) {
      c.push(b.fulfilled, b.rejected);
    });
    let d, f = 0, y;
    if (!u) {
      const h = [Vt.bind(this), void 0];
      for (h.unshift(...l), h.push(...c), y = h.length, d = Promise.resolve(r); f < y; )
        d = d.then(h[f++], h[f++]);
      return d;
    }
    y = l.length;
    let k = r;
    for (; f < y; ) {
      const h = l[f++], b = l[f++];
      try {
        k = h(k);
      } catch (g) {
        b.call(this, g);
        break;
      }
    }
    try {
      d = Vt.call(this, k);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, y = c.length; f < y; )
      d = d.then(c[f++], c[f++]);
    return d;
  }
  getUri(t) {
    t = be(this.defaults, t);
    const r = Nr(t.baseURL, t.url, t.allowAbsoluteUrls);
    return br(r, t.params, t.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(t) {
  ge.prototype[t] = function(r, n) {
    return this.request(be(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(o, s, l) {
      return this.request(be(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  ge.prototype[t] = r(), ge.prototype[t + "Form"] = r(!0);
});
let Fa = class Tr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
    });
    const n = this;
    this.promise.then((a) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](a);
      n._listeners = null;
    }), this.promise.then = (a) => {
      let o;
      const s = new Promise((l) => {
        n.subscribe(l), o = l;
      }).then(a);
      return s.cancel = function() {
        n.unsubscribe(o);
      }, s;
    }, t(function(o, s, l) {
      n.reason || (n.reason = new Ee(o, s, l), r(n.reason));
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
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Tr(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
};
function Da(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Ia(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const ht = {
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
Object.entries(ht).forEach(([e, t]) => {
  ht[t] = e;
});
function Ar(e) {
  const t = new ge(e), r = or(ge.prototype.request, t);
  return p.extend(r, ge.prototype, t, { allOwnKeys: !0 }), p.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(a) {
    return Ar(be(e, a));
  }, r;
}
const H = Ar($e);
H.Axios = ge;
H.CanceledError = Ee;
H.CancelToken = Fa;
H.isCancel = vr;
H.VERSION = Rr;
H.toFormData = Xe;
H.AxiosError = T;
H.Cancel = H.CanceledError;
H.all = function(t) {
  return Promise.all(t);
};
H.spread = Da;
H.isAxiosError = Ia;
H.mergeConfig = be;
H.AxiosHeaders = ee;
H.formToJSON = (e) => wr(p.isHTMLForm(e) ? new FormData(e) : e);
H.getAdapter = Sr.getAdapter;
H.HttpStatusCode = ht;
H.default = H;
const {
  Axios: yo,
  AxiosError: bo,
  CanceledError: xo,
  isCancel: wo,
  CancelToken: vo,
  VERSION: ko,
  all: No,
  Cancel: Co,
  isAxiosError: Eo,
  spread: So,
  toFormData: Ro,
  AxiosHeaders: To,
  HttpStatusCode: Ao,
  formToJSON: Po,
  getAdapter: Oo,
  mergeConfig: Lo
} = H;
class ja {
  constructor(t, r) {
    rt(this, "baseUrl");
    rt(this, "client");
    if (!t || !r)
      throw new Error("baseUrl and apiKey are required");
    this.baseUrl = t.endsWith("/") ? t.slice(0, -1) : t, this.client = H.create({
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
  async getInstance(t) {
    try {
      const a = (await this.client.get(
        "/instance/fetchInstances"
      )).data.find((o) => o.name === t);
      if (!a)
        throw new Error(`Instance '${t}' not found`);
      return a;
    } catch (r) {
      throw new Error(`Failed to get instance: ${r.message}`);
    }
  }
  /**
   * Create a new WhatsApp instance
   */
  async createInstance(t, r = "WHATSAPP-BAILEYS") {
    try {
      return (await this.client.post(
        "/instance/create",
        {
          instanceName: t,
          integration: r
        }
      )).data;
    } catch (n) {
      throw new Error(`Failed to create instance: ${n.message}`);
    }
  }
  /**
   * List all instances with additional data
   */
  async listInstances(t = !1) {
    try {
      const n = (await this.client.get(
        "/instance/fetchInstances"
      )).data;
      return t ? await Promise.all(
        n.map(async (o) => {
          if (o.status === "connected")
            try {
              const [s, l] = await Promise.all([
                this.getContactsCount(o.name),
                this.getChatsCount(o.name)
              ]);
              return {
                ...o,
                contactsCount: s,
                chatsCount: l
              };
            } catch (s) {
              return console.warn(
                `Failed to get stats for ${o.name}:`,
                s
              ), o;
            }
          return o;
        })
      ) : n;
    } catch (r) {
      throw new Error(`Failed to list instances: ${r.message}`);
    }
  }
  /**
   * Connect an instance and get QR code
   */
  async connectInstance(t) {
    try {
      return (await this.client.get(
        `/instance/connect/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to connect instance: ${r.message}`);
    }
  }
  /**
   * Get contacts count for an instance
   */
  async getContactsCount(t) {
    try {
      const r = await this.client.get(
        `/chat/findContacts/${t}`
      );
      return Array.isArray(r.data) ? r.data.length : 0;
    } catch (r) {
      return console.warn(
        `Failed to get contacts count for ${t}:`,
        r.message
      ), 0;
    }
  }
  /**
   * Get chats count for an instance
   */
  async getChatsCount(t) {
    try {
      const r = await this.client.get(`/chat/findChats/${t}`);
      return Array.isArray(r.data) ? r.data.length : 0;
    } catch (r) {
      return console.warn(
        `Failed to get chats count for ${t}:`,
        r.message
      ), 0;
    }
  }
  /**
   * Disconnect/logout an instance
   */
  async disconnectInstance(t) {
    try {
      return (await this.client.delete(
        `/instance/logout/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to disconnect instance: ${r.message}`);
    }
  }
  /**
   * Delete an instance
   */
  async deleteInstance(t) {
    try {
      return (await this.client.delete(
        `/instance/delete/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to delete instance: ${r.message}`);
    }
  }
  /**
   * Get instance connection status
   */
  async getInstanceStatus(t) {
    try {
      return (await this.client.get(
        `/instance/connectionState/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get instance status: ${r.message}`);
    }
  }
  /**
   * Send a text message
   */
  async sendMessage(t, r, n) {
    try {
      const a = {
        number: r,
        text: n
      };
      return (await this.client.post(
        `/message/sendText/${t}`,
        a
      )).data;
    } catch (a) {
      throw new Error(`Failed to send message: ${a.message}`);
    }
  }
  /**
   * Send media (image, video, audio, document)
   */
  async sendMedia(t, r, n, a = "image", o = "") {
    try {
      const s = `/message/sendMedia/${t}`, l = {
        number: r,
        mediatype: a,
        media: n
      };
      return o && (l.caption = o), (await this.client.post(
        s,
        l
      )).data;
    } catch (s) {
      throw new Error(`Failed to send media: ${s.message}`);
    }
  }
  /**
   * Get chat messages
   */
  async getChatMessages(t, r, n = 50) {
    try {
      return (await this.client.get(
        `/chat/findMessages/${t}`,
        {
          params: { remoteJid: r, limit: n }
        }
      )).data;
    } catch (a) {
      throw new Error(`Failed to get messages: ${a.message}`);
    }
  }
  /**
   * Get all chats
   */
  async getChats(t) {
    try {
      return (await this.client.get(
        `/chat/findChats/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get chats: ${r.message}`);
    }
  }
  /**
   * Get contacts
   */
  async getContacts(t) {
    try {
      return (await this.client.get(
        `/chat/findContacts/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get contacts: ${r.message}`);
    }
  }
  /**
   * Set instance settings
   */
  async setInstanceSettings(t, r) {
    try {
      return (await this.client.post(
        `/settings/set/${t}`,
        r
      )).data;
    } catch (n) {
      throw new Error(`Failed to set settings: ${n.message}`);
    }
  }
  /**
   * Get instance settings
   */
  async getInstanceSettings(t) {
    try {
      return (await this.client.get(
        `/settings/find/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get settings: ${r.message}`);
    }
  }
  /**
   * Set webhook URL
   */
  async setWebhook(t, r, n = []) {
    try {
      const a = {
        url: r,
        events: n
      };
      return (await this.client.post(
        `/webhook/set/${t}`,
        a
      )).data;
    } catch (a) {
      throw new Error(`Failed to set webhook: ${a.message}`);
    }
  }
  /**
   * Get API status
   */
  async getApiStatus() {
    try {
      return (await this.client.get("/")).data;
    } catch (t) {
      throw new Error(`Failed to get API status: ${t.message}`);
    }
  }
  /**
   * Get instance profile
   */
  async getProfile(t) {
    try {
      return (await this.client.get(
        `/chat/fetchProfile/${t}`
      )).data;
    } catch (r) {
      throw new Error(`Failed to get profile: ${r.message}`);
    }
  }
  /**
   * Mark message as read
   */
  async markAsRead(t, r, n = !1, a) {
    try {
      const o = {
        remoteJid: r,
        fromMe: n,
        id: a
      };
      return (await this.client.post(
        `/chat/markMessageAsRead/${t}`,
        o
      )).data;
    } catch (o) {
      throw new Error(`Failed to mark as read: ${o.message}`);
    }
  }
  // Legacy method names for backward compatibility
  async get(t) {
    return this.getInstance(t);
  }
  async create(t, r) {
    return this.createInstance(t, r);
  }
  async list() {
    return this.listInstances();
  }
  async connect(t) {
    return this.connectInstance(t);
  }
  async disconnect(t) {
    return this.disconnectInstance(t);
  }
  async getQRCode(t) {
    return this.connectInstance(t);
  }
  async getStatus() {
    return this.getApiStatus();
  }
}
const Pr = (e) => {
  const [t, r] = L(null), [n, a] = L([]), [o, s] = L([]), [l, u] = L([]), [c, d] = L([]), [f, y] = L(!1), [k, h] = L(null);
  ve(() => {
    if (e.baseUrl && e.apiKey)
      try {
        const S = new ja(
          e.baseUrl,
          e.apiKey
        );
        r(S), h(null);
      } catch (S) {
        h(S.message);
      }
  }, [e.baseUrl, e.apiKey]);
  const b = X((S) => {
    h(S.message || "An error occurred"), y(!1);
  }, []), g = X(() => {
    h(null);
  }, []), v = X(
    async (S, R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const M = await t.createInstance(S, R);
        return await D(), M;
      } catch (M) {
        throw b(M), M;
      } finally {
        y(!1);
      }
    },
    [t]
  ), N = X(
    async (S) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const R = await t.deleteInstance(S);
        return await D(), R;
      } catch (R) {
        throw b(R), R;
      } finally {
        y(!1);
      }
    },
    [t]
  ), C = X(
    async (S) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.connectInstance(S);
      } catch (R) {
        throw b(R), R;
      } finally {
        y(!1);
      }
    },
    [t]
  ), P = X(
    async (S) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const R = await t.disconnectInstance(S);
        return await D(), R;
      } catch (R) {
        throw b(R), R;
      } finally {
        y(!1);
      }
    },
    [t]
  ), E = X(
    async (S) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.getInstanceStatus(S);
      } catch (R) {
        throw b(R), R;
      }
    },
    [t]
  ), w = X(
    async (S, R, M) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.sendMessage(S, R, M);
      } catch (U) {
        throw b(U), U;
      } finally {
        y(!1);
      }
    },
    [t]
  ), O = X(
    async (S, R, M, U = "image", j = "") => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.sendMedia(
          S,
          R,
          M,
          U,
          j
        );
      } catch (ne) {
        throw b(ne), ne;
      } finally {
        y(!1);
      }
    },
    [t]
  ), B = X(
    async (S, R, M = 50) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.getChatMessages(
          S,
          R,
          M
        );
      } catch (U) {
        throw b(U), U;
      }
    },
    [t]
  ), F = X(
    async (S, R, M, U) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.markAsRead(
          S,
          R,
          M,
          U
        );
      } catch (j) {
        throw b(j), j;
      }
    },
    [t]
  ), D = X(async () => {
    if (t)
      try {
        y(!0), h(null);
        const S = await t.listInstances();
        a(S);
      } catch (S) {
        b(S);
      } finally {
        y(!1);
      }
  }, [t]), z = X(
    async (S) => {
      if (t)
        try {
          y(!0), h(null);
          const R = await t.getContacts(S);
          u(R);
        } catch (R) {
          b(R);
        } finally {
          y(!1);
        }
    },
    [t]
  ), re = X(
    async (S) => {
      if (t)
        try {
          y(!0), h(null);
          const R = await t.getChats(S);
          d(R);
        } catch (R) {
          b(R);
        } finally {
          y(!1);
        }
    },
    [t]
  ), W = X(
    async (S, R, M = 50) => {
      if (t)
        try {
          y(!0), h(null);
          const U = await t.getChatMessages(
            S,
            R,
            M
          );
          s(U);
        } catch (U) {
          b(U);
        } finally {
          y(!1);
        }
    },
    [t]
  );
  return ve(() => {
    t && D();
  }, [t, D]), {
    manager: t,
    instances: n,
    messages: o,
    contacts: l,
    chats: c,
    loading: f,
    error: k,
    // Instance methods
    createInstance: v,
    deleteInstance: N,
    connectInstance: C,
    disconnectInstance: P,
    getInstanceStatus: E,
    // Message methods
    sendMessage: w,
    sendMedia: O,
    getChatMessages: B,
    markAsRead: F,
    // Data fetching methods
    refreshInstances: D,
    refreshContacts: z,
    refreshChats: re,
    refreshMessages: W,
    // Utility methods
    clearError: g,
    setLoading: y
  };
}, bt = () => {
  const e = an(sr);
  if (!e)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
};
/**
 * react-router v7.9.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function V(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ce(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function ft({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function xt(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substring(n), e = e.substring(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Or(e, t, r = "/") {
  return Ba(e, t, r, !1);
}
function Ba(e, t, r, n) {
  let a = typeof t == "string" ? xt(t) : t, o = he(a.pathname || "/", r);
  if (o == null)
    return null;
  let s = Lr(e);
  za(s);
  let l = null;
  for (let u = 0; l == null && u < s.length; ++u) {
    let c = Xa(o);
    l = Qa(
      s[u],
      c,
      n
    );
  }
  return l;
}
function Lr(e, t = [], r = [], n = "", a = !1) {
  let o = (s, l, u = a, c) => {
    let d = {
      relativePath: c === void 0 ? s.path || "" : c,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: l,
      route: s
    };
    if (d.relativePath.startsWith("/")) {
      if (!d.relativePath.startsWith(n) && u)
        return;
      V(
        d.relativePath.startsWith(n),
        `Absolute route path "${d.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), d.relativePath = d.relativePath.slice(n.length);
    }
    let f = le([n, d.relativePath]), y = r.concat(d);
    s.children && s.children.length > 0 && (V(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${f}".`
    ), Lr(
      s.children,
      t,
      y,
      f,
      u
    )), !(s.path == null && !s.index) && t.push({
      path: f,
      score: Ja(f, s.index),
      routesMeta: y
    });
  };
  return e.forEach((s, l) => {
    var u;
    if (s.path === "" || !((u = s.path) != null && u.includes("?")))
      o(s, l);
    else
      for (let c of Mr(s.path))
        o(s, l, !0, c);
  }), t;
}
function Mr(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), o = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [o, ""] : [o];
  let s = Mr(n.join("/")), l = [];
  return l.push(
    ...s.map(
      (u) => u === "" ? o : [o, u].join("/")
    )
  ), a && l.push(...s), l.map(
    (u) => e.startsWith("/") && u === "" ? "/" : u
  );
}
function za(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : Ka(
      t.routesMeta.map((n) => n.childrenIndex),
      r.routesMeta.map((n) => n.childrenIndex)
    )
  );
}
var Ua = /^:[\w-]+$/, _a = 3, Ha = 2, qa = 1, Wa = 10, Va = -2, Kt = (e) => e === "*";
function Ja(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Kt) && (n += Va), t && (n += Ha), r.filter((a) => !Kt(a)).reduce(
    (a, o) => a + (Ua.test(o) ? _a : o === "" ? qa : Wa),
    n
  );
}
function Ka(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Qa(e, t, r = !1) {
  let { routesMeta: n } = e, a = {}, o = "/", s = [];
  for (let l = 0; l < n.length; ++l) {
    let u = n[l], c = l === n.length - 1, d = o === "/" ? t : t.slice(o.length) || "/", f = Je(
      { path: u.relativePath, caseSensitive: u.caseSensitive, end: c },
      d
    ), y = u.route;
    if (!f && c && r && !n[n.length - 1].route.index && (f = Je(
      {
        path: u.relativePath,
        caseSensitive: u.caseSensitive,
        end: !1
      },
      d
    )), !f)
      return null;
    Object.assign(a, f.params), s.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: le([o, f.pathname]),
      pathnameBase: ts(
        le([o, f.pathnameBase])
      ),
      route: y
    }), f.pathnameBase !== "/" && (o = le([o, f.pathnameBase]));
  }
  return s;
}
function Je(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = Ga(
    e.path,
    e.caseSensitive,
    e.end
  ), a = t.match(r);
  if (!a) return null;
  let o = a[0], s = o.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: n.reduce(
      (c, { paramName: d, isOptional: f }, y) => {
        if (d === "*") {
          let h = l[y] || "";
          s = o.slice(0, o.length - h.length).replace(/(.)\/+$/, "$1");
        }
        const k = l[y];
        return f && !k ? c[d] = void 0 : c[d] = (k || "").replace(/%2F/g, "/"), c;
      },
      {}
    ),
    pathname: o,
    pathnameBase: s,
    pattern: e
  };
}
function Ga(e, t = !1, r = !0) {
  ce(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, l, u) => (n.push({ paramName: l, isOptional: u != null }), u ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (n.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function Xa(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return ce(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function he(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Ya(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? xt(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Za(r, t) : t,
    search: rs(n),
    hash: ns(a)
  };
}
function Za(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function ot(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function es(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function $r(e) {
  let t = es(e);
  return t.map(
    (r, n) => n === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Fr(e, t, r, n = !1) {
  let a;
  typeof e == "string" ? a = xt(e) : (a = { ...e }, V(
    !a.pathname || !a.pathname.includes("?"),
    ot("?", "pathname", "search", a)
  ), V(
    !a.pathname || !a.pathname.includes("#"),
    ot("#", "pathname", "hash", a)
  ), V(
    !a.search || !a.search.includes("#"),
    ot("#", "search", "hash", a)
  ));
  let o = e === "" || a.pathname === "", s = o ? "/" : a.pathname, l;
  if (s == null)
    l = r;
  else {
    let f = t.length - 1;
    if (!n && s.startsWith("..")) {
      let y = s.split("/");
      for (; y[0] === ".."; )
        y.shift(), f -= 1;
      a.pathname = y.join("/");
    }
    l = f >= 0 ? t[f] : "/";
  }
  let u = Ya(a, l), c = s && s !== "/" && s.endsWith("/"), d = (o || s === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (c || d) && (u.pathname += "/"), u;
}
var le = (e) => e.join("/").replace(/\/\/+/g, "/"), ts = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), rs = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, ns = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function as(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var Dr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  Dr
);
var ss = [
  "GET",
  ...Dr
];
new Set(ss);
var Se = x.createContext(null);
Se.displayName = "DataRouter";
var Ze = x.createContext(null);
Ze.displayName = "DataRouterState";
x.createContext(!1);
var Ir = x.createContext({
  isTransitioning: !1
});
Ir.displayName = "ViewTransition";
var os = x.createContext(
  /* @__PURE__ */ new Map()
);
os.displayName = "Fetchers";
var is = x.createContext(null);
is.displayName = "Await";
var de = x.createContext(
  null
);
de.displayName = "Navigation";
var wt = x.createContext(
  null
);
wt.displayName = "Location";
var ue = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ue.displayName = "Route";
var vt = x.createContext(null);
vt.displayName = "RouteError";
function ls(e, { relative: t } = {}) {
  V(
    et(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = x.useContext(de), { hash: a, pathname: o, search: s } = Fe(e, { relative: t }), l = o;
  return r !== "/" && (l = o === "/" ? r : le([r, o])), n.createHref({ pathname: l, search: s, hash: a });
}
function et() {
  return x.useContext(wt) != null;
}
function xe() {
  return V(
    et(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(wt).location;
}
var jr = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Br(e) {
  x.useContext(de).static || x.useLayoutEffect(e);
}
function cs() {
  let { isDataRoute: e } = x.useContext(ue);
  return e ? ks() : ds();
}
function ds() {
  V(
    et(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = x.useContext(Se), { basename: t, navigator: r } = x.useContext(de), { matches: n } = x.useContext(ue), { pathname: a } = xe(), o = JSON.stringify($r(n)), s = x.useRef(!1);
  return Br(() => {
    s.current = !0;
  }), x.useCallback(
    (u, c = {}) => {
      if (ce(s.current, jr), !s.current) return;
      if (typeof u == "number") {
        r.go(u);
        return;
      }
      let d = Fr(
        u,
        JSON.parse(o),
        a,
        c.relative === "path"
      );
      e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : le([t, d.pathname])), (c.replace ? r.replace : r.push)(
        d,
        c.state,
        c
      );
    },
    [
      t,
      r,
      o,
      a,
      e
    ]
  );
}
x.createContext(null);
function Fe(e, { relative: t } = {}) {
  let { matches: r } = x.useContext(ue), { pathname: n } = xe(), a = JSON.stringify($r(r));
  return x.useMemo(
    () => Fr(
      e,
      JSON.parse(a),
      n,
      t === "path"
    ),
    [e, a, n, t]
  );
}
function us(e, t, r, n, a) {
  V(
    et(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = x.useContext(de), { matches: s } = x.useContext(ue), l = s[s.length - 1], u = l ? l.params : {}, c = l ? l.pathname : "/", d = l ? l.pathnameBase : "/", f = l && l.route;
  {
    let N = f && f.path || "";
    zr(
      c,
      !f || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = xe(), k;
  k = y;
  let h = k.pathname || "/", b = h;
  if (d !== "/") {
    let N = d.replace(/^\//, "").split("/");
    b = "/" + h.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let g = Or(e, { pathname: b });
  return ce(
    f || g != null,
    `No routes matched location "${k.pathname}${k.search}${k.hash}" `
  ), ce(
    g == null || g[g.length - 1].route.element !== void 0 || g[g.length - 1].route.Component !== void 0 || g[g.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${k.pathname}${k.search}${k.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), gs(
    g && g.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, u, N.params),
        pathname: le([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? d : le([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    s,
    r,
    n,
    a
  );
}
function hs() {
  let e = vs(), t = as(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: n }, o = { padding: "2px 4px", backgroundColor: n }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), s = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: o }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: o }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ x.createElement("pre", { style: a }, r) : null, s);
}
var fs = /* @__PURE__ */ x.createElement(hs, null), ms = class extends x.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    this.props.unstable_onError ? this.props.unstable_onError(e, t) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ x.createElement(ue.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      vt.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function ps({ routeContext: e, match: t, children: r }) {
  let n = x.useContext(Se);
  return n && n.static && n.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (n.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ x.createElement(ue.Provider, { value: e }, r);
}
function gs(e, t = [], r = null, n = null, a = null) {
  if (e == null) {
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let o = e, s = r == null ? void 0 : r.errors;
  if (s != null) {
    let c = o.findIndex(
      (d) => d.route.id && (s == null ? void 0 : s[d.route.id]) !== void 0
    );
    V(
      c >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        s
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, c + 1)
    );
  }
  let l = !1, u = -1;
  if (r)
    for (let c = 0; c < o.length; c++) {
      let d = o[c];
      if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c), d.route.id) {
        let { loaderData: f, errors: y } = r, k = d.route.loader && !f.hasOwnProperty(d.route.id) && (!y || y[d.route.id] === void 0);
        if (d.route.lazy || k) {
          l = !0, u >= 0 ? o = o.slice(0, u + 1) : o = [o[0]];
          break;
        }
      }
    }
  return o.reduceRight(
    (c, d, f) => {
      let y, k = !1, h = null, b = null;
      r && (y = s && d.route.id ? s[d.route.id] : void 0, h = d.route.errorElement || fs, l && (u < 0 && f === 0 ? (zr(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), k = !0, b = null) : u === f && (k = !0, b = d.route.hydrateFallbackElement || null)));
      let g = t.concat(o.slice(0, f + 1)), v = () => {
        let N;
        return y ? N = h : k ? N = b : d.route.Component ? N = /* @__PURE__ */ x.createElement(d.route.Component, null) : d.route.element ? N = d.route.element : N = c, /* @__PURE__ */ x.createElement(
          ps,
          {
            match: d,
            routeContext: {
              outlet: c,
              matches: g,
              isDataRoute: r != null
            },
            children: N
          }
        );
      };
      return r && (d.route.ErrorBoundary || d.route.errorElement || f === 0) ? /* @__PURE__ */ x.createElement(
        ms,
        {
          location: r.location,
          revalidation: r.revalidation,
          component: h,
          error: y,
          children: v(),
          routeContext: { outlet: null, matches: g, isDataRoute: !0 },
          unstable_onError: n
        }
      ) : v();
    },
    null
  );
}
function kt(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ys(e) {
  let t = x.useContext(Se);
  return V(t, kt(e)), t;
}
function bs(e) {
  let t = x.useContext(Ze);
  return V(t, kt(e)), t;
}
function xs(e) {
  let t = x.useContext(ue);
  return V(t, kt(e)), t;
}
function Nt(e) {
  let t = xs(e), r = t.matches[t.matches.length - 1];
  return V(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function ws() {
  return Nt(
    "useRouteId"
    /* UseRouteId */
  );
}
function vs() {
  var n;
  let e = x.useContext(vt), t = bs(
    "useRouteError"
    /* UseRouteError */
  ), r = Nt(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (n = t.errors) == null ? void 0 : n[r];
}
function ks() {
  let { router: e } = ys(
    "useNavigate"
    /* UseNavigateStable */
  ), t = Nt(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return Br(() => {
    r.current = !0;
  }), x.useCallback(
    async (a, o = {}) => {
      ce(r.current, jr), r.current && (typeof a == "number" ? e.navigate(a) : await e.navigate(a, { fromRouteId: t, ...o }));
    },
    [e, t]
  );
}
var Qt = {};
function zr(e, t, r) {
  !t && !Qt[e] && (Qt[e] = !0, ce(!1, r));
}
x.memo(Ns);
function Ns({
  routes: e,
  future: t,
  state: r,
  unstable_onError: n
}) {
  return us(e, void 0, r, n, t);
}
var He = "get", qe = "application/x-www-form-urlencoded";
function tt(e) {
  return e != null && typeof e.tagName == "string";
}
function Cs(e) {
  return tt(e) && e.tagName.toLowerCase() === "button";
}
function Es(e) {
  return tt(e) && e.tagName.toLowerCase() === "form";
}
function Ss(e) {
  return tt(e) && e.tagName.toLowerCase() === "input";
}
function Rs(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ts(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Rs(e);
}
var Be = null;
function As() {
  if (Be === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Be = !1;
    } catch {
      Be = !0;
    }
  return Be;
}
var Ps = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function it(e) {
  return e != null && !Ps.has(e) ? (ce(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qe}"`
  ), null) : e;
}
function Os(e, t) {
  let r, n, a, o, s;
  if (Es(e)) {
    let l = e.getAttribute("action");
    n = l ? he(l, t) : null, r = e.getAttribute("method") || He, a = it(e.getAttribute("enctype")) || qe, o = new FormData(e);
  } else if (Cs(e) || Ss(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let u = e.getAttribute("formaction") || l.getAttribute("action");
    if (n = u ? he(u, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || He, a = it(e.getAttribute("formenctype")) || it(l.getAttribute("enctype")) || qe, o = new FormData(l, e), !As()) {
      let { name: c, type: d, value: f } = e;
      if (d === "image") {
        let y = c ? `${c}.` : "";
        o.append(`${y}x`, "0"), o.append(`${y}y`, "0");
      } else c && o.append(c, f);
    }
  } else {
    if (tt(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = He, n = null, a = qe, s = e;
  }
  return o && a === "text/plain" && (s = o, o = void 0), { action: n, method: r.toLowerCase(), encType: a, formData: o, body: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ct(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Ls(e, t, r) {
  let n = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return n.pathname === "/" ? n.pathname = `_root.${r}` : t && he(n.pathname, t) === "/" ? n.pathname = `${t.replace(/\/$/, "")}/_root.${r}` : n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`, n;
}
async function Ms(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function $s(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function Fs(e, t, r) {
  let n = await Promise.all(
    e.map(async (a) => {
      let o = t.routes[a.route.id];
      if (o) {
        let s = await Ms(o, r);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Bs(
    n.flat(1).filter($s).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function Gt(e, t, r, n, a, o) {
  let s = (u, c) => r[c] ? u.route.id !== r[c].route.id : !0, l = (u, c) => {
    var d;
    return (
      // param change, /users/123 -> /users/456
      r[c].pathname !== u.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((d = r[c].route.path) == null ? void 0 : d.endsWith("*")) && r[c].params["*"] !== u.params["*"]
    );
  };
  return o === "assets" ? t.filter(
    (u, c) => s(u, c) || l(u, c)
  ) : o === "data" ? t.filter((u, c) => {
    var f;
    let d = n.routes[u.route.id];
    if (!d || !d.hasLoader)
      return !1;
    if (s(u, c) || l(u, c))
      return !0;
    if (u.route.shouldRevalidate) {
      let y = u.route.shouldRevalidate({
        currentUrl: new URL(
          a.pathname + a.search + a.hash,
          window.origin
        ),
        currentParams: ((f = r[0]) == null ? void 0 : f.params) || {},
        nextUrl: new URL(e, window.origin),
        nextParams: u.params,
        defaultShouldRevalidate: !0
      });
      if (typeof y == "boolean")
        return y;
    }
    return !0;
  }) : [];
}
function Ds(e, t, { includeHydrateFallback: r } = {}) {
  return Is(
    e.map((n) => {
      let a = t.routes[n.route.id];
      if (!a) return [];
      let o = [a.module];
      return a.clientActionModule && (o = o.concat(a.clientActionModule)), a.clientLoaderModule && (o = o.concat(a.clientLoaderModule)), r && a.hydrateFallbackModule && (o = o.concat(a.hydrateFallbackModule)), a.imports && (o = o.concat(a.imports)), o;
    }).flat(1)
  );
}
function Is(e) {
  return [...new Set(e)];
}
function js(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let n of r)
    t[n] = e[n];
  return t;
}
function Bs(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((n, a) => {
    let o = JSON.stringify(js(a));
    return r.has(o) || (r.add(o), n.push({ key: o, link: a })), n;
  }, []);
}
function Ur() {
  let e = x.useContext(Se);
  return Ct(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function zs() {
  let e = x.useContext(Ze);
  return Ct(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Et = x.createContext(void 0);
Et.displayName = "FrameworkContext";
function _r() {
  let e = x.useContext(Et);
  return Ct(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function Us(e, t) {
  let r = x.useContext(Et), [n, a] = x.useState(!1), [o, s] = x.useState(!1), { onFocus: l, onBlur: u, onMouseEnter: c, onMouseLeave: d, onTouchStart: f } = t, y = x.useRef(null);
  x.useEffect(() => {
    if (e === "render" && s(!0), e === "viewport") {
      let b = (v) => {
        v.forEach((N) => {
          s(N.isIntersecting);
        });
      }, g = new IntersectionObserver(b, { threshold: 0.5 });
      return y.current && g.observe(y.current), () => {
        g.disconnect();
      };
    }
  }, [e]), x.useEffect(() => {
    if (n) {
      let b = setTimeout(() => {
        s(!0);
      }, 100);
      return () => {
        clearTimeout(b);
      };
    }
  }, [n]);
  let k = () => {
    a(!0);
  }, h = () => {
    a(!1), s(!1);
  };
  return r ? e !== "intent" ? [o, y, {}] : [
    o,
    y,
    {
      onFocus: Ae(l, k),
      onBlur: Ae(u, h),
      onMouseEnter: Ae(c, k),
      onMouseLeave: Ae(d, h),
      onTouchStart: Ae(f, k)
    }
  ] : [!1, y, {}];
}
function Ae(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function _s({ page: e, ...t }) {
  let { router: r } = Ur(), n = x.useMemo(
    () => Or(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return n ? /* @__PURE__ */ x.createElement(qs, { page: e, matches: n, ...t }) : null;
}
function Hs(e) {
  let { manifest: t, routeModules: r } = _r(), [n, a] = x.useState([]);
  return x.useEffect(() => {
    let o = !1;
    return Fs(e, t, r).then(
      (s) => {
        o || a(s);
      }
    ), () => {
      o = !0;
    };
  }, [e, t, r]), n;
}
function qs({
  page: e,
  matches: t,
  ...r
}) {
  let n = xe(), { manifest: a, routeModules: o } = _r(), { basename: s } = Ur(), { loaderData: l, matches: u } = zs(), c = x.useMemo(
    () => Gt(
      e,
      t,
      u,
      a,
      n,
      "data"
    ),
    [e, t, u, a, n]
  ), d = x.useMemo(
    () => Gt(
      e,
      t,
      u,
      a,
      n,
      "assets"
    ),
    [e, t, u, a, n]
  ), f = x.useMemo(() => {
    if (e === n.pathname + n.search + n.hash)
      return [];
    let h = /* @__PURE__ */ new Set(), b = !1;
    if (t.forEach((v) => {
      var C;
      let N = a.routes[v.route.id];
      !N || !N.hasLoader || (!c.some((P) => P.route.id === v.route.id) && v.route.id in l && ((C = o[v.route.id]) != null && C.shouldRevalidate) || N.hasClientLoader ? b = !0 : h.add(v.route.id));
    }), h.size === 0)
      return [];
    let g = Ls(e, s, "data");
    return b && h.size > 0 && g.searchParams.set(
      "_routes",
      t.filter((v) => h.has(v.route.id)).map((v) => v.route.id).join(",")
    ), [g.pathname + g.search];
  }, [
    s,
    l,
    n,
    a,
    c,
    t,
    e,
    o
  ]), y = x.useMemo(
    () => Ds(d, a),
    [d, a]
  ), k = Hs(d);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, f.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })), y.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "modulepreload", href: h, ...r })), k.map(({ key: h, link: b }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement("link", { key: h, nonce: r.nonce, ...b })
  )));
}
function Ws(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var Hr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Hr && (window.__reactRouterVersion = // @ts-expect-error
  "7.9.3");
} catch {
}
var qr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, St = x.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: n = "none",
    relative: a,
    reloadDocument: o,
    replace: s,
    state: l,
    target: u,
    to: c,
    preventScrollReset: d,
    viewTransition: f,
    ...y
  }, k) {
    let { basename: h } = x.useContext(de), b = typeof c == "string" && qr.test(c), g, v = !1;
    if (typeof c == "string" && b && (g = c, Hr))
      try {
        let F = new URL(window.location.href), D = c.startsWith("//") ? new URL(F.protocol + c) : new URL(c), z = he(D.pathname, h);
        D.origin === F.origin && z != null ? c = z + D.search + D.hash : v = !0;
      } catch {
        ce(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let N = ls(c, { relative: a }), [C, P, E] = Us(
      n,
      y
    ), w = Qs(c, {
      replace: s,
      state: l,
      target: u,
      preventScrollReset: d,
      relative: a,
      viewTransition: f
    });
    function O(F) {
      t && t(F), F.defaultPrevented || w(F);
    }
    let B = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...y,
          ...E,
          href: g || N,
          onClick: v || o ? t : O,
          ref: Ws(k, P),
          target: u,
          "data-discover": !b && r === "render" ? "true" : void 0
        }
      )
    );
    return C && !b ? /* @__PURE__ */ x.createElement(x.Fragment, null, B, /* @__PURE__ */ x.createElement(_s, { page: N })) : B;
  }
);
St.displayName = "Link";
var Vs = x.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: a = !1,
    style: o,
    to: s,
    viewTransition: l,
    children: u,
    ...c
  }, d) {
    let f = Fe(s, { relative: c.relative }), y = xe(), k = x.useContext(Ze), { navigator: h, basename: b } = x.useContext(de), g = k != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    eo(f) && l === !0, v = h.encodeLocation ? h.encodeLocation(f).pathname : f.pathname, N = y.pathname, C = k && k.navigation && k.navigation.location ? k.navigation.location.pathname : null;
    r || (N = N.toLowerCase(), C = C ? C.toLowerCase() : null, v = v.toLowerCase()), C && b && (C = he(C, b) || C);
    const P = v !== "/" && v.endsWith("/") ? v.length - 1 : v.length;
    let E = N === v || !a && N.startsWith(v) && N.charAt(P) === "/", w = C != null && (C === v || !a && C.startsWith(v) && C.charAt(v.length) === "/"), O = {
      isActive: E,
      isPending: w,
      isTransitioning: g
    }, B = E ? t : void 0, F;
    typeof n == "function" ? F = n(O) : F = [
      n,
      E ? "active" : null,
      w ? "pending" : null,
      g ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof o == "function" ? o(O) : o;
    return /* @__PURE__ */ x.createElement(
      St,
      {
        ...c,
        "aria-current": B,
        className: F,
        ref: d,
        style: D,
        to: s,
        viewTransition: l
      },
      typeof u == "function" ? u(O) : u
    );
  }
);
Vs.displayName = "NavLink";
var Js = x.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: n,
    replace: a,
    state: o,
    method: s = He,
    action: l,
    onSubmit: u,
    relative: c,
    preventScrollReset: d,
    viewTransition: f,
    ...y
  }, k) => {
    let h = Ys(), b = Zs(l, { relative: c }), g = s.toLowerCase() === "get" ? "get" : "post", v = typeof l == "string" && qr.test(l), N = (C) => {
      if (u && u(C), C.defaultPrevented) return;
      C.preventDefault();
      let P = C.nativeEvent.submitter, E = (P == null ? void 0 : P.getAttribute("formmethod")) || s;
      h(P || C.currentTarget, {
        fetcherKey: t,
        method: E,
        navigate: r,
        replace: a,
        state: o,
        relative: c,
        preventScrollReset: d,
        viewTransition: f
      });
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: k,
        method: g,
        action: b,
        onSubmit: n ? u : N,
        ...y,
        "data-discover": !v && e === "render" ? "true" : void 0
      }
    );
  }
);
Js.displayName = "Form";
function Ks(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wr(e) {
  let t = x.useContext(Se);
  return V(t, Ks(e)), t;
}
function Qs(e, {
  target: t,
  replace: r,
  state: n,
  preventScrollReset: a,
  relative: o,
  viewTransition: s
} = {}) {
  let l = cs(), u = xe(), c = Fe(e, { relative: o });
  return x.useCallback(
    (d) => {
      if (Ts(d, t)) {
        d.preventDefault();
        let f = r !== void 0 ? r : ft(u) === ft(c);
        l(e, {
          replace: f,
          state: n,
          preventScrollReset: a,
          relative: o,
          viewTransition: s
        });
      }
    },
    [
      u,
      l,
      c,
      r,
      n,
      t,
      e,
      a,
      o,
      s
    ]
  );
}
var Gs = 0, Xs = () => `__${String(++Gs)}__`;
function Ys() {
  let { router: e } = Wr(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = x.useContext(de), r = ws();
  return x.useCallback(
    async (n, a = {}) => {
      let { action: o, method: s, encType: l, formData: u, body: c } = Os(
        n,
        t
      );
      if (a.navigate === !1) {
        let d = a.fetcherKey || Xs();
        await e.fetch(d, r, a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: u,
          body: c,
          formMethod: a.method || s,
          formEncType: a.encType || l,
          flushSync: a.flushSync
        });
      } else
        await e.navigate(a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: u,
          body: c,
          formMethod: a.method || s,
          formEncType: a.encType || l,
          replace: a.replace,
          state: a.state,
          fromRouteId: r,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition
        });
    },
    [e, t, r]
  );
}
function Zs(e, { relative: t } = {}) {
  let { basename: r } = x.useContext(de), n = x.useContext(ue);
  V(n, "useFormAction must be used inside a RouteContext");
  let [a] = n.matches.slice(-1), o = { ...Fe(e || ".", { relative: t }) }, s = xe();
  if (e == null) {
    o.search = s.search;
    let l = new URLSearchParams(o.search), u = l.getAll("index");
    if (u.some((d) => d === "")) {
      l.delete("index"), u.filter((f) => f).forEach((f) => l.append("index", f));
      let d = l.toString();
      o.search = d ? `?${d}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (o.pathname = o.pathname === "/" ? r : le([r, o.pathname])), ft(o);
}
function eo(e, { relative: t } = {}) {
  let r = x.useContext(Ir);
  V(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = Wr(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = Fe(e, { relative: t });
  if (!r.isTransitioning)
    return !1;
  let o = he(r.currentLocation.pathname, n) || r.currentLocation.pathname, s = he(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Je(a.pathname, s) != null || Je(a.pathname, o) != null;
}
function Vr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Vr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function q() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Vr(e)) && (n && (n += " "), n += t);
  return n;
}
const te = ({
  className: e,
  children: t,
  style: r,
  ...n
}) => {
  const a = {
    backgroundColor: "var(--theme-background)",
    borderColor: "var(--theme-border)",
    color: "var(--theme-foreground)",
    ...r
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: q("border rounded-lg shadow-sm p-6", e),
      style: a,
      ...n,
      children: t
    }
  );
}, A = ({
  variant: e = "primary",
  size: t = "md",
  className: r,
  children: n,
  disabled: a,
  ...o
}) => {
  const s = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", l = {
    primary: "text-white focus:ring-2 focus:ring-offset-2",
    secondary: "focus:ring-2 focus:ring-offset-2",
    danger: "text-white focus:ring-2 focus:ring-offset-2",
    ghost: "focus:ring-2 focus:ring-offset-2"
  }, u = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }, c = () => {
    switch (e) {
      case "primary":
        return {
          backgroundColor: "var(--theme-primary)",
          borderColor: "var(--theme-primary)",
          color: "white"
        };
      case "secondary":
        return {
          backgroundColor: "var(--theme-muted)",
          borderColor: "var(--theme-border)",
          color: "var(--theme-foreground)"
        };
      case "danger":
        return {
          backgroundColor: "var(--theme-danger)",
          borderColor: "var(--theme-danger)",
          color: "white"
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "var(--theme-secondary)"
        };
      default:
        return {};
    }
  };
  return /* @__PURE__ */ i(
    "button",
    {
      className: q(s, l[e], u[t], r),
      style: c(),
      disabled: a,
      ...o,
      children: n
    }
  );
}, ie = ({ size: e = "md", className: t }) => /* @__PURE__ */ i(
  "div",
  {
    className: q(
      "animate-spin rounded-full border-2 border-gray-300 border-t-primary-500",
      {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
      }[e],
      t
    )
  }
);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var to = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ro = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), J = (e, t) => {
  const r = sn(
    ({ color: n = "currentColor", size: a = 24, strokeWidth: o = 2, absoluteStrokeWidth: s, className: l = "", children: u, ...c }, d) => Ot(
      "svg",
      {
        ref: d,
        ...to,
        width: a,
        height: a,
        stroke: n,
        strokeWidth: s ? Number(o) * 24 / Number(a) : o,
        className: ["lucide", `lucide-${ro(e)}`, l].join(" "),
        ...c
      },
      [
        ...t.map(([f, y]) => Ot(f, y)),
        ...Array.isArray(u) ? u : [u]
      ]
    )
  );
  return r.displayName = `${e}`, r;
};
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xt = J("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yt = J("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zt = J("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jr = J("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = J("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const no = J("Monitor", [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const er = J("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tt = J("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", key: "1xcu5" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", key: "736e4u" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", key: "clrty" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", key: "1s4xz9" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kr = J("Pause", [
  ["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }],
  ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mt = J("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const We = J("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = J("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = J("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ao = J("Smartphone", [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rr = J("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gr = J("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xr = J("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]), so = ({
  instance: e,
  onConnect: t,
  onDisconnect: r,
  onDelete: n,
  onSettings: a
}) => {
  const s = (() => {
    if (e.isGeneratingQR)
      return {
        text: "Gerando QR Code...",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        badge: "bg-blue-500",
        showLoader: !0
      };
    if (e.qrCode)
      return {
        text: "Escaneie com seu celular",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        badge: "bg-yellow-500",
        showQR: !0
      };
    if (e.isConnecting)
      return {
        text: "Conectando...",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-800",
        badge: "bg-orange-500",
        showLoader: !0
      };
    switch (e.status) {
      case "connected":
        return {
          text: "Conectado",
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          badge: "bg-green-500",
          showStats: !0
        };
      case "connecting":
        return {
          text: "Conectando",
          bg: "bg-orange-50 dark:bg-orange-900/20",
          border: "border-orange-200 dark:border-orange-800",
          badge: "bg-orange-500",
          showLoader: !0
        };
      default:
        return {
          text: "Desconectado",
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          badge: "bg-red-500"
        };
    }
  })();
  return /* @__PURE__ */ m(
    te,
    {
      className: q(
        "transition-all duration-200",
        s.bg,
        s.border
      ),
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center justify-between p-4 pb-3", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ i("div", { className: q("w-3 h-3 rounded-full", s.badge) }),
            /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: e.name })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: s.text })
        ] }),
        /* @__PURE__ */ m("div", { className: "p-4 pt-0", children: [
          s.showQR && e.qrCode && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
            /* @__PURE__ */ i("div", { className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ i(
              "img",
              {
                src: e.qrCode,
                alt: "QR Code para conectar WhatsApp",
                className: "w-32 h-32"
              }
            ) }),
            /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: "Abra o WhatsApp no seu celular e escaneie este código" })
          ] }),
          s.showLoader && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
            /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(ie, { size: "md" }) }),
            /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: s.text })
          ] }),
          s.showStats && /* @__PURE__ */ m("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(Xr, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: e.contactsCount || 0 })
            ] }),
            /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(Rt, { className: "w-4 h-4 text-green-500" }),
                /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Chats" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: e.chatsCount || 0 })
            ] })
          ] }),
          /* @__PURE__ */ m("div", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4", children: [
            /* @__PURE__ */ m("div", { children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: "Integração:" }),
              " ",
              /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: e.integration || "WHATSAPP-BAILEYS" })
            ] }),
            e.connectionState && /* @__PURE__ */ m("div", { children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: "Estado:" }),
              " ",
              /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: e.connectionState })
            ] })
          ] }),
          /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-2", children: [
            e.status === "connected" ? /* @__PURE__ */ m(
              A,
              {
                onClick: () => r == null ? void 0 : r(e.name),
                size: "sm",
                variant: "secondary",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(Kr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Desconectar" })
                ]
              }
            ) : /* @__PURE__ */ m(
              A,
              {
                onClick: () => t == null ? void 0 : t(e.name),
                size: "sm",
                variant: "secondary",
                className: "flex items-center space-x-1",
                disabled: e.isGeneratingQR || e.isConnecting,
                children: [
                  /* @__PURE__ */ i(Jr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Conectar" })
                ]
              }
            ),
            /* @__PURE__ */ i(St, { to: `/controller/${e.name}`, children: /* @__PURE__ */ m(
              A,
              {
                size: "sm",
                variant: "ghost",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(no, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Controller" })
                ]
              }
            ) }),
            /* @__PURE__ */ m(
              A,
              {
                onClick: () => a == null ? void 0 : a(e.name),
                size: "sm",
                variant: "ghost",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(Qr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Config" })
                ]
              }
            ),
            /* @__PURE__ */ m(
              A,
              {
                onClick: () => n == null ? void 0 : n(e.name),
                size: "sm",
                variant: "danger",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(Gr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Excluir" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}, Pe = ({
  isOpen: e,
  onClose: t,
  children: r,
  className: n
}) => e ? /* @__PURE__ */ i("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ m("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: [
  /* @__PURE__ */ i(
    "div",
    {
      className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
      onClick: t
    }
  ),
  /* @__PURE__ */ i(
    "div",
    {
      className: q(
        "relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",
        n
      ),
      children: /* @__PURE__ */ i("div", { className: "p-6", children: r })
    }
  )
] }) }) : null, Ne = ({
  label: e,
  helperText: t,
  error: r,
  className: n,
  ...a
}) => /* @__PURE__ */ m("div", { className: "w-full", children: [
  e && /* @__PURE__ */ i("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: e }),
  /* @__PURE__ */ i(
    "input",
    {
      className: q(
        "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200",
        r ? "border-danger-500 focus:ring-danger-500" : "border-gray-300 dark:border-gray-600",
        n
      ),
      ...a
    }
  ),
  t && /* @__PURE__ */ i(
    "p",
    {
      className: q(
        "mt-1 text-xs",
        r ? "text-danger-500" : "text-gray-500 dark:text-gray-400"
      ),
      children: t
    }
  )
] }), Yr = ({
  isOpen: e,
  onClose: t,
  onSubmit: r,
  defaultName: n = ""
}) => {
  const [a, o] = L(n), [s, l] = L(!1);
  return /* @__PURE__ */ i(
    Pe,
    {
      isOpen: e,
      onClose: t,
      className: "border-2 dark:border-gray-900 border-gray-300",
      children: /* @__PURE__ */ m("div", { className: "", children: [
        /* @__PURE__ */ i("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Nova Instância WhatsApp" }),
        /* @__PURE__ */ m("form", { onSubmit: async (c) => {
          if (c.preventDefault(), !!a.trim()) {
            l(!0);
            try {
              await r(a.trim()), o(""), t();
            } finally {
              l(!1);
            }
          }
        }, className: "space-y-4", children: [
          /* @__PURE__ */ i(
            Ne,
            {
              label: "Nome da Instância",
              placeholder: "ex: minha-instancia",
              value: a,
              onChange: (c) => o(c.target.value),
              helperText: "Use apenas letras, números, hífens e underscores",
              required: !0
            }
          ),
          /* @__PURE__ */ m("div", { className: "flex gap-3 justify-end pt-2", children: [
            /* @__PURE__ */ i(
              A,
              {
                type: "button",
                variant: "secondary",
                onClick: t,
                disabled: s,
                children: "Cancelar"
              }
            ),
            /* @__PURE__ */ i(
              A,
              {
                type: "submit",
                variant: "primary",
                disabled: !a.trim() || s,
                className: "min-w-[100px]",
                children: s ? /* @__PURE__ */ i(ie, { size: "sm" }) : "Criar"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}, oo = ({
  qrCode: e,
  size: t = 256,
  className: r = ""
}) => e ? /* @__PURE__ */ i(
  "div",
  {
    className: `inline-block p-4 bg-white rounded-lg shadow-sm ${r}`,
    children: /* @__PURE__ */ i(
      "img",
      {
        src: e,
        alt: "QR Code para conectar WhatsApp",
        className: "block",
        style: { width: t, height: t }
      }
    )
  }
) : /* @__PURE__ */ i(
  "div",
  {
    className: `flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg ${r}`,
    style: { width: t, height: t },
    children: /* @__PURE__ */ m("div", { className: "text-center", children: [
      /* @__PURE__ */ i(ie, { size: "lg", className: "mb-2" }),
      /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Gerando QR Code..." })
    ] })
  }
), io = ({
  isOpen: e,
  onClose: t,
  instanceName: r,
  qrCode: n
}) => /* @__PURE__ */ i(Pe, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(te, { className: "max-w-md p-0 text-center", children: /* @__PURE__ */ m("div", { className: "p-6", children: [
  /* @__PURE__ */ m("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: [
    "Conectar: ",
    r
  ] }),
  /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-6", children: "Escaneie o QR Code com seu WhatsApp" }),
  /* @__PURE__ */ i("div", { className: "mb-6", children: /* @__PURE__ */ i(oo, { qrCode: n }) }),
  /* @__PURE__ */ i(A, { variant: "secondary", onClick: t, children: "Fechar" })
] }) }) }), Zr = ({
  isOpen: e,
  onClose: t,
  instanceName: r,
  settings: n,
  onSettingsChange: a,
  onSave: o
}) => {
  const s = (u, c) => {
    a({ ...n, [u]: c });
  };
  return /* @__PURE__ */ i(Pe, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(te, { className: "max-w-lg p-0", children: /* @__PURE__ */ m("div", { className: "p-6", children: [
    /* @__PURE__ */ m("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: [
      "Configurações: ",
      r
    ] }),
    /* @__PURE__ */ m("div", { className: "space-y-4", children: [
      [
        { key: "rejectCall", label: "Auto-rejeitar chamadas" },
        { key: "groupsIgnore", label: "Ignorar mensagens de grupo" },
        { key: "alwaysOnline", label: "Sempre mostrar como online" },
        { key: "readMessages", label: "Auto-ler mensagens" },
        { key: "readStatus", label: "Auto-ler atualizações de status" },
        { key: "syncFullHistory", label: "Sincronizar histórico completo" }
      ].map(({ key: u, label: c }) => /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: u,
            checked: n[u],
            onChange: (d) => s(
              u,
              d.target.checked
            ),
            className: "w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          }
        ),
        /* @__PURE__ */ i(
          "label",
          {
            htmlFor: u,
            className: "text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
            children: c
          }
        )
      ] }, u)),
      n.rejectCall && /* @__PURE__ */ i("div", { className: "mt-4", children: /* @__PURE__ */ i(
        Ne,
        {
          label: "Mensagem ao rejeitar chamadas",
          value: n.msgCall,
          onChange: (u) => s("msgCall", u.target.value),
          placeholder: "Digite a mensagem..."
        }
      ) })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex gap-3 justify-end pt-6 border-t border-gray-200 dark:border-gray-600 mt-6", children: [
      /* @__PURE__ */ i(A, { variant: "secondary", onClick: t, children: "Cancelar" }),
      /* @__PURE__ */ i(A, { variant: "primary", onClick: o, children: "Salvar" })
    ] })
  ] }) }) });
}, At = ({
  checked: e,
  onCheckedChange: t,
  disabled: r = !1,
  className: n
}) => /* @__PURE__ */ i(
  "label",
  {
    className: q(
      "inline-flex items-center cursor-pointer",
      r && "cursor-not-allowed opacity-50",
      n
    ),
    children: /* @__PURE__ */ m("div", { className: "relative", children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          checked: e,
          onChange: (a) => t(a.target.checked),
          disabled: r,
          className: "sr-only"
        }
      ),
      /* @__PURE__ */ m(
        "div",
        {
          className: q(
            "w-14 h-7 rounded-full transition-all duration-300 ease-in-out relative",
            e ? "bg-slate-700 dark:bg-slate-600" : "bg-amber-200 dark:bg-amber-300"
          ),
          children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: q(
                  "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center",
                  e ? "translate-x-7 left-0.5" : "translate-x-0 left-0.5"
                ),
                children: e ? /* @__PURE__ */ i(er, { className: "w-3.5 h-3.5 text-slate-600", strokeWidth: 2.5 }) : /* @__PURE__ */ i(rr, { className: "w-3.5 h-3.5 text-amber-500", strokeWidth: 2.5 })
              }
            ),
            /* @__PURE__ */ m("div", { className: "absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none", children: [
              /* @__PURE__ */ i(
                rr,
                {
                  className: q(
                    "w-3 h-3 transition-opacity duration-300",
                    e ? "opacity-0" : "opacity-30 text-amber-600"
                  )
                }
              ),
              /* @__PURE__ */ i(
                er,
                {
                  className: q(
                    "w-3 h-3 transition-opacity duration-300",
                    e ? "opacity-30 text-slate-300" : "opacity-0"
                  )
                }
              )
            ] })
          ]
        }
      )
    ] })
  }
), nr = {
  name: "custom-light",
  isDark: !1,
  colors: {
    background: "#ffffff",
    foreground: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    border: "#e5e7eb",
    muted: "#f3f4f6"
  }
}, ar = {
  name: "custom-dark",
  isDark: !0,
  colors: {
    background: "#1f2937",
    foreground: "#f9fafb",
    primary: "#60a5fa",
    secondary: "#9ca3af",
    accent: "#a78bfa",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    border: "#374151",
    muted: "#111827"
  }
}, en = ({
  isOpen: e,
  onClose: t
}) => {
  const {
    theme: r,
    setCustomTheme: n,
    resetToDefaultTheme: a,
    isCustomTheme: o
  } = bt(), [s, l] = L(r), [u, c] = L(!1), [d, f] = L(!1);
  ve(() => {
    if (e) {
      const E = {
        ...r,
        colors: {
          ...r.colors,
          // Garante que todas as propriedades existem
          text: r.colors.text || r.colors.foreground
        }
      };
      console.log("Carregando tema no customizer:", E), l(E);
    }
  }, [e, r]);
  const y = (E, w) => {
    l((O) => ({
      ...O,
      colors: {
        ...O.colors,
        [E]: w
      }
    }));
  }, k = () => {
    console.log("Aplicando tema:", s), n({
      ...s,
      name: `custom-${s.isDark ? "dark" : "light"}-${Date.now()}`
    });
    const E = document.documentElement;
    Object.entries(s.colors).forEach(([w, O]) => {
      E.style.setProperty(`--theme-${w}`, O);
    }), s.isDark ? E.classList.add("dark") : E.classList.remove("dark"), t();
  }, h = () => {
    console.log("Resetando para tema padrão"), a();
    const E = s.isDark ? ar : nr;
    l({
      ...E,
      name: `default-${s.isDark ? "dark" : "light"}`
    });
  }, b = (E) => {
    const w = E ? ar : nr;
    console.log("Mudando para modo:", E ? "dark" : "light", w), l({
      ...w,
      isDark: E,
      name: `default-${E ? "dark" : "light"}`
    });
  }, g = () => `const ${s.isDark ? "defaultDarkTheme" : "defaultLightTheme"}: CustomTheme = {
  name: "${s.name}",
  isDark: ${s.isDark},
  colors: {
    background: "${s.colors.background}",
    foreground: "${s.colors.foreground}",
    primary: "${s.colors.primary}",
    secondary: "${s.colors.secondary}",
    accent: "${s.colors.accent}",
    success: "${s.colors.success}",
    warning: "${s.colors.warning}",
    danger: "${s.colors.danger}",
    border: "${s.colors.border}",
    muted: "${s.colors.muted}",
  },
};`, v = async () => {
    try {
      await navigator.clipboard.writeText(g()), f(!0), setTimeout(() => f(!1), 2e3);
    } catch (E) {
      console.error("Erro ao copiar:", E);
    }
  }, N = () => {
    c(!0);
  }, C = () => {
    c(!1), f(!1);
  }, P = [
    {
      key: "background",
      label: "Fundo",
      description: "Cor de fundo principal"
    },
    {
      key: "foreground",
      label: "Texto",
      description: "Cor do texto principal"
    },
    {
      key: "primary",
      label: "Primária",
      description: "Cor primária (botões, links)"
    },
    { key: "secondary", label: "Secundária", description: "Cor secundária" },
    { key: "accent", label: "Destaque", description: "Cor de destaque" },
    { key: "success", label: "Sucesso", description: "Verde para sucesso" },
    { key: "warning", label: "Aviso", description: "Amarelo para avisos" },
    { key: "danger", label: "Perigo", description: "Vermelho para erros" },
    { key: "border", label: "Borda", description: "Cor das bordas" },
    { key: "muted", label: "Silenciado", description: "Cor de fundo suave" }
  ];
  return /* @__PURE__ */ m(Pe, { isOpen: e, onClose: t, className: "max-w-2xl", children: [
    /* @__PURE__ */ m("div", { className: "p-2 w-full flex flex-col flex-1", children: [
      /* @__PURE__ */ m("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ i(Tt, { className: "w-6 h-6 text-primary-500" }),
        /* @__PURE__ */ i("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Personalizar Tema" })
      ] }),
      /* @__PURE__ */ i("div", { className: "mb-6  bg-gray-50 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ m("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ i("h3", { className: "font-semibold text-gray-900 dark:text-white", children: "Modo" }),
          /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Escolha entre tema claro ou escuro" })
        ] }),
        /* @__PURE__ */ i(
          At,
          {
            checked: s.isDark,
            onCheckedChange: b
          }
        )
      ] }) }),
      /* @__PURE__ */ i("div", { className: "space-y-4 mb-6 max-h-96 overflow-y-auto", children: P.map(({ key: E, label: w, description: O }) => /* @__PURE__ */ m("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ m("div", { className: "flex-1", children: [
          /* @__PURE__ */ i("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: w }),
          /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: O })
        ] }),
        /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(
            Ne,
            {
              type: "color",
              value: s.colors[E],
              onChange: (B) => y(E, B.target.value),
              className: "w-12 h-10 p-1 border-2"
            }
          ),
          /* @__PURE__ */ i(
            Ne,
            {
              type: "text",
              value: s.colors[E],
              onChange: (B) => y(E, B.target.value),
              className: "w-24 text-xs font-mono",
              placeholder: "#000000"
            }
          )
        ] })
      ] }, E)) }),
      /* @__PURE__ */ m(
        "div",
        {
          className: "mb-6 p-4 rounded-lg border-2",
          style: {
            backgroundColor: s.colors.background,
            borderColor: s.colors.border,
            color: s.colors.foreground
          },
          children: [
            /* @__PURE__ */ i("h4", { className: "font-semibold mb-2", children: "Preview do Tema" }),
            /* @__PURE__ */ m("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.primary },
                  children: "Primário"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.secondary },
                  children: "Secundário"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.accent },
                  children: "Destaque"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.success },
                  children: "Sucesso"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.warning },
                  children: "Aviso"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: s.colors.danger },
                  children: "Perigo"
                }
              )
            ] })
          ]
        }
      ),
      " ",
      /* @__PURE__ */ m("div", { className: "flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ m("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ m(
            A,
            {
              variant: "ghost",
              onClick: h,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ i(tr, { className: "w-4 h-4" }),
                o ? "Voltar ao Padrão" : "Resetar Cores"
              ]
            }
          ),
          /* @__PURE__ */ m(
            A,
            {
              variant: "secondary",
              onClick: N,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ i(Zt, { className: "w-4 h-4" }),
                "Exportar Tema"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ i(A, { variant: "secondary", onClick: t, children: "Cancelar" }),
          /* @__PURE__ */ i(A, { variant: "primary", onClick: k, children: o ? "Atualizar Tema" : "Criar Tema Personalizado" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(
      Pe,
      {
        isOpen: u,
        onClose: () => c(!1),
        className: "max-w-4xl",
        children: /* @__PURE__ */ m("div", { className: "p-6", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ i(Zt, { className: "w-6 h-6 text-primary-500" }),
            /* @__PURE__ */ i("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Exportar Tema Personalizado" })
          ] }),
          /* @__PURE__ */ i("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: "Copie o código abaixo e substitua o tema padrão no seu projeto para usar este tema personalizado permanentemente." }),
          /* @__PURE__ */ m("div", { className: "bg-gray-900 rounded-lg p-4 mb-4 relative", children: [
            /* @__PURE__ */ i("pre", { className: "text-green-400 text-sm overflow-x-auto whitespace-pre-wrap font-mono", children: /* @__PURE__ */ i("code", { children: g() }) }),
            /* @__PURE__ */ i(
              A,
              {
                onClick: v,
                className: "absolute top-2 right-2 p-2",
                variant: "ghost",
                size: "sm",
                children: d ? /* @__PURE__ */ i(Xt, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ i(Yt, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ m("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4", children: [
            /* @__PURE__ */ i("h3", { className: "font-semibold text-blue-900 dark:text-blue-100 mb-2", children: "💡 Como usar:" }),
            /* @__PURE__ */ m("ol", { className: "text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside", children: [
              /* @__PURE__ */ i("li", { children: "Copie o código acima" }),
              /* @__PURE__ */ i("li", { children: "Substitua o tema padrão correspondente no seu projeto" }),
              /* @__PURE__ */ i("li", { children: "Ou passe como prop customizada para o EvolutionManager" }),
              /* @__PURE__ */ i("li", { children: "Reinicie sua aplicação para ver as mudanças" })
            ] })
          ] }),
          /* @__PURE__ */ m("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ m(
              A,
              {
                variant: "ghost",
                onClick: C,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(tr, { className: "w-4 h-4" }),
                  "Voltar ao Editor"
                ]
              }
            ),
            /* @__PURE__ */ m("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ i(
                A,
                {
                  variant: "secondary",
                  onClick: () => c(!1),
                  children: "Fechar"
                }
              ),
              /* @__PURE__ */ i(
                A,
                {
                  variant: "primary",
                  onClick: v,
                  className: "flex items-center gap-2",
                  children: d ? /* @__PURE__ */ m(Pt, { children: [
                    /* @__PURE__ */ i(Xt, { className: "w-4 h-4" }),
                    "Copiado!"
                  ] }) : /* @__PURE__ */ m(Pt, { children: [
                    /* @__PURE__ */ i(Yt, { className: "w-4 h-4" }),
                    "Copiar Código"
                  ] })
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
};
function Mo({
  baseUrl: e,
  apiKey: t,
  showCreateButton: r = !0,
  showThemeToggle: n = !1,
  showThemeCustomizer: a = !1,
  maxInstances: o,
  className: s,
  style: l,
  onInstanceCreated: u,
  onInstanceDeleted: c,
  onInstanceConnected: d
}) {
  const { theme: f, toggleTheme: y } = bt(), [k, h] = L(!1), [b, g] = L(null), [v, N] = L(null), [C, P] = L(null), [E, w] = L(!1), [O, B] = L({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: F,
    instances: D,
    loading: z,
    error: re,
    createInstance: W,
    deleteInstance: S,
    connectInstance: R,
    refreshInstances: M,
    clearError: U
  } = Pr({ baseUrl: e, apiKey: t }), j = async (I) => {
    try {
      await W(I, "WHATSAPP-BAILEYS"), await M(), u == null || u(I);
    } catch (Q) {
      console.error("Erro ao criar instância:", Q);
    }
  }, ne = async (I) => {
    var Q, fe;
    try {
      const $ = await R(I), Y = ((Q = $ == null ? void 0 : $.data) == null ? void 0 : Q.qrcode) || ((fe = $ == null ? void 0 : $.data) == null ? void 0 : fe.base64) || ($ == null ? void 0 : $.qrcode) || ($ == null ? void 0 : $.base64) || ($ == null ? void 0 : $.qr);
      Y && (N(Y), g(I), d == null || d(I));
    } catch (De) {
      console.error("Erro ao conectar instância:", De);
    }
  }, Re = async (I) => {
    if (window.confirm(
      `Tem certeza que deseja deletar a instância "${I}"?`
    ))
      try {
        await S(I), await M(), c == null || c(I);
      } catch (Q) {
        console.error("Erro ao deletar instância:", Q);
      }
  }, _ = async (I) => {
    try {
      F && F.setInstanceSettings && (await F.setInstanceSettings(I, O), P(null), alert("Configurações salvas com sucesso!"));
    } catch (Q) {
      console.error("Erro ao configurar instância:", Q), alert("Erro ao salvar configurações");
    }
  }, se = !o || D.length < o;
  return z && D.length === 0 ? /* @__PURE__ */ i(
    "div",
    {
      className: `flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900 ${s}`,
      style: l,
      children: /* @__PURE__ */ i(ie, { size: "lg" })
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: `min-h-screen p-4 ${s}`,
      style: { backgroundColor: "var(--theme-muted)", ...l },
      children: /* @__PURE__ */ m("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ m("div", { className: "flex justify-between items-center mb-8 flex-wrap gap-4", children: [
          /* @__PURE__ */ m("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [
            "Instâncias WhatsApp (",
            D.length,
            o && `/${o}`,
            ")"
          ] }),
          /* @__PURE__ */ m("div", { className: "flex gap-4 flex-wrap items-center", children: [
            n && /* @__PURE__ */ i(
              At,
              {
                checked: f.isDark,
                onCheckedChange: y
              }
            ),
            a && /* @__PURE__ */ m(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => w(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(Tt, { className: "w-4 h-4" }),
                  "Personalizar"
                ]
              }
            ),
            /* @__PURE__ */ m(
              A,
              {
                variant: "secondary",
                size: "sm",
                onClick: M,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(We, { className: "w-4 h-4" }),
                  "Atualizar"
                ]
              }
            ),
            r && se && /* @__PURE__ */ m(
              A,
              {
                variant: "primary",
                size: "sm",
                onClick: () => h(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(mt, { className: "w-4 h-4" }),
                  "Nova Instância"
                ]
              }
            )
          ] })
        ] }),
        re && /* @__PURE__ */ i(te, { className: "mb-6 bg-danger-50 dark:bg-danger-500/10 border border-danger-500", children: /* @__PURE__ */ m("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ m("span", { className: "text-danger-600 dark:text-danger-400", children: [
            "❌ ",
            re
          ] }),
          /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: U, children: "✕" })
        ] }) }),
        z && /* @__PURE__ */ i("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ i(ie, { size: "md" }) }),
        o && D.length >= o && /* @__PURE__ */ i(te, { className: "mb-6 bg-warning-50 dark:bg-warning-500/10 border border-warning-500", children: /* @__PURE__ */ m("span", { className: "text-warning-600 dark:text-warning-400", children: [
          "⚠️ Limite máximo de ",
          o,
          " instâncias atingido"
        ] }) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: D.map((I) => /* @__PURE__ */ i(
          so,
          {
            instance: I,
            onConnect: () => ne(I.name),
            onDelete: () => Re(I.name),
            onSettings: () => P(I.name)
          },
          I.name
        )) }),
        D.length === 0 && !z && /* @__PURE__ */ m(te, { className: "text-center py-12", children: [
          /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(mt, { className: "w-16 h-16 mx-auto" }) }),
          /* @__PURE__ */ i("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: "Nenhuma instância encontrada" }),
          /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Crie sua primeira instância WhatsApp para começar" }),
          r && /* @__PURE__ */ i(A, { variant: "primary", onClick: () => h(!0), children: "Criar Primeira Instância" })
        ] }),
        /* @__PURE__ */ i(
          Yr,
          {
            isOpen: k,
            onClose: () => h(!1),
            onSubmit: j
          }
        ),
        b && v && /* @__PURE__ */ i(
          io,
          {
            isOpen: !!b,
            instanceName: b,
            qrCode: v,
            onClose: () => {
              g(null), N(null);
            }
          }
        ),
        C && /* @__PURE__ */ i(
          Zr,
          {
            isOpen: !!C,
            instanceName: C,
            settings: O,
            onSettingsChange: B,
            onSave: () => _(C),
            onClose: () => P(null)
          }
        ),
        /* @__PURE__ */ i(
          en,
          {
            isOpen: E,
            onClose: () => w(!1)
          }
        )
      ] })
    }
  );
}
const $o = ({
  baseUrl: e,
  apiKey: t,
  instanceId: r,
  showSettings: n = !0,
  showThemeToggle: a = !1,
  showThemeCustomizer: o = !1,
  onInstanceCreated: s,
  onInstanceDeleted: l,
  onInstanceConnected: u,
  className: c = "w-1/2 flex justify-center items-center",
  style: d
}) => {
  const [f, y] = L(!1), [k, h] = L(!1), [b, g] = L(null), [v, N] = L(!1), [C, P] = L(null), [E, w] = L(!1), [O, B] = L(!1), [F, D] = L({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: z,
    instances: re,
    loading: W,
    error: S,
    createInstance: R,
    deleteInstance: M,
    connectInstance: U,
    refreshInstances: j,
    clearError: ne
  } = Pr({
    baseUrl: e,
    apiKey: t
  }), { toggleTheme: Re } = bt(), _ = re.find(
    (Y) => Y.name === r
  );
  ve(() => {
    j();
  }, [r, j]);
  const se = async (Y) => {
    if (!z) {
      console.error("Manager não inicializado ainda. Aguarde...");
      return;
    }
    try {
      await R(Y, "WHATSAPP-BAILEYS"), await j(), s == null || s(Y), y(!1);
    } catch (Ie) {
      console.error("Erro ao criar instância:", Ie);
    }
  }, I = async () => {
    var Y, Ie;
    if (r)
      try {
        console.log("Iniciando conexão para instância:", r), h(!0), g(null), P(null);
        const me = await U(r);
        console.log("Resultado da conexão:", me);
        const G = me, we = ((Y = G == null ? void 0 : G.data) == null ? void 0 : Y.qrcode) || ((Ie = G == null ? void 0 : G.data) == null ? void 0 : Ie.base64) || (G == null ? void 0 : G.qrcode) || (G == null ? void 0 : G.base64) || (G == null ? void 0 : G.qr);
        console.log("QR Code extraído:", we ? "Presente" : "Ausente"), console.log("QR Code valor:", (we == null ? void 0 : we.substring(0, 100)) + "..."), h(!1), we ? (console.log("Definindo QR Code data..."), g(we), N(!1), console.log("Estados atualizados - QR definido, não conectando ainda"), u == null || u(r)) : console.error("QR Code não foi gerado na resposta:", me);
      } catch (me) {
        console.error("Erro ao conectar instância:", me), h(!1), N(!1), g(null), P(
          me instanceof Error ? me.message : "Erro desconhecido ao conectar"
        );
      }
  }, Q = async () => {
    if (r && window.confirm(
      `Tem certeza que deseja deletar a instância "${r}"?`
    ))
      try {
        await M(r), await j(), l == null || l(r);
      } catch (Y) {
        console.error("Erro ao deletar instância:", Y);
      }
  }, fe = async () => {
    try {
      z && z.setInstanceSettings && r && (await z.setInstanceSettings(r, F), w(!1), alert("Configurações salvas com sucesso!"));
    } catch (Y) {
      console.error("Erro ao configurar instância:", Y), alert("Erro ao salvar configurações");
    }
  }, De = () => C ? {
    text: "Erro na Conexão",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-500",
    showError: !0,
    expandCard: !0
  } : k ? {
    text: "Gerando QR Code...",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-500",
    showLoader: !0,
    expandCard: !0
  } : b && !v ? {
    text: "QR Code Gerado - Aguardando Conexão",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-500",
    showQR: !0,
    expandCard: !0
  } : v ? {
    text: "Conectando...",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-500",
    showLoader: !0,
    expandCard: !0
  } : (_ == null ? void 0 : _.status) === "connected" ? {
    text: "Conectado",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-500",
    showStats: !0,
    expandCard: !1
  } : {
    text: "Desconectado",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-500",
    expandCard: !1
  };
  if (console.log("Debug - Manager state:", {
    manager: !!z,
    loading: W,
    error: S,
    baseUrl: e,
    apiKey: t ? "Presente" : "Ausente"
  }), W || !z)
    return /* @__PURE__ */ i(
      "div",
      {
        className: `flex justify-center items-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg ${c}`,
        style: d,
        children: /* @__PURE__ */ m("div", { className: "text-center", children: [
          /* @__PURE__ */ i(ie, { size: "lg" }),
          /* @__PURE__ */ i("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: z ? "Carregando..." : "Inicializando Evolution Manager..." }),
          /* @__PURE__ */ m("div", { className: "mt-2 text-xs text-gray-500", children: [
            "BaseURL: ",
            e,
            " | API Key: ",
            t ? "Presente" : "Ausente"
          ] }),
          S && /* @__PURE__ */ m("div", { className: "mt-2 text-red-500 text-sm", children: [
            "Erro: ",
            S
          ] })
        ] })
      }
    );
  if (!_)
    return /* @__PURE__ */ i("div", { className: c, style: d, children: /* @__PURE__ */ m(te, { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center", children: [
      /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(ao, { className: "w-16 h-16 mx-auto" }) }),
      /* @__PURE__ */ m("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: [
        'Instância "',
        r,
        '" não encontrada'
      ] }),
      /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Esta instância não existe. Deseja criá-la?" }),
      /* @__PURE__ */ m("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ m(
          A,
          {
            variant: "primary",
            onClick: () => y(!0),
            disabled: !z,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ i(mt, { className: "w-4 h-4" }),
              z ? "Criar Instância" : "Inicializando..."
            ]
          }
        ),
        /* @__PURE__ */ m(
          A,
          {
            variant: "ghost",
            onClick: j,
            disabled: !z,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ i(We, { className: "w-4 h-4" }),
              "Atualizar"
            ]
          }
        )
      ] }),
      S && /* @__PURE__ */ m("div", { className: "mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center", children: [
        /* @__PURE__ */ m("span", { className: "text-danger-600 dark:text-danger-400 text-sm", children: [
          "❌ ",
          S
        ] }),
        /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: ne, children: "✕" })
      ] }),
      /* @__PURE__ */ i(
        Yr,
        {
          isOpen: f,
          onClose: () => y(!1),
          onSubmit: se,
          defaultName: r
        }
      )
    ] }) });
  const $ = De();
  return /* @__PURE__ */ m("div", { className: c, style: d, children: [
    (a || o) && /* @__PURE__ */ m("div", { className: "fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: [
      a && /* @__PURE__ */ i(
        At,
        {
          checked: document.documentElement.classList.contains("dark"),
          onCheckedChange: Re
        }
      ),
      o && /* @__PURE__ */ i(
        A,
        {
          onClick: () => B(!0),
          size: "sm",
          variant: "ghost",
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ i(Tt, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ m(
      te,
      {
        className: q(
          "transition-all duration-200",
          $.bg,
          $.border,
          $.expandCard ? "min-h-[400px]" : ""
        ),
        children: [
          /* @__PURE__ */ m("div", { className: "flex items-center justify-between p-4 pb-3", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ i("div", { className: q("w-3 h-3 rounded-full", $.badge) }),
              /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: _.name })
            ] }),
            /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mr-2", children: $.text }),
              n && /* @__PURE__ */ i(
                A,
                {
                  onClick: () => w(!0),
                  size: "sm",
                  variant: "ghost",
                  className: "flex items-center justify-center",
                  disabled: W || k || v,
                  children: /* @__PURE__ */ i(Qr, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ i(
                A,
                {
                  onClick: j,
                  size: "sm",
                  variant: "ghost",
                  className: "flex items-center justify-center",
                  disabled: W || k || v,
                  children: /* @__PURE__ */ i(We, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ m("div", { className: "p-4 pt-0", children: [
            $.showQR && b && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-4", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ i(
                "img",
                {
                  src: b,
                  alt: "QR Code para conectar WhatsApp",
                  className: "w-48 h-48"
                }
              ) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs", children: "Escaneie com seu WhatsApp" })
            ] }),
            $.showLoader && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(ie, { size: "md" }) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: $.text })
            ] }),
            $.showError && C && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ m("div", { className: "bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 flex flex-col items-center", children: [
                /* @__PURE__ */ i("div", { className: "text-red-500 text-4xl mb-2", children: "❌" }),
                /* @__PURE__ */ i("p", { className: "text-red-600 dark:text-red-400 text-center font-medium", children: C })
              ] }),
              /* @__PURE__ */ m(
                A,
                {
                  onClick: () => {
                    P(null), I();
                  },
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ i(We, { className: "w-4 h-4" }),
                    "Tentar Novamente"
                  ]
                }
              )
            ] }),
            $.showStats && /* @__PURE__ */ m("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
              /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(Xr, { className: "w-4 h-4 text-blue-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: _.contactsCount || 0 })
              ] }),
              /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(Rt, { className: "w-4 h-4 text-green-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Chats" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: _.chatsCount || 0 })
              ] })
            ] }),
            /* @__PURE__ */ m("div", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4", children: [
              /* @__PURE__ */ m("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Integração:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: _.integration || "WHATSAPP-BAILEYS" })
              ] }),
              _.connectionState && /* @__PURE__ */ m("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Estado:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: _.connectionState })
              ] }),
              /* @__PURE__ */ m("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Última atualização:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: (/* @__PURE__ */ new Date()).toLocaleTimeString() })
              ] })
            ] }),
            /* @__PURE__ */ m("div", { className: "flex justify-end items-center gap-2", children: [
              /* @__PURE__ */ m(
                A,
                {
                  onClick: Q,
                  size: "sm",
                  variant: "danger",
                  className: "flex items-center space-x-1",
                  disabled: W || k || v,
                  children: [
                    /* @__PURE__ */ i(Gr, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Excluir" })
                  ]
                }
              ),
              _.status === "connected" ? /* @__PURE__ */ m(
                A,
                {
                  onClick: () => console.log("Disconnect not implemented yet"),
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center space-x-1",
                  disabled: W || k || v,
                  children: [
                    /* @__PURE__ */ i(Kr, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Desconectar" })
                  ]
                }
              ) : /* @__PURE__ */ m(
                A,
                {
                  onClick: I,
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center space-x-1",
                  disabled: W || k || v,
                  children: [
                    /* @__PURE__ */ i(Jr, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Conectar" })
                  ]
                }
              )
            ] }),
            S && /* @__PURE__ */ m("div", { className: "mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex justify-between items-center", children: [
              /* @__PURE__ */ m("span", { className: "text-red-600 dark:text-red-400 text-sm", children: [
                "❌ ",
                S
              ] }),
              /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: ne, children: "✕" })
            ] })
          ] })
        ]
      }
    ),
    E && /* @__PURE__ */ i(
      Zr,
      {
        isOpen: E,
        instanceName: r,
        settings: F,
        onSettingsChange: D,
        onSave: fe,
        onClose: () => w(!1)
      }
    ),
    O && /* @__PURE__ */ i(
      en,
      {
        isOpen: O,
        onClose: () => B(!1)
      }
    )
  ] });
}, ye = ({
  variant: e = "default",
  children: t,
  className: r
}) => /* @__PURE__ */ i(
  "span",
  {
    className: q(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      {
        success: "bg-success-500 text-white",
        warning: "bg-warning-500 text-white",
        danger: "bg-danger-500 text-white",
        default: "bg-gray-500 text-white"
      }[e],
      r
    ),
    children: t
  }
), lo = (e) => {
  switch (e) {
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
}, co = (e) => {
  switch (e) {
    case "connected":
      return "Conectado";
    case "connecting":
      return "Conectando";
    case "disconnected":
      return "Desconectado";
    default:
      return "Desconhecido";
  }
}, Fo = ({
  status: e,
  instanceName: t,
  lastUpdate: r
}) => {
  const n = lo(e), a = co(e), o = (s) => {
    switch (s) {
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
  return /* @__PURE__ */ m(
    "div",
    {
      className: q(
        "flex items-center justify-between p-3 border rounded-lg",
        n.bg,
        n.border
      ),
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i("div", { className: q("w-3 h-3 rounded-full", n.badge) }),
          /* @__PURE__ */ m("div", { children: [
            /* @__PURE__ */ i("p", { className: q("text-sm font-medium", n.text), children: a }),
            /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t })
          ] })
        ] }),
        /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(ye, { variant: o(e), children: a }),
          r && /* @__PURE__ */ i("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: r.toLocaleTimeString() })
        ] })
      ]
    }
  );
}, Do = ({
  instanceId: e,
  contactId: t,
  messages: r = [],
  loading: n = !1,
  onSendMessage: a,
  onMessageAction: o,
  showInput: s = !0,
  autoScroll: l = !0,
  className: u
}) => {
  const [c, d] = L(""), [f, y] = L(!1), k = on(null), h = () => {
    var w;
    (w = k.current) == null || w.scrollIntoView({ behavior: "smooth" });
  };
  ve(() => {
    l && h();
  }, [r, l]);
  const b = (w) => {
    switch (w) {
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
  }, g = (w) => w.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }), v = (w) => {
    if (!w) return "";
    const O = ["Bytes", "KB", "MB", "GB"], B = Math.floor(Math.log(w) / Math.log(1024));
    return Math.round(w / Math.pow(1024, B) * 100) / 100 + " " + O[B];
  }, N = async () => {
    if (!(!c.trim() || !t || f)) {
      y(!0);
      try {
        await (a == null ? void 0 : a(c.trim(), t)), d("");
      } catch (w) {
        console.error("Erro ao enviar mensagem:", w);
      } finally {
        y(!1);
      }
    }
  }, C = (w) => {
    w.key === "Enter" && !w.shiftKey && (w.preventDefault(), N());
  }, P = (w, O) => {
    o == null || o(w, O);
  }, E = (w) => {
    switch (w.type) {
      case "image":
        return /* @__PURE__ */ m("div", { className: "max-w-xs", children: [
          w.mediaUrl && /* @__PURE__ */ i(
            "img",
            {
              src: w.mediaUrl,
              alt: "Imagem",
              className: "rounded-lg max-w-full h-auto"
            }
          ),
          w.text && /* @__PURE__ */ i("p", { className: "mt-2 text-sm", children: w.text })
        ] });
      case "audio":
        return /* @__PURE__ */ m("div", { className: "flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
          /* @__PURE__ */ i("span", { className: "text-2xl", children: "🎵" }),
          /* @__PURE__ */ m("div", { children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Áudio" }),
            w.fileName && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: w.fileName })
          ] })
        ] });
      case "video":
        return /* @__PURE__ */ m("div", { className: "max-w-xs", children: [
          w.mediaUrl ? /* @__PURE__ */ i(
            "video",
            {
              controls: !0,
              className: "rounded-lg max-w-full h-auto",
              src: w.mediaUrl
            }
          ) : /* @__PURE__ */ m("div", { className: "flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
            /* @__PURE__ */ i("span", { className: "text-2xl", children: "🎥" }),
            /* @__PURE__ */ m("div", { children: [
              /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Vídeo" }),
              w.fileName && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: w.fileName })
            ] })
          ] }),
          w.text && /* @__PURE__ */ i("p", { className: "mt-2 text-sm", children: w.text })
        ] });
      case "document":
        return /* @__PURE__ */ m("div", { className: "flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs", children: [
          /* @__PURE__ */ i("span", { className: "text-2xl", children: "📄" }),
          /* @__PURE__ */ m("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-medium truncate", children: w.fileName || "Documento" }),
            w.fileSize && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: v(w.fileSize) })
          ] })
        ] });
      case "sticker":
        return /* @__PURE__ */ i("div", { className: "w-24 h-24", children: w.mediaUrl ? /* @__PURE__ */ i(
          "img",
          {
            src: w.mediaUrl,
            alt: "Sticker",
            className: "w-full h-full object-contain"
          }
        ) : /* @__PURE__ */ i("div", { className: "w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ i("span", { className: "text-2xl", children: "😀" }) }) });
      default:
        return /* @__PURE__ */ i("p", { className: "text-sm", children: w.text });
    }
  };
  return n ? /* @__PURE__ */ i(te, { className: `p-6 ${u}`, children: /* @__PURE__ */ m("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ i(ie, { size: "lg" }),
    /* @__PURE__ */ i("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando mensagens..." })
  ] }) }) : t ? /* @__PURE__ */ m(te, { className: `flex flex-col h-96 ${u}`, children: [
    /* @__PURE__ */ m("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ i("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Mensagens" }),
      /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ i(ye, { variant: "default", children: e }),
        /* @__PURE__ */ i(ye, { variant: "default", children: r.length })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      r.length === 0 ? /* @__PURE__ */ m("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ i("div", { className: "text-gray-400 mb-2", children: /* @__PURE__ */ i(Rt, { className: "w-12 h-12 mx-auto" }) }),
        /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: "Nenhuma mensagem ainda" })
      ] }) : r.map((w) => /* @__PURE__ */ i(
        "div",
        {
          className: `flex ${w.isFromMe ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ m(
            "div",
            {
              className: `
                  max-w-[70%] rounded-lg p-3 relative group
                  ${w.isFromMe ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"}
                `,
              children: [
                w.quotedMessage && /* @__PURE__ */ m("div", { className: "mb-2 p-2 border-l-4 border-gray-300 bg-black/10 rounded text-xs", children: [
                  /* @__PURE__ */ i("p", { className: "font-medium opacity-70", children: w.quotedMessage.from }),
                  /* @__PURE__ */ i("p", { className: "opacity-70 truncate", children: w.quotedMessage.text })
                ] }),
                /* @__PURE__ */ i("div", { children: E(w) }),
                /* @__PURE__ */ m("div", { className: "flex items-center justify-between mt-2 text-xs opacity-70", children: [
                  /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ i(ye, { variant: b(w.type), children: w.type }),
                    /* @__PURE__ */ i("span", { children: g(w.timestamp) })
                  ] }),
                  w.isFromMe && /* @__PURE__ */ i("span", { children: w.isRead ? "✓✓" : "✓" })
                ] }),
                /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ i(
                  A,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => P(w.id, "reply"),
                    className: "text-xs p-1",
                    title: "Responder",
                    children: "↩️"
                  }
                ) })
              ]
            }
          )
        },
        w.id
      )),
      /* @__PURE__ */ i("div", { ref: k })
    ] }),
    s && t && /* @__PURE__ */ i("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ m("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ i(
        Ne,
        {
          type: "text",
          placeholder: "Digite sua mensagem...",
          value: c,
          onChange: (w) => d(w.target.value),
          onKeyPress: C,
          disabled: f,
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ i(
        A,
        {
          variant: "primary",
          onClick: N,
          disabled: !c.trim() || f,
          children: f ? /* @__PURE__ */ i(ie, { size: "sm" }) : "📤"
        }
      )
    ] }) })
  ] }) : /* @__PURE__ */ i(te, { className: `p-6 ${u}`, children: /* @__PURE__ */ m("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ i("div", { className: "text-6xl mb-4", children: "💬" }),
    /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Selecione um contato" }),
    /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400", children: "Escolha um contato para ver as mensagens." })
  ] }) });
}, Io = ({
  instanceId: e,
  contacts: t = [],
  loading: r = !1,
  onContactSelect: n,
  onContactAction: a,
  showSearch: o = !0,
  showActions: s = !0,
  className: l
}) => {
  const [u, c] = L(""), [d, f] = L(null), y = t.filter(
    (g) => g.name.toLowerCase().includes(u.toLowerCase()) || g.phone.includes(u)
  ), k = (g) => g ? "success" : "default", h = (g) => {
    f(g.id), n == null || n(g);
  }, b = (g, v) => {
    a == null || a(g, v);
  };
  return r ? /* @__PURE__ */ i(te, { className: `p-6 ${l}`, children: /* @__PURE__ */ m("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ i(ie, { size: "lg" }),
    /* @__PURE__ */ i("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando contatos..." })
  ] }) }) : t.length === 0 ? /* @__PURE__ */ i(te, { className: `p-6 ${l}`, children: /* @__PURE__ */ m("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ i("div", { className: "text-6xl mb-4", children: "👥" }),
    /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Nenhum contato encontrado" }),
    /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400", children: "Os contatos aparecerão aqui quando a instância estiver conectada." })
  ] }) }) : /* @__PURE__ */ m(te, { className: `p-4 ${l}`, children: [
    /* @__PURE__ */ m("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ m("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: [
        "Contatos (",
        t.length,
        ")"
      ] }),
      /* @__PURE__ */ i(ye, { variant: "default", children: e })
    ] }),
    o && /* @__PURE__ */ i("div", { className: "mb-4", children: /* @__PURE__ */ i(
      Ne,
      {
        type: "search",
        placeholder: "Buscar contatos...",
        value: u,
        onChange: (g) => c(g.target.value),
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ i("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: y.map((g) => /* @__PURE__ */ i(
      "div",
      {
        className: `
              p-3 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors
              ${d === g.id ? "bg-primary-50 dark:bg-primary-500/10 border-primary-500" : "bg-white dark:bg-gray-800"}
            `,
        onClick: () => h(g),
        children: /* @__PURE__ */ m("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ i("div", { className: "w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden", children: g.profilePicture ? /* @__PURE__ */ i(
              "img",
              {
                src: g.profilePicture,
                alt: g.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-600 dark:text-gray-300", children: g.name.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ m("div", { className: "flex-1", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i("h4", { className: "font-medium text-gray-900 dark:text-white text-sm", children: g.name }),
                g.isGroup && /* @__PURE__ */ m(ye, { variant: "default", children: [
                  "👥 ",
                  g.groupParticipants || 0
                ] }),
                /* @__PURE__ */ i(ye, { variant: k(g.isOnline), children: g.isOnline ? "Online" : "Offline" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: g.phone }),
              g.lastSeen && !g.isOnline && /* @__PURE__ */ m("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: [
                "Visto por último: ",
                g.lastSeen.toLocaleString()
              ] })
            ] })
          ] }),
          s && /* @__PURE__ */ m("div", { className: "flex space-x-1", children: [
            /* @__PURE__ */ i(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: (v) => {
                  v.stopPropagation(), b(g.id, "message");
                },
                title: "Enviar mensagem",
                children: "💬"
              }
            ),
            /* @__PURE__ */ i(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: (v) => {
                  v.stopPropagation(), b(g.id, "call");
                },
                title: "Ligar",
                children: "📞"
              }
            ),
            g.isBlocked ? /* @__PURE__ */ i(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: (v) => {
                  v.stopPropagation(), b(g.id, "unblock");
                },
                title: "Desbloquear",
                children: "🔓"
              }
            ) : /* @__PURE__ */ i(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: (v) => {
                  v.stopPropagation(), b(g.id, "block");
                },
                title: "Bloquear",
                children: "🚫"
              }
            )
          ] })
        ] })
      },
      g.id
    )) }),
    u && /* @__PURE__ */ i("div", { className: "mt-3 pt-3 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ m("p", { className: "text-sm text-gray-500 dark:text-gray-400 text-center", children: [
      y.length,
      " contato(s) encontrado(s)"
    ] }) })
  ] });
}, jo = {
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
}, Bo = {
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
  ye as Badge,
  A as Button,
  te as Card,
  Fo as ConnectionStatus,
  Io as ContactList,
  ja as EvolutionManager,
  Ne as Input,
  so as InstanceCard,
  $o as InstanceController,
  Mo as InstanceManager,
  ie as Loading,
  Do as MessageList,
  Pe as Modal,
  oo as QRCodeDisplay,
  mo as ThemeProvider,
  Bo as darkTheme,
  jo as defaultTheme,
  Pr as useEvolutionManager,
  bt as useTheme
};
