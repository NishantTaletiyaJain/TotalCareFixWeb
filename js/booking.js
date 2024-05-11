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
        <button type="submit" onclick="makeBooking()">Book Now</button>
    </form>
</section>`;
    mainSection.innerHTML = bookingContent;

    // Fetch data from the API and populate the dropdown
    fetch('http://localhost:8080/skills/getAllUserStatus')
        .then(response => response.json())
        .then(data => {
            const selectSkills = document.querySelector('.skills');
            selectSkills.innerHTML = data.map(skill => `<option value="${skill.skill_id}">${skill.name}</option>`).join('');
        })
        .catch(error => console.error('Error fetching data:', error));
}
const makeBooking = () => {
    // Get form input values
    const selectedSkill = document.querySelector('.skills').value;
    const serviceDate = document.querySelector('.serviceDate').value;
    const expectedTime = document.querySelector('.expectedTime').value;
    const problemDescription = document.querySelector('.problemDescription').value;

    // Log the form input values to the console
    console.log("Selected Skill:", selectedSkill);
    console.log("Service Date:", serviceDate);
    console.log("Expected Time:", expectedTime);
    console.log("Problem Description:", problemDescription);

    // Reload the booking form
    loadBooking();
}
