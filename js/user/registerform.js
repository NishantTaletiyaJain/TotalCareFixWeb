function loadRegisterform() {
    var registerSection = document.getElementById('body');

    var registerContent = `
        <section id="register" class="content registerclass">
            <h1>Register</h1>
            <label for="registrationType">Select Registration Type:</label>
            <select id="registrationType"">
                <option value="user">User</option>
                <option value="technician">Technician</option>
            </select>
            <button onclick="submitRegistration()">Submit</button>
        </section>
    `;

    registerSection.innerHTML = registerContent;
}

function registerUserForm() {
    var userRegisterSection = document.getElementById('register');

    
    fetch('http://localhost:8080/cities/getAllUserCities')
        .then(response => response.json())
        .then(data => {
            var cityDropdownOptions = ''; 

            
            data.forEach(city => {
                cityDropdownOptions += `<option value="${city.name}">${city.name}</option>`;
            });

            
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
                            ${cityDropdownOptions} <!-- Insert the populated dropdown options here -->
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
                </form>
            `;

            
            userRegisterSection.innerHTML = registerContent;
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
            
        });
}

function registerTechnicianForm() {
    var technicianRegisterSection = document.getElementById('register');

    var registerContent = `
        <h1>Technician Registration</h1>
        <!-- Technician registration form elements here -->
    `;

    technicianRegisterSection.innerHTML = registerContent;
}

function submitRegistration() {
    var registrationType = document.getElementById('registrationType').value;

    if (registrationType === 'user') {
        registerUserForm();
    } else if (registrationType === 'technician') {
        registerTechnicianForm();
    }
}
function submitUserRegistration(event) {
    event.preventDefault(); 
    
    
    var houseNo = document.getElementById('houseNo').value;
    var street = document.getElementById('street').value;
    var society = document.getElementById('society').value;
    var locality = document.getElementById('locality').value;
    var city = document.getElementById('city').value;
    var pincode = document.getElementById('pincode').value;
    var contactNo = document.getElementById('contactNo').value;
    var email = sessionStorage.getItem('email');
    var name = sessionStorage.getItem('name');
    var skill='none';
    var role='User'
    
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

    
    fetch('http://localhost:8080/register?email=' + email, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        
        console.log('User registered successfully:', data);
        
        // loadLogin();
        
    })
    .catch(error => {
        console.error('Error registering user:', error);
        
    });
}
