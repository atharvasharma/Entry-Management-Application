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
    Host.find({},function(err,hosts){
        res.render("checkIn-form",{hosts:hosts});
    });
})

router.post("/checkin",function(req,res){

    // get timestamp when user submits the form
    const timeStamp=getTimeStamp();

    // retrieve details filled by the visitor
    let visitorName=req.body['visitor-name'];
    let visitorEmail=req.body['visitor-email'];
    let visitorPhone=req.body['visitor-phone'];
    let hostEmail=req.body['host-email'];
    // get current time and date in IST
    const checkInTime=getTime();
    const checkInDate=getDate();

    //enter visitor details in db
    Visitor.findOne({email:visitorEmail,status:'Pending'},function(err,foundVisitor){
        if(foundVisitor){   // might happen that visitor has already checked in.
            req.flash("error","You have already checked in.");
            res.redirect("/checkin");
        }else{                                                // else add visitor in db  
            Visitor.create({
                name:visitorName,
                email:visitorEmail,
                phone:visitorPhone,
                checkInTime:checkInTime,
                checkInDate:checkInDate,
                timeStamp:timeStamp,
                status:'Pending',
                hostEmail:hostEmail
            })
            .then(function(newVisitor){    
                Host.findOne({email:hostEmail},function(err,foundHost){     // find host in db as entered by visitor
                    if(err){
                        req.flash("error","An error occured. Please try again");
                        res.redirect("/checkin");
                    }else{
                        if(foundHost){                              // add visitor to that host
                            foundHost.visitors.push(newVisitor);
                            foundHost.save(function(err,data){
                                if(err){
                                    req.flash("error","An error occured. Please try again");
                                    res.redirect("/checkin");
                                }else{
                                    let hostPhone=foundHost.phone;
                                    let hostName=foundHost.name;
                                    sendSms(hostPhone,hostName,visitorName,visitorPhone,visitorEmail);
                                    sendEmail(hostName,hostEmail,visitorName,visitorPhone,visitorEmail,null,null,true);
                                    req.flash("success","You have been successfully added as a visitor");
                                    res.redirect("/");
                                }
                            })
                        }
                    }
                });
            })
            .catch(function(err){
                req.flash("error","An error occured. Please try again");
                res.redirect("/checkin");
            });
        }    
    })
})

module.exports=router;