const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const initDB = require('./data/init-db').initDB;
const api = require('../routes/api');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static folder
app.use(express.static(path.join(__dirname, 'dist')));

// Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/api', api);

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function (req, res, next) {
  res.type('text/plain');
  res.status(500);
  res.send('500 - Internal Error');
});

// DB and Server
mongoose.connect('mongodb://localhost/threadDB', {
  auth: {
    authdb: "admin"
  }
});

if (process.env.INIT === "true") {
  // Load images.json to db, if successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open');
    initDB();
  });
} else {
  // Create HTTP server.
  const port = process.env.PORT || '61097';
  app.set('port', port);
  const server = http.createServer(app);

  // Start server
  server.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    };
    console.log(`Server listening at port: ${port}`);
  });
}
