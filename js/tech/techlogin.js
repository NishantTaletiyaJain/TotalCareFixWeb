
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
                showPopup("need to register.");
                loadRegisterFormTech();
            } else if (data.role == 'User') {
                showPopup("You are already registered as a user.");
                const url = window.location.href.split('#')[0]; 
                history.replaceState(null, null, url);
                loadLanding();
            } else {
                showPopup("success.");

                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('token', idToken);
                const url = window.location.href.split('#')[0]; 
                history.replaceState(null, null, url);
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


function logOutTech() {
    sessionStorage.clear();  
    window.location.hash = '';  

    
    document.getElementById('head').innerHTML = '';
    document.getElementById('navbar').innerHTML = '';

    
    var headerStyle = document.getElementById('headerStyle');
    if (headerStyle) {
        headerStyle.remove();
    }

    loadUserDashboard()
}
