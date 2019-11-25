const express=require('express');
const router=express.Router();

const Host=require('../models/Host');


router.get("/register",function(req,res){
    res.render("register-form");
})

router.post("/register",function(req,res){
    let hostName=req.body['host-name'];     // fetch details as entered by host
    let hostEmail=req.body['host-email'];
    let hostPhone=req.body['host-phone'];
    Host.findOne({email:hostEmail},function(err,foundHost){
        if(foundHost){
            req.flash("error","Host with this email is already present");
           // console.log("Host already present");
            res.redirect("/register");
        }else{
            Host.create({                         
                name:hostName,
                email:hostEmail,
                phone:hostPhone, 
            }).then(function(newHost){
                req.flash("success","You have been added as a Host");
               // console.log("Host added");
                res.redirect("/");
            }).catch(function(err){
                req.flash("error","An error occured, Please try again");
                res.redirect("/register");
            });
        }
    })
})

module.exports=router;