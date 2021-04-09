var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, {enumerable: true, configurable: true, writable: true, value}) : obj[key2] = value;
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
import {randomBytes, createHash} from "crypto";
import http from "http";
import https from "https";
import zlib from "zlib";
import Stream, {PassThrough, pipeline} from "stream";
import fetch$2 from "cross-fetch";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", {value: true});
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
function createCommonjsModule$1(fn) {
  var module = {exports: {}};
  return fn(module, module.exports), module.exports;
}
var isBufferBrowser = function isBuffer(arg) {
  return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
};
var inherits_browser$2 = createCommonjsModule$1(function(module) {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
});
var util$1 = createCommonjsModule$1(function(module, exports) {
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };
  var formatRegExp = /%[sdj%]/g;
  exports.format = function(f2) {
    if (!isString(f2)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect4(arguments[i]));
      }
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f2).replace(formatRegExp, function(x2) {
      if (x2 === "%%")
        return "%";
      if (i >= len)
        return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += " " + x;
      } else {
        str += " " + inspect4(x);
      }
    }
    return str;
  };
  exports.deprecate = function(fn, msg) {
    if (typeof process !== "undefined" && process.noDeprecation === true) {
      return fn;
    }
    if (typeof process === "undefined") {
      return function() {
        return exports.deprecate(fn, msg).apply(this, arguments);
      };
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  };
  var debugs = {};
  var debugEnviron;
  exports.debuglog = function(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = "";
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
        var pid = process.pid;
        debugs[set] = function() {
          var msg = exports.format.apply(exports, arguments);
          console.error("%s %d: %s", set, pid, msg);
        };
      } else {
        debugs[set] = function() {
        };
      }
    }
    return debugs[set];
  };
  function inspect4(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3)
      ctx.depth = arguments[2];
    if (arguments.length >= 4)
      ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      exports._extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden))
      ctx.showHidden = false;
    if (isUndefined(ctx.depth))
      ctx.depth = 2;
    if (isUndefined(ctx.colors))
      ctx.colors = false;
    if (isUndefined(ctx.customInspect))
      ctx.customInspect = true;
    if (ctx.colors)
      ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports.inspect = inspect4;
  inspect4.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  };
  inspect4.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };
  function stylizeWithColor(str, styleType) {
    var style = inspect4.styles[styleType];
    if (style) {
      return "[" + inspect4.colors[style][0] + "m" + str + "[" + inspect4.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError(value);
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name2 = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name2 + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    var base2 = "", array = false, braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : "";
      base2 = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base2 = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base2 = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base2 = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base2 + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key2) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key2, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base2, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value))
      return ctx.stylize("" + value, "number");
    if (isBoolean(value))
      return ctx.stylize("" + value, "boolean");
    if (isNull(value))
      return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty2(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push("");
      }
    }
    keys.forEach(function(key2) {
      if (!key2.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key2, true));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key2, array) {
    var name2, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key2) || {value: value[key2]};
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty2(visibleKeys, key2)) {
      name2 = "[" + key2 + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name2)) {
      if (array && key2.match(/^\d+$/)) {
        return str;
      }
      name2 = JSON.stringify("" + key2);
      if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name2 = name2.substr(1, name2.length - 2);
        name2 = ctx.stylize(name2, "name");
      } else {
        name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name2 = ctx.stylize(name2, "string");
      }
    }
    return name2 + ": " + str;
  }
  function reduceToSingleString(output, base2, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf("\n") >= 0)
        ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
  }
  function isArray(ar) {
    return Array.isArray(ar);
  }
  exports.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  exports.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  exports.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  exports.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  exports.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  exports.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  exports.isUndefined = isUndefined;
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  exports.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports.isObject = isObject;
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  exports.isDate = isDate;
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  exports.isError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  exports.isFunction = isFunction;
  function isPrimitive2(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
  }
  exports.isPrimitive = isPrimitive2;
  exports.isBuffer = isBufferBrowser;
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad3(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function timestamp() {
    var d = new Date();
    var time = [
      pad3(d.getHours()),
      pad3(d.getMinutes()),
      pad3(d.getSeconds())
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  exports.log = function() {
    console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
  };
  exports.inherits = inherits_browser$2;
  exports._extend = function(origin, add3) {
    if (!add3 || !isObject(add3))
      return origin;
    var keys = Object.keys(add3);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add3[keys[i]];
    }
    return origin;
  };
  function hasOwnProperty2(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
  exports.promisify = function promisify(original) {
    if (typeof original !== "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      var fn = original[kCustomPromisifiedSymbol];
      if (typeof fn !== "function") {
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      }
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn;
    }
    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function(resolve2, reject) {
        promiseResolve = resolve2;
        promiseReject = reject;
      });
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      args.push(function(err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });
      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol)
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
  };
  exports.promisify.custom = kCustomPromisifiedSymbol;
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      var newReason = new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify(original) {
    if (typeof original !== "function") {
      throw new TypeError('The "original" argument must be of type Function');
    }
    function callbackified() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      var maybeCb = args.pop();
      if (typeof maybeCb !== "function") {
        throw new TypeError("The last argument must be of type Function");
      }
      var self2 = this;
      var cb = function() {
        return maybeCb.apply(self2, arguments);
      };
      original.apply(this, args).then(function(ret) {
        process.nextTick(cb, null, ret);
      }, function(rej) {
        process.nextTick(callbackifyOnRejected, rej, cb);
      });
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
  }
  exports.callbackify = callbackify;
});
/*! https://mths.be/punycode v1.3.2 by @mathias */
var punycode = createCommonjsModule$1(function(module, exports) {
  (function(root) {
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
      root = freeGlobal;
    }
    var punycode2, maxInt = 2147483647, base2 = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, baseMinusTMin = base2 - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key2;
    function error2(type) {
      throw RangeError(errors[type]);
    }
    function map(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output = [], counter = 0, length = string.length, value, extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      return map(array, function(value) {
        var output = "";
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
        return output;
      }).join("");
    }
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base2;
    }
    function digitToBasic(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base2) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    function decode2(input) {
      var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index2, oldi, w, k, digit, t, baseMinusT;
      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error2("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (index2 = basic > 0 ? basic + 1 : 0; index2 < inputLength; ) {
        for (oldi = i, w = 1, k = base2; ; k += base2) {
          if (index2 >= inputLength) {
            error2("invalid-input");
          }
          digit = basicToDigit(input.charCodeAt(index2++));
          if (digit >= base2 || digit > floor((maxInt - i) / w)) {
            error2("overflow");
          }
          i += digit * w;
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          baseMinusT = base2 - t;
          if (w > floor(maxInt / baseMinusT)) {
            error2("overflow");
          }
          w *= baseMinusT;
        }
        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error2("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return ucs2encode(output);
    }
    function encode3(input) {
      var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
      input = ucs2decode(input);
      inputLength = input.length;
      n = initialN;
      delta = 0;
      bias = initialBias;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      handledCPCount = basicLength = output.length;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error2("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < n && ++delta > maxInt) {
            error2("overflow");
          }
          if (currentValue == n) {
            for (q = delta, k = base2; ; k += base2) {
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base2 - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    }
    function toUnicode(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
      });
    }
    function toASCII(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode3(string) : string;
      });
    }
    punycode2 = {
      version: "1.3.2",
      ucs2: {
        decode: ucs2decode,
        encode: ucs2encode
      },
      decode: decode2,
      encode: encode3,
      toASCII,
      toUnicode
    };
    if (freeExports && freeModule) {
      if (module.exports == freeExports) {
        freeModule.exports = punycode2;
      } else {
        for (key2 in punycode2) {
          punycode2.hasOwnProperty(key2) && (freeExports[key2] = punycode2[key2]);
        }
      }
    } else {
      root.punycode = punycode2;
    }
  })(commonjsGlobal);
});
var util = {
  isString: function(arg) {
    return typeof arg === "string";
  },
  isObject: function(arg) {
    return typeof arg === "object" && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var decode$2 = function(qs, sep, eq4, options) {
  sep = sep || "&";
  eq4 = eq4 || "=";
  var obj = {};
  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1e3;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq4), kstr, vstr, k, v;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = "";
    }
    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);
    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }
  return obj;
};
var stringifyPrimitive$1 = function(v) {
  switch (typeof v) {
    case "string":
      return v;
    case "boolean":
      return v ? "true" : "false";
    case "number":
      return isFinite(v) ? v : "";
    default:
      return "";
  }
};
var encode$3 = function(obj, sep, eq4, name2) {
  sep = sep || "&";
  eq4 = eq4 || "=";
  if (obj === null) {
    obj = void 0;
  }
  if (typeof obj === "object") {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive$1(k)) + eq4;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive$1(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive$1(obj[k]));
      }
    }).join(sep);
  }
  if (!name2)
    return "";
  return encodeURIComponent(stringifyPrimitive$1(name2)) + eq4 + encodeURIComponent(stringifyPrimitive$1(obj));
};
var querystring = createCommonjsModule$1(function(module, exports) {
  exports.decode = exports.parse = decode$2;
  exports.encode = exports.stringify = encode$3;
});
var parse$1 = urlParse;
var resolve = urlResolve;
var resolveObject = urlResolveObject;
var format = urlFormat;
var Url_1 = Url;
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
  javascript: true,
  "javascript:": true
}, hostlessProtocol = {
  javascript: true,
  "javascript:": true
}, slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function urlParse(url2, parseQueryString, slashesDenoteHost) {
  if (url2 && util.isObject(url2) && url2 instanceof Url)
    return url2;
  var u = new Url();
  u.parse(url2, parseQueryString, slashesDenoteHost);
  return u;
}
Url.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url2)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
  }
  var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, "/");
  url2 = uSplit.join(splitter);
  var rest = url2;
  rest = rest.trim();
  if (!slashesDenoteHost && url2.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = "";
        this.query = {};
      }
      return this;
    }
  }
  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    var auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    if (hostEnd === -1)
      hostEnd = rest.length;
    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost();
    this.hostname = this.hostname || "";
    var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part)
          continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = "";
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = "/" + notHost.join(".") + rest;
            }
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = "";
    } else {
      this.hostname = this.hostname.toLowerCase();
    }
    if (!ipv6Hostname) {
      this.hostname = punycode.toASCII(this.hostname);
    }
    var p = this.port ? ":" + this.port : "";
    var h = this.hostname || "";
    this.host = h + p;
    this.href += this.host;
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== "/") {
        rest = "/" + rest;
      }
    }
  }
  if (!unsafeProtocol[lowerProto]) {
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    this.search = "";
    this.query = {};
  }
  if (rest)
    this.pathname = rest;
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = "/";
  }
  if (this.pathname || this.search) {
    var p = this.pathname || "";
    var s2 = this.search || "";
    this.path = p + s2;
  }
  this.href = this.format();
  return this;
};
function urlFormat(obj) {
  if (util.isString(obj))
    obj = urlParse(obj);
  if (!(obj instanceof Url))
    return Url.prototype.format.call(obj);
  return obj.format();
}
Url.prototype.format = function() {
  var auth = this.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
    if (this.port) {
      host += ":" + this.port;
    }
  }
  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }
  var search = this.search || query && "?" + query || "";
  if (protocol && protocol.substr(-1) !== ":")
    protocol += ":";
  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/")
      pathname = "/" + pathname;
  } else if (!host) {
    host = "";
  }
  if (hash && hash.charAt(0) !== "#")
    hash = "#" + hash;
  if (search && search.charAt(0) !== "?")
    search = "?" + search;
  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash;
};
function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}
Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};
function urlResolveObject(source, relative) {
  if (!source)
    return relative;
  return urlParse(source, false, true).resolveObject(relative);
}
Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }
  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }
  result.hash = relative.hash;
  if (relative.href === "") {
    result.href = result.format();
    return result;
  }
  if (relative.slashes && !relative.protocol) {
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== "protocol")
        result[rkey] = relative[rkey];
    }
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = "/";
    }
    result.href = result.format();
    return result;
  }
  if (relative.protocol && relative.protocol !== result.protocol) {
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }
    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || "").split("/");
      while (relPath.length && !(relative.host = relPath.shift()))
        ;
      if (!relative.host)
        relative.host = "";
      if (!relative.hostname)
        relative.hostname = "";
      if (relPath[0] !== "")
        relPath.unshift("");
      if (relPath.length < 2)
        relPath.unshift("");
      result.pathname = relPath.join("/");
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || "";
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    if (result.pathname || result.search) {
      var p = result.pathname || "";
      var s2 = result.search || "";
      result.path = p + s2;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }
  var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
  if (psychotic) {
    result.hostname = "";
    result.port = null;
    if (result.host) {
      if (srcPath[0] === "")
        srcPath[0] = result.host;
      else
        srcPath.unshift(result.host);
    }
    result.host = "";
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === "")
          relPath[0] = relative.host;
        else
          relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
  }
  if (isRelAbs) {
    result.host = relative.host || relative.host === "" ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
  } else if (relPath.length) {
    if (!srcPath)
      srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.href = result.format();
    return result;
  }
  if (!srcPath.length) {
    result.pathname = null;
    if (result.search) {
      result.path = "/" + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === ".") {
      srcPath.splice(i, 1);
    } else if (last === "..") {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift("..");
    }
  }
  if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
    srcPath.unshift("");
  }
  if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
    srcPath.push("");
  }
  var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
    var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }
  mustEndAbs = mustEndAbs || result.host && srcPath.length;
  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift("");
  }
  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join("/");
  }
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};
Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host)
    this.hostname = host;
};
var url = {
  parse: parse$1,
  resolve,
  resolveObject,
  format,
  Url: Url_1
};
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names2 = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names2.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names2.has(thing)) {
      return names2.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names2.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names2.forEach(function(name2, thing) {
      params_1.push(name2);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name2 + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name2 + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name2 + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name2 + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? name2 + "_" : name2;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
const {Readable} = Stream;
const wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
class Blob {
  constructor(blobParts = [], options = {type: ""}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options.type === void 0 ? "" : String(options.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
}
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
class FetchBaseError extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class FetchError extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
}
const NAME = Symbol.toStringTag;
const isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
const isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
const isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
const carriage = "\r\n";
const dashes = "-".repeat(2);
const carriageLength = Buffer.byteLength(carriage);
const getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name2, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name2}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
const getBoundary = () => randomBytes(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name2, value] of form) {
    yield getHeader(boundary, name2, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name2, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name2, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
const INTERNALS$2 = Symbol("Body internals");
class Body {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (util$1.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = Stream.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
}
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({highWaterMark});
    p2 = new PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
const extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || util$1.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
const writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
const validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name2) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name2)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name2}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
const validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name2, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name2}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
class Headers extends URLSearchParams {
  constructor(init5) {
    let result = [];
    if (init5 instanceof Headers) {
      const raw = init5.raw();
      for (const [name2, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name2, value]));
      }
    } else if (init5 == null)
      ;
    else if (typeof init5 === "object" && !util$1.types.isBoxedPrimitive(init5)) {
      const method = init5[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init5));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init5].map((pair) => {
          if (typeof pair !== "object" || util$1.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name2, value]) => {
      validateHeaderName(name2);
      validateHeaderValue(name2, String(value));
      return [String(name2).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name2, value) => {
              validateHeaderName(name2);
              validateHeaderValue(name2, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name2).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name2) => {
              validateHeaderName(name2);
              return URLSearchParams.prototype[p].call(receiver, String(name2).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name2) {
    const values = this.getAll(name2);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name2)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name2 of this.keys()) {
      callback(this.get(name2), name2);
    }
  }
  *values() {
    for (const name2 of this.keys()) {
      yield this.get(name2);
    }
  }
  *entries() {
    for (const name2 of this.keys()) {
      yield [name2, this.get(name2)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key2) => {
      result[key2] = this.getAll(key2);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key2) => {
      const values = this.getAll(key2);
      if (key2 === "host") {
        result[key2] = values[0];
      } else {
        result[key2] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
}
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name2, value]) => {
    try {
      validateHeaderName(name2);
      validateHeaderValue(name2, String(value));
      return true;
    } catch (e) {
      return false;
    }
  }));
}
const redirectStatus = new Set([301, 302, 303, 307, 308]);
const isRedirect = (code) => {
  return redirectStatus.has(code);
};
const INTERNALS$1 = Symbol("Response internals");
class Response extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status || 200;
    const headers = new Headers(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url2, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url2).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(Response.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
const getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
const INTERNALS = Symbol("Request internals");
const isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
class Request extends Body {
  constructor(input, init5 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init5.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init5.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init5.body ? init5.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init5.size || input.size || 0
    });
    const headers = new Headers(init5.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init5) {
      signal = init5.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init5.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init5.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init5.follow;
    this.compress = init5.compress === void 0 ? input.compress === void 0 ? true : input.compress : init5.compress;
    this.counter = init5.counter || input.counter || 0;
    this.agent = init5.agent || input.agent;
    this.highWaterMark = init5.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init5.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return format(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
const getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
class AbortError extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
}
const supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch$1(url2, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url2, options_);
    const options = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url2}. URL scheme "${options.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options.protocol === "https:" ? https : http).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch$1(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = pipeline(response_, new PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pipeline(body, zlib.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = pipeline(body, zlib.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update8(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update8, subscribe};
}
function normalize(loaded) {
  if (loaded.error) {
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error2};
    }
    return {status, error: error2};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
const s$2 = JSON.stringify;
async function respond({request, options, $session, route, status = 200, error: error2}) {
  const serialized_session = try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  });
  const serialized_data = [];
  const match = error2 ? null : route.pattern.exec(request.path);
  const params = error2 ? {} : route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let uses_credentials = false;
  const fetcher = async (resource, opts = {}) => {
    let url$1;
    if (typeof resource === "string") {
      url$1 = resource;
    } else {
      url$1 = resource.url;
      opts = {
        method: resource.method,
        headers: resource.headers,
        body: resource.body,
        mode: resource.mode,
        credentials: resource.credentials,
        cache: resource.cache,
        redirect: resource.redirect,
        referrer: resource.referrer,
        integrity: resource.integrity,
        ...opts
      };
    }
    if (options.local && url$1.startsWith(options.paths.assets)) {
      url$1 = url$1.replace(options.paths.assets, "");
    }
    const parsed = parse$1(url$1);
    let response;
    if (parsed.protocol) {
      response = await fetch$1(parsed.href, opts);
    } else {
      const resolved = resolve(request.path, parsed.pathname);
      const filename = resolved.slice(1);
      const filename_html = `${filename}/index.html`;
      const asset = options.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
      if (asset) {
        if (options.get_static_file) {
          response = new Response(options.get_static_file(asset.file), {
            headers: {
              "content-type": asset.type
            }
          });
        } else {
          response = await fetch$1(`http://${page.host}/${asset.file}`, opts);
        }
      }
      if (!response) {
        const headers2 = {...opts.headers};
        if (opts.credentials !== "omit") {
          uses_credentials = true;
          headers2.cookie = request.headers.cookie;
          if (!headers2.authorization) {
            headers2.authorization = request.headers.authorization;
          }
        }
        const rendered2 = await ssr({
          host: request.host,
          method: opts.method || "GET",
          headers: headers2,
          path: resolved,
          body: opts.body,
          query: new url.URLSearchParams(parsed.query || "")
        }, {
          ...options,
          fetched: url$1,
          initiator: route
        });
        if (rendered2) {
          if (options.dependencies) {
            options.dependencies.set(resolved, rendered2);
          }
          response = new Response(rendered2.body, {
            status: rendered2.status,
            headers: rendered2.headers
          });
        }
      }
    }
    if (response && page_config.hydrate) {
      const proxy = new Proxy(response, {
        get(response2, key2, receiver) {
          async function text() {
            const body2 = await response2.text();
            const headers2 = {};
            response2.headers.forEach((value, key3) => {
              if (key3 !== "etag" && key3 !== "set-cookie")
                headers2[key3] = value;
            });
            serialized_data.push({
              url: url$1,
              json: `{"status":${response2.status},"statusText":${s$2(response2.statusText)},"headers":${s$2(headers2)},"body":${escape$2(body2)}}`
            });
            return body2;
          }
          if (key2 === "text") {
            return text;
          }
          if (key2 === "json") {
            return async () => {
              return JSON.parse(await text());
            };
          }
          return Reflect.get(response2, key2, receiver);
        }
      });
      return proxy;
    }
    return response || new Response("Not found", {
      status: 404
    });
  };
  const component_promises = error2 ? [options.manifest.layout()] : [options.manifest.layout(), ...route.parts.map((part) => part.load())];
  const components2 = [];
  const props_promises = [];
  let context = {};
  let maxage;
  let page_component;
  try {
    page_component = error2 ? {ssr: options.ssr, router: options.router, hydrate: options.hydrate} : await component_promises[component_promises.length - 1];
  } catch (e) {
    return await respond({
      request,
      options,
      $session,
      route: null,
      status: 500,
      error: e instanceof Error ? e : {name: "Error", message: e.toString()}
    });
  }
  const page_config = {
    ssr: "ssr" in page_component ? page_component.ssr : options.ssr,
    router: "router" in page_component ? page_component.router : options.router,
    hydrate: "hydrate" in page_component ? page_component.hydrate : options.hydrate
  };
  if (options.only_render_prerenderable_pages) {
    if (error2) {
      return {
        status,
        headers: {},
        body: error2.message
      };
    }
    if (!page_component.prerender) {
      return {
        status: 204,
        headers: {},
        body: null
      };
    }
  }
  let rendered;
  if (page_config.ssr) {
    for (let i = 0; i < component_promises.length; i += 1) {
      let loaded;
      try {
        const mod = await component_promises[i];
        components2[i] = mod.default;
        if (mod.load) {
          loaded = await mod.load.call(null, {
            page,
            get session() {
              uses_credentials = true;
              return $session;
            },
            fetch: fetcher,
            context: {...context}
          });
          if (!loaded && mod === page_component)
            return;
        }
      } catch (e) {
        if (error2)
          throw e instanceof Error ? e : new Error(e);
        loaded = {
          error: e instanceof Error ? e : {name: "Error", message: e.toString()},
          status: 500
        };
      }
      if (loaded) {
        loaded = normalize(loaded);
        if (loaded.error) {
          return await respond({
            request,
            options,
            $session,
            route: null,
            status: loaded.status,
            error: loaded.error
          });
        }
        if (loaded.redirect) {
          return {
            status: loaded.status,
            headers: {
              location: loaded.redirect
            }
          };
        }
        if (loaded.context) {
          context = {
            ...context,
            ...loaded.context
          };
        }
        maxage = loaded.maxage || 0;
        props_promises[i] = loaded.props;
      }
    }
    const session = writable($session);
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        uses_credentials = true;
    });
    session_tracking_active = true;
    if (error2) {
      if (options.dev) {
        error2.stack = await options.get_stack(error2);
      } else {
        error2.stack = String(error2);
      }
    }
    const props = {
      status,
      error: error2,
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: components2
    };
    for (let i = 0; i < props_promises.length; i += 1) {
      props[`props_${i}`] = await props_promises[i];
    }
    try {
      rendered = options.root.render(props);
    } catch (e) {
      if (error2)
        throw e instanceof Error ? e : new Error(e);
      return await respond({
        request,
        options,
        $session,
        route: null,
        status: 500,
        error: e instanceof Error ? e : {name: "Error", message: e.toString()}
      });
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {
      head: "",
      html: "",
      css: ""
    };
  }
  const js_deps = route && page_config.ssr ? route.js : [];
  const css_deps = route && page_config.ssr ? route.css : [];
  const style = route && page_config.ssr ? route.style : "";
  const prefix = `${options.paths.assets}/${options.app_dir}`;
  const links = options.amp ? `<style amp-custom>${style || (await Promise.all(css_deps.map((dep) => options.get_amp_css(dep)))).join("\n")}</style>` : [
    ...js_deps.map((dep) => `<link rel="modulepreload" href="${prefix}/${dep}">`),
    ...css_deps.map((dep) => `<link rel="stylesheet" href="${prefix}/${dep}">`)
  ].join("\n			");
  let init5 = "";
  if (options.amp) {
    init5 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (page_config.router || page_config.hydrate) {
    init5 = `
		<script type="module">
			import { start } from ${s$2(options.entry)};
			start({
				target: ${options.target ? `document.querySelector(${s$2(options.target)})` : "document.body"},
				paths: ${s$2(options.paths)},
				session: ${serialized_session},
				host: ${request.host ? s$2(request.host) : "location.host"},
				route: ${!!page_config.router},
				hydrate: ${page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: ${route ? `[
						${(route ? route.parts : []).map((part) => `import(${s$2(options.get_component_path(part.id))})`).join(",\n						")}
					]` : "[]"},
					page: {
						host: ${request.host ? s$2(request.host) : "location.host"}, // TODO this is redundant
						path: ${s$2(request.path)},
						query: new URLSearchParams(${s$2(request.query.toString())}),
						params: ${s$2(params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    style && !options.amp ? `<style data-svelte>${style}</style>` : "",
    links,
    init5
  ].join("\n\n");
  const body = options.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url: url2, json}) => `<script type="svelte-data" url="${url2}">${json}</script>`).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${uses_credentials ? "private" : "public"}, max-age=${maxage}`;
  }
  return {
    status,
    headers,
    body: options.template({head, body})
  };
}
async function render_page(request, route, options) {
  if (options.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options.hooks.getSession({context: request.context});
  const response = await respond({
    request,
    options,
    $session,
    route,
    status: route ? 200 : 404,
    error: route ? null : new Error(`Not found: ${request.path}`)
  });
  if (response) {
    return response;
  }
  if (options.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${options.fetched}`
    };
  }
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const {name: name2, message, stack} = error2;
    serialized = try_serialize({name: name2, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
const escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$2(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object" || response.body == null) {
        return {
          status: 500,
          body: `Invalid response from route ${request.path}; ${response.body == null ? "body is missing" : `expected an object, got ${typeof response}`}`,
          headers: {}
        };
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      if (typeof body === "object" && !("content-type" in headers) || headers["content-type"] === "application/json") {
        headers = {...headers, "content-type": "application/json"};
        body = JSON.stringify(body);
      }
      return {status, body, headers};
    }
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function md5(body) {
  return createHash("md5").update(body).digest("hex");
}
async function ssr(incoming, options) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: incoming.path.slice(0, -1) + (q ? `?${q}` : "")
      }
    };
  }
  const context = await options.hooks.getContext(incoming) || {};
  try {
    return await options.hooks.handle({
      ...incoming,
      params: null,
      context
    }, async (request) => {
      for (const route of options.manifest.routes) {
        if (!route.pattern.test(request.path))
          continue;
        const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options);
        if (response) {
          if (response.status === 200) {
            if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
              const etag = `"${md5(response.body)}"`;
              if (request.headers["if-none-match"] === etag) {
                return {
                  status: 304,
                  headers: {},
                  body: null
                };
              }
              response.headers["etag"] = etag;
            }
          }
          return response;
        }
      }
      return await render_page(request, null, options);
    });
  } catch (e) {
    if (e && e.stack) {
      e.stack = await options.get_stack(e);
    }
    console.error(e && e.stack || e);
    return {
      status: 500,
      headers: {},
      body: options.dev ? e.stack : e.message
    };
  }
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape$1(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name2) {
  if (!component || !component.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(`<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name2}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape$1(value)) : `"${value}"`}`}`;
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error2} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape$1(status)}</h1>

<p>${escape$1(error2.message)}</p>


${error2.stack ? `<pre>${escape$1(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Error$1
});
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
const css$6 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\timport ErrorComponent from \\"../components/error.svelte\\";\\n\\n\\t// error handling\\n\\texport let status = undefined;\\n\\texport let error = undefined;\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\n\\tconst Layout = components[0];\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title;\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<Layout {...(props_0 || {})}>\\n\\t{#if error}\\n\\t\\t<ErrorComponent {status} {error}/>\\n\\t{:else}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}/>\\n\\t{/if}\\n</Layout>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\tNavigated to {title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AA0DC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status = void 0} = $$props;
  let {error: error2 = void 0} = $$props;
  let {stores} = $$props;
  let {page} = $$props;
  let {components: components2} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  const Layout = components2[0];
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title;
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components2 !== void 0)
    $$bindings.components(components2);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  $$result.css.add(css$6);
  {
    stores.page.set(page);
  }
  return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${error2 ? `${validate_component(Error$1, "ErrorComponent").$$render($$result, {status, error: error2}, {}, {})}` : `${validate_component(components2[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `Navigated to ${escape$1(title)}` : ``}</div>` : ``}`;
});
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({head, body}) => `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="/favicon.ico" />
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-XR78KY8ZFJ"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-XR78KY8ZFJ');
	</script>


	` + head + '\n</head>\n\n<body>\n	<div id="svelte">' + body + "</div>\n</body>\n\n</html>\n\n<style>\n	h1,\n	h2,\n	h3,\n	h4,\n	h5,\n	p,\n	a,\n	li,\n	ul,\n	button,\n	input {\n		font-family: 'Open Sans', sans-serif;\n\n		color: white;\n		margin: 0;\n		inline-size: fit-content;\n	}\n\n	.row {\n		display: flex;\n		flex-direction: row;\n	}\n</style>";
function init({paths, prerendering}) {
}
const empty = () => ({});
const components = [
  () => Promise.resolve().then(function() {
    return index;
  }),
  () => Promise.resolve().then(function() {
    return clubs;
  })
];
const client_component_lookup = {".svelte/build/runtime/internal/start.js": "start-34aef2eb.js", "src/routes/index.svelte": "pages/index.svelte-4b6ec3cb.js", "src/routes/clubs.svelte": "pages/clubs.svelte-f9724ef8.js"};
const manifest = {
  assets: [{file: "favicon.ico", size: 1150, type: "image/vnd.microsoft.icon"}, {file: "robots.txt", size: 67, type: "text/plain"}],
  layout: () => Promise.resolve().then(function() {
    return $layout$1;
  }),
  error: () => Promise.resolve().then(function() {
    return error;
  }),
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      parts: [{id: "src/routes/index.svelte", load: components[0]}],
      css: ["assets/start-1b5e1f57.css", "assets/pages/index.svelte-a00e5b17.css"],
      js: ["start-34aef2eb.js", "chunks/vendor-e88cc22c.js", "chunks/preload-helper-9f12a5fd.js", "pages/index.svelte-4b6ec3cb.js"]
    },
    {
      type: "page",
      pattern: /^\/clubs\/?$/,
      params: empty,
      parts: [{id: "src/routes/clubs.svelte", load: components[1]}],
      css: ["assets/start-1b5e1f57.css", "assets/clubs-ae2eec07.css"],
      js: ["start-34aef2eb.js", "chunks/vendor-e88cc22c.js", "chunks/preload-helper-9f12a5fd.js", "pages/clubs.svelte-f9724ef8.js", "chunks/clubs-90ba221c.js"]
    }
  ]
};
const get_hooks = (hooks2) => ({
  getContext: hooks2.getContext || (() => ({})),
  getSession: hooks2.getSession || (() => ({})),
  handle: hooks2.handle || ((request, render2) => render2(request))
});
const hooks = get_hooks(user_hooks);
function render(request, {
  paths = {base: "", assets: "/."},
  local = false,
  dependencies,
  only_render_prerenderable_pages = false,
  get_static_file
} = {}) {
  return ssr({
    ...request,
    host: request.headers["host"]
  }, {
    paths,
    local,
    template,
    manifest,
    target: "#svelte",
    entry: "/./_app/start-34aef2eb.js",
    root: Root,
    hooks,
    dev: false,
    amp: false,
    dependencies,
    only_render_prerenderable_pages,
    app_dir: "_app",
    get_component_path: (id2) => "/./_app/" + client_component_lookup[id2],
    get_stack: (error2) => error2.stack,
    get_static_file,
    get_amp_css: (dep) => amp_css_lookup[dep],
    ssr: true,
    router: true,
    hydrate: true
  });
}
var index_svelte_svelte_type_style_lang = "nav{display:none}body{margin:0;height:100vh;background:linear-gradient(235.71deg, #400a84 7.8%, #1b0a30 92.44%)}main.svelte-qgj3c0.svelte-qgj3c0{padding:1em;width:480px;margin:auto;position:absolute;top:calc(50% - 200px);left:calc(50% - 240px)}main.svelte-qgj3c0 h3.svelte-qgj3c0{margin-top:16px;margin-bottom:8px}.email-form.svelte-qgj3c0.svelte-qgj3c0{width:480px;margin:32px auto;display:flex;flex-direction:column;align-items:flex-start;padding:24px;background:linear-gradient(0deg, #040a11, #040a11), #0352af;box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);border-radius:8px}.email-form.svelte-qgj3c0 .form-input.svelte-qgj3c0{width:100%;display:flex}.email-form.svelte-qgj3c0 .form-input input.svelte-qgj3c0{flex:1;height:48px;border:none;background:rgba(142, 145, 148, 0.1);border-radius:4px;color:white;margin-right:16px;padding:0 16px}.email-form.svelte-qgj3c0 .form-input button.svelte-qgj3c0{height:48px;width:80px;border:none;background:#400a84;border-radius:4px;padding:8px;color:white;font-weight:600;font-size:14px}.email-form.svelte-qgj3c0 h5.svelte-qgj3c0{margin:0}.email-form.svelte-qgj3c0 p.svelte-qgj3c0{font-size:12px;font-weight:300;text-align:start;margin-top:8px;color:#aaa}";
const css$5 = {
  code: "nav{display:none}body{margin:0;height:100vh;background:linear-gradient(235.71deg, #400a84 7.8%, #1b0a30 92.44%)}main.svelte-qgj3c0.svelte-qgj3c0{padding:1em;width:480px;margin:auto;position:absolute;top:calc(50% - 200px);left:calc(50% - 240px)}main.svelte-qgj3c0 h3.svelte-qgj3c0{margin-top:16px;margin-bottom:8px}.email-form.svelte-qgj3c0.svelte-qgj3c0{width:480px;margin:32px auto;display:flex;flex-direction:column;align-items:flex-start;padding:24px;background:linear-gradient(0deg, #040a11, #040a11), #0352af;box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);border-radius:8px}.email-form.svelte-qgj3c0 .form-input.svelte-qgj3c0{width:100%;display:flex}.email-form.svelte-qgj3c0 .form-input input.svelte-qgj3c0{flex:1;height:48px;border:none;background:rgba(142, 145, 148, 0.1);border-radius:4px;color:white;margin-right:16px;padding:0 16px}.email-form.svelte-qgj3c0 .form-input button.svelte-qgj3c0{height:48px;width:80px;border:none;background:#400a84;border-radius:4px;padding:8px;color:white;font-weight:600;font-size:14px}.email-form.svelte-qgj3c0 h5.svelte-qgj3c0{margin:0}.email-form.svelte-qgj3c0 p.svelte-qgj3c0{font-size:12px;font-weight:300;text-align:start;margin-top:8px;color:#aaa}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script lang=\\"ts\\">// import Api from \\"$lib/api/beta\\"\\n// import axios from \\"axios\\"\\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\n    return new (P || (P = Promise))(function (resolve, reject) {\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\n    });\\n};\\nlet email;\\nfunction signUp() {\\n    return __awaiter(this, void 0, void 0, function* () {\\n        yield fetch(\\"http://3.143.138.224:8000/join-beta\\", {\\n            method: \\"post\\",\\n            headers: {\\n                \\"Content-Type\\": \\"application/json\\",\\n            },\\n            body: JSON.stringify({\\n                email: email,\\n                createdAt: new Date(),\\n            }),\\n        });\\n        alert(\\"Thank you for registering!\\");\\n    });\\n}\\n</script>\\n\\n<svelte:head>\\n    <title>Block Parties</title>\\n    <meta name=\\"og:title\\" content=\\"Block Parties\\" />\\n    <meta name=\\"og:description\\" content=\\"Invest with others safely and securely, powered by blockchain technology.\\" />\\n</svelte:head>\\n\\n<main>\\n    <h1>Block Parties</h1>\\n\\n    <div>\\n        <h3>An <b>Evolution</b> in Investing... coming soon</h3>\\n        <p>\\n            Leveraging the blockchain to make group investing as <b>secure</b>, <b>easy</b>, and <b>social</b> as ever.\\n        </p>\\n    </div>\\n\\n    <div class=\\"email-form\\">\\n        <h5>Reserve your seat in the limited access beta</h5>\\n        <br /><br />\\n        <div class=\\"form-input\\">\\n            <input bind:value={email} type=\\"email\\" placeholder=\\"Enter your email\\" />\\n            <button on:click={signUp}>Submit</button>\\n        </div>\\n        <p>We won't use your email for anything other than letting you know when beta opens.</p>\\n        <br />\\n        <p>Wanna chat? <a href=\\"https://discord.gg/TNGQuuazez\\"> Join our Discord</a></p>\\n    </div>\\n</main>\\n\\n<style lang=\\"scss\\">:global(nav) {\\n  display: none;\\n}\\n\\n:global(body) {\\n  margin: 0;\\n  height: 100vh;\\n  background: linear-gradient(235.71deg, #400a84 7.8%, #1b0a30 92.44%);\\n}\\n\\nmain {\\n  padding: 1em;\\n  width: 480px;\\n  margin: auto;\\n  position: absolute;\\n  top: calc(50% - 200px);\\n  left: calc(50% - 240px);\\n}\\nmain h3 {\\n  margin-top: 16px;\\n  margin-bottom: 8px;\\n}\\n\\n.email-form {\\n  width: 480px;\\n  margin: 32px auto;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: flex-start;\\n  padding: 24px;\\n  background: linear-gradient(0deg, #040a11, #040a11), #0352af;\\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\\n  border-radius: 8px;\\n}\\n.email-form .form-input {\\n  width: 100%;\\n  display: flex;\\n}\\n.email-form .form-input input {\\n  flex: 1;\\n  height: 48px;\\n  border: none;\\n  background: rgba(142, 145, 148, 0.1);\\n  border-radius: 4px;\\n  color: white;\\n  margin-right: 16px;\\n  padding: 0 16px;\\n}\\n.email-form .form-input button {\\n  height: 48px;\\n  width: 80px;\\n  border: none;\\n  background: #400a84;\\n  border-radius: 4px;\\n  padding: 8px;\\n  color: white;\\n  font-weight: 600;\\n  font-size: 14px;\\n}\\n.email-form h5 {\\n  margin: 0;\\n}\\n.email-form p {\\n  font-size: 12px;\\n  font-weight: 300;\\n  text-align: start;\\n  margin-top: 8px;\\n  color: #aaa;\\n}</style>\\n"],"names":[],"mappings":"AA0D2B,GAAG,AAAE,CAAC,AAC/B,OAAO,CAAE,IAAI,AACf,CAAC,AAEO,IAAI,AAAE,CAAC,AACb,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,gBAAgB,SAAS,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,MAAM,CAAC,AACtE,CAAC,AAED,IAAI,4BAAC,CAAC,AACJ,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CACtB,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,AACzB,CAAC,AACD,kBAAI,CAAC,EAAE,cAAC,CAAC,AACP,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,AACpB,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,UAAU,CACvB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,gBAAgB,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,OAAO,CAC5D,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC3C,aAAa,CAAE,GAAG,AACpB,CAAC,AACD,yBAAW,CAAC,WAAW,cAAC,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACD,yBAAW,CAAC,WAAW,CAAC,KAAK,cAAC,CAAC,AAC7B,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,YAAY,CAAE,IAAI,CAClB,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AACD,yBAAW,CAAC,WAAW,CAAC,MAAM,cAAC,CAAC,AAC9B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,yBAAW,CAAC,EAAE,cAAC,CAAC,AACd,MAAM,CAAE,CAAC,AACX,CAAC,AACD,yBAAW,CAAC,CAAC,cAAC,CAAC,AACb,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,GAAG,CACf,KAAK,CAAE,IAAI,AACb,CAAC"}`
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  (function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  });
  let email;
  $$result.css.add(css$5);
  return `${$$result.head += `${$$result.title = `<title>Block Parties</title>`, ""}<meta name="${"og:title"}" content="${"Block Parties"}" data-svelte="svelte-wfknh5"><meta name="${"og:description"}" content="${"Invest with others safely and securely, powered by blockchain technology."}" data-svelte="svelte-wfknh5">`, ""}

<main class="${"svelte-qgj3c0"}"><h1>Block Parties</h1>

    <div><h3 class="${"svelte-qgj3c0"}">An <b>Evolution</b> in Investing... coming soon</h3>
        <p>Leveraging the blockchain to make group investing as <b>secure</b>, <b>easy</b>, and <b>social</b> as ever.
        </p></div>

    <div class="${"email-form svelte-qgj3c0"}"><h5 class="${"svelte-qgj3c0"}">Reserve your seat in the limited access beta</h5>
        <br><br>
        <div class="${"form-input svelte-qgj3c0"}"><input type="${"email"}" placeholder="${"Enter your email"}" class="${"svelte-qgj3c0"}"${add_attribute("value", email, 1)}>
            <button class="${"svelte-qgj3c0"}">Submit</button></div>
        <p class="${"svelte-qgj3c0"}">We won&#39;t use your email for anything other than letting you know when beta opens.</p>
        <br>
        <p class="${"svelte-qgj3c0"}">Wanna chat? <a href="${"https://discord.gg/TNGQuuazez"}">Join our Discord</a></p></div>
</main>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes
});
var Api;
(function(Api2) {
  (function(Parties2) {
    async function getParties() {
      const res = await fetch$2("http://3.143.138.224:8000/parties");
      return await res.json();
    }
    Parties2.getParties = getParties;
  })(Api2.Parties || (Api2.Parties = {}));
})(Api || (Api = {}));
var Api$1 = Api;
var RoundButton_svelte_svelte_type_style_lang = "button.svelte-kiycwk{flex:1;height:40px;background:#0352af;border-radius:4px;border:none;color:white;font-weight:600}";
const css$4 = {
  code: "button.svelte-kiycwk{flex:1;height:40px;background:#0352af;border-radius:4px;border:none;color:white;font-weight:600}",
  map: '{"version":3,"file":"RoundButton.svelte","sources":["RoundButton.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let text;\\n</script>\\n\\n<button on:click>{text}</button>\\n\\n<style lang=\\"scss\\">button {\\n  flex: 1;\\n  height: 40px;\\n  background: #0352af;\\n  border-radius: 4px;\\n  border: none;\\n  color: white;\\n  font-weight: 600;\\n}</style>\\n"],"names":[],"mappings":"AAKmB,MAAM,cAAC,CAAC,AACzB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,AAClB,CAAC"}'
};
const RoundButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {text} = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css$4);
  return `<button class="${"svelte-kiycwk"}">${escape$1(text)}</button>`;
});
const Spacer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {width = "0px"} = $$props;
  let {height = "0px"} = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<div style="${"height: " + escape$1(height) + "; width: " + escape$1(width)}"></div>`;
});
var ValueInput_svelte_svelte_type_style_lang = ".outer.svelte-1y1u3h3{width:100%;display:flex;align-items:center;justify-content:space-between}input.svelte-1y1u3h3{background:rgba(15, 15, 15, 0.5);border-radius:4px;border:none;height:24px;padding:8px 16px}p.svelte-1y1u3h3{font-weight:600}";
const css$3 = {
  code: ".outer.svelte-1y1u3h3{width:100%;display:flex;align-items:center;justify-content:space-between}input.svelte-1y1u3h3{background:rgba(15, 15, 15, 0.5);border-radius:4px;border:none;height:24px;padding:8px 16px}p.svelte-1y1u3h3{font-weight:600}",
  map: '{"version":3,"file":"ValueInput.svelte","sources":["ValueInput.svelte"],"sourcesContent":["<script lang=\\"ts\\">// TODO: OBTAIN UPDATED SOMEHOW\\nlet conversionRate = 2080;\\nexport let value;\\n</script>\\n\\n<div class=\\"outer\\">\\n    <input type=\\"text\\" bind:value placeholder=\\"Amount (in ETH)\\" />\\n    <p>\u2248 ${value * conversionRate}</p>\\n</div>\\n\\n<style lang=\\"scss\\">.outer {\\n  width: 100%;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n}\\n\\ninput {\\n  background: rgba(15, 15, 15, 0.5);\\n  border-radius: 4px;\\n  border: none;\\n  height: 24px;\\n  padding: 8px 16px;\\n}\\n\\np {\\n  font-weight: 600;\\n}</style>\\n"],"names":[],"mappings":"AAUmB,MAAM,eAAC,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,AAChC,CAAC,AAED,KAAK,eAAC,CAAC,AACL,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACjC,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,AACnB,CAAC,AAED,CAAC,eAAC,CAAC,AACD,WAAW,CAAE,GAAG,AAClB,CAAC"}'
};
let conversionRate = 2080;
const ValueInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {value} = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$3);
  return `<div class="${"outer svelte-1y1u3h3"}"><input type="${"text"}" placeholder="${"Amount (in ETH)"}" class="${"svelte-1y1u3h3"}"${add_attribute("value", value, 1)}>
    <p class="${"svelte-1y1u3h3"}">\u2248 $${escape$1(value * conversionRate)}</p>
</div>`;
});
var ModalPopup_svelte_svelte_type_style_lang = "div.svelte-qox25m{z-index:100;position:fixed;top:0;left:0;right:0;bottom:0;background:#000000aa}";
var PartyCard_svelte_svelte_type_style_lang = ".outer.svelte-7gu6br.svelte-7gu6br{transition:all 0.25s;cursor:pointer;position:relative;background:blue;width:400px;height:500px;border-radius:4px;background:#023b70;box-shadow:0 0 1px 2px #00000066}.outer.svelte-7gu6br.svelte-7gu6br:hover{box-shadow:0 2px 2px 4px #00000066;background:#023b70dd}.chart.svelte-7gu6br.svelte-7gu6br{height:40%;background:#eeeeee;border-radius:4px 4px 0 0}.chart.svelte-7gu6br img.svelte-7gu6br{width:100%;height:100%;object-fit:contain}.progress-bar.svelte-7gu6br.svelte-7gu6br{height:24px;width:100%;background:#161616cc}.progress-bar.svelte-7gu6br .progress-bar-fill.svelte-7gu6br{transition:0.5s all;height:100%;width:0%;background:green}.bottom-half.svelte-7gu6br.svelte-7gu6br{padding:16px}.bottom-half.svelte-7gu6br .title-row.svelte-7gu6br{display:flex;justify-content:space-between}.bottom-half.svelte-7gu6br .title-row h4.svelte-7gu6br{color:white}.bottom-half.svelte-7gu6br .description.svelte-7gu6br{font-size:14px;font-weight:300;margin:16px 0}.bottom-half.svelte-7gu6br .tags div.svelte-7gu6br{margin-right:8px}.bottom-half.svelte-7gu6br .footer.svelte-7gu6br{position:absolute;bottom:0;left:0;right:0;border-radius:0 0 4px 4px;display:flex;flex-direction:column;justify-content:space-between;padding:16px 16px;background:rgba(0, 0, 0, 0.25)}.bottom-half.svelte-7gu6br .footer p.svelte-7gu6br{font-weight:600}";
const css$2 = {
  code: ".outer.svelte-7gu6br.svelte-7gu6br{transition:all 0.25s;cursor:pointer;position:relative;background:blue;width:400px;height:500px;border-radius:4px;background:#023b70;box-shadow:0 0 1px 2px #00000066}.outer.svelte-7gu6br.svelte-7gu6br:hover{box-shadow:0 2px 2px 4px #00000066;background:#023b70dd}.chart.svelte-7gu6br.svelte-7gu6br{height:40%;background:#eeeeee;border-radius:4px 4px 0 0}.chart.svelte-7gu6br img.svelte-7gu6br{width:100%;height:100%;object-fit:contain}.progress-bar.svelte-7gu6br.svelte-7gu6br{height:24px;width:100%;background:#161616cc}.progress-bar.svelte-7gu6br .progress-bar-fill.svelte-7gu6br{transition:0.5s all;height:100%;width:0%;background:green}.bottom-half.svelte-7gu6br.svelte-7gu6br{padding:16px}.bottom-half.svelte-7gu6br .title-row.svelte-7gu6br{display:flex;justify-content:space-between}.bottom-half.svelte-7gu6br .title-row h4.svelte-7gu6br{color:white}.bottom-half.svelte-7gu6br .description.svelte-7gu6br{font-size:14px;font-weight:300;margin:16px 0}.bottom-half.svelte-7gu6br .tags div.svelte-7gu6br{margin-right:8px}.bottom-half.svelte-7gu6br .footer.svelte-7gu6br{position:absolute;bottom:0;left:0;right:0;border-radius:0 0 4px 4px;display:flex;flex-direction:column;justify-content:space-between;padding:16px 16px;background:rgba(0, 0, 0, 0.25)}.bottom-half.svelte-7gu6br .footer p.svelte-7gu6br{font-weight:600}",
  map: '{"version":3,"file":"PartyCard.svelte","sources":["PartyCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\n    return new (P || (P = Promise))(function (resolve, reject) {\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\n    });\\n};\\nimport { onMount } from \\"svelte\\";\\nimport RoundButton from \\"./common/RoundButton.svelte\\";\\nimport Spacer from \\"./common/Spacer.svelte\\";\\nimport ValueInput from \\"./common/ValueInput.svelte\\";\\nimport ModalPopup from \\"./ModalPopup.svelte\\";\\nexport let party;\\nlet showPopup = false;\\nlet eth;\\nlet investmentAmount;\\nlet progressBar;\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\n    const module = yield import(\\"$lib/api/eth\\");\\n    eth = module.EthHelper;\\n    console.log(party);\\n    // opensea.\\n    const raisedAmount = yield eth.fetchPartyContributions(party.id);\\n    console.log(\\"AMOUNT: \\" + raisedAmount);\\n    progressBar.style.width = raisedAmount + \\"%\\";\\n}));\\nfunction invest() {\\n    return __awaiter(this, void 0, void 0, function* () {\\n        eth.invest(party.id, investmentAmount);\\n    });\\n}\\n</script>\\n\\n<!-- SET TO TRUE TO ENABLE -->\\n<div class=\\"outer\\" on:click={() => (showPopup = false)}>\\n    <div class=\\"chart\\">\\n        <img src={party.asset.image_preview_url} alt=\\"token\\" />\\n    </div>\\n\\n    <div class=\\"progress-bar\\">\\n        <div class=\\"progress-bar-fill\\" bind:this={progressBar} />\\n    </div>\\n\\n    <div class=\\"bottom-half\\">\\n        <div class=\\"title-row\\">\\n            <h4>{party.asset.name}</h4>\\n            <!-- <Tag text=\\"HIGH\\" color={\\"red\\"} /> -->\\n        </div>\\n\\n        <p class=\\"description\\">{party.asset.description ? party.asset.description : \\"No description available.\\"}</p>\\n\\n        <div class=\\"footer\\">\\n            <!-- <div>O O O O</div>\\n            <p>$15k - $50k invested</p> -->\\n\\n            <ValueInput bind:value={investmentAmount} />\\n            <Spacer height={\\"16px\\"} />\\n\\n            <div class=\\"row\\">\\n                <RoundButton text={\\"Invest\\"} on:click={invest} />\\n                <!-- <RoundButton text={\\"Withdraw\\"} /> -->\\n            </div>\\n        </div>\\n    </div>\\n</div>\\n\\n{#if showPopup}\\n    <ModalPopup dismiss={() => (showPopup = false)} />\\n{/if}\\n\\n<style lang=\\"scss\\">.outer {\\n  transition: all 0.25s;\\n  cursor: pointer;\\n  position: relative;\\n  background: blue;\\n  width: 400px;\\n  height: 500px;\\n  border-radius: 4px;\\n  background: #023b70;\\n  box-shadow: 0 0 1px 2px #00000066;\\n}\\n.outer:hover {\\n  box-shadow: 0 2px 2px 4px #00000066;\\n  background: #023b70dd;\\n}\\n\\n.chart {\\n  height: 40%;\\n  background: #eeeeee;\\n  border-radius: 4px 4px 0 0;\\n}\\n.chart img {\\n  width: 100%;\\n  height: 100%;\\n  object-fit: contain;\\n}\\n\\n.progress-bar {\\n  height: 24px;\\n  width: 100%;\\n  background: #161616cc;\\n}\\n.progress-bar .progress-bar-fill {\\n  transition: 0.5s all;\\n  height: 100%;\\n  width: 0%;\\n  background: green;\\n}\\n\\n.bottom-half {\\n  padding: 16px;\\n}\\n.bottom-half .title-row {\\n  display: flex;\\n  justify-content: space-between;\\n}\\n.bottom-half .title-row h4 {\\n  color: white;\\n}\\n.bottom-half .description {\\n  font-size: 14px;\\n  font-weight: 300;\\n  margin: 16px 0;\\n}\\n.bottom-half .tags {\\n  display: flex;\\n}\\n.bottom-half .tags div {\\n  margin-right: 8px;\\n}\\n.bottom-half .tags {\\n  position: absolute;\\n  bottom: 76px;\\n}\\n.bottom-half .footer {\\n  position: absolute;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n  border-radius: 0 0 4px 4px;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between;\\n  padding: 16px 16px;\\n  background: rgba(0, 0, 0, 0.25);\\n}\\n.bottom-half .footer p {\\n  font-weight: 600;\\n}</style>\\n"],"names":[],"mappings":"AAwEmB,MAAM,4BAAC,CAAC,AACzB,UAAU,CAAE,GAAG,CAAC,KAAK,CACrB,MAAM,CAAE,OAAO,CACf,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,AACnC,CAAC,AACD,kCAAM,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,SAAS,CACnC,UAAU,CAAE,SAAS,AACvB,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAC5B,CAAC,AACD,oBAAM,CAAC,GAAG,cAAC,CAAC,AACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,SAAS,AACvB,CAAC,AACD,2BAAa,CAAC,kBAAkB,cAAC,CAAC,AAChC,UAAU,CAAE,IAAI,CAAC,GAAG,CACpB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,EAAE,CACT,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACD,0BAAY,CAAC,UAAU,cAAC,CAAC,AACvB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AACD,0BAAY,CAAC,UAAU,CAAC,EAAE,cAAC,CAAC,AAC1B,KAAK,CAAE,KAAK,AACd,CAAC,AACD,0BAAY,CAAC,YAAY,cAAC,CAAC,AACzB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AAID,0BAAY,CAAC,KAAK,CAAC,GAAG,cAAC,CAAC,AACtB,YAAY,CAAE,GAAG,AACnB,CAAC,AAKD,0BAAY,CAAC,OAAO,cAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAC1B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACjC,CAAC,AACD,0BAAY,CAAC,OAAO,CAAC,CAAC,cAAC,CAAC,AACtB,WAAW,CAAE,GAAG,AAClB,CAAC"}'
};
const PartyCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  let {party} = $$props;
  let eth$1;
  let investmentAmount;
  let progressBar;
  onMount(() => __awaiter2(void 0, void 0, void 0, function* () {
    const module = yield Promise.resolve().then(function() {
      return eth;
    });
    eth$1 = module.EthHelper;
    console.log(party);
    const raisedAmount = yield eth$1.fetchPartyContributions(party.id);
    console.log("AMOUNT: " + raisedAmount);
    progressBar.style.width = raisedAmount + "%";
  }));
  if ($$props.party === void 0 && $$bindings.party && party !== void 0)
    $$bindings.party(party);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `
<div class="${"outer svelte-7gu6br"}"><div class="${"chart svelte-7gu6br"}"><img${add_attribute("src", party.asset.image_preview_url, 0)} alt="${"token"}" class="${"svelte-7gu6br"}"></div>

    <div class="${"progress-bar svelte-7gu6br"}"><div class="${"progress-bar-fill svelte-7gu6br"}"${add_attribute("this", progressBar, 1)}></div></div>

    <div class="${"bottom-half svelte-7gu6br"}"><div class="${"title-row svelte-7gu6br"}"><h4 class="${"svelte-7gu6br"}">${escape$1(party.asset.name)}</h4>
            </div>

        <p class="${"description svelte-7gu6br"}">${escape$1(party.asset.description ? party.asset.description : "No description available.")}</p>

        <div class="${"footer svelte-7gu6br"}">

            ${validate_component(ValueInput, "ValueInput").$$render($$result, {value: investmentAmount}, {
      value: ($$value) => {
        investmentAmount = $$value;
        $$settled = false;
      }
    }, {})}
            ${validate_component(Spacer, "Spacer").$$render($$result, {height: "16px"}, {}, {})}

            <div class="${"row svelte-7gu6br"}">${validate_component(RoundButton, "RoundButton").$$render($$result, {text: "Invest"}, {}, {})}
                </div></div></div></div>

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var clubs_svelte_svelte_type_style_lang = "body{margin:0;background:#0c0218}.outer.svelte-1iwtxv7.svelte-1iwtxv7{display:flex}.sidebar.svelte-1iwtxv7.svelte-1iwtxv7{position:sticky;align-self:flex-start;z-index:99;top:56px;height:calc(100vh - 2 * 60px);left:0;bottom:0;min-width:280px;background:#1b0a30;padding:32px 16px}.sidebar.svelte-1iwtxv7 h1.svelte-1iwtxv7{margin-bottom:16px}.sidebar.svelte-1iwtxv7 p.svelte-1iwtxv7{font-weight:400;font-size:14px;line-height:19px;color:#eeeeee}main.svelte-1iwtxv7.svelte-1iwtxv7{display:flex;flex-flow:row wrap;justify-content:space-around;padding:32px}main.svelte-1iwtxv7 div.svelte-1iwtxv7{padding:24px 16px}";
const css$1 = {
  code: "body{margin:0;background:#0c0218}.outer.svelte-1iwtxv7.svelte-1iwtxv7{display:flex}.sidebar.svelte-1iwtxv7.svelte-1iwtxv7{position:sticky;align-self:flex-start;z-index:99;top:56px;height:calc(100vh - 2 * 60px);left:0;bottom:0;min-width:280px;background:#1b0a30;padding:32px 16px}.sidebar.svelte-1iwtxv7 h1.svelte-1iwtxv7{margin-bottom:16px}.sidebar.svelte-1iwtxv7 p.svelte-1iwtxv7{font-weight:400;font-size:14px;line-height:19px;color:#eeeeee}main.svelte-1iwtxv7.svelte-1iwtxv7{display:flex;flex-flow:row wrap;justify-content:space-around;padding:32px}main.svelte-1iwtxv7 div.svelte-1iwtxv7{padding:24px 16px}",
  map: `{"version":3,"file":"clubs.svelte","sources":["clubs.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\n    return new (P || (P = Promise))(function (resolve, reject) {\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\n    });\\n};\\nexport function load({ page, fetch, session, context }) {\\n    return __awaiter(this, void 0, void 0, function* () {\\n        let parties = yield Api.Parties.getParties();\\n        parties = yield Promise.all(parties.map((party) => __awaiter(this, void 0, void 0, function* () {\\n            const res = yield fetch(\\"https://api.opensea.io/api/v1/assets?\\" +\\n                new URLSearchParams({\\n                    token_ids: party.tokenId,\\n                    asset_contract_address: party.tokenContract,\\n                }));\\n            const assets = (yield res.json())[\\"assets\\"];\\n            console.log(assets);\\n            party = Object.assign(Object.assign({}, party), { asset: assets[0] });\\n            return party;\\n        })));\\n        return {\\n            props: {\\n                parties: parties,\\n            },\\n        };\\n    });\\n}\\n</script>\\n\\n<script lang=\\"ts\\">import Api from \\"$lib/api/parties\\";\\nimport PartyCard from \\"$lib/components/PartyCard.svelte\\";\\nexport let parties;\\n</script>\\n\\n<svelte:head>\\n    <title>Block Parties | Directory</title>\\n    <meta name=\\"og:title\\" content=\\"Block Parties | Directory\\" />\\n    <meta name=\\"og:description\\" content=\\"Find a party to invest in digital assets with.\\" />\\n</svelte:head>\\n\\n<div class=\\"outer\\">\\n    <div class=\\"sidebar\\">\\n        <h1>Party Directory</h1>\\n\\n        <p>Investing is done best when effort, knowledge, and resources are effectively pooled together.</p>\\n        <br />\\n        <p>\\n            To get started, look for clubs with similar interests as you and a risk tolerance you're comfortable with.\\n        </p>\\n    </div>\\n\\n    <main>\\n        {#each parties as party}\\n            <div>\\n                <PartyCard {party} />\\n            </div>\\n        {/each}\\n    </main>\\n</div>\\n\\n<style lang=\\"scss\\">:global(body) {\\n  margin: 0;\\n  background: #0c0218;\\n}\\n\\n.outer {\\n  display: flex;\\n}\\n\\n.sidebar {\\n  position: sticky;\\n  align-self: flex-start;\\n  z-index: 99;\\n  top: 56px;\\n  height: calc(100vh - 2 * 60px);\\n  left: 0;\\n  bottom: 0;\\n  min-width: 280px;\\n  background: #1b0a30;\\n  padding: 32px 16px;\\n}\\n.sidebar h1 {\\n  margin-bottom: 16px;\\n}\\n.sidebar p {\\n  font-weight: 400;\\n  font-size: 14px;\\n  line-height: 19px;\\n  color: #eeeeee;\\n}\\n\\nmain {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: space-around;\\n  padding: 32px;\\n}\\nmain div {\\n  padding: 24px 16px;\\n}</style>\\n"],"names":[],"mappings":"AA+D2B,IAAI,AAAE,CAAC,AAChC,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,IAAI,AACf,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,EAAE,CACX,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9B,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,IAAI,CAAC,IAAI,AACpB,CAAC,AACD,uBAAQ,CAAC,EAAE,eAAC,CAAC,AACX,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,uBAAQ,CAAC,CAAC,eAAC,CAAC,AACV,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,IAAI,8BAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CAAC,IAAI,CACnB,eAAe,CAAE,YAAY,CAC7B,OAAO,CAAE,IAAI,AACf,CAAC,AACD,mBAAI,CAAC,GAAG,eAAC,CAAC,AACR,OAAO,CAAE,IAAI,CAAC,IAAI,AACpB,CAAC"}`
};
var __awaiter$d = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function load({page, fetch: fetch2, session, context}) {
  return __awaiter$d(this, void 0, void 0, function* () {
    let parties = yield Api$1.Parties.getParties();
    parties = yield Promise.all(parties.map((party) => __awaiter$d(this, void 0, void 0, function* () {
      const res = yield fetch2("https://api.opensea.io/api/v1/assets?" + new URLSearchParams({
        token_ids: party.tokenId,
        asset_contract_address: party.tokenContract
      }));
      const assets = (yield res.json())["assets"];
      console.log(assets);
      party = Object.assign(Object.assign({}, party), {asset: assets[0]});
      return party;
    })));
    return {props: {parties}};
  });
}
const Clubs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {parties} = $$props;
  if ($$props.parties === void 0 && $$bindings.parties && parties !== void 0)
    $$bindings.parties(parties);
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Block Parties | Directory</title>`, ""}<meta name="${"og:title"}" content="${"Block Parties | Directory"}" data-svelte="svelte-1f1gt9p"><meta name="${"og:description"}" content="${"Find a party to invest in digital assets with."}" data-svelte="svelte-1f1gt9p">`, ""}

<div class="${"outer svelte-1iwtxv7"}"><div class="${"sidebar svelte-1iwtxv7"}"><h1 class="${"svelte-1iwtxv7"}">Party Directory</h1>

        <p class="${"svelte-1iwtxv7"}">Investing is done best when effort, knowledge, and resources are effectively pooled together.</p>
        <br>
        <p class="${"svelte-1iwtxv7"}">To get started, look for clubs with similar interests as you and a risk tolerance you&#39;re comfortable with.
        </p></div>

    <main class="${"svelte-1iwtxv7"}">${each(parties, (party) => `<div class="${"svelte-1iwtxv7"}">${validate_component(PartyCard, "PartyCard").$$render($$result, {party}, {}, {})}
            </div>`)}</main>
</div>`;
});
var clubs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Clubs,
  load
});
var $layout_svelte_svelte_type_style_lang = "nav.svelte-rw583c{position:sticky;top:0;z-index:99;width:100%;height:56px;background:#231845}";
const css = {
  code: "nav.svelte-rw583c{position:sticky;top:0;z-index:99;width:100%;height:56px;background:#231845}",
  map: '{"version":3,"file":"$layout.svelte","sources":["$layout.svelte"],"sourcesContent":["<nav>\\n    <h1>NAV BAR</h1>\\n</nav>\\n\\n<slot />\\n\\n<style lang=\\"scss\\">nav {\\n  position: sticky;\\n  top: 0;\\n  z-index: 99;\\n  width: 100%;\\n  height: 56px;\\n  background: #231845;\\n}</style>\\n"],"names":[],"mappings":"AAMmB,GAAG,cAAC,CAAC,AACtB,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,AACrB,CAAC"}'
};
const $layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav class="${"svelte-rw583c"}"><h1>NAV BAR</h1></nav>

${slots.default ? slots.default({}) : ``}`;
});
var $layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout
});
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: __viteBrowserExternal
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var bn = createCommonjsModule$1(function(module) {
  (function(module2, exports) {
    function assert2(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
    function BN2(number, base2, endian) {
      if (BN2.isBN(number)) {
        return number;
      }
      this.negative = 0;
      this.words = null;
      this.length = 0;
      this.red = null;
      if (number !== null) {
        if (base2 === "le" || base2 === "be") {
          endian = base2;
          base2 = 10;
        }
        this._init(number || 0, base2 || 10, endian || "be");
      }
    }
    if (typeof module2 === "object") {
      module2.exports = BN2;
    } else {
      exports.BN = BN2;
    }
    BN2.BN = BN2;
    BN2.wordSize = 26;
    var Buffer2;
    try {
      if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
        Buffer2 = window.Buffer;
      } else {
        Buffer2 = require$$0.Buffer;
      }
    } catch (e) {
    }
    BN2.isBN = function isBN(num) {
      if (num instanceof BN2) {
        return true;
      }
      return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
    };
    BN2.max = function max(left, right) {
      if (left.cmp(right) > 0)
        return left;
      return right;
    };
    BN2.min = function min(left, right) {
      if (left.cmp(right) < 0)
        return left;
      return right;
    };
    BN2.prototype._init = function init5(number, base2, endian) {
      if (typeof number === "number") {
        return this._initNumber(number, base2, endian);
      }
      if (typeof number === "object") {
        return this._initArray(number, base2, endian);
      }
      if (base2 === "hex") {
        base2 = 16;
      }
      assert2(base2 === (base2 | 0) && base2 >= 2 && base2 <= 36);
      number = number.toString().replace(/\s+/g, "");
      var start = 0;
      if (number[0] === "-") {
        start++;
        this.negative = 1;
      }
      if (start < number.length) {
        if (base2 === 16) {
          this._parseHex(number, start, endian);
        } else {
          this._parseBase(number, base2, start);
          if (endian === "le") {
            this._initArray(this.toArray(), base2, endian);
          }
        }
      }
    };
    BN2.prototype._initNumber = function _initNumber(number, base2, endian) {
      if (number < 0) {
        this.negative = 1;
        number = -number;
      }
      if (number < 67108864) {
        this.words = [number & 67108863];
        this.length = 1;
      } else if (number < 4503599627370496) {
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863
        ];
        this.length = 2;
      } else {
        assert2(number < 9007199254740992);
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863,
          1
        ];
        this.length = 3;
      }
      if (endian !== "le")
        return;
      this._initArray(this.toArray(), base2, endian);
    };
    BN2.prototype._initArray = function _initArray(number, base2, endian) {
      assert2(typeof number.length === "number");
      if (number.length <= 0) {
        this.words = [0];
        this.length = 1;
        return this;
      }
      this.length = Math.ceil(number.length / 3);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var j, w;
      var off = 0;
      if (endian === "be") {
        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
          w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      } else if (endian === "le") {
        for (i = 0, j = 0; i < number.length; i += 3) {
          w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      }
      return this.strip();
    };
    function parseHex4Bits(string, index2) {
      var c = string.charCodeAt(index2);
      if (c >= 65 && c <= 70) {
        return c - 55;
      } else if (c >= 97 && c <= 102) {
        return c - 87;
      } else {
        return c - 48 & 15;
      }
    }
    function parseHexByte(string, lowerBound, index2) {
      var r2 = parseHex4Bits(string, index2);
      if (index2 - 1 >= lowerBound) {
        r2 |= parseHex4Bits(string, index2 - 1) << 4;
      }
      return r2;
    }
    BN2.prototype._parseHex = function _parseHex(number, start, endian) {
      this.length = Math.ceil((number.length - start) / 6);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var off = 0;
      var j = 0;
      var w;
      if (endian === "be") {
        for (i = number.length - 1; i >= start; i -= 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      } else {
        var parseLength = number.length - start;
        for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      }
      this.strip();
    };
    function parseBase(str, start, end, mul3) {
      var r2 = 0;
      var len = Math.min(str.length, end);
      for (var i = start; i < len; i++) {
        var c = str.charCodeAt(i) - 48;
        r2 *= mul3;
        if (c >= 49) {
          r2 += c - 49 + 10;
        } else if (c >= 17) {
          r2 += c - 17 + 10;
        } else {
          r2 += c;
        }
      }
      return r2;
    }
    BN2.prototype._parseBase = function _parseBase(number, base2, start) {
      this.words = [0];
      this.length = 1;
      for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base2) {
        limbLen++;
      }
      limbLen--;
      limbPow = limbPow / base2 | 0;
      var total = number.length - start;
      var mod = total % limbLen;
      var end = Math.min(total, total - mod) + start;
      var word = 0;
      for (var i = start; i < end; i += limbLen) {
        word = parseBase(number, i, i + limbLen, base2);
        this.imuln(limbPow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      if (mod !== 0) {
        var pow = 1;
        word = parseBase(number, i, number.length, base2);
        for (i = 0; i < mod; i++) {
          pow *= base2;
        }
        this.imuln(pow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      this.strip();
    };
    BN2.prototype.copy = function copy(dest) {
      dest.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        dest.words[i] = this.words[i];
      }
      dest.length = this.length;
      dest.negative = this.negative;
      dest.red = this.red;
    };
    BN2.prototype.clone = function clone2() {
      var r2 = new BN2(null);
      this.copy(r2);
      return r2;
    };
    BN2.prototype._expand = function _expand(size) {
      while (this.length < size) {
        this.words[this.length++] = 0;
      }
      return this;
    };
    BN2.prototype.strip = function strip() {
      while (this.length > 1 && this.words[this.length - 1] === 0) {
        this.length--;
      }
      return this._normSign();
    };
    BN2.prototype._normSign = function _normSign() {
      if (this.length === 1 && this.words[0] === 0) {
        this.negative = 0;
      }
      return this;
    };
    BN2.prototype.inspect = function inspect4() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var zeros2 = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ];
    var groupSizes = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ];
    var groupBases = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    BN2.prototype.toString = function toString(base2, padding2) {
      base2 = base2 || 10;
      padding2 = padding2 | 0 || 1;
      var out;
      if (base2 === 16 || base2 === "hex") {
        out = "";
        var off = 0;
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = this.words[i];
          var word = ((w << off | carry) & 16777215).toString(16);
          carry = w >>> 24 - off & 16777215;
          if (carry !== 0 || i !== this.length - 1) {
            out = zeros2[6 - word.length] + word + out;
          } else {
            out = word + out;
          }
          off += 2;
          if (off >= 26) {
            off -= 26;
            i--;
          }
        }
        if (carry !== 0) {
          out = carry.toString(16) + out;
        }
        while (out.length % padding2 !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      if (base2 === (base2 | 0) && base2 >= 2 && base2 <= 36) {
        var groupSize = groupSizes[base2];
        var groupBase = groupBases[base2];
        out = "";
        var c = this.clone();
        c.negative = 0;
        while (!c.isZero()) {
          var r2 = c.modn(groupBase).toString(base2);
          c = c.idivn(groupBase);
          if (!c.isZero()) {
            out = zeros2[groupSize - r2.length] + r2 + out;
          } else {
            out = r2 + out;
          }
        }
        if (this.isZero()) {
          out = "0" + out;
        }
        while (out.length % padding2 !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      assert2(false, "Base should be between 2 and 36");
    };
    BN2.prototype.toNumber = function toNumber() {
      var ret = this.words[0];
      if (this.length === 2) {
        ret += this.words[1] * 67108864;
      } else if (this.length === 3 && this.words[2] === 1) {
        ret += 4503599627370496 + this.words[1] * 67108864;
      } else if (this.length > 2) {
        assert2(false, "Number can only safely store up to 53 bits");
      }
      return this.negative !== 0 ? -ret : ret;
    };
    BN2.prototype.toJSON = function toJSON2() {
      return this.toString(16);
    };
    BN2.prototype.toBuffer = function toBuffer(endian, length) {
      assert2(typeof Buffer2 !== "undefined");
      return this.toArrayLike(Buffer2, endian, length);
    };
    BN2.prototype.toArray = function toArray2(endian, length) {
      return this.toArrayLike(Array, endian, length);
    };
    BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
      var byteLength = this.byteLength();
      var reqLength = length || Math.max(1, byteLength);
      assert2(byteLength <= reqLength, "byte array longer than desired length");
      assert2(reqLength > 0, "Requested array length <= 0");
      this.strip();
      var littleEndian = endian === "le";
      var res = new ArrayType(reqLength);
      var b, i;
      var q = this.clone();
      if (!littleEndian) {
        for (i = 0; i < reqLength - byteLength; i++) {
          res[i] = 0;
        }
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[reqLength - i - 1] = b;
        }
      } else {
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[i] = b;
        }
        for (; i < reqLength; i++) {
          res[i] = 0;
        }
      }
      return res;
    };
    if (Math.clz32) {
      BN2.prototype._countBits = function _countBits(w) {
        return 32 - Math.clz32(w);
      };
    } else {
      BN2.prototype._countBits = function _countBits(w) {
        var t = w;
        var r2 = 0;
        if (t >= 4096) {
          r2 += 13;
          t >>>= 13;
        }
        if (t >= 64) {
          r2 += 7;
          t >>>= 7;
        }
        if (t >= 8) {
          r2 += 4;
          t >>>= 4;
        }
        if (t >= 2) {
          r2 += 2;
          t >>>= 2;
        }
        return r2 + t;
      };
    }
    BN2.prototype._zeroBits = function _zeroBits(w) {
      if (w === 0)
        return 26;
      var t = w;
      var r2 = 0;
      if ((t & 8191) === 0) {
        r2 += 13;
        t >>>= 13;
      }
      if ((t & 127) === 0) {
        r2 += 7;
        t >>>= 7;
      }
      if ((t & 15) === 0) {
        r2 += 4;
        t >>>= 4;
      }
      if ((t & 3) === 0) {
        r2 += 2;
        t >>>= 2;
      }
      if ((t & 1) === 0) {
        r2++;
      }
      return r2;
    };
    BN2.prototype.bitLength = function bitLength() {
      var w = this.words[this.length - 1];
      var hi = this._countBits(w);
      return (this.length - 1) * 26 + hi;
    };
    function toBitArray(num) {
      var w = new Array(num.bitLength());
      for (var bit = 0; bit < w.length; bit++) {
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
      }
      return w;
    }
    BN2.prototype.zeroBits = function zeroBits() {
      if (this.isZero())
        return 0;
      var r2 = 0;
      for (var i = 0; i < this.length; i++) {
        var b = this._zeroBits(this.words[i]);
        r2 += b;
        if (b !== 26)
          break;
      }
      return r2;
    };
    BN2.prototype.byteLength = function byteLength() {
      return Math.ceil(this.bitLength() / 8);
    };
    BN2.prototype.toTwos = function toTwos(width) {
      if (this.negative !== 0) {
        return this.abs().inotn(width).iaddn(1);
      }
      return this.clone();
    };
    BN2.prototype.fromTwos = function fromTwos(width) {
      if (this.testn(width - 1)) {
        return this.notn(width).iaddn(1).ineg();
      }
      return this.clone();
    };
    BN2.prototype.isNeg = function isNeg() {
      return this.negative !== 0;
    };
    BN2.prototype.neg = function neg3() {
      return this.clone().ineg();
    };
    BN2.prototype.ineg = function ineg() {
      if (!this.isZero()) {
        this.negative ^= 1;
      }
      return this;
    };
    BN2.prototype.iuor = function iuor(num) {
      while (this.length < num.length) {
        this.words[this.length++] = 0;
      }
      for (var i = 0; i < num.length; i++) {
        this.words[i] = this.words[i] | num.words[i];
      }
      return this.strip();
    };
    BN2.prototype.ior = function ior(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuor(num);
    };
    BN2.prototype.or = function or(num) {
      if (this.length > num.length)
        return this.clone().ior(num);
      return num.clone().ior(this);
    };
    BN2.prototype.uor = function uor(num) {
      if (this.length > num.length)
        return this.clone().iuor(num);
      return num.clone().iuor(this);
    };
    BN2.prototype.iuand = function iuand(num) {
      var b;
      if (this.length > num.length) {
        b = num;
      } else {
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = this.words[i] & num.words[i];
      }
      this.length = b.length;
      return this.strip();
    };
    BN2.prototype.iand = function iand(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuand(num);
    };
    BN2.prototype.and = function and(num) {
      if (this.length > num.length)
        return this.clone().iand(num);
      return num.clone().iand(this);
    };
    BN2.prototype.uand = function uand(num) {
      if (this.length > num.length)
        return this.clone().iuand(num);
      return num.clone().iuand(this);
    };
    BN2.prototype.iuxor = function iuxor(num) {
      var a;
      var b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = a.words[i] ^ b.words[i];
      }
      if (this !== a) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = a.length;
      return this.strip();
    };
    BN2.prototype.ixor = function ixor(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuxor(num);
    };
    BN2.prototype.xor = function xor(num) {
      if (this.length > num.length)
        return this.clone().ixor(num);
      return num.clone().ixor(this);
    };
    BN2.prototype.uxor = function uxor(num) {
      if (this.length > num.length)
        return this.clone().iuxor(num);
      return num.clone().iuxor(this);
    };
    BN2.prototype.inotn = function inotn(width) {
      assert2(typeof width === "number" && width >= 0);
      var bytesNeeded = Math.ceil(width / 26) | 0;
      var bitsLeft = width % 26;
      this._expand(bytesNeeded);
      if (bitsLeft > 0) {
        bytesNeeded--;
      }
      for (var i = 0; i < bytesNeeded; i++) {
        this.words[i] = ~this.words[i] & 67108863;
      }
      if (bitsLeft > 0) {
        this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
      }
      return this.strip();
    };
    BN2.prototype.notn = function notn(width) {
      return this.clone().inotn(width);
    };
    BN2.prototype.setn = function setn(bit, val) {
      assert2(typeof bit === "number" && bit >= 0);
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      this._expand(off + 1);
      if (val) {
        this.words[off] = this.words[off] | 1 << wbit;
      } else {
        this.words[off] = this.words[off] & ~(1 << wbit);
      }
      return this.strip();
    };
    BN2.prototype.iadd = function iadd(num) {
      var r2;
      if (this.negative !== 0 && num.negative === 0) {
        this.negative = 0;
        r2 = this.isub(num);
        this.negative ^= 1;
        return this._normSign();
      } else if (this.negative === 0 && num.negative !== 0) {
        num.negative = 0;
        r2 = this.isub(num);
        num.negative = 1;
        return r2._normSign();
      }
      var a, b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r2 = (a.words[i] | 0) + (b.words[i] | 0) + carry;
        this.words[i] = r2 & 67108863;
        carry = r2 >>> 26;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r2 = (a.words[i] | 0) + carry;
        this.words[i] = r2 & 67108863;
        carry = r2 >>> 26;
      }
      this.length = a.length;
      if (carry !== 0) {
        this.words[this.length] = carry;
        this.length++;
      } else if (a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      return this;
    };
    BN2.prototype.add = function add3(num) {
      var res;
      if (num.negative !== 0 && this.negative === 0) {
        num.negative = 0;
        res = this.sub(num);
        num.negative ^= 1;
        return res;
      } else if (num.negative === 0 && this.negative !== 0) {
        this.negative = 0;
        res = num.sub(this);
        this.negative = 1;
        return res;
      }
      if (this.length > num.length)
        return this.clone().iadd(num);
      return num.clone().iadd(this);
    };
    BN2.prototype.isub = function isub(num) {
      if (num.negative !== 0) {
        num.negative = 0;
        var r2 = this.iadd(num);
        num.negative = 1;
        return r2._normSign();
      } else if (this.negative !== 0) {
        this.negative = 0;
        this.iadd(num);
        this.negative = 1;
        return this._normSign();
      }
      var cmp = this.cmp(num);
      if (cmp === 0) {
        this.negative = 0;
        this.length = 1;
        this.words[0] = 0;
        return this;
      }
      var a, b;
      if (cmp > 0) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r2 = (a.words[i] | 0) - (b.words[i] | 0) + carry;
        carry = r2 >> 26;
        this.words[i] = r2 & 67108863;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r2 = (a.words[i] | 0) + carry;
        carry = r2 >> 26;
        this.words[i] = r2 & 67108863;
      }
      if (carry === 0 && i < a.length && a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = Math.max(this.length, i);
      if (a !== this) {
        this.negative = 1;
      }
      return this.strip();
    };
    BN2.prototype.sub = function sub(num) {
      return this.clone().isub(num);
    };
    function smallMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      var len = self2.length + num.length | 0;
      out.length = len;
      len = len - 1 | 0;
      var a = self2.words[0] | 0;
      var b = num.words[0] | 0;
      var r2 = a * b;
      var lo = r2 & 67108863;
      var carry = r2 / 67108864 | 0;
      out.words[0] = lo;
      for (var k = 1; k < len; k++) {
        var ncarry = carry >>> 26;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j | 0;
          a = self2.words[i] | 0;
          b = num.words[j] | 0;
          r2 = a * b + rword;
          ncarry += r2 / 67108864 | 0;
          rword = r2 & 67108863;
        }
        out.words[k] = rword | 0;
        carry = ncarry | 0;
      }
      if (carry !== 0) {
        out.words[k] = carry | 0;
      } else {
        out.length--;
      }
      return out.strip();
    }
    var comb10MulTo = function comb10MulTo2(self2, num, out) {
      var a = self2.words;
      var b = num.words;
      var o = out.words;
      var c = 0;
      var lo;
      var mid;
      var hi;
      var a0 = a[0] | 0;
      var al0 = a0 & 8191;
      var ah0 = a0 >>> 13;
      var a1 = a[1] | 0;
      var al1 = a1 & 8191;
      var ah1 = a1 >>> 13;
      var a2 = a[2] | 0;
      var al2 = a2 & 8191;
      var ah2 = a2 >>> 13;
      var a3 = a[3] | 0;
      var al3 = a3 & 8191;
      var ah3 = a3 >>> 13;
      var a4 = a[4] | 0;
      var al4 = a4 & 8191;
      var ah4 = a4 >>> 13;
      var a5 = a[5] | 0;
      var al5 = a5 & 8191;
      var ah5 = a5 >>> 13;
      var a6 = a[6] | 0;
      var al6 = a6 & 8191;
      var ah6 = a6 >>> 13;
      var a7 = a[7] | 0;
      var al7 = a7 & 8191;
      var ah7 = a7 >>> 13;
      var a8 = a[8] | 0;
      var al8 = a8 & 8191;
      var ah8 = a8 >>> 13;
      var a9 = a[9] | 0;
      var al9 = a9 & 8191;
      var ah9 = a9 >>> 13;
      var b0 = b[0] | 0;
      var bl0 = b0 & 8191;
      var bh0 = b0 >>> 13;
      var b1 = b[1] | 0;
      var bl1 = b1 & 8191;
      var bh1 = b1 >>> 13;
      var b2 = b[2] | 0;
      var bl2 = b2 & 8191;
      var bh2 = b2 >>> 13;
      var b3 = b[3] | 0;
      var bl3 = b3 & 8191;
      var bh3 = b3 >>> 13;
      var b4 = b[4] | 0;
      var bl4 = b4 & 8191;
      var bh4 = b4 >>> 13;
      var b5 = b[5] | 0;
      var bl5 = b5 & 8191;
      var bh5 = b5 >>> 13;
      var b6 = b[6] | 0;
      var bl6 = b6 & 8191;
      var bh6 = b6 >>> 13;
      var b7 = b[7] | 0;
      var bl7 = b7 & 8191;
      var bh7 = b7 >>> 13;
      var b8 = b[8] | 0;
      var bl8 = b8 & 8191;
      var bh8 = b8 >>> 13;
      var b9 = b[9] | 0;
      var bl9 = b9 & 8191;
      var bh9 = b9 >>> 13;
      out.negative = self2.negative ^ num.negative;
      out.length = 19;
      lo = Math.imul(al0, bl0);
      mid = Math.imul(al0, bh0);
      mid = mid + Math.imul(ah0, bl0) | 0;
      hi = Math.imul(ah0, bh0);
      var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
      w0 &= 67108863;
      lo = Math.imul(al1, bl0);
      mid = Math.imul(al1, bh0);
      mid = mid + Math.imul(ah1, bl0) | 0;
      hi = Math.imul(ah1, bh0);
      lo = lo + Math.imul(al0, bl1) | 0;
      mid = mid + Math.imul(al0, bh1) | 0;
      mid = mid + Math.imul(ah0, bl1) | 0;
      hi = hi + Math.imul(ah0, bh1) | 0;
      var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
      w1 &= 67108863;
      lo = Math.imul(al2, bl0);
      mid = Math.imul(al2, bh0);
      mid = mid + Math.imul(ah2, bl0) | 0;
      hi = Math.imul(ah2, bh0);
      lo = lo + Math.imul(al1, bl1) | 0;
      mid = mid + Math.imul(al1, bh1) | 0;
      mid = mid + Math.imul(ah1, bl1) | 0;
      hi = hi + Math.imul(ah1, bh1) | 0;
      lo = lo + Math.imul(al0, bl2) | 0;
      mid = mid + Math.imul(al0, bh2) | 0;
      mid = mid + Math.imul(ah0, bl2) | 0;
      hi = hi + Math.imul(ah0, bh2) | 0;
      var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
      w2 &= 67108863;
      lo = Math.imul(al3, bl0);
      mid = Math.imul(al3, bh0);
      mid = mid + Math.imul(ah3, bl0) | 0;
      hi = Math.imul(ah3, bh0);
      lo = lo + Math.imul(al2, bl1) | 0;
      mid = mid + Math.imul(al2, bh1) | 0;
      mid = mid + Math.imul(ah2, bl1) | 0;
      hi = hi + Math.imul(ah2, bh1) | 0;
      lo = lo + Math.imul(al1, bl2) | 0;
      mid = mid + Math.imul(al1, bh2) | 0;
      mid = mid + Math.imul(ah1, bl2) | 0;
      hi = hi + Math.imul(ah1, bh2) | 0;
      lo = lo + Math.imul(al0, bl3) | 0;
      mid = mid + Math.imul(al0, bh3) | 0;
      mid = mid + Math.imul(ah0, bl3) | 0;
      hi = hi + Math.imul(ah0, bh3) | 0;
      var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
      w3 &= 67108863;
      lo = Math.imul(al4, bl0);
      mid = Math.imul(al4, bh0);
      mid = mid + Math.imul(ah4, bl0) | 0;
      hi = Math.imul(ah4, bh0);
      lo = lo + Math.imul(al3, bl1) | 0;
      mid = mid + Math.imul(al3, bh1) | 0;
      mid = mid + Math.imul(ah3, bl1) | 0;
      hi = hi + Math.imul(ah3, bh1) | 0;
      lo = lo + Math.imul(al2, bl2) | 0;
      mid = mid + Math.imul(al2, bh2) | 0;
      mid = mid + Math.imul(ah2, bl2) | 0;
      hi = hi + Math.imul(ah2, bh2) | 0;
      lo = lo + Math.imul(al1, bl3) | 0;
      mid = mid + Math.imul(al1, bh3) | 0;
      mid = mid + Math.imul(ah1, bl3) | 0;
      hi = hi + Math.imul(ah1, bh3) | 0;
      lo = lo + Math.imul(al0, bl4) | 0;
      mid = mid + Math.imul(al0, bh4) | 0;
      mid = mid + Math.imul(ah0, bl4) | 0;
      hi = hi + Math.imul(ah0, bh4) | 0;
      var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
      w4 &= 67108863;
      lo = Math.imul(al5, bl0);
      mid = Math.imul(al5, bh0);
      mid = mid + Math.imul(ah5, bl0) | 0;
      hi = Math.imul(ah5, bh0);
      lo = lo + Math.imul(al4, bl1) | 0;
      mid = mid + Math.imul(al4, bh1) | 0;
      mid = mid + Math.imul(ah4, bl1) | 0;
      hi = hi + Math.imul(ah4, bh1) | 0;
      lo = lo + Math.imul(al3, bl2) | 0;
      mid = mid + Math.imul(al3, bh2) | 0;
      mid = mid + Math.imul(ah3, bl2) | 0;
      hi = hi + Math.imul(ah3, bh2) | 0;
      lo = lo + Math.imul(al2, bl3) | 0;
      mid = mid + Math.imul(al2, bh3) | 0;
      mid = mid + Math.imul(ah2, bl3) | 0;
      hi = hi + Math.imul(ah2, bh3) | 0;
      lo = lo + Math.imul(al1, bl4) | 0;
      mid = mid + Math.imul(al1, bh4) | 0;
      mid = mid + Math.imul(ah1, bl4) | 0;
      hi = hi + Math.imul(ah1, bh4) | 0;
      lo = lo + Math.imul(al0, bl5) | 0;
      mid = mid + Math.imul(al0, bh5) | 0;
      mid = mid + Math.imul(ah0, bl5) | 0;
      hi = hi + Math.imul(ah0, bh5) | 0;
      var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
      w5 &= 67108863;
      lo = Math.imul(al6, bl0);
      mid = Math.imul(al6, bh0);
      mid = mid + Math.imul(ah6, bl0) | 0;
      hi = Math.imul(ah6, bh0);
      lo = lo + Math.imul(al5, bl1) | 0;
      mid = mid + Math.imul(al5, bh1) | 0;
      mid = mid + Math.imul(ah5, bl1) | 0;
      hi = hi + Math.imul(ah5, bh1) | 0;
      lo = lo + Math.imul(al4, bl2) | 0;
      mid = mid + Math.imul(al4, bh2) | 0;
      mid = mid + Math.imul(ah4, bl2) | 0;
      hi = hi + Math.imul(ah4, bh2) | 0;
      lo = lo + Math.imul(al3, bl3) | 0;
      mid = mid + Math.imul(al3, bh3) | 0;
      mid = mid + Math.imul(ah3, bl3) | 0;
      hi = hi + Math.imul(ah3, bh3) | 0;
      lo = lo + Math.imul(al2, bl4) | 0;
      mid = mid + Math.imul(al2, bh4) | 0;
      mid = mid + Math.imul(ah2, bl4) | 0;
      hi = hi + Math.imul(ah2, bh4) | 0;
      lo = lo + Math.imul(al1, bl5) | 0;
      mid = mid + Math.imul(al1, bh5) | 0;
      mid = mid + Math.imul(ah1, bl5) | 0;
      hi = hi + Math.imul(ah1, bh5) | 0;
      lo = lo + Math.imul(al0, bl6) | 0;
      mid = mid + Math.imul(al0, bh6) | 0;
      mid = mid + Math.imul(ah0, bl6) | 0;
      hi = hi + Math.imul(ah0, bh6) | 0;
      var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
      w6 &= 67108863;
      lo = Math.imul(al7, bl0);
      mid = Math.imul(al7, bh0);
      mid = mid + Math.imul(ah7, bl0) | 0;
      hi = Math.imul(ah7, bh0);
      lo = lo + Math.imul(al6, bl1) | 0;
      mid = mid + Math.imul(al6, bh1) | 0;
      mid = mid + Math.imul(ah6, bl1) | 0;
      hi = hi + Math.imul(ah6, bh1) | 0;
      lo = lo + Math.imul(al5, bl2) | 0;
      mid = mid + Math.imul(al5, bh2) | 0;
      mid = mid + Math.imul(ah5, bl2) | 0;
      hi = hi + Math.imul(ah5, bh2) | 0;
      lo = lo + Math.imul(al4, bl3) | 0;
      mid = mid + Math.imul(al4, bh3) | 0;
      mid = mid + Math.imul(ah4, bl3) | 0;
      hi = hi + Math.imul(ah4, bh3) | 0;
      lo = lo + Math.imul(al3, bl4) | 0;
      mid = mid + Math.imul(al3, bh4) | 0;
      mid = mid + Math.imul(ah3, bl4) | 0;
      hi = hi + Math.imul(ah3, bh4) | 0;
      lo = lo + Math.imul(al2, bl5) | 0;
      mid = mid + Math.imul(al2, bh5) | 0;
      mid = mid + Math.imul(ah2, bl5) | 0;
      hi = hi + Math.imul(ah2, bh5) | 0;
      lo = lo + Math.imul(al1, bl6) | 0;
      mid = mid + Math.imul(al1, bh6) | 0;
      mid = mid + Math.imul(ah1, bl6) | 0;
      hi = hi + Math.imul(ah1, bh6) | 0;
      lo = lo + Math.imul(al0, bl7) | 0;
      mid = mid + Math.imul(al0, bh7) | 0;
      mid = mid + Math.imul(ah0, bl7) | 0;
      hi = hi + Math.imul(ah0, bh7) | 0;
      var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
      w7 &= 67108863;
      lo = Math.imul(al8, bl0);
      mid = Math.imul(al8, bh0);
      mid = mid + Math.imul(ah8, bl0) | 0;
      hi = Math.imul(ah8, bh0);
      lo = lo + Math.imul(al7, bl1) | 0;
      mid = mid + Math.imul(al7, bh1) | 0;
      mid = mid + Math.imul(ah7, bl1) | 0;
      hi = hi + Math.imul(ah7, bh1) | 0;
      lo = lo + Math.imul(al6, bl2) | 0;
      mid = mid + Math.imul(al6, bh2) | 0;
      mid = mid + Math.imul(ah6, bl2) | 0;
      hi = hi + Math.imul(ah6, bh2) | 0;
      lo = lo + Math.imul(al5, bl3) | 0;
      mid = mid + Math.imul(al5, bh3) | 0;
      mid = mid + Math.imul(ah5, bl3) | 0;
      hi = hi + Math.imul(ah5, bh3) | 0;
      lo = lo + Math.imul(al4, bl4) | 0;
      mid = mid + Math.imul(al4, bh4) | 0;
      mid = mid + Math.imul(ah4, bl4) | 0;
      hi = hi + Math.imul(ah4, bh4) | 0;
      lo = lo + Math.imul(al3, bl5) | 0;
      mid = mid + Math.imul(al3, bh5) | 0;
      mid = mid + Math.imul(ah3, bl5) | 0;
      hi = hi + Math.imul(ah3, bh5) | 0;
      lo = lo + Math.imul(al2, bl6) | 0;
      mid = mid + Math.imul(al2, bh6) | 0;
      mid = mid + Math.imul(ah2, bl6) | 0;
      hi = hi + Math.imul(ah2, bh6) | 0;
      lo = lo + Math.imul(al1, bl7) | 0;
      mid = mid + Math.imul(al1, bh7) | 0;
      mid = mid + Math.imul(ah1, bl7) | 0;
      hi = hi + Math.imul(ah1, bh7) | 0;
      lo = lo + Math.imul(al0, bl8) | 0;
      mid = mid + Math.imul(al0, bh8) | 0;
      mid = mid + Math.imul(ah0, bl8) | 0;
      hi = hi + Math.imul(ah0, bh8) | 0;
      var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
      w8 &= 67108863;
      lo = Math.imul(al9, bl0);
      mid = Math.imul(al9, bh0);
      mid = mid + Math.imul(ah9, bl0) | 0;
      hi = Math.imul(ah9, bh0);
      lo = lo + Math.imul(al8, bl1) | 0;
      mid = mid + Math.imul(al8, bh1) | 0;
      mid = mid + Math.imul(ah8, bl1) | 0;
      hi = hi + Math.imul(ah8, bh1) | 0;
      lo = lo + Math.imul(al7, bl2) | 0;
      mid = mid + Math.imul(al7, bh2) | 0;
      mid = mid + Math.imul(ah7, bl2) | 0;
      hi = hi + Math.imul(ah7, bh2) | 0;
      lo = lo + Math.imul(al6, bl3) | 0;
      mid = mid + Math.imul(al6, bh3) | 0;
      mid = mid + Math.imul(ah6, bl3) | 0;
      hi = hi + Math.imul(ah6, bh3) | 0;
      lo = lo + Math.imul(al5, bl4) | 0;
      mid = mid + Math.imul(al5, bh4) | 0;
      mid = mid + Math.imul(ah5, bl4) | 0;
      hi = hi + Math.imul(ah5, bh4) | 0;
      lo = lo + Math.imul(al4, bl5) | 0;
      mid = mid + Math.imul(al4, bh5) | 0;
      mid = mid + Math.imul(ah4, bl5) | 0;
      hi = hi + Math.imul(ah4, bh5) | 0;
      lo = lo + Math.imul(al3, bl6) | 0;
      mid = mid + Math.imul(al3, bh6) | 0;
      mid = mid + Math.imul(ah3, bl6) | 0;
      hi = hi + Math.imul(ah3, bh6) | 0;
      lo = lo + Math.imul(al2, bl7) | 0;
      mid = mid + Math.imul(al2, bh7) | 0;
      mid = mid + Math.imul(ah2, bl7) | 0;
      hi = hi + Math.imul(ah2, bh7) | 0;
      lo = lo + Math.imul(al1, bl8) | 0;
      mid = mid + Math.imul(al1, bh8) | 0;
      mid = mid + Math.imul(ah1, bl8) | 0;
      hi = hi + Math.imul(ah1, bh8) | 0;
      lo = lo + Math.imul(al0, bl9) | 0;
      mid = mid + Math.imul(al0, bh9) | 0;
      mid = mid + Math.imul(ah0, bl9) | 0;
      hi = hi + Math.imul(ah0, bh9) | 0;
      var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
      w9 &= 67108863;
      lo = Math.imul(al9, bl1);
      mid = Math.imul(al9, bh1);
      mid = mid + Math.imul(ah9, bl1) | 0;
      hi = Math.imul(ah9, bh1);
      lo = lo + Math.imul(al8, bl2) | 0;
      mid = mid + Math.imul(al8, bh2) | 0;
      mid = mid + Math.imul(ah8, bl2) | 0;
      hi = hi + Math.imul(ah8, bh2) | 0;
      lo = lo + Math.imul(al7, bl3) | 0;
      mid = mid + Math.imul(al7, bh3) | 0;
      mid = mid + Math.imul(ah7, bl3) | 0;
      hi = hi + Math.imul(ah7, bh3) | 0;
      lo = lo + Math.imul(al6, bl4) | 0;
      mid = mid + Math.imul(al6, bh4) | 0;
      mid = mid + Math.imul(ah6, bl4) | 0;
      hi = hi + Math.imul(ah6, bh4) | 0;
      lo = lo + Math.imul(al5, bl5) | 0;
      mid = mid + Math.imul(al5, bh5) | 0;
      mid = mid + Math.imul(ah5, bl5) | 0;
      hi = hi + Math.imul(ah5, bh5) | 0;
      lo = lo + Math.imul(al4, bl6) | 0;
      mid = mid + Math.imul(al4, bh6) | 0;
      mid = mid + Math.imul(ah4, bl6) | 0;
      hi = hi + Math.imul(ah4, bh6) | 0;
      lo = lo + Math.imul(al3, bl7) | 0;
      mid = mid + Math.imul(al3, bh7) | 0;
      mid = mid + Math.imul(ah3, bl7) | 0;
      hi = hi + Math.imul(ah3, bh7) | 0;
      lo = lo + Math.imul(al2, bl8) | 0;
      mid = mid + Math.imul(al2, bh8) | 0;
      mid = mid + Math.imul(ah2, bl8) | 0;
      hi = hi + Math.imul(ah2, bh8) | 0;
      lo = lo + Math.imul(al1, bl9) | 0;
      mid = mid + Math.imul(al1, bh9) | 0;
      mid = mid + Math.imul(ah1, bl9) | 0;
      hi = hi + Math.imul(ah1, bh9) | 0;
      var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
      w10 &= 67108863;
      lo = Math.imul(al9, bl2);
      mid = Math.imul(al9, bh2);
      mid = mid + Math.imul(ah9, bl2) | 0;
      hi = Math.imul(ah9, bh2);
      lo = lo + Math.imul(al8, bl3) | 0;
      mid = mid + Math.imul(al8, bh3) | 0;
      mid = mid + Math.imul(ah8, bl3) | 0;
      hi = hi + Math.imul(ah8, bh3) | 0;
      lo = lo + Math.imul(al7, bl4) | 0;
      mid = mid + Math.imul(al7, bh4) | 0;
      mid = mid + Math.imul(ah7, bl4) | 0;
      hi = hi + Math.imul(ah7, bh4) | 0;
      lo = lo + Math.imul(al6, bl5) | 0;
      mid = mid + Math.imul(al6, bh5) | 0;
      mid = mid + Math.imul(ah6, bl5) | 0;
      hi = hi + Math.imul(ah6, bh5) | 0;
      lo = lo + Math.imul(al5, bl6) | 0;
      mid = mid + Math.imul(al5, bh6) | 0;
      mid = mid + Math.imul(ah5, bl6) | 0;
      hi = hi + Math.imul(ah5, bh6) | 0;
      lo = lo + Math.imul(al4, bl7) | 0;
      mid = mid + Math.imul(al4, bh7) | 0;
      mid = mid + Math.imul(ah4, bl7) | 0;
      hi = hi + Math.imul(ah4, bh7) | 0;
      lo = lo + Math.imul(al3, bl8) | 0;
      mid = mid + Math.imul(al3, bh8) | 0;
      mid = mid + Math.imul(ah3, bl8) | 0;
      hi = hi + Math.imul(ah3, bh8) | 0;
      lo = lo + Math.imul(al2, bl9) | 0;
      mid = mid + Math.imul(al2, bh9) | 0;
      mid = mid + Math.imul(ah2, bl9) | 0;
      hi = hi + Math.imul(ah2, bh9) | 0;
      var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
      w11 &= 67108863;
      lo = Math.imul(al9, bl3);
      mid = Math.imul(al9, bh3);
      mid = mid + Math.imul(ah9, bl3) | 0;
      hi = Math.imul(ah9, bh3);
      lo = lo + Math.imul(al8, bl4) | 0;
      mid = mid + Math.imul(al8, bh4) | 0;
      mid = mid + Math.imul(ah8, bl4) | 0;
      hi = hi + Math.imul(ah8, bh4) | 0;
      lo = lo + Math.imul(al7, bl5) | 0;
      mid = mid + Math.imul(al7, bh5) | 0;
      mid = mid + Math.imul(ah7, bl5) | 0;
      hi = hi + Math.imul(ah7, bh5) | 0;
      lo = lo + Math.imul(al6, bl6) | 0;
      mid = mid + Math.imul(al6, bh6) | 0;
      mid = mid + Math.imul(ah6, bl6) | 0;
      hi = hi + Math.imul(ah6, bh6) | 0;
      lo = lo + Math.imul(al5, bl7) | 0;
      mid = mid + Math.imul(al5, bh7) | 0;
      mid = mid + Math.imul(ah5, bl7) | 0;
      hi = hi + Math.imul(ah5, bh7) | 0;
      lo = lo + Math.imul(al4, bl8) | 0;
      mid = mid + Math.imul(al4, bh8) | 0;
      mid = mid + Math.imul(ah4, bl8) | 0;
      hi = hi + Math.imul(ah4, bh8) | 0;
      lo = lo + Math.imul(al3, bl9) | 0;
      mid = mid + Math.imul(al3, bh9) | 0;
      mid = mid + Math.imul(ah3, bl9) | 0;
      hi = hi + Math.imul(ah3, bh9) | 0;
      var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
      w12 &= 67108863;
      lo = Math.imul(al9, bl4);
      mid = Math.imul(al9, bh4);
      mid = mid + Math.imul(ah9, bl4) | 0;
      hi = Math.imul(ah9, bh4);
      lo = lo + Math.imul(al8, bl5) | 0;
      mid = mid + Math.imul(al8, bh5) | 0;
      mid = mid + Math.imul(ah8, bl5) | 0;
      hi = hi + Math.imul(ah8, bh5) | 0;
      lo = lo + Math.imul(al7, bl6) | 0;
      mid = mid + Math.imul(al7, bh6) | 0;
      mid = mid + Math.imul(ah7, bl6) | 0;
      hi = hi + Math.imul(ah7, bh6) | 0;
      lo = lo + Math.imul(al6, bl7) | 0;
      mid = mid + Math.imul(al6, bh7) | 0;
      mid = mid + Math.imul(ah6, bl7) | 0;
      hi = hi + Math.imul(ah6, bh7) | 0;
      lo = lo + Math.imul(al5, bl8) | 0;
      mid = mid + Math.imul(al5, bh8) | 0;
      mid = mid + Math.imul(ah5, bl8) | 0;
      hi = hi + Math.imul(ah5, bh8) | 0;
      lo = lo + Math.imul(al4, bl9) | 0;
      mid = mid + Math.imul(al4, bh9) | 0;
      mid = mid + Math.imul(ah4, bl9) | 0;
      hi = hi + Math.imul(ah4, bh9) | 0;
      var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
      w13 &= 67108863;
      lo = Math.imul(al9, bl5);
      mid = Math.imul(al9, bh5);
      mid = mid + Math.imul(ah9, bl5) | 0;
      hi = Math.imul(ah9, bh5);
      lo = lo + Math.imul(al8, bl6) | 0;
      mid = mid + Math.imul(al8, bh6) | 0;
      mid = mid + Math.imul(ah8, bl6) | 0;
      hi = hi + Math.imul(ah8, bh6) | 0;
      lo = lo + Math.imul(al7, bl7) | 0;
      mid = mid + Math.imul(al7, bh7) | 0;
      mid = mid + Math.imul(ah7, bl7) | 0;
      hi = hi + Math.imul(ah7, bh7) | 0;
      lo = lo + Math.imul(al6, bl8) | 0;
      mid = mid + Math.imul(al6, bh8) | 0;
      mid = mid + Math.imul(ah6, bl8) | 0;
      hi = hi + Math.imul(ah6, bh8) | 0;
      lo = lo + Math.imul(al5, bl9) | 0;
      mid = mid + Math.imul(al5, bh9) | 0;
      mid = mid + Math.imul(ah5, bl9) | 0;
      hi = hi + Math.imul(ah5, bh9) | 0;
      var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
      w14 &= 67108863;
      lo = Math.imul(al9, bl6);
      mid = Math.imul(al9, bh6);
      mid = mid + Math.imul(ah9, bl6) | 0;
      hi = Math.imul(ah9, bh6);
      lo = lo + Math.imul(al8, bl7) | 0;
      mid = mid + Math.imul(al8, bh7) | 0;
      mid = mid + Math.imul(ah8, bl7) | 0;
      hi = hi + Math.imul(ah8, bh7) | 0;
      lo = lo + Math.imul(al7, bl8) | 0;
      mid = mid + Math.imul(al7, bh8) | 0;
      mid = mid + Math.imul(ah7, bl8) | 0;
      hi = hi + Math.imul(ah7, bh8) | 0;
      lo = lo + Math.imul(al6, bl9) | 0;
      mid = mid + Math.imul(al6, bh9) | 0;
      mid = mid + Math.imul(ah6, bl9) | 0;
      hi = hi + Math.imul(ah6, bh9) | 0;
      var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
      w15 &= 67108863;
      lo = Math.imul(al9, bl7);
      mid = Math.imul(al9, bh7);
      mid = mid + Math.imul(ah9, bl7) | 0;
      hi = Math.imul(ah9, bh7);
      lo = lo + Math.imul(al8, bl8) | 0;
      mid = mid + Math.imul(al8, bh8) | 0;
      mid = mid + Math.imul(ah8, bl8) | 0;
      hi = hi + Math.imul(ah8, bh8) | 0;
      lo = lo + Math.imul(al7, bl9) | 0;
      mid = mid + Math.imul(al7, bh9) | 0;
      mid = mid + Math.imul(ah7, bl9) | 0;
      hi = hi + Math.imul(ah7, bh9) | 0;
      var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
      w16 &= 67108863;
      lo = Math.imul(al9, bl8);
      mid = Math.imul(al9, bh8);
      mid = mid + Math.imul(ah9, bl8) | 0;
      hi = Math.imul(ah9, bh8);
      lo = lo + Math.imul(al8, bl9) | 0;
      mid = mid + Math.imul(al8, bh9) | 0;
      mid = mid + Math.imul(ah8, bl9) | 0;
      hi = hi + Math.imul(ah8, bh9) | 0;
      var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
      w17 &= 67108863;
      lo = Math.imul(al9, bl9);
      mid = Math.imul(al9, bh9);
      mid = mid + Math.imul(ah9, bl9) | 0;
      hi = Math.imul(ah9, bh9);
      var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
      w18 &= 67108863;
      o[0] = w0;
      o[1] = w1;
      o[2] = w2;
      o[3] = w3;
      o[4] = w4;
      o[5] = w5;
      o[6] = w6;
      o[7] = w7;
      o[8] = w8;
      o[9] = w9;
      o[10] = w10;
      o[11] = w11;
      o[12] = w12;
      o[13] = w13;
      o[14] = w14;
      o[15] = w15;
      o[16] = w16;
      o[17] = w17;
      o[18] = w18;
      if (c !== 0) {
        o[19] = c;
        out.length++;
      }
      return out;
    };
    if (!Math.imul) {
      comb10MulTo = smallMulTo;
    }
    function bigMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      out.length = self2.length + num.length;
      var carry = 0;
      var hncarry = 0;
      for (var k = 0; k < out.length - 1; k++) {
        var ncarry = hncarry;
        hncarry = 0;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j;
          var a = self2.words[i] | 0;
          var b = num.words[j] | 0;
          var r2 = a * b;
          var lo = r2 & 67108863;
          ncarry = ncarry + (r2 / 67108864 | 0) | 0;
          lo = lo + rword | 0;
          rword = lo & 67108863;
          ncarry = ncarry + (lo >>> 26) | 0;
          hncarry += ncarry >>> 26;
          ncarry &= 67108863;
        }
        out.words[k] = rword;
        carry = ncarry;
        ncarry = hncarry;
      }
      if (carry !== 0) {
        out.words[k] = carry;
      } else {
        out.length--;
      }
      return out.strip();
    }
    function jumboMulTo(self2, num, out) {
      var fftm = new FFTM();
      return fftm.mulp(self2, num, out);
    }
    BN2.prototype.mulTo = function mulTo(num, out) {
      var res;
      var len = this.length + num.length;
      if (this.length === 10 && num.length === 10) {
        res = comb10MulTo(this, num, out);
      } else if (len < 63) {
        res = smallMulTo(this, num, out);
      } else if (len < 1024) {
        res = bigMulTo(this, num, out);
      } else {
        res = jumboMulTo(this, num, out);
      }
      return res;
    };
    function FFTM(x, y) {
      this.x = x;
      this.y = y;
    }
    FFTM.prototype.makeRBT = function makeRBT(N) {
      var t = new Array(N);
      var l = BN2.prototype._countBits(N) - 1;
      for (var i = 0; i < N; i++) {
        t[i] = this.revBin(i, l, N);
      }
      return t;
    };
    FFTM.prototype.revBin = function revBin(x, l, N) {
      if (x === 0 || x === N - 1)
        return x;
      var rb = 0;
      for (var i = 0; i < l; i++) {
        rb |= (x & 1) << l - i - 1;
        x >>= 1;
      }
      return rb;
    };
    FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
      for (var i = 0; i < N; i++) {
        rtws[i] = rws[rbt[i]];
        itws[i] = iws[rbt[i]];
      }
    };
    FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
      this.permute(rbt, rws, iws, rtws, itws, N);
      for (var s2 = 1; s2 < N; s2 <<= 1) {
        var l = s2 << 1;
        var rtwdf = Math.cos(2 * Math.PI / l);
        var itwdf = Math.sin(2 * Math.PI / l);
        for (var p = 0; p < N; p += l) {
          var rtwdf_ = rtwdf;
          var itwdf_ = itwdf;
          for (var j = 0; j < s2; j++) {
            var re = rtws[p + j];
            var ie = itws[p + j];
            var ro = rtws[p + j + s2];
            var io = itws[p + j + s2];
            var rx = rtwdf_ * ro - itwdf_ * io;
            io = rtwdf_ * io + itwdf_ * ro;
            ro = rx;
            rtws[p + j] = re + ro;
            itws[p + j] = ie + io;
            rtws[p + j + s2] = re - ro;
            itws[p + j + s2] = ie - io;
            if (j !== l) {
              rx = rtwdf * rtwdf_ - itwdf * itwdf_;
              itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
              rtwdf_ = rx;
            }
          }
        }
      }
    };
    FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
      var N = Math.max(m, n) | 1;
      var odd = N & 1;
      var i = 0;
      for (N = N / 2 | 0; N; N = N >>> 1) {
        i++;
      }
      return 1 << i + 1 + odd;
    };
    FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
      if (N <= 1)
        return;
      for (var i = 0; i < N / 2; i++) {
        var t = rws[i];
        rws[i] = rws[N - i - 1];
        rws[N - i - 1] = t;
        t = iws[i];
        iws[i] = -iws[N - i - 1];
        iws[N - i - 1] = -t;
      }
    };
    FFTM.prototype.normalize13b = function normalize13b(ws, N) {
      var carry = 0;
      for (var i = 0; i < N / 2; i++) {
        var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
        ws[i] = w & 67108863;
        if (w < 67108864) {
          carry = 0;
        } else {
          carry = w / 67108864 | 0;
        }
      }
      return ws;
    };
    FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
      var carry = 0;
      for (var i = 0; i < len; i++) {
        carry = carry + (ws[i] | 0);
        rws[2 * i] = carry & 8191;
        carry = carry >>> 13;
        rws[2 * i + 1] = carry & 8191;
        carry = carry >>> 13;
      }
      for (i = 2 * len; i < N; ++i) {
        rws[i] = 0;
      }
      assert2(carry === 0);
      assert2((carry & ~8191) === 0);
    };
    FFTM.prototype.stub = function stub(N) {
      var ph = new Array(N);
      for (var i = 0; i < N; i++) {
        ph[i] = 0;
      }
      return ph;
    };
    FFTM.prototype.mulp = function mulp(x, y, out) {
      var N = 2 * this.guessLen13b(x.length, y.length);
      var rbt = this.makeRBT(N);
      var _ = this.stub(N);
      var rws = new Array(N);
      var rwst = new Array(N);
      var iwst = new Array(N);
      var nrws = new Array(N);
      var nrwst = new Array(N);
      var niwst = new Array(N);
      var rmws = out.words;
      rmws.length = N;
      this.convert13b(x.words, x.length, rws, N);
      this.convert13b(y.words, y.length, nrws, N);
      this.transform(rws, _, rwst, iwst, N, rbt);
      this.transform(nrws, _, nrwst, niwst, N, rbt);
      for (var i = 0; i < N; i++) {
        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
        rwst[i] = rx;
      }
      this.conjugate(rwst, iwst, N);
      this.transform(rwst, iwst, rmws, _, N, rbt);
      this.conjugate(rmws, _, N);
      this.normalize13b(rmws, N);
      out.negative = x.negative ^ y.negative;
      out.length = x.length + y.length;
      return out.strip();
    };
    BN2.prototype.mul = function mul3(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return this.mulTo(num, out);
    };
    BN2.prototype.mulf = function mulf(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return jumboMulTo(this, num, out);
    };
    BN2.prototype.imul = function imul(num) {
      return this.clone().mulTo(num, this);
    };
    BN2.prototype.imuln = function imuln(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = (this.words[i] | 0) * num;
        var lo = (w & 67108863) + (carry & 67108863);
        carry >>= 26;
        carry += w / 67108864 | 0;
        carry += lo >>> 26;
        this.words[i] = lo & 67108863;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.muln = function muln(num) {
      return this.clone().imuln(num);
    };
    BN2.prototype.sqr = function sqr() {
      return this.mul(this);
    };
    BN2.prototype.isqr = function isqr() {
      return this.imul(this.clone());
    };
    BN2.prototype.pow = function pow(num) {
      var w = toBitArray(num);
      if (w.length === 0)
        return new BN2(1);
      var res = this;
      for (var i = 0; i < w.length; i++, res = res.sqr()) {
        if (w[i] !== 0)
          break;
      }
      if (++i < w.length) {
        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
          if (w[i] === 0)
            continue;
          res = res.mul(q);
        }
      }
      return res;
    };
    BN2.prototype.iushln = function iushln(bits) {
      assert2(typeof bits === "number" && bits >= 0);
      var r2 = bits % 26;
      var s2 = (bits - r2) / 26;
      var carryMask = 67108863 >>> 26 - r2 << 26 - r2;
      var i;
      if (r2 !== 0) {
        var carry = 0;
        for (i = 0; i < this.length; i++) {
          var newCarry = this.words[i] & carryMask;
          var c = (this.words[i] | 0) - newCarry << r2;
          this.words[i] = c | carry;
          carry = newCarry >>> 26 - r2;
        }
        if (carry) {
          this.words[i] = carry;
          this.length++;
        }
      }
      if (s2 !== 0) {
        for (i = this.length - 1; i >= 0; i--) {
          this.words[i + s2] = this.words[i];
        }
        for (i = 0; i < s2; i++) {
          this.words[i] = 0;
        }
        this.length += s2;
      }
      return this.strip();
    };
    BN2.prototype.ishln = function ishln(bits) {
      assert2(this.negative === 0);
      return this.iushln(bits);
    };
    BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
      assert2(typeof bits === "number" && bits >= 0);
      var h;
      if (hint) {
        h = (hint - hint % 26) / 26;
      } else {
        h = 0;
      }
      var r2 = bits % 26;
      var s2 = Math.min((bits - r2) / 26, this.length);
      var mask = 67108863 ^ 67108863 >>> r2 << r2;
      var maskedWords = extended;
      h -= s2;
      h = Math.max(0, h);
      if (maskedWords) {
        for (var i = 0; i < s2; i++) {
          maskedWords.words[i] = this.words[i];
        }
        maskedWords.length = s2;
      }
      if (s2 === 0)
        ;
      else if (this.length > s2) {
        this.length -= s2;
        for (i = 0; i < this.length; i++) {
          this.words[i] = this.words[i + s2];
        }
      } else {
        this.words[0] = 0;
        this.length = 1;
      }
      var carry = 0;
      for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
        var word = this.words[i] | 0;
        this.words[i] = carry << 26 - r2 | word >>> r2;
        carry = word & mask;
      }
      if (maskedWords && carry !== 0) {
        maskedWords.words[maskedWords.length++] = carry;
      }
      if (this.length === 0) {
        this.words[0] = 0;
        this.length = 1;
      }
      return this.strip();
    };
    BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
      assert2(this.negative === 0);
      return this.iushrn(bits, hint, extended);
    };
    BN2.prototype.shln = function shln(bits) {
      return this.clone().ishln(bits);
    };
    BN2.prototype.ushln = function ushln(bits) {
      return this.clone().iushln(bits);
    };
    BN2.prototype.shrn = function shrn(bits) {
      return this.clone().ishrn(bits);
    };
    BN2.prototype.ushrn = function ushrn(bits) {
      return this.clone().iushrn(bits);
    };
    BN2.prototype.testn = function testn(bit) {
      assert2(typeof bit === "number" && bit >= 0);
      var r2 = bit % 26;
      var s2 = (bit - r2) / 26;
      var q = 1 << r2;
      if (this.length <= s2)
        return false;
      var w = this.words[s2];
      return !!(w & q);
    };
    BN2.prototype.imaskn = function imaskn(bits) {
      assert2(typeof bits === "number" && bits >= 0);
      var r2 = bits % 26;
      var s2 = (bits - r2) / 26;
      assert2(this.negative === 0, "imaskn works only with positive numbers");
      if (this.length <= s2) {
        return this;
      }
      if (r2 !== 0) {
        s2++;
      }
      this.length = Math.min(s2, this.length);
      if (r2 !== 0) {
        var mask = 67108863 ^ 67108863 >>> r2 << r2;
        this.words[this.length - 1] &= mask;
      }
      return this.strip();
    };
    BN2.prototype.maskn = function maskn(bits) {
      return this.clone().imaskn(bits);
    };
    BN2.prototype.iaddn = function iaddn(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      if (num < 0)
        return this.isubn(-num);
      if (this.negative !== 0) {
        if (this.length === 1 && (this.words[0] | 0) < num) {
          this.words[0] = num - (this.words[0] | 0);
          this.negative = 0;
          return this;
        }
        this.negative = 0;
        this.isubn(num);
        this.negative = 1;
        return this;
      }
      return this._iaddn(num);
    };
    BN2.prototype._iaddn = function _iaddn(num) {
      this.words[0] += num;
      for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
        this.words[i] -= 67108864;
        if (i === this.length - 1) {
          this.words[i + 1] = 1;
        } else {
          this.words[i + 1]++;
        }
      }
      this.length = Math.max(this.length, i + 1);
      return this;
    };
    BN2.prototype.isubn = function isubn(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      if (num < 0)
        return this.iaddn(-num);
      if (this.negative !== 0) {
        this.negative = 0;
        this.iaddn(num);
        this.negative = 1;
        return this;
      }
      this.words[0] -= num;
      if (this.length === 1 && this.words[0] < 0) {
        this.words[0] = -this.words[0];
        this.negative = 1;
      } else {
        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
          this.words[i] += 67108864;
          this.words[i + 1] -= 1;
        }
      }
      return this.strip();
    };
    BN2.prototype.addn = function addn(num) {
      return this.clone().iaddn(num);
    };
    BN2.prototype.subn = function subn(num) {
      return this.clone().isubn(num);
    };
    BN2.prototype.iabs = function iabs() {
      this.negative = 0;
      return this;
    };
    BN2.prototype.abs = function abs() {
      return this.clone().iabs();
    };
    BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul3, shift) {
      var len = num.length + shift;
      var i;
      this._expand(len);
      var w;
      var carry = 0;
      for (i = 0; i < num.length; i++) {
        w = (this.words[i + shift] | 0) + carry;
        var right = (num.words[i] | 0) * mul3;
        w -= right & 67108863;
        carry = (w >> 26) - (right / 67108864 | 0);
        this.words[i + shift] = w & 67108863;
      }
      for (; i < this.length - shift; i++) {
        w = (this.words[i + shift] | 0) + carry;
        carry = w >> 26;
        this.words[i + shift] = w & 67108863;
      }
      if (carry === 0)
        return this.strip();
      assert2(carry === -1);
      carry = 0;
      for (i = 0; i < this.length; i++) {
        w = -(this.words[i] | 0) + carry;
        carry = w >> 26;
        this.words[i] = w & 67108863;
      }
      this.negative = 1;
      return this.strip();
    };
    BN2.prototype._wordDiv = function _wordDiv(num, mode) {
      var shift = this.length - num.length;
      var a = this.clone();
      var b = num;
      var bhi = b.words[b.length - 1] | 0;
      var bhiBits = this._countBits(bhi);
      shift = 26 - bhiBits;
      if (shift !== 0) {
        b = b.ushln(shift);
        a.iushln(shift);
        bhi = b.words[b.length - 1] | 0;
      }
      var m = a.length - b.length;
      var q;
      if (mode !== "mod") {
        q = new BN2(null);
        q.length = m + 1;
        q.words = new Array(q.length);
        for (var i = 0; i < q.length; i++) {
          q.words[i] = 0;
        }
      }
      var diff = a.clone()._ishlnsubmul(b, 1, m);
      if (diff.negative === 0) {
        a = diff;
        if (q) {
          q.words[m] = 1;
        }
      }
      for (var j = m - 1; j >= 0; j--) {
        var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
        qj = Math.min(qj / bhi | 0, 67108863);
        a._ishlnsubmul(b, qj, j);
        while (a.negative !== 0) {
          qj--;
          a.negative = 0;
          a._ishlnsubmul(b, 1, j);
          if (!a.isZero()) {
            a.negative ^= 1;
          }
        }
        if (q) {
          q.words[j] = qj;
        }
      }
      if (q) {
        q.strip();
      }
      a.strip();
      if (mode !== "div" && shift !== 0) {
        a.iushrn(shift);
      }
      return {
        div: q || null,
        mod: a
      };
    };
    BN2.prototype.divmod = function divmod(num, mode, positive) {
      assert2(!num.isZero());
      if (this.isZero()) {
        return {
          div: new BN2(0),
          mod: new BN2(0)
        };
      }
      var div, mod, res;
      if (this.negative !== 0 && num.negative === 0) {
        res = this.neg().divmod(num, mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.iadd(num);
          }
        }
        return {
          div,
          mod
        };
      }
      if (this.negative === 0 && num.negative !== 0) {
        res = this.divmod(num.neg(), mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        return {
          div,
          mod: res.mod
        };
      }
      if ((this.negative & num.negative) !== 0) {
        res = this.neg().divmod(num.neg(), mode);
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.isub(num);
          }
        }
        return {
          div: res.div,
          mod
        };
      }
      if (num.length > this.length || this.cmp(num) < 0) {
        return {
          div: new BN2(0),
          mod: this
        };
      }
      if (num.length === 1) {
        if (mode === "div") {
          return {
            div: this.divn(num.words[0]),
            mod: null
          };
        }
        if (mode === "mod") {
          return {
            div: null,
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return {
          div: this.divn(num.words[0]),
          mod: new BN2(this.modn(num.words[0]))
        };
      }
      return this._wordDiv(num, mode);
    };
    BN2.prototype.div = function div(num) {
      return this.divmod(num, "div", false).div;
    };
    BN2.prototype.mod = function mod(num) {
      return this.divmod(num, "mod", false).mod;
    };
    BN2.prototype.umod = function umod(num) {
      return this.divmod(num, "mod", true).mod;
    };
    BN2.prototype.divRound = function divRound(num) {
      var dm = this.divmod(num);
      if (dm.mod.isZero())
        return dm.div;
      var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
      var half = num.ushrn(1);
      var r2 = num.andln(1);
      var cmp = mod.cmp(half);
      if (cmp < 0 || r2 === 1 && cmp === 0)
        return dm.div;
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    };
    BN2.prototype.modn = function modn(num) {
      assert2(num <= 67108863);
      var p = (1 << 26) % num;
      var acc = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        acc = (p * acc + (this.words[i] | 0)) % num;
      }
      return acc;
    };
    BN2.prototype.idivn = function idivn(num) {
      assert2(num <= 67108863);
      var carry = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var w = (this.words[i] | 0) + carry * 67108864;
        this.words[i] = w / num | 0;
        carry = w % num;
      }
      return this.strip();
    };
    BN2.prototype.divn = function divn(num) {
      return this.clone().idivn(num);
    };
    BN2.prototype.egcd = function egcd(p) {
      assert2(p.negative === 0);
      assert2(!p.isZero());
      var x = this;
      var y = p.clone();
      if (x.negative !== 0) {
        x = x.umod(p);
      } else {
        x = x.clone();
      }
      var A = new BN2(1);
      var B = new BN2(0);
      var C = new BN2(0);
      var D = new BN2(1);
      var g = 0;
      while (x.isEven() && y.isEven()) {
        x.iushrn(1);
        y.iushrn(1);
        ++g;
      }
      var yp = y.clone();
      var xp = x.clone();
      while (!x.isZero()) {
        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          x.iushrn(i);
          while (i-- > 0) {
            if (A.isOdd() || B.isOdd()) {
              A.iadd(yp);
              B.isub(xp);
            }
            A.iushrn(1);
            B.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          y.iushrn(j);
          while (j-- > 0) {
            if (C.isOdd() || D.isOdd()) {
              C.iadd(yp);
              D.isub(xp);
            }
            C.iushrn(1);
            D.iushrn(1);
          }
        }
        if (x.cmp(y) >= 0) {
          x.isub(y);
          A.isub(C);
          B.isub(D);
        } else {
          y.isub(x);
          C.isub(A);
          D.isub(B);
        }
      }
      return {
        a: C,
        b: D,
        gcd: y.iushln(g)
      };
    };
    BN2.prototype._invmp = function _invmp(p) {
      assert2(p.negative === 0);
      assert2(!p.isZero());
      var a = this;
      var b = p.clone();
      if (a.negative !== 0) {
        a = a.umod(p);
      } else {
        a = a.clone();
      }
      var x1 = new BN2(1);
      var x2 = new BN2(0);
      var delta = b.clone();
      while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          a.iushrn(i);
          while (i-- > 0) {
            if (x1.isOdd()) {
              x1.iadd(delta);
            }
            x1.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          b.iushrn(j);
          while (j-- > 0) {
            if (x2.isOdd()) {
              x2.iadd(delta);
            }
            x2.iushrn(1);
          }
        }
        if (a.cmp(b) >= 0) {
          a.isub(b);
          x1.isub(x2);
        } else {
          b.isub(a);
          x2.isub(x1);
        }
      }
      var res;
      if (a.cmpn(1) === 0) {
        res = x1;
      } else {
        res = x2;
      }
      if (res.cmpn(0) < 0) {
        res.iadd(p);
      }
      return res;
    };
    BN2.prototype.gcd = function gcd(num) {
      if (this.isZero())
        return num.abs();
      if (num.isZero())
        return this.abs();
      var a = this.clone();
      var b = num.clone();
      a.negative = 0;
      b.negative = 0;
      for (var shift = 0; a.isEven() && b.isEven(); shift++) {
        a.iushrn(1);
        b.iushrn(1);
      }
      do {
        while (a.isEven()) {
          a.iushrn(1);
        }
        while (b.isEven()) {
          b.iushrn(1);
        }
        var r2 = a.cmp(b);
        if (r2 < 0) {
          var t = a;
          a = b;
          b = t;
        } else if (r2 === 0 || b.cmpn(1) === 0) {
          break;
        }
        a.isub(b);
      } while (true);
      return b.iushln(shift);
    };
    BN2.prototype.invm = function invm(num) {
      return this.egcd(num).a.umod(num);
    };
    BN2.prototype.isEven = function isEven() {
      return (this.words[0] & 1) === 0;
    };
    BN2.prototype.isOdd = function isOdd() {
      return (this.words[0] & 1) === 1;
    };
    BN2.prototype.andln = function andln(num) {
      return this.words[0] & num;
    };
    BN2.prototype.bincn = function bincn(bit) {
      assert2(typeof bit === "number");
      var r2 = bit % 26;
      var s2 = (bit - r2) / 26;
      var q = 1 << r2;
      if (this.length <= s2) {
        this._expand(s2 + 1);
        this.words[s2] |= q;
        return this;
      }
      var carry = q;
      for (var i = s2; carry !== 0 && i < this.length; i++) {
        var w = this.words[i] | 0;
        w += carry;
        carry = w >>> 26;
        w &= 67108863;
        this.words[i] = w;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.isZero = function isZero() {
      return this.length === 1 && this.words[0] === 0;
    };
    BN2.prototype.cmpn = function cmpn(num) {
      var negative = num < 0;
      if (this.negative !== 0 && !negative)
        return -1;
      if (this.negative === 0 && negative)
        return 1;
      this.strip();
      var res;
      if (this.length > 1) {
        res = 1;
      } else {
        if (negative) {
          num = -num;
        }
        assert2(num <= 67108863, "Number is too big");
        var w = this.words[0] | 0;
        res = w === num ? 0 : w < num ? -1 : 1;
      }
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.cmp = function cmp(num) {
      if (this.negative !== 0 && num.negative === 0)
        return -1;
      if (this.negative === 0 && num.negative !== 0)
        return 1;
      var res = this.ucmp(num);
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.ucmp = function ucmp(num) {
      if (this.length > num.length)
        return 1;
      if (this.length < num.length)
        return -1;
      var res = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var a = this.words[i] | 0;
        var b = num.words[i] | 0;
        if (a === b)
          continue;
        if (a < b) {
          res = -1;
        } else if (a > b) {
          res = 1;
        }
        break;
      }
      return res;
    };
    BN2.prototype.gtn = function gtn(num) {
      return this.cmpn(num) === 1;
    };
    BN2.prototype.gt = function gt(num) {
      return this.cmp(num) === 1;
    };
    BN2.prototype.gten = function gten(num) {
      return this.cmpn(num) >= 0;
    };
    BN2.prototype.gte = function gte(num) {
      return this.cmp(num) >= 0;
    };
    BN2.prototype.ltn = function ltn(num) {
      return this.cmpn(num) === -1;
    };
    BN2.prototype.lt = function lt(num) {
      return this.cmp(num) === -1;
    };
    BN2.prototype.lten = function lten(num) {
      return this.cmpn(num) <= 0;
    };
    BN2.prototype.lte = function lte(num) {
      return this.cmp(num) <= 0;
    };
    BN2.prototype.eqn = function eqn(num) {
      return this.cmpn(num) === 0;
    };
    BN2.prototype.eq = function eq4(num) {
      return this.cmp(num) === 0;
    };
    BN2.red = function red(num) {
      return new Red(num);
    };
    BN2.prototype.toRed = function toRed(ctx) {
      assert2(!this.red, "Already a number in reduction context");
      assert2(this.negative === 0, "red works only with positives");
      return ctx.convertTo(this)._forceRed(ctx);
    };
    BN2.prototype.fromRed = function fromRed() {
      assert2(this.red, "fromRed works only with numbers in reduction context");
      return this.red.convertFrom(this);
    };
    BN2.prototype._forceRed = function _forceRed(ctx) {
      this.red = ctx;
      return this;
    };
    BN2.prototype.forceRed = function forceRed(ctx) {
      assert2(!this.red, "Already a number in reduction context");
      return this._forceRed(ctx);
    };
    BN2.prototype.redAdd = function redAdd(num) {
      assert2(this.red, "redAdd works only with red numbers");
      return this.red.add(this, num);
    };
    BN2.prototype.redIAdd = function redIAdd(num) {
      assert2(this.red, "redIAdd works only with red numbers");
      return this.red.iadd(this, num);
    };
    BN2.prototype.redSub = function redSub(num) {
      assert2(this.red, "redSub works only with red numbers");
      return this.red.sub(this, num);
    };
    BN2.prototype.redISub = function redISub(num) {
      assert2(this.red, "redISub works only with red numbers");
      return this.red.isub(this, num);
    };
    BN2.prototype.redShl = function redShl(num) {
      assert2(this.red, "redShl works only with red numbers");
      return this.red.shl(this, num);
    };
    BN2.prototype.redMul = function redMul(num) {
      assert2(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.mul(this, num);
    };
    BN2.prototype.redIMul = function redIMul(num) {
      assert2(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.imul(this, num);
    };
    BN2.prototype.redSqr = function redSqr() {
      assert2(this.red, "redSqr works only with red numbers");
      this.red._verify1(this);
      return this.red.sqr(this);
    };
    BN2.prototype.redISqr = function redISqr() {
      assert2(this.red, "redISqr works only with red numbers");
      this.red._verify1(this);
      return this.red.isqr(this);
    };
    BN2.prototype.redSqrt = function redSqrt() {
      assert2(this.red, "redSqrt works only with red numbers");
      this.red._verify1(this);
      return this.red.sqrt(this);
    };
    BN2.prototype.redInvm = function redInvm() {
      assert2(this.red, "redInvm works only with red numbers");
      this.red._verify1(this);
      return this.red.invm(this);
    };
    BN2.prototype.redNeg = function redNeg() {
      assert2(this.red, "redNeg works only with red numbers");
      this.red._verify1(this);
      return this.red.neg(this);
    };
    BN2.prototype.redPow = function redPow(num) {
      assert2(this.red && !num.red, "redPow(normalNum)");
      this.red._verify1(this);
      return this.red.pow(this, num);
    };
    var primes = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function MPrime(name2, p) {
      this.name = name2;
      this.p = new BN2(p, 16);
      this.n = this.p.bitLength();
      this.k = new BN2(1).iushln(this.n).isub(this.p);
      this.tmp = this._tmp();
    }
    MPrime.prototype._tmp = function _tmp() {
      var tmp = new BN2(null);
      tmp.words = new Array(Math.ceil(this.n / 13));
      return tmp;
    };
    MPrime.prototype.ireduce = function ireduce(num) {
      var r2 = num;
      var rlen;
      do {
        this.split(r2, this.tmp);
        r2 = this.imulK(r2);
        r2 = r2.iadd(this.tmp);
        rlen = r2.bitLength();
      } while (rlen > this.n);
      var cmp = rlen < this.n ? -1 : r2.ucmp(this.p);
      if (cmp === 0) {
        r2.words[0] = 0;
        r2.length = 1;
      } else if (cmp > 0) {
        r2.isub(this.p);
      } else {
        if (r2.strip !== void 0) {
          r2.strip();
        } else {
          r2._strip();
        }
      }
      return r2;
    };
    MPrime.prototype.split = function split(input, out) {
      input.iushrn(this.n, 0, out);
    };
    MPrime.prototype.imulK = function imulK(num) {
      return num.imul(this.k);
    };
    function K256() {
      MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    inherits(K256, MPrime);
    K256.prototype.split = function split(input, output) {
      var mask = 4194303;
      var outLen = Math.min(input.length, 9);
      for (var i = 0; i < outLen; i++) {
        output.words[i] = input.words[i];
      }
      output.length = outLen;
      if (input.length <= 9) {
        input.words[0] = 0;
        input.length = 1;
        return;
      }
      var prev = input.words[9];
      output.words[output.length++] = prev & mask;
      for (i = 10; i < input.length; i++) {
        var next = input.words[i] | 0;
        input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
        prev = next;
      }
      prev >>>= 22;
      input.words[i - 10] = prev;
      if (prev === 0 && input.length > 10) {
        input.length -= 10;
      } else {
        input.length -= 9;
      }
    };
    K256.prototype.imulK = function imulK(num) {
      num.words[num.length] = 0;
      num.words[num.length + 1] = 0;
      num.length += 2;
      var lo = 0;
      for (var i = 0; i < num.length; i++) {
        var w = num.words[i] | 0;
        lo += w * 977;
        num.words[i] = lo & 67108863;
        lo = w * 64 + (lo / 67108864 | 0);
      }
      if (num.words[num.length - 1] === 0) {
        num.length--;
        if (num.words[num.length - 1] === 0) {
          num.length--;
        }
      }
      return num;
    };
    function P224() {
      MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    inherits(P224, MPrime);
    function P192() {
      MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    inherits(P192, MPrime);
    function P25519() {
      MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    inherits(P25519, MPrime);
    P25519.prototype.imulK = function imulK(num) {
      var carry = 0;
      for (var i = 0; i < num.length; i++) {
        var hi = (num.words[i] | 0) * 19 + carry;
        var lo = hi & 67108863;
        hi >>>= 26;
        num.words[i] = lo;
        carry = hi;
      }
      if (carry !== 0) {
        num.words[num.length++] = carry;
      }
      return num;
    };
    BN2._prime = function prime(name2) {
      if (primes[name2])
        return primes[name2];
      var prime2;
      if (name2 === "k256") {
        prime2 = new K256();
      } else if (name2 === "p224") {
        prime2 = new P224();
      } else if (name2 === "p192") {
        prime2 = new P192();
      } else if (name2 === "p25519") {
        prime2 = new P25519();
      } else {
        throw new Error("Unknown prime " + name2);
      }
      primes[name2] = prime2;
      return prime2;
    };
    function Red(m) {
      if (typeof m === "string") {
        var prime = BN2._prime(m);
        this.m = prime.p;
        this.prime = prime;
      } else {
        assert2(m.gtn(1), "modulus must be greater than 1");
        this.m = m;
        this.prime = null;
      }
    }
    Red.prototype._verify1 = function _verify1(a) {
      assert2(a.negative === 0, "red works only with positives");
      assert2(a.red, "red works only with red numbers");
    };
    Red.prototype._verify2 = function _verify2(a, b) {
      assert2((a.negative | b.negative) === 0, "red works only with positives");
      assert2(a.red && a.red === b.red, "red works only with red numbers");
    };
    Red.prototype.imod = function imod(a) {
      if (this.prime)
        return this.prime.ireduce(a)._forceRed(this);
      return a.umod(this.m)._forceRed(this);
    };
    Red.prototype.neg = function neg3(a) {
      if (a.isZero()) {
        return a.clone();
      }
      return this.m.sub(a)._forceRed(this);
    };
    Red.prototype.add = function add3(a, b) {
      this._verify2(a, b);
      var res = a.add(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.iadd = function iadd(a, b) {
      this._verify2(a, b);
      var res = a.iadd(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res;
    };
    Red.prototype.sub = function sub(a, b) {
      this._verify2(a, b);
      var res = a.sub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.isub = function isub(a, b) {
      this._verify2(a, b);
      var res = a.isub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res;
    };
    Red.prototype.shl = function shl(a, num) {
      this._verify1(a);
      return this.imod(a.ushln(num));
    };
    Red.prototype.imul = function imul(a, b) {
      this._verify2(a, b);
      return this.imod(a.imul(b));
    };
    Red.prototype.mul = function mul3(a, b) {
      this._verify2(a, b);
      return this.imod(a.mul(b));
    };
    Red.prototype.isqr = function isqr(a) {
      return this.imul(a, a.clone());
    };
    Red.prototype.sqr = function sqr(a) {
      return this.mul(a, a);
    };
    Red.prototype.sqrt = function sqrt(a) {
      if (a.isZero())
        return a.clone();
      var mod3 = this.m.andln(3);
      assert2(mod3 % 2 === 1);
      if (mod3 === 3) {
        var pow = this.m.add(new BN2(1)).iushrn(2);
        return this.pow(a, pow);
      }
      var q = this.m.subn(1);
      var s2 = 0;
      while (!q.isZero() && q.andln(1) === 0) {
        s2++;
        q.iushrn(1);
      }
      assert2(!q.isZero());
      var one = new BN2(1).toRed(this);
      var nOne = one.redNeg();
      var lpow = this.m.subn(1).iushrn(1);
      var z = this.m.bitLength();
      z = new BN2(2 * z * z).toRed(this);
      while (this.pow(z, lpow).cmp(nOne) !== 0) {
        z.redIAdd(nOne);
      }
      var c = this.pow(z, q);
      var r2 = this.pow(a, q.addn(1).iushrn(1));
      var t = this.pow(a, q);
      var m = s2;
      while (t.cmp(one) !== 0) {
        var tmp = t;
        for (var i = 0; tmp.cmp(one) !== 0; i++) {
          tmp = tmp.redSqr();
        }
        assert2(i < m);
        var b = this.pow(c, new BN2(1).iushln(m - i - 1));
        r2 = r2.redMul(b);
        c = b.redSqr();
        t = t.redMul(c);
        m = i;
      }
      return r2;
    };
    Red.prototype.invm = function invm(a) {
      var inv = a._invmp(this.m);
      if (inv.negative !== 0) {
        inv.negative = 0;
        return this.imod(inv).redNeg();
      } else {
        return this.imod(inv);
      }
    };
    Red.prototype.pow = function pow(a, num) {
      if (num.isZero())
        return new BN2(1).toRed(this);
      if (num.cmpn(1) === 0)
        return a.clone();
      var windowSize = 4;
      var wnd = new Array(1 << windowSize);
      wnd[0] = new BN2(1).toRed(this);
      wnd[1] = a;
      for (var i = 2; i < wnd.length; i++) {
        wnd[i] = this.mul(wnd[i - 1], a);
      }
      var res = wnd[0];
      var current = 0;
      var currentLen = 0;
      var start = num.bitLength() % 26;
      if (start === 0) {
        start = 26;
      }
      for (i = num.length - 1; i >= 0; i--) {
        var word = num.words[i];
        for (var j = start - 1; j >= 0; j--) {
          var bit = word >> j & 1;
          if (res !== wnd[0]) {
            res = this.sqr(res);
          }
          if (bit === 0 && current === 0) {
            currentLen = 0;
            continue;
          }
          current <<= 1;
          current |= bit;
          currentLen++;
          if (currentLen !== windowSize && (i !== 0 || j !== 0))
            continue;
          res = this.mul(res, wnd[current]);
          currentLen = 0;
          current = 0;
        }
        start = 26;
      }
      return res;
    };
    Red.prototype.convertTo = function convertTo(num) {
      var r2 = num.umod(this.m);
      return r2 === num ? r2.clone() : r2;
    };
    Red.prototype.convertFrom = function convertFrom(num) {
      var res = num.clone();
      res.red = null;
      return res;
    };
    BN2.mont = function mont(num) {
      return new Mont(num);
    };
    function Mont(m) {
      Red.call(this, m);
      this.shift = this.m.bitLength();
      if (this.shift % 26 !== 0) {
        this.shift += 26 - this.shift % 26;
      }
      this.r = new BN2(1).iushln(this.shift);
      this.r2 = this.imod(this.r.sqr());
      this.rinv = this.r._invmp(this.m);
      this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
      this.minv = this.minv.umod(this.r);
      this.minv = this.r.sub(this.minv);
    }
    inherits(Mont, Red);
    Mont.prototype.convertTo = function convertTo(num) {
      return this.imod(num.ushln(this.shift));
    };
    Mont.prototype.convertFrom = function convertFrom(num) {
      var r2 = this.imod(num.mul(this.rinv));
      r2.red = null;
      return r2;
    };
    Mont.prototype.imul = function imul(a, b) {
      if (a.isZero() || b.isZero()) {
        a.words[0] = 0;
        a.length = 1;
        return a;
      }
      var t = a.imul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.mul = function mul3(a, b) {
      if (a.isZero() || b.isZero())
        return new BN2(0)._forceRed(this);
      var t = a.mul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.invm = function invm(a) {
      var res = this.imod(a._invmp(this.m).mul(this.r2));
      return res._forceRed(this);
    };
  })(module, commonjsGlobal);
});
const version$i = "logger/5.1.0";
let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = {debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5};
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error2) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error2) {
    return error2.message;
  }
  return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function(LogLevel2) {
  LogLevel2["DEBUG"] = "DEBUG";
  LogLevel2["INFO"] = "INFO";
  LogLevel2["WARNING"] = "WARNING";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
  ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
  ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
  ErrorCode2["TIMEOUT"] = "TIMEOUT";
  ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
  ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
  ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
  ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
  ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
  ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
  ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
  ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
  ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
  ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
  ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
})(ErrorCode || (ErrorCode = {}));
class Logger {
  constructor(version2) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version2,
      writable: false
    });
  }
  _log(logLevel, args) {
    const level = logLevel.toLowerCase();
    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel);
    }
    if (_logLevel > LogLevels[level]) {
      return;
    }
    console.log.apply(console, args);
  }
  debug(...args) {
    this._log(Logger.levels.DEBUG, args);
  }
  info(...args) {
    this._log(Logger.levels.INFO, args);
  }
  warn(...args) {
    this._log(Logger.levels.WARNING, args);
  }
  makeError(message, code, params) {
    if (_censorErrors) {
      return this.makeError("censored error", code, {});
    }
    if (!code) {
      code = Logger.errors.UNKNOWN_ERROR;
    }
    if (!params) {
      params = {};
    }
    const messageDetails = [];
    Object.keys(params).forEach((key2) => {
      try {
        messageDetails.push(key2 + "=" + JSON.stringify(params[key2]));
      } catch (error3) {
        messageDetails.push(key2 + "=" + JSON.stringify(params[key2].toString()));
      }
    });
    messageDetails.push(`code=${code}`);
    messageDetails.push(`version=${this.version}`);
    const reason = message;
    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")";
    }
    const error2 = new Error(message);
    error2.reason = reason;
    error2.code = code;
    Object.keys(params).forEach(function(key2) {
      error2[key2] = params[key2];
    });
    return error2;
  }
  throwError(message, code, params) {
    throw this.makeError(message, code, params);
  }
  throwArgumentError(message, name2, value) {
    return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
      argument: name2,
      value
    });
  }
  assert(condition, message, code, params) {
    if (!!condition) {
      return;
    }
    this.throwError(message, code, params);
  }
  assertArgument(condition, message, name2, value) {
    if (!!condition) {
      return;
    }
    this.throwArgumentError(message, name2, value);
  }
  checkNormalize(message) {
    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      });
    }
  }
  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return;
    }
    if (message == null) {
      message = "value not safe";
    }
    if (value < 0 || value >= 9007199254740991) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value
      });
    }
    if (value % 1) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value
      });
    }
  }
  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message;
    } else {
      message = "";
    }
    if (count < expectedCount) {
      this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
        count,
        expectedCount
      });
    }
    if (count > expectedCount) {
      this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
        count,
        expectedCount
      });
    }
  }
  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, {name: kind.name});
    }
  }
  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, {name: target.name, operation: "new"});
    } else if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, {name: kind.name});
    }
  }
  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new Logger(version$i);
    }
    return _globalLogger;
  }
  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    if (_permanentCensorErrors) {
      if (!censorship) {
        return;
      }
      this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
  }
  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()];
    if (level == null) {
      Logger.globalLogger().warn("invalid log level - " + logLevel);
      return;
    }
    _logLevel = level;
  }
  static from(version2) {
    return new Logger(version2);
  }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel;
const version$h = "bytes/5.1.0";
const logger$z = new Logger(version$h);
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
function isBytesLike(value) {
  return isHexString(value) && !(value.length % 2) || isBytes(value);
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (value.length == null) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (typeof v !== "number" || v < 0 || v >= 256 || v % 1) {
      return false;
    }
  }
  return true;
}
function arrayify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger$z.checkSafeUint53(value, "invalid arrayify value");
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }
    return addSlice(new Uint8Array(result));
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    value = value.toHexString();
  }
  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0x0" + hex.substring(2);
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger$z.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return addSlice(new Uint8Array(result));
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }
  return logger$z.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}
function stripZeros(value) {
  let result = arrayify(value);
  if (result.length === 0) {
    return result;
  }
  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }
  if (start) {
    result = result.slice(start);
  }
  return result;
}
function zeroPad(value, length) {
  value = arrayify(value);
  if (value.length > length) {
    logger$z.throwArgumentError("value out of range", "value", arguments[0]);
  }
  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return addSlice(result);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
const HexCharacters = "0123456789abcdef";
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger$z.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger$z.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
    }
    return result;
  }
  return logger$z.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataLength(data) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }
  return (data.length - 2) / 2;
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger$z.throwArgumentError("invalid hexData", "value", data);
  }
  offset = 2 + 2 * offset;
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }
  return "0x" + data.substring(offset);
}
function hexConcat(items) {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}
function hexValue(value) {
  const trimmed = hexStripZeros(hexlify(value, {hexPad: "left"}));
  if (trimmed === "0x") {
    return "0x0";
  }
  return trimmed;
}
function hexStripZeros(value) {
  if (typeof value !== "string") {
    value = hexlify(value);
  }
  if (!isHexString(value)) {
    logger$z.throwArgumentError("invalid hex string", "value", value);
  }
  value = value.substring(2);
  let offset = 0;
  while (offset < value.length && value[offset] === "0") {
    offset++;
  }
  return "0x" + value.substring(offset);
}
function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger$z.throwArgumentError("invalid hex string", "value", value);
  }
  if (value.length > 2 * length + 2) {
    logger$z.throwArgumentError("value out of range", "value", arguments[1]);
  }
  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
function splitSignature(signature2) {
  const result = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0
  };
  if (isBytesLike(signature2)) {
    const bytes = arrayify(signature2);
    if (bytes.length !== 65) {
      logger$z.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature2);
    }
    result.r = hexlify(bytes.slice(0, 32));
    result.s = hexlify(bytes.slice(32, 64));
    result.v = bytes[64];
    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        logger$z.throwArgumentError("signature invalid v byte", "signature", signature2);
      }
    }
    result.recoveryParam = 1 - result.v % 2;
    if (result.recoveryParam) {
      bytes[32] |= 128;
    }
    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature2.r;
    result.s = signature2.s;
    result.v = signature2.v;
    result.recoveryParam = signature2.recoveryParam;
    result._vs = signature2._vs;
    if (result._vs != null) {
      const vs2 = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs2);
      const recoveryParam = vs2[0] >= 128 ? 1 : 0;
      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        logger$z.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature2);
      }
      vs2[0] &= 127;
      const s2 = hexlify(vs2);
      if (result.s == null) {
        result.s = s2;
      } else if (result.s !== s2) {
        logger$z.throwArgumentError("signature v mismatch _vs", "signature", signature2);
      }
    }
    if (result.recoveryParam == null) {
      if (result.v == null) {
        logger$z.throwArgumentError("signature missing v and recoveryParam", "signature", signature2);
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - result.v % 2;
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else if (result.recoveryParam !== 1 - result.v % 2) {
        logger$z.throwArgumentError("signature recoveryParam mismatch v", "signature", signature2);
      }
    }
    if (result.r == null || !isHexString(result.r)) {
      logger$z.throwArgumentError("signature missing or invalid r", "signature", signature2);
    } else {
      result.r = hexZeroPad(result.r, 32);
    }
    if (result.s == null || !isHexString(result.s)) {
      logger$z.throwArgumentError("signature missing or invalid s", "signature", signature2);
    } else {
      result.s = hexZeroPad(result.s, 32);
    }
    const vs = arrayify(result.s);
    if (vs[0] >= 128) {
      logger$z.throwArgumentError("signature s out of range", "signature", signature2);
    }
    if (result.recoveryParam) {
      vs[0] |= 128;
    }
    const _vs = hexlify(vs);
    if (result._vs) {
      if (!isHexString(result._vs)) {
        logger$z.throwArgumentError("signature invalid _vs", "signature", signature2);
      }
      result._vs = hexZeroPad(result._vs, 32);
    }
    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      logger$z.throwArgumentError("signature _vs mismatch v and s", "signature", signature2);
    }
  }
  return result;
}
const version$g = "bignumber/5.1.0";
var BN = bn.BN;
const logger$y = new Logger(version$g);
const _constructorGuard$3 = {};
const MAX_SAFE = 9007199254740991;
function isBigNumberish(value) {
  return value != null && (BigNumber.isBigNumber(value) || typeof value === "number" && value % 1 === 0 || typeof value === "string" && !!value.match(/^-?[0-9]+$/) || isHexString(value) || typeof value === "bigint" || isBytes(value));
}
let _warnedToStringRadix = false;
class BigNumber {
  constructor(constructorGuard, hex) {
    logger$y.checkNew(new.target, BigNumber);
    if (constructorGuard !== _constructorGuard$3) {
      logger$y.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new (BigNumber)"
      });
    }
    this._hex = hex;
    this._isBigNumber = true;
    Object.freeze(this);
  }
  fromTwos(value) {
    return toBigNumber(toBN(this).fromTwos(value));
  }
  toTwos(value) {
    return toBigNumber(toBN(this).toTwos(value));
  }
  abs() {
    if (this._hex[0] === "-") {
      return BigNumber.from(this._hex.substring(1));
    }
    return this;
  }
  add(other) {
    return toBigNumber(toBN(this).add(toBN(other)));
  }
  sub(other) {
    return toBigNumber(toBN(this).sub(toBN(other)));
  }
  div(other) {
    const o = BigNumber.from(other);
    if (o.isZero()) {
      throwFault$1("division by zero", "div");
    }
    return toBigNumber(toBN(this).div(toBN(other)));
  }
  mul(other) {
    return toBigNumber(toBN(this).mul(toBN(other)));
  }
  mod(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault$1("cannot modulo negative values", "mod");
    }
    return toBigNumber(toBN(this).umod(value));
  }
  pow(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault$1("cannot raise to negative values", "pow");
    }
    return toBigNumber(toBN(this).pow(value));
  }
  and(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault$1("cannot 'and' negative values", "and");
    }
    return toBigNumber(toBN(this).and(value));
  }
  or(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault$1("cannot 'or' negative values", "or");
    }
    return toBigNumber(toBN(this).or(value));
  }
  xor(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault$1("cannot 'xor' negative values", "xor");
    }
    return toBigNumber(toBN(this).xor(value));
  }
  mask(value) {
    if (this.isNegative() || value < 0) {
      throwFault$1("cannot mask negative values", "mask");
    }
    return toBigNumber(toBN(this).maskn(value));
  }
  shl(value) {
    if (this.isNegative() || value < 0) {
      throwFault$1("cannot shift negative values", "shl");
    }
    return toBigNumber(toBN(this).shln(value));
  }
  shr(value) {
    if (this.isNegative() || value < 0) {
      throwFault$1("cannot shift negative values", "shr");
    }
    return toBigNumber(toBN(this).shrn(value));
  }
  eq(other) {
    return toBN(this).eq(toBN(other));
  }
  lt(other) {
    return toBN(this).lt(toBN(other));
  }
  lte(other) {
    return toBN(this).lte(toBN(other));
  }
  gt(other) {
    return toBN(this).gt(toBN(other));
  }
  gte(other) {
    return toBN(this).gte(toBN(other));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return toBN(this).isZero();
  }
  toNumber() {
    try {
      return toBN(this).toNumber();
    } catch (error2) {
      throwFault$1("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch (e) {
    }
    return logger$y.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    if (arguments.length > 0) {
      if (arguments[0] === 10) {
        if (!_warnedToStringRadix) {
          _warnedToStringRadix = true;
          logger$y.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
        }
      } else if (arguments[0] === 16) {
        logger$y.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
      } else {
        logger$y.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
      }
    }
    return toBN(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(key2) {
    return {type: "BigNumber", hex: this.toHexString()};
  }
  static from(value) {
    if (value instanceof BigNumber) {
      return value;
    }
    if (typeof value === "string") {
      if (value.match(/^-?0x[0-9a-f]+$/i)) {
        return new BigNumber(_constructorGuard$3, toHex$2(value));
      }
      if (value.match(/^-?[0-9]+$/)) {
        return new BigNumber(_constructorGuard$3, toHex$2(new BN(value)));
      }
      return logger$y.throwArgumentError("invalid BigNumber string", "value", value);
    }
    if (typeof value === "number") {
      if (value % 1) {
        throwFault$1("underflow", "BigNumber.from", value);
      }
      if (value >= MAX_SAFE || value <= -MAX_SAFE) {
        throwFault$1("overflow", "BigNumber.from", value);
      }
      return BigNumber.from(String(value));
    }
    const anyValue = value;
    if (typeof anyValue === "bigint") {
      return BigNumber.from(anyValue.toString());
    }
    if (isBytes(anyValue)) {
      return BigNumber.from(hexlify(anyValue));
    }
    if (anyValue) {
      if (anyValue.toHexString) {
        const hex = anyValue.toHexString();
        if (typeof hex === "string") {
          return BigNumber.from(hex);
        }
      } else {
        let hex = anyValue._hex;
        if (hex == null && anyValue.type === "BigNumber") {
          hex = anyValue.hex;
        }
        if (typeof hex === "string") {
          if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
            return BigNumber.from(hex);
          }
        }
      }
    }
    return logger$y.throwArgumentError("invalid BigNumber value", "value", value);
  }
  static isBigNumber(value) {
    return !!(value && value._isBigNumber);
  }
}
function toHex$2(value) {
  if (typeof value !== "string") {
    return toHex$2(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger$y.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex$2(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex$2(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault$1(fault, operation, value) {
  const params = {fault, operation};
  if (value != null) {
    params.value = value;
  }
  return logger$y.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
const logger$x = new Logger(version$g);
const _constructorGuard$2 = {};
const Zero$2 = BigNumber.from(0);
const NegativeOne$2 = BigNumber.from(-1);
function throwFault(message, fault, operation, value) {
  const params = {fault, operation};
  if (value !== void 0) {
    params.value = value;
  }
  return logger$x.throwError(message, Logger.errors.NUMERIC_FAULT, params);
}
let zeros = "0";
while (zeros.length < 256) {
  zeros += zeros;
}
function getMultiplier(decimals) {
  if (typeof decimals !== "number") {
    try {
      decimals = BigNumber.from(decimals).toNumber();
    } catch (e) {
    }
  }
  if (typeof decimals === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return "1" + zeros.substring(0, decimals);
  }
  return logger$x.throwArgumentError("invalid decimal size", "decimals", decimals);
}
function formatFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  value = BigNumber.from(value);
  const negative = value.lt(Zero$2);
  if (negative) {
    value = value.mul(NegativeOne$2);
  }
  let fraction = value.mod(multiplier).toString();
  while (fraction.length < multiplier.length - 1) {
    fraction = "0" + fraction;
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const whole = value.div(multiplier).toString();
  value = whole + "." + fraction;
  if (negative) {
    value = "-" + value;
  }
  return value;
}
function parseFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  if (typeof value !== "string" || !value.match(/^-?[0-9.,]+$/)) {
    logger$x.throwArgumentError("invalid decimal value", "value", value);
  }
  if (multiplier.length - 1 === 0) {
    return BigNumber.from(value);
  }
  const negative = value.substring(0, 1) === "-";
  if (negative) {
    value = value.substring(1);
  }
  if (value === ".") {
    logger$x.throwArgumentError("missing value", "value", value);
  }
  const comps = value.split(".");
  if (comps.length > 2) {
    logger$x.throwArgumentError("too many decimal points", "value", value);
  }
  let whole = comps[0], fraction = comps[1];
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  if (fraction.length > multiplier.length - 1) {
    throwFault("fractional component exceeds decimals", "underflow", "parseFixed");
  }
  while (fraction.length < multiplier.length - 1) {
    fraction += "0";
  }
  const wholeValue = BigNumber.from(whole);
  const fractionValue = BigNumber.from(fraction);
  let wei = wholeValue.mul(multiplier).add(fractionValue);
  if (negative) {
    wei = wei.mul(NegativeOne$2);
  }
  return wei;
}
class FixedFormat {
  constructor(constructorGuard, signed, width, decimals) {
    if (constructorGuard !== _constructorGuard$2) {
      logger$x.throwError("cannot use FixedFormat constructor; use FixedFormat.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }
    this.signed = signed;
    this.width = width;
    this.decimals = decimals;
    this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
    this._multiplier = getMultiplier(decimals);
    Object.freeze(this);
  }
  static from(value) {
    if (value instanceof FixedFormat) {
      return value;
    }
    let signed = true;
    let width = 128;
    let decimals = 18;
    if (typeof value === "string") {
      if (value === "fixed")
        ;
      else if (value === "ufixed") {
        signed = false;
      } else if (value != null) {
        const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
        if (!match) {
          logger$x.throwArgumentError("invalid fixed format", "format", value);
        }
        signed = match[1] !== "u";
        width = parseInt(match[2]);
        decimals = parseInt(match[3]);
      }
    } else if (value) {
      const check = (key2, type, defaultValue) => {
        if (value[key2] == null) {
          return defaultValue;
        }
        if (typeof value[key2] !== type) {
          logger$x.throwArgumentError("invalid fixed format (" + key2 + " not " + type + ")", "format." + key2, value[key2]);
        }
        return value[key2];
      };
      signed = check("signed", "boolean", signed);
      width = check("width", "number", width);
      decimals = check("decimals", "number", decimals);
    }
    if (width % 8) {
      logger$x.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
    }
    if (decimals > 80) {
      logger$x.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
    }
    return new FixedFormat(_constructorGuard$2, signed, width, decimals);
  }
}
class FixedNumber {
  constructor(constructorGuard, hex, value, format2) {
    logger$x.checkNew(new.target, FixedNumber);
    if (constructorGuard !== _constructorGuard$2) {
      logger$x.throwError("cannot use FixedNumber constructor; use FixedNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }
    this.format = format2;
    this._hex = hex;
    this._value = value;
    this._isFixedNumber = true;
    Object.freeze(this);
  }
  _checkFormat(other) {
    if (this.format.name !== other.format.name) {
      logger$x.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
    }
  }
  addUnsafe(other) {
    this._checkFormat(other);
    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.add(b), this.format.decimals, this.format);
  }
  subUnsafe(other) {
    this._checkFormat(other);
    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.sub(b), this.format.decimals, this.format);
  }
  mulUnsafe(other) {
    this._checkFormat(other);
    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.mul(b).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(other) {
    this._checkFormat(other);
    const a = parseFixed(this._value, this.format.decimals);
    const b = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a.mul(this.format._multiplier).div(b), this.format.decimals, this.format);
  }
  floor() {
    let comps = this.toString().split(".");
    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);
    if (this.isNegative() && hasFraction) {
      result = result.subUnsafe(ONE);
    }
    return result;
  }
  ceiling() {
    let comps = this.toString().split(".");
    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);
    if (!this.isNegative() && hasFraction) {
      result = result.addUnsafe(ONE);
    }
    return result;
  }
  round(decimals) {
    if (decimals == null) {
      decimals = 0;
    }
    let comps = this.toString().split(".");
    if (decimals < 0 || decimals > 80 || decimals % 1) {
      logger$x.throwArgumentError("invalid decimal count", "decimals", decimals);
    }
    if (comps[1].length <= decimals) {
      return this;
    }
    const factor = FixedNumber.from("1" + zeros.substring(0, decimals));
    return this.mulUnsafe(factor).addUnsafe(BUMP).floor().divUnsafe(factor);
  }
  isZero() {
    return this._value === "0.0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(width) {
    if (width == null) {
      return this._hex;
    }
    if (width % 8) {
      logger$x.throwArgumentError("invalid byte width", "width", width);
    }
    const hex = BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();
    return hexZeroPad(hex, width / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(format2) {
    return FixedNumber.fromString(this._value, format2);
  }
  static fromValue(value, decimals, format2) {
    if (format2 == null && decimals != null && !isBigNumberish(decimals)) {
      format2 = decimals;
      decimals = null;
    }
    if (decimals == null) {
      decimals = 0;
    }
    if (format2 == null) {
      format2 = "fixed";
    }
    return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format2));
  }
  static fromString(value, format2) {
    if (format2 == null) {
      format2 = "fixed";
    }
    const fixedFormat = FixedFormat.from(format2);
    const numeric = parseFixed(value, fixedFormat.decimals);
    if (!fixedFormat.signed && numeric.lt(Zero$2)) {
      throwFault("unsigned value cannot be negative", "overflow", "value", value);
    }
    let hex = null;
    if (fixedFormat.signed) {
      hex = numeric.toTwos(fixedFormat.width).toHexString();
    } else {
      hex = numeric.toHexString();
      hex = hexZeroPad(hex, fixedFormat.width / 8);
    }
    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard$2, hex, decimal, fixedFormat);
  }
  static fromBytes(value, format2) {
    if (format2 == null) {
      format2 = "fixed";
    }
    const fixedFormat = FixedFormat.from(format2);
    if (arrayify(value).length > fixedFormat.width / 8) {
      throw new Error("overflow");
    }
    let numeric = BigNumber.from(value);
    if (fixedFormat.signed) {
      numeric = numeric.fromTwos(fixedFormat.width);
    }
    const hex = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard$2, hex, decimal, fixedFormat);
  }
  static from(value, format2) {
    if (typeof value === "string") {
      return FixedNumber.fromString(value, format2);
    }
    if (isBytes(value)) {
      return FixedNumber.fromBytes(value, format2);
    }
    try {
      return FixedNumber.fromValue(value, 0, format2);
    } catch (error2) {
      if (error2.code !== Logger.errors.INVALID_ARGUMENT) {
        throw error2;
      }
    }
    return logger$x.throwArgumentError("invalid FixedNumber value", "value", value);
  }
  static isFixedNumber(value) {
    return !!(value && value._isFixedNumber);
  }
}
const ONE = FixedNumber.from(1);
const BUMP = FixedNumber.from("0.5");
const version$f = "properties/5.1.0";
var __awaiter$c = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$w = new Logger(version$f);
function defineReadOnly(object, name2, value) {
  Object.defineProperty(object, name2, {
    enumerable: true,
    value,
    writable: false
  });
}
function getStatic(ctor, key2) {
  for (let i = 0; i < 32; i++) {
    if (ctor[key2]) {
      return ctor[key2];
    }
    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }
    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }
  return null;
}
function resolveProperties(object) {
  return __awaiter$c(this, void 0, void 0, function* () {
    const promises = Object.keys(object).map((key2) => {
      const value = object[key2];
      return Promise.resolve(value).then((v) => ({key: key2, value: v}));
    });
    const results = yield Promise.all(promises);
    return results.reduce((accum, result) => {
      accum[result.key] = result.value;
      return accum;
    }, {});
  });
}
function checkProperties(object, properties) {
  if (!object || typeof object !== "object") {
    logger$w.throwArgumentError("invalid object", "object", object);
  }
  Object.keys(object).forEach((key2) => {
    if (!properties[key2]) {
      logger$w.throwArgumentError("invalid object key - " + key2, "transaction:" + key2, object);
    }
  });
}
function shallowCopy(object) {
  const result = {};
  for (const key2 in object) {
    result[key2] = object[key2];
  }
  return result;
}
const opaque = {bigint: true, boolean: true, function: true, number: true, string: true};
function _isFrozen(object) {
  if (object === void 0 || object === null || opaque[typeof object]) {
    return true;
  }
  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      if (!_isFrozen(object[keys[i]])) {
        return false;
      }
    }
    return true;
  }
  return logger$w.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    return Object.freeze(object.map((item) => deepCopy(item)));
  }
  if (typeof object === "object") {
    const result = {};
    for (const key2 in object) {
      const value = object[key2];
      if (value === void 0) {
        continue;
      }
      defineReadOnly(result, key2, deepCopy(value));
    }
    return result;
  }
  return logger$w.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function deepCopy(object) {
  return _deepCopy(object);
}
class Description {
  constructor(info) {
    for (const key2 in info) {
      this[key2] = deepCopy(info[key2]);
    }
  }
}
const version$e = "abi/5.1.0";
const logger$v = new Logger(version$e);
const _constructorGuard$1 = {};
let ModifiersBytes = {calldata: true, memory: true, storage: true};
let ModifiersNest = {calldata: true, memory: true};
function checkModifier(type, name2) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name2]) {
      return true;
    }
  } else if (type === "address") {
    if (name2 === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name2]) {
      return true;
    }
  }
  if (ModifiersBytes[name2] || name2 === "payable") {
    logger$v.throwArgumentError("invalid modifier", "name", name2);
  }
  return false;
}
function parseParamType(param, allowIndexed) {
  let originalParam = param;
  function throwError(i) {
    logger$v.throwArgumentError(`unexpected character at position ${i}`, "param", param);
  }
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = {type: "", name: "", parent: parent2, state: {allowType: true}};
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  let parent = {type: "", name: "", state: {allowType: true}};
  let node = parent;
  for (let i = 0; i < param.length; i++) {
    let c = param[i];
    switch (c) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i);
        }
        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;
      case ")":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;
        if (!node) {
          throwError(i);
        }
        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;
      case ",":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let sibling = newNode(node.parent);
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      case " ":
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }
        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i);
              }
              if (node.indexed) {
                throwError(i);
              }
              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }
        break;
      case "[":
        if (!node.state.allowArray) {
          throwError(i);
        }
        node.type += c;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;
      case "]":
        if (!node.state.readArray) {
          throwError(i);
        }
        node.type += c;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;
      default:
        if (node.state.allowType) {
          node.type += c;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c;
        } else {
          throwError(i);
        }
    }
  }
  if (node.parent) {
    logger$v.throwArgumentError("unexpected eof", "param", param);
  }
  delete parent.state;
  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }
    if (node.indexed) {
      throwError(originalParam.length - 7);
    }
    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }
  parent.type = verifyType(parent.type);
  return parent;
}
function populate(object, params) {
  for (let key2 in params) {
    defineReadOnly(object, key2, params[key2]);
  }
}
const FormatTypes = Object.freeze({
  sighash: "sighash",
  minimal: "minimal",
  full: "full",
  json: "json"
});
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
class ParamType {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard$1) {
      logger$v.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new ParamType()"
      });
    }
    populate(this, params);
    let match = this.type.match(paramTypeArray);
    if (match) {
      populate(this, {
        arrayLength: parseInt(match[2] || "-1"),
        arrayChildren: ParamType.fromObject({
          type: match[1],
          components: this.components
        }),
        baseType: "array"
      });
    } else {
      populate(this, {
        arrayLength: null,
        arrayChildren: null,
        baseType: this.components != null ? "tuple" : this.type
      });
    }
    this._isParamType = true;
    Object.freeze(this);
  }
  format(format2) {
    if (!format2) {
      format2 = FormatTypes.sighash;
    }
    if (!FormatTypes[format2]) {
      logger$v.throwArgumentError("invalid format type", "format", format2);
    }
    if (format2 === FormatTypes.json) {
      let result2 = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: this.name || void 0
      };
      if (typeof this.indexed === "boolean") {
        result2.indexed = this.indexed;
      }
      if (this.components) {
        result2.components = this.components.map((comp) => JSON.parse(comp.format(format2)));
      }
      return JSON.stringify(result2);
    }
    let result = "";
    if (this.baseType === "array") {
      result += this.arrayChildren.format(format2);
      result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
    } else {
      if (this.baseType === "tuple") {
        if (format2 !== FormatTypes.sighash) {
          result += this.type;
        }
        result += "(" + this.components.map((comp) => comp.format(format2)).join(format2 === FormatTypes.full ? ", " : ",") + ")";
      } else {
        result += this.type;
      }
    }
    if (format2 !== FormatTypes.sighash) {
      if (this.indexed === true) {
        result += " indexed";
      }
      if (format2 === FormatTypes.full && this.name) {
        result += " " + this.name;
      }
    }
    return result;
  }
  static from(value, allowIndexed) {
    if (typeof value === "string") {
      return ParamType.fromString(value, allowIndexed);
    }
    return ParamType.fromObject(value);
  }
  static fromObject(value) {
    if (ParamType.isParamType(value)) {
      return value;
    }
    return new ParamType(_constructorGuard$1, {
      name: value.name || null,
      type: verifyType(value.type),
      indexed: value.indexed == null ? null : !!value.indexed,
      components: value.components ? value.components.map(ParamType.fromObject) : null
    });
  }
  static fromString(value, allowIndexed) {
    function ParamTypify(node) {
      return ParamType.fromObject({
        name: node.name,
        type: node.type,
        indexed: node.indexed,
        components: node.components
      });
    }
    return ParamTypify(parseParamType(value, !!allowIndexed));
  }
  static isParamType(value) {
    return !!(value != null && value._isParamType);
  }
}
function parseParams(value, allowIndex) {
  return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
class Fragment {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard$1) {
      logger$v.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new Fragment()"
      });
    }
    populate(this, params);
    this._isFragment = true;
    Object.freeze(this);
  }
  static from(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    if (typeof value === "string") {
      return Fragment.fromString(value);
    }
    return Fragment.fromObject(value);
  }
  static fromObject(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    switch (value.type) {
      case "function":
        return FunctionFragment.fromObject(value);
      case "event":
        return EventFragment.fromObject(value);
      case "constructor":
        return ConstructorFragment.fromObject(value);
      case "fallback":
      case "receive":
        return null;
    }
    return logger$v.throwArgumentError("invalid fragment object", "value", value);
  }
  static fromString(value) {
    value = value.replace(/\s/g, " ");
    value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
    value = value.trim();
    if (value.split(" ")[0] === "event") {
      return EventFragment.fromString(value.substring(5).trim());
    } else if (value.split(" ")[0] === "function") {
      return FunctionFragment.fromString(value.substring(8).trim());
    } else if (value.split("(")[0].trim() === "constructor") {
      return ConstructorFragment.fromString(value.trim());
    }
    return logger$v.throwArgumentError("unsupported fragment", "value", value);
  }
  static isFragment(value) {
    return !!(value && value._isFragment);
  }
}
class EventFragment extends Fragment {
  format(format2) {
    if (!format2) {
      format2 = FormatTypes.sighash;
    }
    if (!FormatTypes[format2]) {
      logger$v.throwArgumentError("invalid format type", "format", format2);
    }
    if (format2 === FormatTypes.json) {
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format2)))
      });
    }
    let result = "";
    if (format2 !== FormatTypes.sighash) {
      result += "event ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format2)).join(format2 === FormatTypes.full ? ", " : ",") + ") ";
    if (format2 !== FormatTypes.sighash) {
      if (this.anonymous) {
        result += "anonymous ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return EventFragment.fromString(value);
    }
    return EventFragment.fromObject(value);
  }
  static fromObject(value) {
    if (EventFragment.isEventFragment(value)) {
      return value;
    }
    if (value.type !== "event") {
      logger$v.throwArgumentError("invalid event object", "value", value);
    }
    const params = {
      name: verifyIdentifier(value.name),
      anonymous: value.anonymous,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      type: "event"
    };
    return new EventFragment(_constructorGuard$1, params);
  }
  static fromString(value) {
    let match = value.match(regexParen);
    if (!match) {
      logger$v.throwArgumentError("invalid event string", "value", value);
    }
    let anonymous = false;
    match[3].split(" ").forEach((modifier) => {
      switch (modifier.trim()) {
        case "anonymous":
          anonymous = true;
          break;
        case "":
          break;
        default:
          logger$v.warn("unknown modifier: " + modifier);
      }
    });
    return EventFragment.fromObject({
      name: match[1].trim(),
      anonymous,
      inputs: parseParams(match[2], true),
      type: "event"
    });
  }
  static isEventFragment(value) {
    return value && value._isFragment && value.type === "event";
  }
}
function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");
  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger$v.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      logger$v.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }
    params.gas = BigNumber.from(comps[1]);
    return comps[0];
  }
  return value;
}
function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach((modifier) => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;
      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;
      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;
      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;
      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}
function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };
  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability;
    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger$v.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    }
    result.payable = result.stateMutability === "payable";
    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger$v.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable;
    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger$v.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    result.constant = !!value.constant;
    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }
    if (result.payable && result.constant) {
      logger$v.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger$v.throwArgumentError("unable to determine stateMutability", "value", value);
  }
  return result;
}
class ConstructorFragment extends Fragment {
  format(format2) {
    if (!format2) {
      format2 = FormatTypes.sighash;
    }
    if (!FormatTypes[format2]) {
      logger$v.throwArgumentError("invalid format type", "format", format2);
    }
    if (format2 === FormatTypes.json) {
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format2)))
      });
    }
    if (format2 === FormatTypes.sighash) {
      logger$v.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "format(sighash)"
      });
    }
    let result = "constructor(" + this.inputs.map((input) => input.format(format2)).join(format2 === FormatTypes.full ? ", " : ",") + ") ";
    if (this.stateMutability && this.stateMutability !== "nonpayable") {
      result += this.stateMutability + " ";
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return ConstructorFragment.fromString(value);
    }
    return ConstructorFragment.fromObject(value);
  }
  static fromObject(value) {
    if (ConstructorFragment.isConstructorFragment(value)) {
      return value;
    }
    if (value.type !== "constructor") {
      logger$v.throwArgumentError("invalid constructor object", "value", value);
    }
    let state = verifyState(value);
    if (state.constant) {
      logger$v.throwArgumentError("constructor cannot be constant", "value", value);
    }
    const params = {
      name: null,
      type: value.type,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new ConstructorFragment(_constructorGuard$1, params);
  }
  static fromString(value) {
    let params = {type: "constructor"};
    value = parseGas(value, params);
    let parens = value.match(regexParen);
    if (!parens || parens[1].trim() !== "constructor") {
      logger$v.throwArgumentError("invalid constructor string", "value", value);
    }
    params.inputs = parseParams(parens[2].trim(), false);
    parseModifiers(parens[3].trim(), params);
    return ConstructorFragment.fromObject(params);
  }
  static isConstructorFragment(value) {
    return value && value._isFragment && value.type === "constructor";
  }
}
class FunctionFragment extends ConstructorFragment {
  format(format2) {
    if (!format2) {
      format2 = FormatTypes.sighash;
    }
    if (!FormatTypes[format2]) {
      logger$v.throwArgumentError("invalid format type", "format", format2);
    }
    if (format2 === FormatTypes.json) {
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format2))),
        outputs: this.outputs.map((output) => JSON.parse(output.format(format2)))
      });
    }
    let result = "";
    if (format2 !== FormatTypes.sighash) {
      result += "function ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format2)).join(format2 === FormatTypes.full ? ", " : ",") + ") ";
    if (format2 !== FormatTypes.sighash) {
      if (this.stateMutability) {
        if (this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
      } else if (this.constant) {
        result += "view ";
      }
      if (this.outputs && this.outputs.length) {
        result += "returns (" + this.outputs.map((output) => output.format(format2)).join(", ") + ") ";
      }
      if (this.gas != null) {
        result += "@" + this.gas.toString() + " ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return FunctionFragment.fromString(value);
    }
    return FunctionFragment.fromObject(value);
  }
  static fromObject(value) {
    if (FunctionFragment.isFunctionFragment(value)) {
      return value;
    }
    if (value.type !== "function") {
      logger$v.throwArgumentError("invalid function object", "value", value);
    }
    let state = verifyState(value);
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      constant: state.constant,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new FunctionFragment(_constructorGuard$1, params);
  }
  static fromString(value) {
    let params = {type: "function"};
    value = parseGas(value, params);
    let comps = value.split(" returns ");
    if (comps.length > 2) {
      logger$v.throwArgumentError("invalid function string", "value", value);
    }
    let parens = comps[0].match(regexParen);
    if (!parens) {
      logger$v.throwArgumentError("invalid function signature", "value", value);
    }
    params.name = parens[1].trim();
    if (params.name) {
      verifyIdentifier(params.name);
    }
    params.inputs = parseParams(parens[2], false);
    parseModifiers(parens[3].trim(), params);
    if (comps.length > 1) {
      let returns = comps[1].match(regexParen);
      if (returns[1].trim() != "" || returns[3].trim() != "") {
        logger$v.throwArgumentError("unexpected tokens", "value", value);
      }
      params.outputs = parseParams(returns[2], false);
    } else {
      params.outputs = [];
    }
    return FunctionFragment.fromObject(params);
  }
  static isFunctionFragment(value) {
    return value && value._isFragment && value.type === "function";
  }
}
function verifyType(type) {
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  }
  return type;
}
const regexIdentifier = new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");
function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger$v.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }
  return value;
}
const regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;
  for (let offset = 0; offset < value.length; offset++) {
    let c = value[offset];
    if (c === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c;
      if (c === "(") {
        depth++;
      } else if (c === ")") {
        depth--;
        if (depth === -1) {
          logger$v.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }
  return result;
}
const logger$u = new Logger(version$e);
function checkResultErrors(result) {
  const errors = [];
  const checkErrors = function(path, object) {
    if (!Array.isArray(object)) {
      return;
    }
    for (let key2 in object) {
      const childPath = path.slice();
      childPath.push(key2);
      try {
        checkErrors(childPath, object[key2]);
      } catch (error2) {
        errors.push({path: childPath, error: error2});
      }
    }
  };
  checkErrors([], result);
  return errors;
}
class Coder {
  constructor(name2, type, localName, dynamic) {
    this.name = name2;
    this.type = type;
    this.localName = localName;
    this.dynamic = dynamic;
  }
  _throwError(message, value) {
    logger$u.throwArgumentError(message, this.localName, value);
  }
}
class Writer {
  constructor(wordSize) {
    defineReadOnly(this, "wordSize", wordSize || 32);
    this._data = [];
    this._dataLength = 0;
    this._padding = new Uint8Array(wordSize);
  }
  get data() {
    return hexConcat(this._data);
  }
  get length() {
    return this._dataLength;
  }
  _writeData(data) {
    this._data.push(data);
    this._dataLength += data.length;
    return data.length;
  }
  appendWriter(writer) {
    return this._writeData(concat(writer._data));
  }
  writeBytes(value) {
    let bytes = arrayify(value);
    const paddingOffset = bytes.length % this.wordSize;
    if (paddingOffset) {
      bytes = concat([bytes, this._padding.slice(paddingOffset)]);
    }
    return this._writeData(bytes);
  }
  _getValue(value) {
    let bytes = arrayify(BigNumber.from(value));
    if (bytes.length > this.wordSize) {
      logger$u.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
        length: this.wordSize,
        offset: bytes.length
      });
    }
    if (bytes.length % this.wordSize) {
      bytes = concat([this._padding.slice(bytes.length % this.wordSize), bytes]);
    }
    return bytes;
  }
  writeValue(value) {
    return this._writeData(this._getValue(value));
  }
  writeUpdatableValue() {
    const offset = this._data.length;
    this._data.push(this._padding);
    this._dataLength += this.wordSize;
    return (value) => {
      this._data[offset] = this._getValue(value);
    };
  }
}
class Reader {
  constructor(data, wordSize, coerceFunc, allowLoose) {
    defineReadOnly(this, "_data", arrayify(data));
    defineReadOnly(this, "wordSize", wordSize || 32);
    defineReadOnly(this, "_coerceFunc", coerceFunc);
    defineReadOnly(this, "allowLoose", allowLoose);
    this._offset = 0;
  }
  get data() {
    return hexlify(this._data);
  }
  get consumed() {
    return this._offset;
  }
  static coerce(name2, value) {
    let match = name2.match("^u?int([0-9]+)$");
    if (match && parseInt(match[1]) <= 48) {
      value = value.toNumber();
    }
    return value;
  }
  coerce(name2, value) {
    if (this._coerceFunc) {
      return this._coerceFunc(name2, value);
    }
    return Reader.coerce(name2, value);
  }
  _peekBytes(offset, length, loose) {
    let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
    if (this._offset + alignedLength > this._data.length) {
      if (this.allowLoose && loose && this._offset + length <= this._data.length) {
        alignedLength = length;
      } else {
        logger$u.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
          length: this._data.length,
          offset: this._offset + alignedLength
        });
      }
    }
    return this._data.slice(this._offset, this._offset + alignedLength);
  }
  subReader(offset) {
    return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
  }
  readBytes(length, loose) {
    let bytes = this._peekBytes(0, length, !!loose);
    this._offset += bytes.length;
    return bytes.slice(0, length);
  }
  readValue() {
    return BigNumber.from(this.readBytes(this.wordSize));
  }
}
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.5.7
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2016
 * @license MIT
 */
var sha3 = createCommonjsModule$1(function(module) {
  (function() {
    var root = typeof window === "object" ? window : {};
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && true && module.exports;
    var HEX_CHARS = "0123456789abcdef".split("");
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array"];
    var createOutputMethod = function(bits2, padding2, outputType) {
      return function(message) {
        return new Keccak(bits2, padding2, bits2).update(message)[outputType]();
      };
    };
    var createShakeOutputMethod = function(bits2, padding2, outputType) {
      return function(message, outputBits) {
        return new Keccak(bits2, padding2, outputBits).update(message)[outputType]();
      };
    };
    var createMethod = function(bits2, padding2) {
      var method = createOutputMethod(bits2, padding2, "hex");
      method.create = function() {
        return new Keccak(bits2, padding2, bits2);
      };
      method.update = function(message) {
        return method.create().update(message);
      };
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createOutputMethod(bits2, padding2, type);
      }
      return method;
    };
    var createShakeMethod = function(bits2, padding2) {
      var method = createShakeOutputMethod(bits2, padding2, "hex");
      method.create = function(outputBits) {
        return new Keccak(bits2, padding2, outputBits);
      };
      method.update = function(message, outputBits) {
        return method.create(outputBits).update(message);
      };
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createShakeOutputMethod(bits2, padding2, type);
      }
      return method;
    };
    var algorithms = [
      {name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod},
      {name: "sha3", padding: PADDING, bits: BITS, createMethod},
      {name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod}
    ];
    var methods = {}, methodNames = [];
    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + "_" + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
      }
    }
    function Keccak(bits2, padding2, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding2;
      this.outputBits = outputBits;
      this.reset = true;
      this.block = 0;
      this.start = 0;
      this.blockCount = 1600 - (bits2 << 1) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;
      for (var i2 = 0; i2 < 50; ++i2) {
        this.s[i2] = 0;
      }
    }
    Keccak.prototype.update = function(message) {
      var notString = typeof message !== "string";
      if (notString && message.constructor === ArrayBuffer) {
        message = new Uint8Array(message);
      }
      var length = message.length, blocks = this.blocks, byteCount = this.byteCount, blockCount = this.blockCount, index2 = 0, s2 = this.s, i2, code;
      while (index2 < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        if (notString) {
          for (i2 = this.start; index2 < length && i2 < byteCount; ++index2) {
            blocks[i2 >> 2] |= message[index2] << SHIFT[i2++ & 3];
          }
        } else {
          for (i2 = this.start; index2 < length && i2 < byteCount; ++index2) {
            code = message.charCodeAt(index2);
            if (code < 128) {
              blocks[i2 >> 2] |= code << SHIFT[i2++ & 3];
            } else if (code < 2048) {
              blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            } else if (code < 55296 || code >= 57344) {
              blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            } else {
              code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index2) & 1023);
              blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
            }
          }
        }
        this.lastByteIndex = i2;
        if (i2 >= byteCount) {
          this.start = i2 - byteCount;
          this.block = blocks[blockCount];
          for (i2 = 0; i2 < blockCount; ++i2) {
            s2[i2] ^= blocks[i2];
          }
          f2(s2);
          this.reset = true;
        } else {
          this.start = i2;
        }
      }
      return this;
    };
    Keccak.prototype.finalize = function() {
      var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s2 = this.s;
      blocks[i2 >> 2] |= this.padding[i2 & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i2 = 1; i2 < blockCount + 1; ++i2) {
          blocks[i2] = 0;
        }
      }
      blocks[blockCount - 1] |= 2147483648;
      for (i2 = 0; i2 < blockCount; ++i2) {
        s2[i2] ^= blocks[i2];
      }
      f2(s2);
    };
    Keccak.prototype.toString = Keccak.prototype.hex = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var hex = "", block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          block = s2[i2];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
        }
        if (j2 % blockCount === 0) {
          f2(s2);
          i2 = 0;
        }
      }
      if (extraBytes) {
        block = s2[i2];
        if (extraBytes > 0) {
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
        }
        if (extraBytes > 1) {
          hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
        }
      }
      return hex;
    };
    Keccak.prototype.arrayBuffer = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer(outputBlocks + 1 << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          array[j2] = s2[i2];
        }
        if (j2 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        array[i2] = s2[i2];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };
    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
    Keccak.prototype.digest = Keccak.prototype.array = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var array = [], offset, block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          offset = j2 << 2;
          block = s2[i2];
          array[offset] = block & 255;
          array[offset + 1] = block >> 8 & 255;
          array[offset + 2] = block >> 16 & 255;
          array[offset + 3] = block >> 24 & 255;
        }
        if (j2 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        offset = j2 << 2;
        block = s2[i2];
        if (extraBytes > 0) {
          array[offset] = block & 255;
        }
        if (extraBytes > 1) {
          array[offset + 1] = block >> 8 & 255;
        }
        if (extraBytes > 2) {
          array[offset + 2] = block >> 16 & 255;
        }
      }
      return array;
    };
    var f2 = function(s2) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s2[0] ^ s2[10] ^ s2[20] ^ s2[30] ^ s2[40];
        c1 = s2[1] ^ s2[11] ^ s2[21] ^ s2[31] ^ s2[41];
        c2 = s2[2] ^ s2[12] ^ s2[22] ^ s2[32] ^ s2[42];
        c3 = s2[3] ^ s2[13] ^ s2[23] ^ s2[33] ^ s2[43];
        c4 = s2[4] ^ s2[14] ^ s2[24] ^ s2[34] ^ s2[44];
        c5 = s2[5] ^ s2[15] ^ s2[25] ^ s2[35] ^ s2[45];
        c6 = s2[6] ^ s2[16] ^ s2[26] ^ s2[36] ^ s2[46];
        c7 = s2[7] ^ s2[17] ^ s2[27] ^ s2[37] ^ s2[47];
        c8 = s2[8] ^ s2[18] ^ s2[28] ^ s2[38] ^ s2[48];
        c9 = s2[9] ^ s2[19] ^ s2[29] ^ s2[39] ^ s2[49];
        h = c8 ^ (c2 << 1 | c3 >>> 31);
        l = c9 ^ (c3 << 1 | c2 >>> 31);
        s2[0] ^= h;
        s2[1] ^= l;
        s2[10] ^= h;
        s2[11] ^= l;
        s2[20] ^= h;
        s2[21] ^= l;
        s2[30] ^= h;
        s2[31] ^= l;
        s2[40] ^= h;
        s2[41] ^= l;
        h = c0 ^ (c4 << 1 | c5 >>> 31);
        l = c1 ^ (c5 << 1 | c4 >>> 31);
        s2[2] ^= h;
        s2[3] ^= l;
        s2[12] ^= h;
        s2[13] ^= l;
        s2[22] ^= h;
        s2[23] ^= l;
        s2[32] ^= h;
        s2[33] ^= l;
        s2[42] ^= h;
        s2[43] ^= l;
        h = c2 ^ (c6 << 1 | c7 >>> 31);
        l = c3 ^ (c7 << 1 | c6 >>> 31);
        s2[4] ^= h;
        s2[5] ^= l;
        s2[14] ^= h;
        s2[15] ^= l;
        s2[24] ^= h;
        s2[25] ^= l;
        s2[34] ^= h;
        s2[35] ^= l;
        s2[44] ^= h;
        s2[45] ^= l;
        h = c4 ^ (c8 << 1 | c9 >>> 31);
        l = c5 ^ (c9 << 1 | c8 >>> 31);
        s2[6] ^= h;
        s2[7] ^= l;
        s2[16] ^= h;
        s2[17] ^= l;
        s2[26] ^= h;
        s2[27] ^= l;
        s2[36] ^= h;
        s2[37] ^= l;
        s2[46] ^= h;
        s2[47] ^= l;
        h = c6 ^ (c0 << 1 | c1 >>> 31);
        l = c7 ^ (c1 << 1 | c0 >>> 31);
        s2[8] ^= h;
        s2[9] ^= l;
        s2[18] ^= h;
        s2[19] ^= l;
        s2[28] ^= h;
        s2[29] ^= l;
        s2[38] ^= h;
        s2[39] ^= l;
        s2[48] ^= h;
        s2[49] ^= l;
        b0 = s2[0];
        b1 = s2[1];
        b32 = s2[11] << 4 | s2[10] >>> 28;
        b33 = s2[10] << 4 | s2[11] >>> 28;
        b14 = s2[20] << 3 | s2[21] >>> 29;
        b15 = s2[21] << 3 | s2[20] >>> 29;
        b46 = s2[31] << 9 | s2[30] >>> 23;
        b47 = s2[30] << 9 | s2[31] >>> 23;
        b28 = s2[40] << 18 | s2[41] >>> 14;
        b29 = s2[41] << 18 | s2[40] >>> 14;
        b20 = s2[2] << 1 | s2[3] >>> 31;
        b21 = s2[3] << 1 | s2[2] >>> 31;
        b2 = s2[13] << 12 | s2[12] >>> 20;
        b3 = s2[12] << 12 | s2[13] >>> 20;
        b34 = s2[22] << 10 | s2[23] >>> 22;
        b35 = s2[23] << 10 | s2[22] >>> 22;
        b16 = s2[33] << 13 | s2[32] >>> 19;
        b17 = s2[32] << 13 | s2[33] >>> 19;
        b48 = s2[42] << 2 | s2[43] >>> 30;
        b49 = s2[43] << 2 | s2[42] >>> 30;
        b40 = s2[5] << 30 | s2[4] >>> 2;
        b41 = s2[4] << 30 | s2[5] >>> 2;
        b22 = s2[14] << 6 | s2[15] >>> 26;
        b23 = s2[15] << 6 | s2[14] >>> 26;
        b4 = s2[25] << 11 | s2[24] >>> 21;
        b5 = s2[24] << 11 | s2[25] >>> 21;
        b36 = s2[34] << 15 | s2[35] >>> 17;
        b37 = s2[35] << 15 | s2[34] >>> 17;
        b18 = s2[45] << 29 | s2[44] >>> 3;
        b19 = s2[44] << 29 | s2[45] >>> 3;
        b10 = s2[6] << 28 | s2[7] >>> 4;
        b11 = s2[7] << 28 | s2[6] >>> 4;
        b42 = s2[17] << 23 | s2[16] >>> 9;
        b43 = s2[16] << 23 | s2[17] >>> 9;
        b24 = s2[26] << 25 | s2[27] >>> 7;
        b25 = s2[27] << 25 | s2[26] >>> 7;
        b6 = s2[36] << 21 | s2[37] >>> 11;
        b7 = s2[37] << 21 | s2[36] >>> 11;
        b38 = s2[47] << 24 | s2[46] >>> 8;
        b39 = s2[46] << 24 | s2[47] >>> 8;
        b30 = s2[8] << 27 | s2[9] >>> 5;
        b31 = s2[9] << 27 | s2[8] >>> 5;
        b12 = s2[18] << 20 | s2[19] >>> 12;
        b13 = s2[19] << 20 | s2[18] >>> 12;
        b44 = s2[29] << 7 | s2[28] >>> 25;
        b45 = s2[28] << 7 | s2[29] >>> 25;
        b26 = s2[38] << 8 | s2[39] >>> 24;
        b27 = s2[39] << 8 | s2[38] >>> 24;
        b8 = s2[48] << 14 | s2[49] >>> 18;
        b9 = s2[49] << 14 | s2[48] >>> 18;
        s2[0] = b0 ^ ~b2 & b4;
        s2[1] = b1 ^ ~b3 & b5;
        s2[10] = b10 ^ ~b12 & b14;
        s2[11] = b11 ^ ~b13 & b15;
        s2[20] = b20 ^ ~b22 & b24;
        s2[21] = b21 ^ ~b23 & b25;
        s2[30] = b30 ^ ~b32 & b34;
        s2[31] = b31 ^ ~b33 & b35;
        s2[40] = b40 ^ ~b42 & b44;
        s2[41] = b41 ^ ~b43 & b45;
        s2[2] = b2 ^ ~b4 & b6;
        s2[3] = b3 ^ ~b5 & b7;
        s2[12] = b12 ^ ~b14 & b16;
        s2[13] = b13 ^ ~b15 & b17;
        s2[22] = b22 ^ ~b24 & b26;
        s2[23] = b23 ^ ~b25 & b27;
        s2[32] = b32 ^ ~b34 & b36;
        s2[33] = b33 ^ ~b35 & b37;
        s2[42] = b42 ^ ~b44 & b46;
        s2[43] = b43 ^ ~b45 & b47;
        s2[4] = b4 ^ ~b6 & b8;
        s2[5] = b5 ^ ~b7 & b9;
        s2[14] = b14 ^ ~b16 & b18;
        s2[15] = b15 ^ ~b17 & b19;
        s2[24] = b24 ^ ~b26 & b28;
        s2[25] = b25 ^ ~b27 & b29;
        s2[34] = b34 ^ ~b36 & b38;
        s2[35] = b35 ^ ~b37 & b39;
        s2[44] = b44 ^ ~b46 & b48;
        s2[45] = b45 ^ ~b47 & b49;
        s2[6] = b6 ^ ~b8 & b0;
        s2[7] = b7 ^ ~b9 & b1;
        s2[16] = b16 ^ ~b18 & b10;
        s2[17] = b17 ^ ~b19 & b11;
        s2[26] = b26 ^ ~b28 & b20;
        s2[27] = b27 ^ ~b29 & b21;
        s2[36] = b36 ^ ~b38 & b30;
        s2[37] = b37 ^ ~b39 & b31;
        s2[46] = b46 ^ ~b48 & b40;
        s2[47] = b47 ^ ~b49 & b41;
        s2[8] = b8 ^ ~b0 & b2;
        s2[9] = b9 ^ ~b1 & b3;
        s2[18] = b18 ^ ~b10 & b12;
        s2[19] = b19 ^ ~b11 & b13;
        s2[28] = b28 ^ ~b20 & b22;
        s2[29] = b29 ^ ~b21 & b23;
        s2[38] = b38 ^ ~b30 & b32;
        s2[39] = b39 ^ ~b31 & b33;
        s2[48] = b48 ^ ~b40 & b42;
        s2[49] = b49 ^ ~b41 & b43;
        s2[0] ^= RC[n];
        s2[1] ^= RC[n + 1];
      }
    };
    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (var i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
});
function keccak256(data) {
  return "0x" + sha3.keccak_256(arrayify(data));
}
const version$d = "rlp/5.1.0";
const logger$t = new Logger(version$d);
function arrayifyInteger(value) {
  const result = [];
  while (value) {
    result.unshift(value & 255);
    value >>= 8;
  }
  return result;
}
function unarrayifyInteger(data, offset, length) {
  let result = 0;
  for (let i = 0; i < length; i++) {
    result = result * 256 + data[offset + i];
  }
  return result;
}
function _encode(object) {
  if (Array.isArray(object)) {
    let payload = [];
    object.forEach(function(child) {
      payload = payload.concat(_encode(child));
    });
    if (payload.length <= 55) {
      payload.unshift(192 + payload.length);
      return payload;
    }
    const length2 = arrayifyInteger(payload.length);
    length2.unshift(247 + length2.length);
    return length2.concat(payload);
  }
  if (!isBytesLike(object)) {
    logger$t.throwArgumentError("RLP object must be BytesLike", "object", object);
  }
  const data = Array.prototype.slice.call(arrayify(object));
  if (data.length === 1 && data[0] <= 127) {
    return data;
  } else if (data.length <= 55) {
    data.unshift(128 + data.length);
    return data;
  }
  const length = arrayifyInteger(data.length);
  length.unshift(183 + length.length);
  return length.concat(data);
}
function encode$2(object) {
  return hexlify(_encode(object));
}
function _decodeChildren(data, offset, childOffset, length) {
  const result = [];
  while (childOffset < offset + 1 + length) {
    const decoded = _decode(data, childOffset);
    result.push(decoded.result);
    childOffset += decoded.consumed;
    if (childOffset > offset + 1 + length) {
      logger$t.throwError("child data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
  }
  return {consumed: 1 + length, result};
}
function _decode(data, offset) {
  if (data.length === 0) {
    logger$t.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
  }
  if (data[offset] >= 248) {
    const lengthLength = data[offset] - 247;
    if (offset + 1 + lengthLength > data.length) {
      logger$t.throwError("data short segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger$t.throwError("data long segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
  } else if (data[offset] >= 192) {
    const length = data[offset] - 192;
    if (offset + 1 + length > data.length) {
      logger$t.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1, length);
  } else if (data[offset] >= 184) {
    const lengthLength = data[offset] - 183;
    if (offset + 1 + lengthLength > data.length) {
      logger$t.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger$t.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
    return {consumed: 1 + lengthLength + length, result};
  } else if (data[offset] >= 128) {
    const length = data[offset] - 128;
    if (offset + 1 + length > data.length) {
      logger$t.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1, offset + 1 + length));
    return {consumed: 1 + length, result};
  }
  return {consumed: 1, result: hexlify(data[offset])};
}
function decode$1(data) {
  const bytes = arrayify(data);
  const decoded = _decode(bytes, 0);
  if (decoded.consumed !== bytes.length) {
    logger$t.throwArgumentError("invalid rlp data", "data", data);
  }
  return decoded.result;
}
const version$c = "address/5.1.0";
const logger$s = new Logger(version$c);
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger$s.throwArgumentError("invalid address", "address", address);
  }
  address = address.toLowerCase();
  const chars2 = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars2[i].charCodeAt(0);
  }
  const hashed = arrayify(keccak256(expanded));
  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars2[i] = chars2[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars2[i + 1] = chars2[i + 1].toUpperCase();
    }
  }
  return "0x" + chars2.join("");
}
const MAX_SAFE_INTEGER = 9007199254740991;
function log10(x) {
  if (Math.log10) {
    return Math.log10(x);
  }
  return Math.log(x) / Math.LN10;
}
const ibanLookup = {};
for (let i = 0; i < 10; i++) {
  ibanLookup[String(i)] = String(i);
}
for (let i = 0; i < 26; i++) {
  ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c) => {
    return ibanLookup[c];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
function getAddress(address) {
  let result = null;
  if (typeof address !== "string") {
    logger$s.throwArgumentError("invalid address", "address", address);
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }
    result = getChecksumAddress(address);
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger$s.throwArgumentError("bad address checksum", "address", address);
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger$s.throwArgumentError("bad icap checksum", "address", address);
    }
    result = _base36To16(address.substring(4));
    while (result.length < 40) {
      result = "0" + result;
    }
    result = getChecksumAddress("0x" + result);
  } else {
    logger$s.throwArgumentError("invalid address", "address", address);
  }
  return result;
}
function getContractAddress(transaction) {
  let from = null;
  try {
    from = getAddress(transaction.from);
  } catch (error2) {
    logger$s.throwArgumentError("missing from address", "transaction", transaction);
  }
  const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));
  return getAddress(hexDataSlice(keccak256(encode$2([from, nonce])), 12));
}
class AddressCoder extends Coder {
  constructor(localName) {
    super("address", "address", localName, false);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(writer, value) {
    try {
      getAddress(value);
    } catch (error2) {
      this._throwError(error2.message, value);
    }
    return writer.writeValue(value);
  }
  decode(reader) {
    return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
  }
}
class AnonymousCoder extends Coder {
  constructor(coder) {
    super(coder.name, coder.type, void 0, coder.dynamic);
    this.coder = coder;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(writer, value) {
    return this.coder.encode(writer, value);
  }
  decode(reader) {
    return this.coder.decode(reader);
  }
}
const logger$r = new Logger(version$e);
function pack(writer, coders, values) {
  let arrayValues = null;
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name2 = coder.localName;
      if (!name2) {
        logger$r.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      if (unique[name2]) {
        logger$r.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      unique[name2] = true;
      return values[name2];
    });
  } else {
    logger$r.throwArgumentError("invalid tuple value", "tuple", values);
  }
  if (coders.length !== arrayValues.length) {
    logger$r.throwArgumentError("types/value length mismatch", "tuple", values);
  }
  let staticWriter = new Writer(writer.wordSize);
  let dynamicWriter = new Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index2) => {
    let value = arrayValues[index2];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());
      try {
        value = coder.decode(offsetReader);
      } catch (error2) {
        if (error2.code === Logger.errors.BUFFER_OVERRUN) {
          throw error2;
        }
        value = error2;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error2) {
        if (error2.code === Logger.errors.BUFFER_OVERRUN) {
          throw error2;
        }
        value = error2;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value != void 0) {
      values.push(value);
    }
  });
  const uniqueNames = coders.reduce((accum, coder) => {
    const name2 = coder.localName;
    if (name2) {
      if (!accum[name2]) {
        accum[name2] = 0;
      }
      accum[name2]++;
    }
    return accum;
  }, {});
  coders.forEach((coder, index2) => {
    let name2 = coder.localName;
    if (!name2 || uniqueNames[name2] !== 1) {
      return;
    }
    if (name2 === "length") {
      name2 = "_length";
    }
    if (values[name2] != null) {
      return;
    }
    const value = values[index2];
    if (value instanceof Error) {
      Object.defineProperty(values, name2, {
        get: () => {
          throw value;
        }
      });
    } else {
      values[name2] = value;
    }
  });
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value instanceof Error) {
      Object.defineProperty(values, i, {
        get: () => {
          throw value;
        }
      });
    }
  }
  return Object.freeze(values);
}
class ArrayCoder extends Coder {
  constructor(coder, length, localName) {
    const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
    const dynamic = length === -1 || coder.dynamic;
    super("array", type, localName, dynamic);
    this.coder = coder;
    this.length = length;
  }
  defaultValue() {
    const defaultChild = this.coder.defaultValue();
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(defaultChild);
    }
    return result;
  }
  encode(writer, value) {
    if (!Array.isArray(value)) {
      this._throwError("expected array value", value);
    }
    let count = this.length;
    if (count === -1) {
      count = value.length;
      writer.writeValue(value.length);
    }
    logger$r.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
    let coders = [];
    for (let i = 0; i < value.length; i++) {
      coders.push(this.coder);
    }
    return pack(writer, coders, value);
  }
  decode(reader) {
    let count = this.length;
    if (count === -1) {
      count = reader.readValue().toNumber();
    }
    let coders = [];
    for (let i = 0; i < count; i++) {
      coders.push(new AnonymousCoder(this.coder));
    }
    return reader.coerce(this.name, unpack(reader, coders));
  }
}
class BooleanCoder extends Coder {
  constructor(localName) {
    super("bool", "bool", localName, false);
  }
  defaultValue() {
    return false;
  }
  encode(writer, value) {
    return writer.writeValue(value ? 1 : 0);
  }
  decode(reader) {
    return reader.coerce(this.type, !reader.readValue().isZero());
  }
}
class DynamicBytesCoder extends Coder {
  constructor(type, localName) {
    super(type, type, localName, true);
  }
  defaultValue() {
    return "0x";
  }
  encode(writer, value) {
    value = arrayify(value);
    let length = writer.writeValue(value.length);
    length += writer.writeBytes(value);
    return length;
  }
  decode(reader) {
    return reader.readBytes(reader.readValue().toNumber(), true);
  }
}
class BytesCoder extends DynamicBytesCoder {
  constructor(localName) {
    super("bytes", localName);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(super.decode(reader)));
  }
}
class FixedBytesCoder extends Coder {
  constructor(size, localName) {
    let name2 = "bytes" + String(size);
    super(name2, name2, localName, false);
    this.size = size;
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(writer, value) {
    let data = arrayify(value);
    if (data.length !== this.size) {
      this._throwError("incorrect data length", value);
    }
    return writer.writeBytes(data);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
  }
}
class NullCoder extends Coder {
  constructor(localName) {
    super("null", "", localName, false);
  }
  defaultValue() {
    return null;
  }
  encode(writer, value) {
    if (value != null) {
      this._throwError("not null", value);
    }
    return writer.writeBytes([]);
  }
  decode(reader) {
    reader.readBytes(0);
    return reader.coerce(this.name, null);
  }
}
const AddressZero = "0x0000000000000000000000000000000000000000";
const NegativeOne$1 = /* @__PURE__ */ BigNumber.from(-1);
const Zero$1 = /* @__PURE__ */ BigNumber.from(0);
const One$1 = /* @__PURE__ */ BigNumber.from(1);
const MaxUint256$1 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";
class NumberCoder extends Coder {
  constructor(size, signed, localName) {
    const name2 = (signed ? "int" : "uint") + size * 8;
    super(name2, name2, localName, false);
    this.size = size;
    this.signed = signed;
  }
  defaultValue() {
    return 0;
  }
  encode(writer, value) {
    let v = BigNumber.from(value);
    let maxUintValue = MaxUint256$1.mask(writer.wordSize * 8);
    if (this.signed) {
      let bounds = maxUintValue.mask(this.size * 8 - 1);
      if (v.gt(bounds) || v.lt(bounds.add(One$1).mul(NegativeOne$1))) {
        this._throwError("value out-of-bounds", value);
      }
    } else if (v.lt(Zero$1) || v.gt(maxUintValue.mask(this.size * 8))) {
      this._throwError("value out-of-bounds", value);
    }
    v = v.toTwos(this.size * 8).mask(this.size * 8);
    if (this.signed) {
      v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
    }
    return writer.writeValue(v);
  }
  decode(reader) {
    let value = reader.readValue().mask(this.size * 8);
    if (this.signed) {
      value = value.fromTwos(this.size * 8);
    }
    return reader.coerce(this.name, value);
  }
}
const version$b = "strings/5.1.0";
const logger$q = new Logger(version$b);
var UnicodeNormalizationForm;
(function(UnicodeNormalizationForm2) {
  UnicodeNormalizationForm2["current"] = "";
  UnicodeNormalizationForm2["NFC"] = "NFC";
  UnicodeNormalizationForm2["NFD"] = "NFD";
  UnicodeNormalizationForm2["NFKC"] = "NFKC";
  UnicodeNormalizationForm2["NFKD"] = "NFKD";
})(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
var Utf8ErrorReason;
(function(Utf8ErrorReason2) {
  Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
  Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
  Utf8ErrorReason2["OVERRUN"] = "string overrun";
  Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
  Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
  Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
  Utf8ErrorReason2["OVERLONG"] = "overlong representation";
})(Utf8ErrorReason || (Utf8ErrorReason = {}));
function errorFunc(reason, offset, bytes, output, badCodepoint) {
  return logger$q.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i = 0;
    for (let o = offset + 1; o < bytes.length; o++) {
      if (bytes[o] >> 6 !== 2) {
        break;
      }
      i++;
    }
    return i;
  }
  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.OVERLONG) {
    output.push(badCodepoint);
    return 0;
  }
  output.push(65533);
  return ignoreFunc(reason, offset, bytes);
}
const Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
});
function getUtf8CodePoints(bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  bytes = arrayify(bytes);
  const result = [];
  let i = 0;
  while (i < bytes.length) {
    const c = bytes[i++];
    if (c >> 7 === 0) {
      result.push(c);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c & 192) === 128) {
        i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
      } else {
        i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
      }
      continue;
    }
    if (i - 1 + extraLength >= bytes.length) {
      i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
      continue;
    }
    let res = c & (1 << 8 - extraLength - 1) - 1;
    for (let j = 0; j < extraLength; j++) {
      let nextChar = bytes[i];
      if ((nextChar & 192) != 128) {
        i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
        res = null;
        break;
      }
      res = res << 6 | nextChar & 63;
      i++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger$q.checkNormalize();
    str = str.normalize(form);
  }
  let result = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      result.push(c);
    } else if (c < 2048) {
      result.push(c >> 6 | 192);
      result.push(c & 63 | 128);
    } else if ((c & 64512) == 55296) {
      i++;
      const c2 = str.charCodeAt(i);
      if (i >= str.length || (c2 & 64512) !== 56320) {
        throw new Error("invalid utf-8 string");
      }
      const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c >> 12 | 224);
      result.push(c >> 6 & 63 | 128);
      result.push(c & 63 | 128);
    }
  }
  return arrayify(result);
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes, onError));
}
function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
  return getUtf8CodePoints(toUtf8Bytes(str, form));
}
function bytes2(data) {
  if (data.length % 4 !== 0) {
    throw new Error("bad data");
  }
  let result = [];
  for (let i = 0; i < data.length; i += 4) {
    result.push(parseInt(data.substring(i, i + 4), 16));
  }
  return result;
}
function createTable(data, func) {
  if (!func) {
    func = function(value) {
      return [parseInt(value, 16)];
    };
  }
  let lo = 0;
  let result = {};
  data.split(",").forEach((pair) => {
    let comps = pair.split(":");
    lo += parseInt(comps[0], 16);
    result[lo] = func(comps[1]);
  });
  return result;
}
function createRangeTable(data) {
  let hi = 0;
  return data.split(",").map((v) => {
    let comps = v.split("-");
    if (comps.length === 1) {
      comps[1] = "0";
    } else if (comps[1] === "") {
      comps[1] = "1";
    }
    let lo = hi + parseInt(comps[0], 16);
    hi = parseInt(comps[1], 16);
    return {l: lo, h: hi};
  });
}
function matchMap(value, ranges) {
  let lo = 0;
  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i];
    lo += range.l;
    if (value >= lo && value <= lo + range.h && (value - lo) % (range.d || 1) === 0) {
      if (range.e && range.e.indexOf(value - lo) !== -1) {
        continue;
      }
      return range;
    }
  }
  return null;
}
const Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d");
const Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((v) => parseInt(v, 16));
const Table_B_2_ranges = [
  {h: 25, s: 32, l: 65},
  {h: 30, s: 32, e: [23], l: 127},
  {h: 54, s: 1, e: [48], l: 64, d: 2},
  {h: 14, s: 1, l: 57, d: 2},
  {h: 44, s: 1, l: 17, d: 2},
  {h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2},
  {h: 16, s: 1, l: 68, d: 2},
  {h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2},
  {h: 26, s: 32, e: [17], l: 435},
  {h: 22, s: 1, l: 71, d: 2},
  {h: 15, s: 80, l: 40},
  {h: 31, s: 32, l: 16},
  {h: 32, s: 1, l: 80, d: 2},
  {h: 52, s: 1, l: 42, d: 2},
  {h: 12, s: 1, l: 55, d: 2},
  {h: 40, s: 1, e: [38], l: 15, d: 2},
  {h: 14, s: 1, l: 48, d: 2},
  {h: 37, s: 48, l: 49},
  {h: 148, s: 1, l: 6351, d: 2},
  {h: 88, s: 1, l: 160, d: 2},
  {h: 15, s: 16, l: 704},
  {h: 25, s: 26, l: 854},
  {h: 25, s: 32, l: 55915},
  {h: 37, s: 40, l: 1247},
  {h: 25, s: -119711, l: 53248},
  {h: 25, s: -119763, l: 52},
  {h: 25, s: -119815, l: 52},
  {h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52},
  {h: 25, s: -119919, l: 52},
  {h: 24, s: -119971, e: [2, 7, 8, 17], l: 52},
  {h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52},
  {h: 25, s: -120075, l: 52},
  {h: 25, s: -120127, l: 52},
  {h: 25, s: -120179, l: 52},
  {h: 25, s: -120231, l: 52},
  {h: 25, s: -120283, l: 52},
  {h: 25, s: -120335, l: 52},
  {h: 24, s: -119543, e: [17], l: 56},
  {h: 24, s: -119601, e: [17], l: 58},
  {h: 24, s: -119659, e: [17], l: 58},
  {h: 24, s: -119717, e: [17], l: 58},
  {h: 24, s: -119775, e: [17], l: 58}
];
const Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
const Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
const Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
const Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function flatten(values) {
  return values.reduce((accum, value) => {
    value.forEach((value2) => {
      accum.push(value2);
    });
    return accum;
  }, []);
}
function _nameprepTableA1(codepoint) {
  return !!matchMap(codepoint, Table_A_1_ranges);
}
function _nameprepTableB2(codepoint) {
  let range = matchMap(codepoint, Table_B_2_ranges);
  if (range) {
    return [codepoint + range.s];
  }
  let codes = Table_B_2_lut_abs[codepoint];
  if (codes) {
    return codes;
  }
  let shift = Table_B_2_lut_rel[codepoint];
  if (shift) {
    return [codepoint + shift[0]];
  }
  let complex = Table_B_2_complex[codepoint];
  if (complex) {
    return complex;
  }
  return null;
}
function _nameprepTableC(codepoint) {
  return !!matchMap(codepoint, Table_C_ranges);
}
function nameprep(value) {
  if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
    return value.toLowerCase();
  }
  let codes = toUtf8CodePoints(value);
  codes = flatten(codes.map((code) => {
    if (Table_B_1_flags.indexOf(code) >= 0) {
      return [];
    }
    if (code >= 65024 && code <= 65039) {
      return [];
    }
    let codesTableB2 = _nameprepTableB2(code);
    if (codesTableB2) {
      return codesTableB2;
    }
    return [code];
  }));
  codes = toUtf8CodePoints(_toUtf8String(codes), UnicodeNormalizationForm.NFKC);
  codes.forEach((code) => {
    if (_nameprepTableC(code)) {
      throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
    }
  });
  codes.forEach((code) => {
    if (_nameprepTableA1(code)) {
      throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
    }
  });
  let name2 = _toUtf8String(codes);
  if (name2.substring(0, 1) === "-" || name2.substring(2, 4) === "--" || name2.substring(name2.length - 1) === "-") {
    throw new Error("invalid hyphen");
  }
  if (name2.length > 63) {
    throw new Error("too long");
  }
  return name2;
}
class StringCoder extends DynamicBytesCoder {
  constructor(localName) {
    super("string", localName);
  }
  defaultValue() {
    return "";
  }
  encode(writer, value) {
    return super.encode(writer, toUtf8Bytes(value));
  }
  decode(reader) {
    return toUtf8String(super.decode(reader));
  }
}
class TupleCoder extends Coder {
  constructor(coders, localName) {
    let dynamic = false;
    const types = [];
    coders.forEach((coder) => {
      if (coder.dynamic) {
        dynamic = true;
      }
      types.push(coder.type);
    });
    const type = "tuple(" + types.join(",") + ")";
    super("tuple", type, localName, dynamic);
    this.coders = coders;
  }
  defaultValue() {
    const values = [];
    this.coders.forEach((coder) => {
      values.push(coder.defaultValue());
    });
    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name2 = coder.localName;
      if (name2) {
        if (!accum[name2]) {
          accum[name2] = 0;
        }
        accum[name2]++;
      }
      return accum;
    }, {});
    this.coders.forEach((coder, index2) => {
      let name2 = coder.localName;
      if (!name2 || uniqueNames[name2] !== 1) {
        return;
      }
      if (name2 === "length") {
        name2 = "_length";
      }
      if (values[name2] != null) {
        return;
      }
      values[name2] = values[index2];
    });
    return Object.freeze(values);
  }
  encode(writer, value) {
    return pack(writer, this.coders, value);
  }
  decode(reader) {
    return reader.coerce(this.name, unpack(reader, this.coders));
  }
}
const logger$p = new Logger(version$e);
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
class AbiCoder {
  constructor(coerceFunc) {
    logger$p.checkNew(new.target, AbiCoder);
    defineReadOnly(this, "coerceFunc", coerceFunc || null);
  }
  _getCoder(param) {
    switch (param.baseType) {
      case "address":
        return new AddressCoder(param.name);
      case "bool":
        return new BooleanCoder(param.name);
      case "string":
        return new StringCoder(param.name);
      case "bytes":
        return new BytesCoder(param.name);
      case "array":
        return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
      case "tuple":
        return new TupleCoder((param.components || []).map((component) => {
          return this._getCoder(component);
        }), param.name);
      case "":
        return new NullCoder(param.name);
    }
    let match = param.type.match(paramTypeNumber);
    if (match) {
      let size = parseInt(match[2] || "256");
      if (size === 0 || size > 256 || size % 8 !== 0) {
        logger$p.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
      }
      return new NumberCoder(size / 8, match[1] === "int", param.name);
    }
    match = param.type.match(paramTypeBytes);
    if (match) {
      let size = parseInt(match[1]);
      if (size === 0 || size > 32) {
        logger$p.throwArgumentError("invalid bytes length", "param", param);
      }
      return new FixedBytesCoder(size, param.name);
    }
    return logger$p.throwArgumentError("invalid type", "type", param.type);
  }
  _getWordSize() {
    return 32;
  }
  _getReader(data, allowLoose) {
    return new Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
  }
  _getWriter() {
    return new Writer(this._getWordSize());
  }
  getDefaultValue(types) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.defaultValue();
  }
  encode(types, values) {
    if (types.length !== values.length) {
      logger$p.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
        count: {types: types.length, values: values.length},
        value: {types, values}
      });
    }
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    const writer = this._getWriter();
    coder.encode(writer, values);
    return writer.data;
  }
  decode(types, data, loose) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.decode(this._getReader(arrayify(data), loose));
  }
}
const defaultAbiCoder = new AbiCoder();
function id(text) {
  return keccak256(toUtf8Bytes(text));
}
const version$a = "hash/5.1.0";
const logger$o = new Logger(version$a);
const Zeros = new Uint8Array(32);
Zeros.fill(0);
const Partition = new RegExp("^((.*)\\.)?([^.]+)$");
function namehash(name2) {
  if (typeof name2 !== "string") {
    logger$o.throwArgumentError("invalid address - " + String(name2), "name", name2);
  }
  let result = Zeros;
  while (name2.length) {
    const partition = name2.match(Partition);
    const label = toUtf8Bytes(nameprep(partition[3]));
    result = keccak256(concat([result, keccak256(label)]));
    name2 = partition[2] || "";
  }
  return hexlify(result);
}
var __awaiter$b = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$n = new Logger(version$a);
const padding = new Uint8Array(32);
padding.fill(0);
const NegativeOne = BigNumber.from(-1);
const Zero = BigNumber.from(0);
const One = BigNumber.from(1);
const MaxUint256 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function hexPadRight(value) {
  const bytes = arrayify(value);
  const padOffset = bytes.length % 32;
  if (padOffset) {
    return hexConcat([bytes, padding.slice(padOffset)]);
  }
  return hexlify(bytes);
}
const hexTrue = hexZeroPad(One.toHexString(), 32);
const hexFalse = hexZeroPad(Zero.toHexString(), 32);
const domainFieldTypes = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
};
const domainFieldNames = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function checkString(key2) {
  return function(value) {
    if (typeof value !== "string") {
      logger$n.throwArgumentError(`invalid domain value for ${JSON.stringify(key2)}`, `domain.${key2}`, value);
    }
    return value;
  };
}
const domainChecks = {
  name: checkString("name"),
  version: checkString("version"),
  chainId: function(value) {
    try {
      return BigNumber.from(value).toString();
    } catch (error2) {
    }
    return logger$n.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
  },
  verifyingContract: function(value) {
    try {
      return getAddress(value).toLowerCase();
    } catch (error2) {
    }
    return logger$n.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
  },
  salt: function(value) {
    try {
      const bytes = arrayify(value);
      if (bytes.length !== 32) {
        throw new Error("bad length");
      }
      return hexlify(bytes);
    } catch (error2) {
    }
    return logger$n.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
  }
};
function getBaseEncoder(type) {
  {
    const match = type.match(/^(u?)int(\d*)$/);
    if (match) {
      const signed = match[1] === "";
      const width = parseInt(match[2] || "256");
      if (width % 8 !== 0 || width > 256 || match[2] && match[2] !== String(width)) {
        logger$n.throwArgumentError("invalid numeric width", "type", type);
      }
      const boundsUpper = MaxUint256.mask(signed ? width - 1 : width);
      const boundsLower = signed ? boundsUpper.add(One).mul(NegativeOne) : Zero;
      return function(value) {
        const v = BigNumber.from(value);
        if (v.lt(boundsLower) || v.gt(boundsUpper)) {
          logger$n.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
        }
        return hexZeroPad(v.toTwos(256).toHexString(), 32);
      };
    }
  }
  {
    const match = type.match(/^bytes(\d+)$/);
    if (match) {
      const width = parseInt(match[1]);
      if (width === 0 || width > 32 || match[1] !== String(width)) {
        logger$n.throwArgumentError("invalid bytes width", "type", type);
      }
      return function(value) {
        const bytes = arrayify(value);
        if (bytes.length !== width) {
          logger$n.throwArgumentError(`invalid length for ${type}`, "value", value);
        }
        return hexPadRight(value);
      };
    }
  }
  switch (type) {
    case "address":
      return function(value) {
        return hexZeroPad(getAddress(value), 32);
      };
    case "bool":
      return function(value) {
        return !value ? hexFalse : hexTrue;
      };
    case "bytes":
      return function(value) {
        return keccak256(value);
      };
    case "string":
      return function(value) {
        return id(value);
      };
  }
  return null;
}
function encodeType(name2, fields) {
  return `${name2}(${fields.map(({name: name3, type}) => type + " " + name3).join(",")})`;
}
class TypedDataEncoder {
  constructor(types) {
    defineReadOnly(this, "types", Object.freeze(deepCopy(types)));
    defineReadOnly(this, "_encoderCache", {});
    defineReadOnly(this, "_types", {});
    const links = {};
    const parents = {};
    const subtypes = {};
    Object.keys(types).forEach((type) => {
      links[type] = {};
      parents[type] = [];
      subtypes[type] = {};
    });
    for (const name2 in types) {
      const uniqueNames = {};
      types[name2].forEach((field) => {
        if (uniqueNames[field.name]) {
          logger$n.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name2)}`, "types", types);
        }
        uniqueNames[field.name] = true;
        const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
        if (baseType === name2) {
          logger$n.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
        }
        const encoder = getBaseEncoder(baseType);
        if (encoder) {
          return;
        }
        if (!parents[baseType]) {
          logger$n.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
        }
        parents[baseType].push(name2);
        links[name2][baseType] = true;
      });
    }
    const primaryTypes = Object.keys(parents).filter((n) => parents[n].length === 0);
    if (primaryTypes.length === 0) {
      logger$n.throwArgumentError("missing primary type", "types", types);
    } else if (primaryTypes.length > 1) {
      logger$n.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map((t) => JSON.stringify(t)).join(", ")}`, "types", types);
    }
    defineReadOnly(this, "primaryType", primaryTypes[0]);
    function checkCircular(type, found) {
      if (found[type]) {
        logger$n.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
      }
      found[type] = true;
      Object.keys(links[type]).forEach((child) => {
        if (!parents[child]) {
          return;
        }
        checkCircular(child, found);
        Object.keys(found).forEach((subtype) => {
          subtypes[subtype][child] = true;
        });
      });
      delete found[type];
    }
    checkCircular(this.primaryType, {});
    for (const name2 in subtypes) {
      const st = Object.keys(subtypes[name2]);
      st.sort();
      this._types[name2] = encodeType(name2, types[name2]) + st.map((t) => encodeType(t, types[t])).join("");
    }
  }
  getEncoder(type) {
    let encoder = this._encoderCache[type];
    if (!encoder) {
      encoder = this._encoderCache[type] = this._getEncoder(type);
    }
    return encoder;
  }
  _getEncoder(type) {
    {
      const encoder = getBaseEncoder(type);
      if (encoder) {
        return encoder;
      }
    }
    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (match) {
      const subtype = match[1];
      const subEncoder = this.getEncoder(subtype);
      const length = parseInt(match[3]);
      return (value) => {
        if (length >= 0 && value.length !== length) {
          logger$n.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
        }
        let result = value.map(subEncoder);
        if (this._types[subtype]) {
          result = result.map(keccak256);
        }
        return keccak256(hexConcat(result));
      };
    }
    const fields = this.types[type];
    if (fields) {
      const encodedType = id(this._types[type]);
      return (value) => {
        const values = fields.map(({name: name2, type: type2}) => {
          const result = this.getEncoder(type2)(value[name2]);
          if (this._types[type2]) {
            return keccak256(result);
          }
          return result;
        });
        values.unshift(encodedType);
        return hexConcat(values);
      };
    }
    return logger$n.throwArgumentError(`unknown type: ${type}`, "type", type);
  }
  encodeType(name2) {
    const result = this._types[name2];
    if (!result) {
      logger$n.throwArgumentError(`unknown type: ${JSON.stringify(name2)}`, "name", name2);
    }
    return result;
  }
  encodeData(type, value) {
    return this.getEncoder(type)(value);
  }
  hashStruct(name2, value) {
    return keccak256(this.encodeData(name2, value));
  }
  encode(value) {
    return this.encodeData(this.primaryType, value);
  }
  hash(value) {
    return this.hashStruct(this.primaryType, value);
  }
  _visit(type, value, callback) {
    {
      const encoder = getBaseEncoder(type);
      if (encoder) {
        return callback(type, value);
      }
    }
    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (match) {
      const subtype = match[1];
      const length = parseInt(match[3]);
      if (length >= 0 && value.length !== length) {
        logger$n.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
      }
      return value.map((v) => this._visit(subtype, v, callback));
    }
    const fields = this.types[type];
    if (fields) {
      return fields.reduce((accum, {name: name2, type: type2}) => {
        accum[name2] = this._visit(type2, value[name2], callback);
        return accum;
      }, {});
    }
    return logger$n.throwArgumentError(`unknown type: ${type}`, "type", type);
  }
  visit(value, callback) {
    return this._visit(this.primaryType, value, callback);
  }
  static from(types) {
    return new TypedDataEncoder(types);
  }
  static getPrimaryType(types) {
    return TypedDataEncoder.from(types).primaryType;
  }
  static hashStruct(name2, types, value) {
    return TypedDataEncoder.from(types).hashStruct(name2, value);
  }
  static hashDomain(domain) {
    const domainFields = [];
    for (const name2 in domain) {
      const type = domainFieldTypes[name2];
      if (!type) {
        logger$n.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name2)}`, "domain", domain);
      }
      domainFields.push({name: name2, type});
    }
    domainFields.sort((a, b) => {
      return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
    });
    return TypedDataEncoder.hashStruct("EIP712Domain", {EIP712Domain: domainFields}, domain);
  }
  static encode(domain, types, value) {
    return hexConcat([
      "0x1901",
      TypedDataEncoder.hashDomain(domain),
      TypedDataEncoder.from(types).hash(value)
    ]);
  }
  static hash(domain, types, value) {
    return keccak256(TypedDataEncoder.encode(domain, types, value));
  }
  static resolveNames(domain, types, value, resolveName2) {
    return __awaiter$b(this, void 0, void 0, function* () {
      domain = shallowCopy(domain);
      const ensCache = {};
      if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) {
        ensCache[domain.verifyingContract] = "0x";
      }
      const encoder = TypedDataEncoder.from(types);
      encoder.visit(value, (type, value2) => {
        if (type === "address" && !isHexString(value2, 20)) {
          ensCache[value2] = "0x";
        }
        return value2;
      });
      for (const name2 in ensCache) {
        ensCache[name2] = yield resolveName2(name2);
      }
      if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
        domain.verifyingContract = ensCache[domain.verifyingContract];
      }
      value = encoder.visit(value, (type, value2) => {
        if (type === "address" && ensCache[value2]) {
          return ensCache[value2];
        }
        return value2;
      });
      return {domain, value};
    });
  }
  static getPayload(domain, types, value) {
    TypedDataEncoder.hashDomain(domain);
    const domainValues = {};
    const domainTypes = [];
    domainFieldNames.forEach((name2) => {
      const value2 = domain[name2];
      if (value2 == null) {
        return;
      }
      domainValues[name2] = domainChecks[name2](value2);
      domainTypes.push({name: name2, type: domainFieldTypes[name2]});
    });
    const encoder = TypedDataEncoder.from(types);
    const typesWithDomain = shallowCopy(types);
    if (typesWithDomain.EIP712Domain) {
      logger$n.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
    } else {
      typesWithDomain.EIP712Domain = domainTypes;
    }
    encoder.encode(value);
    return {
      types: typesWithDomain,
      domain: domainValues,
      primaryType: encoder.primaryType,
      message: encoder.visit(value, (type, value2) => {
        if (type.match(/^bytes(\d*)/)) {
          return hexlify(arrayify(value2));
        }
        if (type.match(/^u?int/)) {
          return BigNumber.from(value2).toString();
        }
        switch (type) {
          case "address":
            return value2.toLowerCase();
          case "bool":
            return !!value2;
          case "string":
            if (typeof value2 !== "string") {
              logger$n.throwArgumentError(`invalid string`, "value", value2);
            }
            return value2;
        }
        return logger$n.throwArgumentError("unsupported type", "type", type);
      })
    };
  }
}
const logger$m = new Logger(version$e);
class LogDescription extends Description {
}
class TransactionDescription extends Description {
}
class Indexed extends Description {
  static isIndexed(value) {
    return !!(value && value._isIndexed);
  }
}
function wrapAccessError(property, error2) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error2;
  return wrap;
}
class Interface {
  constructor(fragments) {
    logger$m.checkNew(new.target, Interface);
    let abi = [];
    if (typeof fragments === "string") {
      abi = JSON.parse(fragments);
    } else {
      abi = fragments;
    }
    defineReadOnly(this, "fragments", abi.map((fragment) => {
      return Fragment.from(fragment);
    }).filter((fragment) => fragment != null));
    defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
    defineReadOnly(this, "functions", {});
    defineReadOnly(this, "errors", {});
    defineReadOnly(this, "events", {});
    defineReadOnly(this, "structs", {});
    this.fragments.forEach((fragment) => {
      let bucket = null;
      switch (fragment.type) {
        case "constructor":
          if (this.deploy) {
            logger$m.warn("duplicate definition - constructor");
            return;
          }
          defineReadOnly(this, "deploy", fragment);
          return;
        case "function":
          bucket = this.functions;
          break;
        case "event":
          bucket = this.events;
          break;
        default:
          return;
      }
      let signature2 = fragment.format();
      if (bucket[signature2]) {
        logger$m.warn("duplicate definition - " + signature2);
        return;
      }
      bucket[signature2] = fragment;
    });
    if (!this.deploy) {
      defineReadOnly(this, "deploy", ConstructorFragment.from({
        payable: false,
        type: "constructor"
      }));
    }
    defineReadOnly(this, "_isInterface", true);
  }
  format(format2) {
    if (!format2) {
      format2 = FormatTypes.full;
    }
    if (format2 === FormatTypes.sighash) {
      logger$m.throwArgumentError("interface does not support formatting sighash", "format", format2);
    }
    const abi = this.fragments.map((fragment) => fragment.format(format2));
    if (format2 === FormatTypes.json) {
      return JSON.stringify(abi.map((j) => JSON.parse(j)));
    }
    return abi;
  }
  static getAbiCoder() {
    return defaultAbiCoder;
  }
  static getAddress(address) {
    return getAddress(address);
  }
  static getSighash(functionFragment) {
    return hexDataSlice(id(functionFragment.format()), 0, 4);
  }
  static getEventTopic(eventFragment) {
    return id(eventFragment.format());
  }
  getFunction(nameOrSignatureOrSighash) {
    if (isHexString(nameOrSignatureOrSighash)) {
      for (const name2 in this.functions) {
        if (nameOrSignatureOrSighash === this.getSighash(name2)) {
          return this.functions[name2];
        }
      }
      logger$m.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
    }
    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name2 = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.functions).filter((f2) => f2.split("(")[0] === name2);
      if (matching.length === 0) {
        logger$m.throwArgumentError("no matching function", "name", name2);
      } else if (matching.length > 1) {
        logger$m.throwArgumentError("multiple matching functions", "name", name2);
      }
      return this.functions[matching[0]];
    }
    const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
    if (!result) {
      logger$m.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
    }
    return result;
  }
  getEvent(nameOrSignatureOrTopic) {
    if (isHexString(nameOrSignatureOrTopic)) {
      const topichash = nameOrSignatureOrTopic.toLowerCase();
      for (const name2 in this.events) {
        if (topichash === this.getEventTopic(name2)) {
          return this.events[name2];
        }
      }
      logger$m.throwArgumentError("no matching event", "topichash", topichash);
    }
    if (nameOrSignatureOrTopic.indexOf("(") === -1) {
      const name2 = nameOrSignatureOrTopic.trim();
      const matching = Object.keys(this.events).filter((f2) => f2.split("(")[0] === name2);
      if (matching.length === 0) {
        logger$m.throwArgumentError("no matching event", "name", name2);
      } else if (matching.length > 1) {
        logger$m.throwArgumentError("multiple matching events", "name", name2);
      }
      return this.events[matching[0]];
    }
    const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
    if (!result) {
      logger$m.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
    }
    return result;
  }
  getSighash(functionFragment) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return getStatic(this.constructor, "getSighash")(functionFragment);
  }
  getEventTopic(eventFragment) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    return getStatic(this.constructor, "getEventTopic")(eventFragment);
  }
  _decodeParams(params, data) {
    return this._abiCoder.decode(params, data);
  }
  _encodeParams(params, values) {
    return this._abiCoder.encode(params, values);
  }
  encodeDeploy(values) {
    return this._encodeParams(this.deploy.inputs, values || []);
  }
  decodeFunctionData(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
      logger$m.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes));
    }
    return this._decodeParams(functionFragment.inputs, bytes.slice(4));
  }
  encodeFunctionData(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(concat([
      this.getSighash(functionFragment),
      this._encodeParams(functionFragment.inputs, values || [])
    ]));
  }
  decodeFunctionResult(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    let bytes = arrayify(data);
    let reason = null;
    let errorSignature = null;
    switch (bytes.length % this._abiCoder._getWordSize()) {
      case 0:
        try {
          return this._abiCoder.decode(functionFragment.outputs, bytes);
        } catch (error2) {
        }
        break;
      case 4:
        if (hexlify(bytes.slice(0, 4)) === "0x08c379a0") {
          errorSignature = "Error(string)";
          reason = this._abiCoder.decode(["string"], bytes.slice(4))[0];
        }
        break;
    }
    return logger$m.throwError("call revert exception", Logger.errors.CALL_EXCEPTION, {
      method: functionFragment.format(),
      errorSignature,
      errorArgs: [reason],
      reason
    });
  }
  encodeFunctionResult(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
  }
  encodeFilterTopics(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (values.length > eventFragment.inputs.length) {
      logger$m.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
        argument: "values",
        value: values
      });
    }
    let topics = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    const encodeTopic = (param, value) => {
      if (param.type === "string") {
        return id(value);
      } else if (param.type === "bytes") {
        return keccak256(hexlify(value));
      }
      if (param.type === "address") {
        this._abiCoder.encode(["address"], [value]);
      }
      return hexZeroPad(hexlify(value), 32);
    };
    values.forEach((value, index2) => {
      let param = eventFragment.inputs[index2];
      if (!param.indexed) {
        if (value != null) {
          logger$m.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
        }
        return;
      }
      if (value == null) {
        topics.push(null);
      } else if (param.baseType === "array" || param.baseType === "tuple") {
        logger$m.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
      } else if (Array.isArray(value)) {
        topics.push(value.map((value2) => encodeTopic(param, value2)));
      } else {
        topics.push(encodeTopic(param, value));
      }
    });
    while (topics.length && topics[topics.length - 1] === null) {
      topics.pop();
    }
    return topics;
  }
  encodeEventLog(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    const topics = [];
    const dataTypes = [];
    const dataValues = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    if (values.length !== eventFragment.inputs.length) {
      logger$m.throwArgumentError("event arguments/values mismatch", "values", values);
    }
    eventFragment.inputs.forEach((param, index2) => {
      const value = values[index2];
      if (param.indexed) {
        if (param.type === "string") {
          topics.push(id(value));
        } else if (param.type === "bytes") {
          topics.push(keccak256(value));
        } else if (param.baseType === "tuple" || param.baseType === "array") {
          throw new Error("not implemented");
        } else {
          topics.push(this._abiCoder.encode([param.type], [value]));
        }
      } else {
        dataTypes.push(param);
        dataValues.push(value);
      }
    });
    return {
      data: this._abiCoder.encode(dataTypes, dataValues),
      topics
    };
  }
  decodeEventLog(eventFragment, data, topics) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (topics != null && !eventFragment.anonymous) {
      let topicHash = this.getEventTopic(eventFragment);
      if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
        logger$m.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, {argument: "topics[0]", expected: topicHash, value: topics[0]});
      }
      topics = topics.slice(1);
    }
    let indexed = [];
    let nonIndexed = [];
    let dynamic = [];
    eventFragment.inputs.forEach((param, index2) => {
      if (param.indexed) {
        if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
          indexed.push(ParamType.fromObject({type: "bytes32", name: param.name}));
          dynamic.push(true);
        } else {
          indexed.push(param);
          dynamic.push(false);
        }
      } else {
        nonIndexed.push(param);
        dynamic.push(false);
      }
    });
    let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
    let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
    let result = [];
    let nonIndexedIndex = 0, indexedIndex = 0;
    eventFragment.inputs.forEach((param, index2) => {
      if (param.indexed) {
        if (resultIndexed == null) {
          result[index2] = new Indexed({_isIndexed: true, hash: null});
        } else if (dynamic[index2]) {
          result[index2] = new Indexed({_isIndexed: true, hash: resultIndexed[indexedIndex++]});
        } else {
          try {
            result[index2] = resultIndexed[indexedIndex++];
          } catch (error2) {
            result[index2] = error2;
          }
        }
      } else {
        try {
          result[index2] = resultNonIndexed[nonIndexedIndex++];
        } catch (error2) {
          result[index2] = error2;
        }
      }
      if (param.name && result[param.name] == null) {
        const value = result[index2];
        if (value instanceof Error) {
          Object.defineProperty(result, param.name, {
            get: () => {
              throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
            }
          });
        } else {
          result[param.name] = value;
        }
      }
    });
    for (let i = 0; i < result.length; i++) {
      const value = result[i];
      if (value instanceof Error) {
        Object.defineProperty(result, i, {
          get: () => {
            throw wrapAccessError(`index ${i}`, value);
          }
        });
      }
    }
    return Object.freeze(result);
  }
  parseTransaction(tx) {
    let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
    if (!fragment) {
      return null;
    }
    return new TransactionDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
      functionFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment),
      value: BigNumber.from(tx.value || "0")
    });
  }
  parseLog(log) {
    let fragment = this.getEvent(log.topics[0]);
    if (!fragment || fragment.anonymous) {
      return null;
    }
    return new LogDescription({
      eventFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      topic: this.getEventTopic(fragment),
      args: this.decodeEventLog(fragment, log.data, log.topics)
    });
  }
  static isInterface(value) {
    return !!(value && value._isInterface);
  }
}
const version$9 = "abstract-provider/5.1.0";
const logger$l = new Logger(version$9);
class ForkEvent extends Description {
  static isForkEvent(value) {
    return !!(value && value._isForkEvent);
  }
}
class Provider {
  constructor() {
    logger$l.checkAbstract(new.target, Provider);
    defineReadOnly(this, "_isProvider", true);
  }
  addListener(eventName, listener) {
    return this.on(eventName, listener);
  }
  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }
  static isProvider(value) {
    return !!(value && value._isProvider);
  }
}
const version$8 = "abstract-signer/5.1.0";
var __awaiter$a = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$k = new Logger(version$8);
const allowedTransactionKeys$1 = [
  "accessList",
  "chainId",
  "data",
  "from",
  "gasLimit",
  "gasPrice",
  "nonce",
  "to",
  "type",
  "value"
];
const forwardErrors = [
  Logger.errors.INSUFFICIENT_FUNDS,
  Logger.errors.NONCE_EXPIRED,
  Logger.errors.REPLACEMENT_UNDERPRICED
];
class Signer {
  constructor() {
    logger$k.checkAbstract(new.target, Signer);
    defineReadOnly(this, "_isSigner", true);
  }
  getBalance(blockTag) {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("getBalance");
      return yield this.provider.getBalance(this.getAddress(), blockTag);
    });
  }
  getTransactionCount(blockTag) {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("getTransactionCount");
      return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
    });
  }
  estimateGas(transaction) {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      return yield this.provider.estimateGas(tx);
    });
  }
  call(transaction, blockTag) {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("call");
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      return yield this.provider.call(tx, blockTag);
    });
  }
  sendTransaction(transaction) {
    this._checkProvider("sendTransaction");
    return this.populateTransaction(transaction).then((tx) => {
      return this.signTransaction(tx).then((signedTx) => {
        return this.provider.sendTransaction(signedTx);
      });
    });
  }
  getChainId() {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("getChainId");
      const network = yield this.provider.getNetwork();
      return network.chainId;
    });
  }
  getGasPrice() {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("getGasPrice");
      return yield this.provider.getGasPrice();
    });
  }
  resolveName(name2) {
    return __awaiter$a(this, void 0, void 0, function* () {
      this._checkProvider("resolveName");
      return yield this.provider.resolveName(name2);
    });
  }
  checkTransaction(transaction) {
    for (const key2 in transaction) {
      if (allowedTransactionKeys$1.indexOf(key2) === -1) {
        logger$k.throwArgumentError("invalid transaction key: " + key2, "transaction", transaction);
      }
    }
    const tx = shallowCopy(transaction);
    if (tx.from == null) {
      tx.from = this.getAddress();
    } else {
      tx.from = Promise.all([
        Promise.resolve(tx.from),
        this.getAddress()
      ]).then((result) => {
        if (result[0].toLowerCase() !== result[1].toLowerCase()) {
          logger$k.throwArgumentError("from address mismatch", "transaction", transaction);
        }
        return result[0];
      });
    }
    return tx;
  }
  populateTransaction(transaction) {
    return __awaiter$a(this, void 0, void 0, function* () {
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      if (tx.to != null) {
        tx.to = Promise.resolve(tx.to).then((to) => __awaiter$a(this, void 0, void 0, function* () {
          if (to == null) {
            return null;
          }
          const address = yield this.resolveName(to);
          if (address == null) {
            logger$k.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
          }
          return address;
        }));
      }
      if (tx.gasPrice == null) {
        tx.gasPrice = this.getGasPrice();
      }
      if (tx.nonce == null) {
        tx.nonce = this.getTransactionCount("pending");
      }
      if (tx.gasLimit == null) {
        tx.gasLimit = this.estimateGas(tx).catch((error2) => {
          if (forwardErrors.indexOf(error2.code) >= 0) {
            throw error2;
          }
          return logger$k.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
            error: error2,
            tx
          });
        });
      }
      if (tx.chainId == null) {
        tx.chainId = this.getChainId();
      } else {
        tx.chainId = Promise.all([
          Promise.resolve(tx.chainId),
          this.getChainId()
        ]).then((results) => {
          if (results[1] !== 0 && results[0] !== results[1]) {
            logger$k.throwArgumentError("chainId address mismatch", "transaction", transaction);
          }
          return results[0];
        });
      }
      return yield resolveProperties(tx);
    });
  }
  _checkProvider(operation) {
    if (!this.provider) {
      logger$k.throwError("missing provider", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: operation || "_checkProvider"
      });
    }
  }
  static isSigner(value) {
    return !!(value && value._isSigner);
  }
}
class VoidSigner extends Signer {
  constructor(address, provider) {
    logger$k.checkNew(new.target, VoidSigner);
    super();
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "provider", provider || null);
  }
  getAddress() {
    return Promise.resolve(this.address);
  }
  _fail(message, operation) {
    return Promise.resolve().then(() => {
      logger$k.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, {operation});
    });
  }
  signMessage(message) {
    return this._fail("VoidSigner cannot sign messages", "signMessage");
  }
  signTransaction(transaction) {
    return this._fail("VoidSigner cannot sign transactions", "signTransaction");
  }
  _signTypedData(domain, types, value) {
    return this._fail("VoidSigner cannot sign typed data", "signTypedData");
  }
  connect(provider) {
    return new VoidSigner(this.address, provider);
  }
}
var minimalisticAssert$1 = assert$6;
function assert$6(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
assert$6.equal = function assertEqual(l, r2, msg) {
  if (l != r2)
    throw new Error(msg || "Assertion failed: " + l + " != " + r2);
};
var inherits_browser$1 = createCommonjsModule$1(function(module) {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});
var inherits_1$1 = inherits_browser$1;
function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 64512) !== 55296) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 64512) === 56320;
}
function toArray$1(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === "string") {
    if (!enc) {
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = c >> 6 | 192;
          res[p++] = c & 63 | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
          res[p++] = c >> 18 | 240;
          res[p++] = c >> 12 & 63 | 128;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        } else {
          res[p++] = c >> 12 | 224;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        }
      }
    } else if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
var toArray_1$1 = toArray$1;
function toHex$1(msg) {
  var res = "";
  for (var i = 0; i < msg.length; i++)
    res += zero2$1(msg[i].toString(16));
  return res;
}
var toHex_1$1 = toHex$1;
function htonl$1(w) {
  var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
  return res >>> 0;
}
var htonl_1$1 = htonl$1;
function toHex32$1(msg, endian) {
  var res = "";
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === "little")
      w = htonl$1(w);
    res += zero8$1(w.toString(16));
  }
  return res;
}
var toHex32_1$1 = toHex32$1;
function zero2$1(word) {
  if (word.length === 1)
    return "0" + word;
  else
    return word;
}
var zero2_1$1 = zero2$1;
function zero8$1(word) {
  if (word.length === 7)
    return "0" + word;
  else if (word.length === 6)
    return "00" + word;
  else if (word.length === 5)
    return "000" + word;
  else if (word.length === 4)
    return "0000" + word;
  else if (word.length === 3)
    return "00000" + word;
  else if (word.length === 2)
    return "000000" + word;
  else if (word.length === 1)
    return "0000000" + word;
  else
    return word;
}
var zero8_1$1 = zero8$1;
function join32$1(msg, start, end, endian) {
  var len = end - start;
  minimalisticAssert$1(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === "big")
      w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
    else
      w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
var join32_1$1 = join32$1;
function split32$1(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === "big") {
      res[k] = m >>> 24;
      res[k + 1] = m >>> 16 & 255;
      res[k + 2] = m >>> 8 & 255;
      res[k + 3] = m & 255;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = m >>> 16 & 255;
      res[k + 1] = m >>> 8 & 255;
      res[k] = m & 255;
    }
  }
  return res;
}
var split32_1$1 = split32$1;
function rotr32$3(w, b) {
  return w >>> b | w << 32 - b;
}
var rotr32_1$1 = rotr32$3;
function rotl32$5(w, b) {
  return w << b | w >>> 32 - b;
}
var rotl32_1$1 = rotl32$5;
function sum32$7(a, b) {
  return a + b >>> 0;
}
var sum32_1$1 = sum32$7;
function sum32_3$3(a, b, c) {
  return a + b + c >>> 0;
}
var sum32_3_1$1 = sum32_3$3;
function sum32_4$5(a, b, c, d) {
  return a + b + c + d >>> 0;
}
var sum32_4_1$1 = sum32_4$5;
function sum32_5$5(a, b, c, d, e) {
  return a + b + c + d + e >>> 0;
}
var sum32_5_1$1 = sum32_5$5;
function sum64$3(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
var sum64_1$1 = sum64$3;
function sum64_hi$3(ah, al, bh, bl) {
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
var sum64_hi_1$1 = sum64_hi$3;
function sum64_lo$3(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
var sum64_lo_1$1 = sum64_lo$3;
function sum64_4_hi$3(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
var sum64_4_hi_1$1 = sum64_4_hi$3;
function sum64_4_lo$3(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
var sum64_4_lo_1$1 = sum64_4_lo$3;
function sum64_5_hi$3(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = lo + el >>> 0;
  carry += lo < el ? 1 : 0;
  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
var sum64_5_hi_1$1 = sum64_5_hi$3;
function sum64_5_lo$3(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;
  return lo >>> 0;
}
var sum64_5_lo_1$1 = sum64_5_lo$3;
function rotr64_hi$3(ah, al, num) {
  var r2 = al << 32 - num | ah >>> num;
  return r2 >>> 0;
}
var rotr64_hi_1$1 = rotr64_hi$3;
function rotr64_lo$3(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
var rotr64_lo_1$1 = rotr64_lo$3;
function shr64_hi$3(ah, al, num) {
  return ah >>> num;
}
var shr64_hi_1$1 = shr64_hi$3;
function shr64_lo$3(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
var shr64_lo_1$1 = shr64_lo$3;
var utils$1 = {
  inherits: inherits_1$1,
  toArray: toArray_1$1,
  toHex: toHex_1$1,
  htonl: htonl_1$1,
  toHex32: toHex32_1$1,
  zero2: zero2_1$1,
  zero8: zero8_1$1,
  join32: join32_1$1,
  split32: split32_1$1,
  rotr32: rotr32_1$1,
  rotl32: rotl32_1$1,
  sum32: sum32_1$1,
  sum32_3: sum32_3_1$1,
  sum32_4: sum32_4_1$1,
  sum32_5: sum32_5_1$1,
  sum64: sum64_1$1,
  sum64_hi: sum64_hi_1$1,
  sum64_lo: sum64_lo_1$1,
  sum64_4_hi: sum64_4_hi_1$1,
  sum64_4_lo: sum64_4_lo_1$1,
  sum64_5_hi: sum64_5_hi_1$1,
  sum64_5_lo: sum64_5_lo_1$1,
  rotr64_hi: rotr64_hi_1$1,
  rotr64_lo: rotr64_lo_1$1,
  shr64_hi: shr64_hi_1$1,
  shr64_lo: shr64_lo_1$1
};
function BlockHash$9() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = "big";
  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
var BlockHash_1$1 = BlockHash$9;
BlockHash$9.prototype.update = function update(msg, enc) {
  msg = utils$1.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;
  if (this.pending.length >= this._delta8) {
    msg = this.pending;
    var r2 = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r2, msg.length);
    if (this.pending.length === 0)
      this.pending = null;
    msg = utils$1.join32(msg, 0, msg.length - r2, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }
  return this;
};
BlockHash$9.prototype.digest = function digest(enc) {
  this.update(this._pad());
  minimalisticAssert$1(this.pending === null);
  return this._digest(enc);
};
BlockHash$9.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - (len + this.padLength) % bytes;
  var res = new Array(k + this.padLength);
  res[0] = 128;
  for (var i = 1; i < k; i++)
    res[i] = 0;
  len <<= 3;
  if (this.endian === "big") {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = len >>> 24 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len & 255;
  } else {
    res[i++] = len & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 24 & 255;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }
  return res;
};
var common$3 = {
  BlockHash: BlockHash_1$1
};
var rotr32$2 = utils$1.rotr32;
function ft_1$3(s2, x, y, z) {
  if (s2 === 0)
    return ch32$3(x, y, z);
  if (s2 === 1 || s2 === 3)
    return p32$1(x, y, z);
  if (s2 === 2)
    return maj32$3(x, y, z);
}
var ft_1_1$1 = ft_1$3;
function ch32$3(x, y, z) {
  return x & y ^ ~x & z;
}
var ch32_1$1 = ch32$3;
function maj32$3(x, y, z) {
  return x & y ^ x & z ^ y & z;
}
var maj32_1$1 = maj32$3;
function p32$1(x, y, z) {
  return x ^ y ^ z;
}
var p32_1$1 = p32$1;
function s0_256$3(x) {
  return rotr32$2(x, 2) ^ rotr32$2(x, 13) ^ rotr32$2(x, 22);
}
var s0_256_1$1 = s0_256$3;
function s1_256$3(x) {
  return rotr32$2(x, 6) ^ rotr32$2(x, 11) ^ rotr32$2(x, 25);
}
var s1_256_1$1 = s1_256$3;
function g0_256$3(x) {
  return rotr32$2(x, 7) ^ rotr32$2(x, 18) ^ x >>> 3;
}
var g0_256_1$1 = g0_256$3;
function g1_256$3(x) {
  return rotr32$2(x, 17) ^ rotr32$2(x, 19) ^ x >>> 10;
}
var g1_256_1$1 = g1_256$3;
var common$2 = {
  ft_1: ft_1_1$1,
  ch32: ch32_1$1,
  maj32: maj32_1$1,
  p32: p32_1$1,
  s0_256: s0_256_1$1,
  s1_256: s1_256_1$1,
  g0_256: g0_256_1$1,
  g1_256: g1_256_1$1
};
var rotl32$4 = utils$1.rotl32;
var sum32$6 = utils$1.sum32;
var sum32_5$4 = utils$1.sum32_5;
var ft_1$2 = common$2.ft_1;
var BlockHash$8 = common$3.BlockHash;
var sha1_K$1 = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function SHA1$1() {
  if (!(this instanceof SHA1$1))
    return new SHA1$1();
  BlockHash$8.call(this);
  this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ];
  this.W = new Array(80);
}
utils$1.inherits(SHA1$1, BlockHash$8);
var _1$1 = SHA1$1;
SHA1$1.blockSize = 512;
SHA1$1.outSize = 160;
SHA1$1.hmacStrength = 80;
SHA1$1.padLength = 64;
SHA1$1.prototype._update = function _update(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = rotl32$4(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  for (i = 0; i < W.length; i++) {
    var s2 = ~~(i / 20);
    var t = sum32_5$4(rotl32$4(a, 5), ft_1$2(s2, b, c, d), e, W[i], sha1_K$1[s2]);
    e = d;
    d = c;
    c = rotl32$4(b, 30);
    b = a;
    a = t;
  }
  this.h[0] = sum32$6(this.h[0], a);
  this.h[1] = sum32$6(this.h[1], b);
  this.h[2] = sum32$6(this.h[2], c);
  this.h[3] = sum32$6(this.h[3], d);
  this.h[4] = sum32$6(this.h[4], e);
};
SHA1$1.prototype._digest = function digest2(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h, "big");
  else
    return utils$1.split32(this.h, "big");
};
var sum32$5 = utils$1.sum32;
var sum32_4$4 = utils$1.sum32_4;
var sum32_5$3 = utils$1.sum32_5;
var ch32$2 = common$2.ch32;
var maj32$2 = common$2.maj32;
var s0_256$2 = common$2.s0_256;
var s1_256$2 = common$2.s1_256;
var g0_256$2 = common$2.g0_256;
var g1_256$2 = common$2.g1_256;
var BlockHash$7 = common$3.BlockHash;
var sha256_K$1 = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function SHA256$1() {
  if (!(this instanceof SHA256$1))
    return new SHA256$1();
  BlockHash$7.call(this);
  this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  this.k = sha256_K$1;
  this.W = new Array(64);
}
utils$1.inherits(SHA256$1, BlockHash$7);
var _256$1 = SHA256$1;
SHA256$1.blockSize = 512;
SHA256$1.outSize = 256;
SHA256$1.hmacStrength = 192;
SHA256$1.padLength = 64;
SHA256$1.prototype._update = function _update2(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$4(g1_256$2(W[i - 2]), W[i - 7], g0_256$2(W[i - 15]), W[i - 16]);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f2 = this.h[5];
  var g = this.h[6];
  var h = this.h[7];
  minimalisticAssert$1(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5$3(h, s1_256$2(e), ch32$2(e, f2, g), this.k[i], W[i]);
    var T2 = sum32$5(s0_256$2(a), maj32$2(a, b, c));
    h = g;
    g = f2;
    f2 = e;
    e = sum32$5(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$5(T1, T2);
  }
  this.h[0] = sum32$5(this.h[0], a);
  this.h[1] = sum32$5(this.h[1], b);
  this.h[2] = sum32$5(this.h[2], c);
  this.h[3] = sum32$5(this.h[3], d);
  this.h[4] = sum32$5(this.h[4], e);
  this.h[5] = sum32$5(this.h[5], f2);
  this.h[6] = sum32$5(this.h[6], g);
  this.h[7] = sum32$5(this.h[7], h);
};
SHA256$1.prototype._digest = function digest3(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h, "big");
  else
    return utils$1.split32(this.h, "big");
};
function SHA224$1() {
  if (!(this instanceof SHA224$1))
    return new SHA224$1();
  _256$1.call(this);
  this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
utils$1.inherits(SHA224$1, _256$1);
var _224$1 = SHA224$1;
SHA224$1.blockSize = 512;
SHA224$1.outSize = 224;
SHA224$1.hmacStrength = 192;
SHA224$1.padLength = 64;
SHA224$1.prototype._digest = function digest4(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h.slice(0, 7), "big");
  else
    return utils$1.split32(this.h.slice(0, 7), "big");
};
var rotr64_hi$2 = utils$1.rotr64_hi;
var rotr64_lo$2 = utils$1.rotr64_lo;
var shr64_hi$2 = utils$1.shr64_hi;
var shr64_lo$2 = utils$1.shr64_lo;
var sum64$2 = utils$1.sum64;
var sum64_hi$2 = utils$1.sum64_hi;
var sum64_lo$2 = utils$1.sum64_lo;
var sum64_4_hi$2 = utils$1.sum64_4_hi;
var sum64_4_lo$2 = utils$1.sum64_4_lo;
var sum64_5_hi$2 = utils$1.sum64_5_hi;
var sum64_5_lo$2 = utils$1.sum64_5_lo;
var BlockHash$6 = common$3.BlockHash;
var sha512_K$1 = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function SHA512$1() {
  if (!(this instanceof SHA512$1))
    return new SHA512$1();
  BlockHash$6.call(this);
  this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ];
  this.k = sha512_K$1;
  this.W = new Array(160);
}
utils$1.inherits(SHA512$1, BlockHash$6);
var _512$1 = SHA512$1;
SHA512$1.blockSize = 1024;
SHA512$1.outSize = 512;
SHA512$1.hmacStrength = 192;
SHA512$1.padLength = 128;
SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi$1(W[i - 4], W[i - 3]);
    var c0_lo = g1_512_lo$1(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi$1(W[i - 30], W[i - 29]);
    var c2_lo = g0_512_lo$1(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];
    var c3_lo = W[i - 31];
    W[i] = sum64_4_hi$2(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo$2(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
  }
};
SHA512$1.prototype._update = function _update3(msg, start) {
  this._prepareBlock(msg, start);
  var W = this.W;
  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];
  minimalisticAssert$1(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi$1(eh, el);
    var c1_lo = s1_512_lo$1(eh, el);
    var c2_hi = ch64_hi$1(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo$1(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];
    var T1_hi = sum64_5_hi$2(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    var T1_lo = sum64_5_lo$2(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    c0_hi = s0_512_hi$1(ah, al);
    c0_lo = s0_512_lo$1(ah, al);
    c1_hi = maj64_hi$1(ah, al, bh, bl, ch);
    c1_lo = maj64_lo$1(ah, al, bh, bl, ch, cl);
    var T2_hi = sum64_hi$2(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo$2(c0_hi, c0_lo, c1_hi, c1_lo);
    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    eh = sum64_hi$2(dh, dl, T1_hi, T1_lo);
    el = sum64_lo$2(dl, dl, T1_hi, T1_lo);
    dh = ch;
    dl = cl;
    ch = bh;
    cl = bl;
    bh = ah;
    bl = al;
    ah = sum64_hi$2(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo$2(T1_hi, T1_lo, T2_hi, T2_lo);
  }
  sum64$2(this.h, 0, ah, al);
  sum64$2(this.h, 2, bh, bl);
  sum64$2(this.h, 4, ch, cl);
  sum64$2(this.h, 6, dh, dl);
  sum64$2(this.h, 8, eh, el);
  sum64$2(this.h, 10, fh, fl);
  sum64$2(this.h, 12, gh, gl);
  sum64$2(this.h, 14, hh, hl);
};
SHA512$1.prototype._digest = function digest5(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h, "big");
  else
    return utils$1.split32(this.h, "big");
};
function ch64_hi$1(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ ~xh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function ch64_lo$1(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ ~xl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_hi$1(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ xh & zh ^ yh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_lo$1(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ xl & zl ^ yl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_hi$1(xh, xl) {
  var c0_hi = rotr64_hi$2(xh, xl, 28);
  var c1_hi = rotr64_hi$2(xl, xh, 2);
  var c2_hi = rotr64_hi$2(xl, xh, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_lo$1(xh, xl) {
  var c0_lo = rotr64_lo$2(xh, xl, 28);
  var c1_lo = rotr64_lo$2(xl, xh, 2);
  var c2_lo = rotr64_lo$2(xl, xh, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_hi$1(xh, xl) {
  var c0_hi = rotr64_hi$2(xh, xl, 14);
  var c1_hi = rotr64_hi$2(xh, xl, 18);
  var c2_hi = rotr64_hi$2(xl, xh, 9);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_lo$1(xh, xl) {
  var c0_lo = rotr64_lo$2(xh, xl, 14);
  var c1_lo = rotr64_lo$2(xh, xl, 18);
  var c2_lo = rotr64_lo$2(xl, xh, 9);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_hi$1(xh, xl) {
  var c0_hi = rotr64_hi$2(xh, xl, 1);
  var c1_hi = rotr64_hi$2(xh, xl, 8);
  var c2_hi = shr64_hi$2(xh, xl, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_lo$1(xh, xl) {
  var c0_lo = rotr64_lo$2(xh, xl, 1);
  var c1_lo = rotr64_lo$2(xh, xl, 8);
  var c2_lo = shr64_lo$2(xh, xl, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_hi$1(xh, xl) {
  var c0_hi = rotr64_hi$2(xh, xl, 19);
  var c1_hi = rotr64_hi$2(xl, xh, 29);
  var c2_hi = shr64_hi$2(xh, xl, 6);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_lo$1(xh, xl) {
  var c0_lo = rotr64_lo$2(xh, xl, 19);
  var c1_lo = rotr64_lo$2(xl, xh, 29);
  var c2_lo = shr64_lo$2(xh, xl, 6);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function SHA384$1() {
  if (!(this instanceof SHA384$1))
    return new SHA384$1();
  _512$1.call(this);
  this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
utils$1.inherits(SHA384$1, _512$1);
var _384$1 = SHA384$1;
SHA384$1.blockSize = 1024;
SHA384$1.outSize = 384;
SHA384$1.hmacStrength = 192;
SHA384$1.padLength = 128;
SHA384$1.prototype._digest = function digest6(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h.slice(0, 12), "big");
  else
    return utils$1.split32(this.h.slice(0, 12), "big");
};
var sha1$1 = _1$1;
var sha224$1 = _224$1;
var sha256$2 = _256$1;
var sha384$1 = _384$1;
var sha512$1 = _512$1;
var sha$1 = {
  sha1: sha1$1,
  sha224: sha224$1,
  sha256: sha256$2,
  sha384: sha384$1,
  sha512: sha512$1
};
var rotl32$3 = utils$1.rotl32;
var sum32$4 = utils$1.sum32;
var sum32_3$2 = utils$1.sum32_3;
var sum32_4$3 = utils$1.sum32_4;
var BlockHash$5 = common$3.BlockHash;
function RIPEMD160$1() {
  if (!(this instanceof RIPEMD160$1))
    return new RIPEMD160$1();
  BlockHash$5.call(this);
  this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  this.endian = "little";
}
utils$1.inherits(RIPEMD160$1, BlockHash$5);
var ripemd160$1 = RIPEMD160$1;
RIPEMD160$1.blockSize = 512;
RIPEMD160$1.outSize = 160;
RIPEMD160$1.hmacStrength = 192;
RIPEMD160$1.padLength = 64;
RIPEMD160$1.prototype._update = function update2(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32$4(rotl32$3(sum32_4$3(A, f$1(j, B, C, D), msg[r$1[j] + start], K$1(j)), s$1[j]), E);
    A = E;
    E = D;
    D = rotl32$3(C, 10);
    C = B;
    B = T;
    T = sum32$4(rotl32$3(sum32_4$3(Ah, f$1(79 - j, Bh, Ch, Dh), msg[rh$1[j] + start], Kh$1(j)), sh$1[j]), Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32$3(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3$2(this.h[1], C, Dh);
  this.h[1] = sum32_3$2(this.h[2], D, Eh);
  this.h[2] = sum32_3$2(this.h[3], E, Ah);
  this.h[3] = sum32_3$2(this.h[4], A, Bh);
  this.h[4] = sum32_3$2(this.h[0], B, Ch);
  this.h[0] = T;
};
RIPEMD160$1.prototype._digest = function digest7(enc) {
  if (enc === "hex")
    return utils$1.toHex32(this.h, "little");
  else
    return utils$1.split32(this.h, "little");
};
function f$1(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return x & y | ~x & z;
  else if (j <= 47)
    return (x | ~y) ^ z;
  else if (j <= 63)
    return x & z | y & ~z;
  else
    return x ^ (y | ~z);
}
function K$1(j) {
  if (j <= 15)
    return 0;
  else if (j <= 31)
    return 1518500249;
  else if (j <= 47)
    return 1859775393;
  else if (j <= 63)
    return 2400959708;
  else
    return 2840853838;
}
function Kh$1(j) {
  if (j <= 15)
    return 1352829926;
  else if (j <= 31)
    return 1548603684;
  else if (j <= 47)
    return 1836072691;
  else if (j <= 63)
    return 2053994217;
  else
    return 0;
}
var r$1 = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
];
var rh$1 = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
];
var s$1 = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
];
var sh$1 = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
];
var ripemd$1 = {
  ripemd160: ripemd160$1
};
function Hmac$1(hash, key2, enc) {
  if (!(this instanceof Hmac$1))
    return new Hmac$1(hash, key2, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;
  this._init(utils$1.toArray(key2, enc));
}
var hmac$1 = Hmac$1;
Hmac$1.prototype._init = function init2(key2) {
  if (key2.length > this.blockSize)
    key2 = new this.Hash().update(key2).digest();
  minimalisticAssert$1(key2.length <= this.blockSize);
  for (var i = key2.length; i < this.blockSize; i++)
    key2.push(0);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 54;
  this.inner = new this.Hash().update(key2);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 106;
  this.outer = new this.Hash().update(key2);
};
Hmac$1.prototype.update = function update3(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};
Hmac$1.prototype.digest = function digest8(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};
var hash_1$1 = createCommonjsModule$1(function(module, exports) {
  var hash = exports;
  hash.utils = utils$1;
  hash.common = common$3;
  hash.sha = sha$1;
  hash.ripemd = ripemd$1;
  hash.hmac = hmac$1;
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
});
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base2) {
      return commonjsRequire(path, base2 === void 0 || base2 === null ? module.path : base2);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var minimalisticAssert = assert;
function assert(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
assert.equal = function assertEqual2(l, r2, msg) {
  if (l != r2)
    throw new Error(msg || "Assertion failed: " + l + " != " + r2);
};
var utils_1 = createCommonjsModule(function(module, exports) {
  var utils2 = exports;
  function toArray2(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg !== "string") {
      for (var i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
      return res;
    }
    if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    } else {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 255;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    }
    return res;
  }
  utils2.toArray = toArray2;
  function zero22(word) {
    if (word.length === 1)
      return "0" + word;
    else
      return word;
  }
  utils2.zero2 = zero22;
  function toHex2(msg) {
    var res = "";
    for (var i = 0; i < msg.length; i++)
      res += zero22(msg[i].toString(16));
    return res;
  }
  utils2.toHex = toHex2;
  utils2.encode = function encode3(arr, enc) {
    if (enc === "hex")
      return toHex2(arr);
    else
      return arr;
  };
});
var utils_1$1 = createCommonjsModule(function(module, exports) {
  var utils2 = exports;
  utils2.assert = minimalisticAssert;
  utils2.toArray = utils_1.toArray;
  utils2.zero2 = utils_1.zero2;
  utils2.toHex = utils_1.toHex;
  utils2.encode = utils_1.encode;
  function getNAF2(num, w, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);
    var ws = 1 << w + 1;
    var k = num.clone();
    for (var i = 0; i < naf.length; i++) {
      var z;
      var mod = k.andln(ws - 1);
      if (k.isOdd()) {
        if (mod > (ws >> 1) - 1)
          z = (ws >> 1) - mod;
        else
          z = mod;
        k.isubn(z);
      } else {
        z = 0;
      }
      naf[i] = z;
      k.iushrn(1);
    }
    return naf;
  }
  utils2.getNAF = getNAF2;
  function getJSF2(k1, k2) {
    var jsf = [
      [],
      []
    ];
    k1 = k1.clone();
    k2 = k2.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;
    while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
      var m14 = k1.andln(3) + d1 & 3;
      var m24 = k2.andln(3) + d2 & 3;
      if (m14 === 3)
        m14 = -1;
      if (m24 === 3)
        m24 = -1;
      var u1;
      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = k1.andln(7) + d1 & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2)
          u1 = -m14;
        else
          u1 = m14;
      }
      jsf[0].push(u1);
      var u2;
      if ((m24 & 1) === 0) {
        u2 = 0;
      } else {
        m8 = k2.andln(7) + d2 & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2)
          u2 = -m24;
        else
          u2 = m24;
      }
      jsf[1].push(u2);
      if (2 * d1 === u1 + 1)
        d1 = 1 - d1;
      if (2 * d2 === u2 + 1)
        d2 = 1 - d2;
      k1.iushrn(1);
      k2.iushrn(1);
    }
    return jsf;
  }
  utils2.getJSF = getJSF2;
  function cachedProperty(obj, name2, computer) {
    var key2 = "_" + name2;
    obj.prototype[name2] = function cachedProperty2() {
      return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
    };
  }
  utils2.cachedProperty = cachedProperty;
  function parseBytes(bytes) {
    return typeof bytes === "string" ? utils2.toArray(bytes, "hex") : bytes;
  }
  utils2.parseBytes = parseBytes;
  function intFromLE(bytes) {
    return new bn(bytes, "hex", "le");
  }
  utils2.intFromLE = intFromLE;
});
var getNAF = utils_1$1.getNAF;
var getJSF = utils_1$1.getJSF;
var assert$1 = utils_1$1.assert;
function BaseCurve(type, conf) {
  this.type = type;
  this.p = new bn(conf.p, 16);
  this.red = conf.prime ? bn.red(conf.prime) : bn.mont(this.p);
  this.zero = new bn(0).toRed(this.red);
  this.one = new bn(1).toRed(this.red);
  this.two = new bn(2).toRed(this.red);
  this.n = conf.n && new bn(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);
  this._bitLength = this.n ? this.n.bitLength() : 0;
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
var base = BaseCurve;
BaseCurve.prototype.point = function point() {
  throw new Error("Not implemented");
};
BaseCurve.prototype.validate = function validate() {
  throw new Error("Not implemented");
};
BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert$1(p.precomputed);
  var doubles = p._getDoubles();
  var naf = getNAF(k, 1, this._bitLength);
  var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;
  var repr = [];
  var j;
  var nafW;
  for (j = 0; j < naf.length; j += doubles.step) {
    nafW = 0;
    for (var l = j + doubles.step - 1; l >= j; l--)
      nafW = (nafW << 1) + naf[l];
    repr.push(nafW);
  }
  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (j = 0; j < repr.length; j++) {
      nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};
BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;
  var naf = getNAF(k, w, this._bitLength);
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    for (var l = 0; i >= 0 && naf[i] === 0; i--)
      l++;
    if (i >= 0)
      l++;
    acc = acc.dblp(l);
    if (i < 0)
      break;
    var z = naf[i];
    assert$1(z !== 0);
    if (p.type === "affine") {
      if (z > 0)
        acc = acc.mixedAdd(wnd[z - 1 >> 1]);
      else
        acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
    } else {
      if (z > 0)
        acc = acc.add(wnd[z - 1 >> 1]);
      else
        acc = acc.add(wnd[-z - 1 >> 1].neg());
    }
  }
  return p.type === "affine" ? acc.toP() : acc;
};
BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;
  var max = 0;
  var i;
  var j;
  var p;
  for (i = 0; i < len; i++) {
    p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }
  for (i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }
    var comb = [
      points[a],
      null,
      null,
      points[b]
    ];
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }
    var index2 = [
      -3,
      -1,
      -5,
      -7,
      0,
      7,
      5,
      1,
      3
    ];
    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;
      naf[a][j] = index2[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }
  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (i = max; i >= 0; i--) {
    var k = 0;
    while (i >= 0) {
      var zero = true;
      for (j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;
    for (j = 0; j < len; j++) {
      var z = tmp[j];
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][z - 1 >> 1];
      else if (z < 0)
        p = wnd[j][-z - 1 >> 1].neg();
      if (p.type === "affine")
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  for (i = 0; i < len; i++)
    wnd[i] = null;
  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};
function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;
BasePoint.prototype.eq = function eq() {
  throw new Error("Not implemented");
};
BasePoint.prototype.validate = function validate2() {
  return this.curve.validate(this);
};
BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils_1$1.toArray(bytes, enc);
  var len = this.p.byteLength();
  if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
    if (bytes[0] === 6)
      assert$1(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 7)
      assert$1(bytes[bytes.length - 1] % 2 === 1);
    var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
    return res;
  } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
  }
  throw new Error("Unknown point format");
};
BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};
BasePoint.prototype._encode = function _encode2(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray("be", len);
  if (compact)
    return [this.getY().isEven() ? 2 : 3].concat(x);
  return [4].concat(x, this.getY().toArray("be", len));
};
BasePoint.prototype.encode = function encode(enc, compact) {
  return utils_1$1.encode(this._encode(compact), enc);
};
BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;
  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;
  return this;
};
BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;
  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;
  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};
BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  var doubles = [this];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step,
    points: doubles
  };
};
BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  var res = [this];
  var max = (1 << wnd) - 1;
  var dbl3 = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl3);
  return {
    wnd,
    points: res
  };
};
BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};
BasePoint.prototype.dblp = function dblp(k) {
  var r2 = this;
  for (var i = 0; i < k; i++)
    r2 = r2.dbl();
  return r2;
};
var inherits_browser = createCommonjsModule(function(module) {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});
var assert$2 = utils_1$1.assert;
function ShortCurve(conf) {
  base.call(this, "short", conf);
  this.a = new bn(conf.a, 16).toRed(this.red);
  this.b = new bn(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();
  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits_browser(ShortCurve, base);
var short_1 = ShortCurve;
ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new bn(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new bn(conf.lambda, 16);
  } else {
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new bn(vec.a, 16),
        b: new bn(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }
  return {
    beta,
    lambda,
    basis
  };
};
ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  var red = num === this.p ? this.red : bn.mont(num);
  var tinv = new bn(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();
  var s2 = new bn(3).toRed(red).redNeg().redSqrt().redMul(tinv);
  var l1 = ntinv.redAdd(s2).fromRed();
  var l2 = ntinv.redSub(s2).fromRed();
  return [l1, l2];
};
ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
  var u = lambda;
  var v = this.n.clone();
  var x1 = new bn(1);
  var y1 = new bn(0);
  var x2 = new bn(0);
  var y2 = new bn(1);
  var a0;
  var b0;
  var a1;
  var b1;
  var a2;
  var b2;
  var prevR;
  var i = 0;
  var r2;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r2 = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));
    if (!a1 && r2.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r2.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r2;
    v = u;
    u = r2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r2.neg();
  b2 = x;
  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }
  return [
    {a: a1, b: b1},
    {a: a2, b: b2}
  ];
};
ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];
  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);
  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return {k1, k2};
};
ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new bn(x, 16);
  if (!x.red)
    x = x.toRed(this.red);
  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();
  return this.point(x, y);
};
ShortCurve.prototype.validate = function validate3(point3) {
  if (point3.inf)
    return true;
  var x = point3.x;
  var y = point3.y;
  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};
ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();
    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }
    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};
function Point(curve, x, y, isRed) {
  base.BasePoint.call(this, curve, "affine");
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new bn(x, 16);
    this.y = new bn(y, 16);
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits_browser(Point, base.BasePoint);
ShortCurve.prototype.point = function point2(x, y, isRed) {
  return new Point(this, x, y, isRed);
};
ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};
Point.prototype._getBeta = function _getBeta2() {
  if (!this.curve.endo)
    return;
  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;
  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};
Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [this.x, this.y];
  return [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }];
};
Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === "string")
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;
  function obj2point(obj2) {
    return curve.point(obj2[0], obj2[1], red);
  }
  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [res].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [res].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};
Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return "<EC Point Infinity>";
  return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};
Point.prototype.add = function add(p) {
  if (this.inf)
    return p;
  if (p.inf)
    return this;
  if (this.eq(p))
    return this.dbl();
  if (this.neg().eq(p))
    return this.curve.point(null, null);
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);
  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);
  var a = this.curve.a;
  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point.prototype.getX = function getX() {
  return this.x.fromRed();
};
Point.prototype.getY = function getY() {
  return this.y.fromRed();
};
Point.prototype.mul = function mul(k) {
  k = new bn(k, 16);
  if (this.isInfinity())
    return this;
  else if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([this], [k]);
  else
    return this.curve._wnafMul(this, k);
};
Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};
Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};
Point.prototype.eq = function eq2(p) {
  return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};
Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;
  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};
Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};
function JPoint(curve, x, y, z) {
  base.BasePoint.call(this, curve, "jacobian");
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new bn(0);
  } else {
    this.x = new bn(x, 16);
    this.y = new bn(y, 16);
    this.z = new bn(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);
  this.zOne = this.z === this.curve.one;
}
inherits_browser(JPoint, base.BasePoint);
ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};
JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);
  return this.curve.point(ax, ay);
};
JPoint.prototype.neg = function neg2() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
JPoint.prototype.add = function add2(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));
  var h = u1.redSub(u2);
  var r2 = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r2.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r2.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r2.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mixedAdd = function mixedAdd(p) {
  if (this.isInfinity())
    return p.toJ();
  if (p.isInfinity())
    return this;
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);
  var h = u1.redSub(u2);
  var r2 = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r2.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r2.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r2.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.dblp = function dblp2(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();
  var i;
  if (this.curve.zeroA || this.curve.threeA) {
    var r2 = this;
    for (i = 0; i < pow; i++)
      r2 = r2.dbl();
    return r2;
  }
  var a = this.curve.a;
  var tinv = this.curve.tinv;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jyd = jy.redAdd(jy);
  for (i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);
    jx = nx;
    jz = nz;
    jyd = dny;
  }
  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};
JPoint.prototype.dbl = function dbl2() {
  if (this.isInfinity())
    return this;
  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};
JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m = xx.redAdd(xx).redIAdd(xx);
    var t = m.redSqr().redISub(s2).redISub(s2);
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    nx = t;
    ny = m.redMul(s2.redISub(t)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var a = this.x.redSqr();
    var b = this.y.redSqr();
    var c = b.redSqr();
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    var e = a.redAdd(a).redIAdd(a);
    var f2 = e.redSqr();
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);
    nx = f2.redISub(d).redISub(d);
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    var t = m.redSqr().redISub(s2).redISub(s2);
    nx = t;
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s2.redISub(t)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var delta = this.z.redSqr();
    var gamma = this.y.redSqr();
    var beta = this.x.redMul(gamma);
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();
  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);
  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var xx = this.x.redSqr();
  var yy = this.y.redSqr();
  var zz = this.z.redSqr();
  var yyyy = yy.redSqr();
  var m = xx.redAdd(xx).redIAdd(xx);
  var mm = m.redSqr();
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  var ee = e.redSqr();
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mul = function mul2(k, kbase) {
  k = new bn(k, kbase);
  return this.curve._wnafMul(this, k);
};
JPoint.prototype.eq = function eq3(p) {
  if (p.type === "affine")
    return this.eq(p.toJ());
  if (this === p)
    return true;
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};
JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;
  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (; ; ) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;
    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};
JPoint.prototype.inspect = function inspect2() {
  if (this.isInfinity())
    return "<EC JPoint Infinity>";
  return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
JPoint.prototype.isInfinity = function isInfinity2() {
  return this.z.cmpn(0) === 0;
};
var curve_1 = createCommonjsModule(function(module, exports) {
  var curve = exports;
  curve.base = base;
  curve.short = short_1;
  curve.mont = null;
  curve.edwards = null;
});
var curves_1 = createCommonjsModule(function(module, exports) {
  var curves = exports;
  var assert2 = utils_1$1.assert;
  function PresetCurve(options) {
    if (options.type === "short")
      this.curve = new curve_1.short(options);
    else if (options.type === "edwards")
      this.curve = new curve_1.edwards(options);
    else
      this.curve = new curve_1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;
    assert2(this.g.validate(), "Invalid curve");
    assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  curves.PresetCurve = PresetCurve;
  function defineCurve(name2, options) {
    Object.defineProperty(curves, name2, {
      configurable: true,
      enumerable: true,
      get: function() {
        var curve = new PresetCurve(options);
        Object.defineProperty(curves, name2, {
          configurable: true,
          enumerable: true,
          value: curve
        });
        return curve;
      }
    });
  }
  defineCurve("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: hash_1$1.sha256,
    gRed: false,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  });
  defineCurve("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: hash_1$1.sha256,
    gRed: false,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  });
  defineCurve("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: hash_1$1.sha256,
    gRed: false,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  });
  defineCurve("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: hash_1$1.sha384,
    gRed: false,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  });
  defineCurve("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: hash_1$1.sha512,
    gRed: false,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  });
  defineCurve("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: hash_1$1.sha256,
    gRed: false,
    g: [
      "9"
    ]
  });
  defineCurve("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: hash_1$1.sha256,
    gRed: false,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var pre;
  try {
    pre = null.crash();
  } catch (e) {
    pre = void 0;
  }
  defineCurve("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: hash_1$1.sha256,
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: false,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      pre
    ]
  });
});
function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;
  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;
  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;
  var entropy = utils_1.toArray(options.entropy, options.entropyEnc || "hex");
  var nonce = utils_1.toArray(options.nonce, options.nonceEnc || "hex");
  var pers = utils_1.toArray(options.pers, options.persEnc || "hex");
  minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
  this._init(entropy, nonce, pers);
}
var hmacDrbg = HmacDRBG;
HmacDRBG.prototype._init = function init3(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);
  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0;
    this.V[i] = 1;
  }
  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 281474976710656;
};
HmacDRBG.prototype._hmac = function hmac() {
  return new hash_1$1.hmac(this.hash, this.K);
};
HmacDRBG.prototype._update = function update4(seed) {
  var kmac = this._hmac().update(this.V).update([0]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;
  this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
  this.V = this._hmac().update(this.V).digest();
};
HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add3, addEnc) {
  if (typeof entropyEnc !== "string") {
    addEnc = add3;
    add3 = entropyEnc;
    entropyEnc = null;
  }
  entropy = utils_1.toArray(entropy, entropyEnc);
  add3 = utils_1.toArray(add3, addEnc);
  minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
  this._update(entropy.concat(add3 || []));
  this._reseed = 1;
};
HmacDRBG.prototype.generate = function generate(len, enc, add3, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  if (typeof enc !== "string") {
    addEnc = add3;
    add3 = enc;
    enc = null;
  }
  if (add3) {
    add3 = utils_1.toArray(add3, addEnc || "hex");
    this._update(add3);
  }
  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }
  var res = temp.slice(0, len);
  this._update(add3);
  this._reseed++;
  return utils_1.encode(res, enc);
};
var assert$3 = utils_1$1.assert;
function KeyPair(ec2, options) {
  this.ec = ec2;
  this.priv = null;
  this.pub = null;
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
var key = KeyPair;
KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(ec2, {
    pub,
    pubEnc: enc
  });
};
KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;
  return new KeyPair(ec2, {
    priv,
    privEnc: enc
  });
};
KeyPair.prototype.validate = function validate4() {
  var pub = this.getPublic();
  if (pub.isInfinity())
    return {result: false, reason: "Invalid public key"};
  if (!pub.validate())
    return {result: false, reason: "Public key is not a point"};
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return {result: false, reason: "Public key * N != O"};
  return {result: true, reason: null};
};
KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  if (typeof compact === "string") {
    enc = compact;
    compact = null;
  }
  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);
  if (!enc)
    return this.pub;
  return this.pub.encode(enc, compact);
};
KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === "hex")
    return this.priv.toString(16, 2);
  else
    return this.priv;
};
KeyPair.prototype._importPrivate = function _importPrivate(key2, enc) {
  this.priv = new bn(key2, enc || 16);
  this.priv = this.priv.umod(this.ec.curve.n);
};
KeyPair.prototype._importPublic = function _importPublic(key2, enc) {
  if (key2.x || key2.y) {
    if (this.ec.curve.type === "mont") {
      assert$3(key2.x, "Need x coordinate");
    } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
      assert$3(key2.x && key2.y, "Need both x and y coordinate");
    }
    this.pub = this.ec.curve.point(key2.x, key2.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key2, enc);
};
KeyPair.prototype.derive = function derive(pub) {
  if (!pub.validate()) {
    assert$3(pub.validate(), "public point not validated");
  }
  return pub.mul(this.priv).getX();
};
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};
KeyPair.prototype.verify = function verify(msg, signature2) {
  return this.ec.verify(msg, signature2, this);
};
KeyPair.prototype.inspect = function inspect3() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var assert$4 = utils_1$1.assert;
function Signature(options, enc) {
  if (options instanceof Signature)
    return options;
  if (this._importDER(options, enc))
    return;
  assert$4(options.r && options.s, "Signature without r or s");
  this.r = new bn(options.r, 16);
  this.s = new bn(options.s, 16);
  if (options.recoveryParam === void 0)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
var signature = Signature;
function Position() {
  this.place = 0;
}
function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 128)) {
    return initial;
  }
  var octetLen = initial & 15;
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  }
  if (val <= 127) {
    return false;
  }
  p.place = off;
  return val;
}
function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}
Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils_1$1.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 48) {
    return false;
  }
  var len = getLength(data, p);
  if (len === false) {
    return false;
  }
  if (len + p.place !== data.length) {
    return false;
  }
  if (data[p.place++] !== 2) {
    return false;
  }
  var rlen = getLength(data, p);
  if (rlen === false) {
    return false;
  }
  var r2 = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 2) {
    return false;
  }
  var slen = getLength(data, p);
  if (slen === false) {
    return false;
  }
  if (data.length !== slen + p.place) {
    return false;
  }
  var s2 = data.slice(p.place, slen + p.place);
  if (r2[0] === 0) {
    if (r2[1] & 128) {
      r2 = r2.slice(1);
    } else {
      return false;
    }
  }
  if (s2[0] === 0) {
    if (s2[1] & 128) {
      s2 = s2.slice(1);
    } else {
      return false;
    }
  }
  this.r = new bn(r2);
  this.s = new bn(s2);
  this.recoveryParam = null;
  return true;
};
function constructLength(arr, len) {
  if (len < 128) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 128);
  while (--octets) {
    arr.push(len >>> (octets << 3) & 255);
  }
  arr.push(len);
}
Signature.prototype.toDER = function toDER(enc) {
  var r2 = this.r.toArray();
  var s2 = this.s.toArray();
  if (r2[0] & 128)
    r2 = [0].concat(r2);
  if (s2[0] & 128)
    s2 = [0].concat(s2);
  r2 = rmPadding(r2);
  s2 = rmPadding(s2);
  while (!s2[0] && !(s2[1] & 128)) {
    s2 = s2.slice(1);
  }
  var arr = [2];
  constructLength(arr, r2.length);
  arr = arr.concat(r2);
  arr.push(2);
  constructLength(arr, s2.length);
  var backHalf = arr.concat(s2);
  var res = [48];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils_1$1.encode(res, enc);
};
var rand = function() {
  throw new Error("unsupported");
};
var assert$5 = utils_1$1.assert;
function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);
  if (typeof options === "string") {
    assert$5(Object.prototype.hasOwnProperty.call(curves_1, options), "Unknown curve " + options);
    options = curves_1[options];
  }
  if (options instanceof curves_1.PresetCurve)
    options = {curve: options};
  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);
  this.hash = options.hash || options.curve.hash;
}
var ec = EC;
EC.prototype.keyPair = function keyPair(options) {
  return new key(this, options);
};
EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return key.fromPrivate(this, priv, enc);
};
EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return key.fromPublic(this, pub, enc);
};
EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};
  var drbg = new hmacDrbg({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || "utf8",
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || "utf8",
    nonce: this.n.toArray()
  });
  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new bn(2));
  for (; ; ) {
    var priv = new bn(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;
    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  }
};
EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};
EC.prototype.sign = function sign2(msg, key2, enc, options) {
  if (typeof enc === "object") {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};
  key2 = this.keyFromPrivate(key2, enc);
  msg = this._truncateToN(new bn(msg, 16));
  var bytes = this.n.byteLength();
  var bkey = key2.getPrivate().toArray("be", bytes);
  var nonce = msg.toArray("be", bytes);
  var drbg = new hmacDrbg({
    hash: this.hash,
    entropy: bkey,
    nonce,
    pers: options.pers,
    persEnc: options.persEnc || "utf8"
  });
  var ns1 = this.n.sub(new bn(1));
  for (var iter = 0; ; iter++) {
    var k = options.k ? options.k(iter) : new bn(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;
    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;
    var kpX = kp.getX();
    var r2 = kpX.umod(this.n);
    if (r2.cmpn(0) === 0)
      continue;
    var s2 = k.invm(this.n).mul(r2.mul(key2.getPrivate()).iadd(msg));
    s2 = s2.umod(this.n);
    if (s2.cmpn(0) === 0)
      continue;
    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r2) !== 0 ? 2 : 0);
    if (options.canonical && s2.cmp(this.nh) > 0) {
      s2 = this.n.sub(s2);
      recoveryParam ^= 1;
    }
    return new signature({r: r2, s: s2, recoveryParam});
  }
};
EC.prototype.verify = function verify2(msg, signature$1, key2, enc) {
  msg = this._truncateToN(new bn(msg, 16));
  key2 = this.keyFromPublic(key2, enc);
  signature$1 = new signature(signature$1, "hex");
  var r2 = signature$1.r;
  var s2 = signature$1.s;
  if (r2.cmpn(1) < 0 || r2.cmp(this.n) >= 0)
    return false;
  if (s2.cmpn(1) < 0 || s2.cmp(this.n) >= 0)
    return false;
  var sinv = s2.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r2).umod(this.n);
  var p;
  if (!this.curve._maxwellTrick) {
    p = this.g.mulAdd(u1, key2.getPublic(), u2);
    if (p.isInfinity())
      return false;
    return p.getX().umod(this.n).cmp(r2) === 0;
  }
  p = this.g.jmulAdd(u1, key2.getPublic(), u2);
  if (p.isInfinity())
    return false;
  return p.eqXToP(r2);
};
EC.prototype.recoverPubKey = function(msg, signature$1, j, enc) {
  assert$5((3 & j) === j, "The recovery param is more than two bits");
  signature$1 = new signature(signature$1, enc);
  var n = this.n;
  var e = new bn(msg);
  var r2 = signature$1.r;
  var s2 = signature$1.s;
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r2.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error("Unable to find sencond key candinate");
  if (isSecondKey)
    r2 = this.curve.pointFromX(r2.add(this.curve.n), isYOdd);
  else
    r2 = this.curve.pointFromX(r2, isYOdd);
  var rInv = signature$1.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s22 = s2.mul(rInv).umod(n);
  return this.g.mulAdd(s1, r2, s22);
};
EC.prototype.getKeyRecoveryParam = function(e, signature$1, Q, enc) {
  signature$1 = new signature(signature$1, enc);
  if (signature$1.recoveryParam !== null)
    return signature$1.recoveryParam;
  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature$1, i);
    } catch (e2) {
      continue;
    }
    if (Qprime.eq(Q))
      return i;
  }
  throw new Error("Unable to find valid recovery factor");
};
var elliptic_1 = createCommonjsModule(function(module, exports) {
  var elliptic = exports;
  elliptic.version = {version: "6.5.4"}.version;
  elliptic.utils = utils_1$1;
  elliptic.rand = function() {
    throw new Error("unsupported");
  };
  elliptic.curve = curve_1;
  elliptic.curves = curves_1;
  elliptic.ec = ec;
  elliptic.eddsa = null;
});
var EC$1 = elliptic_1.ec;
const version$7 = "signing-key/5.1.0";
const logger$j = new Logger(version$7);
let _curve = null;
function getCurve() {
  if (!_curve) {
    _curve = new EC$1("secp256k1");
  }
  return _curve;
}
class SigningKey {
  constructor(privateKey) {
    defineReadOnly(this, "curve", "secp256k1");
    defineReadOnly(this, "privateKey", hexlify(privateKey));
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    defineReadOnly(this, "publicKey", "0x" + keyPair2.getPublic(false, "hex"));
    defineReadOnly(this, "compressedPublicKey", "0x" + keyPair2.getPublic(true, "hex"));
    defineReadOnly(this, "_isSigningKey", true);
  }
  _addPoint(other) {
    const p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
    const p1 = getCurve().keyFromPublic(arrayify(other));
    return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
  }
  signDigest(digest17) {
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    const digestBytes = arrayify(digest17);
    if (digestBytes.length !== 32) {
      logger$j.throwArgumentError("bad digest length", "digest", digest17);
    }
    const signature2 = keyPair2.sign(digestBytes, {canonical: true});
    return splitSignature({
      recoveryParam: signature2.recoveryParam,
      r: hexZeroPad("0x" + signature2.r.toString(16), 32),
      s: hexZeroPad("0x" + signature2.s.toString(16), 32)
    });
  }
  computeSharedSecret(otherKey) {
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    const otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
    return hexZeroPad("0x" + keyPair2.derive(otherKeyPair.getPublic()).toString(16), 32);
  }
  static isSigningKey(value) {
    return !!(value && value._isSigningKey);
  }
}
function recoverPublicKey(digest17, signature2) {
  const sig = splitSignature(signature2);
  const rs = {r: arrayify(sig.r), s: arrayify(sig.s)};
  return "0x" + getCurve().recoverPubKey(arrayify(digest17), rs, sig.recoveryParam).encode("hex", false);
}
function computePublicKey(key2, compressed) {
  const bytes = arrayify(key2);
  if (bytes.length === 32) {
    const signingKey = new SigningKey(bytes);
    if (compressed) {
      return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
    }
    return signingKey.publicKey;
  } else if (bytes.length === 33) {
    if (compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
  } else if (bytes.length === 65) {
    if (!compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
  }
  return logger$j.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
const version$6 = "transactions/5.1.0";
const logger$i = new Logger(version$6);
function handleAddress(value) {
  if (value === "0x") {
    return null;
  }
  return getAddress(value);
}
function handleNumber(value) {
  if (value === "0x") {
    return Zero$1;
  }
  return BigNumber.from(value);
}
function computeAddress(key2) {
  const publicKey = computePublicKey(key2);
  return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
}
function recoverAddress(digest17, signature2) {
  return computeAddress(recoverPublicKey(arrayify(digest17), signature2));
}
function formatNumber(value, name2) {
  const result = stripZeros(BigNumber.from(value).toHexString());
  if (result.length > 32) {
    logger$i.throwArgumentError("invalid length for " + name2, "transaction:" + name2, value);
  }
  return result;
}
function accessSetify(addr, storageKeys) {
  return {
    address: getAddress(addr),
    storageKeys: (storageKeys || []).map((storageKey, index2) => {
      if (hexDataLength(storageKey) !== 32) {
        logger$i.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index2}]`, storageKey);
      }
      return storageKey.toLowerCase();
    })
  };
}
function accessListify(value) {
  if (Array.isArray(value)) {
    return value.map((set, index2) => {
      if (Array.isArray(set)) {
        if (set.length > 2) {
          logger$i.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index2}]`, set);
        }
        return accessSetify(set[0], set[1]);
      }
      return accessSetify(set.address, set.storageKeys);
    });
  }
  const result = Object.keys(value).map((addr) => {
    const storageKeys = value[addr].reduce((accum, storageKey) => {
      accum[storageKey] = true;
      return accum;
    }, {});
    return accessSetify(addr, Object.keys(storageKeys).sort());
  });
  result.sort((a, b) => a.address.localeCompare(b.address));
  return result;
}
function formatAccessList(value) {
  return accessListify(value).map((set) => [set.address, set.storageKeys]);
}
function _serializeEip2930(transaction, signature2) {
  const fields = [
    formatNumber(transaction.chainId || 0, "chainId"),
    formatNumber(transaction.nonce || 0, "nonce"),
    formatNumber(transaction.gasPrice || 0, "gasPrice"),
    formatNumber(transaction.gasLimit || 0, "gasLimit"),
    transaction.to != null ? getAddress(transaction.to) : "0x",
    formatNumber(transaction.value || 0, "value"),
    transaction.data || "0x",
    formatAccessList(transaction.accessList || [])
  ];
  if (signature2) {
    const sig = splitSignature(signature2);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push(stripZeros(sig.r));
    fields.push(stripZeros(sig.s));
  }
  return hexConcat(["0x01", encode$2(fields)]);
}
function _parseEip2930(payload) {
  const transaction = decode$1(payload.slice(1));
  if (transaction.length !== 8 && transaction.length !== 11) {
    logger$i.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
  }
  const tx = {
    type: 1,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    gasPrice: handleNumber(transaction[2]),
    gasLimit: handleNumber(transaction[3]),
    to: handleAddress(transaction[4]),
    value: handleNumber(transaction[5]),
    data: transaction[6],
    accessList: accessListify(transaction[7])
  };
  if (transaction.length === 8) {
    return tx;
  }
  try {
    const recid = handleNumber(transaction[8]).toNumber();
    if (recid !== 0 && recid !== 1) {
      throw new Error("bad recid");
    }
    tx.v = recid;
  } catch (error2) {
    logger$i.throwArgumentError("invalid v for transaction type: 1", "v", transaction[8]);
  }
  tx.r = hexZeroPad(transaction[9], 32);
  tx.s = hexZeroPad(transaction[10], 32);
  try {
    const digest17 = keccak256(_serializeEip2930(tx));
    tx.from = recoverAddress(digest17, {r: tx.r, s: tx.s, recoveryParam: tx.v});
  } catch (error2) {
    console.log(error2);
  }
  tx.hash = keccak256(payload);
  return tx;
}
function _parse(rawTransaction) {
  const transaction = decode$1(rawTransaction);
  if (transaction.length !== 9 && transaction.length !== 6) {
    logger$i.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
  }
  const tx = {
    nonce: handleNumber(transaction[0]).toNumber(),
    gasPrice: handleNumber(transaction[1]),
    gasLimit: handleNumber(transaction[2]),
    to: handleAddress(transaction[3]),
    value: handleNumber(transaction[4]),
    data: transaction[5],
    chainId: 0
  };
  if (transaction.length === 6) {
    return tx;
  }
  try {
    tx.v = BigNumber.from(transaction[6]).toNumber();
  } catch (error2) {
    console.log(error2);
    return tx;
  }
  tx.r = hexZeroPad(transaction[7], 32);
  tx.s = hexZeroPad(transaction[8], 32);
  if (BigNumber.from(tx.r).isZero() && BigNumber.from(tx.s).isZero()) {
    tx.chainId = tx.v;
    tx.v = 0;
  } else {
    tx.chainId = Math.floor((tx.v - 35) / 2);
    if (tx.chainId < 0) {
      tx.chainId = 0;
    }
    let recoveryParam = tx.v - 27;
    const raw = transaction.slice(0, 6);
    if (tx.chainId !== 0) {
      raw.push(hexlify(tx.chainId));
      raw.push("0x");
      raw.push("0x");
      recoveryParam -= tx.chainId * 2 + 8;
    }
    const digest17 = keccak256(encode$2(raw));
    try {
      tx.from = recoverAddress(digest17, {r: hexlify(tx.r), s: hexlify(tx.s), recoveryParam});
    } catch (error2) {
      console.log(error2);
    }
    tx.hash = keccak256(rawTransaction);
  }
  tx.type = null;
  return tx;
}
function parse(rawTransaction) {
  const payload = arrayify(rawTransaction);
  if (payload[0] > 127) {
    return _parse(payload);
  }
  switch (payload[0]) {
    case 1:
      return _parseEip2930(payload);
  }
  return logger$i.throwError(`unsupported transaction type: ${payload[0]}`, Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: payload[0]
  });
}
const version$5 = "contracts/5.1.0";
var __awaiter$9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$h = new Logger(version$5);
function resolveName(resolver, nameOrPromise) {
  return __awaiter$9(this, void 0, void 0, function* () {
    const name2 = yield nameOrPromise;
    try {
      return getAddress(name2);
    } catch (error2) {
    }
    if (!resolver) {
      logger$h.throwError("a provider or signer is needed to resolve ENS names", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "resolveName"
      });
    }
    const address = yield resolver.resolveName(name2);
    if (address == null) {
      logger$h.throwArgumentError("resolver or addr is not configured for ENS name", "name", name2);
    }
    return address;
  });
}
function resolveAddresses(resolver, value, paramType) {
  return __awaiter$9(this, void 0, void 0, function* () {
    if (Array.isArray(paramType)) {
      return yield Promise.all(paramType.map((paramType2, index2) => {
        return resolveAddresses(resolver, Array.isArray(value) ? value[index2] : value[paramType2.name], paramType2);
      }));
    }
    if (paramType.type === "address") {
      return yield resolveName(resolver, value);
    }
    if (paramType.type === "tuple") {
      return yield resolveAddresses(resolver, value, paramType.components);
    }
    if (paramType.baseType === "array") {
      if (!Array.isArray(value)) {
        return Promise.reject(new Error("invalid value for array"));
      }
      return yield Promise.all(value.map((v) => resolveAddresses(resolver, v, paramType.arrayChildren)));
    }
    return value;
  });
}
function populateTransaction(contract, fragment, args) {
  return __awaiter$9(this, void 0, void 0, function* () {
    let overrides = {};
    if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      overrides = shallowCopy(args.pop());
    }
    logger$h.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
    if (contract.signer) {
      if (overrides.from) {
        overrides.from = resolveProperties({
          override: resolveName(contract.signer, overrides.from),
          signer: contract.signer.getAddress()
        }).then((check) => __awaiter$9(this, void 0, void 0, function* () {
          if (getAddress(check.signer) !== check.override) {
            logger$h.throwError("Contract with a Signer cannot override from", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "overrides.from"
            });
          }
          return check.override;
        }));
      } else {
        overrides.from = contract.signer.getAddress();
      }
    } else if (overrides.from) {
      overrides.from = resolveName(contract.provider, overrides.from);
    }
    const resolved = yield resolveProperties({
      args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
      address: contract.resolvedAddress,
      overrides: resolveProperties(overrides) || {}
    });
    const data = contract.interface.encodeFunctionData(fragment, resolved.args);
    const tx = {
      data,
      to: resolved.address
    };
    const ro = resolved.overrides;
    if (ro.nonce != null) {
      tx.nonce = BigNumber.from(ro.nonce).toNumber();
    }
    if (ro.gasLimit != null) {
      tx.gasLimit = BigNumber.from(ro.gasLimit);
    }
    if (ro.gasPrice != null) {
      tx.gasPrice = BigNumber.from(ro.gasPrice);
    }
    if (ro.from != null) {
      tx.from = ro.from;
    }
    if (ro.type != null) {
      tx.type = ro.type;
    }
    if (ro.accessList != null) {
      tx.accessList = accessListify(ro.accessList);
    }
    if (tx.gasLimit == null && fragment.gas != null) {
      let intrinsic = 21e3;
      const bytes = arrayify(data);
      for (let i = 0; i < bytes.length; i++) {
        intrinsic += 4;
        if (bytes[i]) {
          intrinsic += 64;
        }
      }
      tx.gasLimit = BigNumber.from(fragment.gas).add(intrinsic);
    }
    if (ro.value) {
      const roValue = BigNumber.from(ro.value);
      if (!roValue.isZero() && !fragment.payable) {
        logger$h.throwError("non-payable method cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: overrides.value
        });
      }
      tx.value = roValue;
    }
    delete overrides.nonce;
    delete overrides.gasLimit;
    delete overrides.gasPrice;
    delete overrides.from;
    delete overrides.value;
    delete overrides.type;
    delete overrides.accessList;
    const leftovers = Object.keys(overrides).filter((key2) => overrides[key2] != null);
    if (leftovers.length) {
      logger$h.throwError(`cannot override ${leftovers.map((l) => JSON.stringify(l)).join(",")}`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides",
        overrides: leftovers
      });
    }
    return tx;
  });
}
function buildPopulate(contract, fragment) {
  return function(...args) {
    return populateTransaction(contract, fragment, args);
  };
}
function buildEstimate(contract, fragment) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter$9(this, void 0, void 0, function* () {
      if (!signerOrProvider) {
        logger$h.throwError("estimate require a provider or signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "estimateGas"
        });
      }
      const tx = yield populateTransaction(contract, fragment, args);
      return yield signerOrProvider.estimateGas(tx);
    });
  };
}
function buildCall(contract, fragment, collapseSimple) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter$9(this, void 0, void 0, function* () {
      let blockTag = void 0;
      if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        const overrides = shallowCopy(args.pop());
        if (overrides.blockTag != null) {
          blockTag = yield overrides.blockTag;
        }
        delete overrides.blockTag;
        args.push(overrides);
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed(blockTag);
      }
      const tx = yield populateTransaction(contract, fragment, args);
      const result = yield signerOrProvider.call(tx, blockTag);
      try {
        let value = contract.interface.decodeFunctionResult(fragment, result);
        if (collapseSimple && fragment.outputs.length === 1) {
          value = value[0];
        }
        return value;
      } catch (error2) {
        if (error2.code === Logger.errors.CALL_EXCEPTION) {
          error2.address = contract.address;
          error2.args = args;
          error2.transaction = tx;
        }
        throw error2;
      }
    });
  };
}
function buildSend(contract, fragment) {
  return function(...args) {
    return __awaiter$9(this, void 0, void 0, function* () {
      if (!contract.signer) {
        logger$h.throwError("sending a transaction requires a signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "sendTransaction"
        });
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed();
      }
      const txRequest = yield populateTransaction(contract, fragment, args);
      const tx = yield contract.signer.sendTransaction(txRequest);
      const wait = tx.wait.bind(tx);
      tx.wait = (confirmations) => {
        return wait(confirmations).then((receipt) => {
          receipt.events = receipt.logs.map((log) => {
            let event = deepCopy(log);
            let parsed = null;
            try {
              parsed = contract.interface.parseLog(log);
            } catch (e) {
            }
            if (parsed) {
              event.args = parsed.args;
              event.decode = (data, topics) => {
                return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
              };
              event.event = parsed.name;
              event.eventSignature = parsed.signature;
            }
            event.removeListener = () => {
              return contract.provider;
            };
            event.getBlock = () => {
              return contract.provider.getBlock(receipt.blockHash);
            };
            event.getTransaction = () => {
              return contract.provider.getTransaction(receipt.transactionHash);
            };
            event.getTransactionReceipt = () => {
              return Promise.resolve(receipt);
            };
            return event;
          });
          return receipt;
        });
      };
      return tx;
    });
  };
}
function buildDefault(contract, fragment, collapseSimple) {
  if (fragment.constant) {
    return buildCall(contract, fragment, collapseSimple);
  }
  return buildSend(contract, fragment);
}
function getEventTag$1(filter) {
  if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
    return "*";
  }
  return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map((topic) => {
    if (Array.isArray(topic)) {
      return topic.join("|");
    }
    return topic;
  }).join(":") : "");
}
class RunningEvent {
  constructor(tag, filter) {
    defineReadOnly(this, "tag", tag);
    defineReadOnly(this, "filter", filter);
    this._listeners = [];
  }
  addListener(listener, once) {
    this._listeners.push({listener, once});
  }
  removeListener(listener) {
    let done = false;
    this._listeners = this._listeners.filter((item) => {
      if (done || item.listener !== listener) {
        return true;
      }
      done = true;
      return false;
    });
  }
  removeAllListeners() {
    this._listeners = [];
  }
  listeners() {
    return this._listeners.map((i) => i.listener);
  }
  listenerCount() {
    return this._listeners.length;
  }
  run(args) {
    const listenerCount = this.listenerCount();
    this._listeners = this._listeners.filter((item) => {
      const argsCopy = args.slice();
      setTimeout(() => {
        item.listener.apply(this, argsCopy);
      }, 0);
      return !item.once;
    });
    return listenerCount;
  }
  prepareEvent(event) {
  }
  getEmit(event) {
    return [event];
  }
}
class ErrorRunningEvent extends RunningEvent {
  constructor() {
    super("error", null);
  }
}
class FragmentRunningEvent extends RunningEvent {
  constructor(address, contractInterface, fragment, topics) {
    const filter = {
      address
    };
    let topic = contractInterface.getEventTopic(fragment);
    if (topics) {
      if (topic !== topics[0]) {
        logger$h.throwArgumentError("topic mismatch", "topics", topics);
      }
      filter.topics = topics.slice();
    } else {
      filter.topics = [topic];
    }
    super(getEventTag$1(filter), filter);
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "interface", contractInterface);
    defineReadOnly(this, "fragment", fragment);
  }
  prepareEvent(event) {
    super.prepareEvent(event);
    event.event = this.fragment.name;
    event.eventSignature = this.fragment.format();
    event.decode = (data, topics) => {
      return this.interface.decodeEventLog(this.fragment, data, topics);
    };
    try {
      event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
    } catch (error2) {
      event.args = null;
      event.decodeError = error2;
    }
  }
  getEmit(event) {
    const errors = checkResultErrors(event.args);
    if (errors.length) {
      throw errors[0].error;
    }
    const args = (event.args || []).slice();
    args.push(event);
    return args;
  }
}
class WildcardRunningEvent extends RunningEvent {
  constructor(address, contractInterface) {
    super("*", {address});
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "interface", contractInterface);
  }
  prepareEvent(event) {
    super.prepareEvent(event);
    try {
      const parsed = this.interface.parseLog(event);
      event.event = parsed.name;
      event.eventSignature = parsed.signature;
      event.decode = (data, topics) => {
        return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
      };
      event.args = parsed.args;
    } catch (error2) {
    }
  }
}
class BaseContract {
  constructor(addressOrName, contractInterface, signerOrProvider) {
    logger$h.checkNew(new.target, Contract);
    defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
    if (signerOrProvider == null) {
      defineReadOnly(this, "provider", null);
      defineReadOnly(this, "signer", null);
    } else if (Signer.isSigner(signerOrProvider)) {
      defineReadOnly(this, "provider", signerOrProvider.provider || null);
      defineReadOnly(this, "signer", signerOrProvider);
    } else if (Provider.isProvider(signerOrProvider)) {
      defineReadOnly(this, "provider", signerOrProvider);
      defineReadOnly(this, "signer", null);
    } else {
      logger$h.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
    }
    defineReadOnly(this, "callStatic", {});
    defineReadOnly(this, "estimateGas", {});
    defineReadOnly(this, "functions", {});
    defineReadOnly(this, "populateTransaction", {});
    defineReadOnly(this, "filters", {});
    {
      const uniqueFilters = {};
      Object.keys(this.interface.events).forEach((eventSignature) => {
        const event = this.interface.events[eventSignature];
        defineReadOnly(this.filters, eventSignature, (...args) => {
          return {
            address: this.address,
            topics: this.interface.encodeFilterTopics(event, args)
          };
        });
        if (!uniqueFilters[event.name]) {
          uniqueFilters[event.name] = [];
        }
        uniqueFilters[event.name].push(eventSignature);
      });
      Object.keys(uniqueFilters).forEach((name2) => {
        const filters = uniqueFilters[name2];
        if (filters.length === 1) {
          defineReadOnly(this.filters, name2, this.filters[filters[0]]);
        } else {
          logger$h.warn(`Duplicate definition of ${name2} (${filters.join(", ")})`);
        }
      });
    }
    defineReadOnly(this, "_runningEvents", {});
    defineReadOnly(this, "_wrappedEmits", {});
    if (addressOrName == null) {
      logger$h.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
    }
    defineReadOnly(this, "address", addressOrName);
    if (this.provider) {
      defineReadOnly(this, "resolvedAddress", resolveName(this.provider, addressOrName));
    } else {
      try {
        defineReadOnly(this, "resolvedAddress", Promise.resolve(getAddress(addressOrName)));
      } catch (error2) {
        logger$h.throwError("provider is required to use ENS name as contract address", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new Contract"
        });
      }
    }
    const uniqueNames = {};
    const uniqueSignatures = {};
    Object.keys(this.interface.functions).forEach((signature2) => {
      const fragment = this.interface.functions[signature2];
      if (uniqueSignatures[signature2]) {
        logger$h.warn(`Duplicate ABI entry for ${JSON.stringify(name)}`);
        return;
      }
      uniqueSignatures[signature2] = true;
      {
        const name2 = fragment.name;
        if (!uniqueNames[name2]) {
          uniqueNames[name2] = [];
        }
        uniqueNames[name2].push(signature2);
      }
      if (this[signature2] == null) {
        defineReadOnly(this, signature2, buildDefault(this, fragment, true));
      }
      if (this.functions[signature2] == null) {
        defineReadOnly(this.functions, signature2, buildDefault(this, fragment, false));
      }
      if (this.callStatic[signature2] == null) {
        defineReadOnly(this.callStatic, signature2, buildCall(this, fragment, true));
      }
      if (this.populateTransaction[signature2] == null) {
        defineReadOnly(this.populateTransaction, signature2, buildPopulate(this, fragment));
      }
      if (this.estimateGas[signature2] == null) {
        defineReadOnly(this.estimateGas, signature2, buildEstimate(this, fragment));
      }
    });
    Object.keys(uniqueNames).forEach((name2) => {
      const signatures = uniqueNames[name2];
      if (signatures.length > 1) {
        return;
      }
      const signature2 = signatures[0];
      try {
        if (this[name2] == null) {
          defineReadOnly(this, name2, this[signature2]);
        }
      } catch (e) {
      }
      if (this.functions[name2] == null) {
        defineReadOnly(this.functions, name2, this.functions[signature2]);
      }
      if (this.callStatic[name2] == null) {
        defineReadOnly(this.callStatic, name2, this.callStatic[signature2]);
      }
      if (this.populateTransaction[name2] == null) {
        defineReadOnly(this.populateTransaction, name2, this.populateTransaction[signature2]);
      }
      if (this.estimateGas[name2] == null) {
        defineReadOnly(this.estimateGas, name2, this.estimateGas[signature2]);
      }
    });
  }
  static getContractAddress(transaction) {
    return getContractAddress(transaction);
  }
  static getInterface(contractInterface) {
    if (Interface.isInterface(contractInterface)) {
      return contractInterface;
    }
    return new Interface(contractInterface);
  }
  deployed() {
    return this._deployed();
  }
  _deployed(blockTag) {
    if (!this._deployedPromise) {
      if (this.deployTransaction) {
        this._deployedPromise = this.deployTransaction.wait().then(() => {
          return this;
        });
      } else {
        this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
          if (code === "0x") {
            logger$h.throwError("contract not deployed", Logger.errors.UNSUPPORTED_OPERATION, {
              contractAddress: this.address,
              operation: "getDeployed"
            });
          }
          return this;
        });
      }
    }
    return this._deployedPromise;
  }
  fallback(overrides) {
    if (!this.signer) {
      logger$h.throwError("sending a transactions require a signer", Logger.errors.UNSUPPORTED_OPERATION, {operation: "sendTransaction(fallback)"});
    }
    const tx = shallowCopy(overrides || {});
    ["from", "to"].forEach(function(key2) {
      if (tx[key2] == null) {
        return;
      }
      logger$h.throwError("cannot override " + key2, Logger.errors.UNSUPPORTED_OPERATION, {operation: key2});
    });
    tx.to = this.resolvedAddress;
    return this.deployed().then(() => {
      return this.signer.sendTransaction(tx);
    });
  }
  connect(signerOrProvider) {
    if (typeof signerOrProvider === "string") {
      signerOrProvider = new VoidSigner(signerOrProvider, this.provider);
    }
    const contract = new this.constructor(this.address, this.interface, signerOrProvider);
    if (this.deployTransaction) {
      defineReadOnly(contract, "deployTransaction", this.deployTransaction);
    }
    return contract;
  }
  attach(addressOrName) {
    return new this.constructor(addressOrName, this.interface, this.signer || this.provider);
  }
  static isIndexed(value) {
    return Indexed.isIndexed(value);
  }
  _normalizeRunningEvent(runningEvent) {
    if (this._runningEvents[runningEvent.tag]) {
      return this._runningEvents[runningEvent.tag];
    }
    return runningEvent;
  }
  _getRunningEvent(eventName) {
    if (typeof eventName === "string") {
      if (eventName === "error") {
        return this._normalizeRunningEvent(new ErrorRunningEvent());
      }
      if (eventName === "event") {
        return this._normalizeRunningEvent(new RunningEvent("event", null));
      }
      if (eventName === "*") {
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
      }
      const fragment = this.interface.getEvent(eventName);
      return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
    }
    if (eventName.topics && eventName.topics.length > 0) {
      try {
        const topic = eventName.topics[0];
        if (typeof topic !== "string") {
          throw new Error("invalid topic");
        }
        const fragment = this.interface.getEvent(topic);
        return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
      } catch (error2) {
      }
      const filter = {
        address: this.address,
        topics: eventName.topics
      };
      return this._normalizeRunningEvent(new RunningEvent(getEventTag$1(filter), filter));
    }
    return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
  }
  _checkRunningEvents(runningEvent) {
    if (runningEvent.listenerCount() === 0) {
      delete this._runningEvents[runningEvent.tag];
      const emit = this._wrappedEmits[runningEvent.tag];
      if (emit) {
        this.provider.off(runningEvent.filter, emit);
        delete this._wrappedEmits[runningEvent.tag];
      }
    }
  }
  _wrapEvent(runningEvent, log, listener) {
    const event = deepCopy(log);
    event.removeListener = () => {
      if (!listener) {
        return;
      }
      runningEvent.removeListener(listener);
      this._checkRunningEvents(runningEvent);
    };
    event.getBlock = () => {
      return this.provider.getBlock(log.blockHash);
    };
    event.getTransaction = () => {
      return this.provider.getTransaction(log.transactionHash);
    };
    event.getTransactionReceipt = () => {
      return this.provider.getTransactionReceipt(log.transactionHash);
    };
    runningEvent.prepareEvent(event);
    return event;
  }
  _addEventListener(runningEvent, listener, once) {
    if (!this.provider) {
      logger$h.throwError("events require a provider or a signer with a provider", Logger.errors.UNSUPPORTED_OPERATION, {operation: "once"});
    }
    runningEvent.addListener(listener, once);
    this._runningEvents[runningEvent.tag] = runningEvent;
    if (!this._wrappedEmits[runningEvent.tag]) {
      const wrappedEmit = (log) => {
        let event = this._wrapEvent(runningEvent, log, listener);
        if (event.decodeError == null) {
          try {
            const args = runningEvent.getEmit(event);
            this.emit(runningEvent.filter, ...args);
          } catch (error2) {
            event.decodeError = error2.error;
          }
        }
        if (runningEvent.filter != null) {
          this.emit("event", event);
        }
        if (event.decodeError != null) {
          this.emit("error", event.decodeError, event);
        }
      };
      this._wrappedEmits[runningEvent.tag] = wrappedEmit;
      if (runningEvent.filter != null) {
        this.provider.on(runningEvent.filter, wrappedEmit);
      }
    }
  }
  queryFilter(event, fromBlockOrBlockhash, toBlock) {
    const runningEvent = this._getRunningEvent(event);
    const filter = shallowCopy(runningEvent.filter);
    if (typeof fromBlockOrBlockhash === "string" && isHexString(fromBlockOrBlockhash, 32)) {
      if (toBlock != null) {
        logger$h.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
      }
      filter.blockHash = fromBlockOrBlockhash;
    } else {
      filter.fromBlock = fromBlockOrBlockhash != null ? fromBlockOrBlockhash : 0;
      filter.toBlock = toBlock != null ? toBlock : "latest";
    }
    return this.provider.getLogs(filter).then((logs) => {
      return logs.map((log) => this._wrapEvent(runningEvent, log, null));
    });
  }
  on(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, false);
    return this;
  }
  once(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, true);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.provider) {
      return false;
    }
    const runningEvent = this._getRunningEvent(eventName);
    const result = runningEvent.run(args) > 0;
    this._checkRunningEvents(runningEvent);
    return result;
  }
  listenerCount(eventName) {
    if (!this.provider) {
      return 0;
    }
    if (eventName == null) {
      return Object.keys(this._runningEvents).reduce((accum, key2) => {
        return accum + this._runningEvents[key2].listenerCount();
      }, 0);
    }
    return this._getRunningEvent(eventName).listenerCount();
  }
  listeners(eventName) {
    if (!this.provider) {
      return [];
    }
    if (eventName == null) {
      const result = [];
      for (let tag in this._runningEvents) {
        this._runningEvents[tag].listeners().forEach((listener) => {
          result.push(listener);
        });
      }
      return result;
    }
    return this._getRunningEvent(eventName).listeners();
  }
  removeAllListeners(eventName) {
    if (!this.provider) {
      return this;
    }
    if (eventName == null) {
      for (const tag in this._runningEvents) {
        const runningEvent2 = this._runningEvents[tag];
        runningEvent2.removeAllListeners();
        this._checkRunningEvents(runningEvent2);
      }
      return this;
    }
    const runningEvent = this._getRunningEvent(eventName);
    runningEvent.removeAllListeners();
    this._checkRunningEvents(runningEvent);
    return this;
  }
  off(eventName, listener) {
    if (!this.provider) {
      return this;
    }
    const runningEvent = this._getRunningEvent(eventName);
    runningEvent.removeListener(listener);
    this._checkRunningEvents(runningEvent);
    return this;
  }
  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }
}
class Contract extends BaseContract {
}
class BaseX {
  constructor(alphabet) {
    defineReadOnly(this, "alphabet", alphabet);
    defineReadOnly(this, "base", alphabet.length);
    defineReadOnly(this, "_alphabetMap", {});
    defineReadOnly(this, "_leader", alphabet.charAt(0));
    for (let i = 0; i < alphabet.length; i++) {
      this._alphabetMap[alphabet.charAt(i)] = i;
    }
  }
  encode(value) {
    let source = arrayify(value);
    if (source.length === 0) {
      return "";
    }
    let digits = [0];
    for (let i = 0; i < source.length; ++i) {
      let carry = source[i];
      for (let j = 0; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % this.base;
        carry = carry / this.base | 0;
      }
      while (carry > 0) {
        digits.push(carry % this.base);
        carry = carry / this.base | 0;
      }
    }
    let string = "";
    for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
      string += this._leader;
    }
    for (let q = digits.length - 1; q >= 0; --q) {
      string += this.alphabet[digits[q]];
    }
    return string;
  }
  decode(value) {
    if (typeof value !== "string") {
      throw new TypeError("Expected String");
    }
    let bytes = [];
    if (value.length === 0) {
      return new Uint8Array(bytes);
    }
    bytes.push(0);
    for (let i = 0; i < value.length; i++) {
      let byte = this._alphabetMap[value[i]];
      if (byte === void 0) {
        throw new Error("Non-base" + this.base + " character");
      }
      let carry = byte;
      for (let j = 0; j < bytes.length; ++j) {
        carry += bytes[j] * this.base;
        bytes[j] = carry & 255;
        carry >>= 8;
      }
      while (carry > 0) {
        bytes.push(carry & 255);
        carry >>= 8;
      }
    }
    for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
      bytes.push(0);
    }
    return arrayify(new Uint8Array(bytes.reverse()));
  }
}
new BaseX("abcdefghijklmnopqrstuvwxyz234567");
const Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var inherits_1 = inherits_browser$1;
function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === "string") {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 255;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
var toArray_1 = toArray;
function toHex(msg) {
  var res = "";
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
var toHex_1 = toHex;
function htonl(w) {
  var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
  return res >>> 0;
}
var htonl_1 = htonl;
function toHex32(msg, endian) {
  var res = "";
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === "little")
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
var toHex32_1 = toHex32;
function zero2(word) {
  if (word.length === 1)
    return "0" + word;
  else
    return word;
}
var zero2_1 = zero2;
function zero8(word) {
  if (word.length === 7)
    return "0" + word;
  else if (word.length === 6)
    return "00" + word;
  else if (word.length === 5)
    return "000" + word;
  else if (word.length === 4)
    return "0000" + word;
  else if (word.length === 3)
    return "00000" + word;
  else if (word.length === 2)
    return "000000" + word;
  else if (word.length === 1)
    return "0000000" + word;
  else
    return word;
}
var zero8_1 = zero8;
function join32(msg, start, end, endian) {
  var len = end - start;
  minimalisticAssert$1(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === "big")
      w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
    else
      w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
var join32_1 = join32;
function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === "big") {
      res[k] = m >>> 24;
      res[k + 1] = m >>> 16 & 255;
      res[k + 2] = m >>> 8 & 255;
      res[k + 3] = m & 255;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = m >>> 16 & 255;
      res[k + 1] = m >>> 8 & 255;
      res[k] = m & 255;
    }
  }
  return res;
}
var split32_1 = split32;
function rotr32$1(w, b) {
  return w >>> b | w << 32 - b;
}
var rotr32_1 = rotr32$1;
function rotl32$2(w, b) {
  return w << b | w >>> 32 - b;
}
var rotl32_1 = rotl32$2;
function sum32$3(a, b) {
  return a + b >>> 0;
}
var sum32_1 = sum32$3;
function sum32_3$1(a, b, c) {
  return a + b + c >>> 0;
}
var sum32_3_1 = sum32_3$1;
function sum32_4$2(a, b, c, d) {
  return a + b + c + d >>> 0;
}
var sum32_4_1 = sum32_4$2;
function sum32_5$2(a, b, c, d, e) {
  return a + b + c + d + e >>> 0;
}
var sum32_5_1 = sum32_5$2;
function sum64$1(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
var sum64_1 = sum64$1;
function sum64_hi$1(ah, al, bh, bl) {
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
var sum64_hi_1 = sum64_hi$1;
function sum64_lo$1(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
var sum64_lo_1 = sum64_lo$1;
function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
var sum64_4_hi_1 = sum64_4_hi$1;
function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
var sum64_4_lo_1 = sum64_4_lo$1;
function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = lo + el >>> 0;
  carry += lo < el ? 1 : 0;
  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
var sum64_5_hi_1 = sum64_5_hi$1;
function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;
  return lo >>> 0;
}
var sum64_5_lo_1 = sum64_5_lo$1;
function rotr64_hi$1(ah, al, num) {
  var r2 = al << 32 - num | ah >>> num;
  return r2 >>> 0;
}
var rotr64_hi_1 = rotr64_hi$1;
function rotr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
var rotr64_lo_1 = rotr64_lo$1;
function shr64_hi$1(ah, al, num) {
  return ah >>> num;
}
var shr64_hi_1 = shr64_hi$1;
function shr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
var shr64_lo_1 = shr64_lo$1;
var utils = {
  inherits: inherits_1,
  toArray: toArray_1,
  toHex: toHex_1,
  htonl: htonl_1,
  toHex32: toHex32_1,
  zero2: zero2_1,
  zero8: zero8_1,
  join32: join32_1,
  split32: split32_1,
  rotr32: rotr32_1,
  rotl32: rotl32_1,
  sum32: sum32_1,
  sum32_3: sum32_3_1,
  sum32_4: sum32_4_1,
  sum32_5: sum32_5_1,
  sum64: sum64_1,
  sum64_hi: sum64_hi_1,
  sum64_lo: sum64_lo_1,
  sum64_4_hi: sum64_4_hi_1,
  sum64_4_lo: sum64_4_lo_1,
  sum64_5_hi: sum64_5_hi_1,
  sum64_5_lo: sum64_5_lo_1,
  rotr64_hi: rotr64_hi_1,
  rotr64_lo: rotr64_lo_1,
  shr64_hi: shr64_hi_1,
  shr64_lo: shr64_lo_1
};
function BlockHash$4() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = "big";
  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
var BlockHash_1 = BlockHash$4;
BlockHash$4.prototype.update = function update5(msg, enc) {
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;
  if (this.pending.length >= this._delta8) {
    msg = this.pending;
    var r2 = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r2, msg.length);
    if (this.pending.length === 0)
      this.pending = null;
    msg = utils.join32(msg, 0, msg.length - r2, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }
  return this;
};
BlockHash$4.prototype.digest = function digest9(enc) {
  this.update(this._pad());
  minimalisticAssert$1(this.pending === null);
  return this._digest(enc);
};
BlockHash$4.prototype._pad = function pad2() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - (len + this.padLength) % bytes;
  var res = new Array(k + this.padLength);
  res[0] = 128;
  for (var i = 1; i < k; i++)
    res[i] = 0;
  len <<= 3;
  if (this.endian === "big") {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = len >>> 24 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len & 255;
  } else {
    res[i++] = len & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 24 & 255;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }
  return res;
};
var common$1 = {
  BlockHash: BlockHash_1
};
var rotr32 = utils.rotr32;
function ft_1$1(s2, x, y, z) {
  if (s2 === 0)
    return ch32$1(x, y, z);
  if (s2 === 1 || s2 === 3)
    return p32(x, y, z);
  if (s2 === 2)
    return maj32$1(x, y, z);
}
var ft_1_1 = ft_1$1;
function ch32$1(x, y, z) {
  return x & y ^ ~x & z;
}
var ch32_1 = ch32$1;
function maj32$1(x, y, z) {
  return x & y ^ x & z ^ y & z;
}
var maj32_1 = maj32$1;
function p32(x, y, z) {
  return x ^ y ^ z;
}
var p32_1 = p32;
function s0_256$1(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
var s0_256_1 = s0_256$1;
function s1_256$1(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
var s1_256_1 = s1_256$1;
function g0_256$1(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
}
var g0_256_1 = g0_256$1;
function g1_256$1(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
}
var g1_256_1 = g1_256$1;
var common = {
  ft_1: ft_1_1,
  ch32: ch32_1,
  maj32: maj32_1,
  p32: p32_1,
  s0_256: s0_256_1,
  s1_256: s1_256_1,
  g0_256: g0_256_1,
  g1_256: g1_256_1
};
var rotl32$1 = utils.rotl32;
var sum32$2 = utils.sum32;
var sum32_5$1 = utils.sum32_5;
var ft_1 = common.ft_1;
var BlockHash$3 = common$1.BlockHash;
var sha1_K = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();
  BlockHash$3.call(this);
  this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ];
  this.W = new Array(80);
}
utils.inherits(SHA1, BlockHash$3);
var _1 = SHA1;
SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;
SHA1.prototype._update = function _update4(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  for (i = 0; i < W.length; i++) {
    var s2 = ~~(i / 20);
    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s2, b, c, d), e, W[i], sha1_K[s2]);
    e = d;
    d = c;
    c = rotl32$1(b, 30);
    b = a;
    a = t;
  }
  this.h[0] = sum32$2(this.h[0], a);
  this.h[1] = sum32$2(this.h[1], b);
  this.h[2] = sum32$2(this.h[2], c);
  this.h[3] = sum32$2(this.h[3], d);
  this.h[4] = sum32$2(this.h[4], e);
};
SHA1.prototype._digest = function digest10(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h, "big");
  else
    return utils.split32(this.h, "big");
};
var sum32$1 = utils.sum32;
var sum32_4$1 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = common.ch32;
var maj32 = common.maj32;
var s0_256 = common.s0_256;
var s1_256 = common.s1_256;
var g0_256 = common.g0_256;
var g1_256 = common.g1_256;
var BlockHash$2 = common$1.BlockHash;
var sha256_K = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();
  BlockHash$2.call(this);
  this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash$2);
var _256 = SHA256;
SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;
SHA256.prototype._update = function _update5(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f2 = this.h[5];
  var g = this.h[6];
  var h = this.h[7];
  minimalisticAssert$1(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f2, g), this.k[i], W[i]);
    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
    h = g;
    g = f2;
    f2 = e;
    e = sum32$1(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$1(T1, T2);
  }
  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
  this.h[5] = sum32$1(this.h[5], f2);
  this.h[6] = sum32$1(this.h[6], g);
  this.h[7] = sum32$1(this.h[7], h);
};
SHA256.prototype._digest = function digest11(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h, "big");
  else
    return utils.split32(this.h, "big");
};
function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();
  _256.call(this);
  this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
utils.inherits(SHA224, _256);
var _224 = SHA224;
SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;
SHA224.prototype._digest = function digest12(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h.slice(0, 7), "big");
  else
    return utils.split32(this.h.slice(0, 7), "big");
};
var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;
var BlockHash$1 = common$1.BlockHash;
var sha512_K = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();
  BlockHash$1.call(this);
  this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash$1);
var _512 = SHA512;
SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;
SHA512.prototype._prepareBlock = function _prepareBlock2(msg, start) {
  var W = this.W;
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];
    var c3_lo = W[i - 31];
    W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
  }
};
SHA512.prototype._update = function _update6(msg, start) {
  this._prepareBlock(msg, start);
  var W = this.W;
  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];
  minimalisticAssert$1(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];
    var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);
    dh = ch;
    dl = cl;
    ch = bh;
    cl = bl;
    bh = ah;
    bl = al;
    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }
  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};
SHA512.prototype._digest = function digest13(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h, "big");
  else
    return utils.split32(this.h, "big");
};
function ch64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ ~xh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ ~xl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ xh & zh ^ yh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ xl & zl ^ yl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);
  var c2_hi = rotr64_hi(xl, xh, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);
  var c2_lo = rotr64_lo(xl, xh, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);
  var c2_hi = shr64_hi(xh, xl, 6);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);
  var c2_lo = shr64_lo(xh, xl, 6);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();
  _512.call(this);
  this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
utils.inherits(SHA384, _512);
var _384 = SHA384;
SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;
SHA384.prototype._digest = function digest14(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h.slice(0, 12), "big");
  else
    return utils.split32(this.h.slice(0, 12), "big");
};
var sha1 = _1;
var sha224 = _224;
var sha256$1 = _256;
var sha384 = _384;
var sha512 = _512;
var sha = {
  sha1,
  sha224,
  sha256: sha256$1,
  sha384,
  sha512
};
var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common$1.BlockHash;
function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();
  BlockHash.call(this);
  this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  this.endian = "little";
}
utils.inherits(RIPEMD160, BlockHash);
var ripemd160 = RIPEMD160;
RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;
RIPEMD160.prototype._update = function update6(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};
RIPEMD160.prototype._digest = function digest15(enc) {
  if (enc === "hex")
    return utils.toHex32(this.h, "little");
  else
    return utils.split32(this.h, "little");
};
function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return x & y | ~x & z;
  else if (j <= 47)
    return (x | ~y) ^ z;
  else if (j <= 63)
    return x & z | y & ~z;
  else
    return x ^ (y | ~z);
}
function K(j) {
  if (j <= 15)
    return 0;
  else if (j <= 31)
    return 1518500249;
  else if (j <= 47)
    return 1859775393;
  else if (j <= 63)
    return 2400959708;
  else
    return 2840853838;
}
function Kh(j) {
  if (j <= 15)
    return 1352829926;
  else if (j <= 31)
    return 1548603684;
  else if (j <= 47)
    return 1836072691;
  else if (j <= 63)
    return 2053994217;
  else
    return 0;
}
var r = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
];
var rh = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
];
var s = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
];
var sh = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
];
var ripemd = {
  ripemd160
};
function Hmac(hash, key2, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key2, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;
  this._init(utils.toArray(key2, enc));
}
var hmac2 = Hmac;
Hmac.prototype._init = function init4(key2) {
  if (key2.length > this.blockSize)
    key2 = new this.Hash().update(key2).digest();
  minimalisticAssert$1(key2.length <= this.blockSize);
  for (var i = key2.length; i < this.blockSize; i++)
    key2.push(0);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 54;
  this.inner = new this.Hash().update(key2);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 106;
  this.outer = new this.Hash().update(key2);
};
Hmac.prototype.update = function update7(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};
Hmac.prototype.digest = function digest16(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};
var hash_1 = createCommonjsModule$1(function(module, exports) {
  var hash = exports;
  hash.utils = utils;
  hash.common = common$1;
  hash.sha = sha;
  hash.ripemd = ripemd;
  hash.hmac = hmac2;
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
});
const version$4 = "sha2/5.1.0";
new Logger(version$4);
function sha256(data) {
  return "0x" + hash_1.sha256().update(arrayify(data)).digest("hex");
}
function shuffled(array) {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}
const version$3 = "networks/5.1.0";
const logger$g = new Logger(version$3);
function isRenetworkable(value) {
  return value && typeof value.renetwork === "function";
}
function ethDefaultProvider(network) {
  const func = function(providers, options) {
    if (options == null) {
      options = {};
    }
    const providerList = [];
    if (providers.InfuraProvider) {
      try {
        providerList.push(new providers.InfuraProvider(network, options.infura));
      } catch (error2) {
      }
    }
    if (providers.EtherscanProvider) {
      try {
        providerList.push(new providers.EtherscanProvider(network, options.etherscan));
      } catch (error2) {
      }
    }
    if (providers.AlchemyProvider) {
      const skip = ["goerli", "ropsten", "rinkeby"];
      try {
        const provider = new providers.AlchemyProvider(network, options.alchemy);
        if (provider.network && skip.indexOf(provider.network.name) === -1) {
          providerList.push(provider);
        }
      } catch (error2) {
      }
    }
    if (providers.PocketProvider) {
      const skip = ["goerli", "ropsten", "rinkeby"];
      try {
        const provider = new providers.PocketProvider(network);
        if (provider.network && skip.indexOf(provider.network.name) === -1) {
          providerList.push(provider);
        }
      } catch (error2) {
      }
    }
    if (providers.CloudflareProvider) {
      try {
        providerList.push(new providers.CloudflareProvider(network));
      } catch (error2) {
      }
    }
    if (providerList.length === 0) {
      return null;
    }
    if (providers.FallbackProvider) {
      let quorum = 1;
      if (options.quorum != null) {
        quorum = options.quorum;
      } else if (network === "homestead") {
        quorum = 2;
      }
      return new providers.FallbackProvider(providerList, quorum);
    }
    return providerList[0];
  };
  func.renetwork = function(network2) {
    return ethDefaultProvider(network2);
  };
  return func;
}
function etcDefaultProvider(url2, network) {
  const func = function(providers, options) {
    if (providers.JsonRpcProvider) {
      return new providers.JsonRpcProvider(url2, network);
    }
    return null;
  };
  func.renetwork = function(network2) {
    return etcDefaultProvider(url2, network2);
  };
  return func;
}
const homestead = {
  chainId: 1,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "homestead",
  _defaultProvider: ethDefaultProvider("homestead")
};
const ropsten = {
  chainId: 3,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "ropsten",
  _defaultProvider: ethDefaultProvider("ropsten")
};
const classicMordor = {
  chainId: 63,
  name: "classicMordor",
  _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
};
const networks = {
  unspecified: {
    chainId: 0,
    name: "unspecified"
  },
  homestead,
  mainnet: homestead,
  morden: {
    chainId: 2,
    name: "morden"
  },
  ropsten,
  testnet: ropsten,
  rinkeby: {
    chainId: 4,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "rinkeby",
    _defaultProvider: ethDefaultProvider("rinkeby")
  },
  kovan: {
    chainId: 42,
    name: "kovan",
    _defaultProvider: ethDefaultProvider("kovan")
  },
  goerli: {
    chainId: 5,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "goerli",
    _defaultProvider: ethDefaultProvider("goerli")
  },
  classic: {
    chainId: 61,
    name: "classic",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/etc", "classic")
  },
  classicMorden: {
    chainId: 62,
    name: "classicMorden"
  },
  classicMordor,
  classicTestnet: classicMordor,
  classicKotti: {
    chainId: 6,
    name: "classicKotti",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/kotti", "classicKotti")
  }
};
function getNetwork(network) {
  if (network == null) {
    return null;
  }
  if (typeof network === "number") {
    for (const name2 in networks) {
      const standard2 = networks[name2];
      if (standard2.chainId === network) {
        return {
          name: standard2.name,
          chainId: standard2.chainId,
          ensAddress: standard2.ensAddress || null,
          _defaultProvider: standard2._defaultProvider || null
        };
      }
    }
    return {
      chainId: network,
      name: "unknown"
    };
  }
  if (typeof network === "string") {
    const standard2 = networks[network];
    if (standard2 == null) {
      return null;
    }
    return {
      name: standard2.name,
      chainId: standard2.chainId,
      ensAddress: standard2.ensAddress,
      _defaultProvider: standard2._defaultProvider || null
    };
  }
  const standard = networks[network.name];
  if (!standard) {
    if (typeof network.chainId !== "number") {
      logger$g.throwArgumentError("invalid network chainId", "network", network);
    }
    return network;
  }
  if (network.chainId !== 0 && network.chainId !== standard.chainId) {
    logger$g.throwArgumentError("network chainId mismatch", "network", network);
  }
  let defaultProvider = network._defaultProvider || null;
  if (defaultProvider == null && standard._defaultProvider) {
    if (isRenetworkable(standard._defaultProvider)) {
      defaultProvider = standard._defaultProvider.renetwork(network);
    } else {
      defaultProvider = standard._defaultProvider;
    }
  }
  return {
    name: network.name,
    chainId: standard.chainId,
    ensAddress: network.ensAddress || standard.ensAddress || null,
    _defaultProvider: defaultProvider
  };
}
function encode$1(data) {
  data = arrayify(data);
  let textData = "";
  for (let i = 0; i < data.length; i++) {
    textData += String.fromCharCode(data[i]);
  }
  return btoa(textData);
}
const version$2 = "web/5.1.0";
var __awaiter$8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getUrl(href, options) {
  return __awaiter$8(this, void 0, void 0, function* () {
    if (options == null) {
      options = {};
    }
    const request = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || void 0,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrer: "client"
    };
    const response = yield fetch(href, request);
    const body = yield response.arrayBuffer();
    const headers = {};
    if (response.headers.forEach) {
      response.headers.forEach((value, key2) => {
        headers[key2.toLowerCase()] = value;
      });
    } else {
      response.headers.keys().forEach((key2) => {
        headers[key2.toLowerCase()] = response.headers.get(key2);
      });
    }
    return {
      headers,
      statusCode: response.status,
      statusMessage: response.statusText,
      body: arrayify(new Uint8Array(body))
    };
  });
}
var __awaiter$7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$f = new Logger(version$2);
function staller(duration) {
  return new Promise((resolve2) => {
    setTimeout(resolve2, duration);
  });
}
function bodyify(value, type) {
  if (value == null) {
    return null;
  }
  if (typeof value === "string") {
    return value;
  }
  if (isBytesLike(value)) {
    if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
      try {
        return toUtf8String(value);
      } catch (error2) {
      }
    }
    return hexlify(value);
  }
  return value;
}
function _fetchData(connection, body, processFunc) {
  const attemptLimit = typeof connection === "object" && connection.throttleLimit != null ? connection.throttleLimit : 12;
  logger$f.assertArgument(attemptLimit > 0 && attemptLimit % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
  const throttleCallback = typeof connection === "object" ? connection.throttleCallback : null;
  const throttleSlotInterval = typeof connection === "object" && typeof connection.throttleSlotInterval === "number" ? connection.throttleSlotInterval : 100;
  logger$f.assertArgument(throttleSlotInterval > 0 && throttleSlotInterval % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
  const headers = {};
  let url2 = null;
  const options = {
    method: "GET"
  };
  let allow304 = false;
  let timeout = 2 * 60 * 1e3;
  if (typeof connection === "string") {
    url2 = connection;
  } else if (typeof connection === "object") {
    if (connection == null || connection.url == null) {
      logger$f.throwArgumentError("missing URL", "connection.url", connection);
    }
    url2 = connection.url;
    if (typeof connection.timeout === "number" && connection.timeout > 0) {
      timeout = connection.timeout;
    }
    if (connection.headers) {
      for (const key2 in connection.headers) {
        headers[key2.toLowerCase()] = {key: key2, value: String(connection.headers[key2])};
        if (["if-none-match", "if-modified-since"].indexOf(key2.toLowerCase()) >= 0) {
          allow304 = true;
        }
      }
    }
    options.allowGzip = !!connection.allowGzip;
    if (connection.user != null && connection.password != null) {
      if (url2.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
        logger$f.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, {argument: "url", url: url2, user: connection.user, password: "[REDACTED]"});
      }
      const authorization = connection.user + ":" + connection.password;
      headers["authorization"] = {
        key: "Authorization",
        value: "Basic " + encode$1(toUtf8Bytes(authorization))
      };
    }
  }
  if (body) {
    options.method = "POST";
    options.body = body;
    if (headers["content-type"] == null) {
      headers["content-type"] = {key: "Content-Type", value: "application/octet-stream"};
    }
    if (headers["content-length"] == null) {
      headers["content-length"] = {key: "Content-Length", value: String(body.length)};
    }
  }
  const flatHeaders = {};
  Object.keys(headers).forEach((key2) => {
    const header = headers[key2];
    flatHeaders[header.key] = header.value;
  });
  options.headers = flatHeaders;
  const runningTimeout = function() {
    let timer2 = null;
    const promise = new Promise(function(resolve2, reject) {
      if (timeout) {
        timer2 = setTimeout(() => {
          if (timer2 == null) {
            return;
          }
          timer2 = null;
          reject(logger$f.makeError("timeout", Logger.errors.TIMEOUT, {
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            timeout,
            url: url2
          }));
        }, timeout);
      }
    });
    const cancel = function() {
      if (timer2 == null) {
        return;
      }
      clearTimeout(timer2);
      timer2 = null;
    };
    return {promise, cancel};
  }();
  const runningFetch = function() {
    return __awaiter$7(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < attemptLimit; attempt++) {
        let response = null;
        try {
          response = yield getUrl(url2, options);
          if (response.statusCode === 429 && attempt < attemptLimit) {
            let tryAgain = true;
            if (throttleCallback) {
              tryAgain = yield throttleCallback(attempt, url2);
            }
            if (tryAgain) {
              let stall2 = 0;
              const retryAfter = response.headers["retry-after"];
              if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                stall2 = parseInt(retryAfter) * 1e3;
              } else {
                stall2 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
              }
              yield staller(stall2);
              continue;
            }
          }
        } catch (error2) {
          response = error2.response;
          if (response == null) {
            runningTimeout.cancel();
            logger$f.throwError("missing response", Logger.errors.SERVER_ERROR, {
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              serverError: error2,
              url: url2
            });
          }
        }
        let body2 = response.body;
        if (allow304 && response.statusCode === 304) {
          body2 = null;
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
          runningTimeout.cancel();
          logger$f.throwError("bad response", Logger.errors.SERVER_ERROR, {
            status: response.statusCode,
            headers: response.headers,
            body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            url: url2
          });
        }
        if (processFunc) {
          try {
            const result = yield processFunc(body2, response);
            runningTimeout.cancel();
            return result;
          } catch (error2) {
            if (error2.throttleRetry && attempt < attemptLimit) {
              let tryAgain = true;
              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url2);
              }
              if (tryAgain) {
                const timeout2 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                yield staller(timeout2);
                continue;
              }
            }
            runningTimeout.cancel();
            logger$f.throwError("processing response error", Logger.errors.SERVER_ERROR, {
              body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
              error: error2,
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              url: url2
            });
          }
        }
        runningTimeout.cancel();
        return body2;
      }
      return logger$f.throwError("failed response", Logger.errors.SERVER_ERROR, {
        requestBody: bodyify(options.body, flatHeaders["content-type"]),
        requestMethod: options.method,
        url: url2
      });
    });
  }();
  return Promise.race([runningTimeout.promise, runningFetch]);
}
function fetchJson(connection, json, processFunc) {
  let processJsonFunc = (value, response) => {
    let result = null;
    if (value != null) {
      try {
        result = JSON.parse(toUtf8String(value));
      } catch (error2) {
        logger$f.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
          body: value,
          error: error2
        });
      }
    }
    if (processFunc) {
      result = processFunc(result, response);
    }
    return result;
  };
  let body = null;
  if (json != null) {
    body = toUtf8Bytes(json);
    const updated = typeof connection === "string" ? {url: connection} : shallowCopy(connection);
    if (updated.headers) {
      const hasContentType = Object.keys(updated.headers).filter((k) => k.toLowerCase() === "content-type").length !== 0;
      if (!hasContentType) {
        updated.headers = shallowCopy(updated.headers);
        updated.headers["content-type"] = "application/json";
      }
    } else {
      updated.headers = {"content-type": "application/json"};
    }
    connection = updated;
  }
  return _fetchData(connection, body, processJsonFunc);
}
function poll(func, options) {
  if (!options) {
    options = {};
  }
  options = shallowCopy(options);
  if (options.floor == null) {
    options.floor = 0;
  }
  if (options.ceiling == null) {
    options.ceiling = 1e4;
  }
  if (options.interval == null) {
    options.interval = 250;
  }
  return new Promise(function(resolve2, reject) {
    let timer2 = null;
    let done = false;
    const cancel = () => {
      if (done) {
        return false;
      }
      done = true;
      if (timer2) {
        clearTimeout(timer2);
      }
      return true;
    };
    if (options.timeout) {
      timer2 = setTimeout(() => {
        if (cancel()) {
          reject(new Error("timeout"));
        }
      }, options.timeout);
    }
    const retryLimit = options.retryLimit;
    let attempt = 0;
    function check() {
      return func().then(function(result) {
        if (result !== void 0) {
          if (cancel()) {
            resolve2(result);
          }
        } else if (options.oncePoll) {
          options.oncePoll.once("poll", check);
        } else if (options.onceBlock) {
          options.onceBlock.once("block", check);
        } else if (!done) {
          attempt++;
          if (attempt > retryLimit) {
            if (cancel()) {
              reject(new Error("retry limit reached"));
            }
            return;
          }
          let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
          if (timeout < options.floor) {
            timeout = options.floor;
          }
          if (timeout > options.ceiling) {
            timeout = options.ceiling;
          }
          setTimeout(check, timeout);
        }
        return null;
      }, function(error2) {
        if (cancel()) {
          reject(error2);
        }
      });
    }
    check();
  });
}
var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
var ALPHABET_MAP = {};
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z);
  if (ALPHABET_MAP[x] !== void 0)
    throw new TypeError(x + " is ambiguous");
  ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
  var b = pre >> 25;
  return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
}
function prefixChk(prefix) {
  var chk = 1;
  for (var i = 0; i < prefix.length; ++i) {
    var c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      return "Invalid prefix (" + prefix + ")";
    chk = polymodStep(chk) ^ c >> 5;
  }
  chk = polymodStep(chk);
  for (i = 0; i < prefix.length; ++i) {
    var v = prefix.charCodeAt(i);
    chk = polymodStep(chk) ^ v & 31;
  }
  return chk;
}
function encode2(prefix, words, LIMIT) {
  LIMIT = LIMIT || 90;
  if (prefix.length + 7 + words.length > LIMIT)
    throw new TypeError("Exceeds length limit");
  prefix = prefix.toLowerCase();
  var chk = prefixChk(prefix);
  if (typeof chk === "string")
    throw new Error(chk);
  var result = prefix + "1";
  for (var i = 0; i < words.length; ++i) {
    var x = words[i];
    if (x >> 5 !== 0)
      throw new Error("Non 5-bit word");
    chk = polymodStep(chk) ^ x;
    result += ALPHABET.charAt(x);
  }
  for (i = 0; i < 6; ++i) {
    chk = polymodStep(chk);
  }
  chk ^= 1;
  for (i = 0; i < 6; ++i) {
    var v = chk >> (5 - i) * 5 & 31;
    result += ALPHABET.charAt(v);
  }
  return result;
}
function __decode(str, LIMIT) {
  LIMIT = LIMIT || 90;
  if (str.length < 8)
    return str + " too short";
  if (str.length > LIMIT)
    return "Exceeds length limit";
  var lowered = str.toLowerCase();
  var uppered = str.toUpperCase();
  if (str !== lowered && str !== uppered)
    return "Mixed-case string " + str;
  str = lowered;
  var split = str.lastIndexOf("1");
  if (split === -1)
    return "No separator character for " + str;
  if (split === 0)
    return "Missing prefix for " + str;
  var prefix = str.slice(0, split);
  var wordChars = str.slice(split + 1);
  if (wordChars.length < 6)
    return "Data too short";
  var chk = prefixChk(prefix);
  if (typeof chk === "string")
    return chk;
  var words = [];
  for (var i = 0; i < wordChars.length; ++i) {
    var c = wordChars.charAt(i);
    var v = ALPHABET_MAP[c];
    if (v === void 0)
      return "Unknown character " + c;
    chk = polymodStep(chk) ^ v;
    if (i + 6 >= wordChars.length)
      continue;
    words.push(v);
  }
  if (chk !== 1)
    return "Invalid checksum for " + str;
  return {prefix, words};
}
function decodeUnsafe() {
  var res = __decode.apply(null, arguments);
  if (typeof res === "object")
    return res;
}
function decode(str) {
  var res = __decode.apply(null, arguments);
  if (typeof res === "object")
    return res;
  throw new Error(res);
}
function convert(data, inBits, outBits, pad3) {
  var value = 0;
  var bits = 0;
  var maxV = (1 << outBits) - 1;
  var result = [];
  for (var i = 0; i < data.length; ++i) {
    value = value << inBits | data[i];
    bits += inBits;
    while (bits >= outBits) {
      bits -= outBits;
      result.push(value >> bits & maxV);
    }
  }
  if (pad3) {
    if (bits > 0) {
      result.push(value << outBits - bits & maxV);
    }
  } else {
    if (bits >= inBits)
      return "Excess padding";
    if (value << outBits - bits & maxV)
      return "Non-zero padding";
  }
  return result;
}
function toWordsUnsafe(bytes) {
  var res = convert(bytes, 8, 5, true);
  if (Array.isArray(res))
    return res;
}
function toWords(bytes) {
  var res = convert(bytes, 8, 5, true);
  if (Array.isArray(res))
    return res;
  throw new Error(res);
}
function fromWordsUnsafe(words) {
  var res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
}
function fromWords(words) {
  var res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
  throw new Error(res);
}
var bech32 = {
  decodeUnsafe,
  decode,
  encode: encode2,
  toWordsUnsafe,
  toWords,
  fromWordsUnsafe,
  fromWords
};
const version$1 = "providers/5.1.0";
const logger$e = new Logger(version$1);
class Formatter {
  constructor() {
    logger$e.checkNew(new.target, Formatter);
    this.formats = this.getDefaultFormats();
  }
  getDefaultFormats() {
    const formats = {};
    const address = this.address.bind(this);
    const bigNumber = this.bigNumber.bind(this);
    const blockTag = this.blockTag.bind(this);
    const data = this.data.bind(this);
    const hash = this.hash.bind(this);
    const hex = this.hex.bind(this);
    const number = this.number.bind(this);
    const strictData = (v) => {
      return this.data(v, true);
    };
    formats.transaction = {
      hash,
      type: Formatter.allowNull(number, null),
      accessList: Formatter.allowNull(this.accessList.bind(this), null),
      blockHash: Formatter.allowNull(hash, null),
      blockNumber: Formatter.allowNull(number, null),
      transactionIndex: Formatter.allowNull(number, null),
      confirmations: Formatter.allowNull(number, null),
      from: address,
      gasPrice: bigNumber,
      gasLimit: bigNumber,
      to: Formatter.allowNull(address, null),
      value: bigNumber,
      nonce: number,
      data,
      r: Formatter.allowNull(this.uint256),
      s: Formatter.allowNull(this.uint256),
      v: Formatter.allowNull(number),
      creates: Formatter.allowNull(address, null),
      raw: Formatter.allowNull(data)
    };
    formats.transactionRequest = {
      from: Formatter.allowNull(address),
      nonce: Formatter.allowNull(number),
      gasLimit: Formatter.allowNull(bigNumber),
      gasPrice: Formatter.allowNull(bigNumber),
      to: Formatter.allowNull(address),
      value: Formatter.allowNull(bigNumber),
      data: Formatter.allowNull(strictData),
      type: Formatter.allowNull(number),
      accessList: Formatter.allowNull(this.accessList.bind(this), null)
    };
    formats.receiptLog = {
      transactionIndex: number,
      blockNumber: number,
      transactionHash: hash,
      address,
      topics: Formatter.arrayOf(hash),
      data,
      logIndex: number,
      blockHash: hash
    };
    formats.receipt = {
      to: Formatter.allowNull(this.address, null),
      from: Formatter.allowNull(this.address, null),
      contractAddress: Formatter.allowNull(address, null),
      transactionIndex: number,
      root: Formatter.allowNull(hex),
      gasUsed: bigNumber,
      logsBloom: Formatter.allowNull(data),
      blockHash: hash,
      transactionHash: hash,
      logs: Formatter.arrayOf(this.receiptLog.bind(this)),
      blockNumber: number,
      confirmations: Formatter.allowNull(number, null),
      cumulativeGasUsed: bigNumber,
      status: Formatter.allowNull(number)
    };
    formats.block = {
      hash,
      parentHash: hash,
      number,
      timestamp: number,
      nonce: Formatter.allowNull(hex),
      difficulty: this.difficulty.bind(this),
      gasLimit: bigNumber,
      gasUsed: bigNumber,
      miner: address,
      extraData: data,
      transactions: Formatter.allowNull(Formatter.arrayOf(hash))
    };
    formats.blockWithTransactions = shallowCopy(formats.block);
    formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
    formats.filter = {
      fromBlock: Formatter.allowNull(blockTag, void 0),
      toBlock: Formatter.allowNull(blockTag, void 0),
      blockHash: Formatter.allowNull(hash, void 0),
      address: Formatter.allowNull(address, void 0),
      topics: Formatter.allowNull(this.topics.bind(this), void 0)
    };
    formats.filterLog = {
      blockNumber: Formatter.allowNull(number),
      blockHash: Formatter.allowNull(hash),
      transactionIndex: number,
      removed: Formatter.allowNull(this.boolean.bind(this)),
      address,
      data: Formatter.allowFalsish(data, "0x"),
      topics: Formatter.arrayOf(hash),
      transactionHash: hash,
      logIndex: number
    };
    return formats;
  }
  accessList(accessList) {
    return accessListify(accessList || []);
  }
  number(number) {
    if (number === "0x") {
      return 0;
    }
    return BigNumber.from(number).toNumber();
  }
  bigNumber(value) {
    return BigNumber.from(value);
  }
  boolean(value) {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      value = value.toLowerCase();
      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }
    }
    throw new Error("invalid boolean - " + value);
  }
  hex(value, strict) {
    if (typeof value === "string") {
      if (!strict && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
      }
      if (isHexString(value)) {
        return value.toLowerCase();
      }
    }
    return logger$e.throwArgumentError("invalid hash", "value", value);
  }
  data(value, strict) {
    const result = this.hex(value, strict);
    if (result.length % 2 !== 0) {
      throw new Error("invalid data; odd-length - " + value);
    }
    return result;
  }
  address(value) {
    return getAddress(value);
  }
  callAddress(value) {
    if (!isHexString(value, 32)) {
      return null;
    }
    const address = getAddress(hexDataSlice(value, 12));
    return address === AddressZero ? null : address;
  }
  contractAddress(value) {
    return getContractAddress(value);
  }
  blockTag(blockTag) {
    if (blockTag == null) {
      return "latest";
    }
    if (blockTag === "earliest") {
      return "0x0";
    }
    if (blockTag === "latest" || blockTag === "pending") {
      return blockTag;
    }
    if (typeof blockTag === "number" || isHexString(blockTag)) {
      return hexValue(blockTag);
    }
    throw new Error("invalid blockTag");
  }
  hash(value, strict) {
    const result = this.hex(value, strict);
    if (hexDataLength(result) !== 32) {
      return logger$e.throwArgumentError("invalid hash", "value", value);
    }
    return result;
  }
  difficulty(value) {
    if (value == null) {
      return null;
    }
    const v = BigNumber.from(value);
    try {
      return v.toNumber();
    } catch (error2) {
    }
    return null;
  }
  uint256(value) {
    if (!isHexString(value)) {
      throw new Error("invalid uint256");
    }
    return hexZeroPad(value, 32);
  }
  _block(value, format2) {
    if (value.author != null && value.miner == null) {
      value.miner = value.author;
    }
    return Formatter.check(format2, value);
  }
  block(value) {
    return this._block(value, this.formats.block);
  }
  blockWithTransactions(value) {
    return this._block(value, this.formats.blockWithTransactions);
  }
  transactionRequest(value) {
    return Formatter.check(this.formats.transactionRequest, value);
  }
  transactionResponse(transaction) {
    if (transaction.gas != null && transaction.gasLimit == null) {
      transaction.gasLimit = transaction.gas;
    }
    if (transaction.to && BigNumber.from(transaction.to).isZero()) {
      transaction.to = "0x0000000000000000000000000000000000000000";
    }
    if (transaction.input != null && transaction.data == null) {
      transaction.data = transaction.input;
    }
    if (transaction.to == null && transaction.creates == null) {
      transaction.creates = this.contractAddress(transaction);
    }
    if (transaction.type === 1 && transaction.accessList == null) {
      transaction.accessList = [];
    }
    const result = Formatter.check(this.formats.transaction, transaction);
    if (transaction.chainId != null) {
      let chainId = transaction.chainId;
      if (isHexString(chainId)) {
        chainId = BigNumber.from(chainId).toNumber();
      }
      result.chainId = chainId;
    } else {
      let chainId = transaction.networkId;
      if (chainId == null && result.v == null) {
        chainId = transaction.chainId;
      }
      if (isHexString(chainId)) {
        chainId = BigNumber.from(chainId).toNumber();
      }
      if (typeof chainId !== "number" && result.v != null) {
        chainId = (result.v - 35) / 2;
        if (chainId < 0) {
          chainId = 0;
        }
        chainId = parseInt(chainId);
      }
      if (typeof chainId !== "number") {
        chainId = 0;
      }
      result.chainId = chainId;
    }
    if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
      result.blockHash = null;
    }
    return result;
  }
  transaction(value) {
    return parse(value);
  }
  receiptLog(value) {
    return Formatter.check(this.formats.receiptLog, value);
  }
  receipt(value) {
    const result = Formatter.check(this.formats.receipt, value);
    if (result.root != null) {
      if (result.root.length <= 4) {
        const value2 = BigNumber.from(result.root).toNumber();
        if (value2 === 0 || value2 === 1) {
          if (result.status != null && result.status !== value2) {
            logger$e.throwArgumentError("alt-root-status/status mismatch", "value", {root: result.root, status: result.status});
          }
          result.status = value2;
          delete result.root;
        } else {
          logger$e.throwArgumentError("invalid alt-root-status", "value.root", result.root);
        }
      } else if (result.root.length !== 66) {
        logger$e.throwArgumentError("invalid root hash", "value.root", result.root);
      }
    }
    if (result.status != null) {
      result.byzantium = true;
    }
    return result;
  }
  topics(value) {
    if (Array.isArray(value)) {
      return value.map((v) => this.topics(v));
    } else if (value != null) {
      return this.hash(value, true);
    }
    return null;
  }
  filter(value) {
    return Formatter.check(this.formats.filter, value);
  }
  filterLog(value) {
    return Formatter.check(this.formats.filterLog, value);
  }
  static check(format2, object) {
    const result = {};
    for (const key2 in format2) {
      try {
        const value = format2[key2](object[key2]);
        if (value !== void 0) {
          result[key2] = value;
        }
      } catch (error2) {
        error2.checkKey = key2;
        error2.checkValue = object[key2];
        throw error2;
      }
    }
    return result;
  }
  static allowNull(format2, nullValue) {
    return function(value) {
      if (value == null) {
        return nullValue;
      }
      return format2(value);
    };
  }
  static allowFalsish(format2, replaceValue) {
    return function(value) {
      if (!value) {
        return replaceValue;
      }
      return format2(value);
    };
  }
  static arrayOf(format2) {
    return function(array) {
      if (!Array.isArray(array)) {
        throw new Error("not an array");
      }
      const result = [];
      array.forEach(function(value) {
        result.push(format2(value));
      });
      return result;
    };
  }
}
function isCommunityResourcable(value) {
  return value && typeof value.isCommunityResource === "function";
}
function isCommunityResource(value) {
  return isCommunityResourcable(value) && value.isCommunityResource();
}
let throttleMessage = false;
function showThrottleMessage() {
  if (throttleMessage) {
    return;
  }
  throttleMessage = true;
  console.log("========= NOTICE =========");
  console.log("Request-Rate Exceeded  (this message will not be repeated)");
  console.log("");
  console.log("The default API keys for each service are provided as a highly-throttled,");
  console.log("community resource for low-traffic projects and early prototyping.");
  console.log("");
  console.log("While your application will continue to function, we highly recommended");
  console.log("signing up for your own API keys to improve performance, increase your");
  console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
  console.log("");
  console.log("For more details: https://docs.ethers.io/api-keys/");
  console.log("==========================");
}
var __awaiter$6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$d = new Logger(version$1);
function checkTopic(topic) {
  if (topic == null) {
    return "null";
  }
  if (hexDataLength(topic) !== 32) {
    logger$d.throwArgumentError("invalid topic", "topic", topic);
  }
  return topic.toLowerCase();
}
function serializeTopics(topics) {
  topics = topics.slice();
  while (topics.length > 0 && topics[topics.length - 1] == null) {
    topics.pop();
  }
  return topics.map((topic) => {
    if (Array.isArray(topic)) {
      const unique = {};
      topic.forEach((topic2) => {
        unique[checkTopic(topic2)] = true;
      });
      const sorted = Object.keys(unique);
      sorted.sort();
      return sorted.join("|");
    } else {
      return checkTopic(topic);
    }
  }).join("&");
}
function deserializeTopics(data) {
  if (data === "") {
    return [];
  }
  return data.split(/&/g).map((topic) => {
    if (topic === "") {
      return [];
    }
    const comps = topic.split("|").map((topic2) => {
      return topic2 === "null" ? null : topic2;
    });
    return comps.length === 1 ? comps[0] : comps;
  });
}
function getEventTag(eventName) {
  if (typeof eventName === "string") {
    eventName = eventName.toLowerCase();
    if (hexDataLength(eventName) === 32) {
      return "tx:" + eventName;
    }
    if (eventName.indexOf(":") === -1) {
      return eventName;
    }
  } else if (Array.isArray(eventName)) {
    return "filter:*:" + serializeTopics(eventName);
  } else if (ForkEvent.isForkEvent(eventName)) {
    logger$d.warn("not implemented");
    throw new Error("not implemented");
  } else if (eventName && typeof eventName === "object") {
    return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
  }
  throw new Error("invalid event - " + eventName);
}
function getTime() {
  return new Date().getTime();
}
function stall$1(duration) {
  return new Promise((resolve2) => {
    setTimeout(resolve2, duration);
  });
}
const PollableEvents = ["block", "network", "pending", "poll"];
class Event {
  constructor(tag, listener, once) {
    defineReadOnly(this, "tag", tag);
    defineReadOnly(this, "listener", listener);
    defineReadOnly(this, "once", once);
  }
  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;
      case "filter":
        return this.filter;
    }
    return this.tag;
  }
  get type() {
    return this.tag.split(":")[0];
  }
  get hash() {
    const comps = this.tag.split(":");
    if (comps[0] !== "tx") {
      return null;
    }
    return comps[1];
  }
  get filter() {
    const comps = this.tag.split(":");
    if (comps[0] !== "filter") {
      return null;
    }
    const address = comps[1];
    const topics = deserializeTopics(comps[2]);
    const filter = {};
    if (topics.length > 0) {
      filter.topics = topics;
    }
    if (address && address !== "*") {
      filter.address = address;
    }
    return filter;
  }
  pollable() {
    return this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0;
  }
}
const coinInfos = {
  "0": {symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc"},
  "2": {symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc"},
  "3": {symbol: "doge", p2pkh: 30, p2sh: 22},
  "60": {symbol: "eth", ilk: "eth"},
  "61": {symbol: "etc", ilk: "eth"},
  "700": {symbol: "xdai", ilk: "eth"}
};
function bytes32ify(value) {
  return hexZeroPad(BigNumber.from(value).toHexString(), 32);
}
function base58Encode(data) {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}
class Resolver {
  constructor(provider, address, name2) {
    defineReadOnly(this, "provider", provider);
    defineReadOnly(this, "name", name2);
    defineReadOnly(this, "address", provider.formatter.address(address));
  }
  _fetchBytes(selector, parameters) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const transaction = {
        to: this.address,
        data: hexConcat([selector, namehash(this.name), parameters || "0x"])
      };
      const result = yield this.provider.call(transaction);
      if (result === "0x") {
        return null;
      }
      const offset = BigNumber.from(hexDataSlice(result, 0, 32)).toNumber();
      const length = BigNumber.from(hexDataSlice(result, offset, offset + 32)).toNumber();
      return hexDataSlice(result, offset + 32, offset + 32 + length);
    });
  }
  _getAddress(coinType, hexBytes) {
    const coinInfo = coinInfos[String(coinType)];
    if (coinInfo == null) {
      logger$d.throwError(`unsupported coin type: ${coinType}`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: `getAddress(${coinType})`
      });
    }
    if (coinInfo.ilk === "eth") {
      return this.provider.formatter.address(hexBytes);
    }
    const bytes = arrayify(hexBytes);
    if (coinInfo.p2pkh != null) {
      const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
      if (p2pkh) {
        const length = parseInt(p2pkh[1], 16);
        if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode(concat([[coinInfo.p2pkh], "0x" + p2pkh[2]]));
        }
      }
    }
    if (coinInfo.p2sh != null) {
      const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
      if (p2sh) {
        const length = parseInt(p2sh[1], 16);
        if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode(concat([[coinInfo.p2sh], "0x" + p2sh[2]]));
        }
      }
    }
    if (coinInfo.prefix != null) {
      const length = bytes[1];
      let version2 = bytes[0];
      if (version2 === 0) {
        if (length !== 20 && length !== 32) {
          version2 = -1;
        }
      } else {
        version2 = -1;
      }
      if (version2 >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
        const words = bech32.toWords(bytes.slice(2));
        words.unshift(version2);
        return bech32.encode(coinInfo.prefix, words);
      }
    }
    return null;
  }
  getAddress(coinType) {
    return __awaiter$6(this, void 0, void 0, function* () {
      if (coinType == null) {
        coinType = 60;
      }
      if (coinType === 60) {
        const transaction = {
          to: this.address,
          data: "0x3b3b57de" + namehash(this.name).substring(2)
        };
        const hexBytes2 = yield this.provider.call(transaction);
        if (hexBytes2 === "0x" || hexBytes2 === HashZero) {
          return null;
        }
        return this.provider.formatter.callAddress(hexBytes2);
      }
      const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      const address = this._getAddress(coinType, hexBytes);
      if (address == null) {
        logger$d.throwError(`invalid or unsupported coin data`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `getAddress(${coinType})`,
          coinType,
          data: hexBytes
        });
      }
      return address;
    });
  }
  getContentHash() {
    return __awaiter$6(this, void 0, void 0, function* () {
      const hexBytes = yield this._fetchBytes("0xbc1c58d1");
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (ipfs) {
        const length = parseInt(ipfs[3], 16);
        if (ipfs[4].length === length * 2) {
          return "ipfs://" + Base58.encode("0x" + ipfs[1]);
        }
      }
      const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
      if (swarm) {
        if (swarm[1].length === 32 * 2) {
          return "bzz://" + swarm[1];
        }
      }
      return logger$d.throwError(`invalid or unsupported content hash data`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "getContentHash()",
        data: hexBytes
      });
    });
  }
  getText(key2) {
    return __awaiter$6(this, void 0, void 0, function* () {
      let keyBytes = toUtf8Bytes(key2);
      keyBytes = concat([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
      if (keyBytes.length % 32 !== 0) {
        keyBytes = concat([keyBytes, hexZeroPad("0x", 32 - key2.length % 32)]);
      }
      const hexBytes = yield this._fetchBytes("0x59d1d43c", hexlify(keyBytes));
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      return toUtf8String(hexBytes);
    });
  }
}
let defaultFormatter = null;
let nextPollId = 1;
class BaseProvider extends Provider {
  constructor(network) {
    logger$d.checkNew(new.target, Provider);
    super();
    this._events = [];
    this._emitted = {block: -2};
    this.formatter = new.target.getFormatter();
    defineReadOnly(this, "anyNetwork", network === "any");
    if (this.anyNetwork) {
      network = this.detectNetwork();
    }
    if (network instanceof Promise) {
      this._networkPromise = network;
      network.catch((error2) => {
      });
      this._ready().catch((error2) => {
      });
    } else {
      const knownNetwork = getStatic(new.target, "getNetwork")(network);
      if (knownNetwork) {
        defineReadOnly(this, "_network", knownNetwork);
        this.emit("network", knownNetwork, null);
      } else {
        logger$d.throwArgumentError("invalid network", "network", network);
      }
    }
    this._maxInternalBlockNumber = -1024;
    this._lastBlockNumber = -2;
    this._pollingInterval = 4e3;
    this._fastQueryDate = 0;
  }
  _ready() {
    return __awaiter$6(this, void 0, void 0, function* () {
      if (this._network == null) {
        let network = null;
        if (this._networkPromise) {
          try {
            network = yield this._networkPromise;
          } catch (error2) {
          }
        }
        if (network == null) {
          network = yield this.detectNetwork();
        }
        if (!network) {
          logger$d.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
        }
        if (this._network == null) {
          if (this.anyNetwork) {
            this._network = network;
          } else {
            defineReadOnly(this, "_network", network);
          }
          this.emit("network", network, null);
        }
      }
      return this._network;
    });
  }
  get ready() {
    return poll(() => {
      return this._ready().then((network) => {
        return network;
      }, (error2) => {
        if (error2.code === Logger.errors.NETWORK_ERROR && error2.event === "noNetwork") {
          return void 0;
        }
        throw error2;
      });
    });
  }
  static getFormatter() {
    if (defaultFormatter == null) {
      defaultFormatter = new Formatter();
    }
    return defaultFormatter;
  }
  static getNetwork(network) {
    return getNetwork(network == null ? "homestead" : network);
  }
  _getInternalBlockNumber(maxAge) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this._ready();
      if (maxAge > 0) {
        while (this._internalBlockNumber) {
          const internalBlockNumber = this._internalBlockNumber;
          try {
            const result = yield internalBlockNumber;
            if (getTime() - result.respTime <= maxAge) {
              return result.blockNumber;
            }
            break;
          } catch (error2) {
            if (this._internalBlockNumber === internalBlockNumber) {
              break;
            }
          }
        }
      }
      const reqTime = getTime();
      const checkInternalBlockNumber = resolveProperties({
        blockNumber: this.perform("getBlockNumber", {}),
        networkError: this.getNetwork().then((network) => null, (error2) => error2)
      }).then(({blockNumber, networkError}) => {
        if (networkError) {
          if (this._internalBlockNumber === checkInternalBlockNumber) {
            this._internalBlockNumber = null;
          }
          throw networkError;
        }
        const respTime = getTime();
        blockNumber = BigNumber.from(blockNumber).toNumber();
        if (blockNumber < this._maxInternalBlockNumber) {
          blockNumber = this._maxInternalBlockNumber;
        }
        this._maxInternalBlockNumber = blockNumber;
        this._setFastBlockNumber(blockNumber);
        return {blockNumber, reqTime, respTime};
      });
      this._internalBlockNumber = checkInternalBlockNumber;
      checkInternalBlockNumber.catch((error2) => {
        if (this._internalBlockNumber === checkInternalBlockNumber) {
          this._internalBlockNumber = null;
        }
      });
      return (yield checkInternalBlockNumber).blockNumber;
    });
  }
  poll() {
    return __awaiter$6(this, void 0, void 0, function* () {
      const pollId = nextPollId++;
      const runners = [];
      let blockNumber = null;
      try {
        blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (error2) {
        this.emit("error", error2);
        return;
      }
      this._setFastBlockNumber(blockNumber);
      this.emit("poll", pollId, blockNumber);
      if (blockNumber === this._lastBlockNumber) {
        this.emit("didPoll", pollId);
        return;
      }
      if (this._emitted.block === -2) {
        this._emitted.block = blockNumber - 1;
      }
      if (Math.abs(this._emitted.block - blockNumber) > 1e3) {
        logger$d.warn("network block skew detected; skipping block events");
        this.emit("error", logger$d.makeError("network block skew detected", Logger.errors.NETWORK_ERROR, {
          blockNumber,
          event: "blockSkew",
          previousBlockNumber: this._emitted.block
        }));
        this.emit("block", blockNumber);
      } else {
        for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
          this.emit("block", i);
        }
      }
      if (this._emitted.block !== blockNumber) {
        this._emitted.block = blockNumber;
        Object.keys(this._emitted).forEach((key2) => {
          if (key2 === "block") {
            return;
          }
          const eventBlockNumber = this._emitted[key2];
          if (eventBlockNumber === "pending") {
            return;
          }
          if (blockNumber - eventBlockNumber > 12) {
            delete this._emitted[key2];
          }
        });
      }
      if (this._lastBlockNumber === -2) {
        this._lastBlockNumber = blockNumber - 1;
      }
      this._events.forEach((event) => {
        switch (event.type) {
          case "tx": {
            const hash = event.hash;
            let runner = this.getTransactionReceipt(hash).then((receipt) => {
              if (!receipt || receipt.blockNumber == null) {
                return null;
              }
              this._emitted["t:" + hash] = receipt.blockNumber;
              this.emit(hash, receipt);
              return null;
            }).catch((error2) => {
              this.emit("error", error2);
            });
            runners.push(runner);
            break;
          }
          case "filter": {
            const filter = event.filter;
            filter.fromBlock = this._lastBlockNumber + 1;
            filter.toBlock = blockNumber;
            const runner = this.getLogs(filter).then((logs) => {
              if (logs.length === 0) {
                return;
              }
              logs.forEach((log) => {
                this._emitted["b:" + log.blockHash] = log.blockNumber;
                this._emitted["t:" + log.transactionHash] = log.blockNumber;
                this.emit(filter, log);
              });
            }).catch((error2) => {
              this.emit("error", error2);
            });
            runners.push(runner);
            break;
          }
        }
      });
      this._lastBlockNumber = blockNumber;
      Promise.all(runners).then(() => {
        this.emit("didPoll", pollId);
      }).catch((error2) => {
        this.emit("error", error2);
      });
      return;
    });
  }
  resetEventsBlock(blockNumber) {
    this._lastBlockNumber = blockNumber - 1;
    if (this.polling) {
      this.poll();
    }
  }
  get network() {
    return this._network;
  }
  detectNetwork() {
    return __awaiter$6(this, void 0, void 0, function* () {
      return logger$d.throwError("provider does not support network detection", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "provider.detectNetwork"
      });
    });
  }
  getNetwork() {
    return __awaiter$6(this, void 0, void 0, function* () {
      const network = yield this._ready();
      const currentNetwork = yield this.detectNetwork();
      if (network.chainId !== currentNetwork.chainId) {
        if (this.anyNetwork) {
          this._network = currentNetwork;
          this._lastBlockNumber = -2;
          this._fastBlockNumber = null;
          this._fastBlockNumberPromise = null;
          this._fastQueryDate = 0;
          this._emitted.block = -2;
          this._maxInternalBlockNumber = -1024;
          this._internalBlockNumber = null;
          this.emit("network", currentNetwork, network);
          yield stall$1(0);
          return this._network;
        }
        const error2 = logger$d.makeError("underlying network changed", Logger.errors.NETWORK_ERROR, {
          event: "changed",
          network,
          detectedNetwork: currentNetwork
        });
        this.emit("error", error2);
        throw error2;
      }
      return network;
    });
  }
  get blockNumber() {
    this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
      this._setFastBlockNumber(blockNumber);
    }, (error2) => {
    });
    return this._fastBlockNumber != null ? this._fastBlockNumber : -1;
  }
  get polling() {
    return this._poller != null;
  }
  set polling(value) {
    if (value && !this._poller) {
      this._poller = setInterval(() => {
        this.poll();
      }, this.pollingInterval);
      if (!this._bootstrapPoll) {
        this._bootstrapPoll = setTimeout(() => {
          this.poll();
          this._bootstrapPoll = setTimeout(() => {
            if (!this._poller) {
              this.poll();
            }
            this._bootstrapPoll = null;
          }, this.pollingInterval);
        }, 0);
      }
    } else if (!value && this._poller) {
      clearInterval(this._poller);
      this._poller = null;
    }
  }
  get pollingInterval() {
    return this._pollingInterval;
  }
  set pollingInterval(value) {
    if (typeof value !== "number" || value <= 0 || parseInt(String(value)) != value) {
      throw new Error("invalid polling interval");
    }
    this._pollingInterval = value;
    if (this._poller) {
      clearInterval(this._poller);
      this._poller = setInterval(() => {
        this.poll();
      }, this._pollingInterval);
    }
  }
  _getFastBlockNumber() {
    const now2 = getTime();
    if (now2 - this._fastQueryDate > 2 * this._pollingInterval) {
      this._fastQueryDate = now2;
      this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
          this._fastBlockNumber = blockNumber;
        }
        return this._fastBlockNumber;
      });
    }
    return this._fastBlockNumberPromise;
  }
  _setFastBlockNumber(blockNumber) {
    if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
      return;
    }
    this._fastQueryDate = getTime();
    if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
      this._fastBlockNumber = blockNumber;
      this._fastBlockNumberPromise = Promise.resolve(blockNumber);
    }
  }
  waitForTransaction(transactionHash, confirmations, timeout) {
    return __awaiter$6(this, void 0, void 0, function* () {
      if (confirmations == null) {
        confirmations = 1;
      }
      const receipt = yield this.getTransactionReceipt(transactionHash);
      if ((receipt ? receipt.confirmations : 0) >= confirmations) {
        return receipt;
      }
      return new Promise((resolve2, reject) => {
        let timer2 = null;
        let done = false;
        const handler = (receipt2) => {
          if (receipt2.confirmations < confirmations) {
            return;
          }
          if (timer2) {
            clearTimeout(timer2);
          }
          if (done) {
            return;
          }
          done = true;
          this.removeListener(transactionHash, handler);
          resolve2(receipt2);
        };
        this.on(transactionHash, handler);
        if (typeof timeout === "number" && timeout > 0) {
          timer2 = setTimeout(() => {
            if (done) {
              return;
            }
            timer2 = null;
            done = true;
            this.removeListener(transactionHash, handler);
            reject(logger$d.makeError("timeout exceeded", Logger.errors.TIMEOUT, {timeout}));
          }, timeout);
          if (timer2.unref) {
            timer2.unref();
          }
        }
      });
    });
  }
  getBlockNumber() {
    return __awaiter$6(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }
  getGasPrice() {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const result = yield this.perform("getGasPrice", {});
      try {
        return BigNumber.from(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result,
          error: error2
        });
      }
    });
  }
  getBalance(addressOrName, blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getBalance", params);
      try {
        return BigNumber.from(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getBalance",
          params,
          result,
          error: error2
        });
      }
    });
  }
  getTransactionCount(addressOrName, blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getTransactionCount", params);
      try {
        return BigNumber.from(result).toNumber();
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params,
          result,
          error: error2
        });
      }
    });
  }
  getCode(addressOrName, blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getCode", params);
      try {
        return hexlify(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getCode",
          params,
          result,
          error: error2
        });
      }
    });
  }
  getStorageAt(addressOrName, position, blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag),
        position: Promise.resolve(position).then((p) => hexValue(p))
      });
      const result = yield this.perform("getStorageAt", params);
      try {
        return hexlify(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params,
          result,
          error: error2
        });
      }
    });
  }
  _wrapTransaction(tx, hash) {
    if (hash != null && hexDataLength(hash) !== 32) {
      throw new Error("invalid response - sendTransaction");
    }
    const result = tx;
    if (hash != null && tx.hash !== hash) {
      logger$d.throwError("Transaction hash mismatch from Provider.sendTransaction.", Logger.errors.UNKNOWN_ERROR, {expectedHash: tx.hash, returnedHash: hash});
    }
    result.wait = (confirmations) => __awaiter$6(this, void 0, void 0, function* () {
      if (confirmations !== 0) {
        this._emitted["t:" + tx.hash] = "pending";
      }
      const receipt = yield this.waitForTransaction(tx.hash, confirmations);
      if (receipt == null && confirmations === 0) {
        return null;
      }
      this._emitted["t:" + tx.hash] = receipt.blockNumber;
      if (receipt.status === 0) {
        logger$d.throwError("transaction failed", Logger.errors.CALL_EXCEPTION, {
          transactionHash: tx.hash,
          transaction: tx,
          receipt
        });
      }
      return receipt;
    });
    return result;
  }
  sendTransaction(signedTransaction) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const hexTx = yield Promise.resolve(signedTransaction).then((t) => hexlify(t));
      const tx = this.formatter.transaction(signedTransaction);
      try {
        const hash = yield this.perform("sendTransaction", {signedTransaction: hexTx});
        return this._wrapTransaction(tx, hash);
      } catch (error2) {
        error2.transaction = tx;
        error2.transactionHash = tx.hash;
        throw error2;
      }
    });
  }
  _getTransactionRequest(transaction) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const values = yield transaction;
      const tx = {};
      ["from", "to"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v) => v ? this._getAddress(v) : null);
      });
      ["gasLimit", "gasPrice", "value"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v) => v ? BigNumber.from(v) : null);
      });
      ["type"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v) => v != null ? v : null);
      });
      if (values.accessList) {
        tx.accessList = this.formatter.accessList(values.accessList);
      }
      ["data"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v) => v ? hexlify(v) : null);
      });
      return this.formatter.transactionRequest(yield resolveProperties(tx));
    });
  }
  _getFilter(filter) {
    return __awaiter$6(this, void 0, void 0, function* () {
      filter = yield filter;
      const result = {};
      if (filter.address != null) {
        result.address = this._getAddress(filter.address);
      }
      ["blockHash", "topics"].forEach((key2) => {
        if (filter[key2] == null) {
          return;
        }
        result[key2] = filter[key2];
      });
      ["fromBlock", "toBlock"].forEach((key2) => {
        if (filter[key2] == null) {
          return;
        }
        result[key2] = this._getBlockTag(filter[key2]);
      });
      return this.formatter.filter(yield resolveProperties(result));
    });
  }
  call(transaction, blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        transaction: this._getTransactionRequest(transaction),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("call", params);
      try {
        return hexlify(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "call",
          params,
          result,
          error: error2
        });
      }
    });
  }
  estimateGas(transaction) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        transaction: this._getTransactionRequest(transaction)
      });
      const result = yield this.perform("estimateGas", params);
      try {
        return BigNumber.from(result);
      } catch (error2) {
        return logger$d.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "estimateGas",
          params,
          result,
          error: error2
        });
      }
    });
  }
  _getAddress(addressOrName) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const address = yield this.resolveName(addressOrName);
      if (address == null) {
        logger$d.throwError("ENS name not configured", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `resolveName(${JSON.stringify(addressOrName)})`
        });
      }
      return address;
    });
  }
  _getBlock(blockHashOrBlockTag, includeTransactions) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      blockHashOrBlockTag = yield blockHashOrBlockTag;
      let blockNumber = -128;
      const params = {
        includeTransactions: !!includeTransactions
      };
      if (isHexString(blockHashOrBlockTag, 32)) {
        params.blockHash = blockHashOrBlockTag;
      } else {
        try {
          params.blockTag = this.formatter.blockTag(yield this._getBlockTag(blockHashOrBlockTag));
          if (isHexString(params.blockTag)) {
            blockNumber = parseInt(params.blockTag.substring(2), 16);
          }
        } catch (error2) {
          logger$d.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
        }
      }
      return poll(() => __awaiter$6(this, void 0, void 0, function* () {
        const block = yield this.perform("getBlock", params);
        if (block == null) {
          if (params.blockHash != null) {
            if (this._emitted["b:" + params.blockHash] == null) {
              return null;
            }
          }
          if (params.blockTag != null) {
            if (blockNumber > this._emitted.block) {
              return null;
            }
          }
          return void 0;
        }
        if (includeTransactions) {
          let blockNumber2 = null;
          for (let i = 0; i < block.transactions.length; i++) {
            const tx = block.transactions[i];
            if (tx.blockNumber == null) {
              tx.confirmations = 0;
            } else if (tx.confirmations == null) {
              if (blockNumber2 == null) {
                blockNumber2 = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              }
              let confirmations = blockNumber2 - tx.blockNumber + 1;
              if (confirmations <= 0) {
                confirmations = 1;
              }
              tx.confirmations = confirmations;
            }
          }
          return this.formatter.blockWithTransactions(block);
        }
        return this.formatter.block(block);
      }), {oncePoll: this});
    });
  }
  getBlock(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, false);
  }
  getBlockWithTransactions(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, true);
  }
  getTransaction(transactionHash) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = {transactionHash: this.formatter.hash(transactionHash, true)};
      return poll(() => __awaiter$6(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransaction", params);
        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }
          return void 0;
        }
        const tx = this.formatter.transactionResponse(result);
        if (tx.blockNumber == null) {
          tx.confirmations = 0;
        } else if (tx.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          let confirmations = blockNumber - tx.blockNumber + 1;
          if (confirmations <= 0) {
            confirmations = 1;
          }
          tx.confirmations = confirmations;
        }
        return this._wrapTransaction(tx);
      }), {oncePoll: this});
    });
  }
  getTransactionReceipt(transactionHash) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = {transactionHash: this.formatter.hash(transactionHash, true)};
      return poll(() => __awaiter$6(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransactionReceipt", params);
        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }
          return void 0;
        }
        if (result.blockHash == null) {
          return void 0;
        }
        const receipt = this.formatter.receipt(result);
        if (receipt.blockNumber == null) {
          receipt.confirmations = 0;
        } else if (receipt.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          let confirmations = blockNumber - receipt.blockNumber + 1;
          if (confirmations <= 0) {
            confirmations = 1;
          }
          receipt.confirmations = confirmations;
        }
        return receipt;
      }), {oncePoll: this});
    });
  }
  getLogs(filter) {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({filter: this._getFilter(filter)});
      const logs = yield this.perform("getLogs", params);
      logs.forEach((log) => {
        if (log.removed == null) {
          log.removed = false;
        }
      });
      return Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
    });
  }
  getEtherPrice() {
    return __awaiter$6(this, void 0, void 0, function* () {
      yield this.getNetwork();
      return this.perform("getEtherPrice", {});
    });
  }
  _getBlockTag(blockTag) {
    return __awaiter$6(this, void 0, void 0, function* () {
      blockTag = yield blockTag;
      if (typeof blockTag === "number" && blockTag < 0) {
        if (blockTag % 1) {
          logger$d.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
        }
        let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        blockNumber += blockTag;
        if (blockNumber < 0) {
          blockNumber = 0;
        }
        return this.formatter.blockTag(blockNumber);
      }
      return this.formatter.blockTag(blockTag);
    });
  }
  getResolver(name2) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const address = yield this._getResolver(name2);
      if (address == null) {
        return null;
      }
      return new Resolver(this, address, name2);
    });
  }
  _getResolver(name2) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const network = yield this.getNetwork();
      if (!network.ensAddress) {
        logger$d.throwError("network does not support ENS", Logger.errors.UNSUPPORTED_OPERATION, {operation: "ENS", network: network.name});
      }
      const transaction = {
        to: network.ensAddress,
        data: "0x0178b8bf" + namehash(name2).substring(2)
      };
      return this.formatter.callAddress(yield this.call(transaction));
    });
  }
  resolveName(name2) {
    return __awaiter$6(this, void 0, void 0, function* () {
      name2 = yield name2;
      try {
        return Promise.resolve(this.formatter.address(name2));
      } catch (error2) {
        if (isHexString(name2)) {
          throw error2;
        }
      }
      if (typeof name2 !== "string") {
        logger$d.throwArgumentError("invalid ENS name", "name", name2);
      }
      const resolver = yield this.getResolver(name2);
      if (!resolver) {
        return null;
      }
      return yield resolver.getAddress();
    });
  }
  lookupAddress(address) {
    return __awaiter$6(this, void 0, void 0, function* () {
      address = yield address;
      address = this.formatter.address(address);
      const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
      const resolverAddress = yield this._getResolver(reverseName);
      if (!resolverAddress) {
        return null;
      }
      let bytes = arrayify(yield this.call({
        to: resolverAddress,
        data: "0x691f3431" + namehash(reverseName).substring(2)
      }));
      if (bytes.length < 32 || !BigNumber.from(bytes.slice(0, 32)).eq(32)) {
        return null;
      }
      bytes = bytes.slice(32);
      if (bytes.length < 32) {
        return null;
      }
      const length = BigNumber.from(bytes.slice(0, 32)).toNumber();
      bytes = bytes.slice(32);
      if (length > bytes.length) {
        return null;
      }
      const name2 = toUtf8String(bytes.slice(0, length));
      const addr = yield this.resolveName(name2);
      if (addr != address) {
        return null;
      }
      return name2;
    });
  }
  perform(method, params) {
    return logger$d.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, {operation: method});
  }
  _startEvent(event) {
    this.polling = this._events.filter((e) => e.pollable()).length > 0;
  }
  _stopEvent(event) {
    this.polling = this._events.filter((e) => e.pollable()).length > 0;
  }
  _addEventListener(eventName, listener, once) {
    const event = new Event(getEventTag(eventName), listener, once);
    this._events.push(event);
    this._startEvent(event);
    return this;
  }
  on(eventName, listener) {
    return this._addEventListener(eventName, listener, false);
  }
  once(eventName, listener) {
    return this._addEventListener(eventName, listener, true);
  }
  emit(eventName, ...args) {
    let result = false;
    let stopped = [];
    let eventTag = getEventTag(eventName);
    this._events = this._events.filter((event) => {
      if (event.tag !== eventTag) {
        return true;
      }
      setTimeout(() => {
        event.listener.apply(this, args);
      }, 0);
      result = true;
      if (event.once) {
        stopped.push(event);
        return false;
      }
      return true;
    });
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return result;
  }
  listenerCount(eventName) {
    if (!eventName) {
      return this._events.length;
    }
    let eventTag = getEventTag(eventName);
    return this._events.filter((event) => {
      return event.tag === eventTag;
    }).length;
  }
  listeners(eventName) {
    if (eventName == null) {
      return this._events.map((event) => event.listener);
    }
    let eventTag = getEventTag(eventName);
    return this._events.filter((event) => event.tag === eventTag).map((event) => event.listener);
  }
  off(eventName, listener) {
    if (listener == null) {
      return this.removeAllListeners(eventName);
    }
    const stopped = [];
    let found = false;
    let eventTag = getEventTag(eventName);
    this._events = this._events.filter((event) => {
      if (event.tag !== eventTag || event.listener != listener) {
        return true;
      }
      if (found) {
        return true;
      }
      found = true;
      stopped.push(event);
      return false;
    });
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return this;
  }
  removeAllListeners(eventName) {
    let stopped = [];
    if (eventName == null) {
      stopped = this._events;
      this._events = [];
    } else {
      const eventTag = getEventTag(eventName);
      this._events = this._events.filter((event) => {
        if (event.tag !== eventTag) {
          return true;
        }
        stopped.push(event);
        return false;
      });
    }
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return this;
  }
}
var __awaiter$5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$c = new Logger(version$1);
const errorGas = ["call", "estimateGas"];
function checkError$1(method, error2, params) {
  if (method === "call" && error2.code === Logger.errors.SERVER_ERROR) {
    const e = error2.error;
    if (e && e.message.match("reverted") && isHexString(e.data)) {
      return e.data;
    }
  }
  let message = error2.message;
  if (error2.code === Logger.errors.SERVER_ERROR && error2.error && typeof error2.error.message === "string") {
    message = error2.error.message;
  } else if (typeof error2.body === "string") {
    message = error2.body;
  } else if (typeof error2.responseText === "string") {
    message = error2.responseText;
  }
  message = (message || "").toLowerCase();
  const transaction = params.transaction || params.signedTransaction;
  if (message.match(/insufficient funds/)) {
    logger$c.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error: error2,
      method,
      transaction
    });
  }
  if (message.match(/nonce too low/)) {
    logger$c.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error: error2,
      method,
      transaction
    });
  }
  if (message.match(/replacement transaction underpriced/)) {
    logger$c.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error: error2,
      method,
      transaction
    });
  }
  if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
    logger$c.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error: error2,
      method,
      transaction
    });
  }
  throw error2;
}
function timer(timeout) {
  return new Promise(function(resolve2) {
    setTimeout(resolve2, timeout);
  });
}
function getResult$1(payload) {
  if (payload.error) {
    const error2 = new Error(payload.error.message);
    error2.code = payload.error.code;
    error2.data = payload.error.data;
    throw error2;
  }
  return payload.result;
}
function getLowerCase(value) {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}
const _constructorGuard = {};
class JsonRpcSigner extends Signer {
  constructor(constructorGuard, provider, addressOrIndex) {
    logger$c.checkNew(new.target, JsonRpcSigner);
    super();
    if (constructorGuard !== _constructorGuard) {
      throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
    }
    defineReadOnly(this, "provider", provider);
    if (addressOrIndex == null) {
      addressOrIndex = 0;
    }
    if (typeof addressOrIndex === "string") {
      defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
      defineReadOnly(this, "_index", null);
    } else if (typeof addressOrIndex === "number") {
      defineReadOnly(this, "_index", addressOrIndex);
      defineReadOnly(this, "_address", null);
    } else {
      logger$c.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
    }
  }
  connect(provider) {
    return logger$c.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "connect"
    });
  }
  connectUnchecked() {
    return new UncheckedJsonRpcSigner(_constructorGuard, this.provider, this._address || this._index);
  }
  getAddress() {
    if (this._address) {
      return Promise.resolve(this._address);
    }
    return this.provider.send("eth_accounts", []).then((accounts) => {
      if (accounts.length <= this._index) {
        logger$c.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "getAddress"
        });
      }
      return this.provider.formatter.address(accounts[this._index]);
    });
  }
  sendUncheckedTransaction(transaction) {
    transaction = shallowCopy(transaction);
    const fromAddress = this.getAddress().then((address) => {
      if (address) {
        address = address.toLowerCase();
      }
      return address;
    });
    if (transaction.gasLimit == null) {
      const estimate = shallowCopy(transaction);
      estimate.from = fromAddress;
      transaction.gasLimit = this.provider.estimateGas(estimate);
    }
    return resolveProperties({
      tx: resolveProperties(transaction),
      sender: fromAddress
    }).then(({tx, sender}) => {
      if (tx.from != null) {
        if (tx.from.toLowerCase() !== sender) {
          logger$c.throwArgumentError("from address mismatch", "transaction", transaction);
        }
      } else {
        tx.from = sender;
      }
      const hexTx = this.provider.constructor.hexlifyTransaction(tx, {from: true});
      return this.provider.send("eth_sendTransaction", [hexTx]).then((hash) => {
        return hash;
      }, (error2) => {
        return checkError$1("sendTransaction", error2, hexTx);
      });
    });
  }
  signTransaction(transaction) {
    return logger$c.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "signTransaction"
    });
  }
  sendTransaction(transaction) {
    return this.sendUncheckedTransaction(transaction).then((hash) => {
      return poll(() => {
        return this.provider.getTransaction(hash).then((tx) => {
          if (tx === null) {
            return void 0;
          }
          return this.provider._wrapTransaction(tx, hash);
        });
      }, {onceBlock: this.provider}).catch((error2) => {
        error2.transactionHash = hash;
        throw error2;
      });
    });
  }
  signMessage(message) {
    return __awaiter$5(this, void 0, void 0, function* () {
      const data = typeof message === "string" ? toUtf8Bytes(message) : message;
      const address = yield this.getAddress();
      return yield this.provider.send("eth_sign", [address.toLowerCase(), hexlify(data)]);
    });
  }
  _signTypedData(domain, types, value) {
    return __awaiter$5(this, void 0, void 0, function* () {
      const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
        return this.provider.resolveName(name2);
      });
      const address = yield this.getAddress();
      return yield this.provider.send("eth_signTypedData_v4", [
        address.toLowerCase(),
        JSON.stringify(TypedDataEncoder.getPayload(populated.domain, types, populated.value))
      ]);
    });
  }
  unlock(password) {
    return __awaiter$5(this, void 0, void 0, function* () {
      const provider = this.provider;
      const address = yield this.getAddress();
      return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
    });
  }
}
class UncheckedJsonRpcSigner extends JsonRpcSigner {
  sendTransaction(transaction) {
    return this.sendUncheckedTransaction(transaction).then((hash) => {
      return {
        hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations) => {
          return this.provider.waitForTransaction(hash, confirmations);
        }
      };
    });
  }
}
const allowedTransactionKeys = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
  type: true,
  accessList: true
};
class JsonRpcProvider extends BaseProvider {
  constructor(url2, network) {
    logger$c.checkNew(new.target, JsonRpcProvider);
    let networkOrReady = network;
    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve2, reject) => {
        setTimeout(() => {
          this.detectNetwork().then((network2) => {
            resolve2(network2);
          }, (error2) => {
            reject(error2);
          });
        }, 0);
      });
    }
    super(networkOrReady);
    if (!url2) {
      url2 = getStatic(this.constructor, "defaultUrl")();
    }
    if (typeof url2 === "string") {
      defineReadOnly(this, "connection", Object.freeze({
        url: url2
      }));
    } else {
      defineReadOnly(this, "connection", Object.freeze(shallowCopy(url2)));
    }
    this._nextId = 42;
  }
  static defaultUrl() {
    return "http://localhost:8545";
  }
  detectNetwork() {
    return __awaiter$5(this, void 0, void 0, function* () {
      yield timer(0);
      let chainId = null;
      try {
        chainId = yield this.send("eth_chainId", []);
      } catch (error2) {
        try {
          chainId = yield this.send("net_version", []);
        } catch (error3) {
        }
      }
      if (chainId != null) {
        const getNetwork2 = getStatic(this.constructor, "getNetwork");
        try {
          return getNetwork2(BigNumber.from(chainId).toNumber());
        } catch (error2) {
          return logger$c.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
            chainId,
            event: "invalidNetwork",
            serverError: error2
          });
        }
      }
      return logger$c.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
        event: "noNetwork"
      });
    });
  }
  getSigner(addressOrIndex) {
    return new JsonRpcSigner(_constructorGuard, this, addressOrIndex);
  }
  getUncheckedSigner(addressOrIndex) {
    return this.getSigner(addressOrIndex).connectUnchecked();
  }
  listAccounts() {
    return this.send("eth_accounts", []).then((accounts) => {
      return accounts.map((a) => this.formatter.address(a));
    });
  }
  send(method, params) {
    const request = {
      method,
      params,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    this.emit("debug", {
      action: "request",
      request: deepCopy(request),
      provider: this
    });
    return fetchJson(this.connection, JSON.stringify(request), getResult$1).then((result) => {
      this.emit("debug", {
        action: "response",
        request,
        response: result,
        provider: this
      });
      return result;
    }, (error2) => {
      this.emit("debug", {
        action: "response",
        error: error2,
        request,
        provider: this
      });
      throw error2;
    });
  }
  prepareRequest(method, params) {
    switch (method) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];
      case "getGasPrice":
        return ["eth_gasPrice", []];
      case "getBalance":
        return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
      case "getTransactionCount":
        return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
      case "getCode":
        return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
      case "getStorageAt":
        return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
      case "sendTransaction":
        return ["eth_sendRawTransaction", [params.signedTransaction]];
      case "getBlock":
        if (params.blockTag) {
          return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
        } else if (params.blockHash) {
          return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
        }
        return null;
      case "getTransaction":
        return ["eth_getTransactionByHash", [params.transactionHash]];
      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [params.transactionHash]];
      case "call": {
        const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
        return ["eth_call", [hexlifyTransaction(params.transaction, {from: true}), params.blockTag]];
      }
      case "estimateGas": {
        const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
        return ["eth_estimateGas", [hexlifyTransaction(params.transaction, {from: true})]];
      }
      case "getLogs":
        if (params.filter && params.filter.address != null) {
          params.filter.address = getLowerCase(params.filter.address);
        }
        return ["eth_getLogs", [params.filter]];
    }
    return null;
  }
  perform(method, params) {
    return __awaiter$5(this, void 0, void 0, function* () {
      const args = this.prepareRequest(method, params);
      if (args == null) {
        logger$c.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, {operation: method});
      }
      try {
        return yield this.send(args[0], args[1]);
      } catch (error2) {
        return checkError$1(method, error2, params);
      }
    });
  }
  _startEvent(event) {
    if (event.tag === "pending") {
      this._startPending();
    }
    super._startEvent(event);
  }
  _startPending() {
    if (this._pendingFilter != null) {
      return;
    }
    const self2 = this;
    const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
    this._pendingFilter = pendingFilter;
    pendingFilter.then(function(filterId) {
      function poll2() {
        self2.send("eth_getFilterChanges", [filterId]).then(function(hashes) {
          if (self2._pendingFilter != pendingFilter) {
            return null;
          }
          let seq = Promise.resolve();
          hashes.forEach(function(hash) {
            self2._emitted["t:" + hash.toLowerCase()] = "pending";
            seq = seq.then(function() {
              return self2.getTransaction(hash).then(function(tx) {
                self2.emit("pending", tx);
                return null;
              });
            });
          });
          return seq.then(function() {
            return timer(1e3);
          });
        }).then(function() {
          if (self2._pendingFilter != pendingFilter) {
            self2.send("eth_uninstallFilter", [filterId]);
            return;
          }
          setTimeout(function() {
            poll2();
          }, 0);
          return null;
        }).catch((error2) => {
        });
      }
      poll2();
      return filterId;
    }).catch((error2) => {
    });
  }
  _stopEvent(event) {
    if (event.tag === "pending" && this.listenerCount("pending") === 0) {
      this._pendingFilter = null;
    }
    super._stopEvent(event);
  }
  static hexlifyTransaction(transaction, allowExtra) {
    const allowed = shallowCopy(allowedTransactionKeys);
    if (allowExtra) {
      for (const key2 in allowExtra) {
        if (allowExtra[key2]) {
          allowed[key2] = true;
        }
      }
    }
    checkProperties(transaction, allowed);
    const result = {};
    ["gasLimit", "gasPrice", "type", "nonce", "value"].forEach(function(key2) {
      if (transaction[key2] == null) {
        return;
      }
      const value = hexValue(transaction[key2]);
      if (key2 === "gasLimit") {
        key2 = "gas";
      }
      result[key2] = value;
    });
    ["from", "to", "data"].forEach(function(key2) {
      if (transaction[key2] == null) {
        return;
      }
      result[key2] = hexlify(transaction[key2]);
    });
    if (transaction.accessList) {
      result["accessList"] = accessListify(transaction.accessList);
    }
    return result;
  }
}
let WS = null;
try {
  WS = WebSocket;
  if (WS == null) {
    throw new Error("inject please");
  }
} catch (error2) {
  const logger2 = new Logger(version$1);
  WS = function() {
    logger2.throwError("WebSockets not supported in this environment", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "new WebSocket()"
    });
  };
}
var __awaiter$4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$b = new Logger(version$1);
let NextId = 1;
class WebSocketProvider extends JsonRpcProvider {
  constructor(url2, network) {
    if (network === "any") {
      logger$b.throwError("WebSocketProvider does not support 'any' network yet", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "network:any"
      });
    }
    super(url2, network);
    this._pollingInterval = -1;
    this._wsReady = false;
    defineReadOnly(this, "_websocket", new WS(this.connection.url));
    defineReadOnly(this, "_requests", {});
    defineReadOnly(this, "_subs", {});
    defineReadOnly(this, "_subIds", {});
    defineReadOnly(this, "_detectNetwork", super.detectNetwork());
    this._websocket.onopen = () => {
      this._wsReady = true;
      Object.keys(this._requests).forEach((id2) => {
        this._websocket.send(this._requests[id2].payload);
      });
    };
    this._websocket.onmessage = (messageEvent) => {
      const data = messageEvent.data;
      const result = JSON.parse(data);
      if (result.id != null) {
        const id2 = String(result.id);
        const request = this._requests[id2];
        delete this._requests[id2];
        if (result.result !== void 0) {
          request.callback(null, result.result);
          this.emit("debug", {
            action: "response",
            request: JSON.parse(request.payload),
            response: result.result,
            provider: this
          });
        } else {
          let error2 = null;
          if (result.error) {
            error2 = new Error(result.error.message || "unknown error");
            defineReadOnly(error2, "code", result.error.code || null);
            defineReadOnly(error2, "response", data);
          } else {
            error2 = new Error("unknown error");
          }
          request.callback(error2, void 0);
          this.emit("debug", {
            action: "response",
            error: error2,
            request: JSON.parse(request.payload),
            provider: this
          });
        }
      } else if (result.method === "eth_subscription") {
        const sub = this._subs[result.params.subscription];
        if (sub) {
          sub.processFunc(result.params.result);
        }
      } else {
        console.warn("this should not happen");
      }
    };
    const fauxPoll = setInterval(() => {
      this.emit("poll");
    }, 1e3);
    if (fauxPoll.unref) {
      fauxPoll.unref();
    }
  }
  detectNetwork() {
    return this._detectNetwork;
  }
  get pollingInterval() {
    return 0;
  }
  resetEventsBlock(blockNumber) {
    logger$b.throwError("cannot reset events block on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "resetEventBlock"
    });
  }
  set pollingInterval(value) {
    logger$b.throwError("cannot set polling interval on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPollingInterval"
    });
  }
  poll() {
    return __awaiter$4(this, void 0, void 0, function* () {
      return null;
    });
  }
  set polling(value) {
    if (!value) {
      return;
    }
    logger$b.throwError("cannot set polling on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPolling"
    });
  }
  send(method, params) {
    const rid = NextId++;
    return new Promise((resolve2, reject) => {
      function callback(error2, result) {
        if (error2) {
          return reject(error2);
        }
        return resolve2(result);
      }
      const payload = JSON.stringify({
        method,
        params,
        id: rid,
        jsonrpc: "2.0"
      });
      this.emit("debug", {
        action: "request",
        request: JSON.parse(payload),
        provider: this
      });
      this._requests[String(rid)] = {callback, payload};
      if (this._wsReady) {
        this._websocket.send(payload);
      }
    });
  }
  static defaultUrl() {
    return "ws://localhost:8546";
  }
  _subscribe(tag, param, processFunc) {
    return __awaiter$4(this, void 0, void 0, function* () {
      let subIdPromise = this._subIds[tag];
      if (subIdPromise == null) {
        subIdPromise = Promise.all(param).then((param2) => {
          return this.send("eth_subscribe", param2);
        });
        this._subIds[tag] = subIdPromise;
      }
      const subId = yield subIdPromise;
      this._subs[subId] = {tag, processFunc};
    });
  }
  _startEvent(event) {
    switch (event.type) {
      case "block":
        this._subscribe("block", ["newHeads"], (result) => {
          const blockNumber = BigNumber.from(result.number).toNumber();
          this._emitted.block = blockNumber;
          this.emit("block", blockNumber);
        });
        break;
      case "pending":
        this._subscribe("pending", ["newPendingTransactions"], (result) => {
          this.emit("pending", result);
        });
        break;
      case "filter":
        this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], (result) => {
          if (result.removed == null) {
            result.removed = false;
          }
          this.emit(event.filter, this.formatter.filterLog(result));
        });
        break;
      case "tx": {
        const emitReceipt = (event2) => {
          const hash = event2.hash;
          this.getTransactionReceipt(hash).then((receipt) => {
            if (!receipt) {
              return;
            }
            this.emit(hash, receipt);
          });
        };
        emitReceipt(event);
        this._subscribe("tx", ["newHeads"], (result) => {
          this._events.filter((e) => e.type === "tx").forEach(emitReceipt);
        });
        break;
      }
      case "debug":
      case "poll":
      case "willPoll":
      case "didPoll":
      case "error":
        break;
      default:
        console.log("unhandled:", event);
        break;
    }
  }
  _stopEvent(event) {
    let tag = event.tag;
    if (event.type === "tx") {
      if (this._events.filter((e) => e.type === "tx").length) {
        return;
      }
      tag = "tx";
    } else if (this.listenerCount(event.event)) {
      return;
    }
    const subId = this._subIds[tag];
    if (!subId) {
      return;
    }
    delete this._subIds[tag];
    subId.then((subId2) => {
      if (!this._subs[subId2]) {
        return;
      }
      delete this._subs[subId2];
      this.send("eth_unsubscribe", [subId2]);
    });
  }
  destroy() {
    return __awaiter$4(this, void 0, void 0, function* () {
      if (this._websocket.readyState === WS.CONNECTING) {
        yield new Promise((resolve2) => {
          this._websocket.onopen = function() {
            resolve2(true);
          };
          this._websocket.onerror = function() {
            resolve2(false);
          };
        });
      }
      this._websocket.close(1e3);
    });
  }
}
var __awaiter$3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$a = new Logger(version$1);
class StaticJsonRpcProvider extends JsonRpcProvider {
  detectNetwork() {
    const _super = Object.create(null, {
      detectNetwork: {get: () => super.detectNetwork}
    });
    return __awaiter$3(this, void 0, void 0, function* () {
      let network = this.network;
      if (network == null) {
        network = yield _super.detectNetwork.call(this);
        if (!network) {
          logger$a.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
        }
        if (this._network == null) {
          defineReadOnly(this, "_network", network);
          this.emit("network", network, null);
        }
      }
      return network;
    });
  }
}
class UrlJsonRpcProvider extends StaticJsonRpcProvider {
  constructor(network, apiKey) {
    logger$a.checkAbstract(new.target, UrlJsonRpcProvider);
    network = getStatic(new.target, "getNetwork")(network);
    apiKey = getStatic(new.target, "getApiKey")(apiKey);
    const connection = getStatic(new.target, "getUrl")(network, apiKey);
    super(connection, network);
    if (typeof apiKey === "string") {
      defineReadOnly(this, "apiKey", apiKey);
    } else if (apiKey != null) {
      Object.keys(apiKey).forEach((key2) => {
        defineReadOnly(this, key2, apiKey[key2]);
      });
    }
  }
  _startPending() {
    logger$a.warn("WARNING: API provider does not support pending filters");
  }
  isCommunityResource() {
    return false;
  }
  getSigner(address) {
    return logger$a.throwError("API provider does not support signing", Logger.errors.UNSUPPORTED_OPERATION, {operation: "getSigner"});
  }
  listAccounts() {
    return Promise.resolve([]);
  }
  static getApiKey(apiKey) {
    return apiKey;
  }
  static getUrl(network, apiKey) {
    return logger$a.throwError("not implemented; sub-classes must override getUrl", Logger.errors.NOT_IMPLEMENTED, {
      operation: "getUrl"
    });
  }
}
const logger$9 = new Logger(version$1);
const defaultApiKey$2 = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
class AlchemyWebSocketProvider extends WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new AlchemyProvider(network, apiKey);
    const url2 = provider.connection.url.replace(/^http/i, "ws").replace(".alchemyapi.", ".ws.alchemyapi.");
    super(url2, provider.network);
    defineReadOnly(this, "apiKey", provider.apiKey);
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey$2;
  }
}
class AlchemyProvider extends UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new AlchemyWebSocketProvider(network, apiKey);
  }
  static getApiKey(apiKey) {
    if (apiKey == null) {
      return defaultApiKey$2;
    }
    if (apiKey && typeof apiKey !== "string") {
      logger$9.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }
    return apiKey;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "eth-mainnet.alchemyapi.io/v2/";
        break;
      case "ropsten":
        host = "eth-ropsten.alchemyapi.io/v2/";
        break;
      case "rinkeby":
        host = "eth-rinkeby.alchemyapi.io/v2/";
        break;
      case "goerli":
        host = "eth-goerli.alchemyapi.io/v2/";
        break;
      case "kovan":
        host = "eth-kovan.alchemyapi.io/v2/";
        break;
      default:
        logger$9.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return {
      allowGzip: true,
      url: "https://" + host + apiKey,
      throttleCallback: (attempt, url2) => {
        if (apiKey === defaultApiKey$2) {
          showThrottleMessage();
        }
        return Promise.resolve(true);
      }
    };
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey$2;
  }
}
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$8 = new Logger(version$1);
class CloudflareProvider extends UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey != null) {
      logger$8.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
    }
    return null;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "https://cloudflare-eth.com/";
        break;
      default:
        logger$8.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return host;
  }
  perform(method, params) {
    const _super = Object.create(null, {
      perform: {get: () => super.perform}
    });
    return __awaiter$2(this, void 0, void 0, function* () {
      if (method === "getBlockNumber") {
        const block = yield _super.perform.call(this, "getBlock", {blockTag: "latest"});
        return block.number;
      }
      return _super.perform.call(this, method, params);
    });
  }
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$7 = new Logger(version$1);
function getTransactionPostData(transaction) {
  const result = {};
  for (let key2 in transaction) {
    if (transaction[key2] == null) {
      continue;
    }
    let value = transaction[key2];
    if ({type: true, gasLimit: true, gasPrice: true, nonce: true, value: true}[key2]) {
      value = hexValue(hexlify(value));
    } else if (key2 === "accessList") {
      value = value;
    } else {
      value = hexlify(value);
    }
    result[key2] = value;
  }
  return result;
}
function getResult(result) {
  if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
    return result.result;
  }
  if (result.status != 1 || result.message != "OK") {
    const error2 = new Error("invalid response");
    error2.result = JSON.stringify(result);
    if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
      error2.throttleRetry = true;
    }
    throw error2;
  }
  return result.result;
}
function getJsonResult(result) {
  if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
    const error2 = new Error("throttled response");
    error2.result = JSON.stringify(result);
    error2.throttleRetry = true;
    throw error2;
  }
  if (result.jsonrpc != "2.0") {
    const error2 = new Error("invalid response");
    error2.result = JSON.stringify(result);
    throw error2;
  }
  if (result.error) {
    const error2 = new Error(result.error.message || "unknown error");
    if (result.error.code) {
      error2.code = result.error.code;
    }
    if (result.error.data) {
      error2.data = result.error.data;
    }
    throw error2;
  }
  return result.result;
}
function checkLogTag(blockTag) {
  if (blockTag === "pending") {
    throw new Error("pending not supported");
  }
  if (blockTag === "latest") {
    return blockTag;
  }
  return parseInt(blockTag.substring(2), 16);
}
const defaultApiKey$1 = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
function checkError(method, error2, transaction) {
  if (method === "call" && error2.code === Logger.errors.SERVER_ERROR) {
    const e = error2.error;
    if (e && e.message.match("reverted") && isHexString(e.data)) {
      return e.data;
    }
  }
  let message = error2.message;
  if (error2.code === Logger.errors.SERVER_ERROR) {
    if (error2.error && typeof error2.error.message === "string") {
      message = error2.error.message;
    } else if (typeof error2.body === "string") {
      message = error2.body;
    } else if (typeof error2.responseText === "string") {
      message = error2.responseText;
    }
  }
  message = (message || "").toLowerCase();
  if (message.match(/insufficient funds/)) {
    logger$7.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error: error2,
      method,
      transaction
    });
  }
  if (message.match(/same hash was already imported|transaction nonce is too low/)) {
    logger$7.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error: error2,
      method,
      transaction
    });
  }
  if (message.match(/another transaction with same nonce/)) {
    logger$7.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error: error2,
      method,
      transaction
    });
  }
  if (message.match(/execution failed due to an exception/)) {
    logger$7.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error: error2,
      method,
      transaction
    });
  }
  throw error2;
}
class EtherscanProvider extends BaseProvider {
  constructor(network, apiKey) {
    logger$7.checkNew(new.target, EtherscanProvider);
    super(network);
    let name2 = "invalid";
    if (this.network) {
      name2 = this.network.name;
    }
    let baseUrl = null;
    switch (name2) {
      case "homestead":
        baseUrl = "https://api.etherscan.io";
        break;
      case "ropsten":
        baseUrl = "https://api-ropsten.etherscan.io";
        break;
      case "rinkeby":
        baseUrl = "https://api-rinkeby.etherscan.io";
        break;
      case "kovan":
        baseUrl = "https://api-kovan.etherscan.io";
        break;
      case "goerli":
        baseUrl = "https://api-goerli.etherscan.io";
        break;
      default:
        throw new Error("unsupported network");
    }
    defineReadOnly(this, "baseUrl", baseUrl);
    defineReadOnly(this, "apiKey", apiKey || defaultApiKey$1);
  }
  detectNetwork() {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.network;
    });
  }
  perform(method, params) {
    const _super = Object.create(null, {
      perform: {get: () => super.perform}
    });
    return __awaiter$1(this, void 0, void 0, function* () {
      let url2 = this.baseUrl + "/api";
      let apiKey = "";
      if (this.apiKey) {
        apiKey += "&apikey=" + this.apiKey;
      }
      const get = (url3, payload, procFunc) => __awaiter$1(this, void 0, void 0, function* () {
        this.emit("debug", {
          action: "request",
          request: url3,
          provider: this
        });
        const connection = {
          url: url3,
          throttleSlotInterval: 1e3,
          throttleCallback: (attempt, url4) => {
            if (this.isCommunityResource()) {
              showThrottleMessage();
            }
            return Promise.resolve(true);
          }
        };
        let payloadStr = null;
        if (payload) {
          connection.headers = {"content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
          payloadStr = Object.keys(payload).map((key2) => {
            return `${key2}=${payload[key2]}`;
          }).join("&");
        }
        const result = yield fetchJson(connection, payloadStr, procFunc || getJsonResult);
        this.emit("debug", {
          action: "response",
          request: url3,
          response: deepCopy(result),
          provider: this
        });
        return result;
      });
      switch (method) {
        case "getBlockNumber":
          url2 += "?module=proxy&action=eth_blockNumber" + apiKey;
          return get(url2, null);
        case "getGasPrice":
          url2 += "?module=proxy&action=eth_gasPrice" + apiKey;
          return get(url2, null);
        case "getBalance":
          url2 += "?module=account&action=balance&address=" + params.address;
          url2 += "&tag=" + params.blockTag + apiKey;
          return get(url2, null, getResult);
        case "getTransactionCount":
          url2 += "?module=proxy&action=eth_getTransactionCount&address=" + params.address;
          url2 += "&tag=" + params.blockTag + apiKey;
          return get(url2, null);
        case "getCode":
          url2 += "?module=proxy&action=eth_getCode&address=" + params.address;
          url2 += "&tag=" + params.blockTag + apiKey;
          return get(url2, null);
        case "getStorageAt":
          url2 += "?module=proxy&action=eth_getStorageAt&address=" + params.address;
          url2 += "&position=" + params.position;
          url2 += "&tag=" + params.blockTag + apiKey;
          return get(url2, null);
        case "sendTransaction":
          return get(url2, {
            module: "proxy",
            action: "eth_sendRawTransaction",
            hex: params.signedTransaction,
            apikey: this.apiKey
          }).catch((error2) => {
            return checkError("sendTransaction", error2, params.signedTransaction);
          });
        case "getBlock":
          if (params.blockTag) {
            url2 += "?module=proxy&action=eth_getBlockByNumber&tag=" + params.blockTag;
            if (params.includeTransactions) {
              url2 += "&boolean=true";
            } else {
              url2 += "&boolean=false";
            }
            url2 += apiKey;
            return get(url2, null);
          }
          throw new Error("getBlock by blockHash not implemented");
        case "getTransaction":
          url2 += "?module=proxy&action=eth_getTransactionByHash&txhash=" + params.transactionHash;
          url2 += apiKey;
          return get(url2, null);
        case "getTransactionReceipt":
          url2 += "?module=proxy&action=eth_getTransactionReceipt&txhash=" + params.transactionHash;
          url2 += apiKey;
          return get(url2, null);
        case "call": {
          if (params.transaction.type != null) {
            logger$7.throwError("Etherscan does not currently support Berlin", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "call",
              transaction: params.transaction
            });
          }
          if (params.blockTag !== "latest") {
            throw new Error("EtherscanProvider does not support blockTag for call");
          }
          const postData = getTransactionPostData(params.transaction);
          postData.module = "proxy";
          postData.action = "eth_call";
          postData.apikey = this.apiKey;
          try {
            return yield get(url2, postData);
          } catch (error2) {
            return checkError("call", error2, params.transaction);
          }
        }
        case "estimateGas": {
          if (params.transaction.type != null) {
            logger$7.throwError("Etherscan does not currently support Berlin", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "estimateGas",
              transaction: params.transaction
            });
          }
          const postData = getTransactionPostData(params.transaction);
          postData.module = "proxy";
          postData.action = "eth_estimateGas";
          postData.apikey = this.apiKey;
          try {
            return yield get(url2, postData);
          } catch (error2) {
            return checkError("estimateGas", error2, params.transaction);
          }
        }
        case "getLogs": {
          url2 += "?module=logs&action=getLogs";
          if (params.filter.fromBlock) {
            url2 += "&fromBlock=" + checkLogTag(params.filter.fromBlock);
          }
          if (params.filter.toBlock) {
            url2 += "&toBlock=" + checkLogTag(params.filter.toBlock);
          }
          if (params.filter.address) {
            url2 += "&address=" + params.filter.address;
          }
          if (params.filter.topics && params.filter.topics.length > 0) {
            if (params.filter.topics.length > 1) {
              logger$7.throwError("unsupported topic count", Logger.errors.UNSUPPORTED_OPERATION, {topics: params.filter.topics});
            }
            if (params.filter.topics.length === 1) {
              const topic0 = params.filter.topics[0];
              if (typeof topic0 !== "string" || topic0.length !== 66) {
                logger$7.throwError("unsupported topic format", Logger.errors.UNSUPPORTED_OPERATION, {topic0});
              }
              url2 += "&topic0=" + topic0;
            }
          }
          url2 += apiKey;
          const logs = yield get(url2, null, getResult);
          let blocks = {};
          for (let i = 0; i < logs.length; i++) {
            const log = logs[i];
            if (log.blockHash != null) {
              continue;
            }
            if (blocks[log.blockNumber] == null) {
              const block = yield this.getBlock(log.blockNumber);
              if (block) {
                blocks[log.blockNumber] = block.hash;
              }
            }
            log.blockHash = blocks[log.blockNumber];
          }
          return logs;
        }
        case "getEtherPrice":
          if (this.network.name !== "homestead") {
            return 0;
          }
          url2 += "?module=stats&action=ethprice";
          url2 += apiKey;
          return parseFloat((yield get(url2, null, getResult)).ethusd);
      }
      return _super.perform.call(this, method, params);
    });
  }
  getHistory(addressOrName, startBlock, endBlock) {
    let url2 = this.baseUrl;
    let apiKey = "";
    if (this.apiKey) {
      apiKey += "&apikey=" + this.apiKey;
    }
    if (startBlock == null) {
      startBlock = 0;
    }
    if (endBlock == null) {
      endBlock = 99999999;
    }
    return this.resolveName(addressOrName).then((address) => {
      url2 += "/api?module=account&action=txlist&address=" + address;
      url2 += "&startblock=" + startBlock;
      url2 += "&endblock=" + endBlock;
      url2 += "&sort=asc" + apiKey;
      this.emit("debug", {
        action: "request",
        request: url2,
        provider: this
      });
      const connection = {
        url: url2,
        throttleSlotInterval: 1e3,
        throttleCallback: (attempt, url3) => {
          if (this.apiKey === defaultApiKey$1) {
            showThrottleMessage();
          }
          return Promise.resolve(true);
        }
      };
      return fetchJson(connection, null, getResult).then((result) => {
        this.emit("debug", {
          action: "response",
          request: url2,
          response: deepCopy(result),
          provider: this
        });
        let output = [];
        result.forEach((tx) => {
          ["contractAddress", "to"].forEach(function(key2) {
            if (tx[key2] == "") {
              delete tx[key2];
            }
          });
          if (tx.creates == null && tx.contractAddress != null) {
            tx.creates = tx.contractAddress;
          }
          let item = this.formatter.transactionResponse(tx);
          if (tx.timeStamp) {
            item.timestamp = parseInt(tx.timeStamp);
          }
          output.push(item);
        });
        return output;
      });
    });
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey$1;
  }
}
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$6 = new Logger(version$1);
function now() {
  return new Date().getTime();
}
function checkNetworks(networks2) {
  let result = null;
  for (let i = 0; i < networks2.length; i++) {
    const network = networks2[i];
    if (network == null) {
      return null;
    }
    if (result) {
      if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
        logger$6.throwArgumentError("provider mismatch", "networks", networks2);
      }
    } else {
      result = network;
    }
  }
  return result;
}
function median(values, maxDelta) {
  values = values.slice().sort();
  const middle = Math.floor(values.length / 2);
  if (values.length % 2) {
    return values[middle];
  }
  const a = values[middle - 1], b = values[middle];
  if (maxDelta != null && Math.abs(a - b) > maxDelta) {
    return null;
  }
  return (a + b) / 2;
}
function serialize(value) {
  if (value === null) {
    return "null";
  } else if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  } else if (typeof value === "string") {
    return value;
  } else if (BigNumber.isBigNumber(value)) {
    return value.toString();
  } else if (Array.isArray(value)) {
    return JSON.stringify(value.map((i) => serialize(i)));
  } else if (typeof value === "object") {
    const keys = Object.keys(value);
    keys.sort();
    return "{" + keys.map((key2) => {
      let v = value[key2];
      if (typeof v === "function") {
        v = "[function]";
      } else {
        v = serialize(v);
      }
      return JSON.stringify(key2) + ":" + v;
    }).join(",") + "}";
  }
  throw new Error("unknown value type: " + typeof value);
}
let nextRid = 1;
function stall(duration) {
  let cancel = null;
  let timer2 = null;
  let promise = new Promise((resolve2) => {
    cancel = function() {
      if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
      }
      resolve2();
    };
    timer2 = setTimeout(cancel, duration);
  });
  const wait = (func) => {
    promise = promise.then(func);
    return promise;
  };
  function getPromise() {
    return promise;
  }
  return {cancel, getPromise, wait};
}
const ForwardErrors = [
  Logger.errors.CALL_EXCEPTION,
  Logger.errors.INSUFFICIENT_FUNDS,
  Logger.errors.NONCE_EXPIRED,
  Logger.errors.REPLACEMENT_UNDERPRICED,
  Logger.errors.UNPREDICTABLE_GAS_LIMIT
];
const ForwardProperties = [
  "address",
  "args",
  "errorArgs",
  "errorSignature",
  "method",
  "transaction"
];
function exposeDebugConfig(config, now2) {
  const result = {
    weight: config.weight
  };
  Object.defineProperty(result, "provider", {get: () => config.provider});
  if (config.start) {
    result.start = config.start;
  }
  if (now2) {
    result.duration = now2 - config.start;
  }
  if (config.done) {
    if (config.error) {
      result.error = config.error;
    } else {
      result.result = config.result || null;
    }
  }
  return result;
}
function normalizedTally(normalize2, quorum) {
  return function(configs) {
    const tally = {};
    configs.forEach((c) => {
      const value = normalize2(c.result);
      if (!tally[value]) {
        tally[value] = {count: 0, result: c.result};
      }
      tally[value].count++;
    });
    const keys = Object.keys(tally);
    for (let i = 0; i < keys.length; i++) {
      const check = tally[keys[i]];
      if (check.count >= quorum) {
        return check.result;
      }
    }
    return void 0;
  };
}
function getProcessFunc(provider, method, params) {
  let normalize2 = serialize;
  switch (method) {
    case "getBlockNumber":
      return function(configs) {
        const values = configs.map((c) => c.result);
        let blockNumber = median(configs.map((c) => c.result), 2);
        if (blockNumber == null) {
          return void 0;
        }
        blockNumber = Math.ceil(blockNumber);
        if (values.indexOf(blockNumber + 1) >= 0) {
          blockNumber++;
        }
        if (blockNumber >= provider._highestBlockNumber) {
          provider._highestBlockNumber = blockNumber;
        }
        return provider._highestBlockNumber;
      };
    case "getGasPrice":
      return function(configs) {
        const values = configs.map((c) => c.result);
        values.sort();
        return values[Math.floor(values.length / 2)];
      };
    case "getEtherPrice":
      return function(configs) {
        return median(configs.map((c) => c.result));
      };
    case "getBalance":
    case "getTransactionCount":
    case "getCode":
    case "getStorageAt":
    case "call":
    case "estimateGas":
    case "getLogs":
      break;
    case "getTransaction":
    case "getTransactionReceipt":
      normalize2 = function(tx) {
        if (tx == null) {
          return null;
        }
        tx = shallowCopy(tx);
        tx.confirmations = -1;
        return serialize(tx);
      };
      break;
    case "getBlock":
      if (params.includeTransactions) {
        normalize2 = function(block) {
          if (block == null) {
            return null;
          }
          block = shallowCopy(block);
          block.transactions = block.transactions.map((tx) => {
            tx = shallowCopy(tx);
            tx.confirmations = -1;
            return tx;
          });
          return serialize(block);
        };
      } else {
        normalize2 = function(block) {
          if (block == null) {
            return null;
          }
          return serialize(block);
        };
      }
      break;
    default:
      throw new Error("unknown method: " + method);
  }
  return normalizedTally(normalize2, provider.quorum);
}
function waitForSync(config, blockNumber) {
  return __awaiter(this, void 0, void 0, function* () {
    const provider = config.provider;
    if (provider.blockNumber != null && provider.blockNumber >= blockNumber || blockNumber === -1) {
      return provider;
    }
    return poll(() => {
      return new Promise((resolve2, reject) => {
        setTimeout(function() {
          if (provider.blockNumber >= blockNumber) {
            return resolve2(provider);
          }
          if (config.cancelled) {
            return resolve2(null);
          }
          return resolve2(void 0);
        }, 0);
      });
    }, {oncePoll: provider});
  });
}
function getRunner(config, currentBlockNumber, method, params) {
  return __awaiter(this, void 0, void 0, function* () {
    let provider = config.provider;
    switch (method) {
      case "getBlockNumber":
      case "getGasPrice":
        return provider[method]();
      case "getEtherPrice":
        if (provider.getEtherPrice) {
          return provider.getEtherPrice();
        }
        break;
      case "getBalance":
      case "getTransactionCount":
      case "getCode":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.address, params.blockTag || "latest");
      case "getStorageAt":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");
      case "getBlock":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[params.includeTransactions ? "getBlockWithTransactions" : "getBlock"](params.blockTag || params.blockHash);
      case "call":
      case "estimateGas":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.transaction);
      case "getTransaction":
      case "getTransactionReceipt":
        return provider[method](params.transactionHash);
      case "getLogs": {
        let filter = params.filter;
        if (filter.fromBlock && isHexString(filter.fromBlock) || filter.toBlock && isHexString(filter.toBlock)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getLogs(filter);
      }
    }
    return logger$6.throwError("unknown method error", Logger.errors.UNKNOWN_ERROR, {
      method,
      params
    });
  });
}
class FallbackProvider extends BaseProvider {
  constructor(providers, quorum) {
    logger$6.checkNew(new.target, FallbackProvider);
    if (providers.length === 0) {
      logger$6.throwArgumentError("missing providers", "providers", providers);
    }
    const providerConfigs = providers.map((configOrProvider, index2) => {
      if (Provider.isProvider(configOrProvider)) {
        const stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
        const priority = 1;
        return Object.freeze({provider: configOrProvider, weight: 1, stallTimeout, priority});
      }
      const config = shallowCopy(configOrProvider);
      if (config.priority == null) {
        config.priority = 1;
      }
      if (config.stallTimeout == null) {
        config.stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
      }
      if (config.weight == null) {
        config.weight = 1;
      }
      const weight = config.weight;
      if (weight % 1 || weight > 512 || weight < 1) {
        logger$6.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index2}].weight`, weight);
      }
      return Object.freeze(config);
    });
    const total = providerConfigs.reduce((accum, c) => accum + c.weight, 0);
    if (quorum == null) {
      quorum = total / 2;
    } else if (quorum > total) {
      logger$6.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
    }
    let networkOrReady = checkNetworks(providerConfigs.map((c) => c.provider.network));
    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve2, reject) => {
        setTimeout(() => {
          this.detectNetwork().then(resolve2, reject);
        }, 0);
      });
    }
    super(networkOrReady);
    defineReadOnly(this, "providerConfigs", Object.freeze(providerConfigs));
    defineReadOnly(this, "quorum", quorum);
    this._highestBlockNumber = -1;
  }
  detectNetwork() {
    return __awaiter(this, void 0, void 0, function* () {
      const networks2 = yield Promise.all(this.providerConfigs.map((c) => c.provider.getNetwork()));
      return checkNetworks(networks2);
    });
  }
  perform(method, params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (method === "sendTransaction") {
        const results = yield Promise.all(this.providerConfigs.map((c) => {
          return c.provider.sendTransaction(params.signedTransaction).then((result) => {
            return result.hash;
          }, (error2) => {
            return error2;
          });
        }));
        for (let i2 = 0; i2 < results.length; i2++) {
          const result = results[i2];
          if (typeof result === "string") {
            return result;
          }
        }
        throw results[0];
      }
      if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
        yield this.getBlockNumber();
      }
      const processFunc = getProcessFunc(this, method, params);
      const configs = shuffled(this.providerConfigs.map(shallowCopy));
      configs.sort((a, b) => a.priority - b.priority);
      const currentBlockNumber = this._highestBlockNumber;
      let i = 0;
      let first = true;
      while (true) {
        const t0 = now();
        let inflightWeight = configs.filter((c) => c.runner && t0 - c.start < c.stallTimeout).reduce((accum, c) => accum + c.weight, 0);
        while (inflightWeight < this.quorum && i < configs.length) {
          const config = configs[i++];
          const rid = nextRid++;
          config.start = now();
          config.staller = stall(config.stallTimeout);
          config.staller.wait(() => {
            config.staller = null;
          });
          config.runner = getRunner(config, currentBlockNumber, method, params).then((result) => {
            config.done = true;
            config.result = result;
            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid,
                backend: exposeDebugConfig(config, now()),
                request: {method, params: deepCopy(params)},
                provider: this
              });
            }
          }, (error2) => {
            config.done = true;
            config.error = error2;
            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid,
                backend: exposeDebugConfig(config, now()),
                request: {method, params: deepCopy(params)},
                provider: this
              });
            }
          });
          if (this.listenerCount("debug")) {
            this.emit("debug", {
              action: "request",
              rid,
              backend: exposeDebugConfig(config, null),
              request: {method, params: deepCopy(params)},
              provider: this
            });
          }
          inflightWeight += config.weight;
        }
        const waiting = [];
        configs.forEach((c) => {
          if (c.done || !c.runner) {
            return;
          }
          waiting.push(c.runner);
          if (c.staller) {
            waiting.push(c.staller.getPromise());
          }
        });
        if (waiting.length) {
          yield Promise.race(waiting);
        }
        const results = configs.filter((c) => c.done && c.error == null);
        if (results.length >= this.quorum) {
          const result = processFunc(results);
          if (result !== void 0) {
            configs.forEach((c) => {
              if (c.staller) {
                c.staller.cancel();
              }
              c.cancelled = true;
            });
            return result;
          }
          if (!first) {
            yield stall(100).getPromise();
          }
          first = false;
        }
        const errors = configs.reduce((accum, c) => {
          if (!c.done || c.error == null) {
            return accum;
          }
          const code = c.error.code;
          if (ForwardErrors.indexOf(code) >= 0) {
            if (!accum[code]) {
              accum[code] = {error: c.error, weight: 0};
            }
            accum[code].weight += c.weight;
          }
          return accum;
        }, {});
        Object.keys(errors).forEach((errorCode) => {
          const tally = errors[errorCode];
          if (tally.weight < this.quorum) {
            return;
          }
          configs.forEach((c) => {
            if (c.staller) {
              c.staller.cancel();
            }
            c.cancelled = true;
          });
          const e = tally.error;
          const props = {};
          ForwardProperties.forEach((name2) => {
            if (e[name2] == null) {
              return;
            }
            props[name2] = e[name2];
          });
          logger$6.throwError(e.reason || e.message, errorCode, props);
        });
        if (configs.filter((c) => !c.done).length === 0) {
          break;
        }
      }
      configs.forEach((c) => {
        if (c.staller) {
          c.staller.cancel();
        }
        c.cancelled = true;
      });
      return logger$6.throwError("failed to meet quorum", Logger.errors.SERVER_ERROR, {
        method,
        params,
        results: configs.map((c) => exposeDebugConfig(c)),
        provider: this
      });
    });
  }
}
const IpcProvider = null;
const logger$5 = new Logger(version$1);
const defaultProjectId = "84842078b09946638c03157f83405213";
class InfuraWebSocketProvider extends WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new InfuraProvider(network, apiKey);
    const connection = provider.connection;
    if (connection.password) {
      logger$5.throwError("INFURA WebSocket project secrets unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "InfuraProvider.getWebSocketProvider()"
      });
    }
    const url2 = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
    super(url2, network);
    defineReadOnly(this, "apiKey", provider.projectId);
    defineReadOnly(this, "projectId", provider.projectId);
    defineReadOnly(this, "projectSecret", provider.projectSecret);
  }
  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }
}
class InfuraProvider extends UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new InfuraWebSocketProvider(network, apiKey);
  }
  static getApiKey(apiKey) {
    const apiKeyObj = {
      apiKey: defaultProjectId,
      projectId: defaultProjectId,
      projectSecret: null
    };
    if (apiKey == null) {
      return apiKeyObj;
    }
    if (typeof apiKey === "string") {
      apiKeyObj.projectId = apiKey;
    } else if (apiKey.projectSecret != null) {
      logger$5.assertArgument(typeof apiKey.projectId === "string", "projectSecret requires a projectId", "projectId", apiKey.projectId);
      logger$5.assertArgument(typeof apiKey.projectSecret === "string", "invalid projectSecret", "projectSecret", "[REDACTED]");
      apiKeyObj.projectId = apiKey.projectId;
      apiKeyObj.projectSecret = apiKey.projectSecret;
    } else if (apiKey.projectId) {
      apiKeyObj.projectId = apiKey.projectId;
    }
    apiKeyObj.apiKey = apiKeyObj.projectId;
    return apiKeyObj;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "mainnet.infura.io";
        break;
      case "ropsten":
        host = "ropsten.infura.io";
        break;
      case "rinkeby":
        host = "rinkeby.infura.io";
        break;
      case "kovan":
        host = "kovan.infura.io";
        break;
      case "goerli":
        host = "goerli.infura.io";
        break;
      default:
        logger$5.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }
    const connection = {
      allowGzip: true,
      url: "https://" + host + "/v3/" + apiKey.projectId,
      throttleCallback: (attempt, url2) => {
        if (apiKey.projectId === defaultProjectId) {
          showThrottleMessage();
        }
        return Promise.resolve(true);
      }
    };
    if (apiKey.projectSecret != null) {
      connection.user = "";
      connection.password = apiKey.projectSecret;
    }
    return connection;
  }
  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }
}
const logger$4 = new Logger(version$1);
const defaultApiKey = "ETHERS_JS_SHARED";
class NodesmithProvider extends UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey && typeof apiKey !== "string") {
      logger$4.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }
    return apiKey || defaultApiKey;
  }
  static getUrl(network, apiKey) {
    logger$4.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
        break;
      case "ropsten":
        host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
        break;
      case "rinkeby":
        host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
        break;
      case "goerli":
        host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
        break;
      case "kovan":
        host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
        break;
      default:
        logger$4.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return host + "?apiKey=" + apiKey;
  }
}
const logger$3 = new Logger(version$1);
const defaultApplicationIds = {
  homestead: "6004bcd10040261633ade990",
  ropsten: "6004bd4d0040261633ade991",
  rinkeby: "6004bda20040261633ade994",
  goerli: "6004bd860040261633ade992"
};
class PocketProvider extends UrlJsonRpcProvider {
  constructor(network, apiKey) {
    if (apiKey == null) {
      const n = getStatic(new.target, "getNetwork")(network);
      if (n) {
        const applicationId = defaultApplicationIds[n.name];
        if (applicationId) {
          apiKey = {
            applicationId,
            loadBalancer: true
          };
        }
      }
      if (apiKey == null) {
        logger$3.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
      }
    }
    super(network, apiKey);
  }
  static getApiKey(apiKey) {
    if (apiKey == null) {
      logger$3.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
    }
    const apiKeyObj = {
      applicationId: null,
      loadBalancer: false,
      applicationSecretKey: null
    };
    if (typeof apiKey === "string") {
      apiKeyObj.applicationId = apiKey;
    } else if (apiKey.applicationSecretKey != null) {
      logger$3.assertArgument(typeof apiKey.applicationId === "string", "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
      logger$3.assertArgument(typeof apiKey.applicationSecretKey === "string", "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else if (apiKey.applicationId) {
      logger$3.assertArgument(typeof apiKey.applicationId === "string", "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else {
      logger$3.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
    }
    return apiKeyObj;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "eth-mainnet.gateway.pokt.network";
        break;
      case "ropsten":
        host = "eth-ropsten.gateway.pokt.network";
        break;
      case "rinkeby":
        host = "eth-rinkeby.gateway.pokt.network";
        break;
      case "goerli":
        host = "eth-goerli.gateway.pokt.network";
        break;
      default:
        logger$3.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }
    let url2 = null;
    if (apiKey.loadBalancer) {
      url2 = `https://${host}/v1/lb/${apiKey.applicationId}`;
    } else {
      url2 = `https://${host}/v1/${apiKey.applicationId}`;
    }
    const connection = {url: url2};
    connection.headers = {};
    if (apiKey.applicationSecretKey != null) {
      connection.user = "";
      connection.password = apiKey.applicationSecretKey;
    }
    return connection;
  }
  isCommunityResource() {
    return this.applicationId === defaultApplicationIds[this.network.name];
  }
}
const logger$2 = new Logger(version$1);
let _nextId = 1;
function buildWeb3LegacyFetcher(provider, sendFunc) {
  return function(method, params) {
    if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
      method = "personal_sign";
      params = [params[1], params[0]];
    }
    const request = {
      method,
      params,
      id: _nextId++,
      jsonrpc: "2.0"
    };
    return new Promise((resolve2, reject) => {
      sendFunc(request, function(error2, result) {
        if (error2) {
          return reject(error2);
        }
        if (result.error) {
          const error3 = new Error(result.error.message);
          error3.code = result.error.code;
          error3.data = result.error.data;
          return reject(error3);
        }
        resolve2(result.result);
      });
    });
  };
}
function buildEip1193Fetcher(provider) {
  return function(method, params) {
    if (params == null) {
      params = [];
    }
    if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
      method = "personal_sign";
      params = [params[1], params[0]];
    }
    return provider.request({method, params});
  };
}
class Web3Provider extends JsonRpcProvider {
  constructor(provider, network) {
    logger$2.checkNew(new.target, Web3Provider);
    if (provider == null) {
      logger$2.throwArgumentError("missing provider", "provider", provider);
    }
    let path = null;
    let jsonRpcFetchFunc = null;
    let subprovider = null;
    if (typeof provider === "function") {
      path = "unknown:";
      jsonRpcFetchFunc = provider;
    } else {
      path = provider.host || provider.path || "";
      if (!path && provider.isMetaMask) {
        path = "metamask";
      }
      subprovider = provider;
      if (provider.request) {
        if (path === "") {
          path = "eip-1193:";
        }
        jsonRpcFetchFunc = buildEip1193Fetcher(provider);
      } else if (provider.sendAsync) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
      } else if (provider.send) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
      } else {
        logger$2.throwArgumentError("unsupported provider", "provider", provider);
      }
      if (!path) {
        path = "unknown:";
      }
    }
    super(path, network);
    defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
    defineReadOnly(this, "provider", subprovider);
  }
  send(method, params) {
    return this.jsonRpcFetchFunc(method, params);
  }
}
const logger$1 = new Logger(version$1);
function getDefaultProvider(network, options) {
  if (network == null) {
    network = "homestead";
  }
  if (typeof network === "string") {
    const match = network.match(/^(ws|http)s?:/i);
    if (match) {
      switch (match[1]) {
        case "http":
          return new JsonRpcProvider(network);
        case "ws":
          return new WebSocketProvider(network);
        default:
          logger$1.throwArgumentError("unsupported URL scheme", "network", network);
      }
    }
  }
  const n = getNetwork(network);
  if (!n || !n._defaultProvider) {
    logger$1.throwError("unsupported getDefaultProvider network", Logger.errors.NETWORK_ERROR, {
      operation: "getDefaultProvider",
      network
    });
  }
  return n._defaultProvider({
    FallbackProvider,
    AlchemyProvider,
    CloudflareProvider,
    EtherscanProvider,
    InfuraProvider,
    JsonRpcProvider,
    NodesmithProvider,
    PocketProvider,
    Web3Provider,
    IpcProvider
  }, options);
}
const version = "units/5.1.0";
const logger = new Logger(version);
const names = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function parseUnits(value, unitName) {
  if (typeof value !== "string") {
    logger.throwArgumentError("value must be a string", "value", value);
  }
  if (typeof unitName === "string") {
    const index2 = names.indexOf(unitName);
    if (index2 !== -1) {
      unitName = 3 * index2;
    }
  }
  return parseFixed(value, unitName != null ? unitName : 18);
}
function parseEther(ether) {
  return parseUnits(ether, 18);
}
const RINKEBY_CONTRACT_ADDRESS = "0xAc833FCcE0140760BbAA54214a47AcCfe42318c8";
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      internalType: "uint64",
      name: "partyId",
      type: "uint64"
    }],
    name: "ObtainedNft",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      internalType: "uint64",
      name: "partyId",
      type: "uint64"
    }],
    name: "TargetReached",
    type: "event"
  },
  {
    inputs: [],
    name: "id",
    outputs: [{
      internalType: "uint64",
      name: "",
      type: "uint64"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{
      internalType: "address",
      name: "",
      type: "address"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{
      internalType: "uint256",
      name: "targetPrice",
      type: "uint256"
    }],
    name: "createParty",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      internalType: "uint64",
      name: "partyId",
      type: "uint64"
    }],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "partyId",
        type: "uint64"
      },
      {
        internalType: "address",
        name: "contributor",
        type: "address"
      }
    ],
    name: "getContribution",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{
      internalType: "uint64",
      name: "partyId",
      type: "uint64"
    }],
    name: "getTotalContributions",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "view",
    type: "function"
  }
];
const _EthHelper = class {
  static async fetchPartyContributions(partyId) {
    await this.init();
    const amount = await this.contract.getTotalContributions(partyId);
    return await amount.toNumber();
  }
  static async invest(partyId, amount) {
    await window.ethereum.enable();
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(await signer.getAddress());
    const contract = _EthHelper.contract.connect(signer);
    const response = await contract.deposit(partyId, {
      value: parseEther(amount)
    });
    console.log(response);
  }
  static async init() {
    if (!this.intialized) {
      this.contract = new Contract(RINKEBY_CONTRACT_ADDRESS, ABI, getDefaultProvider("rinkeby"));
    }
    this.intialized = true;
  }
};
let EthHelper = _EthHelper;
__publicField(EthHelper, "intialized", false);
__publicField(EthHelper, "contract");
var eth = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  EthHelper
});
export {init, render};
