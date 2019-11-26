let timestamp=function getTimeStamp(){
    let date= new Date();
    const timestamp = date.getTime();
    return timestamp;
}

module.exports=timestamp;