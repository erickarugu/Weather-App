'use strict';
const cityInput = document.getElementById('city');
const searchIcon = document.getElementById('search');
const displayError = document.getElementById('error');
const loader = document.getElementById('loader');
const forecastContent = document.getElementById('forecast');

searchIcon.addEventListener('click', function(){
    if(cityInput.value)getCityData(cityInput.value);
});

cityInput.addEventListener('keyup', function (e) {
    if (e.keyCode == 13 && cityInput.value) {
        getCityData(cityInput.value);
    }
});

async function getCityData(city) {
    try{
        loader.classList.remove('hidden')
        const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=96dea4748c706dbd239acaf5fccee21a&units=imperial`);
        if(data){
            displayError.innerHTML = "";
            displayCityWeather(data);
            forecastContent.classList.remove('hidden')
        }
        loader.classList.add('hidden');
    }catch(error){
        // console.log(error.name);
        (error.message === "Network Error" || error.name === "ReferenceError") 
        ? displayError.innerHTML = `Please Check Your Internet Connection <i class="fa fa-internet-explorer" aria-hidden="true"></i>` 
        :  displayError.innerHTML = `Unknown City: "${city}". Please Check and Try Again <i class="fa fa-exclamation-circle" aria-hidden="true"></i>`;
        loader.classList.add('hidden');
    }

}

function displayCityWeather(data) {
    var location = document.getElementById('location');
    var weather = document.getElementById('weather');
    var temperature = document.getElementById('temperature');
    var desc = document.getElementById('desc');
    var c1date  = document.getElementById('c1date');
    var c1img = document.getElementById('c1img');
    var c1tmp_min = document.getElementById('c1tmp_min');
    var c1tmp_max = document.getElementById('c1tmp_max');
    var c1weather = document.getElementById('c1weather');
    var c2date = document.getElementById('c2date');
    var c2img = document.getElementById('c2img');
    var c2tmp_min = document.getElementById('c2tmp_min');
    var c2tmp_max = document.getElementById('c2tmp_max');
    var c2weather = document.getElementById('c2weather');
    var c3date = document.getElementById('c3date');
    var c3img = document.getElementById('c3img');
    var c3tmp_min = document.getElementById('c3tmp_min');
    var c3tmp_max = document.getElementById('c3tmp_max');
    var c3weather = document.getElementById('c3weather');
    

    //today
    location.innerHTML = data.city.name + ", " + data.city.country;
    weather.innerHTML = data.list[0].weather[0].main + ": " + data.list[0].weather[0].description;
    temperature.innerHTML = ((parseInt(data.list[0].main.temp) - 32) * (5 / 6)).toFixed(2) + " <span>&#176;</span>C";
    desc.innerHTML = "Wind Speed:  " + data.list[0].wind.speed + "Km/h";


    //day 1
    var raw_date = data.list[8].dt_txt;
    raw_date = new Date(raw_date.substring(0, 11));
    raw_date = raw_date.toDateString();
    c1date.innerHTML = raw_date;

    var iconcode = data.list[8].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    c1img.src = icon_path;

    c1tmp_min.innerHTML = "Min: " + ((parseInt(data.list[8].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c1tmp_max.innerHTML = "Max: " + ((parseInt(data.list[8].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c1weather.innerHTML = data.list[8].weather[0].main + ": " + data.list[8].weather[0].description;

    //day 2
    var raw_date = data.list[16].dt_txt;
    raw_date = new Date(raw_date);
    raw_date = raw_date.toDateString();
    //raw_date = raw_date.substring(5,11);
    c2date.innerHTML = raw_date;

    var iconcode = data.list[16].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    c2img.src = icon_path;

    c2tmp_min.innerHTML = "Min: " + ((parseInt(data.list[16].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c2tmp_max.innerHTML = "Max: " + ((parseInt(data.list[16].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c2weather.innerHTML = data.list[16].weather[0].main + ": " + data.list[16].weather[0].description;

    //day 3
    var raw_date = data.list[24].dt_txt;
    raw_date = new Date(raw_date);
    raw_date = raw_date.toDateString();
    //raw_date = raw_date.substring(5,11);
    c3date.innerHTML = raw_date;

    var iconcode = data.list[24].weather[0].icon;
    var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
    c3img.src = icon_path;

    c3tmp_min.innerHTML = "Min: " + ((parseInt(data.list[24].main.temp_min) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c3tmp_max.innerHTML = "Max: " + ((parseInt(data.list[24].main.temp_max) - 32) * (5 / 6)).toFixed(2) + " &deg;C";
    c3weather.innerHTML = data.list[24].weather[0].main + ": " + data.list[24].weather[0].description;
};