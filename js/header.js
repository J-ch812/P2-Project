/* In the css file when they have the class "active", they are set to: "display: none;" */
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = !!localStorage.getItem('user');
    /* const loggedIn = localStorage.getItem('loggedIn'); */

    const loggedOutHeader = document.querySelectorAll('.logged_out');
    const loggedInHeader = document.querySelectorAll('.logged_in');

    // user is logged in
    if (isLoggedIn) {
        loggedOutHeader.forEach(el => el.classList.add('active'));
        loggedInHeader.forEach(el => el.classList.remove('active'));
        console.log('User is logged in'); /* DELETE --?? */
    // user is logged out
    } else {
        loggedOutHeader.forEach(el => el.classList.remove('active'));
        loggedInHeader.forEach(el => el.classList.add('active'));
        console.log('User is logged out'); /* DELETE --?? */
    }
});