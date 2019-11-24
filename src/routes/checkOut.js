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
            console.log("An error occured, description: "+err);
        }
        else if(foundVisitor.status=='Pending'){
            let checkOutTime=getTime();
            foundVisitor.status='Departed';
            foundVisitor.checkOutTime=checkOutTime;
            foundVisitor.save();
            console.log("You have been checked out!");
            let visitorName=foundVisitor.name;
            let visitorPhone=foundVisitor.phone;
            let checkInTime=foundVisitor.checkInTime;
            let hostEmail=foundVisitor.hostEmail;
            let hostName;
            Host.findOne({email:hostEmail},function(err,foundHost){
                if(err){
                    console.log('An error occured, Description:'+err);
                }else{
                    hostName=foundHost.name;
                    sendEmail(hostName,null,visitorName,visitorPhone,visitorEmail,checkOutTime,checkInTime,false);
                }
            })
        }else{
            console.log("You have already been checked out");
        }
    })
})

module.exports=router;