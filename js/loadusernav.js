function loadUserNav() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <ul>
            <li><a onclick="loadHome()">Home</a></li>
            <li><a onclick="loadBooking()">Booking</a></li>
            <li><a onclick="loadYourBooking()">Your Booking</a></li>
            <li><a onclick="logout()">Logout</a></li>
        </ul>
    `;
    loadHome();
}