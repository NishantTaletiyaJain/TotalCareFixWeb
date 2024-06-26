function loadRegisterform() {
    var registerSection = document.getElementById('content');

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



function submitRegistration() {
    var registrationType = document.getElementById('registrationType').value;

    if (registrationType === 'user') {
        console.log(registrationType);
        registerFormUser();
    } else if (registrationType === 'technician') {
        console.log(registrationType);
        loadRegisterFormTech();
    }
}



function registerFormUser() {
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = ''; 

    fetch('https://totalcarefix.projects.bbdgrad.com/api/cities/getAllUserCities')
        .then(response => response.json())
        .then(data => {
            var cityDropdownOptions = '';

            data.forEach(city => {
                cityDropdownOptions += `<option value="${city.name}">${city.name}</option>`;
            });

            var registerSection = document.createElement('section');
            registerSection.id ='register';
            registerSection.className = 'content registerclass';

            var registerContent = `
                <h1>User Registration</h1>
                <form id="userRegistrationForm" onsubmit="submitUserRegistration(event)">
                    <div class="form-group">
                        <label for="firstName">firstName:</label>
                        <input type="text" id="firstName" name="firstName" required>
                   </div>
                   <div class="form-group">
                        <label for="lastName">lastName:</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>
                    <div class="form-group">
                         <label for="email">email:</label>
                         <input type="text" id="email" name="email" required>
                    </div>
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

    
    
    
    
    



    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value; 
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
        firstName: firstName,
        lastName: lastName,
        houseNo: houseNo,
        street: street,
        society: society,
        locality: locality,
        city: city,
        pincode: pincode,
        contact: contactNo,
        email: email,
        role: role,
        skill: skill
    };

    fetch('https://totalcarefix.projects.bbdgrad.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            console.log("not register");
            return response.json();
        
        })
        .then(data => {
            console.log("register");
            console.log(data.state)
            if(!data.state){
                loadLoginUser();
                showPopup('User registered successfully:', data);
            }
            else{
                showPopup('already registered as:' + data.role );
                loadRegisterFormTech();   
            }
            
            
        })
        .catch(error => {
            console.error('Error registering user:', error);
        });
}

function loadCancelRegister() {
    const url = window.location.href.split('#')[0]; 
    history.replaceState(null, null, url);
    loadUserDashboard();
}