
const loadLogin = () => {
    const clientId = '1004581828869-dgt1j8h4qe36f4lg72ci5rjhgsm8400m.apps.googleusercontent.com'; 
    const redirectUri = 'http://localhost:5500/index.html'; 
    const scope = 'email profile openid';

    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&nonce=123`;

    
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

    
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('name', name);

    
    
    
    

    

    
    const url = 'http://localhost:8080/login/auth'; 

    
    const body = JSON.stringify({ email: email });

    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
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
                
                
                loadRegisterform();
            }
            else {
                sessionStorage.setItem('token', data.token);
                
            }


        })
        .catch(error => {
            
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
    // loadLogin();
}