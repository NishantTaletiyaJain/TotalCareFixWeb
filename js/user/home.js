function loadHome() {
    var mainSection = document.getElementById('content');
    mainSection.innerHTML = '';
    console.log('home load');

    // Create the image element
    var img = document.createElement('img');
    img.src = './images/userbanner.jpg';
    img.className = 'home-image';  // Add a class to the image element

    // Append the image to the main section
    mainSection.appendChild(img);

    // Create a style element
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = `
        .home-image {
            width: 100%;
            height: 100%;
            opacity: 0.5; /* Decrease the opacity */
        }
    `;

    // Add the CSS to the style element
    if (style.styleSheet) {
        style.styleSheet.cssText = css;  // For IE
    } else {
        style.appendChild(document.createTextNode(css));  // For other browsers
    }

    // Append the style element to the document head
    document.head.appendChild(style);
}
