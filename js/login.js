
const loadLogin = () => {
    const clientId = '1004581828869-dgt1j8h4qe36f4lg72ci5rjhgsm8400m.apps.googleusercontent.com'; // Replace with your actual client ID
    const redirectUri = 'http://localhost:5500/index.html'; // Replace with your actual redirect URI
    const scope = 'email profile openid';

    // Construct Google OAuth URL with OpenID Connect for ID token
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&nonce=123`;

    // Redirect user to Google OAuth URL
    window.location.href = authUrl;
}

const parseTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    return urlParams.get('id_token');
}
const fetchUserInfo = (idToken) => {
    const decodedToken = parseJwt(idToken);
    const email = decodedToken.email;
    const name = decodedToken.name;

    // Store email and name in session storage
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('name', name);

    console.log("jwt token", idToken);
    console.log('User ID:', decodedToken.sub);
    console.log('Name:', name);
    console.log('Email:', email);

    console.log("session data", sessionStorage.getItem('name'));

    // Define the URL to send the POST request to
    const url = 'http://34.242.206.146:8080/login/auth'; // Replace 'https://example.com/userInfo' with your actual endpoint URL

    // Define the request body
    const body = JSON.stringify({ email: email });

    // Define request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };

    // Send the POST request using fetch
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            console.log('Response:', data);
            if (data.email == null) {
                console.log("call registration page");
                loadRegisterform();
            }
            else {
                sessionStorage.setItem('token', data.token);
                console.log("user session token set:- ",sessionStorage.getItem('token'));
            }


        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
}



const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const logout = () => {
    sessionStorage.clear();
    loadLogin();
}