function showFeedbackPopup(bookingId) {
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
    popupContainer.style.maxWidth = '400px';
    popupContainer.style.width = '100%';

    // Create the form
    var form = document.createElement('form');
    form.id = 'feedbackForm';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.alignItems = 'flex-start';

    // Create the rating input
    var ratingLabel = document.createElement('label');
    ratingLabel.textContent = 'Rating (1 to 5):';
    ratingLabel.style.display = 'block';
    ratingLabel.style.marginTop = '10px';
    form.appendChild(ratingLabel);

    var ratingInput = document.createElement('input');
    ratingInput.type = 'number';
    ratingInput.id = 'rating';
    ratingInput.name = 'rating';
    ratingInput.min = '1';
    ratingInput.max = '5';
    ratingInput.style.marginTop = '5px';
    ratingInput.style.width = '100%';
    ratingInput.style.padding = '10px';
    ratingInput.style.border = '1px solid #ccc';
    ratingInput.style.borderRadius = '5px';
    ratingInput.style.boxSizing = 'border-box';
    form.appendChild(ratingInput);

    // Create the message textarea
    var messageLabel = document.createElement('label');
    messageLabel.setAttribute('for', 'feedbackMessage');
    messageLabel.textContent = 'Message:';
    messageLabel.style.display = 'block';
    messageLabel.style.marginTop = '10px';
    form.appendChild(messageLabel);

    var messageTextarea = document.createElement('textarea');
    messageTextarea.id = 'feedbackMessage';
    messageTextarea.className = 'feedbackMessage';
    messageTextarea.name = 'message';
    messageTextarea.style.width = '100%';
    messageTextarea.style.marginTop = '5px';
    messageTextarea.style.padding = '10px';
    messageTextarea.style.border = '1px solid #ccc';
    messageTextarea.style.borderRadius = '5px';
    messageTextarea.style.boxSizing = 'border-box';
    messageTextarea.style.resize = 'vertical';
    messageTextarea.style.minHeight = '80px';
    form.appendChild(messageTextarea);

    // Create the submit button
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit Feedback';
    submitButton.style.marginTop = '20px';
    submitButton.style.padding = '10px 20px';
    submitButton.style.border = 'none';
    submitButton.style.backgroundColor = '#007BFF';
    submitButton.style.color = '#fff';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.alignSelf = 'center';
    submitButton.style.fontSize = '16px';
    submitButton.onclick = function() {
        submitFeedback(bookingId);
    };
    form.appendChild(submitButton);

    // Append the form to the container
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

function submitFeedback(bookingId) {
    const rating = document.getElementById('rating').value;
    const message = document.querySelector('.feedbackMessage').value;

    if (!rating) {
        showPopup('Please select a rating.');
        return;
    }

    if (message.trim() === '') {
        showPopup('Please enter a message.');
        return;
    }

    const feedbackData = {
        bookingId: bookingId,
        rating: parseInt(rating),
        message: message
    };

    fetch('https://totalcarefix.projects.bbdgrad.com/api/feedbacks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(feedbackData)
    })
    .then(response => {
        if (!response.ok) {
            showPopup('Failed to submit feedback');
            throw new Error('Failed to submit feedback');
        }
        return response.json();
    })
    .then(data => {
        showPopup('Feedback submitted successfully');
        document.body.removeChild(document.getElementById('popupOverlay'));
    })
    .catch(error => {
        showPopup('Error submitting feedback');
        console.error('Error submitting feedback:', error);
    });
}
