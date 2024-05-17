

let myBookings = []; // Globally accessible array to store confirmed bookings
let bookings = [ // Globally accessible array to store new bookings
    { id: 1, name: "Booking 1", price: 100 },
    { id: 2, name: "Booking 2", price: 200 },
    { id: 3, name: "Booking 3", price: 300 },
    { id: 4, name: "Booking 4", price: 400 },
    { id: 2, name: "Booking 2", price: 200 },
    { id: 3, name: "Booking 3", price: 300 },
    { id: 4, name: "Booking 4", price: 400 },
    { id: 5, name: "Booking 5", price: 500 }
];

function displayNewBookingList() {
    const newBookingContent = document.getElementById("content");
    newBookingContent.innerHTML = `<h2>New Booking List</h2>`;
    
    const bookingContainer = document.createElement("div");
    bookingContainer.classList.add("booking-container");

    bookings.forEach((booking, index) => {
        const bookingItem = document.createElement("div");
        bookingItem.classList.add("booking-item");

        const bookingId = document.createElement("p");
        bookingId.textContent = "ID: " + booking.id;

        const bookingName = document.createElement("p");
        bookingName.textContent = "Name: " + booking.name;

        const bookingPrice = document.createElement("p");
        bookingPrice.textContent = "Price: " + booking.price;

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.addEventListener("click", () => confirmBooking(index));

        bookingItem.appendChild(bookingId);
        bookingItem.appendChild(bookingName);
        bookingItem.appendChild(bookingPrice);
        bookingItem.appendChild(confirmButton);

        bookingContainer.appendChild(bookingItem);
    });

    newBookingContent.appendChild(bookingContainer);
}

function confirmBooking(index) {
    const booking = bookings.splice(index, 1)[0]; // Remove booking from new bookings and get the booking object
    alert("Booking confirmed with ID: " + booking.id);
    addToMyBookings(booking);
    displayNewBookingList(); // Refresh the new booking list
}

function addToMyBookings(booking) {
    myBookings.push(booking);
    displayMyBookingList(myBookings);
}

function displayMyBookingList(bookings = []) {
    console.log("Displaying My Booking List");
    const myBookingContent = document.getElementById("content");
    if (myBookingContent) {
        myBookingContent.innerHTML = `<h2>My Booking List</h2>`;
        
        bookings.forEach((booking, index) => {
            const bookingItem = document.createElement("div");
            bookingItem.classList.add("booking-item");

            const bookingId = document.createElement("p");
            bookingId.textContent = "ID: " + booking.id;

            const bookingName = document.createElement("p");
            bookingName.textContent = "Name: " + booking.name;

            const bookingPrice = document.createElement("p");
            bookingPrice.textContent = "Price: " + booking.price;

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            cancelButton.addEventListener("click", () => cancelBooking(index));

            bookingItem.appendChild(bookingId);
            bookingItem.appendChild(bookingName);
            bookingItem.appendChild(bookingPrice);
            bookingItem.appendChild(cancelButton);

            myBookingContent.appendChild(bookingItem);
        });
    } else {
        console.error("Element with id 'content' not found");
    }
}

function cancelBooking(index) {
    myBookings.splice(index, 1); // Remove the booking from the array
    displayMyBookingList(myBookings); // Refresh the display
}

function showNewBooking() {
    displayNewBookingList();
}

function showMyBooking() {
    displayMyBookingList(myBookings); // Pass the updated myBookings array
}

function logOut() {
    document.getElementById("content").innerHTML = `<div id="logoutContent">
        <h2>Logged Out</h2>
        <p>You have been logged out.</p>
    </div>`;
}



