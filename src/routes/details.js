const express=require('express');
const router=express.Router();
const moment = require('moment-timezone');
const sendSms=require('../apis/sms');
const sendEmail=require('../apis/email');

router.get("/details",function(req,res){
    res.render("detail-form");
})

router.post("/details",function(req,res){

    // get timestamp when user submits the form
    const timestamp=getTimeStamp();

    // retrieve details filled by the visitor
    let visitorName=req.body['visitor-name'];
    let visitorEmail=req.body['visitor-email'];
    let visitorPhone=req.body['visitor-phone'];
    let hostName=req.body['host-name'];
    let hostEmail=req.body['host-email'];
    let hostPhone=req.body['host-phone'];

    // get current time and date in IST
    const checkInTime=getTime();
    const checkInDate=getDate();

    // using apis to send sms and email to the host
    sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail);
    sendEmail(hostPhone,hostName,hostEmail,visitorName,visitorPhone,visitorEmail);
    
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

module.exports=router;