let index = 0;
const images = document.querySelectorAll(".custom-carousel img");

function changeImage() {
    images[index].classList.remove("custom-active");
    index = (index + 1) % images.length;
    images[index].classList.add("custom-active");
}

setInterval(changeImage, 2000);