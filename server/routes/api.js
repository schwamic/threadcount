const express = require('express');
const router = express.Router();
const path = require('path');
require('../models/images');
const mongoose = require('mongoose');
const mongoImage = mongoose.model('Image');

router.post('/setCounter', (request, response) => {
  let images = request.body.images;
  let promises = [];
  images.forEach(function(image) {
    let p = new Promise(function(resolve, reject) {
      mongoImage.findOne({ group: image.group, number: image.number }, function (err, res) {
        if (err) throw err;
        res.count = image.count;
        res.save();
        resolve('200');
      });
    });
    promises.push(p);
  });
  Promise.all(promises).then(val => {
    response.json({ 'status': "succeeded" });
  });
});

router.get('/getImages/:images', (request, response) => {
  let images = JSON.parse(request.params.images);
  if ( images[0].group === 'all' ) {
    mongoImage.find({}, function(err, images) {
      response.json({ 'images': images });
    });
  } else {
    let promises = [];
    images.forEach(function(image) {
      let p = new Promise(function(resolve, reject) {
        mongoImage.findOne({ group: image.group, number: image.number }, function (err, image) {
          if (err) throw err;
          resolve(image);
        });
      });
      promises.push(p);
    });
    Promise.all(promises).then(resImages => {
      response.json({ 'images': resImages });
    });
  }
});

module.exports = router;
