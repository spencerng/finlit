//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane");
var mainMenu = document.getElementById("mainMenu");
var statusScreen = document.getElementById("statusScreen");
var title = document.getElementById("title");
var charButtons = [document.getElementById("ormaButton"), document.getElementById("darleneButton"), document.getElementById("charThreeButton"), document.getElementById("charFourButton")];
var homeButton = document.getElementById("homeButton");
var homeButtonResult = document.getElementById("homeButtonResult");

//Status menu
var personImg = document.getElementById("personImg");
var expensesImg = document.getElementById("expensesImg");
var happyMeter = document.getElementById("happyMeter");
var cashText = document.getElementById("cashText");
var creditCardText = document.getElementById("creditCardText");
var monthText = document.getElementById("monthText");
var situationText = document.getElementById("situationText");
var optionTexts = [document.getElementById("optionOneText"), document.getElementById("optionTwoText"), document.getElementById("optionThreeText")];
var optionButtons = [document.getElementById("optionOneButton"), document.getElementById("optionTwoButton"), document.getElementById("optionThreeButton")];

//Result screen
var resultScreen = document.getElementById("resultScreen");
var resultVideo = document.getElementById("resultVideo");
var resultTitle = document.getElementById("resultTitle");
var resultDescription = document.getElementById("resultDescription");
var nextButton = document.getElementById("nextButton");

//Dynamic status vars
var currentChar = "";
var charState = {};
var monthlyEvents = {};
var happyEvents = {};

//situation for Darlene month 4
var investment = 0;

function CharacterState(initialMoney, initialSalary) {
	this.month = 1;
	this.happiness = 0;
	this.money = initialMoney;
	this.salary = initialSalary;
}

function Change(moneyChange, happyChange, rateChange) {
	this.moneyChange = moneyChange;
	this.happyChange = happyChange;
	this.rateChange = rateChange;
}

function Option(text, change, responseText) {
	this.text = text;
	this.change = change;
	this.responseText = responseText;
}

function MonthlyEvent(month, situation, options) {
	this.month = month;
	this.situation = situation;
	this.options = options;
}

function HappyEvent(trigger, title, text, change, vidLink) {
	this.trigger = trigger;
	this.title = title;
	this.text = text;
	this.change = change;
	this.vidLink = vidLink;
	this.shown = false;
}

function changeState(charState, change) {
	charState.happiness += change.happyChange;
	if (change.moneyChange == 200000) {
		charState.money += 2 * investment;
	} else {
		charState.money += change.moneyChange;
	}
	charState.salary += change.rateChange;
}

function advanceMonth(charState) {
	charState.money += charState.salary;
	charState.month += 1;
}

function CSVtoArray(text) {
	var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
	// Return NULL if input string is not well formed CSV string.
	if (!re_valid.test(text)) return null;
	var a = []; // Initialize array to receive values.
	text.replace(re_value, // "Walk" the string using replace with callback.
		function(m0, m1, m2, m3) {
			// Remove backslash from \' in single quoted values.
			if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
			// Remove backslash from \" in double quoted values.
			else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
			else if (m3 !== undefined) a.push(m3);
			return ''; // Return empty string.
		});
	// Handle special case of empty last value.
	if (/,\s*$/.test(text)) a.push('');
	return a;
};

function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}


function initialize() {

	//TODO - coplete this
	/*charState["Orma"] = new CharacterState();
	charState["Bean"] = new CharacterState();
	charState["Darlene"] = new CharacterState();*/

	var monthlyEventsRows = loadFile("./assets/monthly.csv").split("\n");
	var happyEventsRows = loadFile("./assets/happy.csv").split("\n");

	for (var i = 0; i < monthlyEventsRows.length; i++) {
		var terms = CSVtoArray(monthlyEventsRows[i]);
		var options = [];
		console.log(monthlyEventsRows);
		for (var j = 0; j < 3; j++) {
			var change = new Change(parseInt(terms[j * 5 + 4]), parseInt(terms[j * 5 + 5]), parseInt(terms[j * 5 + 6]));
			options.push(new Option(terms[j * 5 + 3], change, terms[j * 5 + 7]));
		}

		monthlyEvents[terms[0]] = new MonthlyEvent(parseInt(terms[1]), terms[2], options);
	}

	for (var i = 0; i < happyEventsRows.length; i++) {
		var terms = CSVtoArray(happyEventsRows[i]);
		var change = new Change(parseInt(terms[4]), 0, parseInt(terms[5]));
		happyEvents[terms[0]] = new HappyEvent(parseInt(terms[1]), terms[2], terms[3], change, terms[6]);
	}

}


//Initialize function
startButton.onclick = function() {

	initialize();

	$(this).fadeOut();

	$(gamePane).animate({
		height: 720
	}, 600);

	setTitle("Choose Your Character")

	$(mainMenu).fadeIn(500);
};

nextButton.onclick = function() {
	var nextStatus = getNextStatus(currentChar)
	//update status based on next status
	$(resultScreen).fadeOut(function() {
		$(statusScreen).fadeIn();
	})
}

homeButton.onclick = function() {
	$(statusScreen).fadeOut(function() {

		$(mainMenu).fadeIn();
		setTitle("Choose Your Character")
	});

}

homeButtonResult.onclick = function() {
	$(resultScreen).fadeOut(function() {

		$(mainMenu).fadeIn();
		setTitle("Choose Your Character")
	});

}

for (var i = 0; i < optionButtons.length; i++) {
	optionButtons[i].onclick = function() {
		$(statusScreen).fadeOut(function() {
			$(resultScreen).fadeIn();
		})
	};
}

for (var i = 0; i < charButtons.length; i++) {

	charButtons[i].onclick = function() {


		$(mainMenu).fadeOut(function() {
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

function setTitle(titleWords) {
	$(title).fadeOut(function() {
		$(this).html(titleWords).fadeIn();
	});
}


function updateStatus(character, happyScore, money, credit, situation, options) {
	console.log("status updated")
	if (happyScore <= 70 && happyScore >= 40) {
		personImg.src = "./" + character + "/neutral.png";
	} else if (happyScore > 70) {
		personImg.src = "./" + character + "/happy.png";
	} else {
		personImg.src = "./" + character + "/sad.png";
	}

	expensesImg.src = "./" + character + "/expenses.png";

	happyMeter.value = happyScore;
	cashText.innerHTML = "$" + money;
	creditCardText.innerHTML = "-$" + credit;
	situationText.innerHTML = situation;
	for (var i = 0; i < options.length; i++) {
		optionTexts[i].innerHTML = options[i]
	}
}

function updateResult(vidSrc, title, description) {
	resultVideo.src = vidSrc
	resultTitle.innerHTML = title
	resultDescription.innerHTML = description
}

function getNextStatus(character) {
	return 1;
}