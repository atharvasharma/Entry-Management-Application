const express = require('express');
const config = require('./config');
const ejs= require('ejs');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const flash=require('connect-flash');

const indexRoutes=require('./routes/index');
const registerRoutes=require('./routes/hosts/register');
const checkInRoutes=require('./routes/visitors/checkIn');
const checkOutRoutes=require('./routes/visitors/checkOut');

// Set up the express app
const app = express();

//Set up flash messages
app.use(flash());

// Set up express session
app.use(require('express-session')({
   secret:"This is Atharva's project",
   resave:false,
   saveUninitialized:false
}));

app.use(function(req,res,next){
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
})

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
app.use(indexRoutes);
app.use(registerRoutes);
app.use(checkInRoutes);
app.use(checkOutRoutes);

// Setting up the server
let port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log('Updated : Server listening at port ' + port);
});