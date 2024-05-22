// function loadRegisterFormTech() {
//     var mainContent = document.getElementById('content');
//     mainContent.innerHTML = '';

//     Promise.all([
//         fetch('http://localhost:8080/cities/getAllUserCities').then(response => response.json()),
//         fetch('http://localhost:8080/skills/getAllUserStatus').then(response => response.json())
//     ]).then(([citiesData, skillsData]) => {
//         var cityDropdownOptions = citiesData.map(city => `<option value="${city.name}">${city.name}</option>`).join('');
//         var skillsDropdownOptions = skillsData.map(skill => `<option value="${skill.name}">${skill.name}</option>`).join('');

//         var registerSection = document.createElement('section');
//         registerSection.id = 'register';
//         registerSection.className = 'content registerclass';

//         var registerContent = `
//             <h1>User Registration</h1>
//             <form id="userRegistrationForm" onsubmit="submitTechRegistration(event)">
//             <div class="form-group">
//                     <label for="skill">Skill:</label>
//                     <select id="skill" name="skill" required>
//                         <option value="">Select Skill</option>
//                         ${skillsDropdownOptions}
//                     </select>
//                 </div>
//                 <div class="form-group">
//                      <label for="firstName">firstName:</label>
//                     <input type="text" id="firstName" name="firstName" required>
//                  </div>
//                 <div class="form-group">
//                         <label for="lastName">lastName:</label>
//                         <input type="text" id="lastName" name="lastName" required>
//                  </div>
//             <div class="form-group">
//                  <label for="email">email:</label>
//                  <input type="text" id="email" name="email" required>
//             </div>
//                 <div class="form-group">
//                     <label for="houseNo">House No:</label>
//                     <input type="text" id="houseNo" name="houseNo" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="street">Street:</label>
//                     <input type="text" id="street" name="street" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="society">Society:</label>
//                     <input type="text" id="society" name="society" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="locality">Locality:</label>
//                     <input type="text" id="locality" name="locality" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="city">City:</label>
//                     <select id="city" name="city" required>
//                         <option value="">Select City</option>
//                         ${cityDropdownOptions}
//                     </select>
//                 </div>
//                 <div class="form-group">
//                     <label for="pincode">Pincode:</label>
//                     <input type="text" id="pincode" name="pincode" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="contactNo">Contact No:</label>
//                     <input type="text" id="contactNo" name="contactNo" required>
//                 </div>
//                 <button type="submit">Submit</button>
//                 <button type="button" onclick="loadCancelRegisterTech()">Cancel</button>
//             </form>
//         `;

//         registerSection.innerHTML = registerContent;
//         mainContent.appendChild(registerSection);
//     }).catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }

// function submitTechRegistration(event) {
//     event.preventDefault();



//     var firstName = document.getElementById('firstName').value;
//     var lastName = document.getElementById('lastName').value;
//     var email = document.getElementById('email').value; 
//     var houseNo = document.getElementById('houseNo').value;
//     var street = document.getElementById('street').value;
//     var society = document.getElementById('society').value;
//     var locality = document.getElementById('locality').value;
//     var city = document.getElementById('city').value;
//     var pincode = document.getElementById('pincode').value;
//     var contactNo = document.getElementById('contactNo').value;
//    // var skill = 'none';
//     var role = 'Technician';
//     var requestData = {
//         firstName: firstName,
//         lastName: lastName,
//         houseNo: houseNo,
//         street: street,
//         society: society,
//         locality: locality,
//         city: city,
//         pincode: pincode,
//         contact: contactNo,
//         email: email,
//         role: role,
//         skill: skill
//     };

//     fetch('http://localhost:8080/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//            // 'Authorization': `Bearer ${idToken}`
//         },
//         body: JSON.stringify(requestData)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to register user');
//             }
//             console.log("not register");
//             return response.json();
        
//         })
//         .then(data => {
//             console.log("register");
//             showPopup('User registered successfully:', data);
//             loadLoginUser();
//         })
//         .catch(error => {
//             console.error('Error registering user:', error);
//         });

//     // var urlParams = new URLSearchParams(window.location.hash.substring(1));
//     // var idToken = urlParams.get('id_token');
//     // var decodedToken = parseJwt(idToken);
//     // var email = decodedToken.email;
//     // var name = decodedToken.name;

//     // var houseNo = document.getElementById('houseNo').value;
//     // var street = document.getElementById('street').value;
//     // var society = document.getElementById('society').value;
//     // var locality = document.getElementById('locality').value;
//     // var city = document.getElementById('city').value;
//     // var pincode = document.getElementById('pincode').value;
//     // var contactNo = document.getElementById('contactNo').value;
//     // var skill = document.getElementById('skill').value;
//     // var role = 'Technician';
//     // var requestData = {
//     //     houseNo: houseNo,
//     //     street: street,
//     //     society: society,
//     //     locality: locality,
//     //     city: city,
//     //     pincode: pincode,
//     //     contact: contactNo,
//     //     email: email,
//     //     name: name,
//     //     role: role,
//     //     skill: skill
//     // };

//     // fetch('http://localhost:8080/register', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //         'Authorization': `Bearer ${idToken}`
//     //     },
//     //     body: JSON.stringify(requestData)
//     // })
//     //     .then(response => {
//     //         if (!response.ok) {
//     //             throw new Error('Failed to register user');
//     //         }
//     //         return response.json();
//     //     })
//     //     .then(data => {
//     //         showPopup('User registered successfully:', data);
//     //         loadLoginTech();
//     //     })
//     //     .catch(error => {
//     //         console.error('Error registering user:', error);
//     //     });
// }



function loadCancelRegisterTech() {
    const url = window.location.href.split('#')[0]; // Remove the hash part of the URL
    history.replaceState(null, null, url);
    loadLanding();
}


function loadRegisterFormTech() {
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = '';

    Promise.all([
        fetch('http://localhost:8080/cities/getAllUserCities').then(response => response.json()),
        fetch('http://localhost:8080/skills/getAllUserStatus').then(response => response.json())
    ]).then(([citiesData, skillsData]) => {
        var cityDropdownOptions = citiesData.map(city => `<option value="${city.name}">${city.name}</option>`).join('');
        var skillsDropdownOptions = skillsData.map(skill => `<option value="${skill.name}">${skill.name}</option>`).join('');

        var registerSection = document.createElement('section');
        registerSection.id = 'register';
        registerSection.className = 'content registerclass';

        var registerContent = `
            <h1>User Registration</h1>
            <form id="userRegistrationForm" onsubmit="submitTechRegistration(event)">
                <div class="form-group">
                    <label for="skill">Skill:</label>
                    <select id="skill" name="skill" required>
                        <option value="">Select Skill</option>
                        ${skillsDropdownOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
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
                <button type="button" onclick="loadCancelRegisterTech()">Cancel</button>
            </form>
        `;

        registerSection.innerHTML = registerContent;
        mainContent.appendChild(registerSection);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}


function submitTechRegistration(event) {
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
    var skill = document.getElementById('skill').value;
    var role = 'Technician';

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

    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            const errorData = response.json();
            throw new Error(`Failed to register user: ${errorData.message}`);

        }
        return response.json();
    })
    .then(data => {
        console.log('User registered successfully:', data);
        console.log(data.state)
        if(!data.state){
            loadLoginUser();
            showPopup('User registered successfully:', data);
        }
        else{
            showPopup('already registered as:' + data.role );
            // showMyPopup("error",data.role,"user already exist",)
             loadRegisterFormTech();
           
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        showPopup('Error registering user:', error.message);
    });
}
