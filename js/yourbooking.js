function loadYourBooking() {
    var yourBookingSection = document.getElementById('content');

    var yourBookingContent = `
        <section id="yourbooking" class="content">
            <div class="booking-table">
                <table>
                    <tr>
                        <th>Booking ID</th>
                        <th>Type</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>123456</td>
                        <td>Plumbing</td>
                        <td>Pipe leakage in kitchen</td>
                        <td>2024-05-15</td>
                        <td>10:00 AM</td>
                        <td>Pending</td>
                        <td><button onclick="cancelBooking(123456)">Cancel</button></td>
                    </tr>
                    <tr>
                        <td>789012</td>
                        <td>Electrical</td>
                        <td>Power outage in living room</td>
                        <td>2024-05-17</td>
                        <td>2:00 PM</td>
                        <td>Confirmed</td>
                        <td><!-- Cancel button/link optional for each booking --></td>
                    </tr>
                </table>
            </div>
        </section>
    `;

    yourBookingSection.innerHTML = yourBookingContent;
}
