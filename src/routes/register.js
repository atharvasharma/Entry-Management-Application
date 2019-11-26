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
    console.log(hostPhone);
    Host.findOne({email:hostEmail},function(err,foundHost){  //check if host already present in db
        if(foundHost){
            console.log("ran");
            req.flash("error","Host with this email is already present");
            res.redirect("/register");
        }else{                           // else add host to db
            console.log("ran");
            Host.create({                         
                name:hostName,
                email:hostEmail,
                phone:hostPhone, 
            }).then(function(newHost){
                req.flash("success","You have been added as a Host");
                res.redirect("/");
            }).catch(function(err){
                req.flash("error","An error occured, Please try again");
                res.redirect("/register");
            });
        }
    })
})
module.exports=router;