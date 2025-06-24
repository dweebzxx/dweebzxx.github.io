let isPartyRunning = false;
let partyInterval = null;
let partyTimeout = null;
let randomFlashTimeoutId = null;

function getRandomColor() {
    const colors = ['rgba(255, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function startFlashing(forceMessage = null) {
    if (isPartyRunning) return;
    isPartyRunning = true;

    const partyTimeText = document.getElementById("partyTimeText");
    const buttonCluster = document.getElementById("buttonCluster");
    const flashOverlay = document.getElementById("flashOverlay");

    partyTimeText.style.fontSize = window.innerWidth <= 640 ? '4rem' : '6rem';
    partyTimeText.innerHTML = '';
    
    if (forceMessage === 'cloud') {
        partyTimeText.textContent = "Let's Cloud!";
    } else if (forceMessage === 'popper') {
        partyTimeText.textContent = "Popper Up!";
    } else if (forceMessage === 'both') {
        partyTimeText.innerHTML = "Let's Cloud!<br>Popper Up!";
        partyTimeText.style.fontSize = window.innerWidth <= 640 ? '3rem' : '4.5rem';
    } else {
        const randomNumber = Math.random();
        if (randomNumber < 0.7) {
            partyTimeText.textContent = "Let's Cloud!";
        } else {
            partyTimeText.textContent = "Popper Up!";
        }
    }

    buttonCluster.style.display = "none";
    flashOverlay.style.display = "block";

    partyInterval = setInterval(function() {
        flashOverlay.style.backgroundColor = getRandomColor();
        partyTimeText.style.display = "block";
        const maxX = window.innerWidth - partyTimeText.offsetWidth;
        const maxY = window.innerHeight - partyTimeText.offsetHeight;
        partyTimeText.style.left = Math.max(0, Math.random() * maxX) + "px";
        partyTimeText.style.top = Math.max(0, Math.random() * maxY) + "px";
    }, 200);

    partyTimeout = setTimeout(stopFlashing, 10000);
}

function stopFlashing() {
    clearInterval(partyInterval);
    document.getElementById("flashOverlay").style.display = 'none';
    document.getElementById("partyTimeText").style.display = "none";
    document.getElementById("buttonCluster").style.display = "block";
    isPartyRunning = false;
    scheduleRandomFlash();
}

function scheduleRandomFlash() {
    const nextFlash = Math.random() * 240000;
    randomFlashTimeoutId = setTimeout(() => {
        if (Math.random() < 0.1) {
            startFlashing('both'); 
            setTimeout(() => { if(isPartyRunning) startFlashing('both'); }, 10500);
        } else {
            startFlashing();
        }
    }, nextFlash);
}

function handleManualTrigger(message) {
    if (isPartyRunning) return;
    clearTimeout(randomFlashTimeoutId);
    startFlashing(message);
}

document.getElementById('bangButton').addEventListener('click', () => handleManualTrigger(null));
document.getElementById('cButton').addEventListener('click', () => handleManualTrigger('cloud'));
document.getElementById('pButton').addEventListener('click', () => handleManualTrigger('popper'));

window.onload = scheduleRandomFlash;
