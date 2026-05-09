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
             localStorage.setItem ('user', JSON.stringify(data.user));
            window.location.href = '../html_components/new_header_logged_in.html';

            // login successful - redirect to next page

        } else {
            // show error to user
            alert(data.message);
        }
    } catch (error) {
        alert('Could not connect to server');
    }
});


 