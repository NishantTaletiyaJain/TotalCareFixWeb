function showPopup(message) {
    
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

    
    var popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    popupContainer.style.backgroundColor = '#fff';
    popupContainer.style.padding = '20px';
    popupContainer.style.borderRadius = '5px';
    popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    popupContainer.style.textAlign = 'center';

    
    var popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    popupMessage.style.marginBottom = '20px';

    
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#333';
    closeButton.style.color = '#fff';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(closeButton);
    popupOverlay.appendChild(popupContainer);

    
    document.body.appendChild(popupOverlay);

    
    closeButton.onclick = function() {
        document.body.removeChild(popupOverlay);
    };

    
    popupOverlay.onclick = function(event) {
        if (event.target === popupOverlay) {
            document.body.removeChild(popupOverlay);
        }
    };
}
