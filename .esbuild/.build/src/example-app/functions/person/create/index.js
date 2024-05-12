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
    function pipe3(a, ab, bc, cd, de, ef, fg, gh, hi) {
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
    exports2.pipe = pipe3;
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
    function bind(M) {
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
    exports2.bind = bind;
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
      var fromEither2 = fromEitherK(F);
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, fromEither2(f));
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

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Predicate.js
var require_Predicate = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Predicate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.and = exports2.or = exports2.not = exports2.Contravariant = exports2.getMonoidAll = exports2.getSemigroupAll = exports2.getMonoidAny = exports2.getSemigroupAny = exports2.URI = exports2.contramap = void 0;
    var function_1 = require_function();
    var contramap_ = function(predicate, f) {
      return (0, function_1.pipe)(predicate, (0, exports2.contramap)(f));
    };
    var contramap = function(f) {
      return function(predicate) {
        return (0, function_1.flow)(f, predicate);
      };
    };
    exports2.contramap = contramap;
    exports2.URI = "Predicate";
    var getSemigroupAny = function() {
      return {
        concat: function(first, second) {
          return (0, function_1.pipe)(first, (0, exports2.or)(second));
        }
      };
    };
    exports2.getSemigroupAny = getSemigroupAny;
    var getMonoidAny = function() {
      return {
        concat: (0, exports2.getSemigroupAny)().concat,
        empty: function_1.constFalse
      };
    };
    exports2.getMonoidAny = getMonoidAny;
    var getSemigroupAll = function() {
      return {
        concat: function(first, second) {
          return (0, function_1.pipe)(first, (0, exports2.and)(second));
        }
      };
    };
    exports2.getSemigroupAll = getSemigroupAll;
    var getMonoidAll = function() {
      return {
        concat: (0, exports2.getSemigroupAll)().concat,
        empty: function_1.constTrue
      };
    };
    exports2.getMonoidAll = getMonoidAll;
    exports2.Contravariant = {
      URI: exports2.URI,
      contramap: contramap_
    };
    var not = function(predicate) {
      return function(a) {
        return !predicate(a);
      };
    };
    exports2.not = not;
    var or = function(second) {
      return function(first) {
        return function(a) {
          return first(a) || second(a);
        };
      };
    };
    exports2.or = or;
    var and = function(second) {
      return function(first) {
        return function(a) {
          return first(a) && second(a);
        };
      };
    };
    exports2.and = and;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Magma.js
var require_Magma = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Magma.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatAll = exports2.endo = exports2.filterSecond = exports2.filterFirst = exports2.reverse = void 0;
    var reverse = function(M) {
      return {
        concat: function(first, second) {
          return M.concat(second, first);
        }
      };
    };
    exports2.reverse = reverse;
    var filterFirst = function(predicate) {
      return function(M) {
        return {
          concat: function(first, second) {
            return predicate(first) ? M.concat(first, second) : second;
          }
        };
      };
    };
    exports2.filterFirst = filterFirst;
    var filterSecond = function(predicate) {
      return function(M) {
        return {
          concat: function(first, second) {
            return predicate(second) ? M.concat(first, second) : first;
          }
        };
      };
    };
    exports2.filterSecond = filterSecond;
    var endo = function(f) {
      return function(M) {
        return {
          concat: function(first, second) {
            return M.concat(f(first), f(second));
          }
        };
      };
    };
    exports2.endo = endo;
    var concatAll = function(M) {
      return function(startWith) {
        return function(as) {
          return as.reduce(function(a, acc) {
            return M.concat(a, acc);
          }, startWith);
        };
      };
    };
    exports2.concatAll = concatAll;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Eq.js
var require_Eq = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Eq.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.eqDate = exports2.eqNumber = exports2.eqString = exports2.eqBoolean = exports2.eq = exports2.strictEqual = exports2.getStructEq = exports2.getTupleEq = exports2.Contravariant = exports2.getMonoid = exports2.getSemigroup = exports2.eqStrict = exports2.URI = exports2.contramap = exports2.tuple = exports2.struct = exports2.fromEquals = void 0;
    var function_1 = require_function();
    var fromEquals = function(equals) {
      return {
        equals: function(x, y) {
          return x === y || equals(x, y);
        }
      };
    };
    exports2.fromEquals = fromEquals;
    var struct = function(eqs) {
      return (0, exports2.fromEquals)(function(first, second) {
        for (var key in eqs) {
          if (!eqs[key].equals(first[key], second[key])) {
            return false;
          }
        }
        return true;
      });
    };
    exports2.struct = struct;
    var tuple = function() {
      var eqs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
      }
      return (0, exports2.fromEquals)(function(first, second) {
        return eqs.every(function(E3, i) {
          return E3.equals(first[i], second[i]);
        });
      });
    };
    exports2.tuple = tuple;
    var contramap_ = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.contramap)(f));
    };
    var contramap = function(f) {
      return function(fa) {
        return (0, exports2.fromEquals)(function(x, y) {
          return fa.equals(f(x), f(y));
        });
      };
    };
    exports2.contramap = contramap;
    exports2.URI = "Eq";
    exports2.eqStrict = {
      equals: function(a, b) {
        return a === b;
      }
    };
    var empty = {
      equals: function() {
        return true;
      }
    };
    var getSemigroup = function() {
      return {
        concat: function(x, y) {
          return (0, exports2.fromEquals)(function(a, b) {
            return x.equals(a, b) && y.equals(a, b);
          });
        }
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports2.getSemigroup)().concat,
        empty
      };
    };
    exports2.getMonoid = getMonoid;
    exports2.Contravariant = {
      URI: exports2.URI,
      contramap: contramap_
    };
    exports2.getTupleEq = exports2.tuple;
    exports2.getStructEq = exports2.struct;
    exports2.strictEqual = exports2.eqStrict.equals;
    exports2.eq = exports2.Contravariant;
    exports2.eqBoolean = exports2.eqStrict;
    exports2.eqString = exports2.eqStrict;
    exports2.eqNumber = exports2.eqStrict;
    exports2.eqDate = {
      equals: function(first, second) {
        return first.valueOf() === second.valueOf();
      }
    };
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Ord.js
var require_Ord = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Ord.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ordDate = exports2.ordNumber = exports2.ordString = exports2.ordBoolean = exports2.ord = exports2.getDualOrd = exports2.getTupleOrd = exports2.between = exports2.clamp = exports2.max = exports2.min = exports2.geq = exports2.leq = exports2.gt = exports2.lt = exports2.equals = exports2.trivial = exports2.Contravariant = exports2.getMonoid = exports2.getSemigroup = exports2.URI = exports2.contramap = exports2.reverse = exports2.tuple = exports2.fromCompare = exports2.equalsDefault = void 0;
    var Eq_1 = require_Eq();
    var function_1 = require_function();
    var equalsDefault = function(compare2) {
      return function(first, second) {
        return first === second || compare2(first, second) === 0;
      };
    };
    exports2.equalsDefault = equalsDefault;
    var fromCompare = function(compare2) {
      return {
        equals: (0, exports2.equalsDefault)(compare2),
        compare: function(first, second) {
          return first === second ? 0 : compare2(first, second);
        }
      };
    };
    exports2.fromCompare = fromCompare;
    var tuple = function() {
      var ords = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
      }
      return (0, exports2.fromCompare)(function(first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
          var r = ords[i].compare(first[i], second[i]);
          if (r !== 0) {
            return r;
          }
        }
        return ords[i].compare(first[i], second[i]);
      });
    };
    exports2.tuple = tuple;
    var reverse = function(O) {
      return (0, exports2.fromCompare)(function(first, second) {
        return O.compare(second, first);
      });
    };
    exports2.reverse = reverse;
    var contramap_ = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.contramap)(f));
    };
    var contramap = function(f) {
      return function(fa) {
        return (0, exports2.fromCompare)(function(first, second) {
          return fa.compare(f(first), f(second));
        });
      };
    };
    exports2.contramap = contramap;
    exports2.URI = "Ord";
    var getSemigroup = function() {
      return {
        concat: function(first, second) {
          return (0, exports2.fromCompare)(function(a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
          });
        }
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getMonoid = function() {
      return {
        concat: (0, exports2.getSemigroup)().concat,
        empty: (0, exports2.fromCompare)(function() {
          return 0;
        })
      };
    };
    exports2.getMonoid = getMonoid;
    exports2.Contravariant = {
      URI: exports2.URI,
      contramap: contramap_
    };
    exports2.trivial = {
      equals: function_1.constTrue,
      compare: /* @__PURE__ */ (0, function_1.constant)(0)
    };
    var equals = function(O) {
      return function(second) {
        return function(first) {
          return first === second || O.compare(first, second) === 0;
        };
      };
    };
    exports2.equals = equals;
    var lt = function(O) {
      return function(first, second) {
        return O.compare(first, second) === -1;
      };
    };
    exports2.lt = lt;
    var gt = function(O) {
      return function(first, second) {
        return O.compare(first, second) === 1;
      };
    };
    exports2.gt = gt;
    var leq = function(O) {
      return function(first, second) {
        return O.compare(first, second) !== 1;
      };
    };
    exports2.leq = leq;
    var geq = function(O) {
      return function(first, second) {
        return O.compare(first, second) !== -1;
      };
    };
    exports2.geq = geq;
    var min = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
      };
    };
    exports2.min = min;
    var max = function(O) {
      return function(first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
      };
    };
    exports2.max = max;
    var clamp = function(O) {
      var minO = (0, exports2.min)(O);
      var maxO = (0, exports2.max)(O);
      return function(low, hi) {
        return function(a) {
          return maxO(minO(a, hi), low);
        };
      };
    };
    exports2.clamp = clamp;
    var between = function(O) {
      var ltO = (0, exports2.lt)(O);
      var gtO = (0, exports2.gt)(O);
      return function(low, hi) {
        return function(a) {
          return ltO(a, low) || gtO(a, hi) ? false : true;
        };
      };
    };
    exports2.between = between;
    exports2.getTupleOrd = exports2.tuple;
    exports2.getDualOrd = exports2.reverse;
    exports2.ord = exports2.Contravariant;
    function compare(first, second) {
      return first < second ? -1 : first > second ? 1 : 0;
    }
    var strictOrd = {
      equals: Eq_1.eqStrict.equals,
      compare
    };
    exports2.ordBoolean = strictOrd;
    exports2.ordString = strictOrd;
    exports2.ordNumber = strictOrd;
    exports2.ordDate = (0, function_1.pipe)(
      exports2.ordNumber,
      /* @__PURE__ */ (0, exports2.contramap)(function(date) {
        return date.valueOf();
      })
    );
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Semigroup.js
var require_Semigroup = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Semigroup.js"(exports2) {
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
    exports2.semigroupProduct = exports2.semigroupSum = exports2.semigroupString = exports2.getFunctionSemigroup = exports2.semigroupAny = exports2.semigroupAll = exports2.fold = exports2.getIntercalateSemigroup = exports2.getMeetSemigroup = exports2.getJoinSemigroup = exports2.getDualSemigroup = exports2.getStructSemigroup = exports2.getTupleSemigroup = exports2.getFirstSemigroup = exports2.getLastSemigroup = exports2.getObjectSemigroup = exports2.semigroupVoid = exports2.concatAll = exports2.last = exports2.first = exports2.intercalate = exports2.tuple = exports2.struct = exports2.reverse = exports2.constant = exports2.max = exports2.min = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    var M = __importStar(require_Magma());
    var Or = __importStar(require_Ord());
    var min = function(O) {
      return {
        concat: Or.min(O)
      };
    };
    exports2.min = min;
    var max = function(O) {
      return {
        concat: Or.max(O)
      };
    };
    exports2.max = max;
    var constant = function(a) {
      return {
        concat: function() {
          return a;
        }
      };
    };
    exports2.constant = constant;
    exports2.reverse = M.reverse;
    var struct = function(semigroups) {
      return {
        concat: function(first2, second) {
          var r = {};
          for (var k in semigroups) {
            if (_.has.call(semigroups, k)) {
              r[k] = semigroups[k].concat(first2[k], second[k]);
            }
          }
          return r;
        }
      };
    };
    exports2.struct = struct;
    var tuple = function() {
      var semigroups = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
      }
      return {
        concat: function(first2, second) {
          return semigroups.map(function(s, i) {
            return s.concat(first2[i], second[i]);
          });
        }
      };
    };
    exports2.tuple = tuple;
    var intercalate = function(middle) {
      return function(S) {
        return {
          concat: function(x, y) {
            return S.concat(x, S.concat(middle, y));
          }
        };
      };
    };
    exports2.intercalate = intercalate;
    var first = function() {
      return { concat: function_1.identity };
    };
    exports2.first = first;
    var last = function() {
      return { concat: function(_2, y) {
        return y;
      } };
    };
    exports2.last = last;
    exports2.concatAll = M.concatAll;
    exports2.semigroupVoid = (0, exports2.constant)(void 0);
    var getObjectSemigroup = function() {
      return {
        concat: function(first2, second) {
          return Object.assign({}, first2, second);
        }
      };
    };
    exports2.getObjectSemigroup = getObjectSemigroup;
    exports2.getLastSemigroup = exports2.last;
    exports2.getFirstSemigroup = exports2.first;
    exports2.getTupleSemigroup = exports2.tuple;
    exports2.getStructSemigroup = exports2.struct;
    exports2.getDualSemigroup = exports2.reverse;
    exports2.getJoinSemigroup = exports2.max;
    exports2.getMeetSemigroup = exports2.min;
    exports2.getIntercalateSemigroup = exports2.intercalate;
    function fold(S) {
      var concatAllS = (0, exports2.concatAll)(S);
      return function(startWith, as) {
        return as === void 0 ? concatAllS(startWith) : concatAllS(startWith)(as);
      };
    }
    exports2.fold = fold;
    exports2.semigroupAll = {
      concat: function(x, y) {
        return x && y;
      }
    };
    exports2.semigroupAny = {
      concat: function(x, y) {
        return x || y;
      }
    };
    exports2.getFunctionSemigroup = function_1.getSemigroup;
    exports2.semigroupString = {
      concat: function(x, y) {
        return x + y;
      }
    };
    exports2.semigroupSum = {
      concat: function(x, y) {
        return x + y;
      }
    };
    exports2.semigroupProduct = {
      concat: function(x, y) {
        return x * y;
      }
    };
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Zero.js
var require_Zero = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Zero.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.guard = void 0;
    function guard(F, P) {
      return function(b) {
        return b ? P.of(void 0) : F.zero();
      };
    }
    exports2.guard = guard;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Option.js
var require_Option = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Option.js"(exports2) {
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
    exports2.Witherable = exports2.wilt = exports2.wither = exports2.Traversable = exports2.sequence = exports2.traverse = exports2.Filterable = exports2.partitionMap = exports2.partition = exports2.filterMap = exports2.filter = exports2.Compactable = exports2.separate = exports2.compact = exports2.Extend = exports2.extend = exports2.Alternative = exports2.guard = exports2.Zero = exports2.zero = exports2.Alt = exports2.alt = exports2.altW = exports2.orElse = exports2.Foldable = exports2.reduceRight = exports2.foldMap = exports2.reduce = exports2.Monad = exports2.Chain = exports2.flatMap = exports2.Applicative = exports2.Apply = exports2.ap = exports2.Pointed = exports2.of = exports2.asUnit = exports2.as = exports2.Functor = exports2.map = exports2.getMonoid = exports2.getOrd = exports2.getEq = exports2.getShow = exports2.URI = exports2.getRight = exports2.getLeft = exports2.fromPredicate = exports2.some = exports2.none = void 0;
    exports2.getFirstMonoid = exports2.getApplyMonoid = exports2.getApplySemigroup = exports2.option = exports2.mapNullable = exports2.getRefinement = exports2.chainFirst = exports2.chain = exports2.sequenceArray = exports2.traverseArray = exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex = exports2.traverseReadonlyNonEmptyArrayWithIndex = exports2.ApT = exports2.apS = exports2.bind = exports2.let = exports2.bindTo = exports2.Do = exports2.exists = exports2.elem = exports2.toUndefined = exports2.toNullable = exports2.chainNullableK = exports2.fromNullableK = exports2.tryCatchK = exports2.tryCatch = exports2.fromNullable = exports2.chainFirstEitherK = exports2.chainEitherK = exports2.fromEitherK = exports2.duplicate = exports2.tapEither = exports2.tap = exports2.flatten = exports2.apSecond = exports2.apFirst = exports2.flap = exports2.getOrElse = exports2.getOrElseW = exports2.fold = exports2.match = exports2.foldW = exports2.matchW = exports2.isNone = exports2.isSome = exports2.FromEither = exports2.fromEither = exports2.MonadThrow = exports2.throwError = void 0;
    exports2.getLastMonoid = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var chainable = __importStar(require_Chain());
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Predicate_1 = require_Predicate();
    var Semigroup_1 = require_Semigroup();
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    var Zero_1 = require_Zero();
    exports2.none = _.none;
    exports2.some = _.some;
    function fromPredicate(predicate) {
      return function(a) {
        return predicate(a) ? (0, exports2.some)(a) : exports2.none;
      };
    }
    exports2.fromPredicate = fromPredicate;
    var getLeft = function(ma) {
      return ma._tag === "Right" ? exports2.none : (0, exports2.some)(ma.left);
    };
    exports2.getLeft = getLeft;
    var getRight = function(ma) {
      return ma._tag === "Left" ? exports2.none : (0, exports2.some)(ma.right);
    };
    exports2.getRight = getRight;
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
      var foldMapM = (0, exports2.foldMap)(M);
      return function(fa, f) {
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
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports2.alt)(that));
    };
    var _filter = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports2.filter)(predicate));
    };
    var _filterMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.filterMap)(f));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports2.extend)(f));
    };
    var _partition = function(fa, predicate) {
      return (0, function_1.pipe)(fa, (0, exports2.partition)(predicate));
    };
    var _partitionMap = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.partitionMap)(f));
    };
    exports2.URI = "Option";
    var getShow = function(S) {
      return {
        show: function(ma) {
          return (0, exports2.isNone)(ma) ? "none" : "some(".concat(S.show(ma.value), ")");
        }
      };
    };
    exports2.getShow = getShow;
    var getEq = function(E3) {
      return {
        equals: function(x, y) {
          return x === y || ((0, exports2.isNone)(x) ? (0, exports2.isNone)(y) : (0, exports2.isNone)(y) ? false : E3.equals(x.value, y.value));
        }
      };
    };
    exports2.getEq = getEq;
    var getOrd = function(O) {
      return {
        equals: (0, exports2.getEq)(O).equals,
        compare: function(x, y) {
          return x === y ? 0 : (0, exports2.isSome)(x) ? (0, exports2.isSome)(y) ? O.compare(x.value, y.value) : 1 : -1;
        }
      };
    };
    exports2.getOrd = getOrd;
    var getMonoid = function(S) {
      return {
        concat: function(x, y) {
          return (0, exports2.isNone)(x) ? y : (0, exports2.isNone)(y) ? x : (0, exports2.some)(S.concat(x.value, y.value));
        },
        empty: exports2.none
      };
    };
    exports2.getMonoid = getMonoid;
    var map = function(f) {
      return function(fa) {
        return (0, exports2.isNone)(fa) ? exports2.none : (0, exports2.some)(f(fa.value));
      };
    };
    exports2.map = map;
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports2.Functor));
    exports2.asUnit = (0, Functor_1.asUnit)(exports2.Functor);
    exports2.of = exports2.some;
    exports2.Pointed = {
      URI: exports2.URI,
      of: exports2.of
    };
    var ap2 = function(fa) {
      return function(fab) {
        return (0, exports2.isNone)(fab) ? exports2.none : (0, exports2.isNone)(fa) ? exports2.none : (0, exports2.some)(fab.value(fa.value));
      };
    };
    exports2.ap = ap2;
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
    exports2.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, exports2.isNone)(ma) ? exports2.none : f(ma.value);
    });
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
        return (0, exports2.isNone)(fa) ? b : f(b, fa.value);
      };
    };
    exports2.reduce = reduce;
    var foldMap = function(M) {
      return function(f) {
        return function(fa) {
          return (0, exports2.isNone)(fa) ? M.empty : f(fa.value);
        };
      };
    };
    exports2.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return function(fa) {
        return (0, exports2.isNone)(fa) ? b : f(fa.value, b);
      };
    };
    exports2.reduceRight = reduceRight;
    exports2.Foldable = {
      URI: exports2.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    exports2.orElse = (0, function_1.dual)(2, function(self, that) {
      return (0, exports2.isNone)(self) ? that() : self;
    });
    exports2.altW = exports2.orElse;
    exports2.alt = exports2.orElse;
    exports2.Alt = {
      URI: exports2.URI,
      map: _map,
      alt: _alt
    };
    var zero = function() {
      return exports2.none;
    };
    exports2.zero = zero;
    exports2.Zero = {
      URI: exports2.URI,
      zero: exports2.zero
    };
    exports2.guard = (0, Zero_1.guard)(exports2.Zero, exports2.Pointed);
    exports2.Alternative = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      alt: _alt,
      zero: exports2.zero
    };
    var extend = function(f) {
      return function(wa) {
        return (0, exports2.isNone)(wa) ? exports2.none : (0, exports2.some)(f(wa));
      };
    };
    exports2.extend = extend;
    exports2.Extend = {
      URI: exports2.URI,
      map: _map,
      extend: _extend
    };
    exports2.compact = (0, exports2.flatMap)(function_1.identity);
    var defaultSeparated = /* @__PURE__ */ (0, Separated_1.separated)(exports2.none, exports2.none);
    var separate = function(ma) {
      return (0, exports2.isNone)(ma) ? defaultSeparated : (0, Separated_1.separated)((0, exports2.getLeft)(ma.value), (0, exports2.getRight)(ma.value));
    };
    exports2.separate = separate;
    exports2.Compactable = {
      URI: exports2.URI,
      compact: exports2.compact,
      separate: exports2.separate
    };
    var filter = function(predicate) {
      return function(fa) {
        return (0, exports2.isNone)(fa) ? exports2.none : predicate(fa.value) ? fa : exports2.none;
      };
    };
    exports2.filter = filter;
    var filterMap = function(f) {
      return function(fa) {
        return (0, exports2.isNone)(fa) ? exports2.none : f(fa.value);
      };
    };
    exports2.filterMap = filterMap;
    var partition = function(predicate) {
      return function(fa) {
        return (0, Separated_1.separated)(_filter(fa, (0, Predicate_1.not)(predicate)), _filter(fa, predicate));
      };
    };
    exports2.partition = partition;
    var partitionMap = function(f) {
      return (0, function_1.flow)((0, exports2.map)(f), exports2.separate);
    };
    exports2.partitionMap = partitionMap;
    exports2.Filterable = {
      URI: exports2.URI,
      map: _map,
      compact: exports2.compact,
      separate: exports2.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap
    };
    var traverse = function(F) {
      return function(f) {
        return function(ta) {
          return (0, exports2.isNone)(ta) ? F.of(exports2.none) : F.map(f(ta.value), exports2.some);
        };
      };
    };
    exports2.traverse = traverse;
    var sequence = function(F) {
      return function(ta) {
        return (0, exports2.isNone)(ta) ? F.of(exports2.none) : F.map(ta.value, exports2.some);
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
    var _wither = /* @__PURE__ */ (0, Witherable_1.witherDefault)(exports2.Traversable, exports2.Compactable);
    var _wilt = /* @__PURE__ */ (0, Witherable_1.wiltDefault)(exports2.Traversable, exports2.Compactable);
    var wither = function(F) {
      var _witherF = _wither(F);
      return function(f) {
        return function(fa) {
          return _witherF(fa, f);
        };
      };
    };
    exports2.wither = wither;
    var wilt = function(F) {
      var _wiltF = _wilt(F);
      return function(f) {
        return function(fa) {
          return _wiltF(fa, f);
        };
      };
    };
    exports2.wilt = wilt;
    exports2.Witherable = {
      URI: exports2.URI,
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports2.sequence,
      compact: exports2.compact,
      separate: exports2.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      wither: _wither,
      wilt: _wilt
    };
    var throwError = function() {
      return exports2.none;
    };
    exports2.throwError = throwError;
    exports2.MonadThrow = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      chain: exports2.flatMap,
      throwError: exports2.throwError
    };
    exports2.fromEither = exports2.getRight;
    exports2.FromEither = {
      URI: exports2.URI,
      fromEither: exports2.fromEither
    };
    exports2.isSome = _.isSome;
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports2.isNone = isNone;
    var matchW = function(onNone, onSome) {
      return function(ma) {
        return (0, exports2.isNone)(ma) ? onNone() : onSome(ma.value);
      };
    };
    exports2.matchW = matchW;
    exports2.foldW = exports2.matchW;
    exports2.match = exports2.matchW;
    exports2.fold = exports2.match;
    var getOrElseW = function(onNone) {
      return function(ma) {
        return (0, exports2.isNone)(ma) ? onNone() : ma.value;
      };
    };
    exports2.getOrElseW = getOrElseW;
    exports2.getOrElse = exports2.getOrElseW;
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    exports2.apFirst = (0, Apply_1.apFirst)(exports2.Apply);
    exports2.apSecond = (0, Apply_1.apSecond)(exports2.Apply);
    exports2.flatten = exports2.compact;
    exports2.tap = (0, function_1.dual)(2, chainable.tap(exports2.Chain));
    exports2.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports2.FromEither, exports2.Chain));
    exports2.duplicate = (0, exports2.extend)(function_1.identity);
    exports2.fromEitherK = (0, FromEither_1.fromEitherK)(exports2.FromEither);
    exports2.chainEitherK = /* @__PURE__ */ (0, FromEither_1.chainEitherK)(exports2.FromEither, exports2.Chain);
    exports2.chainFirstEitherK = exports2.tapEither;
    var fromNullable = function(a) {
      return a == null ? exports2.none : (0, exports2.some)(a);
    };
    exports2.fromNullable = fromNullable;
    var tryCatch = function(f) {
      try {
        return (0, exports2.some)(f());
      } catch (e) {
        return exports2.none;
      }
    };
    exports2.tryCatch = tryCatch;
    var tryCatchK = function(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports2.tryCatch)(function() {
          return f.apply(void 0, a);
        });
      };
    };
    exports2.tryCatchK = tryCatchK;
    var fromNullableK = function(f) {
      return (0, function_1.flow)(f, exports2.fromNullable);
    };
    exports2.fromNullableK = fromNullableK;
    var chainNullableK = function(f) {
      return function(ma) {
        return (0, exports2.isNone)(ma) ? exports2.none : (0, exports2.fromNullable)(f(ma.value));
      };
    };
    exports2.chainNullableK = chainNullableK;
    exports2.toNullable = (0, exports2.match)(function_1.constNull, function_1.identity);
    exports2.toUndefined = (0, exports2.match)(function_1.constUndefined, function_1.identity);
    function elem(E3) {
      return function(a, ma) {
        if (ma === void 0) {
          var elemE_1 = elem(E3);
          return function(ma2) {
            return elemE_1(a, ma2);
          };
        }
        return (0, exports2.isNone)(ma) ? false : E3.equals(a, ma.value);
      };
    }
    exports2.elem = elem;
    var exists = function(predicate) {
      return function(ma) {
        return (0, exports2.isNone)(ma) ? false : predicate(ma.value);
      };
    };
    exports2.exists = exists;
    exports2.Do = (0, exports2.of)(_.emptyRecord);
    exports2.bindTo = (0, Functor_1.bindTo)(exports2.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports2.Functor);
    exports2.let = let_;
    exports2.bind = chainable.bind(exports2.Chain);
    exports2.apS = (0, Apply_1.apS)(exports2.Apply);
    exports2.ApT = (0, exports2.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        var o = f(0, _.head(as));
        if ((0, exports2.isNone)(o)) {
          return exports2.none;
        }
        var out = [o.value];
        for (var i = 1; i < as.length; i++) {
          var o_1 = f(i, as[i]);
          if ((0, exports2.isNone)(o_1)) {
            return exports2.none;
          }
          out.push(o_1.value);
        }
        return (0, exports2.some)(out);
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
    exports2.chain = exports2.flatMap;
    exports2.chainFirst = exports2.tap;
    function getRefinement(getOption) {
      return function(a) {
        return (0, exports2.isSome)(getOption(a));
      };
    }
    exports2.getRefinement = getRefinement;
    exports2.mapNullable = exports2.chainNullableK;
    exports2.option = {
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
      zero: exports2.zero,
      alt: _alt,
      extend: _extend,
      compact: exports2.compact,
      separate: exports2.separate,
      filter: _filter,
      filterMap: _filterMap,
      partition: _partition,
      partitionMap: _partitionMap,
      wither: _wither,
      wilt: _wilt,
      throwError: exports2.throwError
    };
    exports2.getApplySemigroup = (0, Apply_1.getApplySemigroup)(exports2.Apply);
    exports2.getApplyMonoid = (0, Applicative_1.getApplicativeMonoid)(exports2.Applicative);
    var getFirstMonoid = function() {
      return (0, exports2.getMonoid)((0, Semigroup_1.first)());
    };
    exports2.getFirstMonoid = getFirstMonoid;
    var getLastMonoid = function() {
      return (0, exports2.getMonoid)((0, Semigroup_1.last)());
    };
    exports2.getLastMonoid = getLastMonoid;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Compactable.js
var require_Compactable = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Compactable.js"(exports2) {
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
    exports2.getCompactableComposition = exports2.separate = exports2.compact = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var Option_1 = require_Option();
    var S = __importStar(require_Separated());
    function compact(F, G) {
      return function(fga) {
        return F.map(fga, G.compact);
      };
    }
    exports2.compact = compact;
    function separate(F, C, G) {
      var _compact = compact(F, C);
      var _map = (0, Functor_1.map)(F, G);
      return function(fge) {
        return S.separated(_compact((0, function_1.pipe)(fge, _map(Option_1.getLeft))), _compact((0, function_1.pipe)(fge, _map(Option_1.getRight))));
      };
    }
    exports2.separate = separate;
    function getCompactableComposition(F, G) {
      var map = (0, Functor_1.getFunctorComposition)(F, G).map;
      return {
        map,
        compact: compact(F, G),
        separate: separate(F, G, G)
      };
    }
    exports2.getCompactableComposition = getCompactableComposition;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/EitherT.js
var require_EitherT = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/EitherT.js"(exports2) {
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
    exports2.getEitherM = exports2.toUnion = exports2.swap = exports2.orLeft = exports2.tapError = exports2.orElseFirst = exports2.orElse = exports2.getOrElse = exports2.matchE = exports2.match = exports2.altValidation = exports2.mapError = exports2.mapLeft = exports2.mapBoth = exports2.bimap = exports2.alt = exports2.flatMap = exports2.chain = exports2.ap = exports2.map = exports2.chainNullableK = exports2.fromNullableK = exports2.fromNullable = exports2.leftF = exports2.rightF = exports2.left = exports2.right = void 0;
    var Apply_1 = require_Apply();
    var E3 = __importStar(require_Either());
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    function right4(F) {
      return (0, function_1.flow)(E3.right, F.of);
    }
    exports2.right = right4;
    function left4(F) {
      return (0, function_1.flow)(E3.left, F.of);
    }
    exports2.left = left4;
    function rightF(F) {
      return function(fa) {
        return F.map(fa, E3.right);
      };
    }
    exports2.rightF = rightF;
    function leftF(F) {
      return function(fe) {
        return F.map(fe, E3.left);
      };
    }
    exports2.leftF = leftF;
    function fromNullable(F) {
      return function(e) {
        return (0, function_1.flow)(E3.fromNullable(e), F.of);
      };
    }
    exports2.fromNullable = fromNullable;
    function fromNullableK(F) {
      var fromNullableF = fromNullable(F);
      return function(e) {
        var fromNullableFE = fromNullableF(e);
        return function(f) {
          return (0, function_1.flow)(f, fromNullableFE);
        };
      };
    }
    exports2.fromNullableK = fromNullableK;
    function chainNullableK(M) {
      var chainM = chain4(M);
      var fromNullableKM = fromNullableK(M);
      return function(e) {
        var fromNullableKMe = fromNullableKM(e);
        return function(f) {
          return chainM(fromNullableKMe(f));
        };
      };
    }
    exports2.chainNullableK = chainNullableK;
    function map(F) {
      return (0, Functor_1.map)(F, E3.Functor);
    }
    exports2.map = map;
    function ap2(F) {
      return (0, Apply_1.ap)(F, E3.Apply);
    }
    exports2.ap = ap2;
    function chain4(M) {
      var flatMapM = flatMap(M);
      return function(f) {
        return function(ma) {
          return flatMapM(ma, f);
        };
      };
    }
    exports2.chain = chain4;
    function flatMap(M) {
      return function(ma, f) {
        return M.chain(ma, function(e) {
          return E3.isLeft(e) ? M.of(e) : f(e.right);
        });
      };
    }
    exports2.flatMap = flatMap;
    function alt(M) {
      return function(second) {
        return function(first) {
          return M.chain(first, function(e) {
            return E3.isLeft(e) ? second() : M.of(e);
          });
        };
      };
    }
    exports2.alt = alt;
    function bimap(F) {
      var mapBothF = mapBoth(F);
      return function(f, g) {
        return function(self) {
          return mapBothF(self, f, g);
        };
      };
    }
    exports2.bimap = bimap;
    function mapBoth(F) {
      return function(self, f, g) {
        return F.map(self, E3.bimap(f, g));
      };
    }
    exports2.mapBoth = mapBoth;
    function mapLeft(F) {
      var mapErrorF = mapError(F);
      return function(f) {
        return function(self) {
          return mapErrorF(self, f);
        };
      };
    }
    exports2.mapLeft = mapLeft;
    function mapError(F) {
      return function(self, f) {
        return F.map(self, E3.mapLeft(f));
      };
    }
    exports2.mapError = mapError;
    function altValidation(M, S) {
      return function(second) {
        return function(first) {
          return M.chain(first, E3.match(function(e1) {
            return M.map(second(), E3.mapLeft(function(e2) {
              return S.concat(e1, e2);
            }));
          }, right4(M)));
        };
      };
    }
    exports2.altValidation = altValidation;
    function match2(F) {
      return function(onLeft, onRight) {
        return function(ma) {
          return F.map(ma, E3.match(onLeft, onRight));
        };
      };
    }
    exports2.match = match2;
    function matchE(M) {
      return function(onLeft, onRight) {
        return function(ma) {
          return M.chain(ma, E3.match(onLeft, onRight));
        };
      };
    }
    exports2.matchE = matchE;
    function getOrElse(M) {
      return function(onLeft) {
        return function(ma) {
          return M.chain(ma, E3.match(onLeft, M.of));
        };
      };
    }
    exports2.getOrElse = getOrElse;
    function orElse(M) {
      return function(onLeft) {
        return function(ma) {
          return M.chain(ma, function(e) {
            return E3.isLeft(e) ? onLeft(e.left) : M.of(e);
          });
        };
      };
    }
    exports2.orElse = orElse;
    function orElseFirst(M) {
      var tapErrorM = tapError(M);
      return function(onLeft) {
        return function(ma) {
          return tapErrorM(ma, onLeft);
        };
      };
    }
    exports2.orElseFirst = orElseFirst;
    function tapError(M) {
      var orElseM = orElse(M);
      return function(ma, onLeft) {
        return (0, function_1.pipe)(ma, orElseM(function(e) {
          return M.map(onLeft(e), function(eb) {
            return E3.isLeft(eb) ? eb : E3.left(e);
          });
        }));
      };
    }
    exports2.tapError = tapError;
    function orLeft(M) {
      return function(onLeft) {
        return function(ma) {
          return M.chain(ma, E3.match(function(e) {
            return M.map(onLeft(e), E3.left);
          }, function(a) {
            return M.of(E3.right(a));
          }));
        };
      };
    }
    exports2.orLeft = orLeft;
    function swap(F) {
      return function(ma) {
        return F.map(ma, E3.swap);
      };
    }
    exports2.swap = swap;
    function toUnion(F) {
      return function(fa) {
        return F.map(fa, E3.toUnion);
      };
    }
    exports2.toUnion = toUnion;
    function getEitherM(M) {
      var _ap = ap2(M);
      var _map = map(M);
      var _chain = chain4(M);
      var _alt = alt(M);
      var _bimap = bimap(M);
      var _mapLeft = mapLeft(M);
      var _fold = matchE(M);
      var _getOrElse = getOrElse(M);
      var _orElse = orElse(M);
      return {
        map: function(fa, f) {
          return (0, function_1.pipe)(fa, _map(f));
        },
        ap: function(fab, fa) {
          return (0, function_1.pipe)(fab, _ap(fa));
        },
        of: right4(M),
        chain: function(ma, f) {
          return (0, function_1.pipe)(ma, _chain(f));
        },
        alt: function(fa, that) {
          return (0, function_1.pipe)(fa, _alt(that));
        },
        bimap: function(fea, f, g) {
          return (0, function_1.pipe)(fea, _bimap(f, g));
        },
        mapLeft: function(fea, f) {
          return (0, function_1.pipe)(fea, _mapLeft(f));
        },
        fold: function(fa, onLeft, onRight) {
          return (0, function_1.pipe)(fa, _fold(onLeft, onRight));
        },
        getOrElse: function(fa, onLeft) {
          return (0, function_1.pipe)(fa, _getOrElse(onLeft));
        },
        orElse: function(fa, f) {
          return (0, function_1.pipe)(fa, _orElse(f));
        },
        swap: swap(M),
        rightM: rightF(M),
        leftM: leftF(M),
        left: left4(M)
      };
    }
    exports2.getEitherM = getEitherM;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Filterable.js
var require_Filterable = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Filterable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getFilterableComposition = exports2.partitionMap = exports2.partition = exports2.filterMap = exports2.filter = void 0;
    var Compactable_1 = require_Compactable();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var Option_1 = require_Option();
    var Predicate_1 = require_Predicate();
    var Separated_1 = require_Separated();
    function filter(F, G) {
      return function(predicate) {
        return function(fga) {
          return F.map(fga, function(ga) {
            return G.filter(ga, predicate);
          });
        };
      };
    }
    exports2.filter = filter;
    function filterMap(F, G) {
      return function(f) {
        return function(fga) {
          return F.map(fga, function(ga) {
            return G.filterMap(ga, f);
          });
        };
      };
    }
    exports2.filterMap = filterMap;
    function partition(F, G) {
      var _filter = filter(F, G);
      return function(predicate) {
        var left4 = _filter((0, Predicate_1.not)(predicate));
        var right4 = _filter(predicate);
        return function(fgb) {
          return (0, Separated_1.separated)(left4(fgb), right4(fgb));
        };
      };
    }
    exports2.partition = partition;
    function partitionMap(F, G) {
      var _filterMap = filterMap(F, G);
      return function(f) {
        return function(fga) {
          return (0, Separated_1.separated)((0, function_1.pipe)(fga, _filterMap(function(a) {
            return (0, Option_1.getLeft)(f(a));
          })), (0, function_1.pipe)(fga, _filterMap(function(a) {
            return (0, Option_1.getRight)(f(a));
          })));
        };
      };
    }
    exports2.partitionMap = partitionMap;
    function getFilterableComposition(F, G) {
      var map = (0, Functor_1.getFunctorComposition)(F, G).map;
      var _compact = (0, Compactable_1.compact)(F, G);
      var _separate = (0, Compactable_1.separate)(F, G, G);
      var _filter = filter(F, G);
      var _filterMap = filterMap(F, G);
      var _partition = partition(F, G);
      var _partitionMap = partitionMap(F, G);
      return {
        map,
        compact: _compact,
        separate: _separate,
        filter: function(fga, f) {
          return (0, function_1.pipe)(fga, _filter(f));
        },
        filterMap: function(fga, f) {
          return (0, function_1.pipe)(fga, _filterMap(f));
        },
        partition: function(fga, p) {
          return (0, function_1.pipe)(fga, _partition(p));
        },
        partitionMap: function(fga, f) {
          return (0, function_1.pipe)(fga, _partitionMap(f));
        }
      };
    }
    exports2.getFilterableComposition = getFilterableComposition;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromIO.js
var require_FromIO = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromIO.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tapIO = exports2.chainFirstIOK = exports2.chainIOK = exports2.fromIOK = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    function fromIOK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromIO);
      };
    }
    exports2.fromIOK = fromIOK;
    function chainIOK(F, M) {
      return function(f) {
        var g = (0, function_1.flow)(f, F.fromIO);
        return function(first) {
          return M.chain(first, g);
        };
      };
    }
    exports2.chainIOK = chainIOK;
    function chainFirstIOK(F, M) {
      var tapIOM = tapIO(F, M);
      return function(f) {
        return function(first) {
          return tapIOM(first, f);
        };
      };
    }
    exports2.chainFirstIOK = chainFirstIOK;
    function tapIO(F, M) {
      var chainFirstM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return chainFirstM(self, (0, function_1.flow)(f, F.fromIO));
      };
    }
    exports2.tapIO = tapIO;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromTask.js
var require_FromTask = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/FromTask.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tapTask = exports2.chainFirstTaskK = exports2.chainTaskK = exports2.fromTaskK = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    function fromTaskK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromTask);
      };
    }
    exports2.fromTaskK = fromTaskK;
    function chainTaskK(F, M) {
      return function(f) {
        var g = (0, function_1.flow)(f, F.fromTask);
        return function(first) {
          return M.chain(first, g);
        };
      };
    }
    exports2.chainTaskK = chainTaskK;
    function chainFirstTaskK(F, M) {
      var tapTaskM = tapTask(F, M);
      return function(f) {
        return function(first) {
          return tapTaskM(first, f);
        };
      };
    }
    exports2.chainFirstTaskK = chainFirstTaskK;
    function tapTask(F, M) {
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, (0, function_1.flow)(f, F.fromTask));
      };
    }
    exports2.tapTask = tapTask;
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Task.js
var require_Task = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/Task.js"(exports2) {
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
    exports2.sequenceSeqArray = exports2.traverseSeqArray = exports2.traverseSeqArrayWithIndex = exports2.sequenceArray = exports2.traverseArray = exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndexSeq = exports2.traverseReadonlyNonEmptyArrayWithIndexSeq = exports2.traverseReadonlyArrayWithIndex = exports2.traverseReadonlyNonEmptyArrayWithIndex = exports2.ApT = exports2.apS = exports2.bind = exports2.let = exports2.bindTo = exports2.Do = exports2.never = exports2.FromTask = exports2.chainFirstIOK = exports2.chainIOK = exports2.fromIOK = exports2.tapIO = exports2.tap = exports2.flatMapIO = exports2.FromIO = exports2.MonadTask = exports2.fromTask = exports2.MonadIO = exports2.Monad = exports2.Chain = exports2.ApplicativeSeq = exports2.ApplySeq = exports2.ApplicativePar = exports2.apSecond = exports2.apFirst = exports2.ApplyPar = exports2.Pointed = exports2.flap = exports2.asUnit = exports2.as = exports2.Functor = exports2.getRaceMonoid = exports2.URI = exports2.flatten = exports2.flatMap = exports2.of = exports2.ap = exports2.map = exports2.delay = exports2.fromIO = void 0;
    exports2.getMonoid = exports2.getSemigroup = exports2.taskSeq = exports2.task = exports2.chainFirst = exports2.chain = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var chainable = __importStar(require_Chain());
    var FromIO_1 = require_FromIO();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var fromIO = function(ma) {
      return function() {
        return Promise.resolve().then(ma);
      };
    };
    exports2.fromIO = fromIO;
    function delay(millis) {
      return function(ma) {
        return function() {
          return new Promise(function(resolve) {
            setTimeout(function() {
              Promise.resolve().then(ma).then(resolve);
            }, millis);
          });
        };
      };
    }
    exports2.delay = delay;
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _apPar = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports2.ap)(fa));
    };
    var _apSeq = function(fab, fa) {
      return (0, exports2.flatMap)(fab, function(f) {
        return (0, function_1.pipe)(fa, (0, exports2.map)(f));
      });
    };
    var map = function(f) {
      return function(fa) {
        return function() {
          return Promise.resolve().then(fa).then(f);
        };
      };
    };
    exports2.map = map;
    var ap2 = function(fa) {
      return function(fab) {
        return function() {
          return Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(function(_a) {
            var f = _a[0], a = _a[1];
            return f(a);
          });
        };
      };
    };
    exports2.ap = ap2;
    var of3 = function(a) {
      return function() {
        return Promise.resolve(a);
      };
    };
    exports2.of = of3;
    exports2.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return function() {
        return Promise.resolve().then(ma).then(function(a) {
          return f(a)();
        });
      };
    });
    exports2.flatten = (0, exports2.flatMap)(function_1.identity);
    exports2.URI = "Task";
    function getRaceMonoid() {
      return {
        concat: function(x, y) {
          return function() {
            return Promise.race([Promise.resolve().then(x), Promise.resolve().then(y)]);
          };
        },
        empty: exports2.never
      };
    }
    exports2.getRaceMonoid = getRaceMonoid;
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports2.Functor));
    exports2.asUnit = (0, Functor_1.asUnit)(exports2.Functor);
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    exports2.Pointed = {
      URI: exports2.URI,
      of: exports2.of
    };
    exports2.ApplyPar = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar
    };
    exports2.apFirst = (0, Apply_1.apFirst)(exports2.ApplyPar);
    exports2.apSecond = (0, Apply_1.apSecond)(exports2.ApplyPar);
    exports2.ApplicativePar = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      of: exports2.of
    };
    exports2.ApplySeq = {
      URI: exports2.URI,
      map: _map,
      ap: _apSeq
    };
    exports2.ApplicativeSeq = {
      URI: exports2.URI,
      map: _map,
      ap: _apSeq,
      of: exports2.of
    };
    exports2.Chain = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap
    };
    exports2.Monad = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _apPar,
      chain: exports2.flatMap
    };
    exports2.MonadIO = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _apPar,
      chain: exports2.flatMap,
      fromIO: exports2.fromIO
    };
    exports2.fromTask = function_1.identity;
    exports2.MonadTask = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _apPar,
      chain: exports2.flatMap,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    exports2.FromIO = {
      URI: exports2.URI,
      fromIO: exports2.fromIO
    };
    var _FlatMap = {
      flatMap: exports2.flatMap
    };
    var _FromIO = {
      fromIO: exports2.FromIO.fromIO
    };
    exports2.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
    exports2.tap = (0, function_1.dual)(2, chainable.tap(exports2.Chain));
    exports2.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports2.FromIO, exports2.Chain));
    exports2.fromIOK = /* @__PURE__ */ (0, FromIO_1.fromIOK)(exports2.FromIO);
    exports2.chainIOK = exports2.flatMapIO;
    exports2.chainFirstIOK = exports2.tapIO;
    exports2.FromTask = {
      URI: exports2.URI,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    var never = function() {
      return new Promise(function(_2) {
        return void 0;
      });
    };
    exports2.never = never;
    exports2.Do = (0, exports2.of)(_.emptyRecord);
    exports2.bindTo = (0, Functor_1.bindTo)(exports2.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports2.Functor);
    exports2.let = let_;
    exports2.bind = chainable.bind(exports2.Chain);
    exports2.apS = (0, Apply_1.apS)(exports2.ApplyPar);
    exports2.ApT = (0, exports2.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        return function() {
          return Promise.all(as.map(function(a, i) {
            return Promise.resolve().then(function() {
              return f(i, a)();
            });
          }));
        };
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
    var traverseReadonlyNonEmptyArrayWithIndexSeq = function(f) {
      return function(as) {
        return function() {
          return _.tail(as).reduce(function(acc, a, i) {
            return acc.then(function(bs) {
              return Promise.resolve().then(f(i + 1, a)).then(function(b) {
                bs.push(b);
                return bs;
              });
            });
          }, Promise.resolve().then(f(0, _.head(as))).then(_.singleton));
        };
      };
    };
    exports2.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
    var traverseReadonlyArrayWithIndexSeq = function(f) {
      var g = (0, exports2.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports2.ApT;
      };
    };
    exports2.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
    exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseArray = traverseArray;
    exports2.sequenceArray = /* @__PURE__ */ (0, exports2.traverseArray)(function_1.identity);
    exports2.traverseSeqArrayWithIndex = exports2.traverseReadonlyArrayWithIndexSeq;
    var traverseSeqArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndexSeq)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseSeqArray = traverseSeqArray;
    exports2.sequenceSeqArray = /* @__PURE__ */ (0, exports2.traverseSeqArray)(function_1.identity);
    exports2.chain = exports2.flatMap;
    exports2.chainFirst = exports2.tap;
    exports2.task = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _apPar,
      chain: exports2.flatMap,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    exports2.taskSeq = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _apSeq,
      chain: exports2.flatMap,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    exports2.getSemigroup = (0, Apply_1.getApplySemigroup)(exports2.ApplySeq);
    exports2.getMonoid = (0, Applicative_1.getApplicativeMonoid)(exports2.ApplicativeSeq);
  }
});

// node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/TaskEither.js
var require_TaskEither = __commonJS({
  "node_modules/.pnpm/fp-ts@2.16.5/node_modules/fp-ts/lib/TaskEither.js"(exports2) {
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
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports2 && exports2.__generator || function(thisArg, body) {
      var _2 = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t[1]) {
                _2.label = t[1];
                t = op;
                break;
              }
              if (t && _2.label < t[2]) {
                _2.label = t[2];
                _2.ops.push(op);
                break;
              }
              if (t[2]) _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throwError = exports2.of = exports2.altW = exports2.alt = exports2.flatten = exports2.flattenW = exports2.flatMap = exports2.apW = exports2.ap = exports2.mapLeft = exports2.mapError = exports2.bimap = exports2.mapBoth = exports2.map = exports2.fromIOEitherK = exports2.chainTaskOptionK = exports2.chainTaskOptionKW = exports2.fromTaskOptionK = exports2.swap = exports2.orLeft = exports2.orElseFirstTaskK = exports2.orElseFirstIOK = exports2.tapError = exports2.orElseW = exports2.orElse = exports2.chainNullableK = exports2.fromNullableK = exports2.fromNullable = exports2.toUnion = exports2.tryCatchK = exports2.tryCatch = exports2.getOrElseW = exports2.getOrElse = exports2.foldW = exports2.matchEW = exports2.fold = exports2.matchE = exports2.matchW = exports2.match = exports2.fromTaskOption = exports2.fromIOEither = exports2.fromEither = exports2.fromTask = exports2.fromIO = exports2.leftIO = exports2.rightIO = exports2.leftTask = exports2.rightTask = exports2.right = exports2.left = void 0;
    exports2.fromPredicate = exports2.chainFirstEitherKW = exports2.chainFirstEitherK = exports2.chainEitherKW = exports2.chainEitherK = exports2.flatMapTaskOption = exports2.flatMapIOEither = exports2.flatMapTask = exports2.flatMapIO = exports2.flatMapEither = exports2.flatMapOption = exports2.flatMapNullable = exports2.liftOption = exports2.liftNullable = exports2.chainOptionKW = exports2.chainOptionK = exports2.fromOptionK = exports2.fromOption = exports2.Alt = exports2.Bifunctor = exports2.tapTask = exports2.tapIO = exports2.tapEither = exports2.tap = exports2.FromTask = exports2.FromIO = exports2.FromEither = exports2.MonadThrow = exports2.MonadTask = exports2.MonadIO = exports2.Monad = exports2.Chain = exports2.ApplicativeSeq = exports2.ApplySeq = exports2.ApplicativePar = exports2.apSecondW = exports2.apSecond = exports2.apFirstW = exports2.apFirst = exports2.ApplyPar = exports2.Pointed = exports2.flap = exports2.asUnit = exports2.as = exports2.Functor = exports2.getFilterable = exports2.getCompactable = exports2.getAltTaskValidation = exports2.getApplicativeTaskValidation = exports2.URI = void 0;
    exports2.getTaskValidation = exports2.getSemigroup = exports2.getApplyMonoid = exports2.getApplySemigroup = exports2.taskEitherSeq = exports2.taskEither = exports2.orElseFirstW = exports2.orElseFirst = exports2.chainFirstW = exports2.chainFirst = exports2.chainW = exports2.chain = exports2.sequenceSeqArray = exports2.traverseSeqArray = exports2.traverseSeqArrayWithIndex = exports2.sequenceArray = exports2.traverseArray = exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndexSeq = exports2.traverseReadonlyNonEmptyArrayWithIndexSeq = exports2.traverseReadonlyArrayWithIndex = exports2.traverseReadonlyNonEmptyArrayWithIndex = exports2.ApT = exports2.apSW = exports2.apS = exports2.bindW = exports2.bind = exports2.let = exports2.bindTo = exports2.Do = exports2.bracketW = exports2.bracket = exports2.taskify = exports2.chainIOEitherK = exports2.chainIOEitherKW = exports2.chainFirstTaskK = exports2.chainTaskK = exports2.fromTaskK = exports2.chainFirstIOK = exports2.chainIOK = exports2.fromIOK = exports2.fromEitherK = exports2.filterOrElseW = exports2.filterOrElse = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var chainable = __importStar(require_Chain());
    var Compactable_1 = require_Compactable();
    var E3 = __importStar(require_Either());
    var ET = __importStar(require_EitherT());
    var Filterable_1 = require_Filterable();
    var FromEither_1 = require_FromEither();
    var FromIO_1 = require_FromIO();
    var FromTask_1 = require_FromTask();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var T = __importStar(require_Task());
    exports2.left = ET.left(T.Pointed);
    exports2.right = ET.right(T.Pointed);
    exports2.rightTask = ET.rightF(T.Functor);
    exports2.leftTask = ET.leftF(T.Functor);
    exports2.rightIO = (0, function_1.flow)(T.fromIO, exports2.rightTask);
    exports2.leftIO = (0, function_1.flow)(T.fromIO, exports2.leftTask);
    exports2.fromIO = exports2.rightIO;
    exports2.fromTask = exports2.rightTask;
    exports2.fromEither = T.of;
    exports2.fromIOEither = T.fromIO;
    var fromTaskOption = function(onNone) {
      return T.map(E3.fromOption(onNone));
    };
    exports2.fromTaskOption = fromTaskOption;
    exports2.match = /* @__PURE__ */ ET.match(T.Functor);
    exports2.matchW = exports2.match;
    exports2.matchE = ET.matchE(T.Monad);
    exports2.fold = exports2.matchE;
    exports2.matchEW = exports2.matchE;
    exports2.foldW = exports2.matchEW;
    exports2.getOrElse = /* @__PURE__ */ ET.getOrElse(T.Monad);
    exports2.getOrElseW = exports2.getOrElse;
    var tryCatch = function(f, onRejected) {
      return function() {
        return __awaiter(void 0, void 0, void 0, function() {
          var reason_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, f().then(_.right)];
              case 1:
                return [2, _a.sent()];
              case 2:
                reason_1 = _a.sent();
                return [2, _.left(onRejected(reason_1))];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
    };
    exports2.tryCatch = tryCatch;
    var tryCatchK = function(f, onRejected) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports2.tryCatch)(function() {
          return f.apply(void 0, a);
        }, onRejected);
      };
    };
    exports2.tryCatchK = tryCatchK;
    exports2.toUnion = ET.toUnion(T.Functor);
    exports2.fromNullable = ET.fromNullable(T.Pointed);
    exports2.fromNullableK = ET.fromNullableK(T.Pointed);
    exports2.chainNullableK = /* @__PURE__ */ ET.chainNullableK(T.Monad);
    exports2.orElse = /* @__PURE__ */ ET.orElse(T.Monad);
    exports2.orElseW = exports2.orElse;
    exports2.tapError = (0, function_1.dual)(2, ET.tapError(T.Monad));
    var orElseFirstIOK = function(onLeft) {
      return (0, exports2.tapError)((0, exports2.fromIOK)(onLeft));
    };
    exports2.orElseFirstIOK = orElseFirstIOK;
    var orElseFirstTaskK = function(onLeft) {
      return (0, exports2.tapError)((0, exports2.fromTaskK)(onLeft));
    };
    exports2.orElseFirstTaskK = orElseFirstTaskK;
    exports2.orLeft = /* @__PURE__ */ ET.orLeft(T.Monad);
    exports2.swap = ET.swap(T.Functor);
    var fromTaskOptionK = function(onNone) {
      var from = (0, exports2.fromTaskOption)(onNone);
      return function(f) {
        return (0, function_1.flow)(f, from);
      };
    };
    exports2.fromTaskOptionK = fromTaskOptionK;
    var chainTaskOptionKW = function(onNone) {
      return function(f) {
        return function(ma) {
          return (0, exports2.flatMap)(ma, (0, exports2.fromTaskOptionK)(onNone)(f));
        };
      };
    };
    exports2.chainTaskOptionKW = chainTaskOptionKW;
    exports2.chainTaskOptionK = exports2.chainTaskOptionKW;
    var fromIOEitherK = function(f) {
      return (0, function_1.flow)(f, exports2.fromIOEither);
    };
    exports2.fromIOEitherK = fromIOEitherK;
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _apPar = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports2.ap)(fa));
    };
    var _apSeq = function(fab, fa) {
      return (0, exports2.flatMap)(fab, function(f) {
        return (0, function_1.pipe)(fa, (0, exports2.map)(f));
      });
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports2.alt)(that));
    };
    exports2.map = ET.map(T.Functor);
    exports2.mapBoth = (0, function_1.dual)(3, ET.mapBoth(T.Functor));
    exports2.bimap = exports2.mapBoth;
    exports2.mapError = (0, function_1.dual)(2, ET.mapError(T.Functor));
    exports2.mapLeft = exports2.mapError;
    exports2.ap = /* @__PURE__ */ ET.ap(T.ApplyPar);
    exports2.apW = exports2.ap;
    exports2.flatMap = (0, function_1.dual)(2, ET.flatMap(T.Monad));
    exports2.flattenW = /* @__PURE__ */ (0, exports2.flatMap)(function_1.identity);
    exports2.flatten = exports2.flattenW;
    exports2.alt = /* @__PURE__ */ ET.alt(T.Monad);
    exports2.altW = exports2.alt;
    exports2.of = exports2.right;
    exports2.throwError = exports2.left;
    exports2.URI = "TaskEither";
    function getApplicativeTaskValidation(A, S) {
      var ap2 = (0, Apply_1.ap)(A, E3.getApplicativeValidation(S));
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        ap: function(fab, fa) {
          return (0, function_1.pipe)(fab, ap2(fa));
        },
        of: exports2.of
      };
    }
    exports2.getApplicativeTaskValidation = getApplicativeTaskValidation;
    function getAltTaskValidation(S) {
      var alt = ET.altValidation(T.Monad, S);
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        alt: function(fa, that) {
          return (0, function_1.pipe)(fa, alt(that));
        }
      };
    }
    exports2.getAltTaskValidation = getAltTaskValidation;
    var getCompactable = function(M) {
      var C = E3.getCompactable(M);
      return {
        URI: exports2.URI,
        _E: void 0,
        compact: (0, Compactable_1.compact)(T.Functor, C),
        separate: (0, Compactable_1.separate)(T.Functor, C, E3.Functor)
      };
    };
    exports2.getCompactable = getCompactable;
    function getFilterable(M) {
      var F = E3.getFilterable(M);
      var C = (0, exports2.getCompactable)(M);
      var filter = (0, Filterable_1.filter)(T.Functor, F);
      var filterMap = (0, Filterable_1.filterMap)(T.Functor, F);
      var partition = (0, Filterable_1.partition)(T.Functor, F);
      var partitionMap = (0, Filterable_1.partitionMap)(T.Functor, F);
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        compact: C.compact,
        separate: C.separate,
        filter: function(fa, predicate) {
          return (0, function_1.pipe)(fa, filter(predicate));
        },
        filterMap: function(fa, f) {
          return (0, function_1.pipe)(fa, filterMap(f));
        },
        partition: function(fa, predicate) {
          return (0, function_1.pipe)(fa, partition(predicate));
        },
        partitionMap: function(fa, f) {
          return (0, function_1.pipe)(fa, partitionMap(f));
        }
      };
    }
    exports2.getFilterable = getFilterable;
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports2.Functor));
    exports2.asUnit = (0, Functor_1.asUnit)(exports2.Functor);
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    exports2.Pointed = {
      URI: exports2.URI,
      of: exports2.of
    };
    exports2.ApplyPar = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar
    };
    exports2.apFirst = (0, Apply_1.apFirst)(exports2.ApplyPar);
    exports2.apFirstW = exports2.apFirst;
    exports2.apSecond = (0, Apply_1.apSecond)(exports2.ApplyPar);
    exports2.apSecondW = exports2.apSecond;
    exports2.ApplicativePar = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      of: exports2.of
    };
    exports2.ApplySeq = {
      URI: exports2.URI,
      map: _map,
      ap: _apSeq
    };
    exports2.ApplicativeSeq = {
      URI: exports2.URI,
      map: _map,
      ap: _apSeq,
      of: exports2.of
    };
    exports2.Chain = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap
    };
    exports2.Monad = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap,
      of: exports2.of
    };
    exports2.MonadIO = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap,
      of: exports2.of,
      fromIO: exports2.fromIO
    };
    exports2.MonadTask = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap,
      of: exports2.of,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    exports2.MonadThrow = {
      URI: exports2.URI,
      map: _map,
      ap: _apPar,
      chain: exports2.flatMap,
      of: exports2.of,
      throwError: exports2.throwError
    };
    exports2.FromEither = {
      URI: exports2.URI,
      fromEither: exports2.fromEither
    };
    exports2.FromIO = {
      URI: exports2.URI,
      fromIO: exports2.fromIO
    };
    exports2.FromTask = {
      URI: exports2.URI,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask
    };
    exports2.tap = (0, function_1.dual)(2, chainable.tap(exports2.Chain));
    exports2.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports2.FromEither, exports2.Chain));
    exports2.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports2.FromIO, exports2.Chain));
    exports2.tapTask = (0, function_1.dual)(2, (0, FromTask_1.tapTask)(exports2.FromTask, exports2.Chain));
    exports2.Bifunctor = {
      URI: exports2.URI,
      bimap: exports2.mapBoth,
      mapLeft: exports2.mapError
    };
    exports2.Alt = {
      URI: exports2.URI,
      map: _map,
      alt: _alt
    };
    exports2.fromOption = /* @__PURE__ */ (0, FromEither_1.fromOption)(exports2.FromEither);
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
    var _FromIO = {
      fromIO: exports2.FromIO.fromIO
    };
    var _FromTask = {
      fromTask: exports2.fromTask
    };
    exports2.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
    exports2.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
    exports2.flatMapEither = _.flatMapEither(_FromEither, _FlatMap);
    exports2.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
    exports2.flatMapTask = _.flatMapTask(_FromTask, _FlatMap);
    exports2.flatMapIOEither = (0, function_1.dual)(2, function(self, f) {
      return (0, exports2.flatMap)(self, (0, exports2.fromIOEitherK)(f));
    });
    exports2.flatMapTaskOption = (0, function_1.dual)(3, function(self, f, onNone) {
      return (0, exports2.flatMap)(self, function(a) {
        return (0, exports2.fromTaskOption)(function() {
          return onNone(a);
        })(f(a));
      });
    });
    exports2.chainEitherK = exports2.flatMapEither;
    exports2.chainEitherKW = exports2.flatMapEither;
    exports2.chainFirstEitherK = exports2.tapEither;
    exports2.chainFirstEitherKW = exports2.tapEither;
    exports2.fromPredicate = (0, FromEither_1.fromPredicate)(exports2.FromEither);
    exports2.filterOrElse = (0, FromEither_1.filterOrElse)(exports2.FromEither, exports2.Chain);
    exports2.filterOrElseW = exports2.filterOrElse;
    exports2.fromEitherK = (0, FromEither_1.fromEitherK)(exports2.FromEither);
    exports2.fromIOK = (0, FromIO_1.fromIOK)(exports2.FromIO);
    exports2.chainIOK = exports2.flatMapIO;
    exports2.chainFirstIOK = exports2.tapIO;
    exports2.fromTaskK = (0, FromTask_1.fromTaskK)(exports2.FromTask);
    exports2.chainTaskK = exports2.flatMapTask;
    exports2.chainFirstTaskK = exports2.tapTask;
    exports2.chainIOEitherKW = exports2.flatMapIOEither;
    exports2.chainIOEitherK = exports2.flatMapIOEither;
    function taskify(f) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return function() {
          return new Promise(function(resolve) {
            var cbResolver = function(e, r) {
              return e != null ? resolve(_.left(e)) : resolve(_.right(r));
            };
            f.apply(null, args.concat(cbResolver));
          });
        };
      };
    }
    exports2.taskify = taskify;
    var bracket = function(acquire, use, release) {
      return (0, exports2.bracketW)(acquire, use, release);
    };
    exports2.bracket = bracket;
    var bracketW = function(acquire, use, release) {
      return (0, exports2.flatMap)(acquire, function(a) {
        return T.flatMap(use(a), function(e) {
          return (0, exports2.flatMap)(release(a, e), function() {
            return T.of(e);
          });
        });
      });
    };
    exports2.bracketW = bracketW;
    exports2.Do = (0, exports2.of)(_.emptyRecord);
    exports2.bindTo = (0, Functor_1.bindTo)(exports2.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports2.Functor);
    exports2.let = let_;
    exports2.bind = chainable.bind(exports2.Chain);
    exports2.bindW = exports2.bind;
    exports2.apS = (0, Apply_1.apS)(exports2.ApplyPar);
    exports2.apSW = exports2.apS;
    exports2.ApT = (0, exports2.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return (0, function_1.flow)(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E3.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
    };
    exports2.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
    var traverseReadonlyArrayWithIndex = function(f) {
      var g = (0, exports2.traverseReadonlyNonEmptyArrayWithIndex)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports2.ApT;
      };
    };
    exports2.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
    var traverseReadonlyNonEmptyArrayWithIndexSeq = function(f) {
      return function(as) {
        return function() {
          return _.tail(as).reduce(function(acc, a, i) {
            return acc.then(function(ebs) {
              return _.isLeft(ebs) ? acc : f(i + 1, a)().then(function(eb) {
                if (_.isLeft(eb)) {
                  return eb;
                }
                ebs.right.push(eb.right);
                return ebs;
              });
            });
          }, f(0, _.head(as))().then(E3.map(_.singleton)));
        };
      };
    };
    exports2.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
    var traverseReadonlyArrayWithIndexSeq = function(f) {
      var g = (0, exports2.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports2.ApT;
      };
    };
    exports2.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
    exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseArray = traverseArray;
    exports2.sequenceArray = /* @__PURE__ */ (0, exports2.traverseArray)(function_1.identity);
    exports2.traverseSeqArrayWithIndex = exports2.traverseReadonlyArrayWithIndexSeq;
    var traverseSeqArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndexSeq)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseSeqArray = traverseSeqArray;
    exports2.sequenceSeqArray = /* @__PURE__ */ (0, exports2.traverseSeqArray)(function_1.identity);
    exports2.chain = exports2.flatMap;
    exports2.chainW = exports2.flatMap;
    exports2.chainFirst = exports2.tap;
    exports2.chainFirstW = exports2.tap;
    exports2.orElseFirst = exports2.tapError;
    exports2.orElseFirstW = exports2.tapError;
    exports2.taskEither = {
      URI: exports2.URI,
      bimap: exports2.mapBoth,
      mapLeft: exports2.mapError,
      map: _map,
      of: exports2.of,
      ap: _apPar,
      chain: exports2.flatMap,
      alt: _alt,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask,
      throwError: exports2.throwError
    };
    exports2.taskEitherSeq = {
      URI: exports2.URI,
      bimap: exports2.mapBoth,
      mapLeft: exports2.mapError,
      map: _map,
      of: exports2.of,
      ap: _apSeq,
      chain: exports2.flatMap,
      alt: _alt,
      fromIO: exports2.fromIO,
      fromTask: exports2.fromTask,
      throwError: exports2.throwError
    };
    exports2.getApplySemigroup = /* @__PURE__ */ (0, Apply_1.getApplySemigroup)(exports2.ApplySeq);
    exports2.getApplyMonoid = /* @__PURE__ */ (0, Applicative_1.getApplicativeMonoid)(exports2.ApplicativeSeq);
    var getSemigroup = function(S) {
      return (0, Apply_1.getApplySemigroup)(T.ApplySeq)(E3.getSemigroup(S));
    };
    exports2.getSemigroup = getSemigroup;
    function getTaskValidation(SE) {
      var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
      var altTaskValidation = getAltTaskValidation(SE);
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        ap: applicativeTaskValidation.ap,
        of: exports2.of,
        chain: exports2.flatMap,
        bimap: exports2.mapBoth,
        mapLeft: exports2.mapError,
        alt: altTaskValidation.alt,
        fromIO: exports2.fromIO,
        fromTask: exports2.fromTask,
        throwError: exports2.throwError
      };
    }
    exports2.getTaskValidation = getTaskValidation;
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
var TE = __toESM(require_TaskEither());

// src/example-app/lib/either.ts
var E = __toESM(require_Either());
var import_function = __toESM(require_function());
var liftA3 = (f, fa, fb, fc) => (0, import_function.pipe)(E.of(f), E.ap(fa), E.ap(fb), E.ap(fc));

// src/example-app/functions/person/create/domain/error/index.ts
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
var import_function2 = __toESM(require_function());
var handler = async (event) => {
  const workflow = (0, import_function2.pipe)(
    TE.fromEither(
      (0, import_function2.pipe)(
        deserializeDTO(event.body),
        E2.chain(
          ({ name, age }) => liftA3(createPerson, parseName(name), parseAge(age), E2.right(Active()))
        )
      )
    ),
    TE.chain(savePerson)
  );
  const result = await workflow();
  return E2.match(
    (error) => status400(String(error)),
    () => status200("Person created")
  )(result);
};
var deserializeDTO = (body) => {
  const { name, age } = JSON.parse(body ?? "{}");
  if (typeof name !== "string" || typeof age !== "string") {
    return E2.left(DeserializationError("Invalid data"));
  }
  return E2.right({ name, age });
};
var savePerson = (person) => {
  console.log("Saving person...");
  return TE.of(person);
};
var status200 = (message) => ({
  statusCode: 200,
  body: JSON.stringify({ message })
});
var status400 = (message) => ({
  statusCode: 400,
  body: JSON.stringify({ message })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
