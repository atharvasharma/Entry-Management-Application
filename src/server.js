const express = require('express');
const config = require('./config');
const ejs= require('ejs');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const checkInRoutes=require('./routes/checkIn');
const registerRoutes=require('./routes/register');

// Set up the express app
const app = express();

// Configure the views and public directory
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({extended:true}));

// connect to database
mongoose.connect("mongodb://localhost/entry_management",{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
   console.log(`connection to database established`)
   }).catch(err=>{
      console.log(`db error ${err.message}`);
});
mongoose.set('useCreateIndex', true);

// routes
app.use(registerRoutes);
app.use(checkInRoutes);

// Setting up the server
let port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log('Updated : Server listening at port ' + port);
});