//	The interface object holds all the properties and methods used for display purposes
var interface = {
	//	The width of the display area
	width: 75,
	//	How many spaces before the display area begins
	leftPadding: '    |',
	//	A genereic top/bottom border made of equal signs
	border: '    =============================================================================',
	//	Returns a blank row within the display
	blankRow: function() {
		return '    |' + interface.generateSpaces(interface.width) + '|';
	},
	//	Returns a string containing the number of spaces passed through to it
	generateSpaces: function(num) {
		var spaces = '';
		for(var i = 0; i < num; i++) {
			spaces += ' ';
		}
		return spaces;
	},
	//	Center-aligns text passed into it, given the desired width
	centerText: function(text, width) {
		var preText = Math.round((width - text.length) / 2);
		var postText = width - preText - text.length;
		return interface.generateSpaces(preText) + text + interface.generateSpaces(postText);
	},
	//	Draws the gallows and the appropriate amount of the stick figure based upon the number passed through (typically the number of remaining guesses)
	drawStickFigure: function (num) {
		console.log(interface.leftPadding + '                               _________                                   |');
		console.log(interface.leftPadding + '                                |      \\|                                  |');
		if(num > 5) {
			console.log(interface.leftPadding + '                                        |                                  |');
		} else {
			console.log(interface.leftPadding + '                                O       |                                  |');
		}
		if(num > 4) {
			console.log(interface.leftPadding + '                                        |                                  |');
		} else if(num > 3) {
			console.log(interface.leftPadding + '                                |       |                                  |');
		} else if(num > 2) {
			console.log(interface.leftPadding + '                               /|       |                                  |');
		} else {
			console.log(interface.leftPadding + '                               /|\\      |                                  |');
		}
		if(num > 1) {
			console.log(interface.leftPadding + '                                        |                                  |');
		} else if(num > 0) {
			console.log(interface.leftPadding + '                               /        |                                  |');
		} else {
			console.log(interface.leftPadding + '                               / \\      |                                  |');
		}
		console.log(interface.leftPadding + '                                       /|\\                                 |');
		console.log(interface.leftPadding + '                                \u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E                             |');
	},
	//	Displays the WELCOME screen with different messages that can be passed through
	startingInterface: function(game, msg) {
		console.log('\n\n\n');
		console.log(interface.border);
		console.log(interface.blankRow());
		
		console.log(interface.leftPadding + '                \\        / |\u203E\u203E\u203E |    |\u203E\u203E\u203E |\u203E\u203E\u203E| |\\  /| |\u203E\u203E\u203E                |');
		console.log(interface.leftPadding + '                 \\  /\\  /  |--- |    |    |   | | \\/ | |---                |');
		console.log(interface.leftPadding + '                  \\/  \\/   |___ |___ |___ |___| |    | |___                |');
		
		console.log(interface.leftPadding + '                                  ___  _                                   |');
		console.log(interface.leftPadding + '                                   |  | |                                  |');
		console.log(interface.leftPadding + '                                       \u203E                                   |');

		console.log(interface.leftPadding + '                    |  | |\u203E\u203E| |\\ | |\u203E\u203E| |\\  /| |\u203E\u203E| |\\ |                   |');
		console.log(interface.leftPadding + '                    |--| |__| | \\| | _  | \\/ | |__| | \\|                   |');
		console.log(interface.leftPadding + '                    |  | |  | |  | |__| |    | |  | |  |                   |');
		
		console.log(interface.blankRow());
		console.log(interface.blankRow());
		interface.drawStickFigure(0);
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText(msg, interface.width) + '|');
		
		
		console.log(interface.blankRow());
		console.log(interface.border);
		console.log('\n');
		//	Either initiates the game or prompts the user to choose a category depending on the state of the game
		if(game.state == 'welcome') {
			game.state = 'game';
			game.start();
		} else {
			game.promptCategory();
		}
	},
	//	Displays the Game Instructions to the user
	instructions: function() {
		console.log('\n\n\n');
		console.log(interface.border);
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('---------------- HANGMAN INSTRUCTIONS ----------------', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('Choose a category of words or phrases that you would like to play,', interface.width) + '|');
		console.log(interface.leftPadding + interface.centerText('or choose "Random" for a random category.', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('Try to guess all of the letters in the word/phrase, one letter at a time.', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('If the letter you guess is not in the word or phrase,', interface.width) + '|');
		console.log(interface.leftPadding + interface.centerText('a new part of the stick figure is drawn.', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('If the stick figure finishes drawing before you guess all of', interface.width) + '|');
		console.log(interface.leftPadding + interface.centerText('the letters in the word or phrase, YOU LOSE!', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('But if you manage to complete the word or phrase, YOU WIN!', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('You can play as many times as you\'d like!', interface.width) + '|')
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('The game keeps track of your total wins and losses, as well as', interface.width) + '|');
		console.log(interface.leftPadding + interface.centerText('your current winning streak!', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText('Good Luck and Have Fun!!!', interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.border);
		console.log('\n\n\n');
		
	},
	//	This is the main interface displayed throughout the game, displaying wins, losses, streaks, game messages, the stick figure, the word/phrase, category, and previous guesses
	gameInterface: function(game) {
		
		console.log('\n\n\n');
		console.log(interface.border);
		if(game.wins < 10) {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 9) + 'Wins: ' + game.wins + '  |');
		} else {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 10) + 'Wins: ' + game.wins + '  |');
		}
		if(game.losses < 10) {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 11) + 'Losses: ' + game.losses + '  |');
		} else {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 12) + 'Losses: ' + game.losses + '  |');
		}
		if(game.streak < 10) {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 11) + 'Streak: ' + game.streak + '  |');
		} else {
			console.log(interface.leftPadding + interface.generateSpaces(interface.width - 12) + 'Streak: ' + game.streak + '  |');
		}
		console.log(interface.leftPadding + interface.centerText(game.message, interface.width) + '|');
		console.log(interface.blankRow());
		interface.drawStickFigure(game.wrongAnswersLeft);
		console.log(interface.leftPadding + interface.centerText(game.word.returnWord(), interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + interface.centerText(game.category.toUpperCase(), interface.width) + '|');
		console.log(interface.blankRow());
		console.log(interface.leftPadding + '              \u231c---------------------------------------------\u231d              |');
		console.log(interface.leftPadding + '              |' + interface.centerText('Previous Guesses', 45) + '|              |');
		console.log(interface.leftPadding + interface.generateSpaces(14) + '|' + interface.generateSpaces(45) + '|' + interface.generateSpaces(14) + '|');
		console.log(interface.leftPadding + interface.generateSpaces(14) + '|' + interface.centerText(game.previousGuesses.sort().join(' ').toUpperCase(), 45) + '|' + interface.generateSpaces(14) + '|');
		console.log(interface.leftPadding + interface.generateSpaces(14) + '|' + interface.generateSpaces(45) + '|' + interface.generateSpaces(14) + '|');
		console.log(interface.leftPadding + '              \u231e---------------------------------------------\u231f              |');
		console.log(interface.blankRow());
		console.log(interface.border);
		console.log('\n\n\n');
	}
}
//	Exports the interface to be used by the main game
module.exports = interface;