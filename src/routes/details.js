const express=require('express');
const router=express.Router();
const msg91 = require("msg91")(process.env.AUTHENTICATIONKEY, process.env.SENDERID,process.env.ROUTENUMBER);
const moment = require('moment-timezone');

router.get("/details",function(req,res){
    res.render("detail-form");
})

router.post("/details",function(req,res){

    // get timestamp when user submits the form
    const timestamp=getTimeStamp();

    // retrieve details filled by the visitor
    const visitorName=req.body['visitor-name'];
    const visitorEmail=req.body['visitor-email'];
    const visitorPhone=req.body['visitor-phone'];
    const hostName=req.body['host-name'];
    const hostEmail=req.body['host-email'];
    const hostPhone=req.body['host-phone'];

    // get current time and date in IST
    const checkInTime=getTime();
    const checkInDate=getDate();
    
    // using api to send sms
    //sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail);
})

function getTimeStamp(){
    const date= new Date();
    const timestamp = date.getTime();
    return timestamp;
}

function getTime(){
    const checkInTimeandDate=moment().tz("Asia/Calcutta").format();
    const checkInTime=checkInTimeandDate.substring(11,16);
    return checkInTime;
}

function getDate(){
    const checkInTimeandDate=moment().tz("Asia/Calcutta").format();
    const checkInDate=checkInTimeandDate.substring(0,10);
    return checkInDate; 
}

function sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail){
    const msgNumber='91'+hostPhone;
    const msg=`Hey ${hostName}, you have a new visitor. His details are as follows: 1.Name:${visitorName} \n 2. Phone:${visitorPhone} \n 3. Email:${visitorEmail}`;
    msg91.send(msgNumber, msg, function(err, response){
        if (err) {
         console.log('ERRORDERP: Cannot Send SMS!, Description here: ', err);
           res.status(500).send('Internal error cannot sned sms please see log for more description.')
        }
        else{
          console.log("Your message has been sent successfully!");
          console.log("Content of your message :");
          console.log(msg);
        }
    });
}

module.exports=router;