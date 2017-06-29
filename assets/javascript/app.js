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

//listen for a new child
database.ref().on('child_added', function(snap){

  console.log(snap.val())
  var monthsConvert = moment(snap.val().date, "DD/MM/YYYY")
  var monthsWorked = moment().diff(monthsConvert, 'months')
  var payToDate = monthsWorked * snap.val().rate
  console.log(moment().diff(snap.val().date, "months"))
  console.log(payToDate)
  /////////////////
  var trainInfo = $('<tr>');
  var displayName = $('<td>').append(snap.val().name);
  var displayDestination = $('<td>').append(snap.val().destination);
  var displayTrainTime = $('<td>').append(snap.val().firstTrainTime);
  var displayFrequency = $('<td>').append(snap.val().frequency);
  /////////////////
  var displayRate = $('<td>').append(snap.val().rate);
  var displayPay = $('<td>').append(payToDate);

  trainInfo.append(displayName, displayDestination, displayTrainTime, displayFrequency)
  $('#train-list').append(trainInfo)

}, function(err){
  console.log(err.code)
})
