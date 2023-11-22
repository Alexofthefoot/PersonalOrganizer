  localStorage.setItem("lastname", "Smith");
  var waterGoal = 2500;
  var waterProgress = 0; //store value in mL's, change the increment to L as needed
  var standardIncrement = 250;
  
  function showForm() {

  }

  function editInformation(val) {
    //show form
    document.getElementById("water-form").style.display = "inline";

    //set watergoal
    //set standard increment
    //set water progress
  }

  // Changes what is displayed on the page
  function displayGoal() {

  }

  // Progress is increased by a standard increment
  function increaseProgress() {
    waterProgress += standardIncrement;
    displayProgress();
  }

  // Changes what is displayed on the page
  function displayProgress() {
    //set initial values
    waterIncrement = "mL";
    waterDisplay = waterProgress;
    //check if mL or L
    if (waterProgress > 999) {
      waterIncrement = "L"
      waterDisplay = waterProgress/1000;
    }

    //adjust display
    document.getElementById("progress").innerHTML = waterDisplay + waterIncrement;

    //Check if goal has been reached
    if (waterProgress >= waterGoal) {
      document.getElementById("reachgoal").innerHTML = "Goal Reached, great job!";

    }
  }

  function reset() {
    waterProgress = 0;
    displayProgress();
    // hide the form
    document.getElementById("water-form").style.display = "none";

  }
