slam rush
An interactive and dynamic web page that creates a surprise "party" effect with flashing colors, moving text, and user-triggered events.

Description
This project is a single-page web application built with HTML, CSS, and vanilla JavaScript. It displays a static background image which, at random intervals or through user interaction, is overlaid with a fun, high-energy flashing effect. The effect includes a semi-transparent color overlay, moving text with a custom font, and several layers of randomization to keep the experience unexpected.

Features
Interactive Buttons: Three distinct, clickable buttons are positioned on the page:

! Button: Triggers a standard, randomized flash event.

P Button: Forces the "Popper Up!" message to display during the flash.

C Button: Forces the "Let's Cloud!" message to display during the flash.

Flashing Overlay: Instead of changing the background itself, the effect uses a dedicated overlay div. This ensures the main background image remains visible at 100% opacity, while a semi-transparent (80% opacity) color flashes on top of it.

Dynamic Text:

The flash event displays one of two messages: "Let's Cloud!" or "Popper Up!".

The messages appear with a 70/30 probability, respectively.

The font ("Bangers") is styled to match the theme of the background image.

Random Automatic Events:

The flash effect triggers automatically at random intervals, averaging once every 4 minutes.

Double-Flash Chance: There is a 10% chance that a random trigger will result in two 10-second flashes back-to-back.

Combined Message: During a double-flash, both messages are displayed simultaneously.

Smart Timer Reset: Manually clicking any of the buttons will instantly cancel the pending random flash timer and restart it after the user-triggered flash completes. This prioritizes user interaction.

How to Set Up
To run this project, you need three files: index.html, style.css, and script.js.

File Structure
/
|-- index.html
|-- style.css
`-- script.js

1. index.html
Create an index.html file and paste the following code into it. This file sets up the basic structure, links the stylesheet and script, and includes the necessary HTML elements like the overlay and buttons.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Party Time Flasher</title>
    <!-- External Libraries -->
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
    <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
    <link href="[https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&display=swap)" rel="stylesheet">
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

2. style.css
Create a style.css file and add the following styles. This file controls the appearance of the page, including the main background, the overlay, the text, and the buttons.

body {
    font-family: 'Inter', sans-serif;
    background: url("https://i.
