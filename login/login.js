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





const loginBtn = document.getElementById('loginBtn');
 
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // stops the link from navigating immediately
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            console.log(response);

            // login successful - redirect to next page

            // save login state
            localStorage.setItem('isLoggedIn', 'true');

            // update header
            setLoggedInState(true);







        } else {
            // show error to user
            alert(data.message);
        }
    } catch (error) {
        alert('Could not connect to server');
    }
});
 



// CHECK LOGIN STATE ON PAGE LOAD
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

setLoggedInState(isLoggedIn);