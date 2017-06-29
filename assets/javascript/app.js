//This progam will grab user input and append to the table, ID "train-list"
//Initializing Firebase to a Train Scheduler database
var config = {
  apiKey: "AIzaSyB5lbwpv7jwNVV00A4PBPZM4pIcGnW1V7E",
  authDomain: "train-scheduler-7ecb6.firebaseapp.com",
  databaseURL: "https://train-scheduler-7ecb6.firebaseio.com",
  projectId: "train-scheduler-7ecb6",
  storageBucket: "",
  messagingSenderId: "418178654795"
  };

firebase.initializeApp(config);
var database = firebase.database();

//Grabs and appends the user info for train details when they click "Submit" at bottom
$("#submit-button").on('click', function(){
  var newName = $('#train-name').val().trim();
  var newDestination = $('#destination').val().trim();
  var newTrainTime = $('#first-train-time').val().trim();
  var newFrequency = $('#frequency').val().trim();

  //This pushes (AKA uploads) user info for train details into the firebase cloud
  database.ref().push({
    name: newName,
    destination: newDestination,
    firstTrainTime: newTrainTime,
    frequency: newFrequency,
    startedAt: firebase.database.ServerValue.TIMESTAMP
  })

  //Helps keep track of our push to the cloud
  console.log('attempt to push')
  //Allows user to input values for train info; clears the text boxes
  $('input').val('')
})

