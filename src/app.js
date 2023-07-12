function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `    <div class="col-4 future-day">${day}</div>
                        <div class="col-4">
                            <i class="fa-solid fa-sun future-icon-sun"></i>
                        </div>
                        <div class="col-4">
                            <span class="max-temp">17°</span>
                            <span class="min-temp">8°</span>
                        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherCondition(response) {
  console.log(response);

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#search-location").innerHTML = response.data.city;
  document.querySelector("#todays-temperature-main").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  console.log(response);
  document.querySelector("#todays-day-time").innerHTML = formatDate(
    response.data.time * 1000
  );

  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

function search(city) {
  let apiKey = "202t323f488633ba301345o8b10a7e9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function searchCurrentLocation(position) {
  let apiKey = "202t323f488633ba301345o8b10a7e9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault;

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperatureElement = document.querySelector(
    "#todays-temperature-main"
  );
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#todays-temperature-main"
  );
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let buttonClick = document.querySelector("#search-button");
buttonClick.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");
displayForecast();
