// Initializing Firebase to a Train Scheduler database
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

