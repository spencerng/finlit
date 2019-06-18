//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane"); 
var mainMenu = document.getElementById("mainMenu")
var statusScreen = document.getElementById("statusScreen")
var title = document.getElementById("title")
var charButtons = [document.getElementById("ormaButton"), document.getElementById("darleneButton"), document.getElementById("charThreeButton"), document.getElementById("charFourButton")]
var homeButton = document.getElementById("homeButton")
var homeButtonResult = document.getElementById("homeButtonResult")

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

//Dynamic status vars
var currentChar = ""
var charState = {}
var monthlyEvents = {}
var happyEvents = {}


class CharacterState {
	constructor(initialMoney, initialSalary){
		this.month = 1
		this.credit = 0
		this.money = initialMoney
		this.salary = initialSalary
	}

}

function initialize(){

	//TODO - coplete this
	/*charState["Orma"] = new CharacterState();
	charState["Bean"] = new CharacterState();
	charState["Darlene"] = new CharacterState();*/


	var happyEventsRaw = loadFile("./assets/happy.csv")
	var monthlyEventsRaw = loadFile("./assets/monthly.csv")

	console.log(monthlyEventsRaw)


}

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

//Initialize function
startButton.onclick=function(){
	
	initialize();

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

		$(mainMenu).fadeIn();
		setTitle("Choose Your Character")	
	});
	
}

homeButtonResult.onclick=function(){
	$(resultScreen).fadeOut(function(){

		$(mainMenu).fadeIn();
		setTitle("Choose Your Character")	
	});
	
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