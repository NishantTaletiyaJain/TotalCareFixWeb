// function loadYourBooking() {
//     // showPopup('This is a simple popup message!');
//     var yourBookingSection = document.getElementById('content');
//     var email = sessionStorage.getItem('email');
//     console.log(sessionStorage.getItem('token'));

//     fetch(`http://localhost:8080/showbooking/${email}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch booking data');
//             }
//             return response.json();
//         })
//         .then(data => {
//             var yourBookingContent = `
//             <section id="yourbooking" class="content">
//                 <div class="booking-table">
//                     <table>
//                         <tr>
//                             <th>Booking ID</th>
//                             <th>Message</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>`;


//             data.forEach(booking => {
//                 yourBookingContent += `
//                 <tr>
//                     <td>${booking.bookingId}</td>
//                     <td>${booking.message}</td>
//                     <td>${new Date(booking.date).toLocaleDateString()}</td>
//                     <td>${booking.time}</td>
//                     <td>${booking.status}</td>
//                     <td><button onclick="cancelBooking(${booking.bookingId})">Cancel</button></td>
//                 </tr>`;
//             });

//             yourBookingContent += `
//                     </table>
//                 </div>
//             </section>`;


//             yourBookingSection.innerHTML = yourBookingContent;
//         })
//         .catch(error => console.error('Error loading booking data:', error));
// }
// function cancelBooking(bookingId) {
//     const token = sessionStorage.getItem('token');
//     const url = `http://localhost:8080/cancel/${bookingId}`;

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to cancel booking');
//             }
//             console.log('Booking canceled successfully');

//             loadYourBooking();
//         })
//         .catch(error => {
//             console.error('Error canceling booking:', error);

//         });
// }



// function loadYourBooking() {
//     var yourBookingSection = document.getElementById('content');
//     var email = sessionStorage.getItem('email');
//     console.log(sessionStorage.getItem('token'));

//     fetch(`http://localhost:8080/showbooking/${email}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to fetch booking data');
//         }
//         return response.json();
//     })
//     .then(data => {
//         var section = document.createElement('section');
//         section.id = 'yourbooking';
//         section.className = 'content';

//         var bookingContainer = document.createElement('div');
//         bookingContainer.className = 'booking-container';

//         // Booking rows
//         data.forEach(booking => {
//             var bookingRow = document.createElement('div');
//             bookingRow.className = 'booking-row';

//             // Adjusted order of booking information
//             ['bookingId', 'message', 'date', 'time', 'status'].forEach(field => {
//                 var bookingCell = document.createElement('div');
//                 bookingCell.className = 'booking-cell';
//                 bookingCell.textContent = booking[field];
//                 bookingRow.appendChild(bookingCell);
//             });

//             var actionDiv = document.createElement('div');
//             actionDiv.className = 'booking-cell';
//             var cancelButton = document.createElement('button');
//             cancelButton.textContent = 'Cancel';
//             cancelButton.onclick = function() {
//                 cancelBooking(booking.bookingId);
//             };
//             actionDiv.appendChild(cancelButton);
//             bookingRow.appendChild(actionDiv);

//             bookingContainer.appendChild(bookingRow);
//         });

//         section.appendChild(bookingContainer);
//         yourBookingSection.innerHTML = '';
//         yourBookingSection.appendChild(section);
//     })
//     .catch(error => console.error('Error loading booking data:', error));
// }

// function cancelBooking(bookingId) {
//     const token = sessionStorage.getItem('token');
//     const url = `http://localhost:8080/cancel/${bookingId}`;

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to cancel booking');
//         }
//         console.log('Booking canceled successfully');
//         loadYourBooking();
//     })
//     .catch(error => {
//         console.error('Error canceling booking:', error);
//     });
// }





function loadYourBooking() {
    var yourBookingSection = document.getElementById('content');
    var email = sessionStorage.getItem('email');
    console.log(sessionStorage.getItem('token'));

    fetch(`http://localhost:8080/showbooking/${email}`, {
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
        yourBookingSection.innerHTML = '';

        var section = document.createElement('section');
        section.id = 'yourbooking';
        section.className = 'content';

        var bookingContainer = document.createElement('div');
        bookingContainer.className = 'booking-container';

        // Header row
        var headerRow = document.createElement('div');
        headerRow.className = 'booking-row header-row';
        
        ['Booking ID', 'Message', 'Date', 'Time', 'Status', 'Action'].forEach(header => {
            var headerDiv = document.createElement('div');
            headerDiv.className = 'booking-header';
            headerDiv.textContent = header;
            headerRow.appendChild(headerDiv);
        });

        bookingContainer.appendChild(headerRow);

        // Booking rows
        data.forEach(booking => {
            var bookingRow = document.createElement('div');
            bookingRow.className = 'booking-row';

            var bookingIdDiv = document.createElement('div');
            bookingIdDiv.className = 'booking-cell';
            bookingIdDiv.textContent = booking.bookingId;
            bookingRow.appendChild(bookingIdDiv);

            var messageDiv = document.createElement('div');
            messageDiv.className = 'booking-cell';
            messageDiv.textContent = booking.message;
            bookingRow.appendChild(messageDiv);

            var dateDiv = document.createElement('div');
            dateDiv.className = 'booking-cell';
            dateDiv.textContent = new Date(booking.date).toLocaleDateString();
            bookingRow.appendChild(dateDiv);

            var timeDiv = document.createElement('div');
            timeDiv.className = 'booking-cell';
            timeDiv.textContent = booking.time;
            bookingRow.appendChild(timeDiv);

            var statusDiv = document.createElement('div');
            statusDiv.className = 'booking-cell';
            statusDiv.textContent = booking.status;
            bookingRow.appendChild(statusDiv);

            var actionDiv = document.createElement('div');
            actionDiv.className = 'booking-cell';
            var cancelButton = document.createElement('button');
            cancelButton.classList.add("cancel-button1");

            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = function() {
                cancelBooking(booking.bookingId);
            };
            actionDiv.appendChild(cancelButton);
            bookingRow.appendChild(actionDiv);

            bookingContainer.appendChild(bookingRow);
        });

        section.appendChild(bookingContainer);
        yourBookingSection.appendChild(section);
    })
    .catch(error => console.error('Error loading booking data:', error));
}

function cancelBooking(bookingId) {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/cancel/${bookingId}`;

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

// Add CSS for the tabular structure
var style = document.createElement('style');
style.id = 'yourBookingStyle';
var css = `
    .booking-container {
        display: flex;
        flex-direction: column;
    }

    .booking-row {
        display: flex;
    }

    .booking-header {
        flex: 1;
        font-weight: bold;
        padding: 10px;
        border-bottom: 2px solid #ccc;
        background-color: #f9f9f9;
    }

    .booking-cell {
        flex: 1;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .header-row .booking-header {
        border-bottom: 2px solid #000;
    }
`;
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);





