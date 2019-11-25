const express=require('express');
const router=express.Router();

const sendEmail=require('../apis/email');

const Visitor=require('../models/Visitor');
const Host=require('../models/Host');
const getTime=require('../utils/get-time');

router.get("/checkout",function(req,res){
    res.render("checkOut-form");
})

router.post("/checkout",function(req,res){

    let visitorEmail=req.body['visitor-email'];
    Visitor.findOne({email:visitorEmail,status:'Pending'},function(err,foundVisitor){
        if(err){
            req.flash("error","We encountered an error!. Please try again");
            res.redirect("/checkout");
        }
        else if(foundVisitor){
            let checkOutTime=getTime();
            foundVisitor.status='Departed';
            foundVisitor.checkOutTime=checkOutTime;
            foundVisitor.save();
            let visitorName=foundVisitor.name;
            let visitorPhone=foundVisitor.phone;
            let checkInTime=foundVisitor.checkInTime;
            let hostEmail=foundVisitor.hostEmail;
            let hostName;
            Host.findOne({email:hostEmail},function(err,foundHost){
                if(err){
                    req.flash("error","We could not connect you to the host. Please try again");
                    res.redirect("/checkout");
                }else{
                    hostName=foundHost.name;
                    sendEmail(hostName,null,visitorName,visitorPhone,visitorEmail,checkOutTime,checkInTime,false);
                    req.flash("success","We have checked you out.");
                    res.redirect("/");
                }
            })
        }else{
            req.flash("error","You have not checked in");
            res.redirect("/checkout");
        }
    })
})

module.exports=router;