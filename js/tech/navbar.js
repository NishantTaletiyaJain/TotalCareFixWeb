
function techNavbar(){
 const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
    <ul>
        <li><a onclick="techHome()">Home</a></li>
        <li><a onclick="showNewBooking()">New Request</a></li>
        <li><a onclick="showMyBooking()">My service</a></li>
        <li><a onclick="logOutTech()">Logout</a></li>
    </ul>
    `;
}
