//CARRUSEL CABANA PANEL
document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.querySelector(".carouselClub-images");
  const images = document.querySelectorAll(".carouselClub-images img");
  const totalImages = images.length;
  let currentIndex = 0;

  function moveCarousel() {
      // Mueve el carrusel una imagen a la vez
      currentIndex = (currentIndex + 1) % totalImages;
      const translateX = -currentIndex * 100; // Desplaza según el índice
      carouselImages.style.transform = `translateX(${translateX}%)`;
  }    

  // Ejecuta el carrusel cada 2 segundos
  setInterval(moveCarousel, 2000);
});