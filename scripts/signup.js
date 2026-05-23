const signupBtn = document.getElementById('signupBtn');

signupBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // stops the link from navigating immediately

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const university = document.getElementById('university').value;
    const fieldofstudy = document.getElementById('field').value;
    const semester = document.getElementById('semester').value;
    const role = document.getElementById('Check1').checked? 'Student': 'Professor';

    try {
        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username, semester, university, role, fieldofstudy})
        });
        const data = await response.json();

        if (response.ok) {
            console.log(response)
            localStorage.setItem('user', JSON.stringify(data.user));  // Save user data for later use
            window.location.href = '../views/first_semester.html';  // login successful - redirect to next page
        } else {
            alert(data.message);  // show error to user
        }
    } catch (error) {
        alert('Could not connect to server');
    }
});