const express = require('express');
const config = require('./config');

// Set up the express app
const app = express();

// Setting up the server
let port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log('Updated : Server listening at port ' + port);
});