function showPopup(message) {
    console.log('hello');
    // Create the popup overlay
    var popupOverlay = document.createElement('div');
    popupOverlay.id = 'popupOverlay';
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.alignItems = 'center';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.zIndex = '1000';

    // Create the popup container
    var popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    popupContainer.style.backgroundColor = '#fff';
    popupContainer.style.padding = '20px';
    popupContainer.style.borderRadius = '5px';
    popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    popupContainer.style.textAlign = 'center';

    // Create the popup message
    var popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    popupMessage.style.marginBottom = '20px';

    // Create the close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#333';
    closeButton.style.color = '#fff';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    // Append the message and close button to the container
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(closeButton);
    popupOverlay.appendChild(popupContainer);

    // Append the overlay to the body
    document.body.appendChild(popupOverlay);

    // Close the popup when the close button is clicked
    closeButton.onclick = function() {
        document.body.removeChild(popupOverlay);
    };

    // Close the popup when clicking outside the container
    popupOverlay.onclick = function(event) {
        if (event.target === popupOverlay) {
            document.body.removeChild(popupOverlay);
        }
    };
}
