
const loadLogin = () => {
    const clientId = '1004581828869-dgt1j8h4qe36f4lg72ci5rjhgsm8400m.apps.googleusercontent.com'; // Replace with your actual client ID
    const redirectUri = 'http://34.242.206.146:8080/index.html'; // Replace with your actual redirect URI
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