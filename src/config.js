const dotenv=require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    AUTHENTICATIONKEY : process.env.AUTHENTICATIONKEY,
    ROUTENUMBER : process.env.ROUTENUMBER,
    SENDERID : process.env.SENDERID,
}