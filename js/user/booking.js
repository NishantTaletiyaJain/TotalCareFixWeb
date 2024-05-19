function loadBooking() {
    var mainSection = document.getElementById('content');
    var bookingContent = `<section id="booking" class="content">
    <form id="bookingForm">
        <label for="skills">Select Skill:</label>
        <select class="skills" name="skills" id="skill">
            <!-- Options populated dynamically using JavaScript -->
        </select>
        <label for="serviceDate">Service Date:</label>
        <input type="date" class="serviceDate" name="serviceDate" class="datepicker">
        <label for="expectedTime">Expected Time:</label>
        <input type="time" class="expectedTime" name="expectedTime">
        <label for="problemDescription">Problem Description:</label>
        <textarea class="problemDescription" name="problemDescription"></textarea>
        <button type="submit" onclick="makeBooking(event)">Book Now</button>
    </form>
</section>`;
    mainSection.innerHTML = bookingContent;


    fetch('https://totalcarefix.projects.bbdgrad.com/api/skills/getAllUserStatus', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectSkills = document.querySelector('.skills');
            selectSkills.innerHTML = data.map(skill => `<option value="${skill.name}">${skill.name}</option>`).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
}
const makeBooking = (event) => {
    event.preventDefault();
    if (sessionStorage.getItem('email') == null) {
        showPopup('Please login first');

    }
    else {


        const selectedSkill = document.querySelector('.skills').value;
        const serviceDate = document.querySelector('.serviceDate').value;
        let expectedTime = document.querySelector('.expectedTime').value;
        const problemDescription = document.querySelector('.problemDescription').value;

        if (selectedSkill === '0') {
            showPopup('Please select a skill.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (serviceDate === '' || serviceDate < today) {
            showPopup('Please select a valid future service date.');
            return;
        }

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        if (expectedTime === '' || expectedTime < currentTime) {
            showPopup('Please select a valid future expected time.');
            return;
        }

        if (problemDescription.trim() === '') {
            showPopup('Please enter a problem description.');
            return;
        }

        const timeParts = expectedTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

        const formattedServiceDate = `${serviceDate}T00:00:00`;

        const requestData = {
            email: sessionStorage.getItem('email'),
            skill: selectedSkill,
            serviceDate: formattedServiceDate,
            time: formattedTime,
            message: problemDescription
        };


        fetch('https://totalcarefix.projects.bbdgrad.com/api/userbooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    showPopup('fail');
                    throw new Error('Failed to make booking');
                }
                return response.json();
            })
            .then(data => {
                showPopup('Booking made successfully:', data);
                showPopup('Booking made successfully');
                loadBooking();
            })
            .catch(error => {
                showPopup('fail booking');
                console.error('Error making booking:', error);
            });

        loadYourBooking();
    }
};

