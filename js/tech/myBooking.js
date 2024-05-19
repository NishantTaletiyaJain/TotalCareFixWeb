
function displayMyBookingList(bookings = []) {
    console.log("Displaying My Booking List");
    const myBookingContent = document.getElementById("content");
    if (myBookingContent) {
        myBookingContent.innerHTML = `<h2>My Booking List</h2>`;
        
        bookings.forEach((booking, index) => {
            console.log("i am displaybook");
            const bookingItem = document.createElement("div");
            bookingItem.classList.add("booking-item1");
            

            const bookingBookingId = document.createElement("p");
            bookingBookingId.textContent = "BookingId: " + booking.BookingId;

            const bookingAddress = document.createElement("p");
            bookingAddress.textContent = "Address: " + booking.Address;

            const bookingservice = document.createElement("p");
            bookingservice.textContent = "service: " + booking.service;

            const bookingMobile = document.createElement("p");
            bookingMobile.textContent = "mobileNuber: " + booking.mobileNumber;

            const cancelButton = document.createElement("button");
            cancelButton.classList.add("cancel-button1"); // Adding another CSS class

            cancelButton.textContent = "Cancel";
            cancelButton.addEventListener("click", () => cancelBookingTech(index));

            bookingItem.appendChild(bookingBookingId);
            bookingItem.appendChild(bookingAddress);
            bookingItem.appendChild(bookingservice);
            bookingItem.appendChild(bookingMobile);

            bookingItem.appendChild(cancelButton);

            myBookingContent.appendChild(bookingItem);
        });
    } else {
        console.error("Element with id 'content' not found");
    }
}

function cancelBookingTech(index) {
    myBookings.splice(index, 1); // Remove the booking from the array
    displayMyBookingList(myBookings); // Refresh the display
}


function showMyBooking() {
    displayMyBookingList(myBookings); // Pass the updated myBookings array
}




