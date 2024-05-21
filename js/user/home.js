function loadHome() {
    const idToken = parseTokenFromUrl();
    if (idToken) {
        if (sessionStorage.getItem('token') == null) {
            fetchUserInfo(idToken);
        }
    }
    // Clear existing styles related to landing page
    var existingStyle = document.getElementById('landingStyle');
    if (existingStyle) {
        existingStyle.remove();
    }

    var mainSection = document.getElementById('content');
    mainSection.innerHTML = '';

    // Create container for the image
    var container = document.createElement('div');
    container.className = 'home-container';

    // Create image element
    var img = document.createElement('img');
    img.src = './images/userbanner.png';
    img.className = 'home-image';

    container.appendChild(img);

    var displayType = document.createElement('h1');
    displayType.textContent = "This is all services provided";
    displayType.className = "service-display";

    container.appendChild(displayType);

    // Create and add description row
    var descriptionRow = document.createElement('div');
    descriptionRow.className = 'description-row';

    var description = document.createElement('p');
    description.textContent = "Welcome to our service platform where we offer a variety of home repair and maintenance services to cater to your needs.";
    description.className = 'description-text';

    descriptionRow.appendChild(description);
    container.appendChild(descriptionRow);

    mainSection.appendChild(container);

    const imageName = ['Carpenter', 'computerrepair', 'Electrician', 'glassrepair', 'Locksmith', 'plumber'];

    // Create cards and rows
    for (let i = 0; i < 2; i++) { // Loop for 2 rows
        let row = document.createElement('div');
        row.className = 'row';
        
        for (let j = 0; j < 3; j++) { // Loop for 3 cards in each row
            let card = document.createElement('div');
            card.className = 'card';

            let index = i * 3 + j;
            
            let cardImg = document.createElement('img');
            cardImg.src = `./images/${imageName[index]}.jpg`; // Use imageName array for image source
            cardImg.className = 'card-image';
            
            let cardText = document.createElement('p');
            cardText.textContent = `${imageName[index]}`; // Use imageName array for text content
            cardText.className = 'card-text';
            
            card.appendChild(cardImg);
            card.appendChild(cardText);
            row.appendChild(card);
        }

        container.appendChild(row);
    }

    // Create and append style element for home page
    var style = document.createElement('style');
    style.id = 'homeStyle'; // Assign an ID for future reference/removal
    var css = `
        .home-container {
            width: 100%;
            height: 100%;
            text-align: center; /* Center align the text */
        }

        .home-image {
            width: 100%;
            height: auto;
            object-fit: cover; /* Ensure the image covers the container */
            margin-bottom: 20px; /* Add some space below the image */
        }

        .service-display {
            margin-bottom: 40px; /* Add some space below the heading */
        }

        .description-row {
            margin-bottom: 40px; /* Space below the description */
        }

        .description-text {
            font-size: 1.5em;
            color: #555;
            margin: 0 auto; /* Center the text */
            max-width: 80%; /* Limit the width of the text */
        }

        .row {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px; /* Space between rows */
        }

        .card {
            width: 30%; /* Each card takes 30% of the row */
            border: 1px solid #ccc; /* Light border around cards */
            border-radius: 10px; /* Rounded corners for cards */
            padding: 10px;
            box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1); /* Add a shadow for better look */
        }

        .card-image {
            width: 100%;
            height: 150px; /* Fixed height for all images */
            object-fit: cover; /* Ensure the image covers the container */
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px; /* Space between image and text */
        }

        .card-text {
            font-size: 1.2em;
            font-weight: bold;
        }
    `;
    style.appendChild(document.createTextNode(css));

    document.head.appendChild(style);
}
