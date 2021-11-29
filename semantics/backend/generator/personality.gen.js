/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';
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
const scarlet_persona_1 = require('./database/scarlet.persona');
const user = require('../../../users/models/users.model');
const Personality = /** @class */ (function() {
  function Personality(name, age, gender) {
    if (!name || !age || !gender) {
      throw new Error('No Name, Age, or Gender has been specified');
    }
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a String');
    }
    if (typeof age !== 'number') {
      throw new TypeError('Age must be a Number');
    }
    if (typeof gender !== 'string') {
      throw new TypeError('Gender must be a String');
    }
  }
  Personality.delete = function(uid, token) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            // throw new Error('Method not implemented.');
            if (!uid) {
              throw new Error('No UID found!');
            }
            return [4 /* yield*/, user.removeByToken(token)];
          case 1:
            _a.sent();
            return [2];
        }
      });
    });
  };
  Personality.Gender = function(gender) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!gender) {
          throw new Error('`gender` parameter expected. Instead got `null`');
        }
        if (typeof gender !== 'string') {
          throw new TypeError('`gender` parameter not a string');
        }
        if (gender !== ('male' || 'female' || 'non-binary')) {
          throw new TypeError('Gender is not a valid gender.');
        }
        return [2 /* return*/, gender];
      });
    });
  };
  ;
  Personality.Name = function(name) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!name) {
          throw new Error('`name` parameter expected. Instead got `null`');
        }
        if (typeof name !== 'string') {
          throw new TypeError('`name` parameter not a string');
        }
        return [2 /* return*/, name];
      });
    });
  };
  Personality.Age = function(age) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!age) {
          throw new Error('`age` parameter expected. Instead got `null`');
        }
        if (typeof age !== 'number') {
          throw new TypeError('`age` parameter not a number');
        }
        return [2 /* return*/, age];
      });
    });
  };
  /**
     * Creation of Scarlet's Per-User Personality
     *
     * @static
     * @param {number} a - Age
     * @param {string} n - Name
     * @param {string} g - Gender
     * @param {number} ptype - Personality Type: Introvert, Extrovert, Neutral
     * @return {*}  {Promise<any>}
     * @memberof Personality
     */
  Personality.createPersonality = function(uid, a, n, g, ptype) {
    return __awaiter(this, void 0, void 0, function() {
      let name; let personaType; let persona; let newPersona; let _a; let e_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0: return [4 /* yield*/, this.Name(n)];
          case 1:
            name = _b.sent();
            switch (ptype) {
              case ptype = 0: return [2 /* return*/, personaType = 'neutral'.toLocaleLowerCase()];
              case ptype = 1: return [2 /* return*/, personaType = 'Introvert'.toLocaleLowerCase()];
              case ptype = 2: return [2 /* return*/, personaType = 'Extrovert'.toLocaleLowerCase()];
            }
            ;
            return [4 /* yield*/, scarlet_persona_1.Persona.find({
              name: name,
            })];
          case 2:
            persona = _b.sent();
            _b.label = 3;
          case 3:
            _b.trys.push([3, 9, , 10]);
            if (!(persona == false)) return [3 /* break*/, 7];
            return [4 /* yield*/, (0, scarlet_persona_1.Persona)({
              uid: uid,
              name: a,
              age: a,
              gender: g,
              type: personaType,
            })];
          case 4:
            newPersona = _b.sent();
            return [4 /* yield*/, newPersona.save().catch(function(e) {
              throw new Error('Error whilst attempting Persona save\n' + e.message);
            })];
          case 5:
            _b.sent();
            _a = 'Persona (';
            return [4 /* yield*/, newPersona.name];
          case 6: return [2 /* return*/, _a + (_b.sent()) + ') has been created successfully!'];
          case 7: throw new Error('Persona (' + name + ') already exists.');
          case 8: return [3 /* break*/, 10];
          case 9:
            e_1 = _b.sent();
            throw new Error('Error creating persona: ' + e_1.message);
          case 10: return [2];
        }
      });
    });
  };
  return Personality;
}());
exports.default = Personality;
