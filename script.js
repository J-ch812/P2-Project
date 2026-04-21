// GO BACK FUNCTION
// --Go back to previous page when clicking on the Back button
  // --?-- if the same page is loaded multiple times it just goes back to the same page.
// The buttions in which the goBack() function is applied
document.querySelectorAll(".btn_back, .md_button.no, .md_button.yes").forEach(btn => {
  btn.addEventListener("click", goBack);
});

// --The actual function for goBack()
function goBack() {
  if (history.length > 1) {
    history.back();  //Or: history.go(-1);
  } else {
    window.location.href = "../index.html";  //Fallback
  }
}



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



//OVERLAYS: DELETE OF PROFILE SUCCESSFUL
document.querySelectorAll(".overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    e.stopPropagation();
  });
});

function on(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add("active");
  // close dropdowns
  document.querySelectorAll(".dropdown").forEach(d => {
    d.classList.remove("active");
  });
  //Removes the ability to scroll
  document.body.style.overflow = "hidden";
}

function off(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}