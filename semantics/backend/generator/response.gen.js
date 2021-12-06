/* eslint-disable new-cap */
'use strict';
const __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {enumerable: true, get: function() {
    return m[k];
  }});
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, 'default', {enumerable: true, value: v});
}) : function(o, v) {
  o['default'] = v;
});
const __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod;
  const result = {};
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
const __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
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
        step(generator['throw'](value));
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
const __generator = (this && this.__generator) || function(thisArg, body) {
  let _ = {label: 0, sent: function() {
    if (t[0] & 1) throw t[1]; return t[1];
  }, trys: [], ops: []}; let f; let y; let t; let g;
  return g = {'next': verb(0), 'throw': verb(1), 'return': verb(2)}, typeof Symbol === 'function' && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0: case 1: t = op; break;
          case 4: _.label++; return {value: op[1], done: false};
          case 5: _.label++; y = op[1]; op = [0]; continue;
          case 7: op = _.ops.pop(); _.trys.pop(); continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0; continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]; break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]; t = op; break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2]; _.ops.push(op); break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e]; y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1]; return {value: op[0] ? op[1] : void 0, done: true};
  }
};
Object.defineProperty(exports, '__esModule', {value: true});
/* eslint-disable max-len */
/* eslint-disable no-multi-str */
const shyArray = ['...', '-'];
const ExtroArray = ['?!', '!!!', '!', '!?!?'];
const cuteArray = ['💖', '💗', '~', '<3', '*wink*'];
const fs = __importStar(require('fs'));
const scarletBot = require('../src/AFINN');
/**
 *
 *
 * @param {string} json
 * @return {*}
 */
function json2array(json) {
  const result = [];
  const keys = Object.keys(json);
  keys.forEach(function(key) {
    result.push(json[key]);
  });
  return result;
}
/**
 *
 *
 * @export
 * @class Responses
 */
const Responses = /** @class */ (function() {
  /**
     * Creates an instance of Responses.
     * @param {*} [scarlet]
     * @param {string} [persona]
     * @memberof Responses
     */
  function Responses(scarlet, persona) {
    if (!scarlet || !persona) {
      throw new Error('No Scarlet Classifier, or Persona has been specified');
    }
    if (typeof persona !== 'string') {
      throw new TypeError('Persona must be a String');
    }
  }
  /**
       *
       *
       * @static
       * @param {String} string
       * @return {String}
       * @memberof Responses
       */
  Responses.getInput = function(string) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!string || typeof string !== 'string') {
          throw new TypeError('Invalid String Literal.');
        }
        return [2 /* return*/, string];
      });
    });
  };
  /**
       * TODO: build off generated words and input - Creates appropriate response
       * Follow: https://academicguides.waldenu.edu/writingcenter/grammar/sentencestructure
       * @static
       * @param {Number} uid
       * @param {*} response
       * @param {String} personality
       * @return {*}
       * @memberof Responses
       */
  Responses.adjustResponse = function(uid, response, personality) {
    return __awaiter(this, void 0, void 0, function() {
      let e_1; let newResponse; let idata; let iafinn; let edata; let eafinn; let ndata; let nafinn; let cdata; let cafinn;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            return [4 /* yield*/, this.getInput(response)];
          case 1:
            response = _a.sent();
            this.generateResponse(uid);
            return [3 /* break*/, 4];
          case 2:
            e_1 = _a.sent();
            console.error(e_1);
            return [3 /* break*/, 4];
          case 3:
            newResponse = void 0;
            switch (personality) {
              case 'introvert' || 'shy':
                newResponse = shyArray[~Math.floor(Math.random() * shyArray.length)];
                response.replace('.', newResponse);
                idata = fs.readFileSync('./database/Word-Dict.json', {
                  encoding: 'utf8',
                  flag: 'r',
                });
                iafinn = json2array(idata);
                response = iafinn[~Math.random() * iafinn.length];
                return [2 /* return*/, response];
              case 'extrovert':
                newResponse =
                                    ExtroArray[~Math.floor(Math.random() * ExtroArray.length)];
                response.replace('.', newResponse);
                edata = fs.readFileSync('./database/Word-Dict.json', {
                  encoding: 'utf8',
                  flag: 'r',
                });
                eafinn = json2array(edata);
                response = eafinn[~Math.random() * eafinn.length];
                return [2 /* return*/, response];
              case 'neutral':
                ndata = fs.readFileSync('./database/Word-Dict.json', {
                  encoding: 'utf8',
                  flag: 'r',
                });
                nafinn = json2array(ndata);
                response = nafinn[~Math.random() * nafinn.length];
                return [2 /* return*/, response];
              case 'cute':
                newResponse =
                                    cuteArray[~Math.floor(Math.random() * cuteArray.length)];
                response.replace('.', newResponse);
                cdata = fs.readFileSync('./database/Word-Dict.json', {
                  encoding: 'utf8',
                  flag: 'r',
                });
                cafinn = json2array(cdata);
                response = cafinn[~Math.random() * cafinn.length];
                return [2 /* return*/, response];
              case null:
                response.replace('.', '.');
                return [2 /* return*/, response];
            }
            return [7];
          case 4: return [2];
        }
      });
    });
  };
  /**
       * COMPLETED: Added a generator to come up with suitable responses
       *
       * @static
       * @param {Number} uid
       * @param {string} [input]
       * @param {string} [personality]
       * @return {*}
       * @memberof Responses
       */
  Responses.generateResponse = function(uid, input, personality) {
    return __awaiter(this, void 0, void 0, function() {
      let analysis;
      return __generator(this, function(_a) {
        if (!personality) {
          personality = 'neutral';
        }
        analysis = require('../../models/sentimood');
        analysis = new analysis(input || 'test');
        if (analysis.topic >= 0) { } else {
          // redirect to help services
        }
        // eslint-disable-next-line padded-blocks
        // const scarletBot = require('../src/AFINN');
        scarletBot.start();
        return [2 /* return*/, say(input)];
      });
    });
  };
  return Responses;
}());
exports.default = Responses;
;
/**
           *
           *
           * @param {string} input
           * @return {*}
           */
function say(input) {
  const reply = scarletBot.reply(input);
  if (reply == scarletBot.bye()) {
    return scarletBot.bye();
  }
}
