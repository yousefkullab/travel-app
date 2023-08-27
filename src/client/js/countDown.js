function countDown(date){
    // get the current date
    let today = new Date();
    // get the travel date
    const travel_date = new Date(date);
    const time_left = travel_date.getTime() - today.getTime()
    // 1 Day = 24 Hours = 24 * 60 Minutes = 24 * 60 * 60 Seconds
    const days_left = Math.ceil(time_left / (1000 * 3600 * 24));
    return days_left 
}

export{
    countDown
}
