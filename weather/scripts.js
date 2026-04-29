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
            throw(response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

function updateWeather(data) {
    console.log(data);
    document.querySelector("#temp span").textContent = data.current.temp_f;
    document.querySelector("#condition").textContent = data.current.condition.text;
    
    let windSpeed = data.current.wind_mph;
    let windDir = data.current.wind_dir;
    document.querySelector("#wind").textContent = windSpeed + " mph " + windDir;
    
    document.querySelector("#humidity span").textContent = data.current.humidity;

    

}

//wait for dom to load
document.addEventListener("DOMContentLoaded", function() {
    scrollingBox = document.querySelector("#predictions");
    isMoving = false;

    scrollingBox.addEventListener("mousedown", function(e) {
        scrollLeftStart = scrollingBox.scrollLeft;
        offsetLeftStart = e.pageX - scrollingBox.offsetLeft;
        isMoving = true;
        scrollingBox.classList.add("dragging");
    });

    scrollingBox.addEventListener("mouseleave", function() {
        isMoving = false;
        scrollingBox.classList.remove("dragging");
    });

    scrollingBox.addEventListener("mouseup", function() {
        isMoving = false;
        scrollingBox.classList.remove("dragging");
    });

    scrollingBox.addEventListener("mousemove", function(e) {
        e.preventDefault();
        if (!isMoving) return;

        scrollingBox.scrollLeft = 
        scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);
    });

    let sampleURL = "https://tordevries.github.io/477/examples/ajax-api-test/current-forecast.js";
    let sampleOptions = {};

    getData(sampleURL, sampleOptions).then(function(result) {
        updateWeather(result);
    });



});

