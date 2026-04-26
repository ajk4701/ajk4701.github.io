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