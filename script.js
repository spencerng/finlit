//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane");
var mainMenu = document.getElementById("mainMenu");
var statusScreen = document.getElementById("statusScreen");
var title = document.getElementById("title");
var charButtons = [document.getElementById("ormaButton"), document.getElementById("darleneButton"), document.getElementById("beanButton")];
var homeButton = document.getElementById("homeButton");

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

	if(charState.happiness > 15){
		charState.happiness = 15;
	}

	if(charState.happiness < 0){
		charState.happiness = 0;
	}

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

function CSVtoArray(strData, strDelimiter){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
                ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
}

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

	
	charState["Orma"] = new CharacterState(13000, 180);
	charState["Bean"] = new CharacterState(25000, -620);
	charState["Darlene"] = new CharacterState(2500, -400);

	var charNames = ["Orma", "Bean", "Darlene"];
	for(var i = 0; i < 3; i++){
		monthlyEvents[charNames[i]] = [];
		happyEvents[charNames[i]] = [];
	}

	var monthlyEventsRows = loadFile("./assets/monthly.csv").split("\n");
	var happyEventsRows = loadFile("./assets/happy.csv").split("\n");

	for (var i = 0; i < monthlyEventsRows.length-1; i++) {
		var terms = CSVtoArray(monthlyEventsRows[i], ",")[0];
		var options = [];
		
		for (var j = 0; j < 3; j++) {
			var change = new Change(parseInt(terms[j * 5 + 4]), parseInt(terms[j * 5 + 5]), parseInt(terms[j * 5 + 6]));
			options.push(new Option(terms[j * 5 + 3], change, terms[j * 5 + 7]));
		}

		monthlyEvents[terms[0]].push(new MonthlyEvent(parseInt(terms[1]), terms[2], options));
	}

	for (var i = 0; i < happyEventsRows.length-1; i++) {
		var terms = CSVtoArray(happyEventsRows[i], ",")[0];
		var change = new Change(parseInt(terms[4]), 0, parseInt(terms[5]));
		happyEvents[terms[0]].push(new HappyEvent(parseInt(terms[1]), terms[2], terms[3], change, terms[6]))
	}

	for (var i = 0; i < charButtons.length; i++) {

		charButtons[i].onclick = function() {
			var character = $(this)[0].id.split("Button")[0];
			character = character.charAt(0).toUpperCase() + character.substring(1);
			setTitle(character);
			currentChar = character
			updateStatus(charState[currentChar], monthlyEvents[currentChar][charState[currentChar].month-1]);
			$(mainMenu).fadeOut(function() {
				statusScreen.style.display = "block";
				$(statusScreen).fadeIn(500);
			});

		};
	}

	nextButton.onclick = function() {
		advanceMonth(charState[currentChar]);
		updateStatus(charState[currentChar], monthlyEvents[currentChar][charState[currentChar].month-1]);
		
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

	for (var i = 0; i < optionButtons.length; i++) {
		optionButtons[i].onclick = function() {
			changeState(charState[currentChar], monthlyEvents[currentChar][charState[currentChar].month-1].options[i].change);
			updateResult(monthlyEvents[currentChar][charState[currentChar].month-1].options[i])
			$(statusScreen).fadeOut(function() {
				$(resultScreen).fadeIn();
			})
		};
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

function setTitle(titleWords) {
	$(title).fadeOut(function() {
		$(this).html(titleWords).fadeIn();
	});
}


function updateStatus(character, credit, monthlyEvent) {
	
	if (happyScore <= 70 && happyScore >= 40) {
		personImg.src = "./" + character + "/neutral.png";
	} else if (happyScore > 70) {
		personImg.src = "./" + character + "/happy.png";
	} else {
		personImg.src = "./" + character + "/sad.png";
	}

	expensesImg.src = "./" + character + "/expenses.png";
	monthText.innerHTML = "Month #" + charState[character].month;
	happyMeter.value = charState[character].happiness;
	cashText.innerHTML = "$" + charState[character].money;
	situationText.innerHTML = monthlyEvent.situation;
	for (var i = 0; i < options.length; i++) {
		optionTexts[i].innerHTML = monthlyEvent.options[i].text
	}
}

function updateResult(chosenOption) {
	resultTitle.innerHTML = "Result";
	resultDescription.innerHTML = chosenOption.responseText;
}

function updateHappyEvent(vidSrc, title, description) {
	resultVideo.src = vidSrc
	resultTitle.innerHTML = title
	resultDescription.innerHTML = description
}