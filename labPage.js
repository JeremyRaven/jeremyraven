function colourOverlay(context, canvas) {
  const transparency = 0.1;
  context.fillStyle = `rgba(50, 0, 250, ${transparency})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas(context, canvas) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function labPage(labButtonNav, context, canvas) {

  clearCanvas(context, canvas);
  colourOverlay(context, canvas);

  const labContainer = document.getElementById('labContainer'); // Get the labContainer

  if (labContainer.classList.contains('visible')) {
    return; // Return early if already on the lab page
  }

  labContainer.classList.toggle('visible');
  labButtonNav.style.color = 'orange';

  const selectedButton = document.querySelector('.labButtons.highlighted'); // Get the selected lab button

  // Get the display ID based on the selected lab button's index
  let displayId;

  if (selectedButton) {
    displayId = selectedButton.getAttribute('data-display-id');
  }

  if (displayId) {
    showImageDisplay(displayId); // Show the corresponding image display
  }

  const buttons = document.querySelectorAll('button'); // Get all buttons on the page
  const navBarButtons = document.querySelectorAll('.lab-nav-button'); // Get the nav bar buttons

  // Add click event listener to all buttons except the lab nav button and lab buttons
  buttons.forEach(button => {
    if (button !== labButtonNav) {
      if (!button.classList.contains('labButtons')) {
        button.addEventListener('click', () => {
          labContainer.classList.remove('visible');
          labButtonNav.style.color = 'rgb(82, 81, 81)';
      });
    }
  }});

  // Add click event listeners to each nav bar button
  navBarButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove the 'highlighted' class from all nav bar buttons
      navBarButtons.forEach(btn => {
        btn.classList.remove('highlighted');
      });
      // Add the 'highlighted' class to the clicked nav bar button
      button.classList.add('highlighted');
    });
  });
}

function showImageDisplay(displayId) {
  // Get all image display elements
  const imageDisplays = document.querySelectorAll('.imageDisplay');

  // Hide all image display elements
  imageDisplays.forEach(display => {
    display.style.display = 'none';
  });

  // Show the selected image display element
  const selectedDisplay = document.getElementById(displayId);
  if (selectedDisplay) {
    selectedDisplay.style.display = 'block';
  }
}

// Get the LabContainer buttons
const labContainerButtons = document.querySelectorAll('.labButtons');


// Add click event listeners to each LabContainer button
labContainerButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the 'highlighted' class from all LabContainer buttons
    labContainerButtons.forEach(btn => {
      btn.classList.remove('highlighted');
    });

    // Add the 'highlighted' class to the clicked LabContainer button
    button.classList.add('highlighted');

    // Get the display ID from the data attribute
    const displayId = button.getAttribute('data-display-id');

    // Show the corresponding image display
    if (displayId) {
      showImageDisplay(displayId);
    }
  });
});

const images = document.querySelectorAll('.imageDisplay img');
const videoSource = document.querySelector('#portfolioWindow video source');
const portfolio = document.getElementById('portfolioWindow');


images.forEach(image => {
  image.addEventListener('click', () => {

    if (image.alt === 'Image 1') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 2') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 3') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 4') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 5') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 6') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 7') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 8') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 9') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 10') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 11') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    } else if (image.alt === 'Image 12') {
      videoSource.src = './movies/Abstract_Animated.mp4';
    }

    // Reload the video for the changes to take effect
    const video = document.querySelector('#portfolioWindow video');
    video.load();

    if (portfolio.classList.contains('visible')) {
      return; // Return early if already on the lab page
    }
    portfolio.classList.toggle('visible');


  });
});
