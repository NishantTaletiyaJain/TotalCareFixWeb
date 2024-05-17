function loadLanding() {
    // Create style element
    var style = document.createElement('style');
    style.textContent = `
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        #content {
            position: relative;
            height: 100%;
        }

        #landing {
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url("./images/landingpage.jpg");
            background-size: cover;
            background-position: center;
        }

        .overlay {
            color: #fff;
            text-align: right;
            padding: 3vw;
        }

        .overlay h1 {
            font-size: 4vw;
            margin: 0;
            color: #ff7f0e; /* Orange color for the title */
        }

        .overlay p {
            font-size: 2.5vw;
            margin: 1.5vh 0;
        }

        .overlay button {
            padding: 1.5vh 3vw;
            font-size: 2.5vw;
            margin: 1.5vh 0;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        .overlay button:hover {
            background-color: #555;
        }

        @media screen and (min-width: 768px) {
            .overlay {
                padding: 5%;
            }

            .overlay h1 {
                font-size: 2em;
            }

            .overlay p {
                font-size: 1.25em;
            }

            .overlay button {
                padding: 1em 2em;
                font-size: 1.25em;
                margin: 1em;
            }
        }
    `;
    // Append style element to head
    var landingSection = document.getElementById('content');
    landingSection.innerHTML=''
    document.head.appendChild(style);

    // Create section element
    var section = document.createElement('section');
    section.id = 'landing';
    section.className = 'content';

    // Create overlay div
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';

    // Create h1 element for title
    var title = document.createElement('h1');
    title.textContent = 'Welcome to TotalCareFix';
    overlayDiv.appendChild(title);

    // Create p element for description
    var description = document.createElement('p');
    description.textContent = 'Your Trusted Destination for Home Appliance Solutions';
    overlayDiv.appendChild(description);

    // Create button elements
    var userButton = document.createElement('button');
    userButton.textContent = 'User Dashboard';
    userButton.onclick = loadUserDashboard; // Assign the function directly
    overlayDiv.appendChild(userButton);

    var technicianButton = document.createElement('button');
    technicianButton.textContent = 'Technician Dashboard';
    technicianButton.onclick=createSinglePageApp;
    overlayDiv.appendChild(technicianButton);

    // Append overlayDiv to section
    section.appendChild(overlayDiv);

    // Append section to landingSection
    var landingSection = document.getElementById('content');
    landingSection.appendChild(section);
}