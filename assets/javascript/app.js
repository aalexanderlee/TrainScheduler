$(document).ready(function(){
//This progam will grab user input and append to the table, ID "train-list"
//Initialize Firebase to a Train Scheduler database
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
  var newName = $("#train-name").val().trim(); //given to append
  var newDestination = $("#destination").val().trim(); //given to append
  var firstArrivalUnix = moment($("#first-arrival").val().trim(), "HH:mm").subtract(10, "years").format("X"); 
  var newFrequency = $("#frequency").val().trim(); //given to append and used for calculations
  

  //This provides a path and pushes user info for train details into the firebase cloud
  database.ref().push({
    name: newName,
    destination: newDestination,
    firstTrain: firstArrivalUnix,
    frequency: newFrequency,
    startedAt: firebase.database.ServerValue.TIMESTAMP
  })

  //Helps keep track of our push to the cloud
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(firstArrivalUnix);
  console.log(snapshot.val().frequency);

  alert("All variables has been added to Firebase.")

  //Allows user to input values for train info; clears the text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("first-arrival").val("");
  $("#frequency").val("");

})

//listen for a new child
database.ref().on("child_added", function(snapshot){

  console.log(snapshot.val());
  
  //Display all user given inputs (train name, destination, frequency)
  var trainInfo = $('<tr>');

  var displayName = $('<td>').append(snapshot.val().name);
  var displayDestination = $('<td>').append(snapshot.val().destination);
  var displayFrequency = $('<td>').append(snapshot.val().frequency);
  var unixFirstArrival = snapshot.val().firstTrain;

  //Calculate the difference in time to find arrival with frequency data stored in Firebase
  var timeDiff = moment().diff(moment.unix(unixFirstArrival), "minutes");
  var timeLeft = moment().diff(moment.unix(unixFirstArrival), "minutes") % (snapshot.val().frequency);
  
  var minutes = (snapshot.val().frequency) - timeLeft;
  var nextArrival = moment().add(minutes, "m").format("hh:mm A"); 

  var displayArrival = $('<td>').append(nextArrival);
  var displayMinutes = $('<td>').append(minutes);
  //Display next arrival
  //var displayNextArrival = $('<td>').append(nextArrival);
  //Display minutes until arrival from moment
  //var displayMinutes = $('<td>').append(minutes);

  trainInfo.append(displayName, displayDestination, displayFrequency, displayArrival, displayMinutes);
  $('#train-list').append(trainInfo);

}, function(err){
  console.log("Errors: " + err.code);
  //alert(err.code)
  });

clear();

});
