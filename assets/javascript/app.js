$( document ).ready(function() {
    console.log( "go!" );

//the questions are in an object in the questions.js file
//global variable initialization:

var numberCorrect = 0;
var numberWrong = 0;
var unanswered = 0;

var questionNum = -1;
var userChoice = -1;
var displayTime = 20;
var secondsLeft = 0 ;

//start the first game.  All subsequent games are started by the user clicking the 'new game' button.

nextQuestion();

//displays time left and if time runs out then the endQuestion function is called.
function showTime(){
	$("#time").text(secondsLeft);
	secondsLeft--;
	if (secondsLeft == -1){
		endQuestion();
	}
};
//this is the 'new game' button and starts a new game by resetting the necessary variables.
$(".newGame").click(function(){
	if(questionNum == -1){
		numberCorrect = 0;
		numberWrong = 0;
		unanswered = 0;
		nextQuestion();
	}
	
});
//The nextQuestion function increments the quesitonNum pointer and calls the startNextQuestion
function nextQuestion(){
	if (questionNum < allQuestions.length-1){
	questionNum++;
	startNextQuestion(questionNum);
	}else{	
	$("#question").text("You got " +Math.round(numberCorrect/allQuestions.length*100) +"% correct");
	$(".choices").empty();
	$("#answer").text("");
	$("#result").text("");
	questionNum = -1;
	}
};
//startNextQuestion gets the browser ready for the next question and then calls displayChoices.
function startNextQuestion(q){
	displayTime = 20;
	$("#time").text(displayTime);
	/*displays a 20 in the timer.  
	The countdown starts (displayTime -1) because setInterval(function, 1000) calls the function AFTER a second.*/
	$("#question").val("");
	$(".choices").empty();
	$("#answer").text("Click The Correct Answer");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	displayChoices(q);
};
//Displays all the choices and sets up hover and click listening events.
function displayChoices(i){
	userChoice = -1;
	questionNum = i;
	secondsLeft = displayTime - 1;
	/*the setInterval is 1000 which means that the first function call 
	happens AFTER a second elapses so the -1 compensates for that and the user gets a full 30 seconds instead of 31.
	and the startNextQuestion displays a 20 in the timer.*/
	clearTimeout(displayTime);
	displayTime = setInterval(showTime,1000);
	$("#question").html("<p>" + allQuestions[i].question + "</p>");
	$("#answer").text("Click The Correct Answer");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	var choiceArray = allQuestions[i].options
	answer = choiceArray[allQuestions[i].correctAnswer];
	for (k=0; k<choiceArray.length; k++){
		$(".choices").append("<p><span id = q" + k + ">" + choiceArray[k] +  "</span></p>");
			//this area creates click event for user's choice and also shows the user what the correct choice would have been.
			$('#q' + k).click(function(){
				$(this).css('color', 'white');
				$(this).css('background','red');
				$("#answer").text("Correct Answer: " + answer);
				$("#answer").css('color', 'white');
				$("#answer").css('background','blue');
				if (userChoice == -1){
					userChoice = ($(this).attr('id'))[1];
					endQuestion();
				};
			});
			//this creates hover on and off color change to respond to mouse over the choices.
			$('#q' + k).hover(function(){					
				$(this).css('color', 'white');
				$(this).css('background','green');
					}, function(){
					$(this).css('color', 'black');
					$(this).css('background','lightgrey');
					});
	}//closes FOR LOOP ON k
};//closes the displayChoices function
//the endQuestion function checks to see if the user made the correct choice or not (or no choice made due to time out flag -1)
function endQuestion(){
	if (userChoice == allQuestions[questionNum].correctAnswer){
					numberCorrect++;
					$("#result").text("Correct!");
				}else if (userChoice == -1){
					unanswered++;
					$("#result").text("No Choice Made");
				}else{
					numberWrong++;
					$("#result").text("Wrong!");
				};
				$("#time").text(0);
				$("#right").text(numberCorrect);
				$("#wrong").text(numberWrong);
				$("#unanswered").text(unanswered);
				clearInterval(displayTime);
				displayTime = setTimeout(nextQuestion,3000);//delay before changing questions
	}//closes endQuestion function
});//closes the $JQuery

