function colourOverlay(context, canvas) {
  console.log("inside colourOverlay");
  const transparency = 0.1;
  context.fillStyle = `rgba(50, 0, 250, ${transparency})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas(context, canvas) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function aboutPage(aboutButtonNav, context, canvas) {

  clearCanvas(context, canvas);
  colourOverlay(context, canvas);

  // Get the contact form container
  const aboutContainer = document.getElementById('aboutContainer');
  const logoContainer = document.getElementById('logoContainer');

  if (aboutContainer.classList.contains('visible')) {
    return; // Return early if already on the about page
  }

  if (logoContainer.classList.contains('visible')) {
    return; // Return early if already on the about page
  }

  const buttons = document.querySelectorAll('button'); // Get all buttons on the page

  // Define the body copy for the aboutContainer
  const text = "• Immersive Technologies/ • Virtual Reality/ • Augmented Reality/ • 3D animation/ • Special Effects/ • Motion Graphics/ • Geospatial Technology/ • Physically Based Rendering/ • Graphic Design/ • Illustration/ • Photogrammetry/ • Programming/ • Front End Web Design/ • WebGPU/ • ChatGPT";

  const aboutBlurb = document.getElementById('AboutBlurb');
  let index = 0;
  aboutBlurb.innerHTML = "";

  function aboutEffect(aboutButtonNav) {
    const currentChar = text[index];
    let html;

    if (currentChar === '/') {
      html = '<br>';
    } else {
      html = currentChar;
    }

    aboutBlurb.innerHTML += html;
    index++;

    if (index < text.length) {
      setTimeout(aboutEffect, 20);
    } else {
      // Enable other buttons when the text effect is completed
      buttons.forEach(button => {
        if (button !== aboutButtonNav) {
          button.disabled = false;
        }
      });
    }
  }

  aboutContainer.classList.toggle('visible');
  logoContainer.classList.toggle('visible');
  aboutButtonNav.style.color = 'orange';

  // Add click event listener to all buttons except the contact button
  buttons.forEach(button => {
    if (button !== aboutButtonNav) {
      button.addEventListener('click', () => {
        aboutContainer.classList.remove('visible');
        logoContainer.classList.remove('visible');
        aboutButtonNav.style.color = 'rgb(82, 81, 81)';
        aboutBlurb.innerHTML = "";
      });
    }
  });

  // Reset index to 0 when the homePage function is called
  index = 0;
  
  aboutEffect();

}




