let timeDateStamp = new Date();
function formatDate(todaysDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[timeDateStamp.getDay()];
  let timeHours = timeDateStamp.getHours();
  if (timeHours < 10) {
    timeHours = `0${timeHours}`;
  }
  let timeMinutes = timeDateStamp.getMinutes();
  if (timeMinutes < 10) {
    timeMinutes = `0${timeMinutes}`;
  }

  let formattedDate = `${day} </br>${timeHours}:${timeMinutes}`;

  return formattedDate;
}

let timeStamp = document.querySelector("#todays-day-time");
timeStamp.innerHTML = formatDate(timeDateStamp);

//search functionality

function showWeatherCondition(response) {
  document.querySelector("#search-location").innerHTML = response.data.name;
  document.querySelector("#todays-temperature-main").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  console.log(response);
}

function search(city) {
  let apiKey = "0cdb2a36fba25d739083f4d9c20fca1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function searchCurrentLocation(position) {
  let apiKey = "0cdb2a36fba25d739083f4d9c20fca1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let buttonClick = document.querySelector("#search-button");
buttonClick.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("London");
