const express=require('express');
const nodemailer=require('nodemailer');

let mail=function sendMail(hostPhone,hostName,hostEmail,visitorName,visitorPhone,visitorEmail){
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    let msg=`
        Hey ${hostName}, you have a new visitor. 
        His/her details are as follows: \n 
        1.Name:${visitorName} \n 
        2. Phone:${visitorPhone} \n 
        3. Email:${visitorEmail}
    `
    let mailOptions={
        from :process.env.EMAIL_FROM,
        to:hostEmail,
        subject:'You have a visitor',
        text:msg
    };

    transporter.sendMail(mailOptions,function(err,res){
        if(err){
            console.log('ERRORDERP: Cannot Send Email! Please check if you have turned on less secure apps, Description here: ', err);
            res.status(500).send('Internal error cannot send email please see log for more description.')
        }else{
            console.log("email sent!!");
        }
    });    
}
module.exports=mail;