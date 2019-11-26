const moment = require('moment-timezone');

let date=function getDate(){
    let checkInTimeandDate=moment().tz("Asia/Calcutta").format();
    const checkInDate=checkInTimeandDate.substring(0,10);
    return checkInDate; 
}
module.exports=date;