var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  //thread-reihe, nummer, autor, titel serie, jahr.jpg
  group: String,
  number: String,
  author: String,
  title: String,
  series: String,
  year: String,
  filename: String,
  count: String
});

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;
