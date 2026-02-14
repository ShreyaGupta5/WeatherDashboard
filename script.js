const apiKey = "91bcda0533648b0d353a920364745d10";

const background = document.querySelector(".background");
const rain = document.querySelector(".rain");
const snow = document.querySelector(".snow");
const lightning = document.querySelector(".lightning");
const weatherCard = document.getElementById("weatherCard");
const errorDiv = document.getElementById("error");

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    displayWeather(data);
    applyEffects(data);

  } catch (error) {
    errorDiv.innerText = error.message;
    errorDiv.classList.remove("hidden");
  }
}

function displayWeather(data) {
  document.getElementById("cityName").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temperature").innerText =
    `Temperature: ${data.main.temp} °C`;

  document.getElementById("description").innerText =
    `Condition: ${data.weather[0].description}`;

  document.getElementById("humidity").innerText =
    `Humidity: ${data.main.humidity}%`;

  document.getElementById("wind").innerText =
    `Wind Speed: ${data.wind.speed} m/s`;

  weatherCard.classList.remove("hidden");
}

function applyEffects(data) {
  const weather = data.weather[0].main;
  const currentTime = data.dt;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  // Reset
  rain.style.display = "none";
  snow.style.display = "none";

  // Day/Night
  if (currentTime >= sunrise && currentTime <= sunset) {
    background.style.background =
      "linear-gradient(to bottom, #87CEEB, #fefefe)";
  } else {
    background.style.background =
      "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
  }

  // Weather Effects
  if (weather === "Rain" || weather === "Drizzle") {
    rain.style.display = "block";
  }

  if (weather === "Snow") {
    snow.style.display = "block";
  }

  if (weather === "Thunderstorm") {
    rain.style.display = "block";
    setInterval(() => {
      lightning.classList.add("flash");
      setTimeout(() => {
        lightning.classList.remove("flash");
      }, 200);
    }, 4000);
  }
}
