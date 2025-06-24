# slam rush

An interactive and dynamic web page that creates a surprise "party" effect with flashing colors, moving text, and user-triggered events.

**By:** dweebz

## Description

This project is a single-page web application built with HTML, CSS, and vanilla JavaScript. It displays a static background image which, at random intervals or through user interaction, is overlaid with a fun, high-energy flashing effect. The effect includes a semi-transparent color overlay, moving text with a custom font, and several layers of randomization to keep the experience unexpected.

## Features

  * **Interactive Buttons:** Three distinct, clickable buttons are positioned on the page:
      * **`!` Button:** Triggers a standard, randomized flash event.
      * **`P` Button:** Forces the "Popper Up\!" message to display during the flash.
      * **`C` Button:** Forces the "Let's Cloud\!" message to display during the flash.
  * **Flashing Overlay:** Instead of changing the background itself, the effect uses a dedicated overlay `div`. This ensures the main background image remains visible at 100% opacity, while a semi-transparent (80% opacity) color flashes on top of it.
  * **Dynamic Text:**
      * The flash event displays one of two messages: "Let's Cloud\!" or "Popper Up\!".
      * The messages appear with a 70/30 probability, respectively.
      * The font ("Bangers") is styled to match the theme of the background image.
  * **Random Automatic Events:**
      * The flash effect triggers automatically at random intervals, averaging once every **4 minutes**.
      * **Double-Flash Chance:** There is a 10% chance that a random trigger will result in two 10-second flashes back-to-back.
      * **Combined Message:** During a double-flash, both messages are displayed simultaneously.
  * **Smart Timer Reset:** Manually clicking any of the buttons will instantly cancel the pending random flash timer and restart it after the user-triggered flash completes. This prioritizes user interaction.

## Dependencies

  * [Tailwind CSS](https://tailwindcss.com/)
  * [Google Fonts](https://fonts.google.com/) (Bangers, Inter)

## How to Set Up

To run this project, you need three files: `index.html`, `style.css`, and `script.js`.

### File Structure

```
/
|-- index.html
|-- style.css
`-- script.js
```

### 1\. `index.html`

Create an `index.html` file and paste the following code into it.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slam Rush</title>
    <!-- External Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <!-- Link to your custom stylesheet -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="flashOverlay"></div>
    <h1 id="partyTimeText"></h1>
    <div id="buttonCluster">
        <button id="bangButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">!</button>
        <button id="pButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">P</button>
        <button id="cButton" class="control-button bg-red-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg">C</button>
    </div>
    <!-- Link to your JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```

### 2\. `style.css`

Create a `style.css` file and add the following styles.

```css
body {
    font-family: 'Inter', sans-serif;
    background: url("https://i.imgur.com/8vAlRXz.png") no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
}

#flashOverlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: none;
    pointer-events: none;
    z-index: 998;
}

#partyTimeText {
    font-family: 'Bangers', cursive;
    font-size: 6rem;
    color: white;
    text-align: center;
    text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 4px 4px 5px rgba(0,0,0,0.5);
    display: none; 
    user-select: none;
    pointer-events: none;
    -webkit-text-stroke: 2px black;
    paint-order: stroke fill;
    position: absolute;
    z-index: 1000;
}

#buttonCluster {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 999;
}

.control-button {
    position: absolute;
    pointer-events: auto;
    width: 56px; height: 56px;
    font-size: 1.875rem; line-height: 2.25rem;
    transition: transform 0.2s ease-in-out;
}
.control-button:hover { transform: scale(1.1); }

#bangButton { top: 48%; left: 50%; transform: translate(-50%, -50%); }
#pButton { top: 75%; left: 15%; transform: translate(-50%, -50%); }
#cButton { top: 75%; left: 85%; transform: translate(-50%, -50%); }

@media (max-width: 640px) {
    #partyTimeText { font-size: 4rem; }
    .control-button { width: 48px; height: 48px; font-size: 1.5rem; }
    #pButton { top: 80%; left: 12%; }
    #cButton { top: 80%; left: 88%; }
}
```

### 3\. `script.js`

Create a `script.js` file and paste the JavaScript code into it.

```javascript
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
```

## Future Ideas

  * **Sound Effects:** Add a short "pop" or "whoosh" sound when the flash begins.
  * **Screen Shake:** Implement a subtle screen shake effect for added intensity.
  * **Super Rare Event:** Create a "jackpot" flash with unique colors and messages (e.g., 1% chance).

## License

This project is licensed under the MIT License.
