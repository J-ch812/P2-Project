// GO BACK FUNCTION
// The buttions in which the goBack() function is applied
document.querySelectorAll(".btn_back, .md_btn.no, .md_btn.yes").forEach((btn) => {
    btn.addEventListener("click", goBack);
});

// --The actual function for goBack()
function goBack() {
  if (history.length > 1) {
    history.back(); //Or: history.go(-1);
  } else {
    window.location.href = "../index.html"; //Fallback
  }
}

//DROPDOWN BLOCKS & Profile
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

// Hide dropdowns when resizeing the width of the screen (used for all, but made for the nav_dropdown)
window.addEventListener("resize", () => {
  if (window.innerWidth > 1150) {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

//OVERLAYS
document.querySelectorAll(".overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

function on(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add("active");
  // close dropdowns
  document.querySelectorAll(".dropdown").forEach((d) => {
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

//Chekbox: select one
function chooseOne(id) {
  for (var i = 1; i <= 2; i++) {
    //goes through all the boxes and unchek them
    document.getElementById("Check" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}

// HOVER LABLE: HIDE AND SHOW PROFILE
document.querySelectorAll(".btn_profile").forEach((profileBtn) => {
  profileBtn.addEventListener("click", () => {
    const dropdown = profileBtn.closest(".dropdown");

    if (!dropdown) {
      return;
    }

    // dropdownButton listener already toggled active
    const isOpen = dropdown.classList.contains("active");

    profileBtn.setAttribute(
      "aria-label",
      isOpen ? "Hide profile" : "Show profile",
    );

    const tooltipBox = dropdown.querySelector(".tooltip_box.header_rigth");

    if (tooltipBox) {
      tooltipBox.textContent = isOpen ? "Hide profile" : "Show profile";
    }
  });
});