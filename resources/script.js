window.addEventListener("DOMContentLoaded", domLoaded);
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
function domLoaded(){

function getForecast() {
    let zipcode = document.getElementById("zip").value;
    let xhr = new XMLHttpRequest();

    xhr.responseType = "json";
    xhr.addEventListener("load", responseReceivedHandler1);
    xhr.open("GET", "https://wp.zybooks.com/weather.php?zip=" + zipcode);
    xhr.send();
}

function responseReceivedHandler1() {
    if (this.status !== 200) {
        alert("Error making HTTP request");
    }

    let html = "";
    html += "<ol>";
    if(this.response.success) {
        for (let day of this.response.forecast) {
            html += `<li>${day.desc}: high is ${day.high}, low is ${day.low}</li>`;
        }
        html += "</ol>";
    }
    else{
        html = `<h1>Error: ${this.response.error}</h1>`;
    }
    document.getElementById("forecast").innerHTML = html;
}

document.getElementById("search").addEventListener("click", getForecast);
//XMLHttpRequest or Ajax Labs
//question 1-4
function responseHandler() {

    if (this.response.success) {
        console.log(this.response);
    } else {
        console.log(this.response.error);
    }
}
let xhr = new XMLHttpRequest();
xhr.addEventListener("load", responseHandler);
//question2
xhr.responseType = "json";
xhr.open("GET", " https://wp.zybooks.com/todos.php?day=Monday");
xhr.send();

//Weather API
getWeather(90210);

function getWeather(zip) {
    let endpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "3073bc6d63971b9b91722ef35ea8347d";
    let queryString = "zip=" + zip + "&units=imperial&appid=" + apiKey;
    let url = endpoint + "?" + queryString;

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
}

function responseReceivedHandler() {
    let weatherInfo = document.getElementById("weather");
    if (this.status === 200) {
        weatherInfo.innerHTML = "<p>Current temp: " + this.response.main.temp + " &deg;F</p>" +
            "<p>Desc: " + this.response.weather[0].description + "</p>" +
            "<p>Humidity: " + this.response.main.humidity + "%</p>";
    } else {
        weatherInfo.innerHTML = "Weather data unavailable.";
    }
}
}