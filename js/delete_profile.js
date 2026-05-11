/* Skal være i alle filerne -- den henter knappen med id="deleteProfileBtn", som eksisterer under profile */

console.log("delete_profile.js loaded"); /* DELETE */

const deleteProfileBtn = document.getElementById('deleteProfileBtn');

if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        try {
            const response = await fetch('http://localhost:4000/api/delete_profile', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.removeItem('user');

                window.location.href = '../index.html';

            } else {
                alert(data.message);
            }

        } catch (error) {
            alert('Could not connect to server');
        }
    });
}