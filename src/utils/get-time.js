const moment = require('moment-timezone');

let time=function getTime(){
    let checkInTimeandDate=moment().tz("Asia/Calcutta").format();
    const checkInTime=checkInTimeandDate.substring(11,16);
    return checkInTime;
}
module.exports=time;