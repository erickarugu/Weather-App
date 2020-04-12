'use strict';

const cityInput = document.getElementById('city');
const searchIcon = document.getElementById('search');

searchIcon.addEventListener('click', getWeather);
cityInput.addEventListener('keyup', function(e){
    if (e.keyCode == 13) {
        getCityData(cityInput.value);
    }
});

function getWeather() {
    getCityData(cityInput.value);
}

function getCityData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=96dea4748c706dbd239acaf5fccee21a&units=imperial`)
        .then(fObj => {
            return fObj.json();
        }).then(displayCityWeather);

}

function displayCityWeather(fObj) {
    console.log(fObj);
    //today
    document.getElementById('location').innerHTML = fObj.city.name + ", " + fObj.city.country;
    document.getElementById('weather').innerHTML = fObj.list[0].weather[0].main + ": " + fObj.list[0].weather[0].description;
    document.getElementById('temperature').innerHTML = ((parseInt(fObj.list[0].main.temp) - 32) * (5 / 6)).toFixed(2) + " <span>&#176;</span>C";
    document.getElementById('desc').innerHTML = "Wind Speed:  " + fObj.list[0].wind.speed + "Km/h";


    //day 1
    var raw_date = fObj.list[8].dt_txt;

    raw_date = raw_date.substring(0, 11);
    raw_date = new Date(raw_date);
    raw_date = raw_date.toDateString();
    document.getElementById('c1date').innerHTML = raw_date;

    var iconcode = fObj.list[8].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('c1img').src = icon_path;

    document.getElementById('c1tmp_min').innerHTML = "Min: " + ((parseInt(fObj.list[8].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c1tmp_max').innerHTML = "Max: " + ((parseInt(fObj.list[8].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c1weather').innerHTML = fObj.list[8].weather[0].main + ": " + fObj.list[8].weather[0].description;

    //day 2
    var raw_date = fObj.list[16].dt_txt;
    raw_date = new Date(raw_date);
    raw_date = raw_date.toDateString();
    //raw_date = raw_date.substring(5,11);
    document.getElementById('c2date').innerHTML = raw_date;

    var iconcode = fObj.list[16].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('c2img').src = icon_path;

    document.getElementById('c2tmp_min').innerHTML = "Min: " + ((parseInt(fObj.list[16].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c2tmp_max').innerHTML = "Max: " + ((parseInt(fObj.list[16].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c2weather').innerHTML = fObj.list[16].weather[0].main + ": " + fObj.list[16].weather[0].description;

    //day 3
    var raw_date = fObj.list[24].dt_txt;
    raw_date = new Date(raw_date);
    raw_date = raw_date.toDateString();
    //raw_date = raw_date.substring(5,11);
    document.getElementById('c3date').innerHTML = raw_date;

    var iconcode = fObj.list[24].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('c3img').src = icon_path;

    document.getElementById('c3tmp_min').innerHTML = "Min: " + ((parseInt(fObj.list[24].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c3tmp_max').innerHTML = "Max: " + ((parseInt(fObj.list[24].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    document.getElementById('c3weather').innerHTML = fObj.list[24].weather[0].main + ": " + fObj.list[24].weather[0].description;
};