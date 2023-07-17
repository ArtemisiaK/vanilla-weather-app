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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast-rows">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `    <div class="col-4 d-flex align-items-center justify-content-center future-day">${formatDay(
        forecastDay.time
      )}</div>
                        <div class="col-4 d-flex justify-content-center text-center forecast-icons">
                            <img
          src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="50"
        
        />     
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center forecast-max-min">
                            <span class="max-temp">${Math.round(
                              forecastDay.temperature.maximum
                            )}°</span>
                            <span class="min-temp">${Math.round(
                              forecastDay.temperature.minimum
                            )}°</span>
                        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "202t323f488633ba301345o8b10a7e9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(coordinates);
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherCondition(response) {
  celsiusTemperature = response.data.temperature.current;
  let countryLocation = response.data.country;
  if (
    countryLocation === "United Kingdom of Great Britain and Northern Ireland"
  ) {
    countryLocation = countryLocation.replace(
      "United Kingdom of Great Britain and Northern Ireland",
      "United Kingdom"
    );
  }

  document.querySelector("#search-location").innerHTML = response.data.city;
  document.querySelector("#country-weather").innerHTML = countryLocation;
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
  document.querySelector("#todays-day-time").innerHTML = formatDate(
    response.data.time * 1000
  );

  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "202t323f488633ba301345o8b10a7e9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  if (city === "") {
    alert(`Please enter a city`);
  } else {
    search(city);
  }
}

function searchCurrentLocation(position) {
  let apiKey = "202t323f488633ba301345o8b10a7e9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  console.log(position);
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let celsiusTemperature = null;

let buttonClick = document.querySelector("#search-button");
buttonClick.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("London");
