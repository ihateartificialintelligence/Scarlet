'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.Persona = void 0;
const mongoose = require('mongoose');
const ScarletPersona = new mongoose.Schema({
  uid: {
    type: Number,
  },
  name: {
    type: String,
    default: 'Scarlet',
  },
  age: {
    type: Number,
    default: 24,
  },
  gender: {
    type: String,
    default: 'Female',
  },
  type: {
    type: String,
    default: 'neutral',
  },
});
exports.Persona = mongoose.model('Personas', ScarletPersona);
