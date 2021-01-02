const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Note = require('./note');

const User = new Schema({
  email: { type: String, required: true },
  notes: {
    type: [Note],
  },
});

module.exports = mongoose.model('Users', User);
