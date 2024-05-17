function createSinglePageApp() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Single Page Application</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="navbar">
  <button onclick="showNewBooking()">New Booking</button>
  <button onclick="showMyBooking()">My Booking</button>
  <button onclick="logOut()">Log Out</button>
</div>

<div id="content" class="content">
  
</div>

<script src="navbar.js"></script>
<script src="newBooking.js"></script>
<script src="myBooking.js"></script>

</body>
</html>`;
    document.write(htmlContent);
}

function showNewBooking() {
    const content = document.getElementById('content');
    content.innerHTML = "<h2>New Booking</h2><form>Booking details go here...</form>";
}

function showMyBooking() {
    const content = document.getElementById('content');
    content.innerHTML = "<h2>My Booking</h2><p>Your bookings go here...</p>";
}

function logOut() {
    alert("Logged out successfully!");
}
