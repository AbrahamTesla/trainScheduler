$(document).ready(function){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLXx9HaKt44bWCGyOT4qEA0vEm5-LFA4M",
    authDomain: "train-scheduler-dd14b.firebaseapp.com",
    databaseURL: "https://train-scheduler-dd14b.firebaseio.com",
    projectId: "train-scheduler-dd14b",
    storageBucket: "train-scheduler-dd14b.appspot.com",
    messagingSenderId: "340581426651"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

$("#train").on("click", function(event){
    event.preventDefault();
    
    var trainName =$("#trainName").val().trim();
    var destination =$("#destination").val().trim();
    var frequency =$("#frequency").val().trim();
    var firstTrain =$("#firstTrain").val().trim();
    
    
    var result ="";
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    
}



});