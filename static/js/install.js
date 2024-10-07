let isTooSoon = true;
let deferredPrompt;

document.getElementById('login-link').addEventListener('click', function() {
  isTooSoon = false;
});

window.addEventListener('beforeinstallprompt', (event) => {
  // If it's too soon, don't show the prompt.
  if (isTooSoon) {
    event.preventDefault();
    isTooSoon = false;
    deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";

    // Hide snackbar after 7 seconds
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 15000);
  }
});

// Installation must be done by a user gesture. Here, the install button provides this.
document.getElementById('install-btn').addEventListener('click', (e) => {
  // Hide our user interface that shows our Install button
  var snackbar = document.getElementById("snackbar");
  snackbar.className = "";
  
  // Show the prompt if it's available
  if (deferredPrompt) {
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
});
