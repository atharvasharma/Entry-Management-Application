var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let visitorSchema=new Schema({
    name: {type:String,required:true,default:null},
    email: {type:String,required:true,default:null},
    phone: {type:Number,required:true,maxlength:10,default:null},
    checkInTime: {type:String,required:true,default:null},
    checkInDate: {type:String,required:true,default:null},
    timeStamp: {type:Number,default:null},
    checkOutTime: String,
    status :{
                type:String,
                enum:['Pending','Departed']
    },
    hostEmail:{type:String}
});

module.exports=mongoose.model("Visitor",visitorSchema);