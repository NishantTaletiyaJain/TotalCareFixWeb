function loadUserNav() {
    sessionStorage.setItem('flag', null);
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = '';

    const ul = document.createElement('ul');

    const menuItems = [];
    if (sessionStorage.getItem('email') !== null) {
        // User is logged in
        menuItems.push({ text: 'Home', onclick: 'loadHome()' });
        menuItems.push({ text: 'Booking', onclick: 'loadBooking()' });
        menuItems.push({ text: 'SeeBooking', onclick: 'loadYourBooking()' });
        menuItems.push({ text: 'Logout', onclick: 'logout()' });
    } else {
        // User is not logged in
        menuItems.push({ text: 'Home', onclick: 'loadHome()' });
        menuItems.push({ text: 'Login', onclick: 'loadLoginUser()' });
        menuItems.push({ text: 'Register', onclick: 'loadRegisterform()' });
    }

    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.text;
        a.setAttribute('onclick', item.onclick);
        li.appendChild(a);
        ul.appendChild(li);
    });

    navbar.appendChild(ul);
}
