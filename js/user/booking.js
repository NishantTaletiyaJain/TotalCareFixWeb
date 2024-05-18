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


    fetch('http://localhost:8080/skills/getAllUserStatus', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDA0NTgxODI4ODY5LWRndDFqOGg0cWUzNmY0bGc3MmNpNXJqaGdzbTg0MDBtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAwNDU4MTgyODg2OS1kZ3QxajhoNHFlMzZmNGxnNzJjaTVyamhnc204NDAwbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjA3MTgzMzk0MTUwOTkyNjg4NiIsImVtYWlsIjoibmlzaGFudHRhbGV0aXlhMTExMTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJub25jZSI6IjEyMyIsIm5iZiI6MTcxNTk2ODMzNCwibmFtZSI6Ik5pc2hhbnQgVGFsZXRpeWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHRxZ2VpN2VKQkdiLWl4MVYwTWZMeGdiTXZiZkdTZ3NZb3RlNE9udnIxQi00akRxVmg9czk2LWMiLCJnaXZlbl9uYW1lIjoiTmlzaGFudCIsImZhbWlseV9uYW1lIjoiVGFsZXRpeWEiLCJpYXQiOjE3MTU5Njg2MzQsImV4cCI6MTcxNTk3MjIzNCwianRpIjoiMDhmYmU2YzdhZjQ1OWJkNTg1N2YxODRlMDFhMjRhMWIyZDM0ZGZlNyJ9.JCRFsY2K9kdc5AoRkLl_zS5Fe8TnC_AWMYVcHvg83RgpQ5Akg2XD2mfYRduvnk_QvSvvstm2aIvDELM9plgBK7i4fkz3Dhbf7Z3MG32WvFQs4LMNkHnP05dw6-6wAXKQCwGDKisr5lpFt0OiUOcm2B9MYrUZGwVVgSMyHdMDUVyN06ivqUaLRqm0noXfHR37iz5JDXsXTMQdt2vRdvNDP2CFjZdK99V8OT0pweQwGy0Qg-Nrj6C0WuhqDg45PKcI15aveWxhXZmzKINpVQTg7P4hqAXnI5EOK3CNXa_M7-1vr-wgFHegZDfRAYewkunm1T8fePpbU2kF4QJjj97prg`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectSkills = document.querySelector('.skills');
            selectSkills.innerHTML = data.map(skill => `<option value="${skill.skill_id}">${skill.name}</option>`).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
}
const makeBooking = (event) => {
    event.preventDefault();


    const selectedSkill = document.querySelector('.skills').value;
    const serviceDate = document.querySelector('.serviceDate').value;
    let expectedTime = document.querySelector('.expectedTime').value;
    const problemDescription = document.querySelector('.problemDescription').value;


    if (selectedSkill === '0') {
        alert('Please select a skill.');
        return;
    }


    const today = new Date().toISOString().split('T')[0];
    if (serviceDate === '' || serviceDate < today) {
        alert('Please select a valid future service date.');
        return;
    }


    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    if (expectedTime === '' || expectedTime < currentTime) {
        alert('Please select a valid future expected time.');
        return;
    }


    if (problemDescription.trim() === '') {
        alert('Please enter a problem description.');
        return;
    }


    const timeParts = expectedTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });


    const requestData = {
        email: sessionStorage.getItem('email'),
        skill: selectedSkill,
        serviceDate: serviceDate,
        time: formattedTime,
        message: problemDescription
    };


    fetch('http://localhost:8080/userbooking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to make booking');
            }
            return response.json();
        })
        .then(data => {

            console.log('Booking made successfully:', data);


        })
        .catch(error => {
            console.error('Error making booking:', error);

        });
}
