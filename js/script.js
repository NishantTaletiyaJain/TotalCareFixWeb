document.addEventListener('DOMContentLoaded', function () {
    const idToken = parseTokenFromUrl();
    const storedEmail = sessionStorage.getItem('email');
    const token=sessionStorage.getItem('token');

    if (!idToken && !storedEmail && !token) {
        loadLogin();
    } else {
        if (!storedEmail) {
            fetchUserInfo(idToken);
        }
        loadUserNav();
        loadHome();
    }
});