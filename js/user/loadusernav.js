function loadUserNav() {
    sessionStorage.setItem('flag', null);
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = '';

    const ul = document.createElement('ul');

    const isUserLoggedIn = sessionStorage.getItem('email') !== null;

    const menuItems = [
        { text: 'Home', onclick: 'loadHome()' },
        { text: 'Booking', onclick: 'loadBooking()' },
        { text: 'SeeBooking', onclick: 'loadYourBooking()' },
    ];

    const authItem = isUserLoggedIn 
        ? { text: 'Logout', onclick: 'logout()' }
        : { text: 'Login', onclick: 'loadLoginUser()' };

    menuItems.push(authItem);

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