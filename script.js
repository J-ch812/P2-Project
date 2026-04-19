//alert("Velkommen til P2 projekt");

// BACK BUTTON
// --Go back to previous page when clicking on the Back button
document.querySelector(".btn_back").addEventListener("click", () => {
  if (history.length > 1) {
    history.back(); //Or: history.go(-1);
  } else {
    window.location.href = "../index.html"; // fallback
  }
});

//DROPDOWN BLOCKS
// Show dropdown when cliked
document.querySelectorAll(".dropdownButton").forEach((button) => {
  //--Finds all elements with class .dropdownButton, returning them as a list (NodeList), and then runs the code for each button
  button.addEventListener("click", (e) => {
    //--Listens for when the button is clicked, e = the event object
    const dropdown = e.target.closest(".dropdown"); //--e.target = the element that was clicked, .closest(".dropdown") = goes up the HTML tree to find the nearest parent with class .dropdown
    dropdown.classList.toggle("active"); //--Click: adds active (dropdown shows), Click again: removes active (dropdown hides)
  });
});

// Hide when clicking outside
document.addEventListener("click", (e) => {
  //--Listens for any click anywhere on the page
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    //--Checks every dropdown on the page
    if (!dropdown.contains(e.target)) {
      //--Check if click is not inside the dropdown
      dropdown.classList.remove("active"); //--Removes the active class thereby hiding the dropdown
    }
  });
});
