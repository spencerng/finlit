//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane"); 
var mainMenu = document.getElementById("mainMenu")


//Initialize function
startButton.onclick=function(){
	$(this).fadeOut();
	
	$(gamePane).animate({
		height: 640
	}, 600);
	
	$(mainMenu).fadeIn(500);
};