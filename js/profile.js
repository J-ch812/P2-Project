document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        
        console.log(user);
        document.getElementById('profile_username').textContent = user.username;
        document.getElementById('profile_role').textContent = 'Profile (' + user.role + ')';
        document.getElementById('profile_email').textContent = user.email;
        document.getElementById('profile_university').textContent = user.university;
        document.getElementById('profile_semester').textContent = user.semester + '. Semester';
        document.getElementById('profile_fieldofstudy').textContent = user.fieldofstudy;
        
    }
});