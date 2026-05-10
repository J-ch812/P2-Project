/* Skal være i alle filerne -- den henter knappen med id="logoutBtn", som eksisterer under profile */

console.log("logout.js loaded"); /* DELETE */

const logoutBtn = document.getElementById('logoutBtn');

/* If the button doesn’t exist on some page, this will catch it, and prevent a crash */
if (logoutBtn) {
    /* async because we are making an API call -- using await fetch() */
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
                /* body: JSON.stringify() --??-- without the {} */
            });
            const data = await response.json();

            if (response.ok) {
                /* localStorage.removeItem('user', JSON.stringify(data.user)); */
                localStorage.removeItem('user');

                /* localStorage.setItem('loggedIn', 'false'); --other option */ /* or removeItem, but then in header_changing.js we need to check if it's 'true' or not existing at all */
                
                window.location.href = '../index.html'; /* redirect to frontpage after logout */
            } else {
                
                alert(data.message);
            }
        } catch (error) {
            alert('Could not connect to server');
        }
    });
}