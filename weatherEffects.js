
const raindrops = [];
const snowflakes = [];
const pellets = [];

// Rain Maker
function rain(canvas, context, amount){

context.clearRect(0, 0, canvas.width, canvas.height);

class Raindrop {
  constructor(x, y, speed, length) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.length = length;
  }

  update() {
    this.y += this.speed;

    if (this.y > canvas.height) {
      this.y = -this.length;
    }
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.strokeStyle = 'white';
    context.lineWidth = 1;
    context.stroke();
  }
} // End of class



// Generate random raindrops
for (let i = 0; i < amount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speed = Math.random() * 5 + 2;
  const length = Math.random() * 20 + 10;

  raindrops.push(new Raindrop(x, y, speed, length));
}

function updateRain() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const raindrop of raindrops) {
    raindrop.update();
    raindrop.draw();
  }
  
  requestAnimationFrame(updateRain);
}

updateRain();
}


// Cloud maker
function createClouds(viewer, numClouds, minHeight, maxHeight, sliceMin, sliceMax, scale, direction, location)
{

  var startLong = 0;
  var stopLong = 0;
  var startLat = 0;
  var stopLat = 0;
  var numClouds = numClouds;
  var minHeight = minHeight;
  var maxHeight = maxHeight;
  var scale = scale;
  var viewer = viewer;
  var direction = direction;
  var location = location;

  if(location === "Auckland"){
    var startLong = 174.75372979524577;
    var stopLong = 174.79473979524577;
    var startLat = -36.83086070506446;
    var stopLat = -36.88587050506446;
  }else if(location === "Palmerston North"){
    var startLong = 175.5798524064883;  
    var stopLong = 175.6320369225632;   
    var startLat = -40.31892566926976;
    var stopLat = -40.37663438103406;
  }else{
    var startLong = 170.04920684834466; 
    var stopLong = 170.45760684834466;
    var startLat = -43.5340077907548;
    var stopLat = -43.78170077907548;
    minHeight = 1500;
    maxHeight = 2000;
    scale = 12;
  }

  const clouds = new Cesium.CloudCollection();
  const rangeLong = stopLong - startLong;
  const rangeLat = stopLat - startLat;
      
  for (let i = 0; i < numClouds; i++) {
    long = startLong + getRandomNumberInRange(0, rangeLong);
    lat = startLat + getRandomNumberInRange(0, rangeLat);
    height = getRandomNumberInRange(minHeight, maxHeight);
    var scaleX = getRandomNumberInRange(150, 350)*scale;
    var scaleY = scaleX / 2.0 - getRandomNumberInRange(0, scaleX / 4.0);
    slice = getRandomNumberInRange(sliceMin, sliceMax);  //slice = getRandomNumberInRange(0.3, 0.7);
    depth = getRandomNumberInRange(5, 20);
    aspectRatio = getRandomNumberInRange(1.5, 2.1);
    cloudHeight = getRandomNumberInRange(5, 20);
    
    clouds.add({
      position: Cesium.Cartesian3.fromDegrees(long, lat, height),
      scale: new Cesium.Cartesian2(scaleX, scaleY),
      maximumSize: new Cesium.Cartesian3(
        aspectRatio * cloudHeight,
        cloudHeight,
        depth
      ),
      slice: slice,
    });
  }
  viewer.scene.primitives.add(clouds);
}

  function getRandomNumberInRange(minValue, maxValue) {
    return (
      minValue + Cesium.Math.nextRandomNumber() * (maxValue - minValue)
    );
}

// Snow Maker
function snow(canvas, context, amount) {

  context.clearRect(0, 0, canvas.width, canvas.height);

  class Snow {
    constructor(x, y, speed, length) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.length = length;
      this.rotation = 0; // Added rotation property
      this.rotationSpeed = Math.random() * 0.2 - 0.1; // Random rotation speed
      this.size = getRandomNumberInRange(5, 15);
    }

    update() {
      this.y += this.speed;
      this.rotation += this.rotationSpeed; // Update rotation

      if (this.y > canvas.height) {
        this.y = -this.length;
      }
    }

    draw() {

      //console.log("inside Draw method");
      const spriteSize = this.size;
      const spriteImage = new Image();
      spriteImage.src = './images/snowflake.png'; // Path to your snowflake sprite image

      context.save(); // Save the current transformation state
      context.translate(this.x + spriteSize / 2, this.y + spriteSize / 2); // Translate to the center of the snowflake
      context.rotate(this.rotation); // Apply rotation transformation
      context.drawImage(spriteImage, -spriteSize / 2, -spriteSize / 2, spriteSize, spriteSize); // Draw the snowflake
      context.restore(); // Restore the previous transformation state

    }
  }


  // Generate random snowflakes
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 1.5 + 1;
    const length = Math.random() * 20 + 10;

    snowflakes.push(new Snow(x, y, speed, length));
  }

  function updateSnow() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const snowflake of snowflakes) {
      snowflake.update();
      snowflake.draw();
    }

    requestAnimationFrame(updateSnow);
  }

  updateSnow();
}



function makePellets(canvas, context, amount) {

  context.clearRect(0, 0, canvas.width, canvas.height);

  class Pellet {
    constructor(x, y, speed, length) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.length = length;
      this.size = getRandomNumberInRange(1, 3);
    }

    update() {
      this.y += this.speed;

      if (this.y > canvas.height) {
        this.y = -this.length;
      }
    }

    draw() {
      const radius = this.size; // Adjust the radius of the raindrop circles
      context.beginPath();
      context.arc(this.x, this.y, radius, 0, 2 * Math.PI); // Draw a circle at (x, y) with the specified radius
      context.fillStyle = 'white';
      context.fill();
    }
  }


  // Generate random raindrops
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 2;
    const length = Math.random() * 20 + 10;

    pellets.push(new Pellet(x, y, speed, length));
  }

  function updatePellet() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const pellet of pellets) {
      pellet.update();
      pellet.draw();
    }

    requestAnimationFrame(updatePellet);
  }

  updatePellet();
}


/*

// Snow Maker
function snow(canvas, context, amount) {

  console.log("Inside Snow")

  class Snow {
    constructor(x, y, speed, length) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.length = length;
      this.rotation = 0; // Added rotation property
      this.rotationSpeed = Math.random() * 0.2 - 0.1; // Random rotation speed
      this.size = getRandomNumberInRange(10, 20);
    }

    update() {
      this.y += this.speed;
      this.rotation += this.rotationSpeed; // Update rotation

      if (this.y > canvas.height) {
        this.y = -this.length;
      }
    }

    draw() {
      const spriteSize = this.size;
      const spriteImage = new Image();
      spriteImage.src = './images/snowflake.png'; // Path to your snowflake sprite image

      context.save(); // Save the current transformation state
      context.translate(this.x + spriteSize / 2, this.y + spriteSize / 2); // Translate to the center of the snowflake
      context.rotate(this.rotation); // Apply rotation transformation
      context.drawImage(spriteImage, -spriteSize / 2, -spriteSize / 2, spriteSize, spriteSize); // Draw the snowflake
      context.restore(); // Restore the previous transformation state
    }
  }

  const snowflakes = [];

  // Generate random snowflakes
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 1.5 + 1;
    const length = Math.random() * 20 + 10;

    snowflakes.push(new Snow(x, y, speed, length));
  }

  function updateSnow() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const snowflake of snowflakes) {
      snowflake.update();
      snowflake.draw();
    }

    requestAnimationFrame(updateSnow);
  }

  updateSnow();
}

*/