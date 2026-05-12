/* Skal være i alle filerne -- den henter knappen med id="deleteProfileBtn", som eksisterer under profile */

console.log("delete_profile.js loaded"); /* DELETE */

const deleteProfileBtn = document.getElementById('deleteProfileBtn');

if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const confirmed = confirm('Are you sure you want to delete your profile?');
        if (!confirmed) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('No user is logged in.');
            return;
        }

        console.log('User object from localStorage:', user);
        const userId = user.id || user._id;
        console.log('User ID to delete:', userId);
        if (!userId) {
            alert('User ID is missing. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/delete_profile', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            const contentType = response.headers.get('Content-Type') || '';
            const data = contentType.includes('application/json')
                ? await response.json()
                : { message: response.statusText };

            if (response.ok) {
                localStorage.removeItem('user');
                window.location.href = '../index.html';
            } else {
                alert(data.message || 'Failed to delete profile');
            }

        } catch (error) {
            console.error(error);
            alert('Could not connect to server');
        }
    });
}