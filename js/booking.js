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

    // Fetch data from the API and populate the dropdown
    fetch('http://34.242.206.146:8080/skills/getAllUserStatus', {
        method: 'GET', // Change to GET
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Retrieve token from session storage
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
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const selectedSkill = document.querySelector('.skills').value;
    const serviceDate = document.querySelector('.serviceDate').value;
    let expectedTime = document.querySelector('.expectedTime').value;
    const problemDescription = document.querySelector('.problemDescription').value;

    // Convert the time to the desired format
    const timeParts = expectedTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // Log the form input values to the console
    console.log("Selected Skill:", selectedSkill);
    console.log("Service Date:", serviceDate);
    console.log("Expected Time:", formattedTime);
    console.log("Problem Description:", problemDescription);

    // Define the request body
    const requestData = {
        email: sessionStorage.getItem('email'),
        skill: selectedSkill,
        serviceDate: serviceDate,
        time: formattedTime,
        message: problemDescription
    };

    // Send POST request to the API endpoint
    fetch('http://34.242.206.146:8080/userbooking', {
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
            // Optionally, you can perform further actions after successful booking
            console.log('Booking made successfully:', data);
            // Do not reload the booking form after making the booking
            // Instead, you can display a success message or perform any other action you desire
        })
        .catch(error => {
            console.error('Error making booking:', error);
            // Handle errors here, such as displaying an error message to the user
        });
}
