const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
  id: { type: String, required: true },
  item: { type: String, required: true },
  color: { type: String, required: true },
  defaultPos: { type: { x: Number, y: Number }, required: true },
});

module.exports = Note;
