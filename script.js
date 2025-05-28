 const API_KEY = "YOUR_API_KEY";

        document.getElementById("search-btn").addEventListener("click", () => {
            const city = document.getElementById("city").value;
            if (city) {
                getWeather(city);
            } else {
                Swal.fire("Error", "Please enter a city name.", "warning");
            }
        });

        async function getWeather(city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("City not found");
                const data = await response.json();

                displayWeather(data);
            } catch (error) {
                Swal.fire("Error!", error.message, "error");
            }
        }

        function displayWeather(data) {
            const weatherInfo = document.getElementById("weather-info");
            const weatherCondition = data.weather[0].description;
            const temperature = data.main.temp;
            const advice = getWeatherAdvice(temperature, weatherCondition);

            weatherInfo.innerHTML = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Country:</strong> ${data.sys.country}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${weatherCondition}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <div class="weather-advice">${advice}</div>
            `;
        }

        function getWeatherAdvice(temp, condition) {
            if (temp > 30) {
                return "The weather is very hot now. Stay hydrated and avoid going out during peak hours.";
            } else if (temp > 20) {
                return "The weather is warm and nice. It's a great time to go out!";
            } else if (temp > 10) {
                return "The weather is a bit cool. Consider wearing a light jacket.";
            } else {
                return "It's very cold now. Make sure to stay warm and dress appropriately!";
            }
        }