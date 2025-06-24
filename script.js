// --- CORE LOGIC ---

let isPartyRunning = false;
let partyInterval = null;
let partyTimeout = null;
let randomFlashTimeoutId = null; // Holds the ID for the scheduled random flash

/**
 * Generates a random semi-transparent color at 80% opacity.
 * @returns {string} An rgba color string like 'rgba(255, 0, 0, 0.8)'.
 */
function getRandomColor() {
    const colors = [
        'rgba(255, 0, 0, 0.8)',   // Red
        'rgba(255, 255, 255, 0.8)', // White
        'rgba(0, 0, 0, 0.8)'       // Black
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Starts the flashing effect.
 * @param {string|null} forceMessage - Can be 'cloud', 'popper', 'both', or null for random.
 */
function startFlashing(forceMessage = null) {
    if (isPartyRunning) return;
    isPartyRunning = true;

    const partyTimeText = document.getElementById("partyTimeText");
    const buttonCluster = document.getElementById("buttonCluster");
    const flashOverlay = document.getElementById("flashOverlay");

    // --- TEXT SELECTION LOGIC ---
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
    // --- END TEXT SELECTION LOGIC ---

    buttonCluster.style.display = "none";
    flashOverlay.style.display = "block"; // Make the overlay visible

    // The main flashing interval
    partyInterval = setInterval(function() {
        // Change the background color of the overlay div
        flashOverlay.style.backgroundColor = getRandomColor();

        // Position the text randomly
        partyTimeText.style.display = "block";
        const maxX = window.innerWidth - partyTimeText.offsetWidth;
        const maxY = window.innerHeight - partyTimeText.offsetHeight;
        partyTimeText.style.left = Math.max(0, Math.random() * maxX) + "px";
        partyTimeText.style.top = Math.max(0, Math.random() * maxY) + "px";
    }, 200);

    // This timeout stops the effect
    partyTimeout = setTimeout(stopFlashing, 10000);
}

/**
 * Stops the flashing effect, restores the original state, and reschedules the random timer.
 */
function stopFlashing() {
    clearInterval(partyInterval);
    document.getElementById("flashOverlay").style.display = 'none'; // Hide the overlay
    document.getElementById("partyTimeText").style.display = "none";
    document.getElementById("buttonCluster").style.display = "block";
    isPartyRunning = false;

    // After any party stops, schedule the next random one.
    scheduleRandomFlash();
}

/**
 * Schedules the next random flash.
 */
function scheduleRandomFlash() {
    const nextFlash = Math.random() * 240000; // 0 to 4 minutes
    
    randomFlashTimeoutId = setTimeout(() => {
        if (Math.random() < 0.1) { // 10% chance for double flash
            startFlashing('both'); 
            setTimeout(() => {
                // Check if a party is still running from the first flash before starting the second
                if(isPartyRunning) startFlashing('both');
            }, 10500);
        } else {
            startFlashing(); // Normal single flash
        }
    }, nextFlash);
}

// --- EVENT LISTENERS ---
function handleManualTrigger(message) {
    // Don't allow clicks while a party is running
    if (isPartyRunning) return;

    // Cancel the pending random flash.
    clearTimeout(randomFlashTimeoutId);

    // Start the user-triggered flash immediately.
    startFlashing(message);
}

document.getElementById('bangButton').addEventListener('click', () => handleManualTrigger(null));
document.getElementById('cButton').addEventListener('click', () => handleManualTrigger('cloud'));
document.getElementById('pButton').addEventListener('click', () => handleManualTrigger('popper'));

// Start the random flash scheduler on page load
window.onload = scheduleRandomFlash;
