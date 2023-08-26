function countDown(date){
    let today = new Date();
    const travel_date = new Date(date);
    const time_left = travel_date.getTime() - today.getTime()
    const days_left = Math.ceil(time_left / (1000 * 3600 * 24));
    return days_left 
}

export{
    countDown
}
