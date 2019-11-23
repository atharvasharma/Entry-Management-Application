const express=require('express');
const nodemailer=require('nodemailer');

let mail=function sendMail(hostName,hostEmail,visitorName,visitorPhone,visitorEmail,checkOutTime,checkInTime,isCheckingIn){
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    let mailOptions;
    if(isCheckingIn){
        let msg=`
            Hey ${hostName}, you have a new visitor. 
            His/her details are as follows: \n 
            1.Name:${visitorName} \n 
            2. Phone:${visitorPhone} \n 
            3. Email:${visitorEmail}
        `
        mailOptions={
            from :process.env.EMAIL_FROM,
            to:hostEmail,
            subject:'You have a visitor',
            text:msg
        };
    }else{
        let address=process.env.ADDRESS;
        let msg=`
            Hey ${visitorName},
            We are writing this to inform you that you have been successfully checked out. \n
            We hope that you had a plesant visit. \n 
            Here are the details of your visit.
            1. Your Name: ${visitorName} \n 
            2. Your Phone: ${visitorPhone} \n 
            3. Check-in Time: ${checkInTime} \n
            4. Check-out Time: ${checkOutTime} \n
            5. Host name : ${hostName} \n
            6. Address visited : ${address} \n
        `
        mailOptions={
            from :process.env.EMAIL_FROM,
            to:visitorEmail,
            subject:'Thanks for visiting us!',
            text:msg
        };
    }
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