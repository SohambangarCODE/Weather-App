const apiKey="8f98f92651c7001690e216516c98a381";
const button=document.querySelector(".btn");
const input=document.querySelector(".city-input");
const cityE1=document.querySelector("#city-name");
const DateE1=document.querySelector("#date");

button.addEventListener("click",async()=>{
    const city=input.value.trim();

    if(city===""){
        alert("please enter a city name.");
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response=await fetch(apiUrl);
        if(!response.ok){
            throw new Error("City not found.");
        }
        const data=await response.json();
        
        // update city name
        cityE1.textContent=`${data.name},${data.sys.country}`;

        // Date using moment.js
        const currentDateE1=moment().format("dddd, MMMM, YYYY");
        DateE1.textContent=currentDateE1;

        // Weather icon
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const weatherIcon=document.querySelector("#weather-icon");
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = "block";

        //temperature
            document.getElementById("temperature").textContent = `🌡️ ${data.main.temp} °C`;

        // Description
            document.getElementById("description").textContent = `🌥️ ${data.weather[0].description}`;

        // Wind speed
            document.getElementById("wind-speed").textContent = `💨 Wind: ${data.wind.speed} m/s`;

        // Show weather info
            document.getElementById("weather-info").style.display = "block";
    }catch(error){
        alert(error.message);
    }
});
