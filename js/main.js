  var waterGoal = 2500;
  var waterProgress = 0; //store value in mL's, change the increment to L as needed
  var standardIncrement = 250;
  
  // TODO: in progress 
  function editInformation(val) {
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
    document.getElementById("current").innerHTML = waterDisplay + waterIncrement;

    //Check if goal has been reached
    if (waterProgress >= waterGoal) {
      document.getElementById("current").innerHTML = waterDisplay + waterIncrement + " Goal Reached!";

    }
  }

  function reset() {
    waterProgress = 0;
    displayProgress();
  }