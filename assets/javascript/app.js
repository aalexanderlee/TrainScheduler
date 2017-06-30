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
  var newName = $('#train-name').val().trim(); //given to append
  var newDestination = $('#destination').val().trim(); //given to append
  var newFrequency = $('#frequency').val().trim(); //given to append and used for calculations
  var newArrival = $('#new-arrival').val().trim(); //used for calculations

  //This provides a path and pushes user info for train details into the firebase cloud
  database.ref().push({
    name: newName,
    destination: newDestination,
    arrival: newArrival,
    frequency: newFrequency,
    startedAt: firebase.database.ServerValue.TIMESTAMP
  })

  //Helps keep track of our push to the cloud
  console.log('attempt to push')
  //Allows user to input values for train info; clears the text boxes
  $('input').val('')
})

//listen for a new child
database.ref().on('child_added', function(snap){

  console.log(snap.val())
  
  //Display all user given inputs (train name, destination, frequency)
  var trainInfo = $('<tr>');
  var displayName = $('<td>').append(snap.val().name);
  var displayDestination = $('<td>').append(snap.val().destination);
  var displayFrequency = $('<td>').append(snap.val().frequency);

  //Calculate the difference in time to find arrival with frequency data stored in Firebase
  var timeDiff = moment().diff(moment.unix(snap.val().arrival), "minutes");
  var timeLeft = moment().diff(moment.unix(snap.val().arrival), "minutes") % (snap.val().frequency);
  
  var minutes = newFrequency - timeLeft;
  var nextArrival = moment().add(minutes, "m").format("hh:mm A"); 

  //Display next arrival
  var displayNextArrival = $('<td>').append(nextArrival);
  //Display minutes until arrival from moment
  var displayMinutes = $('<td>').append(minutes);

  trainInfo.append(displayName, displayDestination, displayFrequency, displayNextArrival, displayMinutes);
  $('#train-list').append(trainInfo);

}, function(err){
  console.log("Errors: " + err.code);
  //alert(err.code)
  });

});
