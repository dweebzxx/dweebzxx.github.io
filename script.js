function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function movePartyTimeText() {
    const text = document.getElementById("partyTimeText");
    text.style.top = `${getRandomInt(window.innerHeight - text.offsetHeight)}px`;
    text.style.left = `${getRandomInt(window.innerWidth - text.offsetWidth)}px`;
}

function startPartyTime() {
    const background = document.getElementById("background");
    const text = document.getElementById("partyTimeText");

    background.style.background = "none";
    text.style.display = "block";
    background.classList.add("flash");

    movePartyTimeText();
    navigator.vibrate(200); // Vibrate for 200 milliseconds

    setTimeout(() => {
        background.style.backgroundImage = "url('https://i.imgur.com/8vAlRXz.png')";
        text.style.display = "none";
        background.classList.remove("flash");
    }, 10000); // Stop after 10 seconds
}

setInterval(() => {
    // Start Party Time at a random time within each 3-minute interval
    setTimeout(startPartyTime, getRandomInt(180000)); // 180000 milliseconds = 3 minutes
}, 180000);