//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane"); 
var mainMenu = document.getElementById("mainMenu")
var title = document.getElementById("title")
var charButtons = [document.getElementById("ormaButton"), document.getElementById("darleneButton"), document.getElementById("charThreeButton"), document.getElementById("charFourButton")]

//Initialize function
startButton.onclick=function(){
	$(this).fadeOut();
	
	$(gamePane).animate({
		height: 640
	}, 600);

	setTitle("Choose Your Character")
	
	$(mainMenu).fadeIn(500);
};

for(var i = 0; i < charButtons.length; i++){
	charButtons[i].onclick=function(){
		$(mainMenu).fadeOut();
		console.log("Clicked");
	};
}


function setTitle(titleWords){
	$(title).fadeOut(function(){
		$(this).html(titleWords).fadeIn();
	});
}