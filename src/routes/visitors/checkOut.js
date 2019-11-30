const express=require('express');
const router=express.Router();

const sendEmail=require('../../apis/email');

const Visitor=require('../../models/Visitor');
const Host=require('../../models/Host');
const getTime=require('../../utils/get-time');

router.get(["/visitors/checkout","/checkout"],function(req,res){
    let visitorEmail=req.session.visitorEmail;     // get visitor email from express session.
    res.render("checkOut-form",{visitorEmail:visitorEmail});
})

router.post("/visitors/checkout",function(req,res){

    let visitorEmail=req.body['visitor-email'];
    Visitor.findOne({email:visitorEmail,status:'Pending'},function(err,foundVisitor){
        if(err){
            req.flash("error","We encountered an error!. Please try again");
            res.redirect("/checkout");
        }
        else if(foundVisitor){          // if we find a visitor with status pending. Check him out by saving status as departed.
            let checkOutTime=getTime();
            foundVisitor.status='Departed';
            foundVisitor.checkOutTime=checkOutTime;
            foundVisitor.save();
            let visitorName=foundVisitor.name;
            let visitorPhone=foundVisitor.phone;
            let checkInTime=foundVisitor.checkInTime;
            let hostEmail=foundVisitor.hostEmail;
            let hostName;
            Host.findOne({email:hostEmail},function(err,foundHost){        // Fetch host name for the given visitor.
                if(err){
                    req.flash("error","We could not connect you to the host. Please try again");
                    res.redirect("/visitors/checkout");
                }else{
                    hostName=foundHost.name;
                    sendEmail(hostName,null,visitorName,visitorPhone,visitorEmail,checkOutTime,checkInTime,false);  
                    req.session.visitorEmail="";   // set visitorEmail for express session to be empty coz visitor has departed.
                    req.flash("success","We have checked you out.");
                    res.redirect("/");
                }
            })
        }else{
            req.flash("error","You forgot to check in or you have already checked out");
            res.redirect("/visitors/checkout");
        }
    })
})

module.exports=router;