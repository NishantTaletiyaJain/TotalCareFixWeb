const loadLogin = () => {
    const clientId = '1004581828869-dgt1j8h4qe36f4lg72ci5rjhgsm8400m.apps.googleusercontent.com';
    const redirectUri = 'https://totalcarefix.projects.bbdgrad.com/web/index.html';
    const scope = 'email profile openid';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&nonce=123`;
    window.location.href = authUrl;
}

// Function to parse the ID token from the URL
const parseTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get('id_token');
}

// Function to fetch user info using the ID token
const fetchUserInfo = (idToken) => {
    const decodedToken = parseJwt(idToken);
    const email = decodedToken.email;
    const name = decodedToken.name;

    const url = 'https://totalcarefix.projects.bbdgrad.com/api/verify';

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
                showPopup('Please registration first.')

                loadRegisterForm();
            } else if (data.role == 'Technician') {
                const url = window.location.href.split('#')[0]; // Remove the hash part of the URL
                history.replaceState(null, null, url);
                showPopup('You are already registered as a technician.')
                loadUserDashboard();
            } else {
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('token', idToken);
                showPopup('Login successfully')
                loadUserDashboard();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to parse JWT token
const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function loadLoginUser() {
    sessionStorage.setItem('tech','user')
    loadLogin();
}