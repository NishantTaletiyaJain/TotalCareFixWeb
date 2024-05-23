
function showMyPopup(title, message) {
    
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

    
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.borderRadius = '5px';
    popupContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupContent.style.maxWidth = '400px';
    popupContent.style.width = '100%';
    popupContent.style.textAlign = 'center';

    
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = title;
    popupContent.appendChild(popupTitle);

    
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    popupContent.appendChild(popupMessage);

    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';

    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer);
    });

    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);

    
    document.body.appendChild(popupContainer);
}



