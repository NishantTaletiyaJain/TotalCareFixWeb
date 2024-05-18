
function techNavbar(){
 const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
    <ul>
        <li><a onclick="techHome()">Home</a></li>
        <li><a onclick="showNewBooking()">New Booking</a></li>
        <li><a onclick="showMyBooking()">My Booking</a></li>
        <li><a onclick="logout()">Log out</a></li>
    </ul>
    
    `;
}
