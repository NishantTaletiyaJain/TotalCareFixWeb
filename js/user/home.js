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
    console.log('home load');

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

    mainSection.appendChild(container);

    // Create and append style element for home page
    var style = document.createElement('style');
    style.id = 'homeStyle'; // Assign an ID for future reference/removal
    var css = `
        .home-container {
            width: 100%;
            height: 100%;
        }

        .home-image {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Ensure the image covers the container */
        }
    `;
    style.appendChild(document.createTextNode(css));

    document.head.appendChild(style);
}
