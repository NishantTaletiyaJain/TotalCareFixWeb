

let myBookings = []; // Globally accessible array to store confirmed bookings
let bookings = [ // Globally accessible array to store new bookings
    { BookingId: 1, Address: "Booking 1,Booking 1,Booking 1,Booking 1,Booking 1", service: 100, mobileNumber: "12345678" },
    { BookingId: 2, Address: "Booking 2,Booking 2,Booking 2,Booking 2,Booking 2", service: 200 ,mobileNumber: "12345678"},
    { BookingId: 3, Address: "Booking 3,Booking 3,Booking 3,Booking 3,Booking 3", service: 300 ,mobileNumber: "12345678"},
    { BookingId: 4, Address: "Booking 4,Booking 4,Booking 4,Booking 4,Booking 4", service: 400 ,mobileNumber: "12345678"},
    { BookingId: 2, Address: "Booking 3,Booking 3,Booking 3,Booking 3,Booking 3", service: 200 ,mobileNumber: "12345678"},
    { BookingId: 3, Address: "Booking 3,Booking 3,Booking 3,Booking 3,Booking 3", service: 300 ,mobileNumber: "12345678"},
    { BookingId: 4, Address: "Booking 3,Booking 3,Booking 3,Booking 3,Booking 3", service: 400 ,mobileNumber: "12345678"},
    { BookingId: 5, Address: "Booking 3,Booking 3,Booking 3,Booking 3,Booking 3", service: 500 ,mobileNumber: "12345678"}
];

function displayNewBookingList() {
    const newBookingContent = document.getElementById("content");
    newBookingContent.innerHTML = `<h2>New Booking List</h2>`;
    
    const bookingContainer = document.createElement("div");
    bookingContainer.classList.add("booking-container");

    bookings.forEach((booking, index) => {
        const bookingItem = document.createElement("div");
        bookingItem.classList.add("booking-item");

        const bookingBookingId = document.createElement("p");
        bookingBookingId.textContent = "BookingId: " + booking.BookingId;

        const bookingAddress = document.createElement("p");
        bookingAddress.textContent = "Address: " + booking.Address;

        const bookingservice = document.createElement("p");
        bookingservice.textContent = "service: " + booking.service;

        const bookingMobile = document.createElement("p");
        bookingMobile.textContent = "mobileNuber: " + booking.mobileNumber;

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.addEventListener("click", () => confirmBooking(index));

        bookingItem.appendChild(bookingBookingId);
        bookingItem.appendChild(bookingAddress);
        bookingItem.appendChild(bookingservice);
        bookingItem.appendChild(bookingMobile);
        bookingItem.appendChild(confirmButton);

        bookingContainer.appendChild(bookingItem);
    });

    newBookingContent.appendChild(bookingContainer);
}

function confirmBooking(index) {
    const booking = bookings.splice(index, 1)[0]; // Remove booking from new bookings and get the booking object
    alert("Booking confirmed with ID: " + booking.BookingId);
    addToMyBookings(booking);
    displayNewBookingList(); // Refresh the new booking list
}

function addToMyBookings(booking) {
    myBookings.push(booking);
    displayMyBookingList(myBookings);
}

function showNewBooking() {
    displayNewBookingList();
}

// logout

function logOut() {
    document.getElementById("content").innerHTML = `<div id="logoutContent">
        <h2>Logged Out</h2>
        <p>You have been logged out.</p>
    </div>`;
}


