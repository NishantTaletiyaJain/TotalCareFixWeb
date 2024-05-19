function editShowPopup(message, bookingId) {
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

    // Create the form
    var form = document.createElement('form');
    form.id = 'editBookingForm';

    // Create the date input
    var dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'serviceDate');
    dateLabel.textContent = 'Service Date:';
    form.appendChild(dateLabel);

    var dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'serviceDate';
    dateInput.className = 'serviceDate';
    dateInput.name = 'serviceDate';
    form.appendChild(dateInput);

    // Create the time input
    var timeLabel = document.createElement('label');
    timeLabel.setAttribute('for', 'expectedTime');
    timeLabel.textContent = 'Expected Time:';
    form.appendChild(timeLabel);

    var timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.id = 'expectedTime';
    timeInput.className = 'expectedTime';
    timeInput.name = 'expectedTime';
    form.appendChild(timeInput);

    // Create the message textarea
    var messageLabel = document.createElement('label');
    messageLabel.setAttribute('for', 'problemDescription');
    messageLabel.textContent = 'Problem Description:';
    form.appendChild(messageLabel);

    var messageTextarea = document.createElement('textarea');
    messageTextarea.id = 'problemDescription';
    messageTextarea.className = 'problemDescription';
    messageTextarea.name = 'problemDescription';
    form.appendChild(messageTextarea);

    // Create the update button
    var updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.textContent = 'Update Booking';
    updateButton.onclick = function() {
        updateBooking(bookingId);
    };
    form.appendChild(updateButton);

    // Append the form to the container
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(form);
    popupOverlay.appendChild(popupContainer);

    // Append the overlay to the body
    document.body.appendChild(popupOverlay);

    // Close the popup when clicking outside the container
    popupOverlay.onclick = function(event) {
        if (event.target === popupOverlay) {
            document.body.removeChild(popupOverlay);
        }
    };
}

function updateBooking(bookingId) {
    const serviceDate = document.querySelector('.serviceDate').value;
    const expectedTime = document.querySelector('.expectedTime').value;
    const problemDescription = document.querySelector('.problemDescription').value;

    const today = new Date().toISOString().split('T')[0];
    if (serviceDate === '' || serviceDate < today) {
        showPopup('Please select a valid future service date.');
        return;
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    if (expectedTime === '' || expectedTime < currentTime) {
        showPopup('Please select a valid future expected time.');
        return;
    }

    if (problemDescription.trim() === '') {
        showPopup('Please enter a problem description.');
        return;
    }

    const timeParts = expectedTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const formattedServiceDate = `${serviceDate}T00:00:00`;

    const requestData = {
        serviceDate: formattedServiceDate,
        time: formattedTime,
        message: problemDescription
    };

    fetch(`https://totalcarefix.projects.bbdgrad.com/api/editbooking/${bookingId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            showPopup('Failed to update booking');
            throw new Error('Failed to update booking');
        }
        return response.json();
    })
    .then(data => {
        showPopup('Booking updated successfully');
        document.body.removeChild(document.getElementById('popupOverlay'));
        loadYourBooking();
    })
    .catch(error => {
        showPopup('Error updating booking');
        console.error('Error updating booking:', error);
    });
}
