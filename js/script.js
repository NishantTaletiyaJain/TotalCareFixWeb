document.addEventListener('DOMContentLoaded', function () {
    const idToken = parseTokenFromUrl();
    const storedEmail = sessionStorage.getItem('email');

    if (!idToken && !storedEmail) {
        loadLogin();
    } else {
        if (!storedEmail) {
            fetchUserInfo(idToken);
        }
        loadHome();
    }
});
