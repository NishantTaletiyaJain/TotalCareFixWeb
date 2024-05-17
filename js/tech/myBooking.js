
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
