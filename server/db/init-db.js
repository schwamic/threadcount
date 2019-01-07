var mongoose = require('mongoose');
var fs = require('fs');
require('../models/images');

// Init
var Image = mongoose.model('Image');

function initDB(){
  var obj = JSON.parse(fs.readFileSync('./data/images.json', 'utf8'));
  Object.keys(obj.images).forEach(function(group){
    obj.images[group].forEach(function(filename){
      var attr = filename.split('_');
      var currentImg = new Image();
      currentImg.group = attr[0];
      currentImg.number = attr[1];
      currentImg.author = humanString(attr[2]);
      currentImg.title = humanString(attr[3]);
      currentImg.series = humanString(attr[4]);
      currentImg.year = humanString(attr[5].substring(0, attr[5].length - 4));
      currentImg.filename = attr[0]+attr[1]+'.jpg';
      currentImg.count = "25";
      currentImg.save();
     });
  });
  console.log("finished init db");
}

function humanString(mystring){
  var newstring = mystring.replace(/\---/g,'@@@')
  newstring = newstring.replace(/\-/g,' ')
  newstring = newstring.replace(/\@@@/g,'-')
  return newstring;
}

module.exports = { initDB: initDB };
