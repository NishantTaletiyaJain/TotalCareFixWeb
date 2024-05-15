function loadYourBooking() {
    var yourBookingSection = document.getElementById('content');
    var email = sessionStorage.getItem('email');
    console.log(sessionStorage.getItem('token'));
    
    fetch(`http://34.242.206.146:8080/showbooking/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch booking data');
        }
        return response.json();
    })
    .then(data => {
        var yourBookingContent = `
            <section id="yourbooking" class="content">
                <div class="booking-table">
                    <table>
                        <tr>
                            <th>Booking ID</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>`;
        
        
        data.forEach(booking => {
            yourBookingContent += `
                <tr>
                    <td>${booking.bookingId}</td>
                    <td>${booking.message}</td>
                    <td>${new Date(booking.date).toLocaleDateString()}</td>
                    <td>${booking.time}</td>
                    <td>${booking.status}</td>
                    <td><button onclick="cancelBooking(${booking.bookingId})">Cancel</button></td>
                </tr>`;
        });
        
        yourBookingContent += `
                    </table>
                </div>
            </section>`;
        
        
        yourBookingSection.innerHTML = yourBookingContent;
    })
    .catch(error => console.error('Error loading booking data:', error));
}
function cancelBooking(bookingId) {
    const token = sessionStorage.getItem('token');
    const url = `http://34.242.206.146:8080/cancel/${bookingId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        console.log('Booking canceled successfully');
        
        loadYourBooking();
    })
    .catch(error => {
        console.error('Error canceling booking:', error);
        
    });
}
