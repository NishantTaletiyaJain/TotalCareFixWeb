function showMyBooking() {
    const loader = document.getElementById('fullScreenLoader');
    loader.style.display = 'block';
    const email = sessionStorage.getItem('email'); // Use the correct email or fetch from sessionStorage if needed
    fetch(`http://localhost:8080/tech/myorder/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {

                displayMyBookingList(data);
                loader.style.display = 'none';

            } else {
                const myBookingContent = document.getElementById("content");
                if (myBookingContent) {
                    myBookingContent.innerHTML = "<h2>No bookings found</h2>";
                    loader.style.display = 'none';
                } else {
                    console.error("Element with id 'content' not found");
                }
            }
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            // Display error message or handle error as needed
        });
}
function displayMyBookingList(bookings) {
    const myBookingContent = document.getElementById("content");
    if (myBookingContent) {
        myBookingContent.innerHTML = `<h2>My Booking List</h2>`;

        const bookingContainer = document.createElement("div");
        bookingContainer.classList.add("booking-container");

        bookings.forEach(booking => {
            const bookingItem = document.createElement("div");
            bookingItem.classList.add("booking-item1");

            const bookingBookingId = document.createElement("p");
            bookingBookingId.textContent = "BookingId: " + booking.bookingId;

            const bookingAddress = document.createElement("p");
            bookingAddress.textContent = "Address: " + `${booking.addressResponse.houseNo}, ${booking.addressResponse.society}, ${booking.addressResponse.street}, ${booking.addressResponse.locality}, ${booking.addressResponse.city}, ${booking.addressResponse.state}`;

            const bookingService = document.createElement("p");
            bookingService.textContent = "Service: " + formatDateTime(booking.serviceDate, booking.expectedTime);

            const bookingMobile = document.createElement("p");
            bookingMobile.textContent = "Mobile Number: " + booking.mobileNumber;

            const cancelButton = document.createElement("button");
            cancelButton.classList.add("cancel-button1");
            cancelButton.textContent = "Cancel";
            cancelButton.addEventListener("click", () => cancelBookingTech(booking.bookingId));

            bookingItem.appendChild(bookingBookingId);
            bookingItem.appendChild(bookingAddress);
            bookingItem.appendChild(bookingService);
            bookingItem.appendChild(bookingMobile);
            bookingItem.appendChild(cancelButton);

            bookingContainer.appendChild(bookingItem);
        });

        myBookingContent.appendChild(bookingContainer);
    } else {
        console.error("Element with id 'content' not found");
    }
}

function cancelBookingTech(bookingId) {
    fetch(`http://localhost:8080/tech/cancel/${bookingId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                showPopup("Booking canceled successfully");
                showMyBooking();
            } else {
                console.error('Failed to cancel booking:', data.message);
            }
        })
        .catch(error => {
            console.error('Error canceling booking:', error);
            // Display error message or handle error as needed
        });
}


function formatDateTime(dateString, timeString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const [hours, minutes] = timeString.split(':');
    const formattedTime = new Date(date.setHours(hours, minutes)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} at ${formattedTime}`;
}