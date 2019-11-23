const express=require('express');
const router=express.Router();

const sendSms=require('../apis/sms');
const sendEmail=require('../apis/email');

const Visitor=require('../models/Visitor');
const Host=require('../models/Host');

const getTimeStamp=require('../utils/get-timestamp');
const getTime=require('../utils/get-time');
const getDate=require('../utils/get-date');

router.get("/checkin",function(req,res){
    res.render("checkIn-form");
})

router.post("/checkin",function(req,res){

    // get timestamp when user submits the form
    const timeStamp=getTimeStamp();

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

    //enter visitor and host details in db
    Visitor.findOne({email:visitorEmail},function(err,foundVisitor){
        if(foundVisitor && foundVisitor.status=='Pending'){   // might happen that visitor has already checked in.
            console.log("You have already checked in");
        }else{                                                // else add visitor in db  
            Visitor.create({
                name:visitorName,
                email:visitorEmail,
                phone:visitorPhone,
                checkInTime:checkInTime,
                checkInDate:checkInDate,
                timeStamp:timeStamp,
                status:'Pending'
            })
            .then(function(newVisitor){    
                Host.findOne({email:hostEmail},function(err,foundHost){     // find host in db as entered by visitor
                    if(err){
                        console.log("An error occured, Description: "+err);
                    }else{
                        if(foundHost){                              // if host already exists in db then add visitor of that host.
                            foundHost.visitors.push(newVisitor);
                            foundHost.save(function(err,data){
                                if(err){
                                    console.log("An error occured, description: "+ err);
                                }else{
                                    console.log("Visitor and Host added successfully");
                                }
                            })
                        }else{                                     // else create new host, add new visitor of that host.
                            Host.create({
                                name:hostName,
                                email:hostEmail,
                                phone:hostPhone,
                            }).then(function(newHost){
                                newHost.visitors.push(newVisitor);
                                newHost.save(function(err,data){
                                    if(err){
                                        console.log("An error occured, description: "+ err);
                                    }else{
                                        console.log("Visitor and Host added successfully");
                                    }
                                })
                            })
                        }
                    }
                });
            })
            .catch(function(err){
                console.log("Oops! An error occured. Description: "+err);
            });
        }    
    })
    

    // using apis to send sms and email to the host
   // sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail);
    //sendEmail(hostPhone,hostName,hostEmail,visitorName,visitorPhone,visitorEmail);
})

module.exports=router;