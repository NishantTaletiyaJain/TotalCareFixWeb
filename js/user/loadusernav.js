function loadUserNav() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `

    
    <ul>
        <li><a onclick="loadHome()">Home</a></li>
        <li><a onclick="loadBooking()">Booking</a></li>
        <li><a onclick="loadYourBooking()">SeeBooking</a></li>
        <li><a onclick="logout()">Login</a></li>
    </ul>
    
    `;
}