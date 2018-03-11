var config = {
    apiKey: "AIzaSyDd7UAT3w-e3ZF_QHOwUE6oAE4q5BCXuDE",
    authDomain: "train-scheduler-1229b.firebaseapp.com",
    databaseURL: "https://train-scheduler-1229b.firebaseio.com",
    projectId: "train-scheduler-1229b",
    storageBucket: "",
    messagingSenderId: "605708027921"
};
  firebase.initializeApp(config);
  
  var database = firebase.database();

  var nextTrain;
  
  // 2. Button for adding trains
  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#min-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.time);
    // console.log(newTrain.min);
  
    // clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
  });

var calculateTime = function(frequencyInput, timeInput) {
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(timeInput, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequencyInput;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequencyInput - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var arrivalTime = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return {
        minutesTill: tMinutesTillTrain,
        next: arrivalTime
    };

}

  //adds table row to html
  function addRowToTable(table, cell1, cell2, cell3, cell4, cell5) {
    var row;
    // row = "<tr><td>" + cell1 + "</td><td>" + cell2 + "</td><td>" + cell3 + "</td></tr>";
    // //TO DO add cell5 for next arrival and minutes away
    row = "<tr><td>" + cell1 + "</td><td>" + cell2 + "</td><td>" + cell3 + "</td><td>" + cell4 + "</td><td>" + cell5 + "</td></tr>";
    table.append(row);
    }
  
  // creates Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().time;
  
    // train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);

    var momentsObj = calculateTime(trainFrequency, firstTime);

    console.log(momentsObj);

    addRowToTable($("#table-body"), trainName, trainDestination, trainFrequency, momentsObj.next, momentsObj.minutesTill);
  
  });