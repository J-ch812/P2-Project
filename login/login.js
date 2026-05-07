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
            console.log(response)

            // login successful - redirect to next page
            window.location.href = '../first_semester/first_semester.html';
        } else {
            // show error to user
            alert(data.message);
        }
    } catch (error) {
        alert('Could not connect to server');
    }
});
 