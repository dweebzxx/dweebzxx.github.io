
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startFlashing() {
    let partyTimeText = document.getElementById("partyTimeText");
    let background = document.getElementById("background");

    let interval = setInterval(function() {
        background.style.background = getRandomColor();
        partyTimeText.style.display = "block";
        partyTimeText.style.position = "absolute";
        partyTimeText.style.left = Math.random() * (window.innerWidth - partyTimeText.offsetWidth) + "px";
        partyTimeText.style.top = Math.random() * (window.innerHeight - partyTimeText.offsetHeight) + "px";
    }, 200); // Adjust for text speed

    setTimeout(function() {
        clearInterval(interval);
        background.style.background = 'url("https://i.imgur.com/8vAlRXz.png") no-repeat center center fixed';
        background.style.backgroundSize = 'cover';
        partyTimeText.style.display = "none";
    }, 10000); // Stop after 10 seconds
}

function randomFlash() {
    let nextFlash = Math.random() * 120000; // Random time within 2 minutes
    setTimeout(function() {
        startFlashing();
        randomFlash(); // Schedule the next flash
    }, nextFlash);
}

randomFlash(); // Initialize the flashing effect
