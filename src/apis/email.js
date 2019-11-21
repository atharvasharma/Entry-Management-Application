const express=require('express');
const nodemailer=require('nodemailer');

let mail=function sendMail(hostPhone,hostName,visitorName,visitorPhone,visitorEmail){
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
        from :'atharvasjp1@gmail.com',
        to:'17ucc018@lnmiit.ac.in',
        subject:'You have a visitor',
        text:msg
    };

    transporter.sendMail(mailOptions,function(err,res){
        if(err){
            console.log(err);
        }else{
            console.log("email sent!!");
        }
    });    
}
module.exports=mail;