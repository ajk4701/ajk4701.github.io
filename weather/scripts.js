/*scrolling for weather app*/

let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;

//function to get remote json data
async function getData(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw (response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

function loadWeather(location) {
    let apiURL = "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + location + "&days=3";
    let apiOptions = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "8f5f2d6b2cmsh442719e1ab24b48p1d5c4ajsna75ba16ddd89",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
    };

    getData(apiURL, apiOptions).then(function (result) {
        console.log(result);
        updateWeather(result);
    });
}

function updateWeather(data) {
    //output full data
    console.log(data);
    //update temperature, condition, wind, humidity
    document.querySelector("#temp span").textContent = data.current.temp_f;
    document.querySelector("#condition").textContent = data.current.condition.text;

    let windSpeed = data.current.wind_mph;
    let windDir = data.current.wind_dir;
    document.querySelector("#wind").textContent = windSpeed + " mph " + windDir;

    document.querySelector("#humidity span").textContent = data.current.humidity;
    document.querySelector("#weather-icon").src = "https:" + data.current.condition.icon;
    document.querySelector("#weather-icon").alt = data.current.condition.text;
    document.querySelector("#location").textContent = data.location.name + ", " + data.location.region;

    let forecastCards = document.querySelectorAll(".forecast-card");

    for (let i = 0; i < forecastCards.length; i++) {
        let forecastDay = data.forecast.forecastday[i + 1];
        let forecastDate = new Date(forecastDay.date);
        let dayName = forecastDate.toLocaleDateString("en-US", { weekday: "long" });

        forecastCards[i].querySelector("h3").textContent = dayName;
        forecastCards[i].querySelector(".range").innerHTML =
            forecastDay.day.maxtemp_f + "&deg;F / " + forecastDay.day.mintemp_f + "&deg;F";
        forecastCards[i].querySelector("p:nth-of-type(2)").textContent = forecastDay.day.condition.text;

        forecastCards[i].querySelector("p:nth-of-type(3)").textContent = "Wind: " + forecastDay.day.maxwind_mph + " mph";
    }

}

//wait for dom to load
document.addEventListener("DOMContentLoaded", function () {
    scrollingBox = document.querySelector("#predictions");
    isMoving = false;

    scrollingBox.addEventListener("mousedown", function (e) {
        scrollLeftStart = scrollingBox.scrollLeft;
        offsetLeftStart = e.pageX - scrollingBox.offsetLeft;
        isMoving = true;
        scrollingBox.classList.add("dragging");
    });

    scrollingBox.addEventListener("mouseleave", function () {
        isMoving = false;
        scrollingBox.classList.remove("dragging");
    });

    scrollingBox.addEventListener("mouseup", function () {
        isMoving = false;
        scrollingBox.classList.remove("dragging");
    });

    scrollingBox.addEventListener("mousemove", function (e) {
        e.preventDefault();
        if (!isMoving) return;

        scrollingBox.scrollLeft =
            scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);
    });

    //modal elements
    let openModal = document.querySelector("#open-modal");
    let closeModal = document.querySelector("#close-modal");
    let modalBackground = document.querySelector("#modal-background");
    let locationForm = document.querySelector("#location-form");
    let locationInput = document.querySelector("#location-input");

    //open modal
    openModal.addEventListener("click", function () {
        modalBackground.classList.add("show");
    });

    //close modal
    closeModal.addEventListener("click", function () {
        modalBackground.classList.remove("show");
    });

    //submit form
    locationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let location = locationInput.value.trim();

        if (location !== "") {
            console.log("User entered: " + location);
            modalBackground.classList.remove("show");
            loadWeather(location);
            locationInput.value = "";
        }
    });
    loadWeather("Pullman");
});