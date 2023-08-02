// Get references to the buttons
var homeButton = document.getElementById("homeButton");
var aboutButton = document.getElementById("aboutButton");
var wipButton = document.getElementById("wipButton");
var contactButton = document.getElementById("contactButton");

// Add event listeners to each button
homeButton.addEventListener("click", function() {
  const location = "Auckland";
  //fetchWeatherData(viewer, location, canvas, context);
  cameraHome(viewer);
});

aboutButton.addEventListener("click", function() {
  const location = "Palmerston North";
  //fetchWeatherData(viewer, location, canvas, context);
  cameraPalmy(viewer)
});

wipButton.addEventListener("click", function() {
  const location = "National Park";
  //fetchWeatherData(viewer, location, canvas, context);
  cameraNationalPark(viewer)
});

contactButton.addEventListener("click", function() {
  cameraSatellite(viewer)
  contactPage()
});

// Call the resizeOverlay function initially and on window resize
window.addEventListener('resize', resizeOverlay);
resizeOverlay();

// Get the cesiumContainer and canvasOverlay elements
const cesiumContainer = document.getElementById('cesiumContainer');
const canvas = document.getElementById('canvasOverlay');
const context = canvas.getContext('2d');

// Resize 2D overlay
function resizeOverlay(){

  // Adjust the size of the canvas overlay to match the cesiumContainer
  canvas.width = cesiumContainer.clientWidth;
  canvas.height = cesiumContainer.clientHeight;

  // Position the canvas overlay relative to the cesiumContainer
  const containerRect = cesiumContainer.getBoundingClientRect();
  canvas.style.position = 'absolute';
  canvas.style.top = `${containerRect.top}px`;
  canvas.style.left = `${containerRect.left}px`;

  // Set the desired transparency
  const transparency = 0.2;
  context.fillStyle = `rgba(20, 0, 50, ${transparency})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}