
const d = new Date();
document.getElementById("demo").innerHTML = d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate();


let person = "Guest";
let locationKey = "";
let locationName = "";


document.addEventListener("DOMContentLoaded", function () {
    person = prompt("Ievadi savu vārdu g:", "Tavs vārds...");
    if (!person || person.trim() === "") {
        person = "Guest";
    }

    locationKey = prompt("Ievadi location key(automātiski ir Rīgas):", "225780"); 
    if (!locationKey || locationKey.trim() === "") {
        locationKey = "225780";
    }

    document.getElementById("greeting").textContent = `Hi, ${person}`;
});


function fetchWeather() {
    const apiKey = "Ji0aGYWNTbnKd4gAmAZN79TFDle21Lzt";
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${apiKey}`;
    const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

   
    fetch(locationUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch location info. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(locationData => {
            locationName = `${locationData.LocalizedName}, ${locationData.Country.LocalizedName}`;

            
            return fetch(weatherUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error("No weather data returned from API");
            }

            const weatherData = data[0];
            const weatherText = weatherData.WeatherText || "N/A";
            const temperature = weatherData.Temperature?.Metric?.Value ?? "N/A";
            const lastUpdated = weatherData.LocalObservationDateTime || "N/A";

            document.getElementById("weather").innerHTML = `
                <h2>${locationName}</h2>
                <p><strong>Weather:</strong> ${weatherText}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Last Updated:</strong> ${lastUpdated}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weather").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
}
