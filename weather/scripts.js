/*scrolling for weather app*/

let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;

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
});

async function getData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw response.status;
        }
    } catch (error) {
        console.error(error);
    }
}