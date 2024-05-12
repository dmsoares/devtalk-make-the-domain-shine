"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/function.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.dual = exports2.getEndomorphismMonoid = exports2.not = exports2.SK = exports2.hole = exports2.pipe = exports2.untupled = exports2.tupled = exports2.absurd = exports2.decrement = exports2.increment = exports2.tuple = exports2.flow = exports2.flip = exports2.constVoid = exports2.constUndefined = exports2.constNull = exports2.constFalse = exports2.constTrue = exports2.constant = exports2.unsafeCoerce = exports2.identity = exports2.apply = exports2.getRing = exports2.getSemiring = exports2.getMonoid = exports2.getSemigroup = exports2.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B.join(x(a), y(a));
            };
          },
          zero: function() {
            return B.zero;
          },
          one: function() {
            return B.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B.not(x(a));
            };
          }
        };
      };
    };
    exports2.getBooleanAlgebra = getBooleanAlgebra;
    var getSemigroup = function(S) {
      return function() {
        return {
          concat: function(f, g) {
            return function(a) {
              return S.concat(f(a), g(a));
            };
          }
        };
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = (0, exports2.getSemigroup)(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports2.getMonoid = getMonoid;
    var getSemiring = function(S) {
      return {
        add: function(f, g) {
          return function(x) {
            return S.add(f(x), g(x));
          };
        },
        zero: function() {
          return S.zero;
        },
        mul: function(f, g) {
          return function(x) {
            return S.mul(f(x), g(x));
          };
        },
        one: function() {
          return S.one;
        }
      };
    };
    exports2.getSemiring = getSemiring;
    var getRing = function(R) {
      var S = (0, exports2.getSemiring)(R);
      return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function(f, g) {
          return function(x) {
            return R.sub(f(x), g(x));
          };
        }
      };
    };
    exports2.getRing = getRing;
    var apply = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports2.apply = apply;
    function identity(a) {
      return a;
    }
    exports2.identity = identity;
    exports2.unsafeCoerce = identity;
    function constant(a) {
      return function() {
        return a;
      };
    }
    exports2.constant = constant;
    exports2.constTrue = constant(true);
    exports2.constFalse = constant(false);
    exports2.constNull = constant(null);
    exports2.constUndefined = constant(void 0);
    exports2.constVoid = exports2.constUndefined;
    function flip(f) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (args.length > 1) {
          return f(args[1], args[0]);
        }
        return function(a) {
          return f(a)(args[0]);
        };
      };
    }
    exports2.flip = flip;
    function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
        case 1:
          return ab;
        case 2:
          return function() {
            return bc(ab.apply(this, arguments));
          };
        case 3:
          return function() {
            return cd(bc(ab.apply(this, arguments)));
          };
        case 4:
          return function() {
            return de(cd(bc(ab.apply(this, arguments))));
          };
        case 5:
          return function() {
            return ef(de(cd(bc(ab.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
          };
      }
      return;
    }
    exports2.flow = flow;
    function tuple() {
      var t = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
      }
      return t;
    }
    exports2.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports2.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports2.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports2.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports2.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports2.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
      switch (arguments.length) {
        case 1:
          return a;
        case 2:
          return ab(a);
        case 3:
          return bc(ab(a));
        case 4:
          return cd(bc(ab(a)));
        case 5:
          return de(cd(bc(ab(a))));
        case 6:
          return ef(de(cd(bc(ab(a)))));
        case 7:
          return fg(ef(de(cd(bc(ab(a))))));
        case 8:
          return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
          return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
          var ret = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
            ret = arguments[i](ret);
          }
          return ret;
        }
      }
    }
    exports2.pipe = pipe2;
    exports2.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports2.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports2.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity
      };
    };
    exports2.getEndomorphismMonoid = getEndomorphismMonoid;
    var dual = function(arity, body) {
      var isDataFirst = typeof arity === "number" ? function(args) {
        return args.length >= arity;
      } : arity;
      return function() {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
          return body.apply(this, args);
        }
        return function(self) {
          return body.apply(void 0, __spreadArray([self], args, false));
        };
      };
    };
    exports2.dual = dual;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/internal.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.flatMapReader = exports2.flatMapTask = exports2.flatMapIO = exports2.flatMapEither = exports2.flatMapOption = exports2.flatMapNullable = exports2.liftOption = exports2.liftNullable = exports2.fromReadonlyNonEmptyArray = exports2.has = exports2.emptyRecord = exports2.emptyReadonlyArray = exports2.tail = exports2.head = exports2.isNonEmpty = exports2.singleton = exports2.right = exports2.left = exports2.isRight = exports2.isLeft = exports2.some = exports2.none = exports2.isSome = exports2.isNone = void 0;
    var function_1 = require_function();
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports2.isNone = isNone;
    var isSome = function(fa) {
      return fa._tag === "Some";
    };
    exports2.isSome = isSome;
    exports2.none = { _tag: "None" };
    var some = function(a) {
      return { _tag: "Some", value: a };
    };
    exports2.some = some;
    var isLeft = function(ma) {
      return ma._tag === "Left";
    };
    exports2.isLeft = isLeft;
    var isRight = function(ma) {
      return ma._tag === "Right";
    };
    exports2.isRight = isRight;
    var left4 = function(e) {
      return { _tag: "Left", left: e };
    };
    exports2.left = left4;
    var right4 = function(a) {
      return { _tag: "Right", right: a };
    };
    exports2.right = right4;
    var singleton = function(a) {
      return [a];
    };
    exports2.singleton = singleton;
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports2.isNonEmpty = isNonEmpty;
    var head = function(as) {
      return as[0];
    };
    exports2.head = head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports2.tail = tail;
    exports2.emptyReadonlyArray = [];
    exports2.emptyRecord = {};
    exports2.has = Object.prototype.hasOwnProperty;
    var fromReadonlyNonEmptyArray = function(as) {
      return __spreadArray([as[0]], as.slice(1), true);
    };
    exports2.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
    var liftNullable = function(F) {
      return function(f, onNullable) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither(o == null ? (0, exports2.left)(onNullable.apply(void 0, a)) : (0, exports2.right)(o));
        };
      };
    };
    exports2.liftNullable = liftNullable;
    var liftOption = function(F) {
      return function(f, onNone) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither((0, exports2.isNone)(o) ? (0, exports2.left)(onNone.apply(void 0, a)) : (0, exports2.right)(o.value));
        };
      };
    };
    exports2.liftOption = liftOption;
    var flatMapNullable = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self, f, onNullable) {
        return M.flatMap(self, (0, exports2.liftNullable)(F)(f, onNullable));
      });
    };
    exports2.flatMapNullable = flatMapNullable;
    var flatMapOption = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self, f, onNone) {
        return M.flatMap(self, (0, exports2.liftOption)(F)(f, onNone));
      });
    };
    exports2.flatMapOption = flatMapOption;
    var flatMapEither = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromEither(f(a));
        });
      });
    };
    exports2.flatMapEither = flatMapEither;
    var flatMapIO = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromIO(f(a));
        });
      });
    };
    exports2.flatMapIO = flatMapIO;
    var flatMapTask = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromTask(f(a));
        });
      });
    };
    exports2.flatMapTask = flatMapTask;
    var flatMapReader = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromReader(f(a));
        });
      });
    };
    exports2.flatMapReader = flatMapReader;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Apply.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sequenceS = exports2.sequenceT = exports2.getApplySemigroup = exports2.apS = exports2.apSecond = exports2.apFirst = exports2.ap = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    function ap2(F, G) {
      return function(fa) {
        return function(fab) {
          return F.ap(F.map(fab, function(gab) {
            return function(ga) {
              return G.ap(gab, ga);
            };
          }), fa);
        };
      };
    }
    exports2.ap = ap2;
    function apFirst(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function(a) {
            return function() {
              return a;
            };
          }), second);
        };
      };
    }
    exports2.apFirst = apFirst;
    function apSecond(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function() {
            return function(b) {
              return b;
            };
          }), second);
        };
      };
    }
    exports2.apSecond = apSecond;
    function apS(F) {
      return function(name, fb) {
        return function(fa) {
          return F.ap(F.map(fa, function(a) {
            return function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            };
          }), fb);
        };
      };
    }
    exports2.apS = apS;
    function getApplySemigroup(F) {
      return function(S) {
        return {
          concat: function(first, second) {
            return F.ap(F.map(first, function(x) {
              return function(y) {
                return S.concat(x, y);
              };
            }), second);
          }
        };
      };
    }
    exports2.getApplySemigroup = getApplySemigroup;
    function curried(f, n, acc) {
      return function(x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
          combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
      };
    }
    var tupleConstructors = {
      1: function(a) {
        return [a];
      },
      2: function(a) {
        return function(b) {
          return [a, b];
        };
      },
      3: function(a) {
        return function(b) {
          return function(c) {
            return [a, b, c];
          };
        };
      },
      4: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return [a, b, c, d];
            };
          };
        };
      },
      5: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return function(e) {
                return [a, b, c, d, e];
              };
            };
          };
        };
      }
    };
    function getTupleConstructor(len) {
      if (!_.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
      }
      return tupleConstructors[len];
    }
    function sequenceT(F) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
          fas = F.ap(fas, args[i]);
        }
        return fas;
      };
    }
    exports2.sequenceT = sequenceT;
    function getRecordConstructor(keys) {
      var len = keys.length;
      switch (len) {
        case 1:
          return function(a) {
            var _a;
            return _a = {}, _a[keys[0]] = a, _a;
          };
        case 2:
          return function(a) {
            return function(b) {
              var _a;
              return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a;
            };
          };
        case 3:
          return function(a) {
            return function(b) {
              return function(c) {
                var _a;
                return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a;
              };
            };
          };
        case 4:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  var _a;
                  return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a;
                };
              };
            };
          };
        case 5:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  return function(e) {
                    var _a;
                    return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a[keys[4]] = e, _a;
                  };
                };
              };
            };
          };
        default:
          return curried(function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var r = {};
            for (var i = 0; i < len; i++) {
              r[keys[i]] = args[i];
            }
            return r;
          }, len - 1, []);
      }
    }
    function sequenceS(F) {
      return function(r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
          fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
      };
    }
    exports2.sequenceS = sequenceS;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Functor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.asUnit = exports2.as = exports2.getFunctorComposition = exports2.let = exports2.bindTo = exports2.flap = exports2.map = void 0;
    var function_1 = require_function();
    function map(F, G) {
      return function(f) {
        return function(fa) {
          return F.map(fa, function(ga) {
            return G.map(ga, f);
          });
        };
      };
    }
    exports2.map = map;
    function flap(F) {
      return function(a) {
        return function(fab) {
          return F.map(fab, function(f) {
            return f(a);
          });
        };
      };
    }
    exports2.flap = flap;
    function bindTo(F) {
      return function(name) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return _a = {}, _a[name] = a, _a;
          });
        };
      };
    }
    exports2.bindTo = bindTo;
    function let_(F) {
      return function(name, f) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
          });
        };
      };
    }
    exports2.let = let_;
    function getFunctorComposition(F, G) {
      var _map = map(F, G);
      return {
        map: function(fga, f) {
          return (0, function_1.pipe)(fga, _map(f));
        }
      };
    }
    exports2.getFunctorComposition = getFunctorComposition;
    function as(F) {
      return function(self, b) {
        return F.map(self, function() {
          return b;
        });
      };
    }
    exports2.as = as;
    function asUnit(F) {
      var asM = as(F);
      return function(self) {
        return asM(self, void 0);
      };
    }
    exports2.asUnit = asUnit;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Applicative.js
var require_Applicative = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Applicative.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getApplicativeComposition = exports2.getApplicativeMonoid = void 0;
    var Apply_1 = require_Apply();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    function getApplicativeMonoid(F) {
      var f = (0, Apply_1.getApplySemigroup)(F);
      return function(M) {
        return {
          concat: f(M).concat,
          empty: F.of(M.empty)
        };
      };
    }
    exports2.getApplicativeMonoid = getApplicativeMonoid;
    function getApplicativeComposition(F, G) {
      var map = (0, Functor_1.getFunctorComposition)(F, G).map;
      var _ap = (0, Apply_1.ap)(F, G);
      return {
        map,
        of: function(a) {
          return F.of(G.of(a));
        },
        ap: function(fgab, fga) {
          return (0, function_1.pipe)(fgab, _ap(fga));
        }
      };
    }
    exports2.getApplicativeComposition = getApplicativeComposition;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Chain.js
var require_Chain = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Chain.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bind = exports2.tap = exports2.chainFirst = void 0;
    function chainFirst(M) {
      var tapM = tap(M);
      return function(f) {
        return function(first) {
          return tapM(first, f);
        };
      };
    }
    exports2.chainFirst = chainFirst;
    function tap(M) {
      return function(first, f) {
        return M.chain(first, function(a) {
          return M.map(f(a), function() {
            return a;
          });
        });
      };
    }
    exports2.tap = tap;
    function bind2(M) {
      return function(name, f) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return M.map(f(a), function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            });
          });
        };
      };
    }
    exports2.bind = bind2;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/ChainRec.js
var require_ChainRec = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/ChainRec.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tailRec = void 0;
    var tailRec = function(startWith, f) {
      var ab = f(startWith);
      while (ab._tag === "Left") {
        ab = f(ab.left);
      }
      return ab.right;
    };
    exports2.tailRec = tailRec;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromEither.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tapEither = exports2.filterOrElse = exports2.chainFirstEitherK = exports2.chainEitherK = exports2.fromEitherK = exports2.chainOptionK = exports2.fromOptionK = exports2.fromPredicate = exports2.fromOption = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    function fromOption(F) {
      return function(onNone) {
        return function(ma) {
          return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value));
        };
      };
    }
    exports2.fromOption = fromOption;
    function fromPredicate(F) {
      return function(predicate, onFalse) {
        return function(a) {
          return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
      };
    }
    exports2.fromPredicate = fromPredicate;
    function fromOptionK(F) {
      var fromOptionF = fromOption(F);
      return function(onNone) {
        var from = fromOptionF(onNone);
        return function(f) {
          return (0, function_1.flow)(f, from);
        };
      };
    }
    exports2.fromOptionK = fromOptionK;
    function chainOptionK(F, M) {
      var fromOptionKF = fromOptionK(F);
      return function(onNone) {
        var from = fromOptionKF(onNone);
        return function(f) {
          return function(ma) {
            return M.chain(ma, from(f));
          };
        };
      };
    }
    exports2.chainOptionK = chainOptionK;
    function fromEitherK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromEither);
      };
    }
    exports2.fromEitherK = fromEitherK;
    function chainEitherK(F, M) {
      var fromEitherKF = fromEitherK(F);
      return function(f) {
        return function(ma) {
          return M.chain(ma, fromEitherKF(f));
        };
      };
    }
    exports2.chainEitherK = chainEitherK;
    function chainFirstEitherK(F, M) {
      var tapEitherM = tapEither(F, M);
      return function(f) {
        return function(ma) {
          return tapEitherM(ma, f);
        };
      };
    }
    exports2.chainFirstEitherK = chainFirstEitherK;
    function filterOrElse(F, M) {
      return function(predicate, onFalse) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
          });
        };
      };
    }
    exports2.filterOrElse = filterOrElse;
    function tapEither(F, M) {
      var fromEither = fromEitherK(F);
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, fromEither(f));
      };
    }
    exports2.tapEither = tapEither;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Separated.js
var require_Separated = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Separated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.right = exports2.left = exports2.flap = exports2.Functor = exports2.Bifunctor = exports2.URI = exports2.bimap = exports2.mapLeft = exports2.map = exports2.separated = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var separated = function(left5, right5) {
      return { left: left5, right: right5 };
    };
    exports2.separated = separated;
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.mapLeft)(f));
    };
    var _bimap = function(fa, g, f) {
      return (0, function_1.pipe)(fa, (0, exports2.bimap)(g, f));
    };
    var map = function(f) {
      return function(fa) {
        return (0, exports2.separated)((0, exports2.left)(fa), f((0, exports2.right)(fa)));
      };
    };
    exports2.map = map;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports2.separated)(f((0, exports2.left)(fa)), (0, exports2.right)(fa));
      };
    };
    exports2.mapLeft = mapLeft;
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports2.separated)(f((0, exports2.left)(fa)), g((0, exports2.right)(fa)));
      };
    };
    exports2.bimap = bimap;
    exports2.URI = "Separated";
    exports2.Bifunctor = {
      URI: exports2.URI,
      mapLeft: _mapLeft,
      bimap: _bimap
    };
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    var left4 = function(s) {
      return s.left;
    };
    exports2.left = left4;
    var right4 = function(s) {
      return s.right;
    };
    exports2.right = right4;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Witherable.js
var require_Witherable = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Witherable.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.filterE = exports2.witherDefault = exports2.wiltDefault = void 0;
    var _ = __importStar(require_internal());
    function wiltDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.separate);
        };
      };
    }
    exports2.wiltDefault = wiltDefault;
    function witherDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.compact);
        };
      };
    }
    exports2.witherDefault = witherDefault;
    function filterE(W) {
      return function(F) {
        var witherF = W.wither(F);
        return function(predicate) {
          return function(ga) {
            return witherF(ga, function(a) {
              return F.map(predicate(a), function(b) {
                return b ? _.some(a) : _.none;
              });
            });
          };
        };
      };
    }
    exports2.filterE = filterE;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Either.js
var require_Either = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Either.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.match = exports2.foldW = exports2.matchW = exports2.isRight = exports2.isLeft = exports2.fromOption = exports2.fromPredicate = exports2.FromEither = exports2.MonadThrow = exports2.throwError = exports2.ChainRec = exports2.Extend = exports2.extend = exports2.Alt = exports2.alt = exports2.altW = exports2.Bifunctor = exports2.mapLeft = exports2.bimap = exports2.Traversable = exports2.sequence = exports2.traverse = exports2.Foldable = exports2.reduceRight = exports2.foldMap = exports2.reduce = exports2.Monad = exports2.Chain = exports2.Applicative = exports2.Apply = exports2.ap = exports2.apW = exports2.Pointed = exports2.of = exports2.asUnit = exports2.as = exports2.Functor = exports2.map = exports2.getAltValidation = exports2.getApplicativeValidation = exports2.getWitherable = exports2.getFilterable = exports2.getCompactable = exports2.getSemigroup = exports2.getEq = exports2.getShow = exports2.URI = exports2.flatMap = exports2.right = exports2.left = void 0;
    exports2.chainFirstW = exports2.chainFirst = exports2.chain = exports2.chainW = exports2.sequenceArray = exports2.traverseArray = exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex = exports2.traverseReadonlyNonEmptyArrayWithIndex = exports2.ApT = exports2.apSW = exports2.apS = exports2.bindW = exports2.bind = exports2.let = exports2.bindTo = exports2.Do = exports2.exists = exports2.elem = exports2.toError = exports2.toUnion = exports2.chainNullableK = exports2.fromNullableK = exports2.tryCatchK = exports2.tryCatch = exports2.fromNullable = exports2.orElse = exports2.orElseW = exports2.swap = exports2.filterOrElseW = exports2.filterOrElse = exports2.flatMapOption = exports2.flatMapNullable = exports2.liftOption = exports2.liftNullable = exports2.chainOptionKW = exports2.chainOptionK = exports2.fromOptionK = exports2.duplicate = exports2.flatten = exports2.flattenW = exports2.tap = exports2.apSecondW = exports2.apSecond = exports2.apFirstW = exports2.apFirst = exports2.flap = exports2.getOrElse = exports2.getOrElseW = exports2.fold = void 0;
    exports2.getValidation = exports2.getValidationMonoid = exports2.getValidationSemigroup = exports2.getApplyMonoid = exports2.getApplySemigroup = exports2.either = exports2.stringifyJSON = exports2.parseJSON = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var chainable = __importStar(require_Chain());
    var ChainRec_1 = require_ChainRec();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    exports2.left = _.left;
    exports2.right = _.right;
    exports2.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, exports2.isLeft)(ma) ? ma : f(ma.right);
    });
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports2.ap)(fa));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports2.reduce)(b, f));
    };
    var _foldMap = function(M) {
      return function(fa, f) {
        var foldMapM = (0, exports2.foldMap)(M);
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports2.reduceRight)(b, f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports2.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _bimap = function(fa, f, g) {
      return (0, function_1.pipe)(fa, (0, exports2.bimap)(f, g));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.mapLeft)(f));
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports2.alt)(that));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports2.extend)(f));
    };
    var _chainRec = function(a, f) {
      return (0, ChainRec_1.tailRec)(f(a), function(e) {
        return (0, exports2.isLeft)(e) ? (0, exports2.right)((0, exports2.left)(e.left)) : (0, exports2.isLeft)(e.right) ? (0, exports2.left)(f(e.right.left)) : (0, exports2.right)((0, exports2.right)(e.right.right));
      });
    };
    exports2.URI = "Either";
    var getShow = function(SE, SA) {
      return {
        show: function(ma) {
          return (0, exports2.isLeft)(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")");
        }
      };
    };
    exports2.getShow = getShow;
    var getEq = function(EL, EA) {
      return {
        equals: function(x, y) {
          return x === y || ((0, exports2.isLeft)(x) ? (0, exports2.isLeft)(y) && EL.equals(x.left, y.left) : (0, exports2.isRight)(y) && EA.equals(x.right, y.right));
        }
      };
    };
    exports2.getEq = getEq;
    var getSemigroup = function(S) {
      return {
        concat: function(x, y) {
          return (0, exports2.isLeft)(y) ? x : (0, exports2.isLeft)(x) ? y : (0, exports2.right)(S.concat(x.right, y.right));
        }
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getCompactable = function(M) {
      var empty = (0, exports2.left)(M.empty);
      return {
        URI: exports2.URI,
        _E: void 0,
        compact: function(ma) {
          return (0, exports2.isLeft)(ma) ? ma : ma.right._tag === "None" ? empty : (0, exports2.right)(ma.right.value);
        },
        separate: function(ma) {
          return (0, exports2.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : (0, exports2.isLeft)(ma.right) ? (0, Separated_1.separated)((0, exports2.right)(ma.right.left), empty) : (0, Separated_1.separated)(empty, (0, exports2.right)(ma.right.right));
        }
      };
    };
    exports2.getCompactable = getCompactable;
    var getFilterable = function(M) {
      var empty = (0, exports2.left)(M.empty);
      var _a = (0, exports2.getCompactable)(M), compact = _a.compact, separate = _a.separate;
      var filter = function(ma, predicate) {
        return (0, exports2.isLeft)(ma) ? ma : predicate(ma.right) ? ma : empty;
      };
      var partition = function(ma, p) {
        return (0, exports2.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : p(ma.right) ? (0, Separated_1.separated)(empty, (0, exports2.right)(ma.right)) : (0, Separated_1.separated)((0, exports2.right)(ma.right), empty);
      };
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        compact,
        separate,
        filter,
        filterMap: function(ma, f) {
          if ((0, exports2.isLeft)(ma)) {
            return ma;
          }
          var ob = f(ma.right);
          return ob._tag === "None" ? empty : (0, exports2.right)(ob.value);
        },
        partition,
        partitionMap: function(ma, f) {
          if ((0, exports2.isLeft)(ma)) {
            return (0, Separated_1.separated)(ma, ma);
          }
          var e = f(ma.right);
          return (0, exports2.isLeft)(e) ? (0, Separated_1.separated)((0, exports2.right)(e.left), empty) : (0, Separated_1.separated)(empty, (0, exports2.right)(e.right));
        }
      };
    };
    exports2.getFilterable = getFilterable;
    var getWitherable = function(M) {
      var F_ = (0, exports2.getFilterable)(M);
      var C = (0, exports2.getCompactable)(M);
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: exports2.sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: (0, Witherable_1.witherDefault)(exports2.Traversable, C),
        wilt: (0, Witherable_1.wiltDefault)(exports2.Traversable, C)
      };
    };
    exports2.getWitherable = getWitherable;
    var getApplicativeValidation = function(SE) {
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        ap: function(fab, fa) {
          return (0, exports2.isLeft)(fab) ? (0, exports2.isLeft)(fa) ? (0, exports2.left)(SE.concat(fab.left, fa.left)) : fab : (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(fab.right(fa.right));
        },
        of: exports2.of
      };
    };
    exports2.getApplicativeValidation = getApplicativeValidation;
    var getAltValidation = function(SE) {
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        alt: function(me, that) {
          if ((0, exports2.isRight)(me)) {
            return me;
          }
          var ea = that();
          return (0, exports2.isLeft)(ea) ? (0, exports2.left)(SE.concat(me.left, ea.left)) : ea;
        }
      };
    };
    exports2.getAltValidation = getAltValidation;
    var map = function(f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(f(fa.right));
      };
    };
    exports2.map = map;
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports2.Functor));
    exports2.asUnit = (0, Functor_1.asUnit)(exports2.Functor);
    exports2.of = exports2.right;
    exports2.Pointed = {
      URI: exports2.URI,
      of: exports2.of
    };
    var apW = function(fa) {
      return function(fab) {
        return (0, exports2.isLeft)(fab) ? fab : (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(fab.right(fa.right));
      };
    };
    exports2.apW = apW;
    exports2.ap = exports2.apW;
    exports2.Apply = {
      URI: exports2.URI,
      map: _map,
      ap: _ap
    };
    exports2.Applicative = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of
    };
    exports2.Chain = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      chain: exports2.flatMap
    };
    exports2.Monad = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      chain: exports2.flatMap
    };
    var reduce = function(b, f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? b : f(b, fa.right);
      };
    };
    exports2.reduce = reduce;
    var foldMap = function(M) {
      return function(f) {
        return function(fa) {
          return (0, exports2.isLeft)(fa) ? M.empty : f(fa.right);
        };
      };
    };
    exports2.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? b : f(fa.right, b);
      };
    };
    exports2.reduceRight = reduceRight;
    exports2.Foldable = {
      URI: exports2.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    var traverse = function(F) {
      return function(f) {
        return function(ta) {
          return (0, exports2.isLeft)(ta) ? F.of((0, exports2.left)(ta.left)) : F.map(f(ta.right), exports2.right);
        };
      };
    };
    exports2.traverse = traverse;
    var sequence = function(F) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? F.of((0, exports2.left)(ma.left)) : F.map(ma.right, exports2.right);
      };
    };
    exports2.sequence = sequence;
    exports2.Traversable = {
      URI: exports2.URI,
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports2.sequence
    };
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? (0, exports2.left)(f(fa.left)) : (0, exports2.right)(g(fa.right));
      };
    };
    exports2.bimap = bimap;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? (0, exports2.left)(f(fa.left)) : fa;
      };
    };
    exports2.mapLeft = mapLeft;
    exports2.Bifunctor = {
      URI: exports2.URI,
      bimap: _bimap,
      mapLeft: _mapLeft
    };
    var altW = function(that) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? that() : fa;
      };
    };
    exports2.altW = altW;
    exports2.alt = exports2.altW;
    exports2.Alt = {
      URI: exports2.URI,
      map: _map,
      alt: _alt
    };
    var extend = function(f) {
      return function(wa) {
        return (0, exports2.isLeft)(wa) ? wa : (0, exports2.right)(f(wa));
      };
    };
    exports2.extend = extend;
    exports2.Extend = {
      URI: exports2.URI,
      map: _map,
      extend: _extend
    };
    exports2.ChainRec = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      chain: exports2.flatMap,
      chainRec: _chainRec
    };
    exports2.throwError = exports2.left;
    exports2.MonadThrow = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      chain: exports2.flatMap,
      throwError: exports2.throwError
    };
    exports2.FromEither = {
      URI: exports2.URI,
      fromEither: function_1.identity
    };
    exports2.fromPredicate = (0, FromEither_1.fromPredicate)(exports2.FromEither);
    exports2.fromOption = /* @__PURE__ */ (0, FromEither_1.fromOption)(exports2.FromEither);
    exports2.isLeft = _.isLeft;
    exports2.isRight = _.isRight;
    var matchW = function(onLeft, onRight) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : onRight(ma.right);
      };
    };
    exports2.matchW = matchW;
    exports2.foldW = exports2.matchW;
    exports2.match = exports2.matchW;
    exports2.fold = exports2.match;
    var getOrElseW = function(onLeft) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : ma.right;
      };
    };
    exports2.getOrElseW = getOrElseW;
    exports2.getOrElse = exports2.getOrElseW;
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    exports2.apFirst = (0, Apply_1.apFirst)(exports2.Apply);
    exports2.apFirstW = exports2.apFirst;
    exports2.apSecond = (0, Apply_1.apSecond)(exports2.Apply);
    exports2.apSecondW = exports2.apSecond;
    exports2.tap = (0, function_1.dual)(2, chainable.tap(exports2.Chain));
    exports2.flattenW = /* @__PURE__ */ (0, exports2.flatMap)(function_1.identity);
    exports2.flatten = exports2.flattenW;
    exports2.duplicate = (0, exports2.extend)(function_1.identity);
    exports2.fromOptionK = /* @__PURE__ */ (0, FromEither_1.fromOptionK)(exports2.FromEither);
    exports2.chainOptionK = (0, FromEither_1.chainOptionK)(exports2.FromEither, exports2.Chain);
    exports2.chainOptionKW = exports2.chainOptionK;
    var _FromEither = {
      fromEither: exports2.FromEither.fromEither
    };
    exports2.liftNullable = _.liftNullable(_FromEither);
    exports2.liftOption = _.liftOption(_FromEither);
    var _FlatMap = {
      flatMap: exports2.flatMap
    };
    exports2.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
    exports2.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
    exports2.filterOrElse = (0, FromEither_1.filterOrElse)(exports2.FromEither, exports2.Chain);
    exports2.filterOrElseW = exports2.filterOrElse;
    var swap = function(ma) {
      return (0, exports2.isLeft)(ma) ? (0, exports2.right)(ma.left) : (0, exports2.left)(ma.right);
    };
    exports2.swap = swap;
    var orElseW = function(onLeft) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : ma;
      };
    };
    exports2.orElseW = orElseW;
    exports2.orElse = exports2.orElseW;
    var fromNullable = function(e) {
      return function(a) {
        return a == null ? (0, exports2.left)(e) : (0, exports2.right)(a);
      };
    };
    exports2.fromNullable = fromNullable;
    var tryCatch = function(f, onThrow) {
      try {
        return (0, exports2.right)(f());
      } catch (e) {
        return (0, exports2.left)(onThrow(e));
      }
    };
    exports2.tryCatch = tryCatch;
    var tryCatchK = function(f, onThrow) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports2.tryCatch)(function() {
          return f.apply(void 0, a);
        }, onThrow);
      };
    };
    exports2.tryCatchK = tryCatchK;
    var fromNullableK = function(e) {
      var from = (0, exports2.fromNullable)(e);
      return function(f) {
        return (0, function_1.flow)(f, from);
      };
    };
    exports2.fromNullableK = fromNullableK;
    var chainNullableK = function(e) {
      var from = (0, exports2.fromNullableK)(e);
      return function(f) {
        return (0, exports2.flatMap)(from(f));
      };
    };
    exports2.chainNullableK = chainNullableK;
    exports2.toUnion = (0, exports2.foldW)(function_1.identity, function_1.identity);
    function toError(e) {
      try {
        return e instanceof Error ? e : new Error(String(e));
      } catch (error) {
        return new Error();
      }
    }
    exports2.toError = toError;
    function elem(E3) {
      return function(a, ma) {
        if (ma === void 0) {
          var elemE_1 = elem(E3);
          return function(ma2) {
            return elemE_1(a, ma2);
          };
        }
        return (0, exports2.isLeft)(ma) ? false : E3.equals(a, ma.right);
      };
    }
    exports2.elem = elem;
    var exists = function(predicate) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? false : predicate(ma.right);
      };
    };
    exports2.exists = exists;
    exports2.Do = (0, exports2.of)(_.emptyRecord);
    exports2.bindTo = (0, Functor_1.bindTo)(exports2.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports2.Functor);
    exports2.let = let_;
    exports2.bind = chainable.bind(exports2.Chain);
    exports2.bindW = exports2.bind;
    exports2.apS = (0, Apply_1.apS)(exports2.Apply);
    exports2.apSW = exports2.apS;
    exports2.ApT = (0, exports2.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        var e = f(0, _.head(as));
        if ((0, exports2.isLeft)(e)) {
          return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
          var e_1 = f(i, as[i]);
          if ((0, exports2.isLeft)(e_1)) {
            return e_1;
          }
          out.push(e_1.right);
        }
        return (0, exports2.right)(out);
      };
    };
    exports2.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
    var traverseReadonlyArrayWithIndex = function(f) {
      var g = (0, exports2.traverseReadonlyNonEmptyArrayWithIndex)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports2.ApT;
      };
    };
    exports2.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
    exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseArray = traverseArray;
    exports2.sequenceArray = /* @__PURE__ */ (0, exports2.traverseArray)(function_1.identity);
    exports2.chainW = exports2.flatMap;
    exports2.chain = exports2.flatMap;
    exports2.chainFirst = exports2.tap;
    exports2.chainFirstW = exports2.tap;
    function parseJSON(s, onError) {
      return (0, exports2.tryCatch)(function() {
        return JSON.parse(s);
      }, onError);
    }
    exports2.parseJSON = parseJSON;
    var stringifyJSON = function(u, onError) {
      return (0, exports2.tryCatch)(function() {
        var s = JSON.stringify(u);
        if (typeof s !== "string") {
          throw new Error("Converting unsupported structure to JSON");
        }
        return s;
      }, onError);
    };
    exports2.stringifyJSON = stringifyJSON;
    exports2.either = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _ap,
      chain: exports2.flatMap,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports2.sequence,
      bimap: _bimap,
      mapLeft: _mapLeft,
      alt: _alt,
      extend: _extend,
      chainRec: _chainRec,
      throwError: exports2.throwError
    };
    exports2.getApplySemigroup = /* @__PURE__ */ (0, Apply_1.getApplySemigroup)(exports2.Apply);
    exports2.getApplyMonoid = /* @__PURE__ */ (0, Applicative_1.getApplicativeMonoid)(exports2.Applicative);
    var getValidationSemigroup = function(SE, SA) {
      return (0, Apply_1.getApplySemigroup)((0, exports2.getApplicativeValidation)(SE))(SA);
    };
    exports2.getValidationSemigroup = getValidationSemigroup;
    var getValidationMonoid = function(SE, MA) {
      return (0, Applicative_1.getApplicativeMonoid)((0, exports2.getApplicativeValidation)(SE))(MA);
    };
    exports2.getValidationMonoid = getValidationMonoid;
    function getValidation(SE) {
      var ap2 = (0, exports2.getApplicativeValidation)(SE).ap;
      var alt = (0, exports2.getAltValidation)(SE).alt;
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        of: exports2.of,
        chain: exports2.flatMap,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: exports2.sequence,
        chainRec: _chainRec,
        throwError: exports2.throwError,
        ap: ap2,
        alt
      };
    }
    exports2.getValidation = getValidation;
  }
});

// src/example-app/functions/person/create/index.ts
var create_exports = {};
__export(create_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(create_exports);

// src/example-app/functions/person/create/handler.ts
var E2 = __toESM(require_Either());

// src/example-app/lib/either.ts
var E = __toESM(require_Either());
var import_function = __toESM(require_function());
var liftA3 = (f, fa, fb, fc) => (0, import_function.pipe)(E.of(f), E.ap(fa), E.ap(fb), E.ap(fc));
var bind = (fa, f) => (0, import_function.pipe)(fa, E.chain(f));
var either = (fa, onLeft, onRight) => (0, import_function.pipe)(fa, E.fold(onLeft, onRight));

// src/example-app/functions/person/create/domain/error/index.ts
var PersistenceError = (message, error) => ({
  tag: "PersistenceError",
  message,
  error
});
var DeserializationError = (message) => ({
  tag: "DeserializationError",
  message
});
var ValidationError = (message) => ({
  tag: "ValidationError",
  message
});

// src/example-app/functions/person/create/domain/person/index.ts
var sym = Symbol();
var createPerson = (name) => (age) => (status) => ({
  [sym]: sym,
  name,
  age,
  status
});

// src/example-app/functions/person/create/domain/name/index.ts
var import_Either = __toESM(require_Either());
var sym2 = Symbol();
var buildName = (value) => ({ [sym2]: sym2, value });
var parseName = (string) => string.length < 4 && string.length > 50 ? (0, import_Either.left)(ValidationError("invalid name")) : (0, import_Either.right)(buildName(string));

// src/example-app/functions/person/create/domain/age/index.ts
var import_Either2 = __toESM(require_Either());
var sym3 = Symbol();
var buildAge = (value) => ({ [sym3]: sym3, value });
var parseAge = (string) => {
  try {
    const value = parseInt(string, 10);
    return isNaN(value) || value < 0 || value > 120 ? (0, import_Either2.left)(ValidationError("invalid age")) : (0, import_Either2.right)(buildAge(value.toString()));
  } catch {
    return (0, import_Either2.left)(ValidationError("invalid age"));
  }
};

// src/example-app/functions/person/create/domain/status/index.ts
var sym4 = Symbol();
var buildStatus = (value) => ({ [sym4]: sym4, value });
var Active = () => buildStatus("active");

// src/example-app/functions/person/create/handler.ts
var handler = async (event) => {
  const person = bind(
    deserializeDTO(event.body),
    ({ name, age }) => liftA3(createPerson, parseName(name), parseAge(age), E2.right(Active()))
  );
  return either(
    person,
    async (err) => status400(err.message),
    async (person2) => either(
      await savePerson(person2),
      (err) => status500(err.message),
      (savedPerson) => status200(JSON.stringify(savedPerson))
    )
  );
};
var deserializeDTO = (body) => {
  const { name, age } = JSON.parse(body ?? "{}");
  if (typeof name !== "string" || typeof age !== "string") {
    return E2.left(DeserializationError("Invalid data"));
  }
  return E2.right({ name, age });
};
var savePerson = async (person) => {
  if (Math.random() < 0.2) {
    return E2.left(PersistenceError("Failed to save person"));
  }
  return E2.right(person);
};
var status200 = (message) => ({
  statusCode: 200,
  body: JSON.stringify({ message })
});
var status400 = (message) => ({
  statusCode: 400,
  body: JSON.stringify({ message })
});
var status500 = (message) => ({
  statusCode: 500,
  body: JSON.stringify({ message })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
