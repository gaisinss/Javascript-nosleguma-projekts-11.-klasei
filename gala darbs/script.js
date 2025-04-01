function fetchWeather() {
    const apiKey = "Ji0aGYWNTbnKd4gAmAZN79TFDle21Lzt"; 
    const locationKey = "225780"; 
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); 
            if (!data || data.length === 0) {
                throw new Error("No data returned from API");
            }

            const weatherData = data[0];

            // Check if each value exists before displaying
            const weatherText = weatherData.WeatherText || "N/A";
            const temperature = weatherData.Temperature?.Metric?.Value ?? "N/A";
            const lastUpdated = weatherData.LocalObservationDateTime || "N/A";

            document.getElementById("weather").innerHTML = `
                <h2>Riga, Latvia</h2>
                <p><strong>Weather:</strong> ${weatherText}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                
               
                <p>Last Updated: ${lastUpdated}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weather").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
}