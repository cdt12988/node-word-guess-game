//	Imports the Word constructor
var Word = require('./word');
//	Object that holds the game propterties and methods
var game = {
	//	Dependencies
	inquirer: require('inquirer'),
	interface: require('./interface'),
	wordBanks: require('./wordBanks'),
	//	Array containing all of the word banks
	random: [
		require('./wordBanks').movies,
		require('./wordBanks').sports,
		require('./wordBanks').countries,
		require('./wordBanks').states,
		require('./wordBanks').presidents,
		require('./wordBanks').animals,
		require('./wordBanks').music,
		require('./wordBanks').comics
	],
	//	Array conaining the display names of all of the word banks
	categoryNames: ['Movies', 'Sports', 'Countries', 'States', 'US Presidents', 'Animals', 'Music', 'Comic Books'],
	//	Game variables
	state: 'welcome',
	wins: 0,
	losses: 0,
	streak: 0,
	
	word: '',
	category: '',
	message: '',
	
	wrongAnswersLeft: 6,
	previousGuesses: [],
	//	Lists the starting options for the player to choose from
	start: function() {
		game.inquirer.prompt([
			{
				type: 'list',
				name: 'option',
				choices: ['Play', 'Instructions', 'Leave'],
				message: 'Choose an option below'
			}
		]).then(function(answer) {
			switch(answer.option) {
				case 'Play':
					game.interface.startingInterface(game, 'Choose a category below');
				break;
				
				case 'Instructions':
					game.interface.instructions();
					game.promptBack();
				break;
				case 'Leave':
					console.log('\nGoodbye!\n');
				break;
			}
		});
	},
	//	Checks if the game has been won by seeing if there are still any characters left to guess, returning TRUE/FALSE
	checkWinCondition: function() {
		var bool = true;
		game.word.characters.forEach(function(character) {
			if(!character.guessed) {
				bool = false;
			}
		});
		return bool;
	},
	//	Allows the player to go back to the start menu if viewing the Instructions
	promptBack: function() {
		game.inquirer.prompt([
			{
				type: 'list',
				name: 'back',
				choices: ['Got it!'],
				message: 'Got it?'
			}
		]).then(function(answer) {
			game.state = 'welcome';
			game.interface.startingInterface(game, 'Choose an option below to get started');
		});
	},
	//	Displays all of the categories for the player to choose from
	promptCategory: function() {
		game.inquirer.prompt([
			{
				type: 'list',
				name: 'category',
				message: 'Choose a category',
				choices: ['Random', 'Movies', 'Sports', 'Countries', 'States', 'US Presidents', 'Animals', 'Music', 'Comic Books']
			}
		]).then(function(answer) {
			var bank = answer.category.toLowerCase();
			//	Manipulates the string of multi word categories to match the names of the word banks
			if(bank == 'us presidents') {
				bank = 'presidents';
			} else if(bank == 'comic books') {
				bank = 'comics'
			}
			//	Sets the word bank to the chosen category or randomizes it if random was chosen
			var wordBank;
			if(bank != 'random') {
				wordBank = game.wordBanks[bank];
				game.category = answer.category.toUpperCase();
			} else {
				var randomIndex = Math.floor(Math.random() * game.random.length);
				wordBank = game.random[randomIndex];
				game.category = game.categoryNames[randomIndex];
			}
			//	Constructs a new word chosen at random from the selected category, then changes the game display to start the game
			game.word = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
			game.message = 'Your category is ' + game.category + '! Press a key to get started!';
			game.interface.gameInterface(game);
			game.promptLetter('Guess a letter to get started!');
		});
	},
	//	Prompts player for a letter to guess and validates that it is a single letter character and nothing else
	promptLetter: function(msg = 'Guess a letter!') {
		game.inquirer.prompt([
			{
				name: 'guess',
				message: msg,
				validate: function(guess) {
					if(/[a-zA-Z]/.test(guess) && guess.length == 1) {
						return true;
					} else {
						return false;
					}
				}
			}
		]).then(function(answer) {
			var guess = answer.guess.toLowerCase();
			var correct = true;
			//	Checks to ensure the letter has not yet been guessed
			if(game.previousGuesses.indexOf(guess) >= 0) {
				game.message = 'You have already guessed ' + guess.toUpperCase() + '!';
				game.interface.gameInterface(game);
				game.promptLetter('Guess again!');
			//	Adds the letter to the previously guessed array and checks to see if the letter is in the word/phrase or not using the constructor objects' methods
			} else {
				game.previousGuesses.push(guess);
				game.word.checkCharacters(guess);
				//	If the letter is not in the word/phrase, adjust the amount of guesses left and change the correct boolean to FALSE
				if(game.word.word.indexOf(guess) < 0) {
					game.wrongAnswersLeft--;
					correct = false;
				}
				//	Checks if the game has been won and adjusts everything accordingly
				if(game.checkWinCondition()) {
					game.message = 'You Win!';
					game.wins++;
					game.streak++;
					game.interface.gameInterface(game);
					game.promptContinue();
				//	Checks if the game has been lost and adjusts everything accordingly
				} else if(game.wrongAnswersLeft < 1) {
					game.message = 'You Lose!';
					game.losses++;
					game.streak = 0;
					
					game.word.characters.forEach(function(character) {
						character.guessed = true;
					});
					
					game.interface.gameInterface(game);
					game.promptContinue();
				//	If game has not been won or lost yet, change the display message based upon if they guessed a correct letter or not and then prompt for another letter
				} else {
					var msg = '';
					if(correct) {
						game.message = 'Great guess! Keep it up!';
						msg = 'Guess again!'
					} else {
						game.message = 'There are no ' + guess.toUpperCase() + '\'s!';
						msg = 'Try again!'
					}
					game.interface.gameInterface(game);
					game.promptLetter(msg);
				}
			}
		});
	},
	//	Prompts the player after a game is finished to see if they would like to keep playing or not
	promptContinue: function() {
		game.inquirer.prompt([
			{
				type: 'confirm',
				message: 'Would you like to play again?',
				name: 'confirm'
			}
		]).then(function(answer) {
			if(answer.confirm) {
				game.previousGuesses = [];
				game.wrongAnswersLeft = 6;
				game.promptCategory();
			} else {
				console.log('\nThanks for playing!\n');
				console.log('You won ' + game.wins + ' games and lost ' + game.losses + '!\n');
				console.log('See you next time!\n');
			}
		});
	}
}

//	This function runs to start the game initially
game.interface.startingInterface(game, 'Choose an option below to get started');
