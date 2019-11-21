const dotenv=require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    AUTHENTICATIONKEY : process.env.AUTHENTICATIONKEY,
    ROUTENUMBER : process.env.ROUTENUMBER,
    SENDERID : process.env.SENDERID,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    EMAIL_FROM:process.env.EMAIL_FROM,
}