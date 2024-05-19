// Function to fetch user info using the ID token
const fetchUserInfoTech = (idToken) => {
    const decodedToken = parseJwt(idToken);
    const email = decodedToken.email;
    const name = decodedToken.name;

    const url = 'http://localhost:8080/verify';

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${idToken}`
        },
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.email == null) {
                console.log("need to register.");
                loadRegisterFormTech();
            } else if (data.role == 'User') {
                console.log("You are already registered as a user.");
                const url = window.location.href.split('#')[0]; // Remove the hash part of the URL
                history.replaceState(null, null, url);
                loadLanding();
            } else {
                console.log("success.");

                sessionStorage.setItem('emailtech', data.email);
                sessionStorage.setItem('nametech', name);
                sessionStorage.setItem('tokentech', idToken);
                console.log(idToken);
                const url = window.location.href.split('#')[0]; // Remove the hash part of the URL
                history.replaceState(null, null, url);
                console.log(idToken);
                techDashBoard();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function loadLoginTech() {
    sessionStorage.setItem('tech','tech')
    loadLogin();
}

// function logOutTech() {
//     sessionStorage.clear();  // Clear all session storage items
//     window.location.hash = '';  // Clear the URL hash to remove any lingering OAuth tokens

//     // Clear header and navbar contents
//     document.getElementById('head').innerHTML = '';
//     document.getElementById('navbar').innerHTML = '';

//     // Remove header styles if any
//     var headerStyle = document.getElementById('headerStyle');
//     if (headerStyle) {
//         headerStyle.remove();
//     }

//     loadLanding();
// }

function logOutTech() {
    sessionStorage.clear();  // Clear all session storage items
    window.location.hash = '';  // Clear the URL hash to remove any lingering OAuth tokens

    // Clear header and navbar contents
    document.getElementById('head').innerHTML = '';
    document.getElementById('navbar').innerHTML = '';

    // Remove header styles if any
    var headerStyle = document.getElementById('headerStyle');
    if (headerStyle) {
        headerStyle.remove();
    }

    loadLanding();
}
