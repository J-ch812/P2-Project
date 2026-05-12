
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    document.getElementById("profile_username").textContent =
        user.username || "";

    document.getElementById("profile_role").textContent =
        `Profile (${user.role || "Student"})`;

    document.getElementById("profile_email").textContent =
        user.email || "";

    document.getElementById("profile_university").textContent =
        user.university || "";

    document.getElementById("profile_semester").textContent =
        user.semester
            ? `${user.semester}. Semester`
            : "";

    document.getElementById("profile_fieldofstudy").textContent =
        user.fieldofstudy || "";
});