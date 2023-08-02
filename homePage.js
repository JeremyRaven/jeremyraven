function clearCanvas(context, canvas) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
function homePage(homeButton, context, canvas) {

  clearCanvas(context, canvas);

  const homeContainer = document.getElementById('homeContainer');

  if (homeContainer.classList.contains('HomeVisible')) {
    return; // Return early if already on the homepage
  }

  const buttons = document.querySelectorAll('button');

  homeContainer.classList.toggle('HomeVisible');
  homeButton.style.color = 'orange';

  // Disable other buttons while the text effect is ongoing
  buttons.forEach(button => {
    if (button !== homeButton) {
      button.disabled = true;
    }
  });

  const text = "Geospatial 3D rendered globe with realtime weather data, keyframed vehicle animation/ and particle effects.";
  const homeBlurb = document.getElementById('HomeBlurb');
  let index = 0;
  homeBlurb.innerHTML = "";

  function typeEffect() {
    const currentChar = text[index];
    let html;

    if (currentChar === '3' || currentChar === 'D') {
      html = '<span class="orange">' + currentChar + '</span>';
    } else if (currentChar === '/') {
      html = '<br>';
    } else {
      html = currentChar;
    }

    homeBlurb.innerHTML += html;
    index++;

    if (index < text.length) {
      setTimeout(typeEffect, 20);
    } else {
      // Enable other buttons when the text effect is completed
      buttons.forEach(button => {
        if (button !== homeButton) {
          button.disabled = false;
          
        }
      });

      // Fade in the mouseImage and techUsed elements
      const mouseImage = document.getElementById('mouseImage');
      const techUsed = document.getElementById('techUsed');
      mouseImage.classList.add('fade-in');
      techUsed.classList.add('fade-in');
    }
  }

  function buttonClickHandler() {
    homeContainer.classList.remove('HomeVisible');
    homeButton.style.color = `rgb(82, 81, 81, 1.0)`;
    homeBlurb.innerHTML = "";
  }

  // Reset index to 0 when the homePage function is called
  index = 0;

  typeEffect();

  // Add event listeners back to buttons after the text effect is completed
  setTimeout(() => {
    buttons.forEach(button => {
      if (button !== homeButton) {
        button.addEventListener('click', buttonClickHandler);
      }
    });
  }, 50 * text.length); // Delay the addition of event listeners by the length of the text effect

  // Event listener for mouse wheel scrolling
  window.addEventListener('wheel', handleMouseWheel);

  function handleMouseWheel(event) {
    const deltaY = event.deltaY;

    // Check if the middle mouse wheel is scrolled up or down
    if (deltaY < 0 || deltaY > 0) {
      homeContainer.classList.remove('HomeVisible');
      homeBlurb.innerHTML = "";

      // Remove the event listener after the homeContainer is faded away
      window.removeEventListener('wheel', handleMouseWheel);
    }
  }
}

