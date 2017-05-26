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


function showTime(){
	$("#time").text(secondsLeft);
	secondsLeft--;
	if (secondsLeft == -1){
		endQuestion();
	}
};

$(".newGame").click(function(){
	if(questionNum == -1){
		numberCorrect = 0;
		numberWrong = 0;
		unanswered = 0;
		nextQuestion();
	}
	
});

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

function startNextQuestion(q){
	displayTime = 20;
	$("#time").text(displayTime);
	
	$("#question").val("");
	$(".choices").empty();
	$("#answer").text("Click The Correct Answer");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	displayChoices(q);
};

function displayChoices(i){
	userChoice = -1;
	questionNum = i;
	secondsLeft = displayTime - 1;
	
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
			
			$('#q' + k).hover(function(){					
				$(this).css('color', 'white');
				$(this).css('background','green');
					}, function(){
					$(this).css('color', 'black');
					$(this).css('background','lightgrey');
					});
	}
};
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
				displayTime = setTimeout(nextQuestion,3000);
	}
});

