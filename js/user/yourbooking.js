function cancelBooking(bookingId) {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/cancel/${bookingId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showPopup('Failed to cancel booking');
            } else {
                showPopup('Booking canceled successfully');
                loadYourBooking();
            }
        })
        .catch(error => {
            console.error('Error canceling booking:', error);
        });
}

function loadYourBooking() {
    
    if (sessionStorage.getItem('email') == null) {
        showPopup('Please login first');
        loader.style.display = 'none';
    } else {
        var yourBookingSection = document.getElementById('content');
        var email = sessionStorage.getItem('email');

        // Create filter form
        var filterForm = `
        <form id="filterForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="statusFilter">Status:</label>
                    <select id="statusFilter" name="statusFilter">
                        <option value="">All</option>
                        <option value="booked">Booked</option>
                        <option value="appointment">Appointment</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dateFilter">Date:</label>
                    <input type="date" id="dateFilter" name="dateFilter">
                </div>
            </div>
        </form>
        `;

        yourBookingSection.innerHTML = filterForm;

        // Fetch and display bookings
        fetchBookings(email);


        // Add event listeners to filter inputs
        document.getElementById('statusFilter').addEventListener('change', applyFilter);
        document.getElementById('dateFilter').addEventListener('change', applyFilter);
    }
}

function fetchBookings(email) {
    const loader = document.getElementById('fullScreenLoader');
    loader.style.display = 'block';
    const url = `http://localhost:8080/showbooking/${email}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => {
            if (!response.ok) {
                loader.style.display = 'none';
                throw new Error('Failed to fetch booking data');
            }
            return response.json();
        })
        .then(data => {
            window.allBookings = data; // Store all bookings for client-side filtering
            displayBookings(data);
            
        loader.style.display = 'none';
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error loading booking data:', error);
            showPopup('Error loading booking data');
        });
}
function displayBookings(bookings) {
    var yourBookingSection = document.getElementById('content');
    var bookingContainer = document.querySelector('.booking-container');
    if (bookingContainer) {
        bookingContainer.innerHTML = ''; // Clear existing bookings
    } else {
        bookingContainer = document.createElement('div');
        bookingContainer.className = 'booking-container';
    }

    bookings.forEach(booking => {
        var bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item';

        var bookingIdP = document.createElement('p');
        bookingIdP.textContent = "Booking ID: " + booking.bookingId;
        bookingItem.appendChild(bookingIdP);

        var messageP = document.createElement('p');
        messageP.textContent = "Message: " + booking.message;
        bookingItem.appendChild(messageP);

        var dateP = document.createElement('p');
        dateP.textContent = "Date: " + new Date(booking.date).toLocaleDateString();
        bookingItem.appendChild(dateP);

        var timeP = document.createElement('p');
        timeP.textContent = "Time: " + booking.time;
        bookingItem.appendChild(timeP);

        var statusP = document.createElement('p');
        statusP.textContent = "Status: " + booking.status;
        bookingItem.appendChild(statusP);

        // Check if feedback exists and display it
        if (booking.feedback) {
            var feedbackRatingP = document.createElement('p');
            feedbackRatingP.textContent = "Rating: " + booking.feedback.rating;
            bookingItem.appendChild(feedbackRatingP);

            var feedbackMessageP = document.createElement('p');
            feedbackMessageP.textContent = "Feedback: " + booking.feedback.message;
            bookingItem.appendChild(feedbackMessageP);

            // Add button to modify feedback
            var editFeedbackButton = document.createElement('button');
            editFeedbackButton.classList.add('edit-feedback-button');
            editFeedbackButton.textContent = 'Edit Feedback';
            editFeedbackButton.onclick = function () {
                showFeedbackPopup(booking.bookingId, booking.feedback);
            };
            bookingItem.appendChild(editFeedbackButton);
        }

        var actionDiv = document.createElement('div');

        if (booking.status != 'Completed' && booking.status != 'Cancelled') {
            if (booking.status != 'booked') {
                var cancelButton = document.createElement('button');
                cancelButton.classList.add('cancel-button1');
                cancelButton.textContent = 'Cancel';
                cancelButton.onclick = function () {
                    showConfirmationPopup('Are you sure you want to cancel this booking?', function () {
                        cancelBooking(booking.bookingId);
                    }, booking.bookingId);
                };
                actionDiv.appendChild(cancelButton);

                var editButton = document.createElement('button');
                editButton.classList.add('edit-button');
                editButton.textContent = 'Edit';
                editButton.onclick = function () {
                    editShowPopup('Update your Booking details', booking.bookingId);
                };
                actionDiv.appendChild(editButton);
            }

            if (booking.status != 'appointment') {
                var completeButton = document.createElement('button');
                completeButton.classList.add('complete-button');
                completeButton.textContent = 'Complete';
                completeButton.onclick = function () {
                    completeBooking(booking.bookingId);
                };
                actionDiv.appendChild(completeButton);
            }
        }

        // Add feedback button if no feedback provided
        if (!booking.feedback && booking.status == 'Completed') {
            var feedbackButton = document.createElement('button');
            feedbackButton.classList.add('feedback-button');
            feedbackButton.textContent = 'Feedback';
            feedbackButton.onclick = function () {
                showFeedbackPopup(booking.bookingId);
            };
            actionDiv.appendChild(feedbackButton);
        }

        bookingItem.appendChild(actionDiv);
        bookingContainer.appendChild(bookingItem);
    });

    yourBookingSection.appendChild(bookingContainer);
}
function applyFilter(event) {
    event.preventDefault();
    var status = document.getElementById('statusFilter').value;
    var date = document.getElementById('dateFilter').value;

    console.log("Filter status: ", status);
    console.log("Filter date: ", date);

    var filteredBookings = window.allBookings.filter(booking => {
        var matchesStatus = status ? booking.status.toLowerCase() === status.toLowerCase() : true;
        var matchesDate = date ? new Date(booking.date).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
        return matchesStatus && matchesDate;
    });

    console.log("Filtered bookings: ", filteredBookings);

    displayBookings(filteredBookings);
}

function completeBooking(bookingId) {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/bookingcompleted/${bookingId}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showPopup('Failed to complete booking');
            } else {
                showPopup('Booking marked as completed');
                loadYourBooking();
            }
        })
        .catch(error => {
            console.error('Error completing booking:', error);
        });
}

// Add CSS for the cart-like structure and responsiveness
var style = document.createElement('style');
style.id = 'yourBookingStyle';
var css = `
    :root {
        font-size: 1rem; /* Ensuring the root font size is defined for clarity */
    }

    /* Container for the bookings */
    .booking-container {
        display: grid;
        gap: 1rem; /* Add gap between cards */
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive columns */
        padding: 1rem;
    }

    .booking-item {
        padding: 1rem; /* More padding for a robust look */
        border: 1px solid #ccc;
        border-radius: 0.5rem; /* Slightly larger border radius */
        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Add subtle shadow */
        background-color: #fff; /* White background for card look */
        box-sizing: border-box;
        transition: transform 0.2s; /* Smooth transform transition */
    }

    .booking-item:hover {
        transform: scale(1.05); /* Slightly enlarge on hover */
    }

    .booking-item p {
        margin: 0.5rem 0; /* More spacing between paragraphs */
    }

    .booking-item button {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.25rem; /* Rounded button corners */
        padding: 0.5rem 1rem; /* Larger padding for buttons */
        cursor: pointer;
        transition: background-color 0.2s; /* Smooth background color transition */
    }

    .booking-item button:hover {
        background-color: #0056b3; /* Darker blue on hover */
    }

    .cancel-button1 {
        background-color: red;
        color: white;
        padding: 0.5rem 1rem; /* Consistent padding for buttons */
        border: none;
        border-radius: 0.25rem; /* Rounded button corners */
        cursor: pointer;
        transition: background-color 0.2s; /* Smooth background color transition */
        margin-right: 10px; /* Add margin for spacing between buttons */
    }

    .cancel-button1:hover {
        background-color: darkred; /* Darker red on hover */
    }

    .complete-button {
        background-color: green;
        color: white;
        padding: 0.5rem 1rem; /* Consistent padding for buttons */
        border: none;
        border-radius: 0.25rem; /* Rounded button corners */
        cursor: pointer;
        transition: background-color 0.2s; /* Smooth background color transition */
    }

    .complete-button:hover {
        background-color: darkgreen; /* Darker green on hover */
    }

    /* Adjust form layout */
    .form-row {
        display: flex;
        align-items: center;
    }

    .form-group {
        margin-right: 20px;
    }

    /* Styling for date input */
    input[type="date"] {
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid #ccc;
        width: 150px;
    }
`;
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);