function logout() {
    showPopup('logout successfully')
    sessionStorage.clear(); 
    window.location.hash = ''; 
    loadUserNav(); 
    loadUserDashboard();
}