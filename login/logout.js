
console.log("logout.js loaded");

const logoutBtn = document.getElementById('logoutBtn');
console.log("logoutBtn:", logoutBtn);
 
logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
   
    try {
        const response = await fetch('http://localhost:4000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const data = await response.json();
        if (response.ok) {
             localStorage.removeItem('user', JSON.stringify(data.user));

            
            window.location.href ='../html_components/new_header_logged_out.html';
        } else {
            
            alert(data.message);
        }
    } catch (error) {
        alert('Could not connect to server');
    }
});


 

