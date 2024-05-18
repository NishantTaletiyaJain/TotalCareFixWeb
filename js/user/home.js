function loadHome() {
    var mainSection = document.getElementById('content');
    mainSection.innerHTML = '';
    console.log('home load');

    // Create the container for the image
    var container = document.createElement('div');
    container.className = 'home-container';

    // Create the image element
    var img = document.createElement('img');
    img.src = './images/userbanner.png';
    img.className = 'home-image';  // Add a class to the image element

    // Append the image to the container
    container.appendChild(img);

    var displayType=document.createElement('h1');
    displayType.textContent="this all service provide";
    displayType.className="service-display";

    container.appendChild(displayType);

    // Append the container to the main section
    mainSection.appendChild(container);

    // Create a style element for basic image styling
    var style = document.createElement('style');
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

    style.appendChild(document.createTextNode(css));  // For other browsers


    // Append the style element to the document head
    document.head.appendChild(style);
}
