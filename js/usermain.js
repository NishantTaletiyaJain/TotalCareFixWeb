document.addEventListener('DOMContentLoaded', function () {
    const idToken = parseTokenFromUrl();
    

    if (idToken) {
        if (sessionStorage.getItem('tech') == 'tech') {
            fetchUserInfoTech(idToken)
        }
        else {
            fetchUserInfo(idToken);
        }
    } else if (sessionStorage.getItem('email') != null || sessionStorage.getItem('emailtech') != null) {
        if (sessionStorage.getItem('tech') == 'tech') {
           
            techDashBoard();
        }
        else {
            loadUserDashboard();
        }
    } else {
        loadLanding();
    }
});
