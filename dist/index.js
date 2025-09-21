var jr = Object.defineProperty;
var Mr = (e, t, n) => t in e ? jr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var kt = (e, t, n) => Mr(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as y, jsxs as _, Fragment as Br } from "react/jsx-runtime";
import de, { useMemo as Ur, useDebugValue as cn, createElement as Hr, useRef as qr, useContext as Un, createContext as Vr, useState as ge, useEffect as ln, useCallback as q } from "react";
var H = function() {
  return H = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, H.apply(this, arguments);
};
function ve(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
function Wr(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Jr = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Gr = /* @__PURE__ */ Wr(
  function(e) {
    return Jr.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), I = "-ms-", Ue = "-moz-", N = "-webkit-", Hn = "comm", ht = "rule", Xt = "decl", Kr = "@import", qn = "@keyframes", Yr = "@layer", Vn = Math.abs, Qt = String.fromCharCode, Ft = Object.assign;
function Xr(e, t) {
  return j(e, 0) ^ 45 ? (((t << 2 ^ j(e, 0)) << 2 ^ j(e, 1)) << 2 ^ j(e, 2)) << 2 ^ j(e, 3) : 0;
}
function Wn(e) {
  return e.trim();
}
function oe(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function A(e, t, n) {
  return e.replace(t, n);
}
function et(e, t, n) {
  return e.indexOf(t, n);
}
function j(e, t) {
  return e.charCodeAt(t) | 0;
}
function Ne(e, t, n) {
  return e.slice(t, n);
}
function re(e) {
  return e.length;
}
function Jn(e) {
  return e.length;
}
function Be(e, t) {
  return t.push(e), e;
}
function Qr(e, t) {
  return e.map(t).join("");
}
function un(e, t) {
  return e.filter(function(n) {
    return !oe(n, t);
  });
}
var pt = 1, Pe = 1, Gn = 0, Y = 0, z = 0, Fe = "";
function mt(e, t, n, r, o, s, i, a) {
  return { value: e, root: t, parent: n, type: r, props: o, children: s, line: pt, column: Pe, length: i, return: "", siblings: a };
}
function ue(e, t) {
  return Ft(mt("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function Oe(e) {
  for (; e.root; )
    e = ue(e.root, { children: [e] });
  Be(e, e.siblings);
}
function Zr() {
  return z;
}
function eo() {
  return z = Y > 0 ? j(Fe, --Y) : 0, Pe--, z === 10 && (Pe = 1, pt--), z;
}
function Q() {
  return z = Y < Gn ? j(Fe, Y++) : 0, Pe++, z === 10 && (Pe = 1, pt++), z;
}
function xe() {
  return j(Fe, Y);
}
function tt() {
  return Y;
}
function gt(e, t) {
  return Ne(Fe, e, t);
}
function zt(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function to(e) {
  return pt = Pe = 1, Gn = re(Fe = e), Y = 0, [];
}
function no(e) {
  return Fe = "", e;
}
function Ct(e) {
  return Wn(gt(Y - 1, Lt(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function ro(e) {
  for (; (z = xe()) && z < 33; )
    Q();
  return zt(e) > 2 || zt(z) > 3 ? "" : " ";
}
function oo(e, t) {
  for (; --t && Q() && !(z < 48 || z > 102 || z > 57 && z < 65 || z > 70 && z < 97); )
    ;
  return gt(e, tt() + (t < 6 && xe() == 32 && Q() == 32));
}
function Lt(e) {
  for (; Q(); )
    switch (z) {
      case e:
        return Y;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Lt(z);
        break;
      case 40:
        e === 41 && Lt(e);
        break;
      case 92:
        Q();
        break;
    }
  return Y;
}
function so(e, t) {
  for (; Q() && e + z !== 57; )
    if (e + z === 84 && xe() === 47)
      break;
  return "/*" + gt(t, Y - 1) + "*" + Qt(e === 47 ? e : Q());
}
function io(e) {
  for (; !zt(xe()); )
    Q();
  return gt(e, Y);
}
function ao(e) {
  return no(nt("", null, null, null, [""], e = to(e), 0, [0], e));
}
function nt(e, t, n, r, o, s, i, a, c) {
  for (var u = 0, f = 0, h = i, m = 0, x = 0, d = 0, p = 1, g = 1, E = 1, O = 0, $ = "", C = o, T = s, S = r, b = $; g; )
    switch (d = O, O = Q()) {
      case 40:
        if (d != 108 && j(b, h - 1) == 58) {
          et(b += A(Ct(O), "&", "&\f"), "&\f", Vn(u ? a[u - 1] : 0)) != -1 && (E = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        b += Ct(O);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        b += ro(d);
        break;
      case 92:
        b += oo(tt() - 1, 7);
        continue;
      case 47:
        switch (xe()) {
          case 42:
          case 47:
            Be(co(so(Q(), tt()), t, n, c), c);
            break;
          default:
            b += "/";
        }
        break;
      case 123 * p:
        a[u++] = re(b) * E;
      case 125 * p:
      case 59:
      case 0:
        switch (O) {
          case 0:
          case 125:
            g = 0;
          case 59 + f:
            E == -1 && (b = A(b, /\f/g, "")), x > 0 && re(b) - h && Be(x > 32 ? fn(b + ";", r, n, h - 1, c) : fn(A(b, " ", "") + ";", r, n, h - 2, c), c);
            break;
          case 59:
            b += ";";
          default:
            if (Be(S = dn(b, t, n, u, f, o, a, $, C = [], T = [], h, s), s), O === 123)
              if (f === 0)
                nt(b, t, S, S, C, s, h, a, T);
              else
                switch (m === 99 && j(b, 3) === 110 ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    nt(e, S, S, r && Be(dn(e, S, S, 0, 0, o, a, $, o, C = [], h, T), T), o, T, h, a, r ? C : T);
                    break;
                  default:
                    nt(b, S, S, S, [""], T, 0, a, T);
                }
        }
        u = f = x = 0, p = E = 1, $ = b = "", h = i;
        break;
      case 58:
        h = 1 + re(b), x = d;
      default:
        if (p < 1) {
          if (O == 123)
            --p;
          else if (O == 125 && p++ == 0 && eo() == 125)
            continue;
        }
        switch (b += Qt(O), O * p) {
          case 38:
            E = f > 0 ? 1 : (b += "\f", -1);
            break;
          case 44:
            a[u++] = (re(b) - 1) * E, E = 1;
            break;
          case 64:
            xe() === 45 && (b += Ct(Q())), m = xe(), f = h = re($ = b += io(tt())), O++;
            break;
          case 45:
            d === 45 && re(b) == 2 && (p = 0);
        }
    }
  return s;
}
function dn(e, t, n, r, o, s, i, a, c, u, f, h) {
  for (var m = o - 1, x = o === 0 ? s : [""], d = Jn(x), p = 0, g = 0, E = 0; p < r; ++p)
    for (var O = 0, $ = Ne(e, m + 1, m = Vn(g = i[p])), C = e; O < d; ++O)
      (C = Wn(g > 0 ? x[O] + " " + $ : A($, /&\f/g, x[O]))) && (c[E++] = C);
  return mt(e, t, n, o === 0 ? ht : a, c, u, f, h);
}
function co(e, t, n, r) {
  return mt(e, t, n, Hn, Qt(Zr()), Ne(e, 2, -2), 0, r);
}
function fn(e, t, n, r, o) {
  return mt(e, t, n, Xt, Ne(e, 0, r), Ne(e, r + 1, -1), r, o);
}
function Kn(e, t, n) {
  switch (Xr(e, t)) {
    case 5103:
      return N + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return N + e + e;
    case 4789:
      return Ue + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return N + e + Ue + e + I + e + e;
    case 5936:
      switch (j(e, t + 11)) {
        case 114:
          return N + e + I + A(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return N + e + I + A(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return N + e + I + A(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return N + e + I + e + e;
    case 6165:
      return N + e + I + "flex-" + e + e;
    case 5187:
      return N + e + A(e, /(\w+).+(:[^]+)/, N + "box-$1$2" + I + "flex-$1$2") + e;
    case 5443:
      return N + e + I + "flex-item-" + A(e, /flex-|-self/g, "") + (oe(e, /flex-|baseline/) ? "" : I + "grid-row-" + A(e, /flex-|-self/g, "")) + e;
    case 4675:
      return N + e + I + "flex-line-pack" + A(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return N + e + I + A(e, "shrink", "negative") + e;
    case 5292:
      return N + e + I + A(e, "basis", "preferred-size") + e;
    case 6060:
      return N + "box-" + A(e, "-grow", "") + N + e + I + A(e, "grow", "positive") + e;
    case 4554:
      return N + A(e, /([^-])(transform)/g, "$1" + N + "$2") + e;
    case 6187:
      return A(A(A(e, /(zoom-|grab)/, N + "$1"), /(image-set)/, N + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return A(e, /(image-set\([^]*)/, N + "$1$`$1");
    case 4968:
      return A(A(e, /(.+:)(flex-)?(.*)/, N + "box-pack:$3" + I + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + N + e + e;
    case 4200:
      if (!oe(e, /flex-|baseline/)) return I + "grid-column-align" + Ne(e, t) + e;
      break;
    case 2592:
    case 3360:
      return I + A(e, "template-", "") + e;
    case 4384:
    case 3616:
      return n && n.some(function(r, o) {
        return t = o, oe(r.props, /grid-\w+-end/);
      }) ? ~et(e + (n = n[t].value), "span", 0) ? e : I + A(e, "-start", "") + e + I + "grid-row-span:" + (~et(n, "span", 0) ? oe(n, /\d+/) : +oe(n, /\d+/) - +oe(e, /\d+/)) + ";" : I + A(e, "-start", "") + e;
    case 4896:
    case 4128:
      return n && n.some(function(r) {
        return oe(r.props, /grid-\w+-start/);
      }) ? e : I + A(A(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return A(e, /(.+)-inline(.+)/, N + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (re(e) - 1 - t > 6)
        switch (j(e, t + 1)) {
          case 109:
            if (j(e, t + 4) !== 45)
              break;
          case 102:
            return A(e, /(.+:)(.+)-([^]+)/, "$1" + N + "$2-$3$1" + Ue + (j(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~et(e, "stretch", 0) ? Kn(A(e, "stretch", "fill-available"), t, n) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return A(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, o, s, i, a, c, u) {
        return I + o + ":" + s + u + (i ? I + o + "-span:" + (a ? c : +c - +s) + u : "") + e;
      });
    case 4949:
      if (j(e, t + 6) === 121)
        return A(e, ":", ":" + N) + e;
      break;
    case 6444:
      switch (j(e, j(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return A(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + N + (j(e, 14) === 45 ? "inline-" : "") + "box$3$1" + N + "$2$3$1" + I + "$2box$3") + e;
        case 100:
          return A(e, ":", ":" + I) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return A(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function ct(e, t) {
  for (var n = "", r = 0; r < e.length; r++)
    n += t(e[r], r, e, t) || "";
  return n;
}
function lo(e, t, n, r) {
  switch (e.type) {
    case Yr:
      if (e.children.length) break;
    case Kr:
    case Xt:
      return e.return = e.return || e.value;
    case Hn:
      return "";
    case qn:
      return e.return = e.value + "{" + ct(e.children, r) + "}";
    case ht:
      if (!re(e.value = e.props.join(","))) return "";
  }
  return re(n = ct(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function uo(e) {
  var t = Jn(e);
  return function(n, r, o, s) {
    for (var i = "", a = 0; a < t; a++)
      i += e[a](n, r, o, s) || "";
    return i;
  };
}
function fo(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function ho(e, t, n, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case Xt:
        e.return = Kn(e.value, e.length, n);
        return;
      case qn:
        return ct([ue(e, { value: A(e.value, "@", "@" + N) })], r);
      case ht:
        if (e.length)
          return Qr(n = e.props, function(o) {
            switch (oe(o, r = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                Oe(ue(e, { props: [A(o, /:(read-\w+)/, ":" + Ue + "$1")] })), Oe(ue(e, { props: [o] })), Ft(e, { props: un(n, r) });
                break;
              case "::placeholder":
                Oe(ue(e, { props: [A(o, /:(plac\w+)/, ":" + N + "input-$1")] })), Oe(ue(e, { props: [A(o, /:(plac\w+)/, ":" + Ue + "$1")] })), Oe(ue(e, { props: [A(o, /:(plac\w+)/, I + "input-$1")] })), Oe(ue(e, { props: [o] })), Ft(e, { props: un(n, r) });
                break;
            }
            return "";
          });
    }
}
var po = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Ee = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", Yn = "active", Xn = "data-styled-version", yt = "6.1.19", Zt = `/*!sc*/
`, lt = typeof window < "u" && typeof document < "u", mo = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : process.env.NODE_ENV !== "production"), hn = /invalid hook call/i, Ke = /* @__PURE__ */ new Set(), go = function(e, t) {
  if (process.env.NODE_ENV !== "production") {
    var n = t ? ' with the id of "'.concat(t, '"') : "", r = "The component ".concat(e).concat(n, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.
See https://styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method for more info.
`, o = console.error;
    try {
      var s = !0;
      console.error = function(i) {
        for (var a = [], c = 1; c < arguments.length; c++) a[c - 1] = arguments[c];
        hn.test(i) ? (s = !1, Ke.delete(r)) : o.apply(void 0, ve([i], a, !1));
      }, qr(), s && !Ke.has(r) && (console.warn(r), Ke.add(r));
    } catch (i) {
      hn.test(i.message) && Ke.delete(r);
    } finally {
      console.error = o;
    }
  }
}, wt = Object.freeze([]), Ie = Object.freeze({});
function yo(e, t, n) {
  return n === void 0 && (n = Ie), e.theme !== n.theme && e.theme || t || n.theme;
}
var jt = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), wo = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, bo = /(^-|-$)/g;
function pn(e) {
  return e.replace(wo, "-").replace(bo, "");
}
var xo = /(a)(d)/gi, Ye = 52, mn = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Mt(e) {
  var t, n = "";
  for (t = Math.abs(e); t > Ye; t = t / Ye | 0) n = mn(t % Ye) + n;
  return (mn(t % Ye) + n).replace(xo, "$1-$2");
}
var At, Qn = 5381, ye = function(e, t) {
  for (var n = t.length; n; ) e = 33 * e ^ t.charCodeAt(--n);
  return e;
}, Zn = function(e) {
  return ye(Qn, e);
};
function er(e) {
  return Mt(Zn(e) >>> 0);
}
function tr(e) {
  return process.env.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function Ot(e) {
  return typeof e == "string" && (process.env.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var nr = typeof Symbol == "function" && Symbol.for, rr = nr ? Symbol.for("react.memo") : 60115, $o = nr ? Symbol.for("react.forward_ref") : 60112, So = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, vo = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, or = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Eo = ((At = {})[$o] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, At[rr] = or, At);
function gn(e) {
  return ("type" in (t = e) && t.type.$$typeof) === rr ? or : "$$typeof" in e ? Eo[e.$$typeof] : So;
  var t;
}
var Ro = Object.defineProperty, ko = Object.getOwnPropertyNames, yn = Object.getOwnPropertySymbols, Co = Object.getOwnPropertyDescriptor, Ao = Object.getPrototypeOf, wn = Object.prototype;
function sr(e, t, n) {
  if (typeof t != "string") {
    if (wn) {
      var r = Ao(t);
      r && r !== wn && sr(e, r, n);
    }
    var o = ko(t);
    yn && (o = o.concat(yn(t)));
    for (var s = gn(e), i = gn(t), a = 0; a < o.length; ++a) {
      var c = o[a];
      if (!(c in vo || n && n[c] || i && c in i || s && c in s)) {
        var u = Co(t, c);
        try {
          Ro(e, c, u);
        } catch {
        }
      }
    }
  }
  return e;
}
function Re(e) {
  return typeof e == "function";
}
function en(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function we(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function Bt(e, t) {
  if (e.length === 0) return "";
  for (var n = e[0], r = 1; r < e.length; r++) n += e[r];
  return n;
}
function _e(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Ut(e, t, n) {
  if (n === void 0 && (n = !1), !n && !_e(e) && !Array.isArray(e)) return t;
  if (Array.isArray(t)) for (var r = 0; r < t.length; r++) e[r] = Ut(e[r], t[r]);
  else if (_e(t)) for (var r in t) e[r] = Ut(e[r], t[r]);
  return e;
}
function tn(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var Oo = process.env.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

`, 2: `Can't collect styles once you've consumed a \`ServerStyleSheet\`'s styles! \`ServerStyleSheet\` is a one off instance for each server-side render cycle.

- Are you trying to reuse it across renders?
- Are you accidentally calling collectStyles twice?

`, 3: `Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.

`, 4: `The \`StyleSheetManager\` expects a valid target or sheet prop!

- Does this error occur on the client and is your target falsy?
- Does this error occur on the server and is the sheet falsy?

`, 5: `The clone method cannot be used on the client!

- Are you running in a client-like environment on the server?
- Are you trying to run SSR on the client?

`, 6: `Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?

`, 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: `ThemeProvider: Please make your "theme" prop an object.

`, 9: "Missing document `<head>`\n\n", 10: `Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021

`, 11: `_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.

`, 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: `%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.

`, 14: `ThemeProvider: "theme" prop is required.

`, 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: `Reached the limit of how many styled components may be created at group %s.
You may only create up to 1,073,741,824 components. If you're creating components dynamically,
as for instance in your render method then you may be running into this limitation.

`, 17: `CSSStyleSheet could not be found on HTMLStyleElement.
Has styled-components' style tag been unmounted or altered by another script?
`, 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
function To() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var n = e[0], r = [], o = 1, s = e.length; o < s; o += 1) r.push(e[o]);
  return r.forEach(function(i) {
    n = n.replace(/%[a-z]/, i);
  }), n;
}
function se(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  return process.env.NODE_ENV === "production" ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(To.apply(void 0, ve([Oo[e]], t, !1)).trim());
}
var No = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var n = 0, r = 0; r < t; r++) n += this.groupSizes[r];
    return n;
  }, e.prototype.insertRules = function(t, n) {
    if (t >= this.groupSizes.length) {
      for (var r = this.groupSizes, o = r.length, s = o; t >= s; ) if ((s <<= 1) < 0) throw se(16, "".concat(t));
      this.groupSizes = new Uint32Array(s), this.groupSizes.set(r), this.length = s;
      for (var i = o; i < s; i++) this.groupSizes[i] = 0;
    }
    for (var a = this.indexOfGroup(t + 1), c = (i = 0, n.length); i < c; i++) this.tag.insertRule(a, n[i]) && (this.groupSizes[t]++, a++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var n = this.groupSizes[t], r = this.indexOfGroup(t), o = r + n;
      this.groupSizes[t] = 0;
      for (var s = r; s < o; s++) this.tag.deleteRule(r);
    }
  }, e.prototype.getGroup = function(t) {
    var n = "";
    if (t >= this.length || this.groupSizes[t] === 0) return n;
    for (var r = this.groupSizes[t], o = this.indexOfGroup(t), s = o + r, i = o; i < s; i++) n += "".concat(this.tag.getRule(i)).concat(Zt);
    return n;
  }, e;
}(), Po = 1 << 30, rt = /* @__PURE__ */ new Map(), ut = /* @__PURE__ */ new Map(), ot = 1, Xe = function(e) {
  if (rt.has(e)) return rt.get(e);
  for (; ut.has(ot); ) ot++;
  var t = ot++;
  if (process.env.NODE_ENV !== "production" && ((0 | t) < 0 || t > Po)) throw se(16, "".concat(t));
  return rt.set(e, t), ut.set(t, e), t;
}, Io = function(e, t) {
  ot = t + 1, rt.set(e, t), ut.set(t, e);
}, _o = "style[".concat(Ee, "][").concat(Xn, '="').concat(yt, '"]'), Do = new RegExp("^".concat(Ee, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Fo = function(e, t, n) {
  for (var r, o = n.split(","), s = 0, i = o.length; s < i; s++) (r = o[s]) && e.registerName(t, r);
}, zo = function(e, t) {
  for (var n, r = ((n = t.textContent) !== null && n !== void 0 ? n : "").split(Zt), o = [], s = 0, i = r.length; s < i; s++) {
    var a = r[s].trim();
    if (a) {
      var c = a.match(Do);
      if (c) {
        var u = 0 | parseInt(c[1], 10), f = c[2];
        u !== 0 && (Io(f, u), Fo(e, f, c[3]), e.getTag().insertRules(u, o)), o.length = 0;
      } else o.push(a);
    }
  }
}, bn = function(e) {
  for (var t = document.querySelectorAll(_o), n = 0, r = t.length; n < r; n++) {
    var o = t[n];
    o && o.getAttribute(Ee) !== Yn && (zo(e, o), o.parentNode && o.parentNode.removeChild(o));
  }
};
function Lo() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var ir = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), o = function(a) {
    var c = Array.from(a.querySelectorAll("style[".concat(Ee, "]")));
    return c[c.length - 1];
  }(n), s = o !== void 0 ? o.nextSibling : null;
  r.setAttribute(Ee, Yn), r.setAttribute(Xn, yt);
  var i = Lo();
  return i && r.setAttribute("nonce", i), n.insertBefore(r, s), r;
}, jo = function() {
  function e(t) {
    this.element = ir(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(n) {
      if (n.sheet) return n.sheet;
      for (var r = document.styleSheets, o = 0, s = r.length; o < s; o++) {
        var i = r[o];
        if (i.ownerNode === n) return i;
      }
      throw se(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    try {
      return this.sheet.insertRule(n, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var n = this.sheet.cssRules[t];
    return n && n.cssText ? n.cssText : "";
  }, e;
}(), Mo = function() {
  function e(t) {
    this.element = ir(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    if (t <= this.length && t >= 0) {
      var r = document.createTextNode(n);
      return this.element.insertBefore(r, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}(), Bo = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    return t <= this.length && (this.rules.splice(t, 0, n), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}(), xn = lt, Uo = { isServer: !lt, useCSSOMInjection: !mo }, ar = function() {
  function e(t, n, r) {
    t === void 0 && (t = Ie), n === void 0 && (n = {});
    var o = this;
    this.options = H(H({}, Uo), t), this.gs = n, this.names = new Map(r), this.server = !!t.isServer, !this.server && lt && xn && (xn = !1, bn(this)), tn(this, function() {
      return function(s) {
        for (var i = s.getTag(), a = i.length, c = "", u = function(h) {
          var m = function(E) {
            return ut.get(E);
          }(h);
          if (m === void 0) return "continue";
          var x = s.names.get(m), d = i.getGroup(h);
          if (x === void 0 || !x.size || d.length === 0) return "continue";
          var p = "".concat(Ee, ".g").concat(h, '[id="').concat(m, '"]'), g = "";
          x !== void 0 && x.forEach(function(E) {
            E.length > 0 && (g += "".concat(E, ","));
          }), c += "".concat(d).concat(p, '{content:"').concat(g, '"}').concat(Zt);
        }, f = 0; f < a; f++) u(f);
        return c;
      }(o);
    });
  }
  return e.registerId = function(t) {
    return Xe(t);
  }, e.prototype.rehydrate = function() {
    !this.server && lt && bn(this);
  }, e.prototype.reconstructWithOptions = function(t, n) {
    return n === void 0 && (n = !0), new e(H(H({}, this.options), t), this.gs, n && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(n) {
      var r = n.useCSSOMInjection, o = n.target;
      return n.isServer ? new Bo(o) : r ? new jo(o) : new Mo(o);
    }(this.options), new No(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, n) {
    return this.names.has(t) && this.names.get(t).has(n);
  }, e.prototype.registerName = function(t, n) {
    if (Xe(t), this.names.has(t)) this.names.get(t).add(n);
    else {
      var r = /* @__PURE__ */ new Set();
      r.add(n), this.names.set(t, r);
    }
  }, e.prototype.insertRules = function(t, n, r) {
    this.registerName(t, n), this.getTag().insertRules(Xe(t), r);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(Xe(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}(), Ho = /&/g, qo = /^\s*\/\/.*$/gm;
function cr(e, t) {
  return e.map(function(n) {
    return n.type === "rule" && (n.value = "".concat(t, " ").concat(n.value), n.value = n.value.replaceAll(",", ",".concat(t, " ")), n.props = n.props.map(function(r) {
      return "".concat(t, " ").concat(r);
    })), Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = cr(n.children, t)), n;
  });
}
function Vo(e) {
  var t, n, r, o = Ie, s = o.options, i = s === void 0 ? Ie : s, a = o.plugins, c = a === void 0 ? wt : a, u = function(m, x, d) {
    return d.startsWith(n) && d.endsWith(n) && d.replaceAll(n, "").length > 0 ? ".".concat(t) : m;
  }, f = c.slice();
  f.push(function(m) {
    m.type === ht && m.value.includes("&") && (m.props[0] = m.props[0].replace(Ho, n).replace(r, u));
  }), i.prefix && f.push(ho), f.push(lo);
  var h = function(m, x, d, p) {
    x === void 0 && (x = ""), d === void 0 && (d = ""), p === void 0 && (p = "&"), t = p, n = x, r = new RegExp("\\".concat(n, "\\b"), "g");
    var g = m.replace(qo, ""), E = ao(d || x ? "".concat(d, " ").concat(x, " { ").concat(g, " }") : g);
    i.namespace && (E = cr(E, i.namespace));
    var O = [];
    return ct(E, uo(f.concat(fo(function($) {
      return O.push($);
    })))), O;
  };
  return h.hash = c.length ? c.reduce(function(m, x) {
    return x.name || se(15), ye(m, x.name);
  }, Qn).toString() : "", h;
}
var Wo = new ar(), Ht = Vo(), lr = de.createContext({ shouldForwardProp: void 0, styleSheet: Wo, stylis: Ht });
lr.Consumer;
de.createContext(void 0);
function $n() {
  return Un(lr);
}
var qt = function() {
  function e(t, n) {
    var r = this;
    this.inject = function(o, s) {
      s === void 0 && (s = Ht);
      var i = r.name + s.hash;
      o.hasNameForId(r.id, i) || o.insertRules(r.id, i, s(r.rules, i, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = n, tn(this, function() {
      throw se(12, String(r.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = Ht), this.name + t.hash;
  }, e;
}(), Jo = function(e) {
  return e >= "A" && e <= "Z";
};
function Sn(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e[n];
    if (n === 1 && r === "-" && e[0] === "-") return e;
    Jo(r) ? t += "-" + r.toLowerCase() : t += r;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var ur = function(e) {
  return e == null || e === !1 || e === "";
}, dr = function(e) {
  var t, n, r = [];
  for (var o in e) {
    var s = e[o];
    e.hasOwnProperty(o) && !ur(s) && (Array.isArray(s) && s.isCss || Re(s) ? r.push("".concat(Sn(o), ":"), s, ";") : _e(s) ? r.push.apply(r, ve(ve(["".concat(o, " {")], dr(s), !1), ["}"], !1)) : r.push("".concat(Sn(o), ": ").concat((t = o, (n = s) == null || typeof n == "boolean" || n === "" ? "" : typeof n != "number" || n === 0 || t in po || t.startsWith("--") ? String(n).trim() : "".concat(n, "px")), ";")));
  }
  return r;
};
function $e(e, t, n, r) {
  if (ur(e)) return [];
  if (en(e)) return [".".concat(e.styledComponentId)];
  if (Re(e)) {
    if (!Re(s = e) || s.prototype && s.prototype.isReactComponent || !t) return [e];
    var o = e(t);
    return process.env.NODE_ENV === "production" || typeof o != "object" || Array.isArray(o) || o instanceof qt || _e(o) || o === null || console.error("".concat(tr(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), $e(o, t, n, r);
  }
  var s;
  return e instanceof qt ? n ? (e.inject(n, r), [e.getName(r)]) : [e] : _e(e) ? dr(e) : Array.isArray(e) ? Array.prototype.concat.apply(wt, e.map(function(i) {
    return $e(i, t, n, r);
  })) : [e.toString()];
}
function Go(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (Re(n) && !en(n)) return !1;
  }
  return !0;
}
var Ko = Zn(yt), Yo = function() {
  function e(t, n, r) {
    this.rules = t, this.staticRulesId = "", this.isStatic = process.env.NODE_ENV === "production" && (r === void 0 || r.isStatic) && Go(t), this.componentId = n, this.baseHash = ye(Ko, n), this.baseStyle = r, ar.registerId(n);
  }
  return e.prototype.generateAndInjectStyles = function(t, n, r) {
    var o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, n, r) : "";
    if (this.isStatic && !r.hash) if (this.staticRulesId && n.hasNameForId(this.componentId, this.staticRulesId)) o = we(o, this.staticRulesId);
    else {
      var s = Bt($e(this.rules, t, n, r)), i = Mt(ye(this.baseHash, s) >>> 0);
      if (!n.hasNameForId(this.componentId, i)) {
        var a = r(s, ".".concat(i), void 0, this.componentId);
        n.insertRules(this.componentId, i, a);
      }
      o = we(o, i), this.staticRulesId = i;
    }
    else {
      for (var c = ye(this.baseHash, r.hash), u = "", f = 0; f < this.rules.length; f++) {
        var h = this.rules[f];
        if (typeof h == "string") u += h, process.env.NODE_ENV !== "production" && (c = ye(c, h));
        else if (h) {
          var m = Bt($e(h, t, n, r));
          c = ye(c, m + f), u += m;
        }
      }
      if (u) {
        var x = Mt(c >>> 0);
        n.hasNameForId(this.componentId, x) || n.insertRules(this.componentId, x, r(u, ".".concat(x), void 0, this.componentId)), o = we(o, x);
      }
    }
    return o;
  }, e;
}(), dt = de.createContext(void 0);
dt.Consumer;
function Xo(e) {
  var t = de.useContext(dt), n = Ur(function() {
    return function(r, o) {
      if (!r) throw se(14);
      if (Re(r)) {
        var s = r(o);
        if (process.env.NODE_ENV !== "production" && (s === null || Array.isArray(s) || typeof s != "object")) throw se(7);
        return s;
      }
      if (Array.isArray(r) || typeof r != "object") throw se(8);
      return o ? H(H({}, o), r) : r;
    }(e.theme, t);
  }, [e.theme, t]);
  return e.children ? de.createElement(dt.Provider, { value: n }, e.children) : null;
}
var Tt = {}, vn = /* @__PURE__ */ new Set();
function Qo(e, t, n) {
  var r = en(e), o = e, s = !Ot(e), i = t.attrs, a = i === void 0 ? wt : i, c = t.componentId, u = c === void 0 ? function(C, T) {
    var S = typeof C != "string" ? "sc" : pn(C);
    Tt[S] = (Tt[S] || 0) + 1;
    var b = "".concat(S, "-").concat(er(yt + S + Tt[S]));
    return T ? "".concat(T, "-").concat(b) : b;
  }(t.displayName, t.parentComponentId) : c, f = t.displayName, h = f === void 0 ? function(C) {
    return Ot(C) ? "styled.".concat(C) : "Styled(".concat(tr(C), ")");
  }(e) : f, m = t.displayName && t.componentId ? "".concat(pn(t.displayName), "-").concat(t.componentId) : t.componentId || u, x = r && o.attrs ? o.attrs.concat(a).filter(Boolean) : a, d = t.shouldForwardProp;
  if (r && o.shouldForwardProp) {
    var p = o.shouldForwardProp;
    if (t.shouldForwardProp) {
      var g = t.shouldForwardProp;
      d = function(C, T) {
        return p(C, T) && g(C, T);
      };
    } else d = p;
  }
  var E = new Yo(n, m, r ? o.componentStyle : void 0);
  function O(C, T) {
    return function(S, b, V) {
      var K = S.attrs, X = S.componentStyle, Ce = S.defaultProps, ae = S.foldedComponentIds, te = S.styledComponentId, v = S.target, R = de.useContext(dt), P = $n(), D = S.shouldForwardProp || P.shouldForwardProp;
      process.env.NODE_ENV !== "production" && cn(te);
      var M = yo(b, R, Ce) || Ie, B = function(pe, je, Je) {
        for (var Ae, me = H(H({}, je), { className: void 0, theme: Je }), Rt = 0; Rt < pe.length; Rt += 1) {
          var Ge = Re(Ae = pe[Rt]) ? Ae(me) : Ae;
          for (var le in Ge) me[le] = le === "className" ? we(me[le], Ge[le]) : le === "style" ? H(H({}, me[le]), Ge[le]) : Ge[le];
        }
        return je.className && (me.className = we(me.className, je.className)), me;
      }(K, b, M), fe = B.as || v, W = {};
      for (var L in B) B[L] === void 0 || L[0] === "$" || L === "as" || L === "theme" && B.theme === M || (L === "forwardedAs" ? W.as = B.forwardedAs : D && !D(L, fe) || (W[L] = B[L], D || process.env.NODE_ENV !== "development" || Gr(L) || vn.has(L) || !jt.has(fe) || (vn.add(L), console.warn('styled-components: it looks like an unknown prop "'.concat(L, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var he = function(pe, je) {
        var Je = $n(), Ae = pe.generateAndInjectStyles(je, Je.styleSheet, Je.stylis);
        return process.env.NODE_ENV !== "production" && cn(Ae), Ae;
      }(X, B);
      process.env.NODE_ENV !== "production" && S.warnTooManyClasses && S.warnTooManyClasses(he);
      var ce = we(ae, te);
      return he && (ce += " " + he), B.className && (ce += " " + B.className), W[Ot(fe) && !jt.has(fe) ? "class" : "className"] = ce, V && (W.ref = V), Hr(fe, W);
    }($, C, T);
  }
  O.displayName = h;
  var $ = de.forwardRef(O);
  return $.attrs = x, $.componentStyle = E, $.displayName = h, $.shouldForwardProp = d, $.foldedComponentIds = r ? we(o.foldedComponentIds, o.styledComponentId) : "", $.styledComponentId = m, $.target = r ? o.target : e, Object.defineProperty($, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(C) {
    this._foldedDefaultProps = r ? function(T) {
      for (var S = [], b = 1; b < arguments.length; b++) S[b - 1] = arguments[b];
      for (var V = 0, K = S; V < K.length; V++) Ut(T, K[V], !0);
      return T;
    }({}, o.defaultProps, C) : C;
  } }), process.env.NODE_ENV !== "production" && (go(h, m), $.warnTooManyClasses = /* @__PURE__ */ function(C, T) {
    var S = {}, b = !1;
    return function(V) {
      if (!b && (S[V] = !0, Object.keys(S).length >= 200)) {
        var K = T ? ' with the id of "'.concat(T, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(C).concat(K, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), b = !0, S = {};
      }
    };
  }(h, m)), tn($, function() {
    return ".".concat($.styledComponentId);
  }), s && sr($, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), $;
}
function En(e, t) {
  for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1) n.push(t[r], e[r + 1]);
  return n;
}
var Rn = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function fr(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  if (Re(e) || _e(e)) return Rn($e(En(wt, ve([e], t, !0))));
  var r = e;
  return t.length === 0 && r.length === 1 && typeof r[0] == "string" ? $e(r) : Rn($e(En(r, t)));
}
function Vt(e, t, n) {
  if (n === void 0 && (n = Ie), !t) throw se(1, t);
  var r = function(o) {
    for (var s = [], i = 1; i < arguments.length; i++) s[i - 1] = arguments[i];
    return e(t, n, fr.apply(void 0, ve([o], s, !1)));
  };
  return r.attrs = function(o) {
    return Vt(e, t, H(H({}, n), { attrs: Array.prototype.concat(n.attrs, o).filter(Boolean) }));
  }, r.withConfig = function(o) {
    return Vt(e, t, H(H({}, n), o));
  }, r;
}
var hr = function(e) {
  return Vt(Qo, e);
}, w = hr;
jt.forEach(function(e) {
  w[e] = hr(e);
});
function nn(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");
  var r = Bt(fr.apply(void 0, ve([e], t, !1))), o = er(r);
  return new qt(o, r);
}
process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var Qe = "__sc-".concat(Ee, "__");
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof window < "u" && (window[Qe] || (window[Qe] = 0), window[Qe] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window[Qe] += 1);
const pr = Vr(
  void 0
), _a = ({
  children: e,
  theme: t,
  toggleTheme: n
}) => /* @__PURE__ */ y(pr.Provider, { value: { theme: t, toggleTheme: n }, children: /* @__PURE__ */ y(Xo, { theme: t, children: e }) });
function mr(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Zo } = Object.prototype, { getPrototypeOf: rn } = Object, { iterator: bt, toStringTag: gr } = Symbol, xt = /* @__PURE__ */ ((e) => (t) => {
  const n = Zo.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Z = (e) => (e = e.toLowerCase(), (t) => xt(t) === e), $t = (e) => (t) => typeof t === e, { isArray: ze } = Array, De = $t("undefined");
function He(e) {
  return e !== null && !De(e) && e.constructor !== null && !De(e.constructor) && J(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const yr = Z("ArrayBuffer");
function es(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && yr(e.buffer), t;
}
const ts = $t("string"), J = $t("function"), wr = $t("number"), qe = (e) => e !== null && typeof e == "object", ns = (e) => e === !0 || e === !1, st = (e) => {
  if (xt(e) !== "object")
    return !1;
  const t = rn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(gr in e) && !(bt in e);
}, rs = (e) => {
  if (!qe(e) || He(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, os = Z("Date"), ss = Z("File"), is = Z("Blob"), as = Z("FileList"), cs = (e) => qe(e) && J(e.pipe), ls = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || J(e.append) && ((t = xt(e)) === "formdata" || // detect form-data instance
  t === "object" && J(e.toString) && e.toString() === "[object FormData]"));
}, us = Z("URLSearchParams"), [ds, fs, hs, ps] = ["ReadableStream", "Request", "Response", "Headers"].map(Z), ms = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ve(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), ze(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    if (He(e))
      return;
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let a;
    for (r = 0; r < i; r++)
      a = s[r], t.call(null, e[a], a, e);
  }
}
function br(e, t) {
  if (He(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const be = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, xr = (e) => !De(e) && e !== be;
function Wt() {
  const { caseless: e, skipUndefined: t } = xr(this) && this || {}, n = {}, r = (o, s) => {
    const i = e && br(n, s) || s;
    st(n[i]) && st(o) ? n[i] = Wt(n[i], o) : st(o) ? n[i] = Wt({}, o) : ze(o) ? n[i] = o.slice() : (!t || !De(o)) && (n[i] = o);
  };
  for (let o = 0, s = arguments.length; o < s; o++)
    arguments[o] && Ve(arguments[o], r);
  return n;
}
const gs = (e, t, n, { allOwnKeys: r } = {}) => (Ve(t, (o, s) => {
  n && J(o) ? e[s] = mr(o, n) : e[s] = o;
}, { allOwnKeys: r }), e), ys = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ws = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, bs = (e, t, n, r) => {
  let o, s, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      i = o[s], (!r || r(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && rn(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, xs = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, $s = (e) => {
  if (!e) return null;
  if (ze(e)) return e;
  let t = e.length;
  if (!wr(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Ss = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && rn(Uint8Array)), vs = (e, t) => {
  const r = (e && e[bt]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, Es = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Rs = Z("HTMLFormElement"), ks = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), kn = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Cs = Z("RegExp"), $r = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Ve(n, (o, s) => {
    let i;
    (i = t(o, s, e)) !== !1 && (r[s] = i || o);
  }), Object.defineProperties(e, r);
}, As = (e) => {
  $r(e, (t, n) => {
    if (J(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (J(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Os = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return ze(e) ? r(e) : r(String(e).split(t)), n;
}, Ts = () => {
}, Ns = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Ps(e) {
  return !!(e && J(e.append) && e[gr] === "FormData" && e[bt]);
}
const Is = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (qe(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (He(r))
        return r;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = ze(r) ? [] : {};
        return Ve(r, (i, a) => {
          const c = n(i, o + 1);
          !De(c) && (s[a] = c);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, _s = Z("AsyncFunction"), Ds = (e) => e && (qe(e) || J(e)) && J(e.then) && J(e.catch), Sr = ((e, t) => e ? setImmediate : t ? ((n, r) => (be.addEventListener("message", ({ source: o, data: s }) => {
  o === be && s === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), be.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  J(be.postMessage)
), Fs = typeof queueMicrotask < "u" ? queueMicrotask.bind(be) : typeof process < "u" && process.nextTick || Sr, zs = (e) => e != null && J(e[bt]), l = {
  isArray: ze,
  isArrayBuffer: yr,
  isBuffer: He,
  isFormData: ls,
  isArrayBufferView: es,
  isString: ts,
  isNumber: wr,
  isBoolean: ns,
  isObject: qe,
  isPlainObject: st,
  isEmptyObject: rs,
  isReadableStream: ds,
  isRequest: fs,
  isResponse: hs,
  isHeaders: ps,
  isUndefined: De,
  isDate: os,
  isFile: ss,
  isBlob: is,
  isRegExp: Cs,
  isFunction: J,
  isStream: cs,
  isURLSearchParams: us,
  isTypedArray: Ss,
  isFileList: as,
  forEach: Ve,
  merge: Wt,
  extend: gs,
  trim: ms,
  stripBOM: ys,
  inherits: ws,
  toFlatObject: bs,
  kindOf: xt,
  kindOfTest: Z,
  endsWith: xs,
  toArray: $s,
  forEachEntry: vs,
  matchAll: Es,
  isHTMLForm: Rs,
  hasOwnProperty: kn,
  hasOwnProp: kn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: $r,
  freezeMethods: As,
  toObjectSet: Os,
  toCamelCase: ks,
  noop: Ts,
  toFiniteNumber: Ns,
  findKey: br,
  global: be,
  isContextDefined: xr,
  isSpecCompliantForm: Ps,
  toJSONObject: Is,
  isAsyncFn: _s,
  isThenable: Ds,
  setImmediate: Sr,
  asap: Fs,
  isIterable: zs
};
function k(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
l.inherits(k, Error, {
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
      config: l.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const vr = k.prototype, Er = {};
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
  Er[e] = { value: e };
});
Object.defineProperties(k, Er);
Object.defineProperty(vr, "isAxiosError", { value: !0 });
k.from = (e, t, n, r, o, s) => {
  const i = Object.create(vr);
  l.toFlatObject(e, i, function(f) {
    return f !== Error.prototype;
  }, (u) => u !== "isAxiosError");
  const a = e && e.message ? e.message : "Error", c = t == null && e ? e.code : t;
  return k.call(i, a, c, n, r, o), e && i.cause == null && Object.defineProperty(i, "cause", { value: e, configurable: !0 }), i.name = e && e.name || "Error", s && Object.assign(i, s), i;
};
const Ls = null;
function Jt(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function Rr(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Cn(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = Rr(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function js(e) {
  return l.isArray(e) && !e.some(Jt);
}
const Ms = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function St(e, t, n) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, g) {
    return !l.isUndefined(g[p]);
  });
  const r = n.metaTokens, o = n.visitor || f, s = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(t);
  if (!l.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(d) {
    if (d === null) return "";
    if (l.isDate(d))
      return d.toISOString();
    if (l.isBoolean(d))
      return d.toString();
    if (!c && l.isBlob(d))
      throw new k("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(d) || l.isTypedArray(d) ? c && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function f(d, p, g) {
    let E = d;
    if (d && !g && typeof d == "object") {
      if (l.endsWith(p, "{}"))
        p = r ? p : p.slice(0, -2), d = JSON.stringify(d);
      else if (l.isArray(d) && js(d) || (l.isFileList(d) || l.endsWith(p, "[]")) && (E = l.toArray(d)))
        return p = Rr(p), E.forEach(function($, C) {
          !(l.isUndefined($) || $ === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Cn([p], C, s) : i === null ? p : p + "[]",
            u($)
          );
        }), !1;
    }
    return Jt(d) ? !0 : (t.append(Cn(g, p, s), u(d)), !1);
  }
  const h = [], m = Object.assign(Ms, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: Jt
  });
  function x(d, p) {
    if (!l.isUndefined(d)) {
      if (h.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      h.push(d), l.forEach(d, function(E, O) {
        (!(l.isUndefined(E) || E === null) && o.call(
          t,
          E,
          l.isString(O) ? O.trim() : O,
          p,
          m
        )) === !0 && x(E, p ? p.concat(O) : [O]);
      }), h.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
  return x(e), t;
}
function An(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function on(e, t) {
  this._pairs = [], e && St(e, this, t);
}
const kr = on.prototype;
kr.append = function(t, n) {
  this._pairs.push([t, n]);
};
kr.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, An);
  } : An;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function Bs(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Cr(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Bs;
  l.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = l.isURLSearchParams(t) ? t.toString() : new on(t, n).toString(r), s) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class On {
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
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
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
    l.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Ar = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Us = typeof URLSearchParams < "u" ? URLSearchParams : on, Hs = typeof FormData < "u" ? FormData : null, qs = typeof Blob < "u" ? Blob : null, Vs = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Us,
    FormData: Hs,
    Blob: qs
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, sn = typeof window < "u" && typeof document < "u", Gt = typeof navigator == "object" && navigator || void 0, Ws = sn && (!Gt || ["ReactNative", "NativeScript", "NS"].indexOf(Gt.product) < 0), Js = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Gs = sn && window.location.href || "http://localhost", Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: sn,
  hasStandardBrowserEnv: Ws,
  hasStandardBrowserWebWorkerEnv: Js,
  navigator: Gt,
  origin: Gs
}, Symbol.toStringTag, { value: "Module" })), U = {
  ...Ks,
  ...Vs
};
function Ys(e, t) {
  return St(e, new U.classes.URLSearchParams(), {
    visitor: function(n, r, o, s) {
      return U.isNode && l.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Xs(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Qs(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function Or(e) {
  function t(n, r, o, s) {
    let i = n[s++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = s >= n.length;
    return i = !i && l.isArray(o) ? o.length : i, c ? (l.hasOwnProp(o, i) ? o[i] = [o[i], r] : o[i] = r, !a) : ((!o[i] || !l.isObject(o[i])) && (o[i] = []), t(n, r, o[i], s) && l.isArray(o[i]) && (o[i] = Qs(o[i])), !a);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const n = {};
    return l.forEachEntry(e, (r, o) => {
      t(Xs(r), o, n, 0);
    }), n;
  }
  return null;
}
function Zs(e, t, n) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const We = {
  transitional: Ar,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = l.isObject(t);
    if (s && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return o ? JSON.stringify(Or(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t) || l.isReadableStream(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Ys(t, this.formSerializer).toString();
      if ((a = l.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return St(
          a ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), Zs(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || We.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (l.isResponse(t) || l.isReadableStream(t))
      return t;
    if (t && l.isString(t) && (r && !this.responseType || o)) {
      const i = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? k.from(a, k.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: U.classes.FormData,
    Blob: U.classes.Blob
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
l.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  We.headers[e] = {};
});
const ei = l.toObjectSet([
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
]), ti = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), n = i.substring(0, o).trim().toLowerCase(), r = i.substring(o + 1).trim(), !(!n || t[n] && ei[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Tn = Symbol("internals");
function Me(e) {
  return e && String(e).trim().toLowerCase();
}
function it(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(it) : String(e);
}
function ni(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const ri = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Nt(e, t, n, r, o) {
  if (l.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!l.isString(t)) {
    if (l.isString(r))
      return t.indexOf(r) !== -1;
    if (l.isRegExp(r))
      return r.test(t);
  }
}
function oi(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function si(e, t) {
  const n = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, s, i) {
        return this[r].call(this, t, o, s, i);
      },
      configurable: !0
    });
  });
}
let G = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(a, c, u) {
      const f = Me(c);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const h = l.findKey(o, f);
      (!h || o[h] === void 0 || u === !0 || u === void 0 && o[h] !== !1) && (o[h || c] = it(a));
    }
    const i = (a, c) => l.forEach(a, (u, f) => s(u, f, c));
    if (l.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (l.isString(t) && (t = t.trim()) && !ri(t))
      i(ti(t), n);
    else if (l.isObject(t) && l.isIterable(t)) {
      let a = {}, c, u;
      for (const f of t) {
        if (!l.isArray(f))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = f[0]] = (c = a[u]) ? l.isArray(c) ? [...c, f[1]] : [c, f[1]] : f[1];
      }
      i(a, n);
    } else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Me(t), t) {
      const r = l.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return ni(o);
        if (l.isFunction(n))
          return n.call(this, o, r);
        if (l.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Me(t), t) {
      const r = l.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Nt(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(i) {
      if (i = Me(i), i) {
        const a = l.findKey(r, i);
        a && (!n || Nt(r, r[a], a, n)) && (delete r[a], o = !0);
      }
    }
    return l.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Nt(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return l.forEach(this, (o, s) => {
      const i = l.findKey(r, s);
      if (i) {
        n[i] = it(o), delete n[s];
        return;
      }
      const a = t ? oi(s) : String(s).trim();
      a !== s && delete n[s], n[a] = it(o), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && l.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
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
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[Tn] = this[Tn] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(i) {
      const a = Me(i);
      r[a] || (si(o, i), r[a] = !0);
    }
    return l.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
G.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.reduceDescriptors(G.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
l.freezeMethods(G);
function Pt(e, t) {
  const n = this || We, r = t || n, o = G.from(r.headers);
  let s = r.data;
  return l.forEach(e, function(a) {
    s = a.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function Tr(e) {
  return !!(e && e.__CANCEL__);
}
function Le(e, t, n) {
  k.call(this, e ?? "canceled", k.ERR_CANCELED, t, n), this.name = "CanceledError";
}
l.inherits(Le, k, {
  __CANCEL__: !0
});
function Nr(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new k(
    "Request failed with status code " + n.status,
    [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function ii(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ai(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const u = Date.now(), f = r[s];
    i || (i = u), n[o] = c, r[o] = u;
    let h = s, m = 0;
    for (; h !== o; )
      m += n[h++], h = h % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), u - i < t)
      return;
    const x = f && u - f;
    return x ? Math.round(m * 1e3 / x) : void 0;
  };
}
function ci(e, t) {
  let n = 0, r = 1e3 / t, o, s;
  const i = (u, f = Date.now()) => {
    n = f, o = null, s && (clearTimeout(s), s = null), e(...u);
  };
  return [(...u) => {
    const f = Date.now(), h = f - n;
    h >= r ? i(u, f) : (o = u, s || (s = setTimeout(() => {
      s = null, i(o);
    }, r - h)));
  }, () => o && i(o)];
}
const ft = (e, t, n = 3) => {
  let r = 0;
  const o = ai(50, 250);
  return ci((s) => {
    const i = s.loaded, a = s.lengthComputable ? s.total : void 0, c = i - r, u = o(c), f = i <= a;
    r = i;
    const h = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && a && f ? (a - i) / u : void 0,
      event: s,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(h);
  }, n);
}, Nn = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Pn = (e) => (...t) => l.asap(() => e(...t)), li = U.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, U.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(U.origin),
  U.navigator && /(msie|trident)/i.test(U.navigator.userAgent)
) : () => !0, ui = U.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, s) {
      const i = [e + "=" + encodeURIComponent(t)];
      l.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), l.isString(r) && i.push("path=" + r), l.isString(o) && i.push("domain=" + o), s === !0 && i.push("secure"), document.cookie = i.join("; ");
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
function di(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function fi(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Pr(e, t, n) {
  let r = !di(t);
  return e && (r || n == !1) ? fi(e, t) : t;
}
const In = (e) => e instanceof G ? { ...e } : e;
function ke(e, t) {
  t = t || {};
  const n = {};
  function r(u, f, h, m) {
    return l.isPlainObject(u) && l.isPlainObject(f) ? l.merge.call({ caseless: m }, u, f) : l.isPlainObject(f) ? l.merge({}, f) : l.isArray(f) ? f.slice() : f;
  }
  function o(u, f, h, m) {
    if (l.isUndefined(f)) {
      if (!l.isUndefined(u))
        return r(void 0, u, h, m);
    } else return r(u, f, h, m);
  }
  function s(u, f) {
    if (!l.isUndefined(f))
      return r(void 0, f);
  }
  function i(u, f) {
    if (l.isUndefined(f)) {
      if (!l.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, f);
  }
  function a(u, f, h) {
    if (h in t)
      return r(u, f);
    if (h in e)
      return r(void 0, u);
  }
  const c = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (u, f, h) => o(In(u), In(f), h, !0)
  };
  return l.forEach(Object.keys({ ...e, ...t }), function(f) {
    const h = c[f] || o, m = h(e[f], t[f], f);
    l.isUndefined(m) && h !== a || (n[f] = m);
  }), n;
}
const Ir = (e) => {
  const t = ke({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: a } = t;
  if (t.headers = i = G.from(i), t.url = Cr(Pr(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  ), l.isFormData(n)) {
    if (U.hasStandardBrowserEnv || U.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (l.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(c).forEach(([f, h]) => {
        u.includes(f.toLowerCase()) && i.set(f, h);
      });
    }
  }
  if (U.hasStandardBrowserEnv && (r && l.isFunction(r) && (r = r(t)), r || r !== !1 && li(t.url))) {
    const c = o && s && ui.read(s);
    c && i.set(o, c);
  }
  return t;
}, hi = typeof XMLHttpRequest < "u", pi = hi && function(e) {
  return new Promise(function(n, r) {
    const o = Ir(e);
    let s = o.data;
    const i = G.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: u } = o, f, h, m, x, d;
    function p() {
      x && x(), d && d(), o.cancelToken && o.cancelToken.unsubscribe(f), o.signal && o.signal.removeEventListener("abort", f);
    }
    let g = new XMLHttpRequest();
    g.open(o.method.toUpperCase(), o.url, !0), g.timeout = o.timeout;
    function E() {
      if (!g)
        return;
      const $ = G.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), T = {
        data: !a || a === "text" || a === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: $,
        config: e,
        request: g
      };
      Nr(function(b) {
        n(b), p();
      }, function(b) {
        r(b), p();
      }, T), g = null;
    }
    "onloadend" in g ? g.onloadend = E : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, g.onabort = function() {
      g && (r(new k("Request aborted", k.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function(C) {
      const T = C && C.message ? C.message : "Network Error", S = new k(T, k.ERR_NETWORK, e, g);
      S.event = C || null, r(S), g = null;
    }, g.ontimeout = function() {
      let C = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const T = o.transitional || Ar;
      o.timeoutErrorMessage && (C = o.timeoutErrorMessage), r(new k(
        C,
        T.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
        e,
        g
      )), g = null;
    }, s === void 0 && i.setContentType(null), "setRequestHeader" in g && l.forEach(i.toJSON(), function(C, T) {
      g.setRequestHeader(T, C);
    }), l.isUndefined(o.withCredentials) || (g.withCredentials = !!o.withCredentials), a && a !== "json" && (g.responseType = o.responseType), u && ([m, d] = ft(u, !0), g.addEventListener("progress", m)), c && g.upload && ([h, x] = ft(c), g.upload.addEventListener("progress", h), g.upload.addEventListener("loadend", x)), (o.cancelToken || o.signal) && (f = ($) => {
      g && (r(!$ || $.type ? new Le(null, e, g) : $), g.abort(), g = null);
    }, o.cancelToken && o.cancelToken.subscribe(f), o.signal && (o.signal.aborted ? f() : o.signal.addEventListener("abort", f)));
    const O = ii(o.url);
    if (O && U.protocols.indexOf(O) === -1) {
      r(new k("Unsupported protocol " + O + ":", k.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(s || null);
  });
}, mi = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(u) {
      if (!o) {
        o = !0, a();
        const f = u instanceof Error ? u : this.reason;
        r.abort(f instanceof k ? f : new Le(f instanceof Error ? f.message : f));
      }
    };
    let i = t && setTimeout(() => {
      i = null, s(new k(`timeout ${t} of ms exceeded`, k.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", s));
    const { signal: c } = r;
    return c.unsubscribe = () => l.asap(a), c;
  }
}, gi = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, yi = async function* (e, t) {
  for await (const n of wi(e))
    yield* gi(n, t);
}, wi = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, _n = (e, t, n, r) => {
  const o = yi(e, t);
  let s = 0, i, a = (c) => {
    i || (i = !0, r && r(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: u, value: f } = await o.next();
        if (u) {
          a(), c.close();
          return;
        }
        let h = f.byteLength;
        if (n) {
          let m = s += h;
          n(m);
        }
        c.enqueue(new Uint8Array(f));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(c) {
      return a(c), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Dn = 64 * 1024, { isFunction: Ze } = l, bi = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(l.global), {
  ReadableStream: Fn,
  TextEncoder: zn
} = l.global, Ln = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, xi = (e) => {
  e = l.merge.call({
    skipUndefined: !0
  }, bi, e);
  const { fetch: t, Request: n, Response: r } = e, o = t ? Ze(t) : typeof fetch == "function", s = Ze(n), i = Ze(r);
  if (!o)
    return !1;
  const a = o && Ze(Fn), c = o && (typeof zn == "function" ? /* @__PURE__ */ ((d) => (p) => d.encode(p))(new zn()) : async (d) => new Uint8Array(await new n(d).arrayBuffer())), u = s && a && Ln(() => {
    let d = !1;
    const p = new n(U.origin, {
      body: new Fn(),
      method: "POST",
      get duplex() {
        return d = !0, "half";
      }
    }).headers.has("Content-Type");
    return d && !p;
  }), f = i && a && Ln(() => l.isReadableStream(new r("").body)), h = {
    stream: f && ((d) => d.body)
  };
  o && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((d) => {
    !h[d] && (h[d] = (p, g) => {
      let E = p && p[d];
      if (E)
        return E.call(p);
      throw new k(`Response type '${d}' is not supported`, k.ERR_NOT_SUPPORT, g);
    });
  });
  const m = async (d) => {
    if (d == null)
      return 0;
    if (l.isBlob(d))
      return d.size;
    if (l.isSpecCompliantForm(d))
      return (await new n(U.origin, {
        method: "POST",
        body: d
      }).arrayBuffer()).byteLength;
    if (l.isArrayBufferView(d) || l.isArrayBuffer(d))
      return d.byteLength;
    if (l.isURLSearchParams(d) && (d = d + ""), l.isString(d))
      return (await c(d)).byteLength;
  }, x = async (d, p) => {
    const g = l.toFiniteNumber(d.getContentLength());
    return g ?? m(p);
  };
  return async (d) => {
    let {
      url: p,
      method: g,
      data: E,
      signal: O,
      cancelToken: $,
      timeout: C,
      onDownloadProgress: T,
      onUploadProgress: S,
      responseType: b,
      headers: V,
      withCredentials: K = "same-origin",
      fetchOptions: X
    } = Ir(d), Ce = t || fetch;
    b = b ? (b + "").toLowerCase() : "text";
    let ae = mi([O, $ && $.toAbortSignal()], C), te = null;
    const v = ae && ae.unsubscribe && (() => {
      ae.unsubscribe();
    });
    let R;
    try {
      if (S && u && g !== "get" && g !== "head" && (R = await x(V, E)) !== 0) {
        let W = new n(p, {
          method: "POST",
          body: E,
          duplex: "half"
        }), L;
        if (l.isFormData(E) && (L = W.headers.get("content-type")) && V.setContentType(L), W.body) {
          const [he, ce] = Nn(
            R,
            ft(Pn(S))
          );
          E = _n(W.body, Dn, he, ce);
        }
      }
      l.isString(K) || (K = K ? "include" : "omit");
      const P = s && "credentials" in n.prototype, D = {
        ...X,
        signal: ae,
        method: g.toUpperCase(),
        headers: V.normalize().toJSON(),
        body: E,
        duplex: "half",
        credentials: P ? K : void 0
      };
      te = s && new n(p, D);
      let M = await (s ? Ce(te, X) : Ce(p, D));
      const B = f && (b === "stream" || b === "response");
      if (f && (T || B && v)) {
        const W = {};
        ["status", "statusText", "headers"].forEach((pe) => {
          W[pe] = M[pe];
        });
        const L = l.toFiniteNumber(M.headers.get("content-length")), [he, ce] = T && Nn(
          L,
          ft(Pn(T), !0)
        ) || [];
        M = new r(
          _n(M.body, Dn, he, () => {
            ce && ce(), v && v();
          }),
          W
        );
      }
      b = b || "text";
      let fe = await h[l.findKey(h, b) || "text"](M, d);
      return !B && v && v(), await new Promise((W, L) => {
        Nr(W, L, {
          data: fe,
          headers: G.from(M.headers),
          status: M.status,
          statusText: M.statusText,
          config: d,
          request: te
        });
      });
    } catch (P) {
      throw v && v(), P && P.name === "TypeError" && /Load failed|fetch/i.test(P.message) ? Object.assign(
        new k("Network Error", k.ERR_NETWORK, d, te),
        {
          cause: P.cause || P
        }
      ) : k.from(P, P && P.code, d, te);
    }
  };
}, $i = /* @__PURE__ */ new Map(), _r = (e) => {
  let t = e ? e.env : {};
  const { fetch: n, Request: r, Response: o } = t, s = [
    r,
    o,
    n
  ];
  let i = s.length, a = i, c, u, f = $i;
  for (; a--; )
    c = s[a], u = f.get(c), u === void 0 && f.set(c, u = a ? /* @__PURE__ */ new Map() : xi(t)), f = u;
  return u;
};
_r();
const Kt = {
  http: Ls,
  xhr: pi,
  fetch: {
    get: _r
  }
};
l.forEach(Kt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const jn = (e) => `- ${e}`, Si = (e) => l.isFunction(e) || e === null || e === !1, Dr = {
  getAdapter: (e, t) => {
    e = l.isArray(e) ? e : [e];
    const { length: n } = e;
    let r, o;
    const s = {};
    for (let i = 0; i < n; i++) {
      r = e[i];
      let a;
      if (o = r, !Si(r) && (o = Kt[(a = String(r)).toLowerCase()], o === void 0))
        throw new k(`Unknown adapter '${a}'`);
      if (o && (l.isFunction(o) || (o = o.get(t))))
        break;
      s[a || "#" + i] = o;
    }
    if (!o) {
      const i = Object.entries(s).map(
        ([c, u]) => `adapter ${c} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = n ? i.length > 1 ? `since :
` + i.map(jn).join(`
`) : " " + jn(i[0]) : "as no adapter specified";
      throw new k(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return o;
  },
  adapters: Kt
};
function It(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Le(null, e);
}
function Mn(e) {
  return It(e), e.headers = G.from(e.headers), e.data = Pt.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Dr.getAdapter(e.adapter || We.adapter, e)(e).then(function(r) {
    return It(e), r.data = Pt.call(
      e,
      e.transformResponse,
      r
    ), r.headers = G.from(r.headers), r;
  }, function(r) {
    return Tr(r) || (It(e), r && r.response && (r.response.data = Pt.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = G.from(r.response.headers))), Promise.reject(r);
  });
}
const Fr = "1.12.2", vt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  vt[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Bn = {};
vt.transitional = function(t, n, r) {
  function o(s, i) {
    return "[Axios v" + Fr + "] Transitional option '" + s + "'" + i + (r ? ". " + r : "");
  }
  return (s, i, a) => {
    if (t === !1)
      throw new k(
        o(i, " has been removed" + (n ? " in " + n : "")),
        k.ERR_DEPRECATED
      );
    return n && !Bn[i] && (Bn[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, a) : !0;
  };
};
vt.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function vi(e, t, n) {
  if (typeof e != "object")
    throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], i = t[s];
    if (i) {
      const a = e[s], c = a === void 0 || i(a, s, e);
      if (c !== !0)
        throw new k("option " + s + " must be " + c, k.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new k("Unknown option " + s, k.ERR_BAD_OPTION);
  }
}
const at = {
  assertOptions: vi,
  validators: vt
}, ne = at.validators;
let Se = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new On(),
      response: new On()
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
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = ke(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && at.assertOptions(r, {
      silentJSONParsing: ne.transitional(ne.boolean),
      forcedJSONParsing: ne.transitional(ne.boolean),
      clarifyTimeoutError: ne.transitional(ne.boolean)
    }, !1), o != null && (l.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : at.assertOptions(o, {
      encode: ne.function,
      serialize: ne.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), at.assertOptions(n, {
      baseUrl: ne.spelling("baseURL"),
      withXsrfToken: ne.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && l.merge(
      s.common,
      s[n.method]
    );
    s && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete s[d];
      }
    ), n.headers = G.concat(i, s);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(n) === !1 || (c = c && p.synchronous, a.unshift(p.fulfilled, p.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(p) {
      u.push(p.fulfilled, p.rejected);
    });
    let f, h = 0, m;
    if (!c) {
      const d = [Mn.bind(this), void 0];
      for (d.unshift(...a), d.push(...u), m = d.length, f = Promise.resolve(n); h < m; )
        f = f.then(d[h++], d[h++]);
      return f;
    }
    m = a.length;
    let x = n;
    for (; h < m; ) {
      const d = a[h++], p = a[h++];
      try {
        x = d(x);
      } catch (g) {
        p.call(this, g);
        break;
      }
    }
    try {
      f = Mn.call(this, x);
    } catch (d) {
      return Promise.reject(d);
    }
    for (h = 0, m = u.length; h < m; )
      f = f.then(u[h++], u[h++]);
    return f;
  }
  getUri(t) {
    t = ke(this.defaults, t);
    const n = Pr(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Cr(n, t.params, t.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(t) {
  Se.prototype[t] = function(n, r) {
    return this.request(ke(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, i, a) {
      return this.request(ke(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Se.prototype[t] = n(), Se.prototype[t + "Form"] = n(!0);
});
let Ei = class zr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const i = new Promise((a) => {
        r.subscribe(a), s = a;
      }).then(o);
      return i.cancel = function() {
        r.unsubscribe(s);
      }, i;
    }, t(function(s, i, a) {
      r.reason || (r.reason = new Le(s, i, a), n(r.reason));
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
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new zr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function Ri(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ki(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
const Yt = {
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
Object.entries(Yt).forEach(([e, t]) => {
  Yt[t] = e;
});
function Lr(e) {
  const t = new Se(e), n = mr(Se.prototype.request, t);
  return l.extend(n, Se.prototype, t, { allOwnKeys: !0 }), l.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return Lr(ke(e, o));
  }, n;
}
const F = Lr(We);
F.Axios = Se;
F.CanceledError = Le;
F.CancelToken = Ei;
F.isCancel = Tr;
F.VERSION = Fr;
F.toFormData = St;
F.AxiosError = k;
F.Cancel = F.CanceledError;
F.all = function(t) {
  return Promise.all(t);
};
F.spread = Ri;
F.isAxiosError = ki;
F.mergeConfig = ke;
F.AxiosHeaders = G;
F.formToJSON = (e) => Or(l.isHTMLForm(e) ? new FormData(e) : e);
F.getAdapter = Dr.getAdapter;
F.HttpStatusCode = Yt;
F.default = F;
const {
  Axios: za,
  AxiosError: La,
  CanceledError: ja,
  isCancel: Ma,
  CancelToken: Ba,
  VERSION: Ua,
  all: Ha,
  Cancel: qa,
  isAxiosError: Va,
  spread: Wa,
  toFormData: Ja,
  AxiosHeaders: Ga,
  HttpStatusCode: Ka,
  formToJSON: Ya,
  getAdapter: Xa,
  mergeConfig: Qa
} = F;
class Ci {
  constructor(t, n) {
    kt(this, "baseUrl");
    kt(this, "client");
    if (!t || !n)
      throw new Error("baseUrl and apiKey are required");
    this.baseUrl = t.endsWith("/") ? t.slice(0, -1) : t, this.client = F.create({
      baseURL: this.baseUrl,
      headers: {
        apikey: n,
        "Content-Type": "application/json"
      }
    });
  }
  /**
   * Get a specific instance by name
   */
  async getInstance(t) {
    try {
      const o = (await this.client.get(
        "/instance/fetchInstances"
      )).data.find((s) => s.name === t);
      if (!o)
        throw new Error(`Instance '${t}' not found`);
      return o;
    } catch (n) {
      throw new Error(`Failed to get instance: ${n.message}`);
    }
  }
  /**
   * Create a new WhatsApp instance
   */
  async createInstance(t, n = "WHATSAPP-BAILEYS") {
    try {
      return (await this.client.post(
        "/instance/create",
        {
          instanceName: t,
          integration: n
        }
      )).data;
    } catch (r) {
      throw new Error(`Failed to create instance: ${r.message}`);
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
    } catch (t) {
      throw new Error(`Failed to list instances: ${t.message}`);
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
    } catch (n) {
      throw new Error(`Failed to connect instance: ${n.message}`);
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
    } catch (n) {
      throw new Error(`Failed to disconnect instance: ${n.message}`);
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
    } catch (n) {
      throw new Error(`Failed to delete instance: ${n.message}`);
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
    } catch (n) {
      throw new Error(`Failed to get instance status: ${n.message}`);
    }
  }
  /**
   * Send a text message
   */
  async sendMessage(t, n, r) {
    try {
      const o = {
        number: n,
        text: r
      };
      return (await this.client.post(
        `/message/sendText/${t}`,
        o
      )).data;
    } catch (o) {
      throw new Error(`Failed to send message: ${o.message}`);
    }
  }
  /**
   * Send media (image, video, audio, document)
   */
  async sendMedia(t, n, r, o = "image", s = "") {
    try {
      const i = `/message/sendMedia/${t}`, a = {
        number: n,
        mediatype: o,
        media: r
      };
      return s && (a.caption = s), (await this.client.post(
        i,
        a
      )).data;
    } catch (i) {
      throw new Error(`Failed to send media: ${i.message}`);
    }
  }
  /**
   * Get chat messages
   */
  async getChatMessages(t, n, r = 50) {
    try {
      return (await this.client.get(
        `/chat/findMessages/${t}`,
        {
          params: { remoteJid: n, limit: r }
        }
      )).data;
    } catch (o) {
      throw new Error(`Failed to get messages: ${o.message}`);
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
    } catch (n) {
      throw new Error(`Failed to get chats: ${n.message}`);
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
    } catch (n) {
      throw new Error(`Failed to get contacts: ${n.message}`);
    }
  }
  /**
   * Set instance settings
   */
  async setInstanceSettings(t, n) {
    try {
      return (await this.client.post(
        `/settings/set/${t}`,
        n
      )).data;
    } catch (r) {
      throw new Error(`Failed to set settings: ${r.message}`);
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
    } catch (n) {
      throw new Error(`Failed to get settings: ${n.message}`);
    }
  }
  /**
   * Set webhook URL
   */
  async setWebhook(t, n, r = []) {
    try {
      const o = {
        url: n,
        events: r
      };
      return (await this.client.post(
        `/webhook/set/${t}`,
        o
      )).data;
    } catch (o) {
      throw new Error(`Failed to set webhook: ${o.message}`);
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
    } catch (n) {
      throw new Error(`Failed to get profile: ${n.message}`);
    }
  }
  /**
   * Mark message as read
   */
  async markAsRead(t, n, r = !1, o) {
    try {
      const s = {
        remoteJid: n,
        fromMe: r,
        id: o
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
  async create(t, n) {
    return this.createInstance(t, n);
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
const Za = (e) => {
  const [t, n] = ge(null), [r, o] = ge([]), [s, i] = ge([]), [a, c] = ge([]), [u, f] = ge([]), [h, m] = ge(!1), [x, d] = ge(null);
  ln(() => {
    if (e.baseUrl && e.apiKey)
      try {
        const v = new Ci(
          e.baseUrl,
          e.apiKey
        );
        n(v), d(null);
      } catch (v) {
        d(v.message);
      }
  }, [e.baseUrl, e.apiKey]);
  const p = q((v) => {
    d(v.message || "An error occurred"), m(!1);
  }, []), g = q(() => {
    d(null);
  }, []), E = q(
    async (v, R) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        m(!0), d(null);
        const P = await t.createInstance(v, R);
        return await X(), P;
      } catch (P) {
        throw p(P), P;
      } finally {
        m(!1);
      }
    },
    [t]
  ), O = q(
    async (v) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        m(!0), d(null);
        const R = await t.deleteInstance(v);
        return await X(), R;
      } catch (R) {
        throw p(R), R;
      } finally {
        m(!1);
      }
    },
    [t]
  ), $ = q(
    async (v) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(!0), d(null), await t.connectInstance(v);
      } catch (R) {
        throw p(R), R;
      } finally {
        m(!1);
      }
    },
    [t]
  ), C = q(
    async (v) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        m(!0), d(null);
        const R = await t.disconnectInstance(v);
        return await X(), R;
      } catch (R) {
        throw p(R), R;
      } finally {
        m(!1);
      }
    },
    [t]
  ), T = q(
    async (v) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return d(null), await t.getInstanceStatus(v);
      } catch (R) {
        throw p(R), R;
      }
    },
    [t]
  ), S = q(
    async (v, R, P) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(!0), d(null), await t.sendMessage(v, R, P);
      } catch (D) {
        throw p(D), D;
      } finally {
        m(!1);
      }
    },
    [t]
  ), b = q(
    async (v, R, P, D = "image", M = "") => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return m(!0), d(null), await t.sendMedia(
          v,
          R,
          P,
          D,
          M
        );
      } catch (B) {
        throw p(B), B;
      } finally {
        m(!1);
      }
    },
    [t]
  ), V = q(
    async (v, R, P = 50) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return d(null), await t.getChatMessages(
          v,
          R,
          P
        );
      } catch (D) {
        throw p(D), D;
      }
    },
    [t]
  ), K = q(
    async (v, R, P, D) => {
      if (!t) throw new Error("Manager not initialized");
      try {
        return d(null), await t.markAsRead(
          v,
          R,
          P,
          D
        );
      } catch (M) {
        throw p(M), M;
      }
    },
    [t]
  ), X = q(async () => {
    if (t)
      try {
        m(!0), d(null);
        const v = await t.listInstances();
        o(v);
      } catch (v) {
        p(v);
      } finally {
        m(!1);
      }
  }, [t]), Ce = q(
    async (v) => {
      if (t)
        try {
          m(!0), d(null);
          const R = await t.getContacts(v);
          c(R);
        } catch (R) {
          p(R);
        } finally {
          m(!1);
        }
    },
    [t]
  ), ae = q(
    async (v) => {
      if (t)
        try {
          m(!0), d(null);
          const R = await t.getChats(v);
          f(R);
        } catch (R) {
          p(R);
        } finally {
          m(!1);
        }
    },
    [t]
  ), te = q(
    async (v, R, P = 50) => {
      if (t)
        try {
          m(!0), d(null);
          const D = await t.getChatMessages(
            v,
            R,
            P
          );
          i(D);
        } catch (D) {
          p(D);
        } finally {
          m(!1);
        }
    },
    [t]
  );
  return ln(() => {
    t && X();
  }, [t, X]), {
    manager: t,
    instances: r,
    messages: s,
    contacts: a,
    chats: u,
    loading: h,
    error: x,
    // Instance methods
    createInstance: E,
    deleteInstance: O,
    connectInstance: $,
    disconnectInstance: C,
    getInstanceStatus: T,
    // Message methods
    sendMessage: S,
    sendMedia: b,
    getChatMessages: V,
    markAsRead: K,
    // Data fetching methods
    refreshInstances: X,
    refreshContacts: Ce,
    refreshChats: ae,
    refreshMessages: te,
    // Utility methods
    clearError: g,
    setLoading: m
  };
}, ee = () => {
  const e = Un(pr);
  if (!e)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}, Ai = w.div`
  background: ${(e) => e.$theme.colors.background};
  border-radius: ${(e) => e.$theme.borderRadius};
  transition: all 0.2s ease;

  ${(e) => ({
  sm: "padding: 12px;",
  md: "padding: 16px;",
  lg: "padding: 24px;"
})[e.$padding]}

  ${(e) => ({
  default: `
        border: 1px solid ${e.$theme.colors.border};
      `,
  outlined: `
        border: 2px solid ${e.$theme.colors.primary};
      `,
  elevated: `
        border: 1px solid ${e.$theme.colors.border};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        &:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `
})[e.$variant]}
`, ie = ({
  variant: e = "default",
  padding: t = "md",
  children: n,
  ...r
}) => {
  const { theme: o } = ee();
  return /* @__PURE__ */ y(Ai, { $variant: e, $padding: t, $theme: o, ...r, children: n });
}, Oi = w.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: ${(e) => e.$theme.borderRadius};
  font-family: ${(e) => e.$theme.fonts.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(e) => ({
  sm: "padding: 8px 16px; font-size: 14px; height: 32px;",
  md: "padding: 12px 20px; font-size: 14px; height: 40px;",
  lg: "padding: 16px 24px; font-size: 16px; height: 48px;"
})[e.$size]}

  ${(e) => ({
  primary: `
        background: ${e.$theme.colors.primary};
        color: white;
        &:hover { background: ${e.$theme.colors.primaryHover}; }
      `,
  secondary: `
        background: ${e.$theme.colors.secondary};
        color: ${e.$theme.colors.text};
        &:hover { background: ${e.$theme.colors.secondaryHover}; }
      `,
  danger: `
        background: ${e.$theme.colors.danger};
        color: white;
        &:hover { opacity: 0.9; }
      `,
  ghost: `
        background: transparent;
        color: ${e.$theme.colors.primary};
        border: 1px solid ${e.$theme.colors.border};
        &:hover { background: ${e.$theme.colors.secondary}; }
      `
})[e.$variant]}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`, Te = ({
  variant: e = "primary",
  size: t = "md",
  loading: n = !1,
  children: r,
  disabled: o,
  ...s
}) => {
  const { theme: i } = ee();
  return /* @__PURE__ */ _(
    Oi,
    {
      $variant: e,
      $size: t,
      $theme: i,
      disabled: o || n,
      ...s,
      children: [
        n && /* @__PURE__ */ y("div", { children: "⏳" }),
        r
      ]
    }
  );
}, Ti = w.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: ${(e) => e.$theme.fonts.primary};
  font-weight: 500;

  ${(e) => ({
  sm: "padding: 2px 8px; font-size: 12px; height: 20px;",
  md: "padding: 4px 12px; font-size: 12px; height: 24px;",
  lg: "padding: 6px 16px; font-size: 14px; height: 28px;"
})[e.$size]}

  ${(e) => ({
  primary: `
        background: ${e.$theme.colors.primary};
        color: white;
      `,
  secondary: `
        background: ${e.$theme.colors.secondary};
        color: ${e.$theme.colors.text};
      `,
  success: `
        background: ${e.$theme.colors.success};
        color: white;
      `,
  warning: `
        background: ${e.$theme.colors.warning};
        color: white;
      `,
  danger: `
        background: ${e.$theme.colors.danger};
        color: white;
      `
})[e.$variant]}
`, Et = ({
  variant: e = "primary",
  size: t = "md",
  children: n,
  ...r
}) => {
  const { theme: o } = ee();
  return /* @__PURE__ */ y(Ti, { $variant: e, $size: t, $theme: o, ...r, children: n });
}, Ni = w.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`, Pi = w.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`, Ii = w.div`
  flex: 1;
`, _i = w.h3`
  margin: 0 0 8px 0;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
  font-size: 18px;
  font-weight: 600;
`, Di = w.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`, _t = w.div`
  font-size: 14px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};

  strong {
    color: ${(e) => e.$theme.colors.text};
    font-weight: 500;
  }
`, Fi = w.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`, zi = w.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(e) => {
  switch (e.$status) {
    case "connected":
      return e.$theme.colors.success;
    case "connecting":
      return e.$theme.colors.warning;
    default:
      return e.$theme.colors.danger;
  }
}};

  ${(e) => e.$status === "connecting" && `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `}
`, Li = w.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`, ji = w.hr`
  border: none;
  height: 1px;
  background: ${(e) => e.$theme.colors.border};
  margin: 0;
`, ec = ({
  instance: e,
  onConnect: t,
  onDisconnect: n,
  onDelete: r,
  onViewQR: o
}) => {
  const { theme: s } = ee(), i = () => {
    switch (e.status) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      default:
        return "danger";
    }
  }, a = () => {
    switch (e.status) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando...";
      default:
        return "Desconectado";
    }
  }, c = (m) => m.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }), u = e.status === "disconnected", f = e.status === "connected", h = e.status === "disconnected";
  return /* @__PURE__ */ y(ie, { variant: "elevated", padding: "lg", children: /* @__PURE__ */ _(Ni, { children: [
    /* @__PURE__ */ _(Pi, { children: [
      /* @__PURE__ */ _(Ii, { children: [
        /* @__PURE__ */ y(_i, { $theme: s, children: e.name }),
        /* @__PURE__ */ _(Di, { children: [
          /* @__PURE__ */ _(_t, { $theme: s, children: [
            /* @__PURE__ */ y("strong", { children: "Webhook:" }),
            " ",
            e.webhook || "Não configurado"
          ] }),
          /* @__PURE__ */ _(_t, { $theme: s, children: [
            /* @__PURE__ */ y("strong", { children: "Criado em:" }),
            " ",
            c(e.createdAt)
          ] }),
          e.lastConnection && /* @__PURE__ */ _(_t, { $theme: s, children: [
            /* @__PURE__ */ y("strong", { children: "Última conexão:" }),
            " ",
            c(e.lastConnection)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ _(Fi, { children: [
        /* @__PURE__ */ y(zi, { $status: e.status, $theme: s }),
        /* @__PURE__ */ y(Et, { variant: i(), size: "sm", children: a() })
      ] })
    ] }),
    /* @__PURE__ */ y(ji, { $theme: s }),
    /* @__PURE__ */ _(Li, { children: [
      u && t && /* @__PURE__ */ y(
        Te,
        {
          variant: "primary",
          size: "sm",
          onClick: () => t(e.name),
          children: "Conectar"
        }
      ),
      f && n && /* @__PURE__ */ y(
        Te,
        {
          variant: "danger",
          size: "sm",
          onClick: () => n(e.name),
          children: "Desconectar"
        }
      ),
      h && o && /* @__PURE__ */ y(
        Te,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => o(e.name),
          children: "Ver QR Code"
        }
      ),
      r && /* @__PURE__ */ y(
        Te,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => {
            window.confirm(
              `Tem certeza que deseja excluir a instância "${e.name}"?`
            ) && r(e.name);
          },
          children: "Excluir"
        }
      )
    ] })
  ] }) });
}, Mi = w.div`
  display: flex;
  align-items: center;
  gap: 12px;
`, Bi = w.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(e) => {
  switch (e.$status) {
    case "connected":
      return e.$theme.colors.success;
    case "connecting":
      return e.$theme.colors.warning;
    default:
      return e.$theme.colors.danger;
  }
}};

  ${(e) => e.$status === "connecting" && `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `}
`, Ui = w.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`, Hi = w.span`
  font-weight: 600;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
`, qi = w.span`
  font-size: 12px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, Vi = w.button`
  background: none;
  border: 1px solid ${(e) => e.$theme.colors.primary};
  color: ${(e) => e.$theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(e) => e.$theme.colors.primary};
    color: white;
  }
`, tc = ({
  status: e,
  instanceName: t,
  lastUpdate: n,
  onReconnect: r
}) => {
  const { theme: o } = ee(), s = () => {
    switch (e) {
      case "connected":
        return "Conectado";
      case "connecting":
        return "Conectando...";
      default:
        return "Desconectado";
    }
  }, i = () => {
    switch (e) {
      case "connected":
        return "success";
      case "connecting":
        return "warning";
      default:
        return "danger";
    }
  }, a = () => n ? `Última atualização: ${n.toLocaleTimeString()}` : null;
  return /* @__PURE__ */ y(ie, { variant: "outlined", padding: "md", children: /* @__PURE__ */ _(Mi, { children: [
    /* @__PURE__ */ y(Bi, { $status: e, $theme: o }),
    /* @__PURE__ */ _(Ui, { children: [
      /* @__PURE__ */ _("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        t && /* @__PURE__ */ y(Hi, { $theme: o, children: t }),
        /* @__PURE__ */ y(Et, { variant: i(), size: "sm", children: s() })
      ] }),
      n && /* @__PURE__ */ y(qi, { $theme: o, children: a() })
    ] }),
    e === "disconnected" && r && /* @__PURE__ */ y(Vi, { $theme: o, onClick: r, children: "Reconectar" })
  ] }) });
}, Wi = nn`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`, Ji = nn`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`, Gi = nn`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`, Ki = w.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`, Yi = w.div`
  border: 2px solid ${(e) => e.$theme.colors.secondary};
  border-top: 2px solid ${(e) => e.$theme.colors.primary};
  border-radius: 50%;
  animation: ${Wi} 1s linear infinite;

  ${(e) => ({
  sm: "width: 16px; height: 16px;",
  md: "width: 24px; height: 24px;",
  lg: "width: 32px; height: 32px;"
})[e.$size]}
`, Xi = w.div`
  display: flex;
  gap: 4px;
`, Dt = w.div`
  background: ${(e) => e.$theme.colors.primary};
  border-radius: 50%;
  animation: ${Ji} 1.4s ease-in-out infinite both;
  animation-delay: ${(e) => e.$delay}s;

  ${(e) => ({
  sm: "width: 8px; height: 8px;",
  md: "width: 12px; height: 12px;",
  lg: "width: 16px; height: 16px;"
})[e.$size]}
`, Qi = w.div`
  background: ${(e) => e.$theme.colors.primary};
  border-radius: 50%;
  animation: ${Gi} 1.5s ease-in-out infinite;

  ${(e) => ({
  sm: "width: 16px; height: 16px;",
  md: "width: 24px; height: 24px;",
  lg: "width: 32px; height: 32px;"
})[e.$size]}
`, Zi = w.span`
  font-size: 14px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, an = ({
  size: e = "md",
  variant: t = "spinner",
  text: n
}) => {
  const { theme: r } = ee();
  return /* @__PURE__ */ _(Ki, { children: [
    (() => {
      switch (t) {
        case "dots":
          return /* @__PURE__ */ _(Xi, { children: [
            /* @__PURE__ */ y(Dt, { $size: e, $theme: r, $delay: 0 }),
            /* @__PURE__ */ y(Dt, { $size: e, $theme: r, $delay: 0.16 }),
            /* @__PURE__ */ y(Dt, { $size: e, $theme: r, $delay: 0.32 })
          ] });
        case "pulse":
          return /* @__PURE__ */ y(Qi, { $size: e, $theme: r });
        default:
          return /* @__PURE__ */ y(Yi, { $size: e, $theme: r });
      }
    })(),
    n && /* @__PURE__ */ y(Zi, { $theme: r, children: n })
  ] });
}, ea = w.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`, ta = w.div`
  padding: 12px;
  border: 1px solid ${(e) => e.$theme.colors.border};
  border-radius: ${(e) => e.$theme.borderRadius};
  background: ${(e) => e.$theme.colors.background};
  cursor: ${(e) => e.$clickable ? "pointer" : "default"};
  transition: all 0.2s ease;

  ${(e) => e.$clickable && `
    &:hover {
      background: ${e.$theme.colors.secondary};
      border-color: ${e.$theme.colors.primary};
    }
  `}
`, na = w.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`, ra = w.span`
  font-weight: 600;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
  flex: 1;
`, oa = w.span`
  font-size: 12px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, sa = w.div`
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
  font-size: 14px;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`, ia = w.div`
  text-align: center;
  padding: 40px 20px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, nc = ({
  messages: e,
  isLoading: t = !1,
  onMessageClick: n
}) => {
  const { theme: r } = ee(), o = (i) => i.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }), s = (i) => {
    switch (i) {
      case "text":
        return "primary";
      case "image":
        return "warning";
      case "audio":
        return "success";
      case "video":
        return "secondary";
      default:
        return "primary";
    }
  };
  return t ? /* @__PURE__ */ y(ie, { padding: "lg", children: /* @__PURE__ */ y(an, { text: "Carregando mensagens..." }) }) : e.length === 0 ? /* @__PURE__ */ y(ie, { padding: "lg", children: /* @__PURE__ */ y(ia, { $theme: r, children: "Nenhuma mensagem encontrada" }) }) : /* @__PURE__ */ y(ie, { padding: "md", children: /* @__PURE__ */ y(ea, { children: e.map((i) => /* @__PURE__ */ _(
    ta,
    {
      $theme: r,
      $clickable: !!n,
      onClick: () => n == null ? void 0 : n(i),
      children: [
        /* @__PURE__ */ _(na, { children: [
          /* @__PURE__ */ y(ra, { $theme: r, children: i.senderName || i.from }),
          /* @__PURE__ */ y(Et, { variant: s(i.type), size: "sm", children: i.type }),
          /* @__PURE__ */ y(oa, { $theme: r, children: o(i.timestamp) })
        ] }),
        /* @__PURE__ */ y(sa, { $theme: r, children: i.content })
      ]
    },
    i.id
  )) }) });
}, aa = w.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`, ca = w.div`
  padding: 12px;
  border: 1px solid ${(e) => e.$theme.colors.border};
  border-radius: ${(e) => e.$theme.borderRadius};
  background: ${(e) => e.$theme.colors.background};
  cursor: ${(e) => e.$clickable ? "pointer" : "default"};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  ${(e) => e.$clickable && `
    &:hover {
      background: ${e.$theme.colors.secondary};
      border-color: ${e.$theme.colors.primary};
    }
  `}
`, la = w.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(e) => e.$theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: ${(e) => e.$theme.fonts.primary};
  flex-shrink: 0;
`, ua = w.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`, da = w.span`
  font-weight: 600;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
`, fa = w.span`
  font-size: 14px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, ha = w.div`
  display: flex;
  align-items: center;
  gap: 8px;
`, pa = w.div`
  text-align: center;
  padding: 40px 20px;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, rc = ({
  contacts: e,
  isLoading: t = !1,
  onContactClick: n
}) => {
  const { theme: r } = ee(), o = (c) => c.split(" ").map((u) => u.charAt(0)).join("").substring(0, 2).toUpperCase(), s = (c) => {
    const u = c.replace(/\D/g, "");
    return u.length === 11 ? `(${u.slice(0, 2)}) ${u.slice(2, 7)}-${u.slice(
      7
    )}` : c;
  }, i = (c) => c ? "success" : "secondary", a = (c) => c ? "Online" : "Offline";
  return t ? /* @__PURE__ */ y(ie, { padding: "lg", children: /* @__PURE__ */ y(an, { text: "Carregando contatos..." }) }) : e.length === 0 ? /* @__PURE__ */ y(ie, { padding: "lg", children: /* @__PURE__ */ y(pa, { $theme: r, children: "Nenhum contato encontrado" }) }) : /* @__PURE__ */ y(ie, { padding: "md", children: /* @__PURE__ */ y(aa, { children: e.map((c) => /* @__PURE__ */ _(
    ca,
    {
      $theme: r,
      $clickable: !!n,
      onClick: () => n == null ? void 0 : n(c),
      children: [
        /* @__PURE__ */ y(la, { $theme: r, children: c.profilePic ? /* @__PURE__ */ y(
          "img",
          {
            src: c.profilePic,
            alt: c.name,
            style: { width: "100%", height: "100%", borderRadius: "50%" }
          }
        ) : o(c.name) }),
        /* @__PURE__ */ _(ua, { children: [
          /* @__PURE__ */ y(da, { $theme: r, children: c.name }),
          /* @__PURE__ */ y(fa, { $theme: r, children: s(c.phone) })
        ] }),
        /* @__PURE__ */ y(ha, { children: /* @__PURE__ */ y(Et, { variant: i(c.isOnline), size: "sm", children: a(c.isOnline) }) })
      ]
    },
    c.id
  )) }) });
}, ma = w.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`, ga = w.div`
  padding: 20px;
  background: white;
  border-radius: ${(e) => e.$theme.borderRadius};
  border: 1px solid ${(e) => e.$theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  min-width: 200px;
`, ya = w.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`, wa = w.h3`
  margin: 0;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
  text-align: center;
`, ba = w.p`
  margin: 0;
  color: ${(e) => e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
`, xa = w.div`
  padding: 12px 16px;
  background: ${(e) => e.$theme.colors.dangerLight || "#fef2f2"};
  color: ${(e) => e.$theme.colors.danger};
  border-radius: ${(e) => e.$theme.borderRadius};
  border: 1px solid ${(e) => e.$theme.colors.danger};
  text-align: center;
  font-size: 14px;
`, oc = ({
  qrCode: e,
  isLoading: t = !1,
  onRefresh: n,
  instanceName: r
}) => {
  const { theme: o } = ee(), s = () => t ? /* @__PURE__ */ y(an, { size: "lg", text: "Gerando QR Code..." }) : e ? /* @__PURE__ */ y(ya, { src: e, alt: "QR Code para conexão" }) : /* @__PURE__ */ _(Br, { children: [
    /* @__PURE__ */ y(xa, { $theme: o, children: "QR Code não disponível" }),
    n && /* @__PURE__ */ y(Te, { variant: "primary", onClick: n, children: "Tentar Novamente" })
  ] });
  return /* @__PURE__ */ y(ie, { variant: "elevated", padding: "lg", children: /* @__PURE__ */ _(ma, { children: [
    /* @__PURE__ */ y(wa, { $theme: o, children: r ? `Conectar ${r}` : "Conectar WhatsApp" }),
    /* @__PURE__ */ _(ba, { $theme: o, children: [
      "1. Abra o WhatsApp no seu telefone",
      /* @__PURE__ */ y("br", {}),
      '2. Toque em Menu ou Configurações e selecione "Aparelhos conectados"',
      /* @__PURE__ */ y("br", {}),
      '3. Toque em "Conectar um aparelho"',
      /* @__PURE__ */ y("br", {}),
      "4. Aponte seu telefone para esta tela para capturar o código"
    ] }),
    /* @__PURE__ */ y(ga, { $theme: o, children: s() }),
    e && n && /* @__PURE__ */ y(Te, { variant: "ghost", onClick: n, children: "Atualizar QR Code" })
  ] }) });
}, $a = w.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`, Sa = w.label`
  font-size: 14px;
  font-weight: 500;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
`, va = w.input`
  border-radius: ${(e) => e.$theme.borderRadius};
  font-family: ${(e) => e.$theme.fonts.primary};
  transition: all 0.2s ease;
  outline: none;

  ${(e) => ({
  sm: "padding: 8px 12px; font-size: 14px; height: 32px;",
  md: "padding: 12px 16px; font-size: 14px; height: 40px;",
  lg: "padding: 16px 20px; font-size: 16px; height: 48px;"
})[e.$size]}

  ${(e) => {
  const t = `
      color: ${e.$theme.colors.text};
      background: ${e.$theme.colors.background};
    `;
  return e.$error ? `
        ${t}
        border: 2px solid ${e.$theme.colors.danger};
        &:focus { border-color: ${e.$theme.colors.danger}; }
      ` : {
    default: `
        ${t}
        border: 1px solid ${e.$theme.colors.border};
        &:focus { border-color: ${e.$theme.colors.primary}; }
      `,
    outlined: `
        ${t}
        border: 2px solid ${e.$theme.colors.border};
        &:focus { border-color: ${e.$theme.colors.primary}; }
      `,
    filled: `
        ${t}
        border: 1px solid transparent;
        background: ${e.$theme.colors.secondary};
        &:focus { border-color: ${e.$theme.colors.primary}; }
      `
  }[e.$variant];
}}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(e) => e.$theme.colors.textSecondary};
  }
`, Ea = w.span`
  font-size: 12px;
  color: ${(e) => e.$error ? e.$theme.colors.danger : e.$theme.colors.textSecondary};
  font-family: ${(e) => e.$theme.fonts.primary};
`, sc = ({
  variant: e = "default",
  inputSize: t = "md",
  error: n = !1,
  label: r,
  helperText: o,
  ...s
}) => {
  const { theme: i } = ee();
  return /* @__PURE__ */ _($a, { children: [
    r && /* @__PURE__ */ y(Sa, { $theme: i, children: r }),
    /* @__PURE__ */ y(
      va,
      {
        $variant: e,
        $size: t,
        $error: n,
        $theme: i,
        ...s
      }
    ),
    o && /* @__PURE__ */ y(Ea, { $error: n, $theme: i, children: o })
  ] });
}, Ra = w.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(e) => e.$isOpen ? 1 : 0};
  visibility: ${(e) => e.$isOpen ? "visible" : "hidden"};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`, ka = w.div`
  background: ${(e) => e.$theme.colors.background};
  border-radius: ${(e) => e.$theme.borderRadius};
  border: 1px solid ${(e) => e.$theme.colors.border};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;

  ${(e) => ({
  sm: "width: 400px; max-width: 90vw;",
  md: "width: 500px; max-width: 90vw;",
  lg: "width: 700px; max-width: 90vw;",
  xl: "width: 900px; max-width: 95vw;"
})[e.$size]}
`, Ca = w.div`
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${(e) => e.$theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`, Aa = w.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(e) => e.$theme.colors.text};
  font-family: ${(e) => e.$theme.fonts.primary};
`, Oa = w.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(e) => e.$theme.colors.textSecondary};
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${(e) => e.$theme.colors.secondary};
  }
`, Ta = w.div`
  padding: 20px 24px;
`, ic = ({
  isOpen: e,
  onClose: t,
  title: n,
  children: r,
  size: o = "md",
  showCloseButton: s = !0
}) => {
  const { theme: i } = ee(), a = (u) => {
    u.target === u.currentTarget && t();
  }, c = (u) => {
    u.key === "Escape" && t();
  };
  return de.useEffect(() => (e ? (document.addEventListener("keydown", c), document.body.style.overflow = "hidden") : document.body.style.overflow = "unset", () => {
    document.removeEventListener("keydown", c), document.body.style.overflow = "unset";
  }), [e]), /* @__PURE__ */ y(Ra, { $isOpen: e, onClick: a, children: /* @__PURE__ */ _(ka, { $size: o, $theme: i, children: [
    (n || s) && /* @__PURE__ */ _(Ca, { $theme: i, children: [
      n && /* @__PURE__ */ y(Aa, { $theme: i, children: n }),
      s && /* @__PURE__ */ y(Oa, { $theme: i, onClick: t, children: "×" })
    ] }),
    /* @__PURE__ */ y(Ta, { children: r })
  ] }) });
}, ac = {
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
}, cc = {
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
  Et as Badge,
  Te as Button,
  ie as Card,
  tc as ConnectionStatus,
  rc as ContactList,
  Ci as EvolutionManager,
  sc as Input,
  ec as InstanceCard,
  an as Loading,
  nc as MessageList,
  ic as Modal,
  oc as QRCodeDisplay,
  _a as ThemeProvider,
  cc as darkTheme,
  ac as defaultTheme,
  Za as useEvolutionManager,
  ee as useTheme
};
