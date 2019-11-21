const express = require('express');
const config = require('./config');
const ejs= require('ejs');
const path=require('path');
const bodyParser=require('body-parser');
const router=express.Router();
const detailsRoutes=require('./routes/details');
// Set up the express app
const app = express();


// Configure the views and public directory
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({extended:true}));

// routes
app.use(detailsRoutes);

// Setting up the server
let port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log('Updated : Server listening at port ' + port);
});