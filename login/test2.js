const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();

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

            // save login state
            localStorage.setItem('loggedIn', 'true');

            // optional: save user
            localStorage.setItem('user', JSON.stringify(data.user));

            // redirect
            window.location.href = '../semester_overview_homepage/semester_overview.html';

        } else {
            alert(data.message);
        }

    } catch (error) {
        alert('Could not connect to server');
    }


    // LOGOUT
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');

            window.location.href = '../index.html';
        });
    }
});