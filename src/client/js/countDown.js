// Function to calculate the number of days left until a travel date
function countDown(date){
    // Get the current date
    let today = new Date();
    // Get the travel date from the input
    const travel_date = new Date(date);
    // Calculate the time left in milliseconds
    const time_left = travel_date.getTime() - today.getTime();
    // Calculate the number of days left based on milliseconds
    // 1 Day = 24 Hours = 24 * 60 Minutes = 24 * 60 * 60 Seconds
    const days_left = Math.ceil(time_left / (1000 * 3600 * 24));
    return days_left; // Return the calculated number of days left
}

// Export the countDown function
export {
    countDown
}

