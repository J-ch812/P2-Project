document.addEventListener('DOMContentLoaded', () => {

    const loggedIn = localStorage.getItem('loggedIn');

    const loggedOutHeader = document.querySelector('.logged_out');
    const loggedInHeader = document.querySelector('.logged_in');

    if (loggedIn === 'true') {

        // user is logged in
        if (loggedOutHeader) {
            loggedOutHeader.classList.add('active');
        }

        if (loggedInHeader) {
            loggedInHeader.classList.remove('active');
        }

    } else {

        // user is logged out
        if (loggedOutHeader) {
            loggedOutHeader.classList.remove('active');
        }

        if (loggedInHeader) {
            loggedInHeader.classList.add('active');
        }
    }
});