function logout() {
    showPopup('logout successfully')
    sessionStorage.clear();  // Clear all session storage items
    window.location.hash = '';  // Clear the URL hash to remove any lingering OAuth tokens
    loadUserNav();  // Reload the navigation bar to reflect the logout state
    loadUserDashboard();
}