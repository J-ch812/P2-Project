const signupBtn = document.getElementById('signupBtn');
 
signupBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // stops the link from navigating immediately

    const email = document.querySelector('.email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const university = document.getElementById('university').value;
    const fieldofstudy = document.getElementById('field').value;
    const semester = document.getElementById('semester').value;
    const role = document.getElementById('Check1').checked? 'student': 'professor';
    
    try {
        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username, semester, university, role, fieldofstudy})
        });
        const data = await response.json();
        
        if (response.ok) {
            console.log(response)

            // Save user data for later use 
            localStorage.setItem('user', JSON.stringify(data.user));

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
