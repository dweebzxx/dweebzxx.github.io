<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Party Time Flasher</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Import the "Bangers" font for the flash text and "Inter" for UI -->
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        /* Custom styles for the page */
        body {
            font-family: 'Inter', sans-serif;
            /* The main background is now set here and never changed by JavaScript */
            background: url("https://i.imgur.com/8vAlRXz.png") no-repeat center center fixed;
            background-size: cover;
            overflow: hidden; /* Prevent scrollbars */
        }

        /* NEW: A dedicated overlay for the flashing effect */
        #flashOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: none; /* Hidden by default */
            pointer-events: none; /* Clicks go through the overlay */
            z-index: 998; /* Sits below buttons and text but above everything else */
        }

        #partyTimeText {
            font-family: 'Bangers', cursive;
            font-size: 6rem;
            color: white;
            text-align: center;
            text-shadow: 
                -3px -3px 0 #000, 3px -3px 0 #000,
                -3px 3px 0 #000, 3px 3px 0 #000,
                4px 4px 5px rgba(0,0,0,0.5);
            display: none; 
            user-select: none;
            pointer-events: none;
            -webkit-text-stroke: 2px black;
            paint-order: stroke fill;
            position: absolute; /* Needed for random positioning */
            z-index: 1000; /* Must be on top of the flash overlay */
        }

        #buttonCluster {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999; /* On top of the overlay */
        }
        
        .control-button {
            position: absolute;
            pointer-events: auto;
            width: 56px;
            height: 56px;
            font-size: 1.875rem;
            line-height: 2.25rem;
            transition: transform 0.2s ease-in-out;
        }
        .control-button:hover {
            transform: scale(1.1);
        }

        /* Positioning of buttons */
        #bangButton { top: 48%; left: 50%; transform: translate(-50%, -50%); }
        #pButton { top: 85%; left: 15%; transform: translate(-50%, -50%); }
        #cButton { top: 85%; left: 85%; transform: translate(-50%, -50%); }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
            #partyTimeText { font-size: 4rem; }
            .control-button { width: 48px; height: 48px; font-size: 1.5rem; }
            #pButton { top: 88%; left: 12%; }
            #cButton { top: 88%; left: 88%; }
        }
    </style>
</head>
<body>

    <!-- This overlay is now used for the flashing colors -->
    <div id="flashOverlay"></div>

    <!-- This text will appear and move during the flashing effect -->
    <h1 id="partyTimeText"></h1>

    <!-- This container holds the buttons -->
    <div id="buttonCluster">
        <button id="bangButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">!</button>
        <button id="pButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">P</button>
        <button id="cButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">C</button>
    </div>


    <script>
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

            // NEW: After any party stops, schedule the next random one.
            scheduleRandomFlash();
        }

        /**
         * Schedules the next random flash. The recursive call is now gone.
         */
        function scheduleRandomFlash() {
            const nextFlash = Math.random() * 240000; // 0 to 4 minutes
            
            // This function is now only responsible for setting the timer for the next event.
            randomFlashTimeoutId = setTimeout(() => {
                if (Math.random() < 0.1) { // 10% chance for double flash
                    startFlashing('both'); 
                    setTimeout(() => startFlashing('both'), 10500); // Schedule the second part of the double flash
                } else {
                    startFlashing(); // Normal single flash
                }
            }, nextFlash);
        }

        // --- EVENT LISTENERS ---
        function handleManualTrigger(message) {
            // Don't allow clicks while a party is running
            if (isPartyRunning) return;

            // NEW: Cancel the pending random flash.
            clearTimeout(randomFlashTimeoutId);

            // Start the user-triggered flash immediately.
            startFlashing(message);
        }

        document.getElementById('bangButton').addEventListener('click', () => handleManualTrigger(null));
        document.getElementById('cButton').addEventListener('click', () => handleManualTrigger('cloud'));
        document.getElementById('pButton').addEventListener('click', () => handleManualTrigger('popper'));

        // Start the random flash scheduler on page load
        window.onload = scheduleRandomFlash;
    </script>

</body>
</html>
