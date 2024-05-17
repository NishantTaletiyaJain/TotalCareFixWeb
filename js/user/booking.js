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
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDA0NTgxODI4ODY5LWRndDFqOGg0cWUzNmY0bGc3MmNpNXJqaGdzbTg0MDBtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAwNDU4MTgyODg2OS1kZ3QxajhoNHFlMzZmNGxnNzJjaTVyamhnc204NDAwbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDY2ODU2MTQ1NzU3OTgxNDUxMiIsImVtYWlsIjoic2F3ZGluZXNocmFqMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbmNlIjoiMTIzIiwibmJmIjoxNzE1OTM5MDQ5LCJuYW1lIjoiRGluZXNoIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xvOEE4bmJYTjRiYkR3b1RJeFpsWVFpSlc0VEdyajBNeVV6ZDBLMk9rcmg2OHFGMkk9czk2LWMiLCJnaXZlbl9uYW1lIjoiRGluZXNoIiwiZmFtaWx5X25hbWUiOiJLdW1hciIsImlhdCI6MTcxNTkzOTM0OSwiZXhwIjoxNzE1OTQyOTQ5LCJqdGkiOiJhNjdmYzZmZDgwZGMyYTNlZTdhNTY1Njc2OGU3YTE4ZDMxMjNlMmY0In0.bwRzQOuC-A5h-eq2pYHmzVMczRm6MgSMdCrmo1Ldxq3h_NfbooELQcRbJZPeEO0K3eTFfo8FF1kXZFTbtoAbHZyeY0oZdMYFYi5zRTpgyzUXozXN4ltso3gmb1_N5zGPMEmLf3LfF86KAtNAGnA1ba0sfTw92KkTVojU-2Jp09mnV3NJDuaomI-ruH7iCqIlrzH36OTjijG1UE7xkUQuEwpmQRSG2yGDN2LPgDELeqMvya1smGltMgN239jlegBvECjsECaK39fSTqixbyZmFcUoBp8RnhBR511-2UdyDeBmTBplwu6e7n-ubw16DhEm8Z6LlUcpw6_NbHAQ_gbUpA`
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
