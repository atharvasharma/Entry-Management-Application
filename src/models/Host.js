const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Visitor=require('./Visitor');

let hostSchema=new Schema({
    name: {type:String,required:true,default:null},
    email: {type:String,required:true,default:null,unique:true},
    phone: {type:Number,required:true,maxlength:10,default:null,unique:true},
    visitors : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Visitor'
        }
    ]
});

module.exports=mongoose.model("Hosts",hostSchema);