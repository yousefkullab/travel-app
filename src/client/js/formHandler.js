import { countDown } from "./countDown";

async function handleSubmit(event){
    event.preventDefault();
    const city = document.getElementById("city").value;
    const travel_date = document.getElementById("date").value;
    const days_left = Client.countDown(travel_date);
    const img = document.getElementById('image');
    const temp = document.getElementById('temp');
    const desc = document.getElementById('desc');

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
        img.src = image;
        temp.innerHTML = `Temperature ${weather.temp}`;
        desc.innerHTML = `Description ${weather.desc}`;
        return data
    }catch(err){
        console.log(`Error when handel form ${err}`);
    }
}

export{
    handleSubmit
}
