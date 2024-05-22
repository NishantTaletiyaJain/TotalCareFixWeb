// Create a function to show the popup
function showMyPopup(title, message) {
    // Create the popup container
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    popupContainer.style.height = '100%';
    popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupContainer.style.display = 'flex';
    popupContainer.style.justifyContent = 'center';
    popupContainer.style.alignItems = 'center';
    popupContainer.style.zIndex = '1000';

    // Create the popup content box
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.borderRadius = '5px';
    popupContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupContent.style.maxWidth = '400px';
    popupContent.style.width = '100%';
    popupContent.style.textAlign = 'center';

    // Create the title element
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = title;
    popupContent.appendChild(popupTitle);

    // Create the message element
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    popupContent.appendChild(popupMessage);

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';

    // Add an event listener to the close button to remove the popup
    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer);
    });

    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);

    // Add the popup to the body
    document.body.appendChild(popupContainer);
}

// Example usage:
// showPopup('Success', 'User registered successfully!');
