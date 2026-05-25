/* Skal kun være i login.html -- den henter knappen med id="loginBtn", som kun eksisterer i login.html */

// Redirect if already logged in
const isLoggedIn = !!localStorage.getItem('user');
if (isLoggedIn) {
    window.location.href = '../views/semester_overview.html';
}

/* Login logic */
const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
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
                
                // save login state -- NEW -- used for the header: to know if user is logged in or not, and show the correct header
                /* localStorage.setItem('loggedIn', 'true'); --other option*/


                // Save user data for later use 
                localStorage.setItem('user', JSON.stringify(data.user));

                /* alert(data.message); */

                // redirect to homepage page -- after login is successful, the user is redirected to the homepage
                window.location.href = '../views/first_semester.html';
            
            } else {
                // show error to user
                alert(data.message);
            }
        } catch (error) {
            alert('Could not connect to server');
        }
    });
}