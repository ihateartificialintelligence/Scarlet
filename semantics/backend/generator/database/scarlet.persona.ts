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

export const Persona = mongoose.model('Personas', ScarletPersona);
