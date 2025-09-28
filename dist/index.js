var nn = Object.defineProperty;
var an = (e, t, r) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var at = (e, t, r) => an(e, typeof t != "symbol" ? t + "" : t, r);
import { jsx as i, jsxs as m, Fragment as Lt } from "react/jsx-runtime";
import * as x from "react";
import { createContext as sn, useState as M, useEffect as we, useCallback as X, useContext as on, forwardRef as ln, createElement as Mt, useRef as cn } from "react";
const ir = sn(
  void 0
), dn = {
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
}, un = {
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
}, go = ({ children: e }) => {
  const [t, r] = M(!1), [n, a] = M(!1);
  we(() => {
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
    const k = f === "dark" ? un : dn;
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
    ir.Provider,
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
function lr(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: hn } = Object.prototype, { getPrototypeOf: yt } = Object, { iterator: Ge, toStringTag: cr } = Symbol, Xe = /* @__PURE__ */ ((e) => (t) => {
  const r = hn.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ae = (e) => (e = e.toLowerCase(), (t) => Xe(t) === e), Ye = (e) => (t) => typeof t === e, { isArray: Se } = Array, Ce = Ye("undefined");
function Le(e) {
  return e !== null && !Ce(e) && e.constructor !== null && !Ce(e.constructor) && Z(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const dr = ae("ArrayBuffer");
function fn(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && dr(e.buffer), t;
}
const mn = Ye("string"), Z = Ye("function"), ur = Ye("number"), Me = (e) => e !== null && typeof e == "object", pn = (e) => e === !0 || e === !1, _e = (e) => {
  if (Xe(e) !== "object")
    return !1;
  const t = yt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(cr in e) && !(Ge in e);
}, gn = (e) => {
  if (!Me(e) || Le(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, yn = ae("Date"), bn = ae("File"), xn = ae("Blob"), wn = ae("FileList"), vn = (e) => Me(e) && Z(e.pipe), kn = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Z(e.append) && ((t = Xe(e)) === "formdata" || // detect form-data instance
  t === "object" && Z(e.toString) && e.toString() === "[object FormData]"));
}, Nn = ae("URLSearchParams"), [Cn, En, Sn, Rn] = ["ReadableStream", "Request", "Response", "Headers"].map(ae), Tn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function $e(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, a;
  if (typeof e != "object" && (e = [e]), Se(e))
    for (n = 0, a = e.length; n < a; n++)
      t.call(null, e[n], n, e);
  else {
    if (Le(e))
      return;
    const o = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let l;
    for (n = 0; n < s; n++)
      l = o[n], t.call(null, e[l], l, e);
  }
}
function hr(e, t) {
  if (Le(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, a;
  for (; n-- > 0; )
    if (a = r[n], t === a.toLowerCase())
      return a;
  return null;
}
const ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, fr = (e) => !Ce(e) && e !== ye;
function dt() {
  const { caseless: e, skipUndefined: t } = fr(this) && this || {}, r = {}, n = (a, o) => {
    const s = e && hr(r, o) || o;
    _e(r[s]) && _e(a) ? r[s] = dt(r[s], a) : _e(a) ? r[s] = dt({}, a) : Se(a) ? r[s] = a.slice() : (!t || !Ce(a)) && (r[s] = a);
  };
  for (let a = 0, o = arguments.length; a < o; a++)
    arguments[a] && $e(arguments[a], n);
  return r;
}
const An = (e, t, r, { allOwnKeys: n } = {}) => ($e(t, (a, o) => {
  r && Z(a) ? e[o] = lr(a, r) : e[o] = a;
}, { allOwnKeys: n }), e), Pn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), On = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Ln = (e, t, r, n) => {
  let a, o, s;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (a = Object.getOwnPropertyNames(e), o = a.length; o-- > 0; )
      s = a[o], (!n || n(s, e, t)) && !l[s] && (t[s] = e[s], l[s] = !0);
    e = r !== !1 && yt(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, Mn = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, $n = (e) => {
  if (!e) return null;
  if (Se(e)) return e;
  let t = e.length;
  if (!ur(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Fn = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && yt(Uint8Array)), Dn = (e, t) => {
  const n = (e && e[Ge]).call(e);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const o = a.value;
    t.call(e, o[0], o[1]);
  }
}, In = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, jn = ae("HTMLFormElement"), Bn = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, a) {
    return n.toUpperCase() + a;
  }
), $t = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), zn = ae("RegExp"), mr = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  $e(r, (a, o) => {
    let s;
    (s = t(a, o, e)) !== !1 && (n[o] = s || a);
  }), Object.defineProperties(e, n);
}, Un = (e) => {
  mr(e, (t, r) => {
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
}, _n = (e, t) => {
  const r = {}, n = (a) => {
    a.forEach((o) => {
      r[o] = !0;
    });
  };
  return Se(e) ? n(e) : n(String(e).split(t)), r;
}, Hn = () => {
}, qn = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Wn(e) {
  return !!(e && Z(e.append) && e[cr] === "FormData" && e[Ge]);
}
const Vn = (e) => {
  const t = new Array(10), r = (n, a) => {
    if (Me(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Le(n))
        return n;
      if (!("toJSON" in n)) {
        t[a] = n;
        const o = Se(n) ? [] : {};
        return $e(n, (s, l) => {
          const u = r(s, a + 1);
          !Ce(u) && (o[l] = u);
        }), t[a] = void 0, o;
      }
    }
    return n;
  };
  return r(e, 0);
}, Jn = ae("AsyncFunction"), Kn = (e) => e && (Me(e) || Z(e)) && Z(e.then) && Z(e.catch), pr = ((e, t) => e ? setImmediate : t ? ((r, n) => (ye.addEventListener("message", ({ source: a, data: o }) => {
  a === ye && o === r && n.length && n.shift()();
}, !1), (a) => {
  n.push(a), ye.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Z(ye.postMessage)
), Qn = typeof queueMicrotask < "u" ? queueMicrotask.bind(ye) : typeof process < "u" && process.nextTick || pr, Gn = (e) => e != null && Z(e[Ge]), p = {
  isArray: Se,
  isArrayBuffer: dr,
  isBuffer: Le,
  isFormData: kn,
  isArrayBufferView: fn,
  isString: mn,
  isNumber: ur,
  isBoolean: pn,
  isObject: Me,
  isPlainObject: _e,
  isEmptyObject: gn,
  isReadableStream: Cn,
  isRequest: En,
  isResponse: Sn,
  isHeaders: Rn,
  isUndefined: Ce,
  isDate: yn,
  isFile: bn,
  isBlob: xn,
  isRegExp: zn,
  isFunction: Z,
  isStream: vn,
  isURLSearchParams: Nn,
  isTypedArray: Fn,
  isFileList: wn,
  forEach: $e,
  merge: dt,
  extend: An,
  trim: Tn,
  stripBOM: Pn,
  inherits: On,
  toFlatObject: Ln,
  kindOf: Xe,
  kindOfTest: ae,
  endsWith: Mn,
  toArray: $n,
  forEachEntry: Dn,
  matchAll: In,
  isHTMLForm: jn,
  hasOwnProperty: $t,
  hasOwnProp: $t,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: mr,
  freezeMethods: Un,
  toObjectSet: _n,
  toCamelCase: Bn,
  noop: Hn,
  toFiniteNumber: qn,
  findKey: hr,
  global: ye,
  isContextDefined: fr,
  isSpecCompliantForm: Wn,
  toJSONObject: Vn,
  isAsyncFn: Jn,
  isThenable: Kn,
  setImmediate: pr,
  asap: Qn,
  isIterable: Gn
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
const gr = T.prototype, yr = {};
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
  yr[e] = { value: e };
});
Object.defineProperties(T, yr);
Object.defineProperty(gr, "isAxiosError", { value: !0 });
T.from = (e, t, r, n, a, o) => {
  const s = Object.create(gr);
  p.toFlatObject(e, s, function(d) {
    return d !== Error.prototype;
  }, (c) => c !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", u = t == null && e ? e.code : t;
  return T.call(s, l, u, r, n, a), e && s.cause == null && Object.defineProperty(s, "cause", { value: e, configurable: !0 }), s.name = e && e.name || "Error", o && Object.assign(s, o), s;
};
const Xn = null;
function ut(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function br(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ft(e, t, r) {
  return e ? e.concat(t).map(function(a, o) {
    return a = br(a), !r && o ? "[" + a + "]" : a;
  }).join(r ? "." : "") : t;
}
function Yn(e) {
  return p.isArray(e) && !e.some(ut);
}
const Zn = p.toFlatObject(p, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ze(e, t, r) {
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
      else if (p.isArray(h) && Yn(h) || (p.isFileList(h) || p.endsWith(b, "[]")) && (v = p.toArray(h)))
        return b = br(b), v.forEach(function(C, P) {
          !(p.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Ft([b], P, o) : s === null ? b : b + "[]",
            c(C)
          );
        }), !1;
    }
    return ut(h) ? !0 : (t.append(Ft(g, b, o), c(h)), !1);
  }
  const f = [], y = Object.assign(Zn, {
    defaultVisitor: d,
    convertValue: c,
    isVisitable: ut
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
function Dt(e) {
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
function bt(e, t) {
  this._pairs = [], e && Ze(e, this, t);
}
const xr = bt.prototype;
xr.append = function(t, r) {
  this._pairs.push([t, r]);
};
xr.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Dt);
  } : Dt;
  return this._pairs.map(function(a) {
    return r(a[0]) + "=" + r(a[1]);
  }, "").join("&");
};
function ea(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function wr(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || ea;
  p.isFunction(r) && (r = {
    serialize: r
  });
  const a = r && r.serialize;
  let o;
  if (a ? o = a(t, r) : o = p.isURLSearchParams(t) ? t.toString() : new bt(t, r).toString(n), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class It {
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
const vr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ta = typeof URLSearchParams < "u" ? URLSearchParams : bt, ra = typeof FormData < "u" ? FormData : null, na = typeof Blob < "u" ? Blob : null, aa = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ta,
    FormData: ra,
    Blob: na
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, xt = typeof window < "u" && typeof document < "u", ht = typeof navigator == "object" && navigator || void 0, sa = xt && (!ht || ["ReactNative", "NativeScript", "NS"].indexOf(ht.product) < 0), oa = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ia = xt && window.location.href || "http://localhost", la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: xt,
  hasStandardBrowserEnv: sa,
  hasStandardBrowserWebWorkerEnv: oa,
  navigator: ht,
  origin: ia
}, Symbol.toStringTag, { value: "Module" })), K = {
  ...la,
  ...aa
};
function ca(e, t) {
  return Ze(e, new K.classes.URLSearchParams(), {
    visitor: function(r, n, a, o) {
      return K.isNode && p.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function da(e) {
  return p.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ua(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const a = r.length;
  let o;
  for (n = 0; n < a; n++)
    o = r[n], t[o] = e[o];
  return t;
}
function kr(e) {
  function t(r, n, a, o) {
    let s = r[o++];
    if (s === "__proto__") return !0;
    const l = Number.isFinite(+s), u = o >= r.length;
    return s = !s && p.isArray(a) ? a.length : s, u ? (p.hasOwnProp(a, s) ? a[s] = [a[s], n] : a[s] = n, !l) : ((!a[s] || !p.isObject(a[s])) && (a[s] = []), t(r, n, a[s], o) && p.isArray(a[s]) && (a[s] = ua(a[s])), !l);
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const r = {};
    return p.forEachEntry(e, (n, a) => {
      t(da(n), a, r, 0);
    }), r;
  }
  return null;
}
function ha(e, t, r) {
  if (p.isString(e))
    try {
      return (t || JSON.parse)(e), p.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Fe = {
  transitional: vr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", a = n.indexOf("application/json") > -1, o = p.isObject(t);
    if (o && p.isHTMLForm(t) && (t = new FormData(t)), p.isFormData(t))
      return a ? JSON.stringify(kr(t)) : t;
    if (p.isArrayBuffer(t) || p.isBuffer(t) || p.isStream(t) || p.isFile(t) || p.isBlob(t) || p.isReadableStream(t))
      return t;
    if (p.isArrayBufferView(t))
      return t.buffer;
    if (p.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ca(t, this.formSerializer).toString();
      if ((l = p.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Ze(
          l ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return o || a ? (r.setContentType("application/json", !1), ha(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Fe.transitional, n = r && r.forcedJSONParsing, a = this.responseType === "json";
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
  Fe.headers[e] = {};
});
const fa = p.toObjectSet([
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
]), ma = (e) => {
  const t = {};
  let r, n, a;
  return e && e.split(`
`).forEach(function(s) {
    a = s.indexOf(":"), r = s.substring(0, a).trim().toLowerCase(), n = s.substring(a + 1).trim(), !(!r || t[r] && fa[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, jt = Symbol("internals");
function Ae(e) {
  return e && String(e).trim().toLowerCase();
}
function He(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(He) : String(e);
}
function pa(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const ga = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function st(e, t, r, n, a) {
  if (p.isFunction(n))
    return n.call(this, t, r);
  if (a && (t = r), !!p.isString(t)) {
    if (p.isString(n))
      return t.indexOf(n) !== -1;
    if (p.isRegExp(n))
      return n.test(t);
  }
}
function ya(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function ba(e, t) {
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
      const d = Ae(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const f = p.findKey(a, d);
      (!f || a[f] === void 0 || c === !0 || c === void 0 && a[f] !== !1) && (a[f || u] = He(l));
    }
    const s = (l, u) => p.forEach(l, (c, d) => o(c, d, u));
    if (p.isPlainObject(t) || t instanceof this.constructor)
      s(t, r);
    else if (p.isString(t) && (t = t.trim()) && !ga(t))
      s(ma(t), r);
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
    if (t = Ae(t), t) {
      const n = p.findKey(this, t);
      if (n) {
        const a = this[n];
        if (!r)
          return a;
        if (r === !0)
          return pa(a);
        if (p.isFunction(r))
          return r.call(this, a, n);
        if (p.isRegExp(r))
          return r.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Ae(t), t) {
      const n = p.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || st(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let a = !1;
    function o(s) {
      if (s = Ae(s), s) {
        const l = p.findKey(n, s);
        l && (!r || st(n, n[l], l, r)) && (delete n[l], a = !0);
      }
    }
    return p.isArray(t) ? t.forEach(o) : o(t), a;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, a = !1;
    for (; n--; ) {
      const o = r[n];
      (!t || st(this, this[o], o, t, !0)) && (delete this[o], a = !0);
    }
    return a;
  }
  normalize(t) {
    const r = this, n = {};
    return p.forEach(this, (a, o) => {
      const s = p.findKey(n, o);
      if (s) {
        r[s] = He(a), delete r[o];
        return;
      }
      const l = t ? ya(o) : String(o).trim();
      l !== o && delete r[o], r[l] = He(a), n[l] = !0;
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
    const n = (this[jt] = this[jt] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function o(s) {
      const l = Ae(s);
      n[l] || (ba(a, s), n[l] = !0);
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
function ot(e, t) {
  const r = this || Fe, n = t || r, a = ee.from(n.headers);
  let o = n.data;
  return p.forEach(e, function(l) {
    o = l.call(r, o, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), o;
}
function Nr(e) {
  return !!(e && e.__CANCEL__);
}
function Re(e, t, r) {
  T.call(this, e ?? "canceled", T.ERR_CANCELED, t, r), this.name = "CanceledError";
}
p.inherits(Re, T, {
  __CANCEL__: !0
});
function Cr(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new T(
    "Request failed with status code " + r.status,
    [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function xa(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function wa(e, t) {
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
function va(e, t) {
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
const Ke = (e, t, r = 3) => {
  let n = 0;
  const a = wa(50, 250);
  return va((o) => {
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
}, Bt = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, zt = (e) => (...t) => p.asap(() => e(...t)), ka = K.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, K.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(K.origin),
  K.navigator && /(msie|trident)/i.test(K.navigator.userAgent)
) : () => !0, Na = K.hasStandardBrowserEnv ? (
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
function Ca(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ea(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Er(e, t, r) {
  let n = !Ca(t);
  return e && (n || r == !1) ? Ea(e, t) : t;
}
const Ut = (e) => e instanceof ee ? { ...e } : e;
function ve(e, t) {
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
    headers: (c, d, f) => a(Ut(c), Ut(d), f, !0)
  };
  return p.forEach(Object.keys({ ...e, ...t }), function(d) {
    const f = u[d] || a, y = f(e[d], t[d], d);
    p.isUndefined(y) && f !== l || (r[d] = y);
  }), r;
}
const Sr = (e) => {
  const t = ve({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: a, xsrfCookieName: o, headers: s, auth: l } = t;
  if (t.headers = s = ee.from(s), t.url = wr(Er(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && s.set(
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
  if (K.hasStandardBrowserEnv && (n && p.isFunction(n) && (n = n(t)), n || n !== !1 && ka(t.url))) {
    const u = a && o && Na.read(o);
    u && s.set(a, u);
  }
  return t;
}, Sa = typeof XMLHttpRequest < "u", Ra = Sa && function(e) {
  return new Promise(function(r, n) {
    const a = Sr(e);
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
      Cr(function(O) {
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
      const E = a.transitional || vr;
      a.timeoutErrorMessage && (P = a.timeoutErrorMessage), n(new T(
        P,
        E.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
        e,
        g
      )), g = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in g && p.forEach(s.toJSON(), function(P, E) {
      g.setRequestHeader(E, P);
    }), p.isUndefined(a.withCredentials) || (g.withCredentials = !!a.withCredentials), l && l !== "json" && (g.responseType = a.responseType), c && ([y, h] = Ke(c, !0), g.addEventListener("progress", y)), u && g.upload && ([f, k] = Ke(u), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", k)), (a.cancelToken || a.signal) && (d = (C) => {
      g && (n(!C || C.type ? new Re(null, e, g) : C), g.abort(), g = null);
    }, a.cancelToken && a.cancelToken.subscribe(d), a.signal && (a.signal.aborted ? d() : a.signal.addEventListener("abort", d)));
    const N = xa(a.url);
    if (N && K.protocols.indexOf(N) === -1) {
      n(new T("Unsupported protocol " + N + ":", T.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(o || null);
  });
}, Ta = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), a;
    const o = function(c) {
      if (!a) {
        a = !0, l();
        const d = c instanceof Error ? c : this.reason;
        n.abort(d instanceof T ? d : new Re(d instanceof Error ? d.message : d));
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
}, Aa = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, a;
  for (; n < r; )
    a = n + t, yield e.slice(n, a), n = a;
}, Pa = async function* (e, t) {
  for await (const r of Oa(e))
    yield* Aa(r, t);
}, Oa = async function* (e) {
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
}, _t = (e, t, r, n) => {
  const a = Pa(e, t);
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
}, Ht = 64 * 1024, { isFunction: ze } = p, La = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(p.global), {
  ReadableStream: qt,
  TextEncoder: Wt
} = p.global, Vt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Ma = (e) => {
  e = p.merge.call({
    skipUndefined: !0
  }, La, e);
  const { fetch: t, Request: r, Response: n } = e, a = t ? ze(t) : typeof fetch == "function", o = ze(r), s = ze(n);
  if (!a)
    return !1;
  const l = a && ze(qt), u = a && (typeof Wt == "function" ? /* @__PURE__ */ ((h) => (b) => h.encode(b))(new Wt()) : async (h) => new Uint8Array(await new r(h).arrayBuffer())), c = o && l && Vt(() => {
    let h = !1;
    const b = new r(K.origin, {
      body: new qt(),
      method: "POST",
      get duplex() {
        return h = !0, "half";
      }
    }).headers.has("Content-Type");
    return h && !b;
  }), d = s && l && Vt(() => p.isReadableStream(new n("").body)), f = {
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
      headers: F,
      withCredentials: D = "same-origin",
      fetchOptions: z
    } = Sr(h), Y = t || fetch;
    O = O ? (O + "").toLowerCase() : "text";
    let Q = Ta([N, C && C.toAbortSignal()], P), j = null;
    const R = Q && Q.unsubscribe && (() => {
      Q.unsubscribe();
    });
    let S;
    try {
      if (w && c && g !== "get" && g !== "head" && (S = await k(F, v)) !== 0) {
        let re = new r(b, {
          method: "POST",
          body: v,
          duplex: "half"
        }), oe;
        if (p.isFormData(v) && (oe = re.headers.get("content-type")) && F.setContentType(oe), re.body) {
          const [q, me] = Bt(
            S,
            Ke(zt(w))
          );
          v = _t(re.body, Ht, q, me);
        }
      }
      p.isString(D) || (D = D ? "include" : "omit");
      const L = o && "credentials" in r.prototype, B = {
        ...z,
        signal: Q,
        method: g.toUpperCase(),
        headers: F.normalize().toJSON(),
        body: v,
        duplex: "half",
        credentials: L ? D : void 0
      };
      j = o && new r(b, B);
      let _ = await (o ? Y(j, z) : Y(b, B));
      const se = d && (O === "stream" || O === "response");
      if (d && (E || se && R)) {
        const re = {};
        ["status", "statusText", "headers"].forEach((I) => {
          re[I] = _[I];
        });
        const oe = p.toFiniteNumber(_.headers.get("content-length")), [q, me] = E && Bt(
          oe,
          Ke(zt(E), !0)
        ) || [];
        _ = new n(
          _t(_.body, Ht, q, () => {
            me && me(), R && R();
          }),
          re
        );
      }
      O = O || "text";
      let ne = await f[p.findKey(f, O) || "text"](_, h);
      return !se && R && R(), await new Promise((re, oe) => {
        Cr(re, oe, {
          data: ne,
          headers: ee.from(_.headers),
          status: _.status,
          statusText: _.statusText,
          config: h,
          request: j
        });
      });
    } catch (L) {
      throw R && R(), L && L.name === "TypeError" && /Load failed|fetch/i.test(L.message) ? Object.assign(
        new T("Network Error", T.ERR_NETWORK, h, j),
        {
          cause: L.cause || L
        }
      ) : T.from(L, L && L.code, h, j);
    }
  };
}, $a = /* @__PURE__ */ new Map(), Rr = (e) => {
  let t = e ? e.env : {};
  const { fetch: r, Request: n, Response: a } = t, o = [
    n,
    a,
    r
  ];
  let s = o.length, l = s, u, c, d = $a;
  for (; l--; )
    u = o[l], c = d.get(u), c === void 0 && d.set(u, c = l ? /* @__PURE__ */ new Map() : Ma(t)), d = c;
  return c;
};
Rr();
const ft = {
  http: Xn,
  xhr: Ra,
  fetch: {
    get: Rr
  }
};
p.forEach(ft, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Jt = (e) => `- ${e}`, Fa = (e) => p.isFunction(e) || e === null || e === !1, Tr = {
  getAdapter: (e, t) => {
    e = p.isArray(e) ? e : [e];
    const { length: r } = e;
    let n, a;
    const o = {};
    for (let s = 0; s < r; s++) {
      n = e[s];
      let l;
      if (a = n, !Fa(n) && (a = ft[(l = String(n)).toLowerCase()], a === void 0))
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
` + s.map(Jt).join(`
`) : " " + Jt(s[0]) : "as no adapter specified";
      throw new T(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: ft
};
function it(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Re(null, e);
}
function Kt(e) {
  return it(e), e.headers = ee.from(e.headers), e.data = ot.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Tr.getAdapter(e.adapter || Fe.adapter, e)(e).then(function(n) {
    return it(e), n.data = ot.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ee.from(n.headers), n;
  }, function(n) {
    return Nr(n) || (it(e), n && n.response && (n.response.data = ot.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ee.from(n.response.headers))), Promise.reject(n);
  });
}
const Ar = "1.12.2", et = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  et[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Qt = {};
et.transitional = function(t, r, n) {
  function a(o, s) {
    return "[Axios v" + Ar + "] Transitional option '" + o + "'" + s + (n ? ". " + n : "");
  }
  return (o, s, l) => {
    if (t === !1)
      throw new T(
        a(s, " has been removed" + (r ? " in " + r : "")),
        T.ERR_DEPRECATED
      );
    return r && !Qt[s] && (Qt[s] = !0, console.warn(
      a(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(o, s, l) : !0;
  };
};
et.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Da(e, t, r) {
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
const qe = {
  assertOptions: Da,
  validators: et
}, le = qe.validators;
let be = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new It(),
      response: new It()
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
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = ve(this.defaults, r);
    const { transitional: n, paramsSerializer: a, headers: o } = r;
    n !== void 0 && qe.assertOptions(n, {
      silentJSONParsing: le.transitional(le.boolean),
      forcedJSONParsing: le.transitional(le.boolean),
      clarifyTimeoutError: le.transitional(le.boolean)
    }, !1), a != null && (p.isFunction(a) ? r.paramsSerializer = {
      serialize: a
    } : qe.assertOptions(a, {
      encode: le.function,
      serialize: le.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), qe.assertOptions(r, {
      baseUrl: le.spelling("baseURL"),
      withXsrfToken: le.spelling("withXSRFToken")
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
      const h = [Kt.bind(this), void 0];
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
      d = Kt.call(this, k);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, y = c.length; f < y; )
      d = d.then(c[f++], c[f++]);
    return d;
  }
  getUri(t) {
    t = ve(this.defaults, t);
    const r = Er(t.baseURL, t.url, t.allowAbsoluteUrls);
    return wr(r, t.params, t.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(t) {
  be.prototype[t] = function(r, n) {
    return this.request(ve(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(o, s, l) {
      return this.request(ve(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  be.prototype[t] = r(), be.prototype[t + "Form"] = r(!0);
});
let Ia = class Pr {
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
      n.reason || (n.reason = new Re(o, s, l), r(n.reason));
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
      token: new Pr(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
};
function ja(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Ba(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const mt = {
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
Object.entries(mt).forEach(([e, t]) => {
  mt[t] = e;
});
function Or(e) {
  const t = new be(e), r = lr(be.prototype.request, t);
  return p.extend(r, be.prototype, t, { allOwnKeys: !0 }), p.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(a) {
    return Or(ve(e, a));
  }, r;
}
const U = Or(Fe);
U.Axios = be;
U.CanceledError = Re;
U.CancelToken = Ia;
U.isCancel = Nr;
U.VERSION = Ar;
U.toFormData = Ze;
U.AxiosError = T;
U.Cancel = U.CanceledError;
U.all = function(t) {
  return Promise.all(t);
};
U.spread = ja;
U.isAxiosError = Ba;
U.mergeConfig = ve;
U.AxiosHeaders = ee;
U.formToJSON = (e) => kr(p.isHTMLForm(e) ? new FormData(e) : e);
U.getAdapter = Tr.getAdapter;
U.HttpStatusCode = mt;
U.default = U;
const {
  Axios: xo,
  AxiosError: wo,
  CanceledError: vo,
  isCancel: ko,
  CancelToken: No,
  VERSION: Co,
  all: Eo,
  Cancel: So,
  isAxiosError: Ro,
  spread: To,
  toFormData: Ao,
  AxiosHeaders: Po,
  HttpStatusCode: Oo,
  formToJSON: Lo,
  getAdapter: Mo,
  mergeConfig: $o
} = U;
class za {
  constructor(t, r) {
    at(this, "baseUrl");
    at(this, "client");
    if (!t || !r)
      throw new Error("baseUrl and apiKey are required");
    this.baseUrl = t.endsWith("/") ? t.slice(0, -1) : t, this.client = U.create({
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
const Lr = (e) => {
  const [t, r] = M(null), [n, a] = M([]), [o, s] = M([]), [l, u] = M([]), [c, d] = M([]), [f, y] = M(!1), [k, h] = M(null);
  we(() => {
    if (e.baseUrl && e.apiKey)
      try {
        const R = new za(
          e.baseUrl,
          e.apiKey
        );
        r(R), h(null);
      } catch (R) {
        h(R.message);
      }
  }, [e.baseUrl, e.apiKey]);
  const b = X((R) => {
    h(R.message || "An error occurred"), y(!1);
  }, []), g = X(() => {
    h(null);
  }, []), v = X(
    async (R, S) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const L = await t.createInstance(R, S);
        return await z(), L;
      } catch (L) {
        throw b(L), L;
      } finally {
        y(!1);
      }
    },
    [t]
  ), N = X(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const S = await t.deleteInstance(R);
        return await z(), S;
      } catch (S) {
        throw b(S), S;
      } finally {
        y(!1);
      }
    },
    [t]
  ), C = X(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.connectInstance(R);
      } catch (S) {
        throw b(S), S;
      } finally {
        y(!1);
      }
    },
    [t]
  ), P = X(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        y(!0), h(null);
        const S = await t.disconnectInstance(R);
        return await z(), S;
      } catch (S) {
        throw b(S), S;
      } finally {
        y(!1);
      }
    },
    [t]
  ), E = X(
    async (R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.getInstanceStatus(R);
      } catch (S) {
        throw b(S), S;
      }
    },
    [t]
  ), w = X(
    async (R, S, L) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.sendMessage(R, S, L);
      } catch (B) {
        throw b(B), B;
      } finally {
        y(!1);
      }
    },
    [t]
  ), O = X(
    async (R, S, L, B = "image", _ = "") => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return y(!0), h(null), await t.sendMedia(
          R,
          S,
          L,
          B,
          _
        );
      } catch (se) {
        throw b(se), se;
      } finally {
        y(!1);
      }
    },
    [t]
  ), F = X(
    async (R, S, L = 50) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.getChatMessages(
          R,
          S,
          L
        );
      } catch (B) {
        throw b(B), B;
      }
    },
    [t]
  ), D = X(
    async (R, S, L, B) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return h(null), await t.markAsRead(
          R,
          S,
          L,
          B
        );
      } catch (_) {
        throw b(_), _;
      }
    },
    [t]
  ), z = X(async () => {
    if (t)
      try {
        y(!0), h(null);
        const R = await t.listInstances();
        a(R);
      } catch (R) {
        b(R);
      } finally {
        y(!1);
      }
  }, [t]), Y = X(
    async (R) => {
      if (t)
        try {
          y(!0), h(null);
          const S = await t.getContacts(R);
          u(S);
        } catch (S) {
          b(S);
        } finally {
          y(!1);
        }
    },
    [t]
  ), Q = X(
    async (R) => {
      if (t)
        try {
          y(!0), h(null);
          const S = await t.getChats(R);
          d(S);
        } catch (S) {
          b(S);
        } finally {
          y(!1);
        }
    },
    [t]
  ), j = X(
    async (R, S, L = 50) => {
      if (t)
        try {
          y(!0), h(null);
          const B = await t.getChatMessages(
            R,
            S,
            L
          );
          s(B);
        } catch (B) {
          b(B);
        } finally {
          y(!1);
        }
    },
    [t]
  );
  return we(() => {
    t && z();
  }, [t, z]), {
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
    getChatMessages: F,
    markAsRead: D,
    // Data fetching methods
    refreshInstances: z,
    refreshContacts: Y,
    refreshChats: Q,
    refreshMessages: j,
    // Utility methods
    clearError: g,
    setLoading: y
  };
}, wt = () => {
  const e = on(ir);
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
function W(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ue(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function pt({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function vt(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substring(n), e = e.substring(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Mr(e, t, r = "/") {
  return Ua(e, t, r, !1);
}
function Ua(e, t, r, n) {
  let a = typeof t == "string" ? vt(t) : t, o = pe(a.pathname || "/", r);
  if (o == null)
    return null;
  let s = $r(e);
  _a(s);
  let l = null;
  for (let u = 0; l == null && u < s.length; ++u) {
    let c = Za(o);
    l = Xa(
      s[u],
      c,
      n
    );
  }
  return l;
}
function $r(e, t = [], r = [], n = "", a = !1) {
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
      W(
        d.relativePath.startsWith(n),
        `Absolute route path "${d.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), d.relativePath = d.relativePath.slice(n.length);
    }
    let f = de([n, d.relativePath]), y = r.concat(d);
    s.children && s.children.length > 0 && (W(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${f}".`
    ), $r(
      s.children,
      t,
      y,
      f,
      u
    )), !(s.path == null && !s.index) && t.push({
      path: f,
      score: Qa(f, s.index),
      routesMeta: y
    });
  };
  return e.forEach((s, l) => {
    var u;
    if (s.path === "" || !((u = s.path) != null && u.includes("?")))
      o(s, l);
    else
      for (let c of Fr(s.path))
        o(s, l, !0, c);
  }), t;
}
function Fr(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), o = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [o, ""] : [o];
  let s = Fr(n.join("/")), l = [];
  return l.push(
    ...s.map(
      (u) => u === "" ? o : [o, u].join("/")
    )
  ), a && l.push(...s), l.map(
    (u) => e.startsWith("/") && u === "" ? "/" : u
  );
}
function _a(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : Ga(
      t.routesMeta.map((n) => n.childrenIndex),
      r.routesMeta.map((n) => n.childrenIndex)
    )
  );
}
var Ha = /^:[\w-]+$/, qa = 3, Wa = 2, Va = 1, Ja = 10, Ka = -2, Gt = (e) => e === "*";
function Qa(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Gt) && (n += Ka), t && (n += Wa), r.filter((a) => !Gt(a)).reduce(
    (a, o) => a + (Ha.test(o) ? qa : o === "" ? Va : Ja),
    n
  );
}
function Ga(e, t) {
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
function Xa(e, t, r = !1) {
  let { routesMeta: n } = e, a = {}, o = "/", s = [];
  for (let l = 0; l < n.length; ++l) {
    let u = n[l], c = l === n.length - 1, d = o === "/" ? t : t.slice(o.length) || "/", f = Qe(
      { path: u.relativePath, caseSensitive: u.caseSensitive, end: c },
      d
    ), y = u.route;
    if (!f && c && r && !n[n.length - 1].route.index && (f = Qe(
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
      pathname: de([o, f.pathname]),
      pathnameBase: ns(
        de([o, f.pathnameBase])
      ),
      route: y
    }), f.pathnameBase !== "/" && (o = de([o, f.pathnameBase]));
  }
  return s;
}
function Qe(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = Ya(
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
function Ya(e, t = !1, r = !0) {
  ue(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, l, u) => (n.push({ paramName: l, isOptional: u != null }), u ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (n.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function Za(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return ue(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function pe(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function es(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? vt(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : ts(r, t) : t,
    search: as(n),
    hash: ss(a)
  };
}
function ts(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function lt(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function rs(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function Dr(e) {
  let t = rs(e);
  return t.map(
    (r, n) => n === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Ir(e, t, r, n = !1) {
  let a;
  typeof e == "string" ? a = vt(e) : (a = { ...e }, W(
    !a.pathname || !a.pathname.includes("?"),
    lt("?", "pathname", "search", a)
  ), W(
    !a.pathname || !a.pathname.includes("#"),
    lt("#", "pathname", "hash", a)
  ), W(
    !a.search || !a.search.includes("#"),
    lt("#", "search", "hash", a)
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
  let u = es(a, l), c = s && s !== "/" && s.endsWith("/"), d = (o || s === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (c || d) && (u.pathname += "/"), u;
}
var de = (e) => e.join("/").replace(/\/\/+/g, "/"), ns = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), as = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, ss = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function os(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var jr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  jr
);
var is = [
  "GET",
  ...jr
];
new Set(is);
var Te = x.createContext(null);
Te.displayName = "DataRouter";
var tt = x.createContext(null);
tt.displayName = "DataRouterState";
x.createContext(!1);
var Br = x.createContext({
  isTransitioning: !1
});
Br.displayName = "ViewTransition";
var ls = x.createContext(
  /* @__PURE__ */ new Map()
);
ls.displayName = "Fetchers";
var cs = x.createContext(null);
cs.displayName = "Await";
var he = x.createContext(
  null
);
he.displayName = "Navigation";
var kt = x.createContext(
  null
);
kt.displayName = "Location";
var fe = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
fe.displayName = "Route";
var Nt = x.createContext(null);
Nt.displayName = "RouteError";
function ds(e, { relative: t } = {}) {
  W(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = x.useContext(he), { hash: a, pathname: o, search: s } = De(e, { relative: t }), l = o;
  return r !== "/" && (l = o === "/" ? r : de([r, o])), n.createHref({ pathname: l, search: s, hash: a });
}
function rt() {
  return x.useContext(kt) != null;
}
function ke() {
  return W(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(kt).location;
}
var zr = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ur(e) {
  x.useContext(he).static || x.useLayoutEffect(e);
}
function us() {
  let { isDataRoute: e } = x.useContext(fe);
  return e ? Cs() : hs();
}
function hs() {
  W(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = x.useContext(Te), { basename: t, navigator: r } = x.useContext(he), { matches: n } = x.useContext(fe), { pathname: a } = ke(), o = JSON.stringify(Dr(n)), s = x.useRef(!1);
  return Ur(() => {
    s.current = !0;
  }), x.useCallback(
    (u, c = {}) => {
      if (ue(s.current, zr), !s.current) return;
      if (typeof u == "number") {
        r.go(u);
        return;
      }
      let d = Ir(
        u,
        JSON.parse(o),
        a,
        c.relative === "path"
      );
      e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : de([t, d.pathname])), (c.replace ? r.replace : r.push)(
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
function De(e, { relative: t } = {}) {
  let { matches: r } = x.useContext(fe), { pathname: n } = ke(), a = JSON.stringify(Dr(r));
  return x.useMemo(
    () => Ir(
      e,
      JSON.parse(a),
      n,
      t === "path"
    ),
    [e, a, n, t]
  );
}
function fs(e, t, r, n, a) {
  W(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = x.useContext(he), { matches: s } = x.useContext(fe), l = s[s.length - 1], u = l ? l.params : {}, c = l ? l.pathname : "/", d = l ? l.pathnameBase : "/", f = l && l.route;
  {
    let N = f && f.path || "";
    _r(
      c,
      !f || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = ke(), k;
  k = y;
  let h = k.pathname || "/", b = h;
  if (d !== "/") {
    let N = d.replace(/^\//, "").split("/");
    b = "/" + h.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let g = Mr(e, { pathname: b });
  return ue(
    f || g != null,
    `No routes matched location "${k.pathname}${k.search}${k.hash}" `
  ), ue(
    g == null || g[g.length - 1].route.element !== void 0 || g[g.length - 1].route.Component !== void 0 || g[g.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${k.pathname}${k.search}${k.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), bs(
    g && g.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, u, N.params),
        pathname: de([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? d : de([
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
function ms() {
  let e = Ns(), t = os(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: n }, o = { padding: "2px 4px", backgroundColor: n }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), s = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: o }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: o }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ x.createElement("pre", { style: a }, r) : null, s);
}
var ps = /* @__PURE__ */ x.createElement(ms, null), gs = class extends x.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ x.createElement(fe.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      Nt.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function ys({ routeContext: e, match: t, children: r }) {
  let n = x.useContext(Te);
  return n && n.static && n.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (n.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ x.createElement(fe.Provider, { value: e }, r);
}
function bs(e, t = [], r = null, n = null, a = null) {
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
    W(
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
      r && (y = s && d.route.id ? s[d.route.id] : void 0, h = d.route.errorElement || ps, l && (u < 0 && f === 0 ? (_r(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), k = !0, b = null) : u === f && (k = !0, b = d.route.hydrateFallbackElement || null)));
      let g = t.concat(o.slice(0, f + 1)), v = () => {
        let N;
        return y ? N = h : k ? N = b : d.route.Component ? N = /* @__PURE__ */ x.createElement(d.route.Component, null) : d.route.element ? N = d.route.element : N = c, /* @__PURE__ */ x.createElement(
          ys,
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
        gs,
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
function Ct(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function xs(e) {
  let t = x.useContext(Te);
  return W(t, Ct(e)), t;
}
function ws(e) {
  let t = x.useContext(tt);
  return W(t, Ct(e)), t;
}
function vs(e) {
  let t = x.useContext(fe);
  return W(t, Ct(e)), t;
}
function Et(e) {
  let t = vs(e), r = t.matches[t.matches.length - 1];
  return W(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function ks() {
  return Et(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ns() {
  var n;
  let e = x.useContext(Nt), t = ws(
    "useRouteError"
    /* UseRouteError */
  ), r = Et(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (n = t.errors) == null ? void 0 : n[r];
}
function Cs() {
  let { router: e } = xs(
    "useNavigate"
    /* UseNavigateStable */
  ), t = Et(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return Ur(() => {
    r.current = !0;
  }), x.useCallback(
    async (a, o = {}) => {
      ue(r.current, zr), r.current && (typeof a == "number" ? e.navigate(a) : await e.navigate(a, { fromRouteId: t, ...o }));
    },
    [e, t]
  );
}
var Xt = {};
function _r(e, t, r) {
  !t && !Xt[e] && (Xt[e] = !0, ue(!1, r));
}
x.memo(Es);
function Es({
  routes: e,
  future: t,
  state: r,
  unstable_onError: n
}) {
  return fs(e, void 0, r, n, t);
}
var We = "get", Ve = "application/x-www-form-urlencoded";
function nt(e) {
  return e != null && typeof e.tagName == "string";
}
function Ss(e) {
  return nt(e) && e.tagName.toLowerCase() === "button";
}
function Rs(e) {
  return nt(e) && e.tagName.toLowerCase() === "form";
}
function Ts(e) {
  return nt(e) && e.tagName.toLowerCase() === "input";
}
function As(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ps(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !As(e);
}
var Ue = null;
function Os() {
  if (Ue === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ue = !1;
    } catch {
      Ue = !0;
    }
  return Ue;
}
var Ls = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function ct(e) {
  return e != null && !Ls.has(e) ? (ue(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ve}"`
  ), null) : e;
}
function Ms(e, t) {
  let r, n, a, o, s;
  if (Rs(e)) {
    let l = e.getAttribute("action");
    n = l ? pe(l, t) : null, r = e.getAttribute("method") || We, a = ct(e.getAttribute("enctype")) || Ve, o = new FormData(e);
  } else if (Ss(e) || Ts(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let u = e.getAttribute("formaction") || l.getAttribute("action");
    if (n = u ? pe(u, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || We, a = ct(e.getAttribute("formenctype")) || ct(l.getAttribute("enctype")) || Ve, o = new FormData(l, e), !Os()) {
      let { name: c, type: d, value: f } = e;
      if (d === "image") {
        let y = c ? `${c}.` : "";
        o.append(`${y}x`, "0"), o.append(`${y}y`, "0");
      } else c && o.append(c, f);
    }
  } else {
    if (nt(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = We, n = null, a = Ve, s = e;
  }
  return o && a === "text/plain" && (s = o, o = void 0), { action: n, method: r.toLowerCase(), encType: a, formData: o, body: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function St(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function $s(e, t, r) {
  let n = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return n.pathname === "/" ? n.pathname = `_root.${r}` : t && pe(n.pathname, t) === "/" ? n.pathname = `${t.replace(/\/$/, "")}/_root.${r}` : n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`, n;
}
async function Fs(e, t) {
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
function Ds(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function Is(e, t, r) {
  let n = await Promise.all(
    e.map(async (a) => {
      let o = t.routes[a.route.id];
      if (o) {
        let s = await Fs(o, r);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Us(
    n.flat(1).filter(Ds).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function Yt(e, t, r, n, a, o) {
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
function js(e, t, { includeHydrateFallback: r } = {}) {
  return Bs(
    e.map((n) => {
      let a = t.routes[n.route.id];
      if (!a) return [];
      let o = [a.module];
      return a.clientActionModule && (o = o.concat(a.clientActionModule)), a.clientLoaderModule && (o = o.concat(a.clientLoaderModule)), r && a.hydrateFallbackModule && (o = o.concat(a.hydrateFallbackModule)), a.imports && (o = o.concat(a.imports)), o;
    }).flat(1)
  );
}
function Bs(e) {
  return [...new Set(e)];
}
function zs(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let n of r)
    t[n] = e[n];
  return t;
}
function Us(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((n, a) => {
    let o = JSON.stringify(zs(a));
    return r.has(o) || (r.add(o), n.push({ key: o, link: a })), n;
  }, []);
}
function Hr() {
  let e = x.useContext(Te);
  return St(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function _s() {
  let e = x.useContext(tt);
  return St(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Rt = x.createContext(void 0);
Rt.displayName = "FrameworkContext";
function qr() {
  let e = x.useContext(Rt);
  return St(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function Hs(e, t) {
  let r = x.useContext(Rt), [n, a] = x.useState(!1), [o, s] = x.useState(!1), { onFocus: l, onBlur: u, onMouseEnter: c, onMouseLeave: d, onTouchStart: f } = t, y = x.useRef(null);
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
      onFocus: Pe(l, k),
      onBlur: Pe(u, h),
      onMouseEnter: Pe(c, k),
      onMouseLeave: Pe(d, h),
      onTouchStart: Pe(f, k)
    }
  ] : [!1, y, {}];
}
function Pe(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function qs({ page: e, ...t }) {
  let { router: r } = Hr(), n = x.useMemo(
    () => Mr(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return n ? /* @__PURE__ */ x.createElement(Vs, { page: e, matches: n, ...t }) : null;
}
function Ws(e) {
  let { manifest: t, routeModules: r } = qr(), [n, a] = x.useState([]);
  return x.useEffect(() => {
    let o = !1;
    return Is(e, t, r).then(
      (s) => {
        o || a(s);
      }
    ), () => {
      o = !0;
    };
  }, [e, t, r]), n;
}
function Vs({
  page: e,
  matches: t,
  ...r
}) {
  let n = ke(), { manifest: a, routeModules: o } = qr(), { basename: s } = Hr(), { loaderData: l, matches: u } = _s(), c = x.useMemo(
    () => Yt(
      e,
      t,
      u,
      a,
      n,
      "data"
    ),
    [e, t, u, a, n]
  ), d = x.useMemo(
    () => Yt(
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
    let g = $s(e, s, "data");
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
    () => js(d, a),
    [d, a]
  ), k = Ws(d);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, f.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })), y.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "modulepreload", href: h, ...r })), k.map(({ key: h, link: b }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement("link", { key: h, nonce: r.nonce, ...b })
  )));
}
function Js(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var Wr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Wr && (window.__reactRouterVersion = // @ts-expect-error
  "7.9.3");
} catch {
}
var Vr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Tt = x.forwardRef(
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
    let { basename: h } = x.useContext(he), b = typeof c == "string" && Vr.test(c), g, v = !1;
    if (typeof c == "string" && b && (g = c, Wr))
      try {
        let D = new URL(window.location.href), z = c.startsWith("//") ? new URL(D.protocol + c) : new URL(c), Y = pe(z.pathname, h);
        z.origin === D.origin && Y != null ? c = Y + z.search + z.hash : v = !0;
      } catch {
        ue(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let N = ds(c, { relative: a }), [C, P, E] = Hs(
      n,
      y
    ), w = Xs(c, {
      replace: s,
      state: l,
      target: u,
      preventScrollReset: d,
      relative: a,
      viewTransition: f
    });
    function O(D) {
      t && t(D), D.defaultPrevented || w(D);
    }
    let F = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...y,
          ...E,
          href: g || N,
          onClick: v || o ? t : O,
          ref: Js(k, P),
          target: u,
          "data-discover": !b && r === "render" ? "true" : void 0
        }
      )
    );
    return C && !b ? /* @__PURE__ */ x.createElement(x.Fragment, null, F, /* @__PURE__ */ x.createElement(qs, { page: N })) : F;
  }
);
Tt.displayName = "Link";
var Ks = x.forwardRef(
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
    let f = De(s, { relative: c.relative }), y = ke(), k = x.useContext(tt), { navigator: h, basename: b } = x.useContext(he), g = k != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ro(f) && l === !0, v = h.encodeLocation ? h.encodeLocation(f).pathname : f.pathname, N = y.pathname, C = k && k.navigation && k.navigation.location ? k.navigation.location.pathname : null;
    r || (N = N.toLowerCase(), C = C ? C.toLowerCase() : null, v = v.toLowerCase()), C && b && (C = pe(C, b) || C);
    const P = v !== "/" && v.endsWith("/") ? v.length - 1 : v.length;
    let E = N === v || !a && N.startsWith(v) && N.charAt(P) === "/", w = C != null && (C === v || !a && C.startsWith(v) && C.charAt(v.length) === "/"), O = {
      isActive: E,
      isPending: w,
      isTransitioning: g
    }, F = E ? t : void 0, D;
    typeof n == "function" ? D = n(O) : D = [
      n,
      E ? "active" : null,
      w ? "pending" : null,
      g ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let z = typeof o == "function" ? o(O) : o;
    return /* @__PURE__ */ x.createElement(
      Tt,
      {
        ...c,
        "aria-current": F,
        className: D,
        ref: d,
        style: z,
        to: s,
        viewTransition: l
      },
      typeof u == "function" ? u(O) : u
    );
  }
);
Ks.displayName = "NavLink";
var Qs = x.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: n,
    replace: a,
    state: o,
    method: s = We,
    action: l,
    onSubmit: u,
    relative: c,
    preventScrollReset: d,
    viewTransition: f,
    ...y
  }, k) => {
    let h = eo(), b = to(l, { relative: c }), g = s.toLowerCase() === "get" ? "get" : "post", v = typeof l == "string" && Vr.test(l), N = (C) => {
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
Qs.displayName = "Form";
function Gs(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Jr(e) {
  let t = x.useContext(Te);
  return W(t, Gs(e)), t;
}
function Xs(e, {
  target: t,
  replace: r,
  state: n,
  preventScrollReset: a,
  relative: o,
  viewTransition: s
} = {}) {
  let l = us(), u = ke(), c = De(e, { relative: o });
  return x.useCallback(
    (d) => {
      if (Ps(d, t)) {
        d.preventDefault();
        let f = r !== void 0 ? r : pt(u) === pt(c);
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
var Ys = 0, Zs = () => `__${String(++Ys)}__`;
function eo() {
  let { router: e } = Jr(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = x.useContext(he), r = ks();
  return x.useCallback(
    async (n, a = {}) => {
      let { action: o, method: s, encType: l, formData: u, body: c } = Ms(
        n,
        t
      );
      if (a.navigate === !1) {
        let d = a.fetcherKey || Zs();
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
function to(e, { relative: t } = {}) {
  let { basename: r } = x.useContext(he), n = x.useContext(fe);
  W(n, "useFormAction must be used inside a RouteContext");
  let [a] = n.matches.slice(-1), o = { ...De(e || ".", { relative: t }) }, s = ke();
  if (e == null) {
    o.search = s.search;
    let l = new URLSearchParams(o.search), u = l.getAll("index");
    if (u.some((d) => d === "")) {
      l.delete("index"), u.filter((f) => f).forEach((f) => l.append("index", f));
      let d = l.toString();
      o.search = d ? `?${d}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (o.pathname = o.pathname === "/" ? r : de([r, o.pathname])), pt(o);
}
function ro(e, { relative: t } = {}) {
  let r = x.useContext(Br);
  W(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = Jr(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = De(e, { relative: t });
  if (!r.isTransitioning)
    return !1;
  let o = pe(r.currentLocation.pathname, n) || r.currentLocation.pathname, s = pe(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Qe(a.pathname, s) != null || Qe(a.pathname, o) != null;
}
function Kr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Kr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function H() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Kr(e)) && (n && (n += " "), n += t);
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
      className: H("border rounded-lg shadow-sm p-6", e),
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
      className: H(s, l[e], u[t], r),
      style: c(),
      disabled: a,
      ...o,
      children: n
    }
  );
}, ce = ({ size: e = "md", className: t }) => /* @__PURE__ */ i(
  "div",
  {
    className: H(
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
var no = {
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
const ao = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), V = (e, t) => {
  const r = ln(
    ({ color: n = "currentColor", size: a = 24, strokeWidth: o = 2, absoluteStrokeWidth: s, className: l = "", children: u, ...c }, d) => Mt(
      "svg",
      {
        ref: d,
        ...no,
        width: a,
        height: a,
        stroke: n,
        strokeWidth: s ? Number(o) * 24 / Number(a) : o,
        className: ["lucide", `lucide-${ao(e)}`, l].join(" "),
        ...c
      },
      [
        ...t.map(([f, y]) => Mt(f, y)),
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
const Zt = V("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const er = V("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = V("Download", [
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
const Qr = V("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = V("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const so = V("Monitor", [
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
const rr = V("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pt = V("Palette", [
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
const Gr = V("Pause", [
  ["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }],
  ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gt = V("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = V("RefreshCw", [
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
const nr = V("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xr = V("Settings", [
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
const oo = V("Smartphone", [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ar = V("Sun", [
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
const Yr = V("Trash2", [
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
const Zr = V("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]), io = ({
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
      className: H(
        "transition-all duration-200",
        s.bg,
        s.border
      ),
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center justify-between p-4 pb-3", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ i("div", { className: H("w-3 h-3 rounded-full", s.badge) }),
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
            /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(ce, { size: "md" }) }),
            /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: s.text })
          ] }),
          s.showStats && /* @__PURE__ */ m("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(Zr, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
              ] }),
              /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: e.contactsCount || 0 })
            ] }),
            /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
              /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ i(At, { className: "w-4 h-4 text-green-500" }),
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
                  /* @__PURE__ */ i(Gr, { className: "w-4 h-4" }),
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
                  /* @__PURE__ */ i(Qr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Conectar" })
                ]
              }
            ),
            /* @__PURE__ */ i(Tt, { to: `/controller/${e.name}`, children: /* @__PURE__ */ m(
              A,
              {
                size: "sm",
                variant: "ghost",
                className: "flex items-center space-x-1",
                children: [
                  /* @__PURE__ */ i(so, { className: "w-4 h-4" }),
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
                  /* @__PURE__ */ i(Xr, { className: "w-4 h-4" }),
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
                  /* @__PURE__ */ i(Yr, { className: "w-4 h-4" }),
                  /* @__PURE__ */ i("span", { children: "Excluir" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}, Oe = ({
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
      className: H(
        "relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",
        n
      ),
      children: /* @__PURE__ */ i("div", { className: "p-6", children: r })
    }
  )
] }) }) : null, Ee = ({
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
      className: H(
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
      className: H(
        "mt-1 text-xs",
        r ? "text-danger-500" : "text-gray-500 dark:text-gray-400"
      ),
      children: t
    }
  )
] }), en = ({
  isOpen: e,
  onClose: t,
  onSubmit: r,
  defaultName: n = ""
}) => {
  const [a, o] = M(n), [s, l] = M(!1);
  return /* @__PURE__ */ i(
    Oe,
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
            Ee,
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
                children: s ? /* @__PURE__ */ i(ce, { size: "sm" }) : "Criar"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}, lo = ({
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
      /* @__PURE__ */ i(ce, { size: "lg", className: "mb-2" }),
      /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Gerando QR Code..." })
    ] })
  }
), co = ({
  isOpen: e,
  onClose: t,
  instanceName: r,
  qrCode: n
}) => /* @__PURE__ */ i(Oe, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(te, { className: "max-w-md p-0 text-center", children: /* @__PURE__ */ m("div", { className: "p-6", children: [
  /* @__PURE__ */ m("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: [
    "Conectar: ",
    r
  ] }),
  /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-6", children: "Escaneie o QR Code com seu WhatsApp" }),
  /* @__PURE__ */ i("div", { className: "mb-6", children: /* @__PURE__ */ i(lo, { qrCode: n }) }),
  /* @__PURE__ */ i(A, { variant: "secondary", onClick: t, children: "Fechar" })
] }) }) }), tn = ({
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
  return /* @__PURE__ */ i(Oe, { isOpen: e, onClose: t, children: /* @__PURE__ */ i(te, { className: "max-w-lg p-0", children: /* @__PURE__ */ m("div", { className: "p-6", children: [
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
        Ee,
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
}, Ot = ({
  checked: e,
  onCheckedChange: t,
  disabled: r = !1,
  className: n
}) => /* @__PURE__ */ i(
  "label",
  {
    className: H(
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
          className: H(
            "w-14 h-7 rounded-full transition-all duration-300 ease-in-out relative",
            e ? "bg-slate-700 dark:bg-slate-600" : "bg-amber-200 dark:bg-amber-300"
          ),
          children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: H(
                  "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center",
                  e ? "translate-x-7 left-0.5" : "translate-x-0 left-0.5"
                ),
                children: e ? /* @__PURE__ */ i(rr, { className: "w-3.5 h-3.5 text-slate-600", strokeWidth: 2.5 }) : /* @__PURE__ */ i(ar, { className: "w-3.5 h-3.5 text-amber-500", strokeWidth: 2.5 })
              }
            ),
            /* @__PURE__ */ m("div", { className: "absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none", children: [
              /* @__PURE__ */ i(
                ar,
                {
                  className: H(
                    "w-3 h-3 transition-opacity duration-300",
                    e ? "opacity-0" : "opacity-30 text-amber-600"
                  )
                }
              ),
              /* @__PURE__ */ i(
                rr,
                {
                  className: H(
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
), sr = {
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
}, or = {
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
}, rn = ({
  isOpen: e,
  onClose: t
}) => {
  const {
    theme: r,
    setCustomTheme: n,
    resetToDefaultTheme: a,
    isCustomTheme: o
  } = wt(), [s, l] = M(r), [u, c] = M(!1), [d, f] = M(!1);
  we(() => {
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
    const E = s.isDark ? or : sr;
    l({
      ...E,
      name: `default-${s.isDark ? "dark" : "light"}`
    });
  }, b = (E) => {
    const w = E ? or : sr;
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
  return /* @__PURE__ */ m(Oe, { isOpen: e, onClose: t, className: "max-w-2xl", children: [
    /* @__PURE__ */ m("div", { className: "p-2 w-full flex flex-col flex-1", children: [
      /* @__PURE__ */ m("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ i(Pt, { className: "w-6 h-6 text-primary-500" }),
        /* @__PURE__ */ i("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Personalizar Tema" })
      ] }),
      /* @__PURE__ */ i("div", { className: "mb-6  bg-gray-50 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ m("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ i("h3", { className: "font-semibold text-gray-900 dark:text-white", children: "Modo" }),
          /* @__PURE__ */ i("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Escolha entre tema claro ou escuro" })
        ] }),
        /* @__PURE__ */ i(
          Ot,
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
            Ee,
            {
              type: "color",
              value: s.colors[E],
              onChange: (F) => y(E, F.target.value),
              className: "w-12 h-10 p-1 border-2"
            }
          ),
          /* @__PURE__ */ i(
            Ee,
            {
              type: "text",
              value: s.colors[E],
              onChange: (F) => y(E, F.target.value),
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
                /* @__PURE__ */ i(nr, { className: "w-4 h-4" }),
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
                /* @__PURE__ */ i(tr, { className: "w-4 h-4" }),
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
      Oe,
      {
        isOpen: u,
        onClose: () => c(!1),
        className: "max-w-4xl",
        children: /* @__PURE__ */ m("div", { className: "p-6", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ i(tr, { className: "w-6 h-6 text-primary-500" }),
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
                children: d ? /* @__PURE__ */ i(Zt, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ i(er, { className: "w-4 h-4" })
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
                  /* @__PURE__ */ i(nr, { className: "w-4 h-4" }),
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
                  children: d ? /* @__PURE__ */ m(Lt, { children: [
                    /* @__PURE__ */ i(Zt, { className: "w-4 h-4" }),
                    "Copiado!"
                  ] }) : /* @__PURE__ */ m(Lt, { children: [
                    /* @__PURE__ */ i(er, { className: "w-4 h-4" }),
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
function Fo({
  baseUrl: e,
  apiKey: t,
  refreshInterval: r = 1e4,
  // Disponível para uso futuro
  autoRefresh: n = !1,
  // Disponível para uso futuro
  showCreateButton: a = !0,
  showThemeToggle: o = !1,
  showThemeCustomizer: s = !1,
  maxInstances: l,
  className: u,
  style: c,
  onInstanceCreated: d,
  onInstanceDeleted: f,
  onInstanceConnected: y
}) {
  const { theme: k, toggleTheme: h } = wt(), [b, g] = M(!1), [v, N] = M(null), [C, P] = M(null), [E, w] = M(null), [O, F] = M(!1), [D, z] = M({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: Y,
    instances: Q,
    loading: j,
    error: R,
    createInstance: S,
    deleteInstance: L,
    connectInstance: B,
    refreshInstances: _,
    clearError: se
  } = Lr({ baseUrl: e, apiKey: t }), ne = async (I) => {
    try {
      await S(I, "WHATSAPP-BAILEYS"), await _(), d == null || d(I);
    } catch (ie) {
      console.error("Erro ao criar instância:", ie);
    }
  }, re = async (I) => {
    var ie, Ie;
    try {
      const $ = await B(I), J = ((ie = $ == null ? void 0 : $.data) == null ? void 0 : ie.qrcode) || ((Ie = $ == null ? void 0 : $.data) == null ? void 0 : Ie.base64) || ($ == null ? void 0 : $.qrcode) || ($ == null ? void 0 : $.base64) || ($ == null ? void 0 : $.qr);
      J && (P(J), N(I), y == null || y(I));
    } catch (je) {
      console.error("Erro ao conectar instância:", je);
    }
  }, oe = async (I) => {
    if (window.confirm(
      `Tem certeza que deseja deletar a instância "${I}"?`
    ))
      try {
        await L(I), await _(), f == null || f(I);
      } catch (ie) {
        console.error("Erro ao deletar instância:", ie);
      }
  }, q = async (I) => {
    try {
      Y && Y.setInstanceSettings && (await Y.setInstanceSettings(I, D), w(null), alert("Configurações salvas com sucesso!"));
    } catch (ie) {
      console.error("Erro ao configurar instância:", ie), alert("Erro ao salvar configurações");
    }
  }, me = !l || Q.length < l;
  return j && Q.length === 0 ? /* @__PURE__ */ i(
    "div",
    {
      className: `flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900 ${u}`,
      style: c,
      children: /* @__PURE__ */ i(ce, { size: "lg" })
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: `min-h-screen p-4 ${u}`,
      style: { backgroundColor: "var(--theme-muted)", ...c },
      children: /* @__PURE__ */ m("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ m("div", { className: "flex justify-between items-center mb-8 flex-wrap gap-4", children: [
          /* @__PURE__ */ m("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [
            "Instâncias WhatsApp (",
            Q.length,
            l && `/${l}`,
            ")"
          ] }),
          /* @__PURE__ */ m("div", { className: "flex gap-4 flex-wrap items-center", children: [
            o && /* @__PURE__ */ i(
              Ot,
              {
                checked: k.isDark,
                onCheckedChange: h
              }
            ),
            s && /* @__PURE__ */ m(
              A,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => F(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(Pt, { className: "w-4 h-4" }),
                  "Personalizar"
                ]
              }
            ),
            /* @__PURE__ */ m(
              A,
              {
                variant: "secondary",
                size: "sm",
                onClick: _,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(Je, { className: "w-4 h-4" }),
                  "Atualizar"
                ]
              }
            ),
            a && me && /* @__PURE__ */ m(
              A,
              {
                variant: "primary",
                size: "sm",
                onClick: () => g(!0),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ i(gt, { className: "w-4 h-4" }),
                  "Nova Instância"
                ]
              }
            )
          ] })
        ] }),
        R && /* @__PURE__ */ i(te, { className: "mb-6 bg-danger-50 dark:bg-danger-500/10 border border-danger-500", children: /* @__PURE__ */ m("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ m("span", { className: "text-danger-600 dark:text-danger-400", children: [
            "❌ ",
            R
          ] }),
          /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: se, children: "✕" })
        ] }) }),
        j && /* @__PURE__ */ i("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ i(ce, { size: "md" }) }),
        l && Q.length >= l && /* @__PURE__ */ i(te, { className: "mb-6 bg-warning-50 dark:bg-warning-500/10 border border-warning-500", children: /* @__PURE__ */ m("span", { className: "text-warning-600 dark:text-warning-400", children: [
          "⚠️ Limite máximo de ",
          l,
          " instâncias atingido"
        ] }) }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Q.map((I) => /* @__PURE__ */ i(
          io,
          {
            instance: I,
            onConnect: () => re(I.name),
            onDelete: () => oe(I.name),
            onSettings: () => w(I.name)
          },
          I.name
        )) }),
        Q.length === 0 && !j && /* @__PURE__ */ m(te, { className: "text-center py-12", children: [
          /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(gt, { className: "w-16 h-16 mx-auto" }) }),
          /* @__PURE__ */ i("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-2", children: "Nenhuma instância encontrada" }),
          /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "Crie sua primeira instância WhatsApp para começar" }),
          a && /* @__PURE__ */ i(A, { variant: "primary", onClick: () => g(!0), children: "Criar Primeira Instância" })
        ] }),
        /* @__PURE__ */ i(
          en,
          {
            isOpen: b,
            onClose: () => g(!1),
            onSubmit: ne
          }
        ),
        v && C && /* @__PURE__ */ i(
          co,
          {
            isOpen: !!v,
            instanceName: v,
            qrCode: C,
            onClose: () => {
              N(null), P(null);
            }
          }
        ),
        E && /* @__PURE__ */ i(
          tn,
          {
            isOpen: !!E,
            instanceName: E,
            settings: D,
            onSettingsChange: z,
            onSave: () => q(E),
            onClose: () => w(null)
          }
        ),
        /* @__PURE__ */ i(
          rn,
          {
            isOpen: O,
            onClose: () => F(!1)
          }
        )
      ] })
    }
  );
}
const Do = ({
  baseUrl: e,
  apiKey: t,
  instanceId: r,
  showSettings: n = !0,
  showThemeToggle: a = !1,
  showThemeCustomizer: o = !1,
  autoRefresh: s = !0,
  refreshInterval: l = 1e4,
  onInstanceCreated: u,
  onInstanceDeleted: c,
  onInstanceConnected: d,
  className: f = "w-1/2 flex justify-center items-center",
  style: y
}) => {
  const [k, h] = M(!1), [b, g] = M(!1), [v, N] = M(null), [C, P] = M(!1), [E, w] = M(null), [O, F] = M(!1), [D, z] = M(!1), [Y, Q] = M({
    rejectCall: !1,
    msgCall: "Chamadas não são permitidas neste número.",
    groupsIgnore: !1,
    alwaysOnline: !1,
    readMessages: !1,
    readStatus: !1,
    syncFullHistory: !1
  }), {
    manager: j,
    instances: R,
    loading: S,
    error: L,
    createInstance: B,
    deleteInstance: _,
    connectInstance: se,
    refreshInstances: ne,
    clearError: re
  } = Lr({
    baseUrl: e,
    apiKey: t
  }), { toggleTheme: oe } = wt(), q = R.find(
    (J) => J.name === r
  );
  we(() => {
    if (!s) return;
    const J = setInterval(() => {
      ne();
    }, l);
    return () => clearInterval(J);
  }, [ne, s, l]), we(() => {
    ne();
  }, [r, ne]);
  const me = async (J) => {
    if (!j) {
      console.error("Manager não inicializado ainda. Aguarde...");
      return;
    }
    try {
      await B(J, "WHATSAPP-BAILEYS"), await ne(), u == null || u(J), h(!1);
    } catch (Be) {
      console.error("Erro ao criar instância:", Be);
    }
  }, I = async () => {
    var J, Be;
    if (r)
      try {
        console.log("Iniciando conexão para instância:", r), g(!0), N(null), w(null);
        const ge = await se(r);
        console.log("Resultado da conexão:", ge);
        const G = ge, Ne = ((J = G == null ? void 0 : G.data) == null ? void 0 : J.qrcode) || ((Be = G == null ? void 0 : G.data) == null ? void 0 : Be.base64) || (G == null ? void 0 : G.qrcode) || (G == null ? void 0 : G.base64) || (G == null ? void 0 : G.qr);
        console.log("QR Code extraído:", Ne ? "Presente" : "Ausente"), console.log("QR Code valor:", (Ne == null ? void 0 : Ne.substring(0, 100)) + "..."), g(!1), Ne ? (console.log("Definindo QR Code data..."), N(Ne), P(!1), console.log("Estados atualizados - QR definido, não conectando ainda"), d == null || d(r)) : console.error("QR Code não foi gerado na resposta:", ge);
      } catch (ge) {
        console.error("Erro ao conectar instância:", ge), g(!1), P(!1), N(null), w(
          ge instanceof Error ? ge.message : "Erro desconhecido ao conectar"
        );
      }
  }, ie = async () => {
    if (r && window.confirm(
      `Tem certeza que deseja deletar a instância "${r}"?`
    ))
      try {
        await _(r), await ne(), c == null || c(r);
      } catch (J) {
        console.error("Erro ao deletar instância:", J);
      }
  }, Ie = async () => {
    try {
      j && j.setInstanceSettings && r && (await j.setInstanceSettings(r, Y), F(!1), alert("Configurações salvas com sucesso!"));
    } catch (J) {
      console.error("Erro ao configurar instância:", J), alert("Erro ao salvar configurações");
    }
  }, je = () => E ? {
    text: "Erro na Conexão",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-500",
    showError: !0,
    expandCard: !0
  } : b ? {
    text: "Gerando QR Code...",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-500",
    showLoader: !0,
    expandCard: !0
  } : v && !C ? {
    text: "QR Code Gerado - Aguardando Conexão",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-500",
    showQR: !0,
    expandCard: !0
  } : C ? {
    text: "Conectando...",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-500",
    showLoader: !0,
    expandCard: !0
  } : (q == null ? void 0 : q.status) === "connected" ? {
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
    manager: !!j,
    loading: S,
    error: L,
    baseUrl: e,
    apiKey: t ? "Presente" : "Ausente"
  }), S || !j)
    return /* @__PURE__ */ i(
      "div",
      {
        className: `flex justify-center items-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg ${f}`,
        style: y,
        children: /* @__PURE__ */ m("div", { className: "text-center", children: [
          /* @__PURE__ */ i(ce, { size: "lg" }),
          /* @__PURE__ */ i("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: j ? "Carregando..." : "Inicializando Evolution Manager..." }),
          /* @__PURE__ */ m("div", { className: "mt-2 text-xs text-gray-500", children: [
            "BaseURL: ",
            e,
            " | API Key: ",
            t ? "Presente" : "Ausente"
          ] }),
          L && /* @__PURE__ */ m("div", { className: "mt-2 text-red-500 text-sm", children: [
            "Erro: ",
            L
          ] })
        ] })
      }
    );
  if (!q)
    return /* @__PURE__ */ i("div", { className: f, style: y, children: /* @__PURE__ */ m(te, { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center", children: [
      /* @__PURE__ */ i("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ i(oo, { className: "w-16 h-16 mx-auto" }) }),
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
            onClick: () => h(!0),
            disabled: !j,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ i(gt, { className: "w-4 h-4" }),
              j ? "Criar Instância" : "Inicializando..."
            ]
          }
        ),
        /* @__PURE__ */ m(
          A,
          {
            variant: "ghost",
            onClick: ne,
            disabled: !j,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ i(Je, { className: "w-4 h-4" }),
              "Atualizar"
            ]
          }
        )
      ] }),
      L && /* @__PURE__ */ m("div", { className: "mt-4 p-3 bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-lg flex justify-between items-center", children: [
        /* @__PURE__ */ m("span", { className: "text-danger-600 dark:text-danger-400 text-sm", children: [
          "❌ ",
          L
        ] }),
        /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: re, children: "✕" })
      ] }),
      /* @__PURE__ */ i(
        en,
        {
          isOpen: k,
          onClose: () => h(!1),
          onSubmit: me,
          defaultName: r
        }
      )
    ] }) });
  const $ = je();
  return /* @__PURE__ */ m("div", { className: f, style: y, children: [
    (a || o) && /* @__PURE__ */ m("div", { className: "fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: [
      a && /* @__PURE__ */ i(
        Ot,
        {
          checked: document.documentElement.classList.contains("dark"),
          onCheckedChange: oe
        }
      ),
      o && /* @__PURE__ */ i(
        A,
        {
          onClick: () => z(!0),
          size: "sm",
          variant: "ghost",
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ i(Pt, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ m(
      te,
      {
        className: H(
          "transition-all duration-200",
          $.bg,
          $.border,
          $.expandCard ? "min-h-[400px]" : ""
        ),
        children: [
          /* @__PURE__ */ m("div", { className: "flex items-center justify-between p-4 pb-3", children: [
            /* @__PURE__ */ m("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ i("div", { className: H("w-3 h-3 rounded-full", $.badge) }),
              /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: q.name })
            ] }),
            /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ i("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mr-2", children: $.text }),
              n && /* @__PURE__ */ i(
                A,
                {
                  onClick: () => F(!0),
                  size: "sm",
                  variant: "ghost",
                  className: "flex items-center justify-center",
                  disabled: S || b || C,
                  children: /* @__PURE__ */ i(Xr, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ i(
                A,
                {
                  onClick: ne,
                  size: "sm",
                  variant: "ghost",
                  className: "flex items-center justify-center",
                  disabled: S || b || C,
                  children: /* @__PURE__ */ i(Je, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ m("div", { className: "p-4 pt-0", children: [
            $.showQR && v && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-4", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ i(
                "img",
                {
                  src: v,
                  alt: "QR Code para conectar WhatsApp",
                  className: "w-48 h-48"
                }
              ) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs", children: "Escaneie com seu WhatsApp" })
            ] }),
            $.showLoader && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ i("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center", children: /* @__PURE__ */ i(ce, { size: "md" }) }),
              /* @__PURE__ */ i("p", { className: "text-sm text-gray-600 dark:text-gray-300 text-center", children: $.text })
            ] }),
            $.showError && E && /* @__PURE__ */ m("div", { className: "mb-4 flex flex-col items-center space-y-3", children: [
              /* @__PURE__ */ m("div", { className: "bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 flex flex-col items-center", children: [
                /* @__PURE__ */ i("div", { className: "text-red-500 text-4xl mb-2", children: "❌" }),
                /* @__PURE__ */ i("p", { className: "text-red-600 dark:text-red-400 text-center font-medium", children: E })
              ] }),
              /* @__PURE__ */ m(
                A,
                {
                  onClick: () => {
                    w(null), I();
                  },
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ i(Je, { className: "w-4 h-4" }),
                    "Tentar Novamente"
                  ]
                }
              )
            ] }),
            $.showStats && /* @__PURE__ */ m("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
              /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(Zr, { className: "w-4 h-4 text-blue-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Contatos" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: q.contactsCount || 0 })
              ] }),
              /* @__PURE__ */ m("div", { className: "bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ i(At, { className: "w-4 h-4 text-green-500" }),
                  /* @__PURE__ */ i("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Chats" })
                ] }),
                /* @__PURE__ */ i("p", { className: "text-lg font-semibold text-gray-900 dark:text-white mt-1", children: q.chatsCount || 0 })
              ] })
            ] }),
            /* @__PURE__ */ m("div", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4", children: [
              /* @__PURE__ */ m("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Integração:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: q.integration || "WHATSAPP-BAILEYS" })
              ] }),
              q.connectionState && /* @__PURE__ */ m("div", { children: [
                /* @__PURE__ */ i("span", { className: "font-medium", children: "Estado:" }),
                " ",
                /* @__PURE__ */ i("span", { className: "text-gray-900 dark:text-white", children: q.connectionState })
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
                  onClick: ie,
                  size: "sm",
                  variant: "danger",
                  className: "flex items-center space-x-1",
                  disabled: S || b || C,
                  children: [
                    /* @__PURE__ */ i(Yr, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Excluir" })
                  ]
                }
              ),
              q.status === "connected" ? /* @__PURE__ */ m(
                A,
                {
                  onClick: () => console.log("Disconnect not implemented yet"),
                  size: "sm",
                  variant: "secondary",
                  className: "flex items-center space-x-1",
                  disabled: S || b || C,
                  children: [
                    /* @__PURE__ */ i(Gr, { className: "w-4 h-4" }),
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
                  disabled: S || b || C,
                  children: [
                    /* @__PURE__ */ i(Qr, { className: "w-4 h-4" }),
                    /* @__PURE__ */ i("span", { children: "Conectar" })
                  ]
                }
              )
            ] }),
            L && /* @__PURE__ */ m("div", { className: "mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex justify-between items-center", children: [
              /* @__PURE__ */ m("span", { className: "text-red-600 dark:text-red-400 text-sm", children: [
                "❌ ",
                L
              ] }),
              /* @__PURE__ */ i(A, { variant: "ghost", size: "sm", onClick: re, children: "✕" })
            ] })
          ] })
        ]
      }
    ),
    O && /* @__PURE__ */ i(
      tn,
      {
        isOpen: O,
        instanceName: r,
        settings: Y,
        onSettingsChange: Q,
        onSave: Ie,
        onClose: () => F(!1)
      }
    ),
    D && /* @__PURE__ */ i(
      rn,
      {
        isOpen: D,
        onClose: () => z(!1)
      }
    )
  ] });
}, xe = ({
  variant: e = "default",
  children: t,
  className: r
}) => /* @__PURE__ */ i(
  "span",
  {
    className: H(
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
), uo = (e) => {
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
}, ho = (e) => {
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
}, Io = ({
  status: e,
  instanceName: t,
  lastUpdate: r
}) => {
  const n = uo(e), a = ho(e), o = (s) => {
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
      className: H(
        "flex items-center justify-between p-3 border rounded-lg",
        n.bg,
        n.border
      ),
      children: [
        /* @__PURE__ */ m("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i("div", { className: H("w-3 h-3 rounded-full", n.badge) }),
          /* @__PURE__ */ m("div", { children: [
            /* @__PURE__ */ i("p", { className: H("text-sm font-medium", n.text), children: a }),
            /* @__PURE__ */ i("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: t })
          ] })
        ] }),
        /* @__PURE__ */ m("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(xe, { variant: o(e), children: a }),
          r && /* @__PURE__ */ i("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: r.toLocaleTimeString() })
        ] })
      ]
    }
  );
}, jo = ({
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
  const [c, d] = M(""), [f, y] = M(!1), k = cn(null), h = () => {
    var w;
    (w = k.current) == null || w.scrollIntoView({ behavior: "smooth" });
  };
  we(() => {
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
    const O = ["Bytes", "KB", "MB", "GB"], F = Math.floor(Math.log(w) / Math.log(1024));
    return Math.round(w / Math.pow(1024, F) * 100) / 100 + " " + O[F];
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
    /* @__PURE__ */ i(ce, { size: "lg" }),
    /* @__PURE__ */ i("span", { className: "ml-3 text-gray-600 dark:text-gray-400", children: "Carregando mensagens..." })
  ] }) }) : t ? /* @__PURE__ */ m(te, { className: `flex flex-col h-96 ${u}`, children: [
    /* @__PURE__ */ m("div", { className: "flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ i("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Mensagens" }),
      /* @__PURE__ */ m("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ i(xe, { variant: "default", children: e }),
        /* @__PURE__ */ i(xe, { variant: "default", children: r.length })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      r.length === 0 ? /* @__PURE__ */ m("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ i("div", { className: "text-gray-400 mb-2", children: /* @__PURE__ */ i(At, { className: "w-12 h-12 mx-auto" }) }),
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
                    /* @__PURE__ */ i(xe, { variant: b(w.type), children: w.type }),
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
        Ee,
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
          children: f ? /* @__PURE__ */ i(ce, { size: "sm" }) : "📤"
        }
      )
    ] }) })
  ] }) : /* @__PURE__ */ i(te, { className: `p-6 ${u}`, children: /* @__PURE__ */ m("div", { className: "text-center py-8", children: [
    /* @__PURE__ */ i("div", { className: "text-6xl mb-4", children: "💬" }),
    /* @__PURE__ */ i("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Selecione um contato" }),
    /* @__PURE__ */ i("p", { className: "text-gray-500 dark:text-gray-400", children: "Escolha um contato para ver as mensagens." })
  ] }) });
}, Bo = ({
  instanceId: e,
  contacts: t = [],
  loading: r = !1,
  onContactSelect: n,
  onContactAction: a,
  showSearch: o = !0,
  showActions: s = !0,
  className: l
}) => {
  const [u, c] = M(""), [d, f] = M(null), y = t.filter(
    (g) => g.name.toLowerCase().includes(u.toLowerCase()) || g.phone.includes(u)
  ), k = (g) => g ? "success" : "default", h = (g) => {
    f(g.id), n == null || n(g);
  }, b = (g, v) => {
    a == null || a(g, v);
  };
  return r ? /* @__PURE__ */ i(te, { className: `p-6 ${l}`, children: /* @__PURE__ */ m("div", { className: "flex justify-center items-center py-8", children: [
    /* @__PURE__ */ i(ce, { size: "lg" }),
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
      /* @__PURE__ */ i(xe, { variant: "default", children: e })
    ] }),
    o && /* @__PURE__ */ i("div", { className: "mb-4", children: /* @__PURE__ */ i(
      Ee,
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
                g.isGroup && /* @__PURE__ */ m(xe, { variant: "default", children: [
                  "👥 ",
                  g.groupParticipants || 0
                ] }),
                /* @__PURE__ */ i(xe, { variant: k(g.isOnline), children: g.isOnline ? "Online" : "Offline" })
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
}, zo = {
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
}, Uo = {
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
  xe as Badge,
  A as Button,
  te as Card,
  Io as ConnectionStatus,
  Bo as ContactList,
  za as EvolutionManager,
  Ee as Input,
  io as InstanceCard,
  Do as InstanceController,
  Fo as InstanceManager,
  ce as Loading,
  jo as MessageList,
  Oe as Modal,
  lo as QRCodeDisplay,
  go as ThemeProvider,
  Uo as darkTheme,
  zo as defaultTheme,
  Lr as useEvolutionManager,
  wt as useTheme
};
