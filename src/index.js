let now = new Date();
let hour = now.getHours();
let date = now.getDay();
let minute = now.getMinutes();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
if (minute < 10) {
  minute = `0${minute}`;
}

var current = document.getElementById("need");
current.innerHTML = `${day[date]} ${hour}:${minute}`;

function signUp(event) {
  event.preventDefault();

  let apiKey = "95347d69c666aa08d70147c39110bcb4";
  let units = "metric";
  let input = document.getElementById("CityName");
  console.log(input.value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  function showTemperature2(response) {
    let change = document.getElementById("changethecity");
    change.innerHTML = `${response.data.name}`;
    let change3 = document.getElementById("auto");
    change3.innerHTML = ` ${Math.round(response.data.main.temp)}`;
    getForecast(response.data.coord);
    console.log(response.data.coord);
    let change4 = document.getElementById("descriptionInfo");
    change4.innerHTML = `${response.data.weather[0].description}`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let change5 = document.getElementById("windSpeed");
    change5.innerHTML = `${response.data.wind.speed}`;
    CTemp = response.data.main.temp;
  }
  axios.get(apiUrl).then(showTemperature2);
}
let form = document.querySelector("form");
form.addEventListener("submit", signUp);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = "95347d69c666aa08d70147c39110bcb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  function showTemperature(response) {
    console.log(response.data.main.temp);
    let change1 = document.getElementById("auto");
    change1.innerHTML = ` ${Math.round(response.data.main.temp)}`;
    let change2 = document.getElementById("changethecity");
    change2.innerHTML = ` ${response.data.name}`;
    console.log(response.data.name);
    let change4 = document.getElementById("descriptionInfo");
    change4.innerHTML = `${response.data.weather[0].description}`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let change5 = document.getElementById("windSpeed");
    change5.innerHTML = `${response.data.wind.speed}`;
  }
}

function show() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let current1 = document.getElementById("location");
current1.addEventListener("click", show);

function getForecast(coord) {
  let apiKey = "95347d69c666aa08d70147c39110bcb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col" id=forecast1>
        <div class="date1">${formatForecastDay(forecastDay.dt)}</div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42"/> 
        <div class=nhiet><span class="temperatureMax1">${Math.round(
          forecastDay.temp.max
        )}°</span><span class="temperatureMin1">  ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fLink = document.getElementById("fahrenheit");
fLink.addEventListener("click", showfLink);
function showfLink(event) {
  event.preventDefault();
  let nhietdo = document.getElementById("auto");
  let doiDonVi = (CTemp * 9) / 5 + 32;
  nhietdo.innerHTML = Math.round(doiDonVi);
}
let CTemp = null;
let cLink = document.getElementById("celsius");
cLink.addEventListener("click", showcLink);
function showcLink(event) {
  event.preventDefault();
  let nhietdo = document.getElementById("auto");
  nhietdo.innerHTML = Math.round(CTemp);
}
