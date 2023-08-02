function colourOverlay(context, canvas) {
  console.log("inside colourOverlay");
  const transparency = 0.1;
  context.fillStyle = `rgba(50, 0, 250, ${transparency})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function contactPage(contactButtonNav, context, canvas) {

  clearCanvas(context, canvas);
  colourOverlay(context, canvas);

  const contactFormContainer = document.getElementById('contactFormContainer');

  if (contactFormContainer.classList.contains('visible')) {
    return; // Return early if already on the contact page
  }

  const buttons = document.querySelectorAll('button');
  const formButton = document.querySelectorAll('sendButton');

  contactFormContainer.classList.add('visible');
  contactButtonNav.style.color = 'orange';

  // Remove the click event listener from the contact button
  contactButtonNav.removeEventListener('click', contactButtonClick);

  // Add click event listener to all other buttons
  buttons.forEach(button => {
    if (button !== contactButtonNav) {
      button.addEventListener('click', () => {
        // Skip removal if the clicked button is the send button
        if (button.id !== 'sendButton') {
          contactFormContainer.classList.remove('visible');
          contactButtonNav.style.color = 'rgb(82, 81, 81)';
        }
      });
    }
  });
  

  // Form mechanics
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Simple validation
    if (name === '' || email === '' || message === '') {
      alert('Please fill in all fields');
      return;
    }

    // Display success message
    var successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'I will be in touch soon, thanks ' + name + '!';
    successMessage.style.display = 'block';

    // Clear form inputs
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  });

  // Function to handle the click event on the contact button
  function contactButtonClick() {
    contactButton.style.color = 'orange';
  }

  // Add the modified click event listener to the contact button
  contactButtonNav.addEventListener('click', contactButtonClick);
}

function clearCanvas(context, canvas) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Additional clearing logic for other effects
  // Clear rain
  raindrops.length = 0;

  // Clear clouds
  //viewer.scene.primitives.removeAll();

  // Clear snow
  snowflakes.length = 0;

  // Clear pellets
  pellets.length = 0;
}
