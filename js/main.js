  localStorage.setItem("lastname", "Smith");
  
  var waterGoal = 2500;
  var waterProgress = 0; //store value in mL's, change the increment to L as needed
  var standardIncrement = 250;
  
  function openForm() {
    //un-hide the form
    document.getElementById("water-form").style.display = "inline";
    //set default form values based on current data
    document.getElementById("form-goal").value = waterGoal;
    document.getElementById("form-prog").value = waterProgress;
    document.getElementById("form-incr").value = standardIncrement;
  }

  // Update stored data based on form input. If blank, makes no change
 function closeForm() {  
    var goalInput = document.getElementById("form-goal").value;
    if (goalInput != null) {
      waterGoal = parseInt(goalInput);
      console.log("A is:" + typeof waterGoal)
    }
    var progInput = document.getElementById("form-prog").value;
    if (progInput != null) {
      waterProgress = parseInt(progInput);
      console.log("B is:" + typeof waterProgress)
    }
    var incrInput = document.getElementById("form-incr").value;
    if (incrInput != null) {
      standardIncrement = parseInt(incrInput);
      console.log("C is:" + typeof standardIncrement)
    }
    //hide form
    document.getElementById("water-form").style.display = "none";
    displayProgress();
    displayGoal();
  }

  // document.getElementById("water-form").onsubmit = function(e){
  //   var fieldValue = document.getElementByID("username").value;
  //   if(fieldValue == null || fieldValue == ""){
  //     // the field was empty. Stop form submission
  //     e.preventDefault();
  //     // Now tell the user something went wrong
  //     alert("you must enter a username");
  //     }
  //   }

  // Progress is increased by a standard increment
  function increaseProgress() {
    waterProgress = waterProgress + standardIncrement;
    displayProgress();
  }

  function displayGoal() {
    //adjust display
    if (waterGoal > 999) {
      document.getElementById("goal").innerHTML = waterGoal/1000 + "L";
    }
    else {
      document.getElementById("goal").innerHTML = waterGoal + "mL";
    }
  }

  // Updates what is displayed on the page
  function displayProgress() {
    //set initial values
    waterIncrement = "mL";
    var waterDisplay = waterProgress;
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
    else {
      document.getElementById("reachgoal").innerHTML = "";
    }
  }

  function reset() {
    waterProgress = 0;
    waterGoal = 2500;
    displayProgress();
    // hide the form
    document.getElementById("water-form").style.display = "none";

  }
