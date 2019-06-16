//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane"); 
var mainMenu = document.getElementById("mainMenu")
var statusScreen = document.getElementById("statusScreen")
var title = document.getElementById("title")
var charButtons = [document.getElementById("ormaButton"), document.getElementById("darleneButton"), document.getElementById("charThreeButton"), document.getElementById("charFourButton")]
var homeButton = document.getElementById("homeButton")

//Status menu
var personImg = document.getElementById("personImg")
var expensesImg = document.getElementById("expensesImg")
var happyMeter = document.getElementById("happyMeter")
var cashText = document.getElementById("cashText")
var creditCardText = document.getElementById("creditCardText")
var monthText = document.getElementById("monthText")
var situationText = document.getElementById("situationText")
var optionTexts = [document.getElementById("optionOneText"), document.getElementById("optionTwoText"), document.getElementById("optionThreeText")]
var optionButtons = [document.getElementById("optionOneButton"), document.getElementById("optionTwoButton"), document.getElementById("optionThreeButton")]

//Result screen
var resultVideo = document.getElementById("resultVideo")
var resultTitle = document.getElementById("resultTitle")
var resultDescription = document.getElementById("resultDescription")
var nextButton = document.getElementById("nextButton");

var currentChar = ""
//Initialize function
startButton.onclick=function(){
	$(this).fadeOut();
	
	$(gamePane).animate({
		height: 720
	}, 600);

	setTitle("Choose Your Character")
	
	$(mainMenu).fadeIn(500);
};

nextButton.onclick=function(){
	var nextStatus = getNextStatus(currentChar)
	//update status based on next status
	$(resultScreen).fadeOut(function(){
		$(statusScreen).fadeIn();
	})
}

homeButton.onclick=function(){
	$(statusScreen).fadeOut(function(){

		$(mainMenu).fadeIn(500);
		setTitle("Choose Your Character")	
	});
	$(resultScreen).fadeOut()
	
}

for(var i = 0; i < optionButtons.length; i++){
	optionButtons[i].onclick=function(){
		$(statusScreen).fadeOut(function(){
			$(resultScreen).fadeIn();
		})
	};
}

for(var i = 0; i < charButtons.length; i++){

	charButtons[i].onclick=function(){


		$(mainMenu).fadeOut(function(){
			statusScreen.style.display = "block";
			$(statusScreen).fadeIn(500);	
		});

		var character = $(this)[0].id.split("Button")[0];
		character = character.charAt(0).toUpperCase() + character.substring(1);
		setTitle(character);
		currentChar = character
		//updateStatus(character, 20, 69, 100, "Situation", ["Opt 1", "Opt 2", "opt 3"]);
		
	};
}

function setTitle(titleWords){
	$(title).fadeOut(function(){
		$(this).html(titleWords).fadeIn();
	});
}


function updateStatus(character, happyScore, money, credit, situation, options){
	console.log("status updated")
	if(happyScore <= 70 && happyScore >=40){
		personImg.src="./" + character + "/neutral.png";
	} else if(happyScore >70){
		personImg.src="./" + character + "/happy.png";
	} else{
		personImg.src="./" + character + "/sad.png";
	}

	expensesImg.src="./" + character + "/expenses.png";

	happyMeter.value = happyScore;
	cashText.innerHTML = "$" + money;
	creditCardText.innerHTML = "-$" + credit;
	situationText.innerHTML = situation;
	for(var i = 0; i < options.length; i++){
		optionTexts[i].innerHTML = options[i]
	}
}

function updateResult(vidSrc, title, description){
	resultVideo.src = vidSrc
	resultTitle.innerHTML = title
	resultDescription.innerHTML = description
}

function getNextStatus(character){
	return 1;
}