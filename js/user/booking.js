function loadBooking() {
    var mainSection = document.getElementById('content');
    var bookingContent = `<section id="booking" class="content">
    <form id="bookingForm">
        <label for="skills">Select Skill:</label>
        <select class="skills" name="skills" id="skill">
            <!-- Options populated dynamically using JavaScript -->
        </select>
        <label for="serviceDate">Service Date:</label>
        <input type="date" class="serviceDate" name="serviceDate" class="datepicker" required>
        <label for="expectedTime">Expected Time:</label>
        <input type="time" class="expectedTime" name="expectedTime" required>
        <label for="problemDescription">Problem Description:</label>
        <textarea class="problemDescription" name="problemDescription" required></textarea>
        <button type="submit" onclick="makeBooking(event)">Book Now</button>
    </form>
</section>`;
    mainSection.innerHTML = bookingContent;

    
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('.serviceDate').setAttribute('min', today);

    
    const serviceDateInput = document.querySelector('.serviceDate');
    const expectedTimeInput = document.querySelector('.expectedTime');

    serviceDateInput.addEventListener('input', () => {
        const selectedDate = serviceDateInput.value;
        if (selectedDate === today) {
            const now = new Date();
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); 
            expectedTimeInput.setAttribute('min', currentTime);
        } else {
            expectedTimeInput.removeAttribute('min');
        }
    });

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
    } else {
        const selectedSkill = document.querySelector('.skills').value;
        const serviceDate = document.querySelector('.serviceDate').value;
        const expectedTime = document.querySelector('.expectedTime').value;
        const problemDescription = document.querySelector('.problemDescription').value;

        if (!selectedSkill) {
            showPopup('Please select a skill.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (!serviceDate || serviceDate < today) {
            showPopup('Please select a valid future service date.');
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(serviceDate);
        
        
        if (selectedDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0] && expectedTime <= currentDate.toTimeString().split(' ')[0].substring(0, 5)) {
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
                    showPopup('Failed to make booking');
                    throw new Error('Failed to make booking');
                }
                return response.json();
            })
            .then(data => {
                showPopup('Booking made successfully', data);
                loadBooking();
            })
            .catch(error => {
                showPopup('Failed to make booking');
                console.error('Error making booking:', error);
            });
    }
};