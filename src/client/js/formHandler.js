// Import the countDown function from countDown.js
import { countDown } from "./countDown";

// Function to handle form submission
async function handleSubmit(event){
    event.preventDefault(); // Prevent the default form submission behavior
    const city = document.getElementById("city").value; // Get the value of the city input
    const travel_date = document.getElementById("date").value; // Get the value of the travel date input
    const days_left = countDown(travel_date); // Calculate the days left using countDown function
    const img = document.getElementById('image'); // Get the image element
    const temp = document.getElementById('temp'); // Get the temperature element
    const description = document.getElementById('description'); // Get the description element
    const countdown = document.getElementById('countdown'); // Get the countdown element

    console.log("::: Form Submitted :::");
    // Send a POST request to the server to fetch travel data
    const response = await fetch('http://localhost:3000/travel-data',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city,
            days_left
        })
    });
    try{
        const data = await response.json(); // Parse the response JSON data
        console.log(data);
        // Update UI with the fetched data
        const { image, weather } = data;
        // console.log(image.image);
        img.src = image.image; // Set the image source
        temp.innerHTML = `<h3>Temp: ${weather.temp}</h3>`; // Display temperature
        description.innerHTML = `<h3>Desc: ${weather.description}</h3>`; // Display weather description
        countdown.innerHTML = `<h3>Days Left: ${days_left}</h3>`; // Display days left
    }catch(err){
        console.log(`Error when handle form ${err}`); // Log errors if any
    }
}

// Export the handleSubmit function
export{
    handleSubmit
}