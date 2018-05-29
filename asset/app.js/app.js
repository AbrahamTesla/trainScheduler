$(document).ready(function(){
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
$("#trainName").val(""); 
  $("#destination").val("");
    $("#firstTrain").val("");
      $("#frequency").val("");
});

database.ref().on('child_added',function(childSnaphshot){
    var name = childSnaphshot.val().trainName;
    var dest = childSnaphshot.val().destination;
    var fTrain = childSnaphshot.val().firstTrain;
    var freq = childSnaphshot.val().frequency;
    

    var freq = parseInt(freq);
    
    var currentTime= moment();
    
    var convertDate = moment(fTrain,'HH:mm').subtract(1,'years');
    console.log("DATE CONVERTED: " + convertDate);
    var trainTime = moment(convertDate).format('HH:mm');
    console.log("TRAIN TIME : " + trainTime);

    var timeConvert = moment(trainTime,'HH:mm').subtract(1,'years');
    
    var difference = moment().diff(timeConvert,'minutes');
    
    var timeRemain = difference % freq;
    
    var minsAway = freq - timeRemain;
    
    var nextTrain = moment().add(minsAway,'minutes');
    
    
    $("#result").append(
         "<tr><td id='nameResult'>"+name +
         "</td><td id='destResult'>"+dest +
         "</td><td id='freqResult'>"+freq+
         "</td><td id='nextArrival'>"+moment(nextTrain).format('HH:mm')+
        "</td><td id='timeAway'>"+minsAway + ' mins til Arrival'+"</td></tr>");
    
    
});
    
});