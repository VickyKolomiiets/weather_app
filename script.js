const currentDate = document.querySelector("#current-date");
const now = new Date();

const date = now.getDate();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[now.getDay()];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = months[now.getMonth()];

currentDate.innerHTML = `${day} ${date} ${month}`;

const cityNameEnter = function (event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city-input");
  const city = document.querySelector("#city-main");
  city.innerHTML = cityInput.value;
};

const form = document.querySelector("#enter-form");
form.addEventListener("submit", cityNameEnter);

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
  return `${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city-main").innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".condition").innerHTML =
    response.data.weather[0].main;

  const currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "8572f3214ece90c3f4c5fc714f4ddbce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "8572f3214ece90c3f4c5fc714f4ddbce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let searchForm = document.querySelector("#enter-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Kyiv");
