function loadLanding() {
    // Clear existing styles related to home page
    var existingStyle = document.getElementById('homeStyle');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create and append style element for landing page
    var style = document.createElement('style');
    style.id = 'landingStyle'; // Assign an ID for future reference/removal
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
    document.head.appendChild(style);

    // Clear and populate landing section
    var landingSection = document.getElementById('content');
    landingSection.innerHTML = '';

    var section = document.createElement('section');
    section.id = 'landing';
    section.className = 'content';

    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';

    var title = document.createElement('h1');
    title.textContent = 'Welcome to TotalCareFix';
    overlayDiv.appendChild(title);

    var description = document.createElement('p');
    description.textContent = 'Your Trusted Destination for Home Appliance Solutions';
    overlayDiv.appendChild(description);

    var userButton = document.createElement('button');
    userButton.textContent = 'User Dashboard';
    userButton.onclick = loadUserDashboard;
    overlayDiv.appendChild(userButton);

    var technicianButton = document.createElement('button');
    technicianButton.textContent = 'Technician Dashboard';
    technicianButton.onclick = loadLoginTech;
    overlayDiv.appendChild(technicianButton);

    section.appendChild(overlayDiv);
    landingSection.appendChild(section);
}
