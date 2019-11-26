const express=require('express');
const msg91 = require("msg91")('304908AsqhYvtb5dd5bda7', 'TESTIN',4);

let msg=function sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail){
    const msgNumber='91'+hostPhone;
    const msg=`Hey ${hostName}, you have a new visitor. His/her details are as follows:\n 1. Name:${visitorName} \n 2. Phone:${visitorPhone} \n 3. Email:${visitorEmail}`;
    msg91.send(msgNumber, msg, function(err, response){
        if (err) {
          console.log('ERRORDERP: Cannot Send SMS!, Description here: ', err);
          res.status(500).send('Internal error cannot send sms please see log for more description.')
        }
        else{
          console.log("Your message has been sent successfully!");
        }
    });
}
module.exports=msg;