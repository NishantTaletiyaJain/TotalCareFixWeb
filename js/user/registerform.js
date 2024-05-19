function loadRegisterForm() {
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = ''; // Clear any existing content

    fetch('https://totalcarefix.projects.bbdgrad.com/api/cities/getAllUserCities')
        .then(response => response.json())
        .then(data => {
            var cityDropdownOptions = '';

            data.forEach(city => {
                cityDropdownOptions += `<option value="${city.name}">${city.name}</option>`;
            });

            var registerSection = document.createElement('section');
            registerSection.id = 'register';
            registerSection.className = 'content registerclass';

            var registerContent = `
                <h1>User Registration</h1>
                <form id="userRegistrationForm" onsubmit="submitUserRegistration(event)">
                    <div class="form-group">
                        <label for="houseNo">House No:</label>
                        <input type="text" id="houseNo" name="houseNo" required>
                    </div>
                    <div class="form-group">
                        <label for="street">Street:</label>
                        <input type="text" id="street" name="street" required>
                    </div>
                    <div class="form-group">
                        <label for="society">Society:</label>
                        <input type="text" id="society" name="society" required>
                    </div>
                    <div class="form-group">
                        <label for="locality">Locality:</label>
                        <input type="text" id="locality" name="locality" required>
                    </div>
                    <div class="form-group">
                        <label for="city">City:</label>
                        <select id="city" name="city" required>
                            <option value="">Select City</option>
                            ${cityDropdownOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pincode">Pincode:</label>
                        <input type="text" id="pincode" name="pincode" required>
                    </div>
                    <div class="form-group">
                        <label for="contactNo">Contact No:</label>
                        <input type="text" id="contactNo" name="contactNo" required>
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onclick="loadCancelRegister()">Cancel</button>
                </form>
            `;

            registerSection.innerHTML = registerContent;
            mainContent.appendChild(registerSection);
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });
}

function submitUserRegistration(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.hash.substring(1));
    var idToken = urlParams.get('id_token');
    var decodedToken = parseJwt(idToken);
    var email = decodedToken.email;
    var name = decodedToken.name;


    var houseNo = document.getElementById('houseNo').value;
    var street = document.getElementById('street').value;
    var society = document.getElementById('society').value;
    var locality = document.getElementById('locality').value;
    var city = document.getElementById('city').value;
    var pincode = document.getElementById('pincode').value;
    var contactNo = document.getElementById('contactNo').value;
    var skill = 'none';
    var role = 'User';
    var requestData = {
        houseNo: houseNo,
        street: street,
        society: society,
        locality: locality,
        city: city,
        pincode: pincode,
        contact: contactNo,
        email: email,
        name: name,
        role: role,
        skill: skill
    };

    fetch('https://totalcarefix.projects.bbdgrad.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.json();
        })
        .then(data => {
            showPopup('User registered successfully:', data);
            loadLoginUser();
        })
        .catch(error => {
            console.error('Error registering user:', error);
        });
}

function loadCancelRegister() {
    const url = window.location.href.split('#')[0]; // Remove the hash part of the URL
    history.replaceState(null, null, url);
    loadUserDashboard();
}