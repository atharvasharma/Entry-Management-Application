const express=require('express');
const router=express.Router();

const Host=require('../models/Host');


router.get("/register",function(req,res){
    res.render("register-form");
})

router.post("/register",function(req,res){
    let hostName=req.body['host-name'];
    let hostEmail=req.body['host-email'];
    let hostPhone=req.body['host-phone'];
    Host.create({
        name:hostName,
        email:hostEmail,
        phone:hostPhone, 
    }).then(function(newHost){
        console.log("host has been added to the db");
    }).catch(function(err){
        console.log("You are already present in our database");
    });
})

module.exports=router;