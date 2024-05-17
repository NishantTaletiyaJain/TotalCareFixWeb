
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
