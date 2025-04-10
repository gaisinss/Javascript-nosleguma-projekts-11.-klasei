document.addEventListener("DOMContentLoaded", function () {
   
    const temperatureData = {
        "countries": [
            { "name": "Canada", "averageTemperature": -5.3 },
            { "name": "Brazil", "averageTemperature": 25.0 },
            { "name": "Australia", "averageTemperature": 21.5 },
            { "name": "Germany", "averageTemperature": 9.0 },
            { "name": "Egypt", "averageTemperature": 22.0 }
        ]
    };

    let currentCountryIndex = Math.floor(Math.random() * temperatureData.countries.length);
    let currentCountry = temperatureData.countries[currentCountryIndex];

    function displayHint() {
        const hintElement = document.getElementById('hint');
        hintElement.innerText = `Pavediens: Vidēja tempratūra ir ${currentCountry.averageTemperature}°C.`;
    }

    window.checkGuess = function() {
        const userGuess = document.getElementById('countryGuess').value.trim().toLowerCase();
        const resultElement = document.getElementById('result');

        if (userGuess.toLowerCase() === currentCountry.name.toLowerCase()) {
            resultElement.innerText = "Pareizi! Tu atminēji pareizo valsti.";
            resultElement.className = "correct";
            setTimeout(newGame, 2000); 
        } else {
            resultElement.innerText = "Nepareizi! Meigini velreiz.";
            resultElement.className = "wrong";
        }
    }

    function newGame() {
        currentCountryIndex = Math.floor(Math.random() * temperatureData.countries.length);
        currentCountry = temperatureData.countries[currentCountryIndex];
        displayHint();
        document.getElementById('countryGuess').value = '';
        document.getElementById('result').innerText = '';
    }

    displayHint();
});
