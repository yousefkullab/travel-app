import { countDown } from "./countDown";

async function handleSubmit(event){
    event.preventDefault();
    const city = document.getElementById("city").value;
    const travel_date = document.getElementById("date").value;
    const days_left = Client.countDown(travel_date);
    const img = document.getElementById('image');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const countdown = document.getElementById('countdown');

    console.log("::: Form Submitted :::");
    const response = await fetch('http://localhost:3000/travel-data',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city,
            days_left
        })
    })
    try{
        const data = await response.json()
        console.log(data);
        // Update UI with the data
        const { image, weather } = data;
        console.log(image.image);
        img.src = image.image;
        temp.innerHTML = `<h3>Temp: ${weather.temp}</h3>`;
        description.innerHTML = `<h3>Desc: ${weather.description}</h3>`;
        countdown.innerHTML = `<h3>Days Left: ${days_left}</h3>`;
    }catch(err){
        console.log(`Error when handle form ${err}`);
    }
}

export{
    handleSubmit
}
