// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Zjk5N2RlYS0zMGY2LTQxNWQtYjAwMy1iYWUyODI4ODY5YTUiLCJpZCI6MTE3OTUzLCJpYXQiOjE2NzA3Mzk4MTl9.k3I9be0G6cm7S9-U3lYsvSaUZ6mKVf0Capzojy3RZAU";

async function main() {

  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(), // This can be turned off when using Google 3D tiles
    requestWaterMask: true,
    requestVertexNormals: true,
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 3954 }),
    baseLayerPicker: false,
    shouldAnimate: true,
    timeline: false,
    geocoder: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    searchButton: false,
    homeButton: false,
    infoBox: false
  });
  
  viewer.scene.globe.show = true;   // Make false when using Google 3D tiles  

  // Get the cesiumContainer and canvasOverlay elements
  const cesiumContainer = document.getElementById('cesiumContainer');
  const canvas = document.getElementById('canvasOverlay');
  const context = canvas.getContext('2d');
  const canvas2 = document.getElementById('canvasMatter');
  //const context2 = canvas2.getContext('2d');


  // Resize Canvas 2D overlay
  function resizeOverlay(){

    // Adjust the size of the canvas overlay to match the cesiumContainer
    canvas.width = cesiumContainer.clientWidth;
    canvas.height = cesiumContainer.clientHeight;
    canvas2.width = cesiumContainer.clientWidth;
    canvas2.height = cesiumContainer.clientHeight;

    // Position the canvas overlay relative to the cesiumContainer
    const containerRect = cesiumContainer.getBoundingClientRect();
    canvas.style.position = 'absolute';
    canvas.style.top = `${containerRect.top}px`;
    canvas.style.left = `${containerRect.left}px`;
    canvas2.style.position = 'absolute';
    canvas2.style.top = `${containerRect.top}px`;
    canvas2.style.left = `${containerRect.left}px`;

    // Set the desired transparency
    const transparency = 0.1;
    context.fillStyle = `rgba(50, 0, 250, ${transparency})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

  }

  // Fetch OSM BuildingTileset
  async function fetchOSMBuildingTileset() {
    try {
      const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(osmBuildingsTileset);

      const location = "Auckland";
      startTraffic(viewer);
      fetchWeatherData(viewer, location, canvas, context);

      applyPostProcess();
      cameraHome(viewer);
      homePage(homeButtonNav);

      } catch (error) {
        console.log(`Error loading OSM tileset.\n${error}`);
      }
  };

  // Apply Post Processing effects
  function applyPostProcess(){
    
    const stages = viewer.scene.postProcessStages;
    const blackAndWhite = stages.add( Cesium.PostProcessStageLibrary.createBlackAndWhiteStage() );
    blackAndWhite.uniforms.gradations = 10.0;
  }

  // Get references to the buttons
  var homeButtonNav = document.getElementById("home-nav-Button");
  var aboutButtonNav = document.getElementById("about-nav-Button");
  var labButtonNav = document.getElementById("lab-nav-Button");
  var contactButtonNav = document.getElementById("contact-nav-Button");

  // Add event listeners to each button
  homeButtonNav.addEventListener("click", function() {
    const location = "Auckland";
    cameraHome(viewer);
    homePage(homeButtonNav, context, canvas);
    fetchWeatherData(viewer, location, canvas, context);
  });

  aboutButtonNav.addEventListener("click", function() {
    const location = "Palmerston North";
    cameraPalmy(viewer);
    aboutPage(aboutButtonNav, context, canvas, canvas2);
    fetchWeatherData(viewer, location, canvas, context);
  });

  labButtonNav.addEventListener("click", function() {
    const location = "National Park";
    cameraNationalPark(viewer);
    labPage(labButtonNav, context, canvas);
    fetchWeatherData(viewer, location, canvas, context);
  });

  contactButtonNav.addEventListener("click", function() {
    cameraSatellite(viewer);
    contactPage(contactButtonNav, context, canvas);
  });

  // Call the resizeOverlay function initially and on window resize
  window.addEventListener('resize', resizeOverlay);
  
  resizeOverlay();
  fetchOSMBuildingTileset();

} main();


































/* Code Snippets

const stages = viewer.scene.postProcessStages;
onst blackAndWhite = stages.add( Cesium.PostProcessStageLibrary.createBlackAndWhiteStage() );
blackAndWhite.uniforms.gradations = 5.0;

// Fetch Photorealistic 3D Tiles
  async function fetchPhotorealistic3DTiles() {
    try {
      const tileset = await Cesium.createGooglePhotorealistic3DTileset();
      viewer.scene.primitives.add(tileset);

      fetchWeatherData();
      startTraffic(viewer);

    } catch (error) {
      console.log(`Error loading Photorealistic 3D Tiles tileset.\n${error}`);
    }
  }

// Console log out cameras coordinates as well as HeadingPitchRoll in radians
  viewer.scene.postUpdate.addEventListener(function() {
  var camera = viewer.scene.camera;
  var headingPitchRoll = new Cesium.HeadingPitchRoll(camera.heading, camera.pitch, camera.roll);

  var ellipsoid = viewer.scene.globe.ellipsoid;

  var cartesian = camera.positionWC;
  var cartographic = ellipsoid.cartesianToCartographic(cartesian);
  
  var longitude = Cesium.Math.toDegrees(cartographic.longitude);
  var latitude = Cesium.Math.toDegrees(cartographic.latitude);

  console.log("Longitude: " + longitude + ", Latitude: " + latitude);
  console.log(headingPitchRoll);
});

function updatelayer(){

    const imageryLayers = viewer.imageryLayers;

    // Define your hardcoded values for the imagery layer parameters
    const hardcodedValues = {
      brightness: 0.96,
      contrast: 1.3,
      hue: 0,
      saturation: 0,
      gamma: 1.1,
    };
    
    // Set the initial values for the active imagery layer
    if (imageryLayers.length > 0) {
      const layer = imageryLayers.get(0);
      applyValuesToLayer(layer);
    }
    
    // Apply the hardcoded values to the imagery layer
    function applyValuesToLayer(layer) {
      layer.brightness = hardcodedValues.brightness;
      layer.contrast = hardcodedValues.contrast;
      layer.hue = hardcodedValues.hue;
      layer.saturation = hardcodedValues.saturation;
      layer.gamma = hardcodedValues.gamma;
    }
    
    // Update the imagery layer parameters when the active layer changes
    function updateLayerParameters() {
      if (imageryLayers.length > 0) {
        const layer = imageryLayers.get(0);
        applyValuesToLayer(layer);
      }
    }
    
    // Subscribe to layer events to update the imagery layer parameters
    imageryLayers.layerAdded.addEventListener(updateLayerParameters);
    imageryLayers.layerRemoved.addEventListener(updateLayerParameters);
    imageryLayers.layerMoved.addEventListener(updateLayerParameters);
    
  }

*/