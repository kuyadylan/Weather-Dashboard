var cityInput = document.querySelector(".cityinput");
var searchBtn = document.querySelector(".searchbtn");
var container = document.querySelector(".container");
var currentCity = document.querySelector(".currentcity");
var currentTemp = document.querySelector(".currenttemp");
var currentWind = document.querySelector(".currentwind");
var currentHumidity = document.querySelector(".currenthumidity");
var currentUv = document.querySelector(".currentuv");
var searchHistory = document.querySelector(".searchhistory");

var day1Date = document.querySelector(".day1date");
var day2Date = document.querySelector(".day2date");
var day3Date = document.querySelector(".day3date");
var day4Date = document.querySelector(".day4date");
var day5Date = document.querySelector(".day5date");

var day1Temp = document.querySelector(".day1temp");
var day2Temp = document.querySelector(".day2temp");
var day3Temp = document.querySelector(".day3temp");
var day4Temp = document.querySelector(".day4temp");
var day5Temp = document.querySelector(".day5temp");

var day1Wind = document.querySelector(".day1wind");
var day2Wind = document.querySelector(".day2wind");
var day3Wind = document.querySelector(".day3wind");
var day4Wind = document.querySelector(".day4wind");
var day5Wind = document.querySelector(".day5wind");

var day1Humidity = document.querySelector(".day1humidity");
var day2Humidity = document.querySelector(".day2humidity");
var day3Humidity = document.querySelector(".day3humidity");
var day4Humidity = document.querySelector(".day4humidity");
var day5Humidity = document.querySelector(".day5humidity");

var weather1Image = document.querySelector(".weather1image")
var weather2Image = document.querySelector(".weather2image")
var weather3Image = document.querySelector(".weather3image")
var weather4Image = document.querySelector(".weather4image")
var weather5Image = document.querySelector(".weather5image")

function saveCity() {
    var storedCity = cityInput.value.trim();
    localStorage.setItem("cityInput", storedCity);
    if (storedCity) {
        cityInput.value = "";

        getCityData(storedCity);
    }
};

function getCityData(storedCity) {
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + storedCity + "&units=imperial&appid=a03b138e43edcdb411e3301ae7f6bfe2";
    
    fetch(currentWeatherApi)
        .then(function (response) {
            if (response.ok){
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var dateObject = new Date(data.dt * 1000)
                    var today = dateObject.toLocaleDateString()
                    currentCity.textContent = storedCity + " " + today;
                    currentTemp.textContent = "Temp: " + data.main.temp + " °F";
                    currentWind.textContent = "Wind: " + data.wind.speed + "mph";
                    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    forecast(lat, lon);

                    if (!cityInput) {
                    return;
                    } else {
                    listCity(); 
                };
                });
            } else {
                alert("Please enter a valid City Name");
            }
        });
};

function forecast(lat, lon) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a03b138e43edcdb411e3301ae7f6bfe2";

    fetch(forecastApi)
        .then (function (response) {
            if(response.ok){
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    currentUv.textContent = "UV Index: " + data.current.uvi 
                    day1Date.textContent = (new Date(data.daily[1].dt * 1000)).toLocaleDateString()
                    day2Date.textContent = (new Date(data.daily[2].dt * 1000)).toLocaleDateString()
                    day3Date.textContent = (new Date(data.daily[3].dt * 1000)).toLocaleDateString()
                    day4Date.textContent = (new Date(data.daily[4].dt * 1000)).toLocaleDateString()
                    day5Date.textContent = (new Date(data.daily[5].dt * 1000)).toLocaleDateString()

                    var iconCode1 = (data.daily[1].weather[0].icon)
                    var iconCode2 = (data.daily[2].weather[0].icon)
                    var iconCode3 = (data.daily[3].weather[0].icon)
                    var iconCode4 = (data.daily[4].weather[0].icon)
                    var iconCode5 = (data.daily[5].weather[0].icon)

                    weather1Image.src = "http://openweathermap.org/img/wn/" + iconCode1 + ".png"
                    weather2Image.src = "http://openweathermap.org/img/wn/" + iconCode2 + ".png"
                    weather3Image.src = "http://openweathermap.org/img/wn/" + iconCode3 + ".png"
                    weather4Image.src = "http://openweathermap.org/img/wn/" + iconCode4 + ".png"
                    weather5Image.src = "http://openweathermap.org/img/wn/" + iconCode5 + ".png"

                    day1Temp.textContent = "Temp: " + data.daily[1].temp.day + " °F"
                    day2Temp.textContent = "Temp: " + data.daily[2].temp.day + " °F"
                    day3Temp.textContent = "Temp: " + data.daily[3].temp.day + " °F"
                    day4Temp.textContent = "Temp: " + data.daily[4].temp.day + " °F"
                    day5Temp.textContent = "Temp: " + data.daily[5].temp.day + " °F"

                    day1Wind.textContent = "Wind: " + data.daily[1].wind_speed + "mph"
                    day2Wind.textContent = "Wind: " + data.daily[2].wind_speed + "mph"
                    day3Wind.textContent = "Wind: " + data.daily[3].wind_speed + "mph"
                    day4Wind.textContent = "Wind: " + data.daily[4].wind_speed + "mph"
                    day5Wind.textContent = "Wind: " + data.daily[5].wind_speed + "mph"

                    day1Humidity.textContent = "Humidity: " + data.daily[1].humidity + " %"
                    day2Humidity.textContent = "Humidity: " + data.daily[2].humidity + " %"
                    day3Humidity.textContent = "Humidity: " + data.daily[3].humidity + " %"
                    day4Humidity.textContent = "Humidity: " + data.daily[4].humidity + " %"
                    day5Humidity.textContent = "Humidity: " + data.daily[5].humidity + " %"
                })
            }
        })
}

function listCity() {
    var cityValue = localStorage.getItem("cityInput")
    var newCity = document.createElement("button");
    newCity.textContent = (cityValue);
    newCity.className = ("cityName");
    searchHistory.append(newCity);
}

searchBtn.addEventListener("click", saveCity);


