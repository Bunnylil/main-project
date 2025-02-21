const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
          const hamburger = document.querySelector('.hamburger');
          const hamburgerMenu = document.querySelector('.hamburger-menu');
  
          hamburger.addEventListener('click', () => {
              const isMenuVisible = hamburgerMenu.style.display === 'flex';
              hamburgerMenu.style.display = isMenuVisible ? 'none' : 'flex';
          });
      });

      let index = 0;
      const drinksImage = document.getElementById("DrinksImage");
      let images = [];

      // Fetch images from the server
      async function fetchImages() {
          try {
              console.log("Fetching images...");
              const response = await fetch('http://localhost:3000/images');
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              console.log("Fetched images:", data);
              images = data.map(img => img.imageUrl);
              if (images.length > 0) {
                  drinksImage.src = images[index]; // Display the first image
              } else {
                  console.warn("No images found in the database.");
              }
          } catch (error) {
              console.error("Error fetching images:", error);
          }
      }

      // Change the displayed image every 3 seconds
      function changeImage() {
          if (images.length > 0) {
              index = (index + 1) % images.length; // Cycle through images
              drinksImage.src = images[index];
              console.log("Changed image to:", images[index]);
          }
      }

      // Initialize the app
      async function init() {
          await fetchImages();
          if (images.length > 0) {
              setInterval(changeImage, 3000); // Change image every 3 seconds
          }
      }

      // Start the app
      init();