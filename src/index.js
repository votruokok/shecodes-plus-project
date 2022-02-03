let now = new Date();
let hour = now.getHours();
let date = now.getDay();
let minute = now.getMinutes();
let day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
    change3.innerHTML = ` ${response.data.main.temp}`;
    let change4 = document.getElementById("descriptionInfo");
    change4.innerHTML = `${response.data.weather[0].description}`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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
    change1.innerHTML = ` ${response.data.main.temp}`;
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
  }
}

function show() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let current1 = document.getElementById("location");
current1.addEventListener("click", show);
