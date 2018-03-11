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
  
  // 2. Button for adding trains
  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainMin = $("#min-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      min: trainMin
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

  //adds table row to html
  function addRowToTable(table, cell1, cell2, cell3, cell4) {
    var row;
    row = "<tr><td>" + cell1 + "</td><td>" + cell2 + "</td><td>" + cell3 + "</td><td>" + cell4 + "</td></tr>";
    //TO DO add cell5 for time away
    //row = "<tr><td>" + cell1 + "</td><td>" + cell2 + "</td><td>" + cell3 + "</td><td>" + cell4 + "</td><td>" + cell5 + "</td></tr>";
    table.append(row);
    }
  
  // creates Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainMin = childSnapshot.val().min;
  
    // train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainMin);

    addRowToTable($("#table-body"), trainName, trainDestination, trainTime, trainMin);
  
  });