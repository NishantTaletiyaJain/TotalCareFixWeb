

function displayBookingList(bookings) {
    console.log('coming inside the new booking');
    const newBookingContent = document.getElementById("content");
    newBookingContent.innerHTML = `<h2>New Service request</h2>`;

    const bookingContainer = document.createElement("div");
    bookingContainer.classList.add("booking-container");

    bookings.forEach(booking => {
        const bookingItem = document.createElement("div");
        bookingItem.classList.add("booking-item");

        const bookingBookingId = document.createElement("p");
        bookingBookingId.textContent = "BookingId: " + booking.bookingId;

        const bookingAddress = document.createElement("p");
        bookingAddress.textContent = "Address: " + `${booking.addressResponse.houseNo}, ${booking.addressResponse.society}, ${booking.addressResponse.street}, ${booking.addressResponse.locality}, ${booking.addressResponse.city}, ${booking.addressResponse.state}`;

        const bookingService = document.createElement("p");
        bookingService.textContent = "Service: " + formatDateTime(booking.serviceDate, booking.expectedTime);
        console.log(booking.serviceDate);

        const message = document.createElement("p");
        message.textContent = "Message: " + booking.message;

        const bookingMobile = document.createElement("p");
        bookingMobile.textContent = "Mobile Number: " + booking.mobileNumber;

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.addEventListener("click", () => confirmBooking(booking.bookingId));

        bookingItem.appendChild(bookingBookingId);
        bookingItem.appendChild(bookingAddress);
        bookingItem.appendChild(bookingService);
        bookingItem.appendChild(message);
        bookingItem.appendChild(bookingMobile);
        bookingItem.appendChild(confirmButton);

        bookingContainer.appendChild(bookingItem);
    });

    newBookingContent.appendChild(bookingContainer);
}


function showNewBooking() {
    const loader = document.getElementById('fullScreenLoader');
    loader.style.display = 'block';
    const email = sessionStorage.getItem('email'); 
    fetch(`https://totalcarefix.projects.bbdgrad.com/api/tech/serviceorder/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                displayBookingList(data);
                loader.style.display = 'none';

            } else {
                const newBookingContent = document.getElementById("content");
                newBookingContent.innerHTML = "<h2>No New Service requests</h2>";
                loader.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            
        });
}


function confirmBooking(id) {
    const email = sessionStorage.getItem('email');

    fetch(`https://totalcarefix.projects.bbdgrad.com/api/tech/confirm/${id}/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.bookingId) {
                showPopup("Booking confirmed with ID: " + data.bookingId);
                showNewBooking();
            } else {
                console.error('Invalid response from server:', data);
            }
        })
        .catch(error => {
            console.error('Error confirming booking:', error);
            
        });
}

function formatDateTime(dateString, timeString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const [hours, minutes] = timeString.split(':');
    const formattedTime = new Date(date.setHours(hours, minutes)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} at ${formattedTime}`;
}
