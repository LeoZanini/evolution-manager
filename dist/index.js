import { jsx as i, jsxs as h, Fragment as bt } from "react/jsx-runtime";
import * as x from "react";
import { createContext as Pn, useState as A, useEffect as ve, useCallback as H, useContext as An, forwardRef as In, createElement as Vt, useRef as xt } from "react";
const kr = Pn(
  void 0
), On = {
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
}, Mn = {
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
}, jo = ({ children: e }) => {
  const [t, r] = A(!1), [n, a] = A(!1);
  ve(() => {
    const f = localStorage.getItem("evolution-theme-mode"), g = localStorage.getItem("evolution-theme-is-custom"), v = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches, m = f || (v ? "dark" : "light"), y = g === "true";
    r(m === "dark"), a(y), console.log("Inicializando tema:", {
      mode: m,
      isCustom: y
    });
    const p = s(m, y);
    o(p);
  }, []);
  const s = (f, g) => {
    if (g) {
      const m = localStorage.getItem(
        `evolution-custom-theme-${f}`
      );
      if (m)
        try {
          const y = JSON.parse(m);
          return console.log(`Carregando tema personalizado ${f}:`, y), y;
        } catch (y) {
          console.error(`Erro ao carregar tema personalizado ${f}:`, y);
        }
    }
    const v = f === "dark" ? Mn : On;
    return console.log(`Usando tema padrão ${f}:`, v), v;
  }, o = (f) => {
    const g = document.documentElement, v = g.style;
    for (let m = v.length - 1; m >= 0; m--) {
      const y = v[m];
      y.startsWith("--theme-") && v.removeProperty(y);
    }
    Object.entries(f.colors).forEach(([m, y]) => {
      g.style.setProperty(`--theme-${m}`, y);
    }), f.isDark ? g.classList.add("dark") : g.classList.remove("dark");
  }, l = () => {
    const f = t ? "light" : "dark";
    r(!t), localStorage.setItem("evolution-theme-mode", f), console.log("Toggle theme:", {
      fromMode: t ? "dark" : "light",
      toMode: f,
      isCustom: n
    });
    const g = s(f, n);
    o(g);
  }, d = (f) => {
    console.log("Definindo novo tema personalizado:", f);
    const g = f.isDark ? "dark" : "light";
    localStorage.setItem(
      `evolution-custom-theme-${g}`,
      JSON.stringify(f)
    ), localStorage.setItem("evolution-theme-is-custom", "true"), localStorage.setItem("evolution-theme-mode", g), a(!0), r(f.isDark), o(f);
  }, c = () => {
    console.log("Resetando para tema padrão"), localStorage.setItem("evolution-theme-is-custom", "false"), a(!1);
    const g = s(t ? "dark" : "light", !1);
    o(g);
  }, u = s(
    t ? "dark" : "light",
    n
  );
  return /* @__PURE__ */ i(
    kr.Provider,
    {
      value: {
        theme: u,
        toggleTheme: l,
        setCustomTheme: d,
        resetToDefaultTheme: c,
        isCustomTheme: n,
        isDarkMode: t
      },
      children: e
    }
  );
};
function Nr(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ln } = Object.prototype, { getPrototypeOf: Tt } = Object, { iterator: nt, toStringTag: Cr } = Symbol, at = /* @__PURE__ */ ((e) => (t) => {
  const r = Ln.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ue = (e) => (e = e.toLowerCase(), (t) => at(t) === e), st = (e) => (t) => typeof t === e, { isArray: Oe } = Array, Ae = st("undefined");
function Ue(e) {
  return e !== null && !Ae(e) && e.constructor !== null && !Ae(e.constructor) && ae(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Er = ue("ArrayBuffer");
function $n(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Er(e.buffer), t;
}
const Fn = st("string"), ae = st("function"), Sr = st("number"), Be = (e) => e !== null && typeof e == "object", Dn = (e) => e === !0 || e === !1, Qe = (e) => {
  if (at(e) !== "object")
    return !1;
  const t = Tt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Cr in e) && !(nt in e);
}, jn = (e) => {
  if (!Be(e) || Ue(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, zn = ue("Date"), Un = ue("File"), Bn = ue("Blob"), _n = ue("FileList"), qn = (e) => Be(e) && ae(e.pipe), Hn = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ae(e.append) && ((t = at(e)) === "formdata" || // detect form-data instance
  t === "object" && ae(e.toString) && e.toString() === "[object FormData]"));
}, Wn = ue("URLSearchParams"), [Vn, Jn, Kn, Qn] = ["ReadableStream", "Request", "Response", "Headers"].map(ue), Gn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function _e(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, a;
  if (typeof e != "object" && (e = [e]), Oe(e))
    for (n = 0, a = e.length; n < a; n++)
      t.call(null, e[n], n, e);
  else {
    if (Ue(e))
      return;
    const s = r ? Object.getOwnPropertyNames(e) : Object.keys(e), o = s.length;
    let l;
    for (n = 0; n < o; n++)
      l = s[n], t.call(null, e[l], l, e);
  }
}
function Rr(e, t) {
  if (Ue(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, a;
  for (; n-- > 0; )
    if (a = r[n], t === a.toLowerCase())
      return a;
  return null;
}
const Ee = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Tr = (e) => !Ae(e) && e !== Ee;
function wt() {
  const { caseless: e, skipUndefined: t } = Tr(this) && this || {}, r = {}, n = (a, s) => {
    const o = e && Rr(r, s) || s;
    Qe(r[o]) && Qe(a) ? r[o] = wt(r[o], a) : Qe(a) ? r[o] = wt({}, a) : Oe(a) ? r[o] = a.slice() : (!t || !Ae(a)) && (r[o] = a);
  };
  for (let a = 0, s = arguments.length; a < s; a++)
    arguments[a] && _e(arguments[a], n);
  return r;
}
const Xn = (e, t, r, { allOwnKeys: n } = {}) => (_e(t, (a, s) => {
  r && ae(a) ? e[s] = Nr(a, r) : e[s] = a;
}, { allOwnKeys: n }), e), Yn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Zn = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, ea = (e, t, r, n) => {
  let a, s, o;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0; )
      o = a[s], (!n || n(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
    e = r !== !1 && Tt(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, ta = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, ra = (e) => {
  if (!e) return null;
  if (Oe(e)) return e;
  let t = e.length;
  if (!Sr(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, na = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Tt(Uint8Array)), aa = (e, t) => {
  const n = (e && e[nt]).call(e);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const s = a.value;
    t.call(e, s[0], s[1]);
  }
}, sa = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, oa = ue("HTMLFormElement"), ia = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, a) {
    return n.toUpperCase() + a;
  }
), Jt = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), la = ue("RegExp"), Pr = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  _e(r, (a, s) => {
    let o;
    (o = t(a, s, e)) !== !1 && (n[s] = o || a);
  }), Object.defineProperties(e, n);
}, ca = (e) => {
  Pr(e, (t, r) => {
    if (ae(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (ae(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, da = (e, t) => {
  const r = {}, n = (a) => {
    a.forEach((s) => {
      r[s] = !0;
    });
  };
  return Oe(e) ? n(e) : n(String(e).split(t)), r;
}, ua = () => {
}, ha = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ma(e) {
  return !!(e && ae(e.append) && e[Cr] === "FormData" && e[nt]);
}
const fa = (e) => {
  const t = new Array(10), r = (n, a) => {
    if (Be(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Ue(n))
        return n;
      if (!("toJSON" in n)) {
        t[a] = n;
        const s = Oe(n) ? [] : {};
        return _e(n, (o, l) => {
          const d = r(o, a + 1);
          !Ae(d) && (s[l] = d);
        }), t[a] = void 0, s;
      }
    }
    return n;
  };
  return r(e, 0);
}, ga = ue("AsyncFunction"), pa = (e) => e && (Be(e) || ae(e)) && ae(e.then) && ae(e.catch), Ar = ((e, t) => e ? setImmediate : t ? ((r, n) => (Ee.addEventListener("message", ({ source: a, data: s }) => {
  a === Ee && s === r && n.length && n.shift()();
}, !1), (a) => {
  n.push(a), Ee.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  ae(Ee.postMessage)
), ya = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ee) : typeof process < "u" && process.nextTick || Ar, ba = (e) => e != null && ae(e[nt]), b = {
  isArray: Oe,
  isArrayBuffer: Er,
  isBuffer: Ue,
  isFormData: Hn,
  isArrayBufferView: $n,
  isString: Fn,
  isNumber: Sr,
  isBoolean: Dn,
  isObject: Be,
  isPlainObject: Qe,
  isEmptyObject: jn,
  isReadableStream: Vn,
  isRequest: Jn,
  isResponse: Kn,
  isHeaders: Qn,
  isUndefined: Ae,
  isDate: zn,
  isFile: Un,
  isBlob: Bn,
  isRegExp: la,
  isFunction: ae,
  isStream: qn,
  isURLSearchParams: Wn,
  isTypedArray: na,
  isFileList: _n,
  forEach: _e,
  merge: wt,
  extend: Xn,
  trim: Gn,
  stripBOM: Yn,
  inherits: Zn,
  toFlatObject: ea,
  kindOf: at,
  kindOfTest: ue,
  endsWith: ta,
  toArray: ra,
  forEachEntry: aa,
  matchAll: sa,
  isHTMLForm: oa,
  hasOwnProperty: Jt,
  hasOwnProp: Jt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Pr,
  freezeMethods: ca,
  toObjectSet: da,
  toCamelCase: ia,
  noop: ua,
  toFiniteNumber: ha,
  findKey: Rr,
  global: Ee,
  isContextDefined: Tr,
  isSpecCompliantForm: ma,
  toJSONObject: fa,
  isAsyncFn: ga,
  isThenable: pa,
  setImmediate: Ar,
  asap: ya,
  isIterable: ba
};
function T(e, t, r, n, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), a && (this.response = a, this.status = a.status ? a.status : null);
}
b.inherits(T, Error, {
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
      config: b.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Ir = T.prototype, Or = {};
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
  Or[e] = { value: e };
});
Object.defineProperties(T, Or);
Object.defineProperty(Ir, "isAxiosError", { value: !0 });
T.from = (e, t, r, n, a, s) => {
  const o = Object.create(Ir);
  b.toFlatObject(e, o, function(u) {
    return u !== Error.prototype;
  }, (c) => c !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", d = t == null && e ? e.code : t;
  return T.call(o, l, d, r, n, a), e && o.cause == null && Object.defineProperty(o, "cause", { value: e, configurable: !0 }), o.name = e && e.name || "Error", s && Object.assign(o, s), o;
};
const xa = null;
function vt(e) {
  return b.isPlainObject(e) || b.isArray(e);
}
function Mr(e) {
  return b.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Kt(e, t, r) {
  return e ? e.concat(t).map(function(a, s) {
    return a = Mr(a), !r && s ? "[" + a + "]" : a;
  }).join(r ? "." : "") : t;
}
function wa(e) {
  return b.isArray(e) && !e.some(vt);
}
const va = b.toFlatObject(b, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ot(e, t, r) {
  if (!b.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = b.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, p) {
    return !b.isUndefined(p[y]);
  });
  const n = r.metaTokens, a = r.visitor || u, s = r.dots, o = r.indexes, d = (r.Blob || typeof Blob < "u" && Blob) && b.isSpecCompliantForm(t);
  if (!b.isFunction(a))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (b.isDate(m))
      return m.toISOString();
    if (b.isBoolean(m))
      return m.toString();
    if (!d && b.isBlob(m))
      throw new T("Blob is not supported. Use a Buffer instead.");
    return b.isArrayBuffer(m) || b.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function u(m, y, p) {
    let k = m;
    if (m && !p && typeof m == "object") {
      if (b.endsWith(y, "{}"))
        y = n ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (b.isArray(m) && wa(m) || (b.isFileList(m) || b.endsWith(y, "[]")) && (k = b.toArray(m)))
        return y = Mr(y), k.forEach(function(E, L) {
          !(b.isUndefined(E) || E === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Kt([y], L, s) : o === null ? y : y + "[]",
            c(E)
          );
        }), !1;
    }
    return vt(m) ? !0 : (t.append(Kt(p, y, s), c(m)), !1);
  }
  const f = [], g = Object.assign(va, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: vt
  });
  function v(m, y) {
    if (!b.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      f.push(m), b.forEach(m, function(k, N) {
        (!(b.isUndefined(k) || k === null) && a.call(
          t,
          k,
          b.isString(N) ? N.trim() : N,
          y,
          g
        )) === !0 && v(k, y ? y.concat(N) : [N]);
      }), f.pop();
    }
  }
  if (!b.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function Qt(e) {
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
function Pt(e, t) {
  this._pairs = [], e && ot(e, this, t);
}
const Lr = Pt.prototype;
Lr.append = function(t, r) {
  this._pairs.push([t, r]);
};
Lr.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Qt);
  } : Qt;
  return this._pairs.map(function(a) {
    return r(a[0]) + "=" + r(a[1]);
  }, "").join("&");
};
function ka(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function $r(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || ka;
  b.isFunction(r) && (r = {
    serialize: r
  });
  const a = r && r.serialize;
  let s;
  if (a ? s = a(t, r) : s = b.isURLSearchParams(t) ? t.toString() : new Pt(t, r).toString(n), s) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class Gt {
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
    b.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Fr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Na = typeof URLSearchParams < "u" ? URLSearchParams : Pt, Ca = typeof FormData < "u" ? FormData : null, Ea = typeof Blob < "u" ? Blob : null, Sa = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Na,
    FormData: Ca,
    Blob: Ea
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, At = typeof window < "u" && typeof document < "u", kt = typeof navigator == "object" && navigator || void 0, Ra = At && (!kt || ["ReactNative", "NativeScript", "NS"].indexOf(kt.product) < 0), Ta = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Pa = At && window.location.href || "http://localhost", Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: At,
  hasStandardBrowserEnv: Ra,
  hasStandardBrowserWebWorkerEnv: Ta,
  navigator: kt,
  origin: Pa
}, Symbol.toStringTag, { value: "Module" })), G = {
  ...Aa,
  ...Sa
};
function Ia(e, t) {
  return ot(e, new G.classes.URLSearchParams(), {
    visitor: function(r, n, a, s) {
      return G.isNode && b.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Oa(e) {
  return b.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ma(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const a = r.length;
  let s;
  for (n = 0; n < a; n++)
    s = r[n], t[s] = e[s];
  return t;
}
function Dr(e) {
  function t(r, n, a, s) {
    let o = r[s++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), d = s >= r.length;
    return o = !o && b.isArray(a) ? a.length : o, d ? (b.hasOwnProp(a, o) ? a[o] = [a[o], n] : a[o] = n, !l) : ((!a[o] || !b.isObject(a[o])) && (a[o] = []), t(r, n, a[o], s) && b.isArray(a[o]) && (a[o] = Ma(a[o])), !l);
  }
  if (b.isFormData(e) && b.isFunction(e.entries)) {
    const r = {};
    return b.forEachEntry(e, (n, a) => {
      t(Oa(n), a, r, 0);
    }), r;
  }
  return null;
}
function La(e, t, r) {
  if (b.isString(e))
    try {
      return (t || JSON.parse)(e), b.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const qe = {
  transitional: Fr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", a = n.indexOf("application/json") > -1, s = b.isObject(t);
    if (s && b.isHTMLForm(t) && (t = new FormData(t)), b.isFormData(t))
      return a ? JSON.stringify(Dr(t)) : t;
    if (b.isArrayBuffer(t) || b.isBuffer(t) || b.isStream(t) || b.isFile(t) || b.isBlob(t) || b.isReadableStream(t))
      return t;
    if (b.isArrayBufferView(t))
      return t.buffer;
    if (b.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ia(t, this.formSerializer).toString();
      if ((l = b.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return ot(
          l ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || a ? (r.setContentType("application/json", !1), La(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || qe.transitional, n = r && r.forcedJSONParsing, a = this.responseType === "json";
    if (b.isResponse(t) || b.isReadableStream(t))
      return t;
    if (t && b.isString(t) && (n && !this.responseType || a)) {
      const o = !(r && r.silentJSONParsing) && a;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (o)
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
    FormData: G.classes.FormData,
    Blob: G.classes.Blob
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
b.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  qe.headers[e] = {};
});
const $a = b.toObjectSet([
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
]), Fa = (e) => {
  const t = {};
  let r, n, a;
  return e && e.split(`
`).forEach(function(o) {
    a = o.indexOf(":"), r = o.substring(0, a).trim().toLowerCase(), n = o.substring(a + 1).trim(), !(!r || t[r] && $a[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Xt = Symbol("internals");
function Fe(e) {
  return e && String(e).trim().toLowerCase();
}
function Ge(e) {
  return e === !1 || e == null ? e : b.isArray(e) ? e.map(Ge) : String(e);
}
function Da(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const ja = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function mt(e, t, r, n, a) {
  if (b.isFunction(n))
    return n.call(this, t, r);
  if (a && (t = r), !!b.isString(t)) {
    if (b.isString(n))
      return t.indexOf(n) !== -1;
    if (b.isRegExp(n))
      return n.test(t);
  }
}
function za(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Ua(e, t) {
  const r = b.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(a, s, o) {
        return this[n].call(this, t, a, s, o);
      },
      configurable: !0
    });
  });
}
let se = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const a = this;
    function s(l, d, c) {
      const u = Fe(d);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const f = b.findKey(a, u);
      (!f || a[f] === void 0 || c === !0 || c === void 0 && a[f] !== !1) && (a[f || d] = Ge(l));
    }
    const o = (l, d) => b.forEach(l, (c, u) => s(c, u, d));
    if (b.isPlainObject(t) || t instanceof this.constructor)
      o(t, r);
    else if (b.isString(t) && (t = t.trim()) && !ja(t))
      o(Fa(t), r);
    else if (b.isObject(t) && b.isIterable(t)) {
      let l = {}, d, c;
      for (const u of t) {
        if (!b.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        l[c = u[0]] = (d = l[c]) ? b.isArray(d) ? [...d, u[1]] : [d, u[1]] : u[1];
      }
      o(l, r);
    } else
      t != null && s(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = Fe(t), t) {
      const n = b.findKey(this, t);
      if (n) {
        const a = this[n];
        if (!r)
          return a;
        if (r === !0)
          return Da(a);
        if (b.isFunction(r))
          return r.call(this, a, n);
        if (b.isRegExp(r))
          return r.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Fe(t), t) {
      const n = b.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || mt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let a = !1;
    function s(o) {
      if (o = Fe(o), o) {
        const l = b.findKey(n, o);
        l && (!r || mt(n, n[l], l, r)) && (delete n[l], a = !0);
      }
    }
    return b.isArray(t) ? t.forEach(s) : s(t), a;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, a = !1;
    for (; n--; ) {
      const s = r[n];
      (!t || mt(this, this[s], s, t, !0)) && (delete this[s], a = !0);
    }
    return a;
  }
  normalize(t) {
    const r = this, n = {};
    return b.forEach(this, (a, s) => {
      const o = b.findKey(n, s);
      if (o) {
        r[o] = Ge(a), delete r[s];
        return;
      }
      const l = t ? za(s) : String(s).trim();
      l !== s && delete r[s], r[l] = Ge(a), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return b.forEach(this, (n, a) => {
      n != null && n !== !1 && (r[a] = t && b.isArray(n) ? n.join(", ") : n);
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
    const n = (this[Xt] = this[Xt] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function s(o) {
      const l = Fe(o);
      n[l] || (Ua(a, o), n[l] = !0);
    }
    return b.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
se.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
b.reduceDescriptors(se.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
b.freezeMethods(se);
function ft(e, t) {
  const r = this || qe, n = t || r, a = se.from(n.headers);
  let s = n.data;
  return b.forEach(e, function(l) {
    s = l.call(r, s, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), s;
}
function jr(e) {
  return !!(e && e.__CANCEL__);
}
function Me(e, t, r) {
  T.call(this, e ?? "canceled", T.ERR_CANCELED, t, r), this.name = "CanceledError";
}
b.inherits(Me, T, {
  __CANCEL__: !0
});
function zr(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new T(
    "Request failed with status code " + r.status,
    [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function Ba(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function _a(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let a = 0, s = 0, o;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const c = Date.now(), u = n[s];
    o || (o = c), r[a] = d, n[a] = c;
    let f = s, g = 0;
    for (; f !== a; )
      g += r[f++], f = f % e;
    if (a = (a + 1) % e, a === s && (s = (s + 1) % e), c - o < t)
      return;
    const v = u && c - u;
    return v ? Math.round(g * 1e3 / v) : void 0;
  };
}
function qa(e, t) {
  let r = 0, n = 1e3 / t, a, s;
  const o = (c, u = Date.now()) => {
    r = u, a = null, s && (clearTimeout(s), s = null), e(...c);
  };
  return [(...c) => {
    const u = Date.now(), f = u - r;
    f >= n ? o(c, u) : (a = c, s || (s = setTimeout(() => {
      s = null, o(a);
    }, n - f)));
  }, () => a && o(a)];
}
const tt = (e, t, r = 3) => {
  let n = 0;
  const a = _a(50, 250);
  return qa((s) => {
    const o = s.loaded, l = s.lengthComputable ? s.total : void 0, d = o - n, c = a(d), u = o <= l;
    n = o;
    const f = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: d,
      rate: c || void 0,
      estimated: c && l && u ? (l - o) / c : void 0,
      event: s,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, r);
}, Yt = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, Zt = (e) => (...t) => b.asap(() => e(...t)), Ha = G.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, G.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(G.origin),
  G.navigator && /(msie|trident)/i.test(G.navigator.userAgent)
) : () => !0, Wa = G.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, a, s) {
      const o = [e + "=" + encodeURIComponent(t)];
      b.isNumber(r) && o.push("expires=" + new Date(r).toGMTString()), b.isString(n) && o.push("path=" + n), b.isString(a) && o.push("domain=" + a), s === !0 && o.push("secure"), document.cookie = o.join("; ");
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
function Va(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ja(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ur(e, t, r) {
  let n = !Va(t);
  return e && (n || r == !1) ? Ja(e, t) : t;
}
const er = (e) => e instanceof se ? { ...e } : e;
function Te(e, t) {
  t = t || {};
  const r = {};
  function n(c, u, f, g) {
    return b.isPlainObject(c) && b.isPlainObject(u) ? b.merge.call({ caseless: g }, c, u) : b.isPlainObject(u) ? b.merge({}, u) : b.isArray(u) ? u.slice() : u;
  }
  function a(c, u, f, g) {
    if (b.isUndefined(u)) {
      if (!b.isUndefined(c))
        return n(void 0, c, f, g);
    } else return n(c, u, f, g);
  }
  function s(c, u) {
    if (!b.isUndefined(u))
      return n(void 0, u);
  }
  function o(c, u) {
    if (b.isUndefined(u)) {
      if (!b.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, u);
  }
  function l(c, u, f) {
    if (f in t)
      return n(c, u);
    if (f in e)
      return n(void 0, c);
  }
  const d = {
    url: s,
    method: s,
    data: s,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (c, u, f) => a(er(c), er(u), f, !0)
  };
  return b.forEach(Object.keys({ ...e, ...t }), function(u) {
    const f = d[u] || a, g = f(e[u], t[u], u);
    b.isUndefined(g) && f !== l || (r[u] = g);
  }), r;
}
const Br = (e) => {
  const t = Te({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: a, xsrfCookieName: s, headers: o, auth: l } = t;
  if (t.headers = o = se.from(o), t.url = $r(Ur(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), b.isFormData(r)) {
    if (G.hasStandardBrowserEnv || G.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (b.isFunction(r.getHeaders)) {
      const d = r.getHeaders(), c = ["content-type", "content-length"];
      Object.entries(d).forEach(([u, f]) => {
        c.includes(u.toLowerCase()) && o.set(u, f);
      });
    }
  }
  if (G.hasStandardBrowserEnv && (n && b.isFunction(n) && (n = n(t)), n || n !== !1 && Ha(t.url))) {
    const d = a && s && Wa.read(s);
    d && o.set(a, d);
  }
  return t;
}, Ka = typeof XMLHttpRequest < "u", Qa = Ka && function(e) {
  return new Promise(function(r, n) {
    const a = Br(e);
    let s = a.data;
    const o = se.from(a.headers).normalize();
    let { responseType: l, onUploadProgress: d, onDownloadProgress: c } = a, u, f, g, v, m;
    function y() {
      v && v(), m && m(), a.cancelToken && a.cancelToken.unsubscribe(u), a.signal && a.signal.removeEventListener("abort", u);
    }
    let p = new XMLHttpRequest();
    p.open(a.method.toUpperCase(), a.url, !0), p.timeout = a.timeout;
    function k() {
      if (!p)
        return;
      const E = se.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), S = {
        data: !l || l === "text" || l === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: E,
        config: e,
        request: p
      };
      zr(function(O) {
        r(O), y();
      }, function(O) {
        n(O), y();
      }, S), p = null;
    }
    "onloadend" in p ? p.onloadend = k : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(k);
    }, p.onabort = function() {
      p && (n(new T("Request aborted", T.ECONNABORTED, e, p)), p = null);
    }, p.onerror = function(L) {
      const S = L && L.message ? L.message : "Network Error", w = new T(S, T.ERR_NETWORK, e, p);
      w.event = L || null, n(w), p = null;
    }, p.ontimeout = function() {
      let L = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const S = a.transitional || Fr;
      a.timeoutErrorMessage && (L = a.timeoutErrorMessage), n(new T(
        L,
        S.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
        e,
        p
      )), p = null;
    }, s === void 0 && o.setContentType(null), "setRequestHeader" in p && b.forEach(o.toJSON(), function(L, S) {
      p.setRequestHeader(S, L);
    }), b.isUndefined(a.withCredentials) || (p.withCredentials = !!a.withCredentials), l && l !== "json" && (p.responseType = a.responseType), c && ([g, m] = tt(c, !0), p.addEventListener("progress", g)), d && p.upload && ([f, v] = tt(d), p.upload.addEventListener("progress", f), p.upload.addEventListener("loadend", v)), (a.cancelToken || a.signal) && (u = (E) => {
      p && (n(!E || E.type ? new Me(null, e, p) : E), p.abort(), p = null);
    }, a.cancelToken && a.cancelToken.subscribe(u), a.signal && (a.signal.aborted ? u() : a.signal.addEventListener("abort", u)));
    const N = Ba(a.url);
    if (N && G.protocols.indexOf(N) === -1) {
      n(new T("Unsupported protocol " + N + ":", T.ERR_BAD_REQUEST, e));
      return;
    }
    p.send(s || null);
  });
}, Ga = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), a;
    const s = function(c) {
      if (!a) {
        a = !0, l();
        const u = c instanceof Error ? c : this.reason;
        n.abort(u instanceof T ? u : new Me(u instanceof Error ? u.message : u));
      }
    };
    let o = t && setTimeout(() => {
      o = null, s(new T(`timeout ${t} of ms exceeded`, T.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(s) : c.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", s));
    const { signal: d } = n;
    return d.unsubscribe = () => b.asap(l), d;
  }
}, Xa = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, a;
  for (; n < r; )
    a = n + t, yield e.slice(n, a), n = a;
}, Ya = async function* (e, t) {
  for await (const r of Za(e))
    yield* Xa(r, t);
}, Za = async function* (e) {
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
}, tr = (e, t, r, n) => {
  const a = Ya(e, t);
  let s = 0, o, l = (d) => {
    o || (o = !0, n && n(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: c, value: u } = await a.next();
        if (c) {
          l(), d.close();
          return;
        }
        let f = u.byteLength;
        if (r) {
          let g = s += f;
          r(g);
        }
        d.enqueue(new Uint8Array(u));
      } catch (c) {
        throw l(c), c;
      }
    },
    cancel(d) {
      return l(d), a.return();
    }
  }, {
    highWaterMark: 2
  });
}, rr = 64 * 1024, { isFunction: Je } = b, es = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(b.global), {
  ReadableStream: nr,
  TextEncoder: ar
} = b.global, sr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, ts = (e) => {
  e = b.merge.call({
    skipUndefined: !0
  }, es, e);
  const { fetch: t, Request: r, Response: n } = e, a = t ? Je(t) : typeof fetch == "function", s = Je(r), o = Je(n);
  if (!a)
    return !1;
  const l = a && Je(nr), d = a && (typeof ar == "function" ? /* @__PURE__ */ ((m) => (y) => m.encode(y))(new ar()) : async (m) => new Uint8Array(await new r(m).arrayBuffer())), c = s && l && sr(() => {
    let m = !1;
    const y = new r(G.origin, {
      body: new nr(),
      method: "POST",
      get duplex() {
        return m = !0, "half";
      }
    }).headers.has("Content-Type");
    return m && !y;
  }), u = o && l && sr(() => b.isReadableStream(new n("").body)), f = {
    stream: u && ((m) => m.body)
  };
  a && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((m) => {
    !f[m] && (f[m] = (y, p) => {
      let k = y && y[m];
      if (k)
        return k.call(y);
      throw new T(`Response type '${m}' is not supported`, T.ERR_NOT_SUPPORT, p);
    });
  });
  const g = async (m) => {
    if (m == null)
      return 0;
    if (b.isBlob(m))
      return m.size;
    if (b.isSpecCompliantForm(m))
      return (await new r(G.origin, {
        method: "POST",
        body: m
      }).arrayBuffer()).byteLength;
    if (b.isArrayBufferView(m) || b.isArrayBuffer(m))
      return m.byteLength;
    if (b.isURLSearchParams(m) && (m = m + ""), b.isString(m))
      return (await d(m)).byteLength;
  }, v = async (m, y) => {
    const p = b.toFiniteNumber(m.getContentLength());
    return p ?? g(y);
  };
  return async (m) => {
    let {
      url: y,
      method: p,
      data: k,
      signal: N,
      cancelToken: E,
      timeout: L,
      onDownloadProgress: S,
      onUploadProgress: w,
      responseType: O,
      headers: U,
      withCredentials: D = "same-origin",
      fetchOptions: j
    } = Br(m), W = t || fetch;
    O = O ? (O + "").toLowerCase() : "text";
    let oe = Ga([N, E && E.toAbortSignal()], L), ee = null;
    const te = oe && oe.unsubscribe && (() => {
      oe.unsubscribe();
    });
    let R;
    try {
      if (w && c && p !== "get" && p !== "head" && (R = await v(U, k)) !== 0) {
        let V = new r(y, {
          method: "POST",
          body: k,
          duplex: "half"
        }), re;
        if (b.isFormData(k) && (re = V.headers.get("content-type")) && U.setContentType(re), V.body) {
          const [F, Y] = Yt(
            R,
            tt(Zt(w))
          );
          k = tr(V.body, rr, F, Y);
        }
      }
      b.isString(D) || (D = D ? "include" : "omit");
      const C = s && "credentials" in r.prototype, _ = {
        ...j,
        signal: oe,
        method: p.toUpperCase(),
        headers: U.normalize().toJSON(),
        body: k,
        duplex: "half",
        credentials: C ? D : void 0
      };
      ee = s && new r(y, _);
      let $ = await (s ? W(ee, j) : W(y, _));
      const ie = u && (O === "stream" || O === "response");
      if (u && (S || ie && te)) {
        const V = {};
        ["status", "statusText", "headers"].forEach((ce) => {
          V[ce] = $[ce];
        });
        const re = b.toFiniteNumber($.headers.get("content-length")), [F, Y] = S && Yt(
          re,
          tt(Zt(S), !0)
        ) || [];
        $ = new n(
          tr($.body, rr, F, () => {
            Y && Y(), te && te();
          }),
          V
        );
      }
      O = O || "text";
      let X = await f[b.findKey(f, O) || "text"]($, m);
      return !ie && te && te(), await new Promise((V, re) => {
        zr(V, re, {
          data: X,
          headers: se.from($.headers),
          status: $.status,
          statusText: $.statusText,
          config: m,
          request: ee
        });
      });
    } catch (C) {
      throw te && te(), C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message) ? Object.assign(
        new T("Network Error", T.ERR_NETWORK, m, ee),
        {
          cause: C.cause || C
        }
      ) : T.from(C, C && C.code, m, ee);
    }
  };
}, rs = /* @__PURE__ */ new Map(), _r = (e) => {
  let t = e ? e.env : {};
  const { fetch: r, Request: n, Response: a } = t, s = [
    n,
    a,
    r
  ];
  let o = s.length, l = o, d, c, u = rs;
  for (; l--; )
    d = s[l], c = u.get(d), c === void 0 && u.set(d, c = l ? /* @__PURE__ */ new Map() : ts(t)), u = c;
  return c;
};
_r();
const Nt = {
  http: xa,
  xhr: Qa,
  fetch: {
    get: _r
  }
};
b.forEach(Nt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const or = (e) => `- ${e}`, ns = (e) => b.isFunction(e) || e === null || e === !1, qr = {
  getAdapter: (e, t) => {
    e = b.isArray(e) ? e : [e];
    const { length: r } = e;
    let n, a;
    const s = {};
    for (let o = 0; o < r; o++) {
      n = e[o];
      let l;
      if (a = n, !ns(n) && (a = Nt[(l = String(n)).toLowerCase()], a === void 0))
        throw new T(`Unknown adapter '${l}'`);
      if (a && (b.isFunction(a) || (a = a.get(t))))
        break;
      s[l || "#" + o] = a;
    }
    if (!a) {
      const o = Object.entries(s).map(
        ([d, c]) => `adapter ${d} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = r ? o.length > 1 ? `since :
` + o.map(or).join(`
`) : " " + or(o[0]) : "as no adapter specified";
      throw new T(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: Nt
};
function gt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Me(null, e);
}
function ir(e) {
  return gt(e), e.headers = se.from(e.headers), e.data = ft.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), qr.getAdapter(e.adapter || qe.adapter, e)(e).then(function(n) {
    return gt(e), n.data = ft.call(
      e,
      e.transformResponse,
      n
    ), n.headers = se.from(n.headers), n;
  }, function(n) {
    return jr(n) || (gt(e), n && n.response && (n.response.data = ft.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = se.from(n.response.headers))), Promise.reject(n);
  });
}
const Hr = "1.12.2", it = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  it[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const lr = {};
it.transitional = function(t, r, n) {
  function a(s, o) {
    return "[Axios v" + Hr + "] Transitional option '" + s + "'" + o + (n ? ". " + n : "");
  }
  return (s, o, l) => {
    if (t === !1)
      throw new T(
        a(o, " has been removed" + (r ? " in " + r : "")),
        T.ERR_DEPRECATED
      );
    return r && !lr[o] && (lr[o] = !0, console.warn(
      a(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(s, o, l) : !0;
  };
};
it.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function as(e, t, r) {
  if (typeof e != "object")
    throw new T("options must be an object", T.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let a = n.length;
  for (; a-- > 0; ) {
    const s = n[a], o = t[s];
    if (o) {
      const l = e[s], d = l === void 0 || o(l, s, e);
      if (d !== !0)
        throw new T("option " + s + " must be " + d, T.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new T("Unknown option " + s, T.ERR_BAD_OPTION);
  }
}
const Xe = {
  assertOptions: as,
  validators: it
}, he = Xe.validators;
let Se = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Gt(),
      response: new Gt()
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
        const s = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? s && !String(n.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + s) : n.stack = s;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Te(this.defaults, r);
    const { transitional: n, paramsSerializer: a, headers: s } = r;
    n !== void 0 && Xe.assertOptions(n, {
      silentJSONParsing: he.transitional(he.boolean),
      forcedJSONParsing: he.transitional(he.boolean),
      clarifyTimeoutError: he.transitional(he.boolean)
    }, !1), a != null && (b.isFunction(a) ? r.paramsSerializer = {
      serialize: a
    } : Xe.assertOptions(a, {
      encode: he.function,
      serialize: he.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), Xe.assertOptions(r, {
      baseUrl: he.spelling("baseURL"),
      withXsrfToken: he.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let o = s && b.merge(
      s.common,
      s[r.method]
    );
    s && b.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete s[m];
      }
    ), r.headers = se.concat(o, s);
    const l = [];
    let d = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(r) === !1 || (d = d && y.synchronous, l.unshift(y.fulfilled, y.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(y) {
      c.push(y.fulfilled, y.rejected);
    });
    let u, f = 0, g;
    if (!d) {
      const m = [ir.bind(this), void 0];
      for (m.unshift(...l), m.push(...c), g = m.length, u = Promise.resolve(r); f < g; )
        u = u.then(m[f++], m[f++]);
      return u;
    }
    g = l.length;
    let v = r;
    for (; f < g; ) {
      const m = l[f++], y = l[f++];
      try {
        v = m(v);
      } catch (p) {
        y.call(this, p);
        break;
      }
    }
    try {
      u = ir.call(this, v);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, g = c.length; f < g; )
      u = u.then(c[f++], c[f++]);
    return u;
  }
  getUri(t) {
    t = Te(this.defaults, t);
    const r = Ur(t.baseURL, t.url, t.allowAbsoluteUrls);
    return $r(r, t.params, t.paramsSerializer);
  }
};
b.forEach(["delete", "get", "head", "options"], function(t) {
  Se.prototype[t] = function(r, n) {
    return this.request(Te(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
b.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(s, o, l) {
      return this.request(Te(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: o
      }));
    };
  }
  Se.prototype[t] = r(), Se.prototype[t + "Form"] = r(!0);
});
let ss = class Wr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(s) {
      r = s;
    });
    const n = this;
    this.promise.then((a) => {
      if (!n._listeners) return;
      let s = n._listeners.length;
      for (; s-- > 0; )
        n._listeners[s](a);
      n._listeners = null;
    }), this.promise.then = (a) => {
      let s;
      const o = new Promise((l) => {
        n.subscribe(l), s = l;
      }).then(a);
      return o.cancel = function() {
        n.unsubscribe(s);
      }, o;
    }, t(function(s, o, l) {
      n.reason || (n.reason = new Me(s, o, l), r(n.reason));
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
      token: new Wr(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
};
function os(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function is(e) {
  return b.isObject(e) && e.isAxiosError === !0;
}
const Ct = {
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
Object.entries(Ct).forEach(([e, t]) => {
  Ct[t] = e;
});
function Vr(e) {
  const t = new Se(e), r = Nr(Se.prototype.request, t);
  return b.extend(r, Se.prototype, t, { allOwnKeys: !0 }), b.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(a) {
    return Vr(Te(e, a));
  }, r;
}
const q = Vr(qe);
q.Axios = Se;
q.CanceledError = Me;
q.CancelToken = ss;
q.isCancel = jr;
q.VERSION = Hr;
q.toFormData = ot;
q.AxiosError = T;
q.Cancel = q.CanceledError;
q.all = function(t) {
  return Promise.all(t);
};
q.spread = os;
q.isAxiosError = is;
q.mergeConfig = Te;
q.AxiosHeaders = se;
q.formToJSON = (e) => Dr(b.isHTMLForm(e) ? new FormData(e) : e);
q.getAdapter = qr.getAdapter;
q.HttpStatusCode = Ct;
q.default = q;
const {
  Axios: Bo,
  AxiosError: _o,
  CanceledError: qo,
  isCancel: Ho,
  CancelToken: Wo,
  VERSION: Vo,
  all: Jo,
  Cancel: Ko,
  isAxiosError: Qo,
  spread: Go,
  toFormData: Xo,
  AxiosHeaders: Yo,
  HttpStatusCode: Zo,
  formToJSON: ei,
  getAdapter: ti,
  mergeConfig: ri
} = q;
class ls {
  baseUrl;
  client;
  constructor(t, r) {
    if (!t || !r)
      throw new Error("baseUrl and apiKey are required");
    this.baseUrl = t.endsWith("/") ? t.slice(0, -1) : t, this.client = q.create({
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
      )).data.find((s) => s.name === t);
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
        n.map(async (s) => {
          if (s.status === "connected")
            try {
              const [o, l, d] = await Promise.all([
                this.getContactsCount(s.name),
                this.getChatsCount(s.name),
                this.getInstanceProfile(s.name)
              ]), c = {};
              return d.data && (c.ownerJid = d.data.wuid || d.data.id, c.profileName = d.data.name || d.data.pushName, c.profilePicUrl = d.data.profilePicUrl), {
                ...s,
                contactsCount: o,
                chatsCount: l,
                ...c
              };
            } catch (o) {
              return console.warn(
                `Failed to get stats for ${s.name}:`,
                o
              ), s;
            }
          return s;
        })
      ) : n;
    } catch (r) {
      throw new Error(`Failed to list instances: ${r.message}`);
    }
  }
  /**
   * Fetch a single instance by name with full details
   */
  async fetchSingleInstance(t) {
    try {
      const r = await this.client.get(
        `/instance/fetchInstances?instanceName=${t}`
      ), n = Array.isArray(r.data) ? r.data : [r.data];
      if (n.length === 0)
        return null;
      const a = n[0];
      if (a.status === "connected" || a.connectionState === "open")
        try {
          const [s, o, l, d] = await Promise.all([
            this.getContactsCount(t),
            this.getChatsCount(t),
            this.getInstanceProfile(t),
            this.getMessagesCount(t)
          ]), c = {};
          return l.data && (c.ownerJid = l.data.wuid || l.data.id, c.profileName = l.data.name || l.data.pushName, c.profilePicUrl = l.data.profilePicUrl), {
            ...a,
            contactsCount: s,
            chatsCount: o,
            messagesCount: d,
            ...c
          };
        } catch (s) {
          return console.warn(`Failed to get full stats for ${t}:`, s), a;
        }
      return a;
    } catch (r) {
      throw new Error(`Failed to fetch instance: ${r.message}`);
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
   * Get messages count for an instance (all chats)
   */
  async getMessagesCount(t) {
    try {
      const r = await this.client.get(`/chat/findChats/${t}`);
      return Array.isArray(r.data) ? r.data.reduce((n, a) => n + (a.messagesCount || 0), 0) : 0;
    } catch (r) {
      return console.warn(
        `Failed to get messages count for ${t}:`,
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
   * Get instance connection status with device info
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
   * Get instance profile information (device info)
   */
  async getInstanceProfile(t) {
    try {
      return (await this.client.get(
        `/chat/whatsappProfile/${t}`
      )).data;
    } catch (r) {
      return console.warn(
        `Failed to get instance profile for ${t}:`,
        r.message
      ), { status: "error", message: r.message };
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
  async sendMedia(t, r, n, a = "image", s = "") {
    try {
      const o = `/message/sendMedia/${t}`, l = {
        number: r,
        mediatype: a,
        media: n
      };
      return s && (l.caption = s), (await this.client.post(
        o,
        l
      )).data;
    } catch (o) {
      throw new Error(`Failed to send media: ${o.message}`);
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
      const s = {
        remoteJid: r,
        fromMe: n,
        id: a
      };
      return (await this.client.post(
        `/chat/markMessageAsRead/${t}`,
        s
      )).data;
    } catch (s) {
      throw new Error(`Failed to mark as read: ${s.message}`);
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
const Jr = (e) => {
  const [t, r] = A(null), [n, a] = A([]), [s, o] = A([]), [l, d] = A([]), [c, u] = A([]), [f, g] = A(!1), [v, m] = A(null);
  ve(() => {
    if (e.baseUrl && e.apiKey)
      try {
        const R = new ls(
          e.baseUrl,
          e.apiKey
        );
        r(R), m(null);
      } catch (R) {
        m(R.message);
      }
  }, [e.baseUrl, e.apiKey]);
  const y = H((R) => {
    m(R.message || "An error occurred"), g(!1);
  }, []), p = H(() => {
    m(null);
  }, []), k = H(
    async (R, C) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        g(!0), m(null);
        const _ = await t.createInstance(R, C);
        return await W(), _;
      } catch (_) {
        throw y(_), _;
      } finally {
        g(!1);
      }
    },
    [t]
  ), N = H(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        g(!0), m(null);
        const C = await t.deleteInstance(R);
        return await W(), C;
      } catch (C) {
        throw y(C), C;
      } finally {
        g(!1);
      }
    },
    [t]
  ), E = H(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return g(!0), m(null), await t.connectInstance(R);
      } catch (C) {
        throw y(C), C;
      } finally {
        g(!1);
      }
    },
    [t, y]
  ), L = H(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        g(!0), m(null);
        const C = await t.disconnectInstance(R);
        return await W(), C;
      } catch (C) {
        throw y(C), C;
      } finally {
        g(!1);
      }
    },
    [t]
  ), S = H(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(null), await t.getInstanceStatus(R);
      } catch (C) {
        throw y(C), C;
      }
    },
    [t]
  ), w = H(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(null), await t.fetchSingleInstance(R);
      } catch (C) {
        throw y(C), C;
      }
    },
    [t, y]
  ), O = H(
    async (R, C, _) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return g(!0), m(null), await t.sendMessage(R, C, _);
      } catch ($) {
        throw y($), $;
      } finally {
        g(!1);
      }
    },
    [t]
  ), U = H(
    async (R, C, _, $ = "image", ie = "") => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return g(!0), m(null), await t.sendMedia(
          R,
          C,
          _,
          $,
          ie
        );
      } catch (X) {
        throw y(X), X;
      } finally {
        g(!1);
      }
    },
    [t]
  ), D = H(
    async (R, C, _ = 50) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(null), await t.getChatMessages(
          R,
          C,
          _
        );
      } catch ($) {
        throw y($), $;
      }
    },
    [t]
  ), j = H(
    async (R, C, _, $) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(null), await t.markAsRead(
          R,
          C,
          _,
          $
        );
      } catch (ie) {
        throw y(ie), ie;
      }
    },
    [t]
  ), W = H(async () => {
    if (t)
      try {
        g(!0), m(null);
        const R = await t.listInstances(!0);
        a(R);
      } catch (R) {
        y(R);
      } finally {
        g(!1);
      }
  }, [t, y]), oe = H(
    async (R) => {
      if (t)
        try {
          g(!0), m(null);
          const C = await t.getContacts(R);
          d(C);
        } catch (C) {
          y(C);
        } finally {
          g(!1);
        }
    },
    [t]
  ), ee = H(
    async (R) => {
      if (t)
        try {
          g(!0), m(null);
          const C = await t.getChats(R);
          u(C);
        } catch (C) {
          y(C);
        } finally {
          g(!1);
        }
    },
    [t]
  ), te = H(
    async (R, C, _ = 50) => {
      if (t)
        try {
          g(!0), m(null);
          const $ = await t.getChatMessages(
            R,
            C,
            _
          );
          o($);
        } catch ($) {
          y($);
        } finally {
          g(!1);
        }
    },
    [t]
  );
  return ve(() => {
    t && W();
  }, [t, W]), {
    manager: t,
    instances: n,
    messages: s,
    contacts: l,
    chats: c,
    loading: f,
    error: v,
    // Instance methods
    createInstance: k,
    deleteInstance: N,
    connectInstance: E,
    disconnectInstance: L,
    getInstanceStatus: S,
    fetchSingleInstance: w,
    // Message methods
    sendMessage: O,
    sendMedia: U,
    getChatMessages: D,
    markAsRead: j,
    // Data fetching methods
    refreshInstances: W,
    refreshContacts: oe,
    refreshChats: ee,
    refreshMessages: te,
    // Utility methods
    clearError: p,
    setLoading: g
  };
}, It = () => {
  const e = An(kr);
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
function K(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function pe(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Et({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Ot(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substring(n), e = e.substring(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Kr(e, t, r = "/") {
  return cs(e, t, r, !1);
}
function cs(e, t, r, n) {
  let a = typeof t == "string" ? Ot(t) : t, s = ke(a.pathname || "/", r);
  if (s == null)
    return null;
  let o = Qr(e);
  ds(o);
  let l = null;
  for (let d = 0; l == null && d < o.length; ++d) {
    let c = vs(s);
    l = xs(
      o[d],
      c,
      n
    );
  }
  return l;
}
function Qr(e, t = [], r = [], n = "", a = !1) {
  let s = (o, l, d = a, c) => {
    let u = {
      relativePath: c === void 0 ? o.path || "" : c,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: l,
      route: o
    };
    if (u.relativePath.startsWith("/")) {
      if (!u.relativePath.startsWith(n) && d)
        return;
      K(
        u.relativePath.startsWith(n),
        `Absolute route path "${u.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), u.relativePath = u.relativePath.slice(n.length);
    }
    let f = ge([n, u.relativePath]), g = r.concat(u);
    o.children && o.children.length > 0 && (K(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      o.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${f}".`
    ), Qr(
      o.children,
      t,
      g,
      f,
      d
    )), !(o.path == null && !o.index) && t.push({
      path: f,
      score: ys(f, o.index),
      routesMeta: g
    });
  };
  return e.forEach((o, l) => {
    if (o.path === "" || !o.path?.includes("?"))
      s(o, l);
    else
      for (let d of Gr(o.path))
        s(o, l, !0, d);
  }), t;
}
function Gr(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), s = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [s, ""] : [s];
  let o = Gr(n.join("/")), l = [];
  return l.push(
    ...o.map(
      (d) => d === "" ? s : [s, d].join("/")
    )
  ), a && l.push(...o), l.map(
    (d) => e.startsWith("/") && d === "" ? "/" : d
  );
}
function ds(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : bs(
      t.routesMeta.map((n) => n.childrenIndex),
      r.routesMeta.map((n) => n.childrenIndex)
    )
  );
}
var us = /^:[\w-]+$/, hs = 3, ms = 2, fs = 1, gs = 10, ps = -2, cr = (e) => e === "*";
function ys(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(cr) && (n += ps), t && (n += ms), r.filter((a) => !cr(a)).reduce(
    (a, s) => a + (us.test(s) ? hs : s === "" ? fs : gs),
    n
  );
}
function bs(e, t) {
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
function xs(e, t, r = !1) {
  let { routesMeta: n } = e, a = {}, s = "/", o = [];
  for (let l = 0; l < n.length; ++l) {
    let d = n[l], c = l === n.length - 1, u = s === "/" ? t : t.slice(s.length) || "/", f = rt(
      { path: d.relativePath, caseSensitive: d.caseSensitive, end: c },
      u
    ), g = d.route;
    if (!f && c && r && !n[n.length - 1].route.index && (f = rt(
      {
        path: d.relativePath,
        caseSensitive: d.caseSensitive,
        end: !1
      },
      u
    )), !f)
      return null;
    Object.assign(a, f.params), o.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: ge([s, f.pathname]),
      pathnameBase: Es(
        ge([s, f.pathnameBase])
      ),
      route: g
    }), f.pathnameBase !== "/" && (s = ge([s, f.pathnameBase]));
  }
  return o;
}
function rt(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = ws(
    e.path,
    e.caseSensitive,
    e.end
  ), a = t.match(r);
  if (!a) return null;
  let s = a[0], o = s.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: n.reduce(
      (c, { paramName: u, isOptional: f }, g) => {
        if (u === "*") {
          let m = l[g] || "";
          o = s.slice(0, s.length - m.length).replace(/(.)\/+$/, "$1");
        }
        const v = l[g];
        return f && !v ? c[u] = void 0 : c[u] = (v || "").replace(/%2F/g, "/"), c;
      },
      {}
    ),
    pathname: s,
    pathnameBase: o,
    pattern: e
  };
}
function ws(e, t = !1, r = !0) {
  pe(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (o, l, d) => (n.push({ paramName: l, isOptional: d != null }), d ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (n.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function vs(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return pe(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function ke(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function ks(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? Ot(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Ns(r, t) : t,
    search: Ss(n),
    hash: Rs(a)
  };
}
function Ns(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function pt(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Cs(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function Xr(e) {
  let t = Cs(e);
  return t.map(
    (r, n) => n === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Yr(e, t, r, n = !1) {
  let a;
  typeof e == "string" ? a = Ot(e) : (a = { ...e }, K(
    !a.pathname || !a.pathname.includes("?"),
    pt("?", "pathname", "search", a)
  ), K(
    !a.pathname || !a.pathname.includes("#"),
    pt("#", "pathname", "hash", a)
  ), K(
    !a.search || !a.search.includes("#"),
    pt("#", "search", "hash", a)
  ));
  let s = e === "" || a.pathname === "", o = s ? "/" : a.pathname, l;
  if (o == null)
    l = r;
  else {
    let f = t.length - 1;
    if (!n && o.startsWith("..")) {
      let g = o.split("/");
      for (; g[0] === ".."; )
        g.shift(), f -= 1;
      a.pathname = g.join("/");
    }
    l = f >= 0 ? t[f] : "/";
  }
  let d = ks(a, l), c = o && o !== "/" && o.endsWith("/"), u = (s || o === ".") && r.endsWith("/");
  return !d.pathname.endsWith("/") && (c || u) && (d.pathname += "/"), d;
}
var ge = (e) => e.join("/").replace(/\/\/+/g, "/"), Es = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Ss = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Rs = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function Ts(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var Zr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  Zr
);
var Ps = [
  "GET",
  ...Zr
];
new Set(Ps);
var Le = x.createContext(null);
Le.displayName = "DataRouter";
var lt = x.createContext(null);
lt.displayName = "DataRouterState";
x.createContext(!1);
var en = x.createContext({
  isTransitioning: !1
});
en.displayName = "ViewTransition";
var As = x.createContext(
  /* @__PURE__ */ new Map()
);
As.displayName = "Fetchers";
var Is = x.createContext(null);
Is.displayName = "Await";
var ye = x.createContext(
  null
);
ye.displayName = "Navigation";
var Mt = x.createContext(
  null
);
Mt.displayName = "Location";
var be = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
be.displayName = "Route";
var Lt = x.createContext(null);
Lt.displayName = "RouteError";
function Os(e, { relative: t } = {}) {
  K(
    ct(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = x.useContext(ye), { hash: a, pathname: s, search: o } = He(e, { relative: t }), l = s;
  return r !== "/" && (l = s === "/" ? r : ge([r, s])), n.createHref({ pathname: l, search: o, hash: a });
}
function ct() {
  return x.useContext(Mt) != null;
}
function Pe() {
  return K(
    ct(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(Mt).location;
}
var tn = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function rn(e) {
  x.useContext(ye).static || x.useLayoutEffect(e);
}
function Ms() {
  let { isDataRoute: e } = x.useContext(be);
  return e ? Vs() : Ls();
}
function Ls() {
  K(
    ct(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = x.useContext(Le), { basename: t, navigator: r } = x.useContext(ye), { matches: n } = x.useContext(be), { pathname: a } = Pe(), s = JSON.stringify(Xr(n)), o = x.useRef(!1);
  return rn(() => {
    o.current = !0;
  }), x.useCallback(
    (d, c = {}) => {
      if (pe(o.current, tn), !o.current) return;
      if (typeof d == "number") {
        r.go(d);
        return;
      }
      let u = Yr(
        d,
        JSON.parse(s),
        a,
        c.relative === "path"
      );
      e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : ge([t, u.pathname])), (c.replace ? r.replace : r.push)(
        u,
        c.state,
        c
      );
    },
    [
      t,
      r,
      s,
      a,
      e
    ]
  );
}
x.createContext(null);
function He(e, { relative: t } = {}) {
  let { matches: r } = x.useContext(be), { pathname: n } = Pe(), a = JSON.stringify(Xr(r));
  return x.useMemo(
    () => Yr(
      e,
      JSON.parse(a),
      n,
      t === "path"
    ),
    [e, a, n, t]
  );
}
function $s(e, t, r, n, a) {
  K(
    ct(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(ye), { matches: o } = x.useContext(be), l = o[o.length - 1], d = l ? l.params : {}, c = l ? l.pathname : "/", u = l ? l.pathnameBase : "/", f = l && l.route;
  {
    let N = f && f.path || "";
    nn(
      c,
      !f || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let g = Pe(), v;
  v = g;
  let m = v.pathname || "/", y = m;
  if (u !== "/") {
    let N = u.replace(/^\//, "").split("/");
    y = "/" + m.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let p = Kr(e, { pathname: y });
  return pe(
    f || p != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), pe(
    p == null || p[p.length - 1].route.element !== void 0 || p[p.length - 1].route.Component !== void 0 || p[p.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Us(
    p && p.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, d, N.params),
        pathname: ge([
          u,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            N.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? u : ge([
          u,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            N.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    o,
    r,
    n,
    a
  );
}
function Fs() {
  let e = Ws(), t = Ts(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: n }, s = { padding: "2px 4px", backgroundColor: n }, o = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), o = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: s }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: s }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ x.createElement("pre", { style: a }, r) : null, o);
}
var Ds = /* @__PURE__ */ x.createElement(Fs, null), js = class extends x.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ x.createElement(be.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      Lt.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function zs({ routeContext: e, match: t, children: r }) {
  let n = x.useContext(Le);
  return n && n.static && n.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (n.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ x.createElement(be.Provider, { value: e }, r);
}
function Us(e, t = [], r = null, n = null, a = null) {
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
  let s = e, o = r?.errors;
  if (o != null) {
    let c = s.findIndex(
      (u) => u.route.id && o?.[u.route.id] !== void 0
    );
    K(
      c >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        o
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, c + 1)
    );
  }
  let l = !1, d = -1;
  if (r)
    for (let c = 0; c < s.length; c++) {
      let u = s[c];
      if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (d = c), u.route.id) {
        let { loaderData: f, errors: g } = r, v = u.route.loader && !f.hasOwnProperty(u.route.id) && (!g || g[u.route.id] === void 0);
        if (u.route.lazy || v) {
          l = !0, d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  return s.reduceRight(
    (c, u, f) => {
      let g, v = !1, m = null, y = null;
      r && (g = o && u.route.id ? o[u.route.id] : void 0, m = u.route.errorElement || Ds, l && (d < 0 && f === 0 ? (nn(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), v = !0, y = null) : d === f && (v = !0, y = u.route.hydrateFallbackElement || null)));
      let p = t.concat(s.slice(0, f + 1)), k = () => {
        let N;
        return g ? N = m : v ? N = y : u.route.Component ? N = /* @__PURE__ */ x.createElement(u.route.Component, null) : u.route.element ? N = u.route.element : N = c, /* @__PURE__ */ x.createElement(
          zs,
          {
            match: u,
            routeContext: {
              outlet: c,
              matches: p,
              isDataRoute: r != null
            },
            children: N
          }
        );
      };
      return r && (u.route.ErrorBoundary || u.route.errorElement || f === 0) ? /* @__PURE__ */ x.createElement(
        js,
        {
          location: r.location,
          revalidation: r.revalidation,
          component: m,
          error: g,
          children: k(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
          unstable_onError: n
        }
      ) : k();
    },
    null
  );
}
function $t(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bs(e) {
  let t = x.useContext(Le);
  return K(t, $t(e)), t;
}
function _s(e) {
  let t = x.useContext(lt);
  return K(t, $t(e)), t;
}
function qs(e) {
  let t = x.useContext(be);
  return K(t, $t(e)), t;
}
function Ft(e) {
  let t = qs(e), r = t.matches[t.matches.length - 1];
  return K(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Hs() {
  return Ft(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ws() {
  let e = x.useContext(Lt), t = _s(
    "useRouteError"
    /* UseRouteError */
  ), r = Ft(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : t.errors?.[r];
}
function Vs() {
  let { router: e } = Bs(
    "useNavigate"
    /* UseNavigateStable */
  ), t = Ft(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return rn(() => {
    r.current = !0;
  }), x.useCallback(
    async (a, s = {}) => {
      pe(r.current, tn), r.current && (typeof a == "number" ? e.navigate(a) : await e.navigate(a, { fromRouteId: t, ...s }));
    },
    [e, t]
  );
}
var dr = {};
function nn(e, t, r) {
  !t && !dr[e] && (dr[e] = !0, pe(!1, r));
}
x.memo(Js);
function Js({
  routes: e,
  future: t,
  state: r,
  unstable_onError: n
}) {
  return $s(e, void 0, r, n, t);
}
var Ye = "get", Ze = "application/x-www-form-urlencoded";
function dt(e) {
  return e != null && typeof e.tagName == "string";
}
function Ks(e) {
  return dt(e) && e.tagName.toLowerCase() === "button";
}
function Qs(e) {
  return dt(e) && e.tagName.toLowerCase() === "form";
}
function Gs(e) {
  return dt(e) && e.tagName.toLowerCase() === "input";
}
function Xs(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ys(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Xs(e);
}
var Ke = null;
function Zs() {
  if (Ke === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ke = !1;
    } catch {
      Ke = !0;
    }
  return Ke;
}
var eo = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yt(e) {
  return e != null && !eo.has(e) ? (pe(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ze}"`
  ), null) : e;
}
function to(e, t) {
  let r, n, a, s, o;
  if (Qs(e)) {
    let l = e.getAttribute("action");
    n = l ? ke(l, t) : null, r = e.getAttribute("method") || Ye, a = yt(e.getAttribute("enctype")) || Ze, s = new FormData(e);
  } else if (Ks(e) || Gs(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let d = e.getAttribute("formaction") || l.getAttribute("action");
    if (n = d ? ke(d, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || Ye, a = yt(e.getAttribute("formenctype")) || yt(l.getAttribute("enctype")) || Ze, s = new FormData(l, e), !Zs()) {
      let { name: c, type: u, value: f } = e;
      if (u === "image") {
        let g = c ? `${c}.` : "";
        s.append(`${g}x`, "0"), s.append(`${g}y`, "0");
      } else c && s.append(c, f);
    }
  } else {
    if (dt(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Ye, n = null, a = Ze, o = e;
  }
  return s && a === "text/plain" && (o = s, s = void 0), { action: n, method: r.toLowerCase(), encType: a, formData: s, body: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Dt(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ro(e, t, r) {
  let n = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return n.pathname === "/" ? n.pathname = `_root.${r}` : t && ke(n.pathname, t) === "/" ? n.pathname = `${t.replace(/\/$/, "")}/_root.${r}` : n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`, n;
}
async function no(e, t) {
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
function ao(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function so(e, t, r) {
  let n = await Promise.all(
    e.map(async (a) => {
      let s = t.routes[a.route.id];
      if (s) {
        let o = await no(s, r);
        return o.links ? o.links() : [];
      }
      return [];
    })
  );
  return co(
    n.flat(1).filter(ao).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function ur(e, t, r, n, a, s) {
  let o = (d, c) => r[c] ? d.route.id !== r[c].route.id : !0, l = (d, c) => (
    // param change, /users/123 -> /users/456
    r[c].pathname !== d.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[c].route.path?.endsWith("*") && r[c].params["*"] !== d.params["*"]
  );
  return s === "assets" ? t.filter(
    (d, c) => o(d, c) || l(d, c)
  ) : s === "data" ? t.filter((d, c) => {
    let u = n.routes[d.route.id];
    if (!u || !u.hasLoader)
      return !1;
    if (o(d, c) || l(d, c))
      return !0;
    if (d.route.shouldRevalidate) {
      let f = d.route.shouldRevalidate({
        currentUrl: new URL(
          a.pathname + a.search + a.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: d.params,
        defaultShouldRevalidate: !0
      });
      if (typeof f == "boolean")
        return f;
    }
    return !0;
  }) : [];
}
function oo(e, t, { includeHydrateFallback: r } = {}) {
  return io(
    e.map((n) => {
      let a = t.routes[n.route.id];
      if (!a) return [];
      let s = [a.module];
      return a.clientActionModule && (s = s.concat(a.clientActionModule)), a.clientLoaderModule && (s = s.concat(a.clientLoaderModule)), r && a.hydrateFallbackModule && (s = s.concat(a.hydrateFallbackModule)), a.imports && (s = s.concat(a.imports)), s;
    }).flat(1)
  );
}
function io(e) {
  return [...new Set(e)];
}
function lo(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let n of r)
    t[n] = e[n];
  return t;
}
function co(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((n, a) => {
    let s = JSON.stringify(lo(a));
    return r.has(s) || (r.add(s), n.push({ key: s, link: a })), n;
  }, []);
}
function an() {
  let e = x.useContext(Le);
  return Dt(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function uo() {
  let e = x.useContext(lt);
  return Dt(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var jt = x.createContext(void 0);
jt.displayName = "FrameworkContext";
function sn() {
  let e = x.useContext(jt);
  return Dt(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function ho(e, t) {
  let r = x.useContext(jt), [n, a] = x.useState(!1), [s, o] = x.useState(!1), { onFocus: l, onBlur: d, onMouseEnter: c, onMouseLeave: u, onTouchStart: f } = t, g = x.useRef(null);
  x.useEffect(() => {
    if (e === "render" && o(!0), e === "viewport") {
      let y = (k) => {
        k.forEach((N) => {
          o(N.isIntersecting);
        });
      }, p = new IntersectionObserver(y, { threshold: 0.5 });
      return g.current && p.observe(g.current), () => {
        p.disconnect();
      };
    }
  }, [e]), x.useEffect(() => {
    if (n) {
      let y = setTimeout(() => {
        o(!0);
      }, 100);
      return () => {
        clearTimeout(y);
      };
    }
  }, [n]);
  let v = () => {
    a(!0);
  }, m = () => {
    a(!1), o(!1);
  };
  return r ? e !== "intent" ? [s, g, {}] : [
    s,
    g,
    {
      onFocus: De(l, v),
      onBlur: De(d, m),
      onMouseEnter: De(c, v),
      onMouseLeave: De(u, m),
      onTouchStart: De(f, v)
    }
  ] : [!1, g, {}];
}
function De(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function mo({ page: e, ...t }) {
  let { router: r } = an(), n = x.useMemo(
    () => Kr(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return n ? /* @__PURE__ */ x.createElement(go, { page: e, matches: n, ...t }) : null;
}
function fo(e) {
  let { manifest: t, routeModules: r } = sn(), [n, a] = x.useState([]);
  return x.useEffect(() => {
    let s = !1;
    return so(e, t, r).then(
      (o) => {
        s || a(o);
      }
    ), () => {
      s = !0;
    };
  }, [e, t, r]), n;
}
function go({
  page: e,
  matches: t,
  ...r
}) {
  let n = Pe(), { manifest: a, routeModules: s } = sn(), { basename: o } = an(), { loaderData: l, matches: d } = uo(), c = x.useMemo(
    () => ur(
      e,
      t,
      d,
      a,
      n,
      "data"
    ),
    [e, t, d, a, n]
  ), u = x.useMemo(
    () => ur(
      e,
      t,
      d,
      a,
      n,
      "assets"
    ),
    [e, t, d, a, n]
  ), f = x.useMemo(() => {
    if (e === n.pathname + n.search + n.hash)
      return [];
    let m = /* @__PURE__ */ new Set(), y = !1;
    if (t.forEach((k) => {
      let N = a.routes[k.route.id];
      !N || !N.hasLoader || (!c.some((E) => E.route.id === k.route.id) && k.route.id in l && s[k.route.id]?.shouldRevalidate || N.hasClientLoader ? y = !0 : m.add(k.route.id));
    }), m.size === 0)
      return [];
    let p = ro(e, o, "data");
    return y && m.size > 0 && p.searchParams.set(
      "_routes",
      t.filter((k) => m.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [p.pathname + p.search];
  }, [
    o,
    l,
    n,
    a,
    c,
    t,
    e,
    s
  ]), g = x.useMemo(
    () => oo(u, a),
    [u, a]
  ), v = fo(u);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, f.map((m) => /* @__PURE__ */ x.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...r })), g.map((m) => /* @__PURE__ */ x.createElement("link", { key: m, rel: "modulepreload", href: m, ...r })), v.map(({ key: m, link: y }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement("link", { key: m, nonce: r.nonce, ...y })
  )));
}
function po(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var on = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  on && (window.__reactRouterVersion = // @ts-expect-error
  "7.9.3");
} catch {
}
var ln = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zt = x.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: n = "none",
    relative: a,
    reloadDocument: s,
    replace: o,
    state: l,
    target: d,
    to: c,
    preventScrollReset: u,
    viewTransition: f,
    ...g
  }, v) {
    let { basename: m } = x.useContext(ye), y = typeof c == "string" && ln.test(c), p, k = !1;
    if (typeof c == "string" && y && (p = c, on))
      try {
        let D = new URL(window.location.href), j = c.startsWith("//") ? new URL(D.protocol + c) : new URL(c), W = ke(j.pathname, m);
        j.origin === D.origin && W != null ? c = W + j.search + j.hash : k = !0;
      } catch {
        pe(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let N = Os(c, { relative: a }), [E, L, S] = ho(
      n,
      g
    ), w = wo(c, {
      replace: o,
      state: l,
      target: d,
      preventScrollReset: u,
      relative: a,
      viewTransition: f
    });
    function O(D) {
      t && t(D), D.defaultPrevented || w(D);
    }
    let U = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...g,
          ...S,
          href: p || N,
          onClick: k || s ? t : O,
          ref: po(v, L),
          target: d,
          "data-discover": !y && r === "render" ? "true" : void 0
        }
      )
    );
    return E && !y ? /* @__PURE__ */ x.createElement(x.Fragment, null, U, /* @__PURE__ */ x.createElement(mo, { page: N })) : U;
  }
);
zt.displayName = "Link";
var yo = x.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: a = !1,
    style: s,
    to: o,
    viewTransition: l,
    children: d,
    ...c
  }, u) {
    let f = He(o, { relative: c.relative }), g = Pe(), v = x.useContext(lt), { navigator: m, basename: y } = x.useContext(ye), p = v != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Eo(f) && l === !0, k = m.encodeLocation ? m.encodeLocation(f).pathname : f.pathname, N = g.pathname, E = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null;
    r || (N = N.toLowerCase(), E = E ? E.toLowerCase() : null, k = k.toLowerCase()), E && y && (E = ke(E, y) || E);
    const L = k !== "/" && k.endsWith("/") ? k.length - 1 : k.length;
    let S = N === k || !a && N.startsWith(k) && N.charAt(L) === "/", w = E != null && (E === k || !a && E.startsWith(k) && E.charAt(k.length) === "/"), O = {
      isActive: S,
      isPending: w,
      isTransitioning: p
    }, U = S ? t : void 0, D;
    typeof n == "function" ? D = n(O) : D = [
      n,
      S ? "active" : null,
      w ? "pending" : null,
      p ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let j = typeof s == "function" ? s(O) : s;
    return /* @__PURE__ */ x.createElement(
      zt,
      {
        ...c,
        "aria-current": U,
        className: D,
        ref: u,
        style: j,
        to: o,
        viewTransition: l
      },
      typeof d == "function" ? d(O) : d
    );
  }
);
yo.displayName = "NavLink";
var bo = x.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: n,
    replace: a,
    state: s,
    method: o = Ye,
    action: l,
    onSubmit: d,
    relative: c,
    preventScrollReset: u,
    viewTransition: f,
    ...g
  }, v) => {
    let m = No(), y = Co(l, { relative: c }), p = o.toLowerCase() === "get" ? "get" : "post", k = typeof l == "string" && ln.test(l), N = (E) => {
      if (d && d(E), E.defaultPrevented) return;
      E.preventDefault();
      let L = E.nativeEvent.submitter, S = L?.getAttribute("formmethod") || o;
      m(L || E.currentTarget, {
        fetcherKey: t,
        method: S,
        navigate: r,
        replace: a,
        state: s,
        relative: c,
        preventScrollReset: u,
        viewTransition: f
      });
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: v,
        method: p,
        action: y,
        onSubmit: n ? d : N,
        ...g,
        "data-discover": !k && e === "render" ? "true" : void 0
      }
    );
  }
);
bo.displayName = "Form";
function xo(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cn(e) {
  let t = x.useContext(Le);
  return K(t, xo(e)), t;
}
function wo(e, {
  target: t,
  replace: r,
  state: n,
  preventScrollReset: a,
  relative: s,
  viewTransition: o
} = {}) {
  let l = Ms(), d = Pe(), c = He(e, { relative: s });
  return x.useCallback(
    (u) => {
      if (Ys(u, t)) {
        u.preventDefault();
        let f = r !== void 0 ? r : Et(d) === Et(c);
        l(e, {
          replace: f,
          state: n,
          preventScrollReset: a,
          relative: s,
          viewTransition: o
        });
      }
    },
    [
      d,
      l,
      c,
      r,
      n,
      t,
      e,
      a,
      s,
      o
    ]
  );
}
var vo = 0, ko = () => `__${String(++vo)}__`;
function No() {
  let { router: e } = cn(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = x.useContext(ye), r = Hs();
  return x.useCallback(
    async (n, a = {}) => {
      let { action: s, method: o, encType: l, formData: d, body: c } = to(
        n,
        t
      );
      if (a.navigate === !1) {
        let u = a.fetcherKey || ko();
        await e.fetch(u, r, a.action || s, {
          preventScrollReset: a.preventScrollReset,
          formData: d,
          body: c,
          formMethod: a.method || o,
          formEncType: a.encType || l,
          flushSync: a.flushSync
        });
      } else
        await e.navigate(a.action || s, {
          preventScrollReset: a.preventScrollReset,
          formData: d,
          body: c,
          formMethod: a.method || o,
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
function Co(e, { relative: t } = {}) {
  let { basename: r } = x.useContext(ye), n = x.useContext(be);
  K(n, "useFormAction must be used inside a RouteContext");
  let [a] = n.matches.slice(-1), s = { ...He(e || ".", { relative: t }) }, o = Pe();
  if (e == null) {
    s.search = o.search;
    let l = new URLSearchParams(s.search), d = l.getAll("index");
    if (d.some((u) => u === "")) {
      l.delete("index"), d.filter((f) => f).forEach((f) => l.append("index", f));
      let u = l.toString();
      s.search = u ? `?${u}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (s.pathname = s.pathname === "/" ? r : ge([r, s.pathname])), Et(s);
}
function Eo(e, { relative: t } = {}) {
  let r = x.useContext(en);
  K(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = cn(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = He(e, { relative: t });
  if (!r.isTransitioning)
    return !1;
  let s = ke(r.currentLocation.pathname, n) || r.currentLocation.pathname, o = ke(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return rt(a.pathname, o) != null || rt(a.pathname, s) != null;
}
function dn(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = dn(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function z() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = dn(e)) && (n && (n += " "), n += t);
  return n;
}
const Z = ({
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
      className: z("border rounded-lg shadow-sm p-6", e),
      style: a,
      ...n,
      children: t
    }
  );
}, I = ({
  variant: e = "primary",
  size: t = "md",
  className: r,
  children: n,
  disabled: a,
  ...s
}) => {
  const o = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", l = {
    primary: "text-white focus:ring-2 focus:ring-offset-2",
    secondary: "focus:ring-2 focus:ring-offset-2",
    danger: "text-white focus:ring-2 focus:ring-offset-2",
    ghost: "focus:ring-2 focus:ring-offset-2"
  }, d = {
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
      className: z(o, l[e], d[t], r),
      style: c(),
      disabled: a,
      ...s,
      children: n
    }
  );
}, me = ({ size: e = "md", className: t }) => /* @__PURE__ */ i(
  "div",
  {
    className: z(
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
var So = {
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
const Ro = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), Q = (e, t) => {
  const r = In(
    ({ color: n = "currentColor", size: a = 24, strokeWidth: s = 2, absoluteStrokeWidth: o, className: l = "", children: d, ...c }, u) => Vt(
      "svg",
      {
        ref: u,
        ...So,
        width: a,
        height: a,
        stroke: n,
        strokeWidth: o ? Number(s) * 24 / Number(a) : s,
        className: ["lucide", `lucide-${Ro(e)}`, l].join(" "),
        ...c
      },
      [
        ...t.map(([f, g]) => Vt(f, g)),
        ...Array.isArray(d) ? d : [d]
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
const hr = Q("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mr = Q("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = Q("Download", [
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
const un = Q("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = Q("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const To = Q("Monitor", [
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
const gr = Q("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ut = Q("Palette", [
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
const hn = Q("Pause", [
  ["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }],
  ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const St = Q("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = Q("RefreshCw", [
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
const pr = Q("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mn = Q("Settings", [
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
const yr = Q("Smartphone", [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = Q("Sun", [
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
const fn = Q("Trash2", [
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
const Rt = Q("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]), Po = ({
  instance: e,
  onConnect: t,
  onDisconnect: r,
  onDelete: n,
  onSettings: a
}) => {
  const o = (() => {
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
  return /* @__PURE__ */ h(
    Z,
    {
      className: z(
        "transition-all duration-200",
        o.bg,
        o.border
      ),
      children: [
        /* @__PURE__ */ h("div", { className: "flex items-center justify-between p-4 pb-3", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ i("div", { className: z("w-3 h-3 rounded-full", o.badge) }),
            /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: e.name })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: o.text })
        ] }),
        /* @__PURE__ */ h("div", { className: "p-4 pt-0", children: [
          o.showQR && e.qrCode && /* @__PURE__ */ h("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
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
          o.showLoader && /* @__PURE__ */ h("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
            /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(me, { size: "md" }) }),
            /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: o.text })
          ] }),
          o.showStats && /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(Rt, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: e.contactsCount || 0 })
            ] }),
            /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(je, { className: "w-4 h-4 text-green-500" }),
                /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Chats" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: e.chatsCount || 0 })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4", children: [
            /* @__PURE__ */ h("div", { children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: "Integração:" }),
              " ",
              /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: e.integration || "WHATSAPP-BAILEYS" })
            ] }),
            e.connectionState && /* @__PURE__ */ h("div", { children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: "Estado:" }),
              " ",
              /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: e.connectionState })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-2", children: [
            e.status === "connected" ? /* @__PURE__ */ h(
              I,
              {
                onClick: () => r?.(e.name),
                size: "sm",
                variant: "secondary",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(hn, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Desconectar" })
                ]
              }
            ) : /* @__PURE__ */ h(
              I,
              {
                onClick: () => t?.(e.name),
                size: "sm",
                variant: "secondary",
                className: "flex items-center space-x-1",
                disabled: e.isGeneratingQR || e.isConnecting,
                children: [
                  /* @__PURE__ */ i(un, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Conectar" })
                ]
              }
            ),
            /* @__PURE__ */ i(zt, { to: `/controller/${e.name}`, children: /* @__PURE__ */ h(
              I,
              {
                size: "sm",
                variant: "ghost",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(To, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Controller" })
                ]
              }
            ) }),
            /* @__PURE__ */ h(
              I,
              {
                onClick: () => a?.(e.name),
                size: "sm",
                variant: "ghost",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(mn, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Config" })
                ]
              }
            ),
            /* @__PURE__ */ h(
              I,
              {
                onClick: () => n?.(e.name),
                size: "sm",
                variant: "danger",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(fn, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Excluir" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}, ze = ({
  isOpen: e,
  onClose: t,
  children: r,
  className: n
}) => e ? /* @__PURE__ */ i("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ h("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: [
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
      className: z(
        "relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",
        n
      ),
      children: /* @__PURE__ */ i("div", { className: "p-6", children: r })
    }
  )
] }) }) : null, Ie = ({
  label: e,
  helperText: t,
  error: r,
  className: n,
  ...a
}) => /* @__PURE__ */ h("div", { className: "w-full", children: [
  e && /* @__PURE__ */ i("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: e }),
  /* @__PURE__ */ i(
    "input",
    {
      className: z(
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
      className: z(
        "mt-1 text-xs",
        r ? "text-danger-500" : "text-gray-500 dark:text-gray-400"
      ),
      children: t
    }
  )
] }), gn = ({
  isOpen: e,
  onClose: t,
  onSubmit: r,
  defaultName: n = ""
}) => {
  const [a, s] = A(n), [o, l] = A(!1), [d, c] = A(null), u = (m) => {
    const y = m.trim();
    return y ? y.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : y.length > 50 ? "Nome deve ter no máximo 50 caracteres" : /^[a-zA-Z0-9_-]+$/.test(y) ? y.startsWith("-") || y.startsWith("_") || y.endsWith("-") || y.endsWith("_") ? "Nome não pode começar ou terminar com hífen ou underscore" : y.includes("--") || y.includes("__") || y.includes("-_") || y.includes("_-") ? "Não use hífens ou underscores consecutivos" : null : "Use apenas letras, números, hífens (-) e underscores (_)" : "Nome da instância é obrigatório";
  }, f = (m) => {
    const y = m.target.value;
    s(y);
    const p = u(y);
    c(p);
  }, g = async (m) => {
    m.preventDefault();
    const y = u(a);
    if (y) {
      c(y);
      return;
    }
    l(!0);
    try {
      await r(a.trim()), s(""), c(null), t();
    } catch (p) {
      console.error("Erro ao criar instância:", p);
    } finally {
      l(!1);
    }
  }, v = !d && a.trim().length >= 3;
  return /* @__PURE__ */ i(
    ze,
    {
      isOpen: e,
      onClose: t,
      className: "border-2 dark:border-gray-900 border-gray-300",
      children: /* @__PURE__ */ h("div", { className: "", children: [
        /* @__PURE__ */ i("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Nova Instância WhatsApp" }),
        /* @__PURE__ */ h("form", { onSubmit: g, className: "space-y-4", children: [
          /* @__PURE__ */ h("div", { children: [
            /* @__PURE__ */ i(
              Ie,
              {
                label: "Nome da Instância",
                placeholder: "ex: minha-instancia-01",
                value: a,
                onChange: f,
                helperText: d || "3-50 caracteres: letras, números, hífens (-) e underscores (_)",
                error: !!d,
                required: !0
              }
            ),
            /* @__PURE__ */ h("div", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400 text-right", children: [
              a.length,
              "/50 caracteres"
            ] }),
            /* @__PURE__ */ h("div", { className: "mt-2 text-xs text-gray-600 dark:text-gray-300", children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: "Exemplos válidos:" }),
              " ",
              /* @__PURE__ */ i("code", { className: "bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs", children: "minha-empresa" }),
              ",",
              " ",
              /* @__PURE__ */ i("code", { className: "bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs", children: "cliente_01" }),
              ",",
              " ",
              /* @__PURE__ */ i("code", { className: "bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs", children: "suporte-tech" })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "flex gap-3 justify-end pt-2", children: [
            /* @__PURE__ */ i(
              I,
              {
                type: "button",
                variant: "secondary",
                onClick: t,
                disabled: o,
                children: "Cancelar"
              }
            ),
            /* @__PURE__ */ i(
              I,
              {
                type: "submit",
                variant: "primary",
                disabled: !v || o,
                className: "min-w-[100px]",
                children: o ? /* @__PURE__ */ i(me, { size: "sm" }) : "Criar"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}, Ao = ({
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
    children: /* @__PURE__ */ h("div", { className: "text-center", children: [
      /* @__PURE__ */ i(me, { size: "lg", className: "mb-2" }),
      /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Gerando QR Code..." })
    ] })
  }
), Io = ({
  isOpen: e,
  onClose: t,
  instanceName: r,
  qrCode: n
}) => /* @__PURE__ */ i(ze, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(Z, { className: "max-w-md p-0 text-center", children: /* @__PURE__ */ h("div", { className: "p-6", children: [
  /* @__PURE__ */ h("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: [
    "Conectar: ",
    r
  ] }),
  /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-6", children: "Escaneie o QR Code com seu WhatsApp" }),
  /* @__PURE__ */ i("div", { className: "mb-6", children: /* @__PURE__ */ i(Ao, { qrCode: n }) }),
  /* @__PURE__ */ i(I, { variant: "secondary", onClick: t, children: "Fechar" })
] }) }) }), pn = ({
  isOpen: e,
  onClose: t,
  instanceName: r,
  settings: n,
  onSettingsChange: a,
  onSave: s
}) => {
  const o = (d, c) => {
    a({ ...n, [d]: c });
  };
  return /* @__PURE__ */ i(ze, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(Z, { className: "max-w-lg p-0", children: /* @__PURE__ */ h("div", { className: "p-6", children: [
    /* @__PURE__ */ h("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: [
      "Configurações: ",
      r
    ] }),
    /* @__PURE__ */ h("div", { className: "space-y-4", children: [
      [
        { key: "rejectCall", label: "Auto-rejeitar chamadas" },
        { key: "groupsIgnore", label: "Ignorar mensagens de grupo" },
        { key: "alwaysOnline", label: "Sempre mostrar como online" },
        { key: "readMessages", label: "Auto-ler mensagens" },
        { key: "readStatus", label: "Auto-ler atualizações de status" },
        { key: "syncFullHistory", label: "Sincronizar histórico completo" }
      ].map(({ key: d, label: c }) => /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: d,
            checked: n[d],
            onChange: (u) => o(
              d,
              u.target.checked
            ),
            className: "w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          }
        ),
        /* @__PURE__ */ i(
          "label",
          {
            htmlFor: d,
            className: "text-sm text-gray-700 dark:text-gray-300 cursor-pointer",
            children: c
          }
        )
      ] }, d)),
      n.rejectCall && /* @__PURE__ */ i("div", { className: "mt-4", children: /* @__PURE__ */ i(
        Ie,
        {
          label: "Mensagem ao rejeitar chamadas",
          value: n.msgCall,
          onChange: (d) => o("msgCall", d.target.value),
          placeholder: "Digite a mensagem..."
        }
      ) })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex gap-3 justify-end pt-6 border-t border-gray-200 dark:border-gray-600 mt-6", children: [
      /* @__PURE__ */ i(I, { variant: "secondary", onClick: t, children: "Cancelar" }),
      /* @__PURE__ */ i(I, { variant: "primary", onClick: s, children: "Salvar" })
    ] })
  ] }) }) });
}, Bt = ({
  checked: e,
  onCheckedChange: t,
  disabled: r = !1,
  className: n
}) => /* @__PURE__ */ i(
  "label",
  {
    className: z(
      "inline-flex items-center cursor-pointer",
      r && "cursor-not-allowed opacity-50",
      n
    ),
    children: /* @__PURE__ */ h("div", { className: "relative", children: [
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
      /* @__PURE__ */ h(
        "div",
        {
          className: z(
            "w-14 h-7 rounded-full transition-all duration-300 ease-in-out relative",
            e ? "bg-slate-700 dark:bg-slate-600" : "bg-amber-200 dark:bg-amber-300"
          ),
          children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: z(
                  "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center",
                  e ? "translate-x-7 left-0.5" : "translate-x-0 left-0.5"
                ),
                children: e ? /* @__PURE__ */ i(gr, { className: "w-3.5 h-3.5 text-slate-600", strokeWidth: 2.5 }) : /* @__PURE__ */ i(br, { className: "w-3.5 h-3.5 text-amber-500", strokeWidth: 2.5 })
              }
            ),
            /* @__PURE__ */ h("div", { className: "absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none", children: [
              /* @__PURE__ */ i(
                br,
                {
                  className: z(
                    "w-3 h-3 transition-opacity duration-300",
                    e ? "opacity-0" : "opacity-30 text-amber-600"
                  )
                }
              ),
              /* @__PURE__ */ i(
                gr,
                {
                  className: z(
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
), xr = {
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
}, wr = {
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
}, yn = ({
  isOpen: e,
  onClose: t
}) => {
  const {
    theme: r,
    setCustomTheme: n,
    resetToDefaultTheme: a,
    isCustomTheme: s
  } = It(), [o, l] = A(r), [d, c] = A(!1), [u, f] = A(!1);
  ve(() => {
    if (e) {
      const S = {
        ...r,
        colors: {
          ...r.colors,
          // Garante que todas as propriedades existem
          text: r.colors.text || r.colors.foreground
        }
      };
      console.log("Carregando tema no customizer:", S), l(S);
    }
  }, [e, r]);
  const g = (S, w) => {
    l((O) => ({
      ...O,
      colors: {
        ...O.colors,
        [S]: w
      }
    }));
  }, v = () => {
    console.log("Aplicando tema:", o), n({
      ...o,
      name: `custom-${o.isDark ? "dark" : "light"}-${Date.now()}`
    });
    const S = document.documentElement;
    Object.entries(o.colors).forEach(([w, O]) => {
      S.style.setProperty(`--theme-${w}`, O);
    }), o.isDark ? S.classList.add("dark") : S.classList.remove("dark"), t();
  }, m = () => {
    console.log("Resetando para tema padrão"), a();
    const S = o.isDark ? wr : xr;
    l({
      ...S,
      name: `default-${o.isDark ? "dark" : "light"}`
    });
  }, y = (S) => {
    const w = S ? wr : xr;
    console.log("Mudando para modo:", S ? "dark" : "light", w), l({
      ...w,
      isDark: S,
      name: `default-${S ? "dark" : "light"}`
    });
  }, p = () => `const ${o.isDark ? "defaultDarkTheme" : "defaultLightTheme"}: CustomTheme = {
  name: "${o.name}",
  isDark: ${o.isDark},
  colors: {
    background: "${o.colors.background}",
    foreground: "${o.colors.foreground}",
    primary: "${o.colors.primary}",
    secondary: "${o.colors.secondary}",
    accent: "${o.colors.accent}",
    success: "${o.colors.success}",
    warning: "${o.colors.warning}",
    danger: "${o.colors.danger}",
    border: "${o.colors.border}",
    muted: "${o.colors.muted}",
  },
};`, k = async () => {
    try {
      await navigator.clipboard.writeText(p()), f(!0), setTimeout(() => f(!1), 2e3);
    } catch (S) {
      console.error("Erro ao copiar:", S);
    }
  }, N = () => {
    c(!0);
  }, E = () => {
    c(!1), f(!1);
  }, L = [
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
  return /* @__PURE__ */ h(ze, { isOpen: e, onClose: t, className: "max-w-2xl", children: [
    /* @__PURE__ */ h("div", { className: "p-2 w-full flex flex-col flex-1", children: [
      /* @__PURE__ */ h("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ i(Ut, { className: "w-6 h-6 text-primary-500" }),
        /* @__PURE__ */ i("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Personalizar Tema" })
      ] }),
      /* @__PURE__ */ i("div", { className: "mb-6  bg-gray-50 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ h("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ h("div", { children: [
          /* @__PURE__ */ i("h3", { className: "font-semibold text-gray-900 dark:text-white", children: "Modo" }),
          /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Escolha entre tema claro ou escuro" })
        ] }),
        /* @__PURE__ */ i(
          Bt,
          {
            checked: o.isDark,
            onCheckedChange: y
          }
        )
      ] }) }),
      /* @__PURE__ */ i("div", { className: "space-y-4 mb-6 max-h-96 overflow-y-auto", children: L.map(({ key: S, label: w, description: O }) => /* @__PURE__ */ h("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ h("div", { className: "flex-1", children: [
          /* @__PURE__ */ i("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: w }),
          /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: O })
        ] }),
        /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(
            Ie,
            {
              type: "color",
              value: o.colors[S],
              onChange: (U) => g(S, U.target.value),
              className: "w-12 h-10 p-1 border-2"
            }
          ),
          /* @__PURE__ */ i(
            Ie,
            {
              type: "text",
              value: o.colors[S],
              onChange: (U) => g(S, U.target.value),
              className: "w-24 text-xs font-mono",
              placeholder: "#000000"
            }
          )
        ] })
      ] }, S)) }),
      /* @__PURE__ */ h(
        "div",
        {
          className: "mb-6 p-4 rounded-lg border-2",
          style: {
            backgroundColor: o.colors.background,
            borderColor: o.colors.border,
            color: o.colors.foreground
          },
          children: [
            /* @__PURE__ */ i("h4", { className: "font-semibold mb-2", children: "Preview do Tema" }),
            /* @__PURE__ */ h("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.primary },
                  children: "Primário"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.secondary },
                  children: "Secundário"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.accent },
                  children: "Destaque"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.success },
                  children: "Sucesso"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.warning },
                  children: "Aviso"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  className: "px-3 py-1 rounded text-white text-sm",
                  style: { backgroundColor: o.colors.danger },
                  children: "Perigo"
                }
              )
            ] })
          ]
        }
      ),
      " ",
      /* @__PURE__ */ h("div", { className: "flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ h("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ h(
            I,
            {
              variant: "ghost",
              onClick: m,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ i(pr, { className: "w-4 h-4" }),
                s ? "Voltar ao Padrão" : "Resetar Cores"
              ]
            }
          ),
          /* @__PURE__ */ h(
            I,
            {
              variant: "secondary",
              onClick: N,
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ i(fr, { className: "w-4 h-4" }),
                "Exportar Tema"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ h("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ i(I, { variant: "secondary", onClick: t, children: "Cancelar" }),
          /* @__PURE__ */ i(I, { variant: "primary", onClick: v, children: s ? "Atualizar Tema" : "Criar Tema Personalizado" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(
      ze,
      {
        isOpen: d,
        onClose: () => c(!1),
        className: "max-w-4xl",
        children: /* @__PURE__ */ h("div", { className: "p-6", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ i(fr, { className: "w-6 h-6 text-primary-500" }),
            /* @__PURE__ */ i("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Exportar Tema Personalizado" })
          ] }),
          /* @__PURE__ */ i("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: "Copie o código abaixo e substitua o tema padrão no seu projeto para usar este tema personalizado permanentemente." }),
          /* @__PURE__ */ h("div", { className: "bg-gray-900 rounded-lg p-4 mb-4 relative", children: [
            /* @__PURE__ */ i("pre", { className: "text-green-400 text-sm overflow-x-auto whitespace-pre-wrap font-mono", children: /* @__PURE__ */ i("code", { children: p() }) }),
            /* @__PURE__ */ i(
              I,
              {
                onClick: k,
                className: "absolute top-2 right-2 p-2",
                variant: "ghost",
                size: "sm",
                children: u ? /* @__PURE__ */ i(hr, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ i(mr, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ h("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4", children: [
            /* @__PURE__ */ i("h3", { className: "font-semibold text-blue-900 dark:text-blue-100 mb-2", children: "💡 Como usar:" }),
            /* @__PURE__ */ h("ol", { className: "text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside", children: [
              /* @__PURE__ */ i("li", { children: "Copie o código acima" }),
              /* @__PURE__ */ i("li", { children: "Substitua o tema padrão correspondente no seu projeto" }),
              /* @__PURE__ */ i("li", { children: "Ou passe como prop customizada para o EvolutionManager" }),
              /* @__PURE__ */ i("li", { children: "Reinicie sua aplicação para ver as mudanças" })
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ h(
              I,
              {
                variant: "ghost",
                onClick: E,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(pr, { className: "w-4 h-4" }),
                  "Voltar ao Editor"
                ]
              }
            ),
            /* @__PURE__ */ h("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ i(
                I,
                {
                  variant: "secondary",
                  onClick: () => c(!1),
                  children: "Fechar"
                }
              ),
              /* @__PURE__ */ i(
                I,
                {
                  variant: "primary",
                  onClick: k,
                  className: "flex items-center gap-2",
                  children: u ? /* @__PURE__ */ h(bt, { children: [
                    /* @__PURE__ */ i(hr, { className: "w-4 h-4" }),
                    "Copiado!"
                  ] }) : /* @__PURE__ */ h(bt, { children: [
                    /* @__PURE__ */ i(mr, { className: "w-4 h-4" }),
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
function ni({
  baseUrl: e,
  apiKey: t,
  showCreateButton: r = !0,
  showThemeToggle: n = !1,
  showThemeCustomizer: a = !1,
  maxInstances: s,
  className: o,
  style: l,
  onInstanceCreated: d,
  onInstanceDeleted: c,
  onInstanceConnected: u
}) {
  const { theme: f, toggleTheme: g } = It(), [v, m] = A(!1), [y, p] = A(null), [k, N] = A(null), [E, L] = A(null), [S, w] = A(!1), [O, U] = A({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: D,
    instances: j,
    loading: W,
    error: oe,
    createInstance: ee,
    deleteInstance: te,
    connectInstance: R,
    refreshInstances: C,
    clearError: _
  } = Jr({ baseUrl: e, apiKey: t }), $ = async (F) => {
    try {
      await ee(F, "WHATSAPP-BAILEYS"), await C(), d?.(F);
    } catch (Y) {
      console.error("Erro ao criar instância:", Y);
    }
  }, ie = async (F) => {
    try {
      const ce = await R(F), fe = ce?.data?.qrcode || ce?.data?.base64 || ce?.qrcode || ce?.base64 || ce?.qr;
      fe && (N(fe), p(F), u?.(F));
    } catch (Y) {
      console.error("Erro ao conectar instância:", Y);
    }
  }, X = async (F) => {
    if (window.confirm(
      `Tem certeza que deseja deletar a instância "${F}"?`
    ))
      try {
        await te(F), await C(), c?.(F);
      } catch (Y) {
        console.error("Erro ao deletar instância:", Y);
      }
  }, V = async (F) => {
    try {
      D && D.setInstanceSettings && (await D.setInstanceSettings(F, O), L(null), alert("Configurações salvas com sucesso!"));
    } catch (Y) {
      console.error("Erro ao configurar instância:", Y), alert("Erro ao salvar configurações");
    }
  }, re = !s || j.length < s;
  return W && j.length === 0 ? /* @__PURE__ */ i(
    "div",
    {
      className: `flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900 ${o}`,
      style: l,
      children: /* @__PURE__ */ i(me, { size: "lg" })
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: `min-h-screen p-4 ${o}`,
      style: { backgroundColor: "var(--theme-muted)", ...l },
      children: /* @__PURE__ */ h("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ h("div", { className: "flex justify-between items-center mb-8 flex-wrap gap-4", children: [
          /* @__PURE__ */ h("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [
            "Instâncias WhatsApp (",
            j.length,
            s && `/${s}`,
            ")"
          ] }),
          /* @__PURE__ */ h("div", { className: "flex gap-4 flex-wrap items-center", children: [
            n && /* @__PURE__ */ i(
              Bt,
              {
                checked: f.isDark,
                onCheckedChange: g
              }
            ),
            a && /* @__PURE__ */ h(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => w(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(Ut, { className: "w-4 h-4" }),
                  "Personalizar"
                ]
              }
            ),
            /* @__PURE__ */ h(
              I,
              {
                variant: "secondary",
                size: "sm",
                onClick: C,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(et, { className: "w-4 h-4" }),
                  "Atualizar"
                ]
              }
            ),
            r && re && /* @__PURE__ */ h(
              I,
              {
                variant: "primary",
                size: "sm",
                onClick: () => m(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(St, { className: "w-4 h-4" }),
                  "Nova Instância"
                ]
              }
            )
          ] })
        ] }),
        oe && /* @__PURE__ */ i(Z, { className: "mb-6 bg-danger-50 dark:bg-danger-500/10 border border-danger-500", children: /* @__PURE__ */ h("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ h("span", { className: "text-danger-600 dark:text-danger-400", children: [
            "❌ ",
            oe
          ] }),
          /* @__PURE__ */ i(I, { variant: "ghost", size: "sm", onClick: _, children: "✕" })
        ] }) }),
        W && /* @__PURE__ */ i("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ i(me, { size: "md" }) }),
        s && j.length >= s && /* @__PURE__ */ i(Z, { className: "mb-6 bg-warning-50 dark:bg-warning-500/10 border border-warning-500", children: /* @__PURE__ */ h("span", { className: "text-warning-600 dark:text-warning-400", children: [
          "⚠️ Limite máximo de ",
          s,
          " instâncias atingido"
        ] }) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: j.map((F) => /* @__PURE__ */ i(
          Po,
          {
            instance: F,
            onConnect: () => ie(F.name),
            onDelete: () => X(F.name),
            onSettings: () => L(F.name)
          },
          F.name
        )) }),
        j.length === 0 && !W && /* @__PURE__ */ h(Z, { className: "text-center py-12", children: [
          /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(St, { className: "w-16 h-16 mx-auto" }) }),
          /* @__PURE__ */ i("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: "Nenhuma instância encontrada" }),
          /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Crie sua primeira instância WhatsApp para começar" }),
          r && /* @__PURE__ */ i(I, { variant: "primary", onClick: () => m(!0), children: "Criar Primeira Instância" })
        ] }),
        /* @__PURE__ */ i(
          gn,
          {
            isOpen: v,
            onClose: () => m(!1),
            onSubmit: $
          }
        ),
        y && k && /* @__PURE__ */ i(
          Io,
          {
            isOpen: !!y,
            instanceName: y,
            qrCode: k,
            onClose: () => {
              p(null), N(null);
            }
          }
        ),
        E && /* @__PURE__ */ i(
          pn,
          {
            isOpen: !!E,
            instanceName: E,
            settings: O,
            onSettingsChange: U,
            onSave: () => V(E),
            onClose: () => L(null)
          }
        ),
        /* @__PURE__ */ i(
          yn,
          {
            isOpen: S,
            onClose: () => w(!1)
          }
        )
      ] })
    }
  );
}
const J = ({
  className: e,
  animate: t = !0
}) => /* @__PURE__ */ i(
  "div",
  {
    className: z(
      "bg-gray-200 dark:bg-gray-700 rounded",
      t && "animate-pulse",
      e
    )
  }
), Oo = ({ className: e }) => /* @__PURE__ */ h("div", { className: z("grid grid-cols-2 gap-3", e), children: [
  /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ h("div", { className: "flex items-center space-x-2 mb-2", children: [
      /* @__PURE__ */ i(J, { className: "w-4 h-4 rounded-full" }),
      /* @__PURE__ */ i(J, { className: "h-3 w-16" })
    ] }),
    /* @__PURE__ */ i(J, { className: "h-6 w-8" })
  ] }),
  /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ h("div", { className: "flex items-center space-x-2 mb-2", children: [
      /* @__PURE__ */ i(J, { className: "w-4 h-4 rounded-full" }),
      /* @__PURE__ */ i(J, { className: "h-3 w-12" })
    ] }),
    /* @__PURE__ */ i(J, { className: "h-6 w-6" })
  ] })
] }), vr = ({
  className: e
}) => /* @__PURE__ */ h("div", { className: z("animate-pulse", e), children: [
  /* @__PURE__ */ h("div", { className: "flex items-center justify-between p-4 pb-3", children: [
    /* @__PURE__ */ h("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ i("div", { className: "w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" }),
      /* @__PURE__ */ i(J, { className: "h-5 w-32" })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i(J, { className: "h-4 w-20" }),
      /* @__PURE__ */ i(J, { className: "w-8 h-8 rounded" }),
      /* @__PURE__ */ i(J, { className: "w-8 h-8 rounded" })
    ] })
  ] }),
  /* @__PURE__ */ h("div", { className: "p-4 pt-0 space-y-4", children: [
    /* @__PURE__ */ h("div", { className: "flex flex-col items-center space-y-4", children: [
      /* @__PURE__ */ i("div", { className: "w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ h("div", { className: "text-center flex flex-col items-center justify-center space-y-3", children: [
        /* @__PURE__ */ h("div", { className: "relative", children: [
          /* @__PURE__ */ i("div", { className: "w-8 h-8 border-4 border-gray-300 dark:border-gray-600 rounded-full" }),
          /* @__PURE__ */ i("div", { className: "absolute top-0 left-0 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" })
        ] }),
        /* @__PURE__ */ i(J, { className: "h-4 w-48" })
      ] }) }),
      /* @__PURE__ */ i(J, { className: "h-4 w-48" })
    ] }),
    /* @__PURE__ */ i(Oo, {}),
    /* @__PURE__ */ h("div", { className: "space-y-2", children: [
      /* @__PURE__ */ i(J, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ i(J, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ i(J, { className: "h-4 w-2/3" })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex justify-end items-center gap-2 pt-2", children: [
      /* @__PURE__ */ i(J, { className: "h-8 w-20 rounded" }),
      /* @__PURE__ */ i(J, { className: "h-8 w-24 rounded" })
    ] })
  ] })
] }), ai = ({
  baseUrl: e,
  apiKey: t,
  instanceName: r,
  // 🎯 Mudou de instanceName para instanceName
  showSettings: n = !0,
  showThemeToggle: a = !1,
  showThemeCustomizer: s = !1,
  onInstanceCreated: o,
  onInstanceDeleted: l,
  onInstanceConnected: d,
  onInstanceDisconnected: c,
  // 🎯 Nova callback
  className: u = "w-full md:w-1/2 flex justify-center items-center p-4 h-screen md:h-auto",
  // 🎯 Layout responsivo
  style: f
}) => {
  const [g, v] = A(
    null
  ), [m, y] = A(!1), [p, k] = A(null), N = xt(null), E = xt(null), [L, S] = A(!1), [w, O] = A(!1), [U, D] = A(null), [j, W] = A(!1), [oe, ee] = A(null), [te, R] = A(!1), [C, _] = A(!1), [$, ie] = A({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), [X, V] = A(!1), [re, F] = A("idle"), [Y, ce] = A(!1), [fe, $e] = A(null), {
    manager: le,
    instances: _t,
    loading: Ne,
    error: Ce,
    createInstance: bn,
    deleteInstance: xn,
    connectInstance: wn,
    disconnectInstance: vn,
    refreshInstances: ut,
    fetchSingleInstance: xe,
    // 🎯 Novo método para buscar apenas 1 instância
    getInstanceStatus: We,
    // 🎯 Para polling contínuo
    clearError: we
  } = Jr({
    baseUrl: e,
    apiKey: t
  }), { toggleTheme: kn } = It();
  ve(() => {
    if (!r || !le) return;
    (async () => {
      try {
        y(!0);
        const M = await xe(r);
        M && (v(M), E.current = JSON.stringify(M), k(M.status || M.connectionState));
      } catch (M) {
        console.error("Erro ao carregar dados iniciais:", M);
      } finally {
        y(!1);
      }
    })();
  }, [r, le, xe]);
  const Nn = H(() => {
    N.current || !r || (console.log("🟢 Iniciando polling de status rápido..."), N.current = setInterval(async () => {
      try {
        const P = await We(r), M = P?.data?.state || P?.data?.status || P?.data;
        if (M && M !== p) {
          console.log(`📱 Status mudou: ${p} → ${M}`), k(M), y(!0);
          const B = await xe(r);
          if (B) {
            const ne = JSON.stringify(B);
            E.current !== ne && (console.log("🔄 Instância atualizada via polling"), v(B), E.current = ne);
          }
          y(!1), (M === "open" || M === "connected") && ht();
        }
      } catch (P) {
        console.error("Erro no polling de status:", P);
      }
    }, 100));
  }, [r, We, xe, p]), ht = H(() => {
    N.current && (console.log("🔴 Parando polling de status"), clearInterval(N.current), N.current = null);
  }, []);
  ve(() => () => {
    ht();
  }, [ht]);
  const Ve = H(
    async (P = !1) => {
      if (r) {
        P && V(!0);
        try {
          const [M] = await Promise.all([
            xe(r),
            new Promise(
              (ne) => setTimeout(ne, P ? 600 : 300)
            )
          ]), B = JSON.stringify(M);
          fe !== B ? (console.log("🔄 Dados da instância mudaram, atualizando..."), v(M), $e(B)) : console.log("📋 Dados iguais no cache, pulando re-render"), we();
        } catch (M) {
          console.error("Erro ao carregar dados da instância:", M), (M?.response?.status === 404 || M?.status === 404) && (v(null), $e(null), we()), await new Promise(
            (B) => setTimeout(B, P ? 600 : 300)
          );
        } finally {
          P && V(!1);
        }
      }
    },
    [r, xe, we, fe]
  );
  ve(() => {
    if (!r) return;
    Ve();
    let P = null;
    const M = () => {
      P || (console.log("🟢 Iniciando polling...", { trigger: re }), ce(!0), P = setInterval(async () => {
        try {
          const ne = await xe(r), Wt = JSON.stringify(ne);
          fe !== Wt && (console.log("🔄 [Polling] Dados mudaram, atualizando..."), v(ne), $e(Wt), we()), (await We(r))?.status === "open" && ne && (console.log("✅ Instância conectada, parando polling"), B(), F("idle"));
        } catch (ne) {
          ne?.response?.status === 404 || ne?.status === 404 ? (v(null), $e(null), we(), B(), F("idle")) : console.error("Erro no polling da instância:", ne);
        }
      }, 2e3));
    }, B = () => {
      P && (console.log("🔴 Parando polling..."), clearInterval(P), P = null, ce(!1));
    };
    return re === "creating" || re === "connecting" || re === "manual" ? M() : B(), () => {
      B();
    };
  }, [
    r,
    Ve,
    xe,
    We,
    re,
    fe,
    we
  ]);
  const qt = H(async () => {
    const P = fe;
    await ut();
    const M = _t.find(
      (ne) => ne.name === r
    ), B = JSON.stringify(M);
    P !== B ? (console.log("🔄 Dados da instância mudaram após refresh"), $e(B)) : console.log("📋 Dados iguais no cache após refresh");
  }, [ut, _t, r, fe]), Cn = async (P) => {
    if (!le) {
      console.error("Manager não inicializado ainda. Aguarde...");
      return;
    }
    try {
      F("creating"), await Promise.all([
        bn(P, "WHATSAPP-BAILEYS"),
        new Promise((M) => setTimeout(M, 500))
      ]), await Ve(), o?.(P), S(!1), setTimeout(() => F("idle"), 3e3);
    } catch (M) {
      console.error("Erro ao criar instância:", M), F("idle"), await new Promise((B) => setTimeout(B, 500));
    }
  }, Ht = async () => {
    if (r)
      try {
        console.log("Iniciando conexão para instância:", r), O(!0), D(null), ee(null), Nn();
        const P = await wn(r);
        console.log("Resultado da conexão:", P);
        const M = P, B = M?.data?.qrcode || M?.data?.base64 || M?.qrcode || M?.base64 || M?.qr;
        console.log("QR Code extraído:", B ? "Presente" : "Ausente"), console.log("QR Code valor:", B?.substring(0, 100) + "..."), O(!1), B ? (console.log("Definindo QR Code data..."), D(B), W(!1), console.log("Estados atualizados - QR definido, não conectando ainda"), d?.(r)) : console.error("QR Code não foi gerado na resposta:", P);
      } catch (P) {
        console.error("Erro ao conectar instância:", P), O(!1), W(!1), D(null), ee(
          P instanceof Error ? P.message : "Erro desconhecido ao conectar"
        );
      }
  }, En = async () => {
    if (r)
      try {
        console.log("Desconectando instância:", r), await vn(r), await Ve(), c?.(r), D(null), ee(null);
      } catch (P) {
        console.error("Erro ao desconectar instância:", P);
      }
  }, Sn = async () => {
    if (r && window.confirm(
      `Tem certeza que deseja deletar a instância "${r}"?`
    ))
      try {
        await xn(r), await ut(), l?.(r);
      } catch (P) {
        console.error("Erro ao deletar instância:", P);
      }
  }, Rn = async () => {
    try {
      le && le.setInstanceSettings && r && (await le.setInstanceSettings(r, $), R(!1), alert("Configurações salvas com sucesso!"));
    } catch (P) {
      console.error("Erro ao configurar instância:", P), alert("Erro ao salvar configurações");
    }
  }, Tn = () => oe ? {
    text: "Erro na Conexão",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-500",
    showError: !0,
    expandCard: !0
  } : w ? {
    text: "Gerando QR Code...",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-500",
    showLoader: !0,
    expandCard: !0
  } : U && !j ? {
    text: "QR Code Gerado - Aguardando Conexão",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-500",
    showQR: !0,
    expandCard: !0
  } : j ? {
    text: "Conectando...",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-500",
    showLoader: !0,
    expandCard: !0
  } : g?.status === "connected" ? {
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
    manager: !!le,
    loading: Ne,
    error: Ce,
    baseUrl: e,
    apiKey: t ? "Presente" : "Ausente"
  }), Ne || !le)
    return /* @__PURE__ */ i("div", { className: u, style: f, children: /* @__PURE__ */ h(Z, { className: "relative", children: [
      /* @__PURE__ */ i(vr, {}),
      /* @__PURE__ */ i("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg", children: /* @__PURE__ */ h("div", { className: "text-center", children: [
        /* @__PURE__ */ i(me, { size: "lg" }),
        /* @__PURE__ */ i("p", { className: "mt-3 text-sm text-gray-600 dark:text-gray-400", children: le ? "Carregando instância..." : "Inicializando Evolution Manager..." }),
        /* @__PURE__ */ h("div", { className: "mt-2 text-xs text-gray-400", children: [
          "BaseURL: ",
          e,
          " | API Key: ",
          t ? "✓" : "✗",
          Ce && /* @__PURE__ */ h("div", { className: "text-red-400 mt-1", children: [
            "⚠️ ",
            Ce
          ] })
        ] })
      ] }) })
    ] }) });
  if (!g)
    return /* @__PURE__ */ i("div", { className: u, style: f, children: /* @__PURE__ */ h(Z, { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center", children: [
      /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(yr, { className: "w-16 h-16 mx-auto" }) }),
      /* @__PURE__ */ h("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: [
        'Instância "',
        r,
        '" não encontrada'
      ] }),
      /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Esta instância não existe. Deseja criá-la?" }),
      /* @__PURE__ */ h("div", { className: "flex gap-2 justify-center", children: [
        /* @__PURE__ */ h(
          I,
          {
            variant: "primary",
            onClick: () => S(!0),
            disabled: !le,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ i(St, { className: "w-4 h-4" }),
              le ? "Criar Instância" : "Inicializando..."
            ]
          }
        ),
        /* @__PURE__ */ h(
          I,
          {
            variant: "ghost",
            onClick: async () => {
              V(!0), await new Promise((P) => setTimeout(P, 800)), await qt(), V(!1);
            },
            disabled: !le || X,
            className: z(
              "flex items-center gap-2 transition-all duration-300",
              X && "animate-pulse"
            ),
            children: [
              /* @__PURE__ */ i(
                et,
                {
                  className: z("w-4 h-4", X && "animate-spin")
                }
              ),
              X ? "Atualizando..." : "Atualizar"
            ]
          }
        )
      ] }),
      Ce && /* @__PURE__ */ h("div", { className: "mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center", children: [
        /* @__PURE__ */ h("span", { className: "text-danger-600 dark:text-danger-400 text-sm", children: [
          "❌ ",
          Ce
        ] }),
        /* @__PURE__ */ i(I, { variant: "ghost", size: "sm", onClick: we, children: "✕" })
      ] }),
      /* @__PURE__ */ i(
        gn,
        {
          isOpen: L,
          onClose: () => S(!1),
          onSubmit: Cn,
          defaultName: r
        }
      )
    ] }) });
  const de = Tn();
  return /* @__PURE__ */ h("div", { className: u, style: f, children: [
    (a || s) && /* @__PURE__ */ h("div", { className: "fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: [
      a && /* @__PURE__ */ i(
        Bt,
        {
          checked: document.documentElement.classList.contains("dark"),
          onCheckedChange: kn
        }
      ),
      s && /* @__PURE__ */ i(
        I,
        {
          onClick: () => _(!0),
          size: "sm",
          variant: "ghost",
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ i(Ut, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ h(
      Z,
      {
        className: z(
          "transition-all duration-300 relative",
          de.bg,
          de.border,
          de.expandCard ? "min-h-[400px]" : "",
          m && "opacity-75"
        ),
        children: [
          m && /* @__PURE__ */ i("div", { className: "absolute inset-0 z-10 bg-white/60 dark:bg-gray-900/60 rounded-lg", children: /* @__PURE__ */ i(vr, {}) }),
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between p-4 pb-3", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ i("div", { className: z("w-3 h-3 rounded-full", de.badge) }),
              /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: g.name })
            ] }),
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
              Y && /* @__PURE__ */ h("div", { className: "flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400", children: [
                /* @__PURE__ */ i("div", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ i("span", { children: "Polling" })
              ] }),
              /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mr-2", children: de.text }),
              n && /* @__PURE__ */ i(
                I,
                {
                  onClick: () => R(!0),
                  size: "sm",
                  variant: "ghost",
                  className: "flex items-center justify-center",
                  disabled: Ne || w || j,
                  children: /* @__PURE__ */ i(mn, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ i(
                I,
                {
                  onClick: async () => {
                    V(!0), await new Promise((P) => setTimeout(P, 600)), await qt(), V(!1);
                  },
                  size: "sm",
                  variant: "ghost",
                  className: z(
                    "flex items-center justify-center transition-all duration-300",
                    X && "animate-pulse"
                  ),
                  disabled: Ne || w || j || X,
                  children: /* @__PURE__ */ i(
                    et,
                    {
                      className: z("w-4 h-4", X && "animate-spin")
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ h("div", { className: "p-4 pt-0", children: [
            de.showQR && U && /* @__PURE__ */ h("div", { className: "mb-4 flex flex-col items-center space-y-4", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ i(
                "img",
                {
                  src: U,
                  alt: "QR Code para conectar WhatsApp",
                  className: "w-48 h-48"
                }
              ) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs", children: "Escaneie com seu WhatsApp" })
            ] }),
            de.showLoader && /* @__PURE__ */ h("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(me, { size: "md" }) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: de.text })
            ] }),
            de.showError && oe && /* @__PURE__ */ h("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ h("div", { className: "bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 flex flex-col items-center", children: [
                /* @__PURE__ */ i("div", { className: "text-red-500 text-4xl mb-2", children: "❌" }),
                /* @__PURE__ */ i("p", { className: "text-red-600 dark:text-red-400 text-center font-medium", children: oe })
              ] }),
              /* @__PURE__ */ h(
                I,
                {
                  onClick: () => {
                    ee(null), Ht();
                  },
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ i(et, { className: "w-4 h-4" }),
                    "Tentar Novamente"
                  ]
                }
              )
            ] }),
            de.showStats && /* @__PURE__ */ h(bt, { children: [
              g.profileName && /* @__PURE__ */ i("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4", children: /* @__PURE__ */ h("div", { className: "flex items-center space-x-3", children: [
                g.profilePicUrl ? /* @__PURE__ */ i(
                  "img",
                  {
                    src: g.profilePicUrl,
                    alt: "Profile",
                    className: "w-12 h-12 rounded-full border-2 border-green-400"
                  }
                ) : /* @__PURE__ */ i("div", { className: "w-12 h-12 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ i(yr, { className: "w-6 h-6 text-white" }) }),
                /* @__PURE__ */ h("div", { className: "flex-1", children: [
                  /* @__PURE__ */ i("h4", { className: "font-semibold text-green-800 dark:text-green-300", children: g.profileName }),
                  g.ownerJid && /* @__PURE__ */ i("p", { className: "text-sm text-green-600 dark:text-green-400", children: g.ownerJid.replace(
                    "@s.whatsapp.net",
                    ""
                  ) })
                ] }),
                /* @__PURE__ */ i("div", { className: "text-right", children: /* @__PURE__ */ i("div", { className: "text-xs text-green-600 dark:text-green-400", children: "📱 WhatsApp Conectado" }) })
              ] }) }),
              /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
                /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                  /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ i(Rt, { className: "w-4 h-4 text-blue-500" }),
                    /* @__PURE__ */ i("span", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Contatos" })
                  ] }),
                  /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: g.contactsCount || 0 })
                ] }),
                /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                  /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ i(je, { className: "w-4 h-4 text-green-500" }),
                    /* @__PURE__ */ i("span", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Chats" })
                  ] }),
                  /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: g.chatsCount || 0 })
                ] }),
                /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                  /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ i(je, { className: "w-4 h-4 text-purple-500" }),
                    /* @__PURE__ */ i("span", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Mensagens" })
                  ] }),
                  /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: g.messagesCount || 0 })
                ] })
              ] }),
              g.deviceInfo && /* @__PURE__ */ h("div", { className: "bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-4", children: [
                /* @__PURE__ */ i("h5", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "📱 Informações do Dispositivo" }),
                /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400", children: [
                  g.deviceInfo.platform && /* @__PURE__ */ h("div", { children: [
                    /* @__PURE__ */ i("span", { className: "font-medium", children: "Plataforma:" }),
                    " ",
                    g.deviceInfo.platform
                  ] }),
                  g.deviceInfo.deviceModel && /* @__PURE__ */ h("div", { children: [
                    /* @__PURE__ */ i("span", { className: "font-medium", children: "Modelo:" }),
                    " ",
                    g.deviceInfo.deviceModel
                  ] }),
                  g.deviceInfo.waVersion && /* @__PURE__ */ h("div", { children: [
                    /* @__PURE__ */ i("span", { className: "font-medium", children: "WhatsApp:" }),
                    " ",
                    g.deviceInfo.waVersion
                  ] }),
                  g.deviceInfo.osVersion && /* @__PURE__ */ h("div", { children: [
                    /* @__PURE__ */ i("span", { className: "font-medium", children: "SO:" }),
                    " ",
                    g.deviceInfo.osVersion
                  ] })
                ] })
              ] })
            ] }),
            de.showStats && !g.profileName && /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
              /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(Rt, { className: "w-4 h-4 text-blue-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: g.contactsCount || 0 })
              ] }),
              /* @__PURE__ */ h("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(je, { className: "w-4 h-4 text-green-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Chats" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: g.chatsCount || 0 })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4", children: [
              /* @__PURE__ */ h("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Integração:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: g.integration || "WHATSAPP-BAILEYS" })
              ] }),
              g.connectionState && /* @__PURE__ */ h("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Estado:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: g.connectionState })
              ] }),
              /* @__PURE__ */ h("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Última atualização:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: (/* @__PURE__ */ new Date()).toLocaleTimeString() })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "flex justify-end items-center gap-2", children: [
              /* @__PURE__ */ h(
                I,
                {
                  onClick: Sn,
                  size: "sm",
                  variant: "danger",
                  className: "flex items-center space-x-1",
                  disabled: Ne || w || j,
                  children: [
                    /* @__PURE__ */ i(fn, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Excluir" })
                  ]
                }
              ),
              g.status === "connected" ? /* @__PURE__ */ h(
                I,
                {
                  onClick: En,
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center space-x-1",
                  disabled: Ne || w || j,
                  children: [
                    /* @__PURE__ */ i(hn, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Desconectar" })
                  ]
                }
              ) : /* @__PURE__ */ h(
                I,
                {
                  onClick: Ht,
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center space-x-1",
                  disabled: Ne || w || j,
                  children: [
                    /* @__PURE__ */ i(un, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Conectar" })
                  ]
                }
              )
            ] }),
            Ce && /* @__PURE__ */ h("div", { className: "mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex justify-between items-center", children: [
              /* @__PURE__ */ h("span", { className: "text-red-600 dark:text-red-400 text-sm", children: [
                "❌ ",
                Ce
              ] }),
              /* @__PURE__ */ i(I, { variant: "ghost", size: "sm", onClick: we, children: "✕" })
            ] })
          ] })
        ]
      }
    ),
    te && /* @__PURE__ */ i(
      pn,
      {
        isOpen: te,
        instanceName: r,
        settings: $,
        onSettingsChange: ie,
        onSave: Rn,
        onClose: () => R(!1)
      }
    ),
    C && /* @__PURE__ */ i(
      yn,
      {
        isOpen: C,
        onClose: () => _(!1)
      }
    )
  ] });
}, Re = ({
  variant: e = "default",
  children: t,
  className: r
}) => /* @__PURE__ */ i(
  "span",
  {
    className: z(
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
), Mo = (e) => {
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
}, Lo = (e) => {
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
}, si = ({
  status: e,
  instanceName: t,
  lastUpdate: r
}) => {
  const n = Mo(e), a = Lo(e), s = (o) => {
    switch (o) {
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
  return /* @__PURE__ */ h(
    "div",
    {
      className: z(
        "flex items-center justify-between p-3 border rounded-lg",
        n.bg,
        n.border
      ),
      children: [
        /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i("div", { className: z("w-3 h-3 rounded-full", n.badge) }),
          /* @__PURE__ */ h("div", { children: [
            /* @__PURE__ */ i("p", { className: z("text-sm font-medium", n.text), children: a }),
            /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t })
          ] })
        ] }),
        /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(Re, { variant: s(e), children: a }),
          r && /* @__PURE__ */ i("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: r.toLocaleTimeString() })
        ] })
      ]
    }
  );
}, oi = ({
  instanceId: e,
  contactId: t,
  messages: r = [],
  loading: n = !1,
  onSendMessage: a,
  onMessageAction: s,
  showInput: o = !0,
  autoScroll: l = !0,
  className: d
}) => {
  const [c, u] = A(""), [f, g] = A(!1), v = xt(null), m = () => {
    v.current?.scrollIntoView({ behavior: "smooth" });
  };
  ve(() => {
    l && m();
  }, [r, l]);
  const y = (w) => {
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
  }, p = (w) => w.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }), k = (w) => {
    if (!w) return "";
    const O = ["Bytes", "KB", "MB", "GB"], U = Math.floor(Math.log(w) / Math.log(1024));
    return Math.round(w / Math.pow(1024, U) * 100) / 100 + " " + O[U];
  }, N = async () => {
    if (!(!c.trim() || !t || f)) {
      g(!0);
      try {
        await a?.(c.trim(), t), u("");
      } catch (w) {
        console.error("Erro ao enviar mensagem:", w);
      } finally {
        g(!1);
      }
    }
  }, E = (w) => {
    w.key === "Enter" && !w.shiftKey && (w.preventDefault(), N());
  }, L = (w, O) => {
    s?.(w, O);
  }, S = (w) => {
    switch (w.type) {
      case "image":
        return /* @__PURE__ */ h("div", { className: "max-w-xs", children: [
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
        return /* @__PURE__ */ h("div", { className: "flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
          /* @__PURE__ */ i("span", { className: "text-2xl", children: "🎵" }),
          /* @__PURE__ */ h("div", { children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Áudio" }),
            w.fileName && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: w.fileName })
          ] })
        ] });
      case "video":
        return /* @__PURE__ */ h("div", { className: "max-w-xs", children: [
          w.mediaUrl ? /* @__PURE__ */ i(
            "video",
            {
              controls: !0,
              className: "rounded-lg max-w-full h-auto",
              src: w.mediaUrl
            }
          ) : /* @__PURE__ */ h("div", { className: "flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg", children: [
            /* @__PURE__ */ i("span", { className: "text-2xl", children: "🎥" }),
            /* @__PURE__ */ h("div", { children: [
              /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Vídeo" }),
              w.fileName && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: w.fileName })
            ] })
          ] }),
          w.text && /* @__PURE__ */ i("p", { className: "mt-2 text-sm", children: w.text })
        ] });
      case "document":
        return /* @__PURE__ */ h("div", { className: "flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs", children: [
          /* @__PURE__ */ i("span", { className: "text-2xl", children: "📄" }),
          /* @__PURE__ */ h("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-medium truncate", children: w.fileName || "Documento" }),
            w.fileSize && /* @__PURE__ */ i("p", { className: "text-xs text-gray-500", children: k(w.fileSize) })
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
  return n ? /* @__PURE__ */ i(Z, { className: `p-6 ${d}`, children: /* @__PURE__ */ h("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ i(me, { size: "lg" }),
    /* @__PURE__ */ i("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando mensagens..." })
  ] }) }) : t ? /* @__PURE__ */ h(Z, { className: `flex flex-col h-96 ${d}`, children: [
    /* @__PURE__ */ h("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ i("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Mensagens" }),
      /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ i(Re, { variant: "default", children: e }),
        /* @__PURE__ */ i(Re, { variant: "default", children: r.length })
      ] })
    ] }),
    /* @__PURE__ */ h("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      r.length === 0 ? /* @__PURE__ */ h("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ i("div", { className: "text-gray-400 mb-2", children: /* @__PURE__ */ i(je, { className: "w-12 h-12 mx-auto" }) }),
        /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: "Nenhuma mensagem ainda" })
      ] }) : r.map((w) => /* @__PURE__ */ i(
        "div",
        {
          className: `flex ${w.isFromMe ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ h(
            "div",
            {
              className: `
                  max-w-[70%] rounded-lg p-3 relative group
                  ${w.isFromMe ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"}
                `,
              children: [
                w.quotedMessage && /* @__PURE__ */ h("div", { className: "mb-2 p-2 border-l-4 border-gray-300 bg-black/10 rounded text-xs", children: [
                  /* @__PURE__ */ i("p", { className: "font-medium opacity-70", children: w.quotedMessage.from }),
                  /* @__PURE__ */ i("p", { className: "opacity-70 truncate", children: w.quotedMessage.text })
                ] }),
                /* @__PURE__ */ i("div", { children: S(w) }),
                /* @__PURE__ */ h("div", { className: "flex items-center justify-between mt-2 text-xs opacity-70", children: [
                  /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ i(Re, { variant: y(w.type), children: w.type }),
                    /* @__PURE__ */ i("span", { children: p(w.timestamp) })
                  ] }),
                  w.isFromMe && /* @__PURE__ */ i("span", { children: w.isRead ? "✓✓" : "✓" })
                ] }),
                /* @__PURE__ */ i("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ i(
                  I,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => L(w.id, "reply"),
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
      /* @__PURE__ */ i("div", { ref: v })
    ] }),
    o && t && /* @__PURE__ */ i("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ h("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ i(
        Ie,
        {
          type: "text",
          placeholder: "Digite sua mensagem...",
          value: c,
          onChange: (w) => u(w.target.value),
          onKeyPress: E,
          disabled: f,
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ i(
        I,
        {
          variant: "primary",
          onClick: N,
          disabled: !c.trim() || f,
          children: f ? /* @__PURE__ */ i(me, { size: "sm" }) : "📤"
        }
      )
    ] }) })
  ] }) : /* @__PURE__ */ i(Z, { className: `p-6 ${d}`, children: /* @__PURE__ */ h("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ i("div", { className: "text-6xl mb-4", children: "💬" }),
    /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Selecione um contato" }),
    /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400", children: "Escolha um contato para ver as mensagens." })
  ] }) });
}, ii = ({
  instanceId: e,
  contacts: t = [],
  loading: r = !1,
  onContactSelect: n,
  onContactAction: a,
  showSearch: s = !0,
  showActions: o = !0,
  className: l
}) => {
  const [d, c] = A(""), [u, f] = A(null), g = t.filter(
    (p) => p.name.toLowerCase().includes(d.toLowerCase()) || p.phone.includes(d)
  ), v = (p) => p ? "success" : "default", m = (p) => {
    f(p.id), n?.(p);
  }, y = (p, k) => {
    a?.(p, k);
  };
  return r ? /* @__PURE__ */ i(Z, { className: `p-6 ${l}`, children: /* @__PURE__ */ h("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ i(me, { size: "lg" }),
    /* @__PURE__ */ i("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando contatos..." })
  ] }) }) : t.length === 0 ? /* @__PURE__ */ i(Z, { className: `p-6 ${l}`, children: /* @__PURE__ */ h("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ i("div", { className: "text-6xl mb-4", children: "👥" }),
    /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Nenhum contato encontrado" }),
    /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400", children: "Os contatos aparecerão aqui quando a instância estiver conectada." })
  ] }) }) : /* @__PURE__ */ h(Z, { className: `p-4 ${l}`, children: [
    /* @__PURE__ */ h("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ h("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: [
        "Contatos (",
        t.length,
        ")"
      ] }),
      /* @__PURE__ */ i(Re, { variant: "default", children: e })
    ] }),
    s && /* @__PURE__ */ i("div", { className: "mb-4", children: /* @__PURE__ */ i(
      Ie,
      {
        type: "search",
        placeholder: "Buscar contatos...",
        value: d,
        onChange: (p) => c(p.target.value),
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ i("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: g.map((p) => /* @__PURE__ */ i(
      "div",
      {
        className: `
              p-3 rounded-lg border border-gray-200 dark:border-gray-700 
              hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors
              ${u === p.id ? "bg-primary-50 dark:bg-primary-500/10 border-primary-500" : "bg-white dark:bg-gray-800"}
            `,
        onClick: () => m(p),
        children: /* @__PURE__ */ h("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ i("div", { className: "w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden", children: p.profilePicture ? /* @__PURE__ */ i(
              "img",
              {
                src: p.profilePicture,
                alt: p.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-600 dark:text-gray-300", children: p.name.charAt(0).toUpperCase() }) }),
            /* @__PURE__ */ h("div", { className: "flex-1", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i("h4", { className: "font-medium text-gray-900 dark:text-white text-sm", children: p.name }),
                p.isGroup && /* @__PURE__ */ h(Re, { variant: "default", children: [
                  "👥 ",
                  p.groupParticipants || 0
                ] }),
                /* @__PURE__ */ i(Re, { variant: v(p.isOnline), children: p.isOnline ? "Online" : "Offline" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: p.phone }),
              p.lastSeen && !p.isOnline && /* @__PURE__ */ h("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: [
                "Visto por último: ",
                p.lastSeen.toLocaleString()
              ] })
            ] })
          ] }),
          o && /* @__PURE__ */ h("div", { className: "flex space-x-1", children: [
            /* @__PURE__ */ i(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), y(p.id, "message");
                },
                title: "Enviar mensagem",
                children: "💬"
              }
            ),
            /* @__PURE__ */ i(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), y(p.id, "call");
                },
                title: "Ligar",
                children: "📞"
              }
            ),
            p.isBlocked ? /* @__PURE__ */ i(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), y(p.id, "unblock");
                },
                title: "Desbloquear",
                children: "🔓"
              }
            ) : /* @__PURE__ */ i(
              I,
              {
                variant: "ghost",
                size: "sm",
                onClick: (k) => {
                  k.stopPropagation(), y(p.id, "block");
                },
                title: "Bloquear",
                children: "🚫"
              }
            )
          ] })
        ] })
      },
      p.id
    )) }),
    d && /* @__PURE__ */ i("div", { className: "mt-3 pt-3 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 dark:text-gray-400 text-center", children: [
      g.length,
      " contato(s) encontrado(s)"
    ] }) })
  ] });
}, li = {
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
}, ci = {
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
  Re as Badge,
  I as Button,
  Z as Card,
  si as ConnectionStatus,
  ii as ContactList,
  ls as EvolutionManager,
  Ie as Input,
  Po as InstanceCard,
  ai as InstanceController,
  ni as InstanceManager,
  me as Loading,
  oi as MessageList,
  ze as Modal,
  Ao as QRCodeDisplay,
  jo as ThemeProvider,
  ci as darkTheme,
  li as defaultTheme,
  Jr as useEvolutionManager,
  It as useTheme
};
