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

// Updates the counters for all lectures after saved checkbox states are loaded. 
// Ensures the visible counters (for example "2/4") match the restored progress when the page is refreshed or revisited.
function updateAllLectureCounters(){
  document.querySelectorAll(".lecture_dropdown").forEach((lecture) => {
    updateLectureCounter(lecture);
  });
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
      return Number(localStorage.getItem("dtg-block-" + blockNumber + "-progress")) || 0;
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
updateAllLectureCounters();
updateBlockProgress();

// Hide and show progressbar
const progressStorageKey = "progressbar-collapsed";

function updateProgressToggleState(toggleProgressBtn, isCollapsed){
  const tooltipBox = toggleProgressBtn
    .closest(".progress_toggle_tooltip_container")
    ?.querySelector(".progress_toggle");

  if (isCollapsed) {
    toggleProgressBtn.setAttribute("aria-label", "Show progress");

    if(tooltipBox){
      tooltipBox.textContent = "Show progress bar";
    }
  } else {
    toggleProgressBtn.setAttribute("aria-label", "Hide progress");

    if(tooltipBox){
      tooltipBox.textContent = "Hide progress bar";
    }
  }
}

document.querySelectorAll(".progress_section").forEach((progressSection) => {
  const toggleProgressBtn = progressSection.querySelector(".progress_toggle_btn");
  const isCollapsed = localStorage.getItem(progressStorageKey) === "true";
  
  if(isCollapsed){
    progressSection.classList.add("collapsed");
  }

  if(toggleProgressBtn){
    updateProgressToggleState(toggleProgressBtn, isCollapsed);
  }
});

document.querySelectorAll(".progress_toggle_btn").forEach((toggleProgressBtn) => {
  toggleProgressBtn.addEventListener("click", () => {
    const progressSection = toggleProgressBtn.closest(".progress_section");

    if(!progressSection){
      return;
    }

    progressSection.classList.toggle("collapsed");

    const isCollapsed = progressSection.classList.contains("collapsed");
    localStorage.setItem(progressStorageKey, isCollapsed);
    updateProgressToggleState(toggleProgressBtn, isCollapsed);
  });
});