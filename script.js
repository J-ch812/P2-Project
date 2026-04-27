// GO BACK FUNCTION
// --Go back to previous page when clicking on the Back button
  // --?-- if the same page is loaded multiple times it just goes back to the same page.
  // --?-- if the page is opened on another page than index.html and the user have gone to other pages and then back to the original page the button will not go to index.com (as it should based on the fallback), because the history is longer than 1, but there is no more history.
  // --?-- maybe we should include a history tracker or something.
// The buttions in which the goBack() function is applied
document.querySelectorAll(".btn_back, .md_btn.no, .md_btn.yes").forEach(btn => {
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



//OVERLAYS
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

// LECTURE PROGRESS COUNTERS
// Sets up the connection between each lecture, its topic checkboxes, its lecture checkbox,
// and the progress counter shown on the right side of the lecture row.
document.querySelectorAll(".lecture_dropdown").forEach((lecture) => {
  const topicCheckboxes = lecture.querySelectorAll(".topic_checkbox");
  const counter = lecture.querySelector(".lecture_counter");
  const lectureCheckbox = lecture.querySelector(".lecture_checkbox")

  // When a topic checkbox changes, update both the lecture counter and the block progress.
  topicCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateLectureCounter(lecture);
      saveCurrentBlockCheckboxStates();
      updateBlockProgress();
    });
  });

  // When the lecture checkbox changes, set all topics inside that lecture to the same state.
  lectureCheckbox.addEventListener("change", () => {
    topicCheckboxes.forEach((checkbox) =>{
      checkbox.checked = lectureCheckbox.checked;
    });

    // Open the lecture when it is completed, and close it again when it is unchecked.
    if(lectureCheckbox.checked){
      lecture.open = true;
    }else{
      lecture.open = false;
    }
    
    updateLectureCounter(lecture);
    saveCurrentBlockCheckboxStates();
    updateBlockProgress();
  });
});

// Updates the counter for one lecture, for example "2/4".
// If all topics in a lecture are checked, the main lecture checkbox is checked automatically.
function updateLectureCounter(lecture) {
  const topicCheckboxes = lecture.querySelectorAll(".topic_checkbox");
  const checkedTopics = lecture.querySelectorAll(".topic_checkbox:checked");
  const counter = lecture.querySelector(".lecture_counter");
  const lectureCheckbox = lecture.querySelector(".lecture_checkbox");

  // Workshops do not have topic checkboxes, so their progress is based on the lecture checkbox itself.
  if(topicCheckboxes.length === 0){
    counter.textContent = lectureCheckbox.checked ? "1/1" : "0/1"
    return;
  }

  counter.textContent = checkedTopics.length + "/" + topicCheckboxes.length;

  if (topicCheckboxes.length > 0){
    lectureCheckbox.checked = checkedTopics.length === topicCheckboxes.length;
  }
}

// Updates the progress for the current DTG block page.
// The function finds the current block number from the filename and updates the matching block bar.
function updateBlockProgress(){
  const currentBlockNumber = getCurrentBlockNumber();
  if(!currentBlockNumber){
    return;
  }

  const blockPercentage = document.querySelector(".block" + currentBlockNumber + "_percentage");
  const blockBar = document.querySelector(".progress_bar.block" + currentBlockNumber);
  const topicCheckboxes = document.querySelectorAll(".topic_checkbox");
  const checkedTopics = document.querySelectorAll(".topic_checkbox:checked");

  // A workshop is any lecture without topic checkboxes.
  // These are counted as one task each in the block progress.
  const workshopCheckboxes = Array.from(document.querySelectorAll(".lecture_dropdown"))
    .filter((lecture) => lecture.querySelectorAll(".topic_checkbox").length === 0)
    .map((lecture) => lecture.querySelector(".lecture_checkbox"))
    .filter((checkbox) => checkbox);
  const totalTasks = topicCheckboxes.length + workshopCheckboxes.length;

  let checkedTasks = checkedTopics.length;
  workshopCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedTasks = checkedTasks + 1;
    }
  });
  
  const percentage = totalTasks === 0 ? 0 : Math.round((checkedTasks / totalTasks) * 100);

  localStorage.setItem("dtg-block-" + currentBlockNumber + "-progress", percentage);

  blockPercentage.textContent = percentage + "%";
  blockBar.style.setProperty("--progress", percentage + "%");

  // After the current block changes, the total DTG progress must be recalculated too.
  updateDTGProgress();
}

// Reads the block number from the current file path, for example "DTGBlock3.html" returns "3".
function getCurrentBlockNumber(){
  const match = window.location.pathname.match(/DTGBlock(\d)\.html$/);
  return match ? match[1] : null;
}

// Finds all checkboxes in the lecture list on the actual block-side
function getCurrentBlockCheckboxes(){
  return document.querySelectorAll(".lecture_dropdown input[type='checkbox']");
}

// Saves the states of the checkboxes
function saveCurrentBlockCheckboxStates(){
  const currentBlockNumber = getCurrentBlockNumber();

  if(!currentBlockNumber){
    return;
  }

  getCurrentBlockCheckboxes().forEach((checkbox, index) => {
    const checkboxKey = "dtg-block-" + currentBlockNumber + "-checkbox-" + index;
    localStorage.setItem(checkboxKey, checkbox.checked);
  });
}

// Loads the states of the checkboxes
function loadCurrentBlockCheckboxStates(){
  const currentBlockNumber = getCurrentBlockNumber();

  if(!currentBlockNumber){
    return;
  }

  getCurrentBlockCheckboxes().forEach((checkbox, index) => {
    const checkboxKey = "dtg-block-" + currentBlockNumber + "-checkbox-" + index;
    const savedState = localStorage.getItem(checkboxKey);

    if(savedState !== null){
      checkbox.checked = savedState === "true";
    }
  });
}

// Updates the overall DTG progress based on the four block percentages shown in the sidebar.
function updateDTGProgress(){
  const dtgBar = document.querySelector(".dtg_bar");
  const dtgPercentage = document.querySelector(".dtg_percentage");
  if(!dtgBar || !dtgPercentage){
    return;
  }

  // Read the visible percentage from each block row. Missing blocks count as 0%.
  const blockPercentages = [1, 2, 3, 4].map((blockNumber) => {
    const percentageElement = document.querySelector(".block" + blockNumber + "_percentage");
    if(!percentageElement){
      return 0;
    }

    return Number(percentageElement.textContent.replace("%", "")) || 0;
  });

  const dtgProgress = Math.round(
    blockPercentages.reduce((total, percentage) => total + percentage, 0) / blockPercentages.length
  );

  dtgPercentage.textContent = dtgProgress + "%";
  dtgBar.style.setProperty("--progress", dtgProgress + "%");
}

//Load the block progress when changing between blocks
function loadSavedBlockProgress(){
  [1, 2, 3, 4].forEach((blockNumber) => {
    // get saved progress from localStorage
    const savedProgress = localStorage.getItem("dtg-block-" + blockNumber + "-progress") || 0;

    // find percentage element
    const blockPercentage = document.querySelector(".block" + blockNumber + "_percentage");

    // find progress bar
    const blockBar = document.querySelector(".progress_bar.block" + blockNumber);

    // if both exist, update them
    if(blockPercentage && blockBar){
      blockPercentage.textContent = savedProgress + "%";
      blockBar.style.setProperty("--progress", savedProgress + "%");
    }

  });

  updateDTGProgress();
}

// Initialize the progress bars when the page loads.
loadSavedBlockProgress();
loadCurrentBlockCheckboxStates();
updateBlockProgress();
