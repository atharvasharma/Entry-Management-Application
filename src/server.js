const express = require('express');
const config = require('./config');
const ejs= require('ejs');
const path=require('path');
const bodyParser=require('body-parser');
const msg91 = require("msg91")(process.env.AUTHENTICATIONKEY, process.env.SENDERID,process.env.ROUTENUMBER);
const moment = require('moment-timezone');
// Set up the express app
const app = express();
// Configure the views and public directory
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/details",function(req,res){
   res.render("detail-form");
})

app.post("/details",function(req,res){
   // get timestamp when user submits the form
   const date= new Date();
   const timestamp = date.getTime();
   // retrieve details filled by the visitor
   const visitorName=req.body['visitor-name'];
   const visitorEmail=req.body['visitor-email'];
   const visitorPhone=req.body['visitor-phone'];
   const hostName=req.body['host-name'];
   const hostEmail=req.body['host-email'];
   const hostPhone=req.body['host-phone'];
   // get current time and date in IST
   const checkInTimeandDate=moment().tz("Asia/Calcutta").format();
   const checkInTime=checkInTimeandDate.substring(11,16);
   const checkInDate=checkInTimeandDate.substring(0,10);
   // using api to send sms
   const msgNumber='91'+hostPhone;
   const msg=`Hey ${hostName}, you have a new visitor. His details are as follows: 1.Name: ${visitorName} \n 2. Phone :${visitorPhone} \n 3. Email:${visitorEmail}`;
   /*msg91.send(msgNumber, msg, function(err, response){
      if (err) {
        console.log('ERRORDERP: Cannot Send SMS!, Description here: ', err);
		  res.status(500).send('Internal error cannot sned sms please see log for more description.')
      }
      else{
         console.log("Your message has been sent successfully!");
         console.log(response);
      }
         
   });*/

})

// Setting up the server
let port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log('Updated : Server listening at port ' + port);
});