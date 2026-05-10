// HEADER STATE ELEMENTS
const navLoggedInDesktop = document.getElementById('navLoggedInDesktop');
const navLoggedInMobile = document.getElementById('navLoggedInMobile');
const userProfile = document.getElementById('userProfile');

const navLoggedOutDesktop = document.getElementById('navLoggedOutDesktop');
const navLoggedOutMobile = document.getElementById('navLoggedOutMobile');
const authButtons = document.getElementById('authButtons');

// CHANGE HEADER STATE
function setLoggedInState(isLoggedIn) {

    // LOGGED IN ELEMENTS
    navLoggedInDesktop.classList.toggle('hidden', !isLoggedIn);
    navLoggedInMobile.classList.toggle('hidden', !isLoggedIn);
    userProfile.classList.toggle('hidden', !isLoggedIn);

    // LOGGED OUT ELEMENTS
    navLoggedOutDesktop.classList.toggle('hidden', isLoggedIn);
    navLoggedOutMobile.classList.toggle('hidden', isLoggedIn);
    authButtons.classList.toggle('hidden', isLoggedIn);
}


// LOGIN
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {

            // SAVE USER TO LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(data.user));

            // SHOW LOGGED IN HEADER
            setLoggedInState(true);

            // REDIRECT
            // window.location.href = '../html_components/new_header_combined.html';
            window.location.href = '../semester_overview_homepage/semester_overview.html';

        } else {

            // SHOW ERROR MESSAGE
            alert(data.message);

        }

    } catch (error) {

        alert('Could not connect to server');

    }
});


// LOGOUT FUNCTION
function logout() {

    // REMOVE USER FROM LOCAL STORAGE
    localStorage.removeItem('user');

    // SHOW LOGGED OUT HEADER
    setLoggedInState(false);

    // OPTIONAL REDIRECT
    window.location.href = '../index.html';
}


// CHECK LOGIN STATE ON PAGE LOAD
const isLoggedIn = !!localStorage.getItem('user');

setLoggedInState(isLoggedIn);