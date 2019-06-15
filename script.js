//Constants
var startButton = document.getElementById("startButton");
var gamePane = document.getElementById("gamePane"); 
var mainMenu = document.getElementById("mainMenu")
var title = document.getElementById("title")

//Initialize function
startButton.onclick=function(){
	$(this).fadeOut();
	
	$(gamePane).animate({
		height: 640
	}, 600);

	$(title).fadeOut(function(){
		$(this).html("Choose Your Character").fadeIn();
	});
	
	$(mainMenu).fadeIn(500);
};