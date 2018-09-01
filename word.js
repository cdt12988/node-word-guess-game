var Character = require('./character');

var Word = function(word) {
	var self = this;
	this.word = word;
	// Splits the word into an array of its individual characters
	this.characters = word.split('');
	//	This runs when the word is first created.  It changes the individual characters into new Character Objects
	this.characters.forEach(function(character, i) {
		self.characters[i] = new Character(character);
	});
	//	This loops through all the characters in the word and returns either the character or an underscore placeholder for each
	this.returnWord = function() {
		var output = '';
		self.characters.forEach(function(character) {
			output += character.returnCharacter().toUpperCase() + ' ';
		});
		return output.trim();
	};
	//	This loops through all the characters in the word and compares the letter guessed to each of them
	this.checkCharacters = function(character) {
		this.characters.forEach(function(index) {
			index.checkCharacter(character);
		});
	};
};

/*=========================================================
	
Everything below here are just my first drafts at making

the interface system and testing it with different scenarios

I could just delete them... but... ...

==========================================================*/



/*
var shark = new Word('shark\'s, Great White');
shark.checkCharacters('q');
// console.log(shark);
console.log(shark.returnWord());
*/



/*
console.log('');
console.log('');
console.log('');
console.log('    ===================================');
console.log('    |                        Wins: 0  |');
console.log('    |                      Losses: 0  |');
console.log('    |                                 |');
console.log('    |          _________              |');
console.log('    |          |      \\|              |');
console.log('    |          O       |              |');
console.log('    |         /|\\      |              |');
console.log('    |         / \\      |              |');
console.log('    |                 /|\\             |');
console.log('    |          \u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E         |');
console.log('    |            _ _ _ _ _            |');
console.log('    |                                 |');
console.log('    |             ANIMALS             |');
console.log('    |                                 |');
console.log('    ===================================');
console.log('');
console.log('');
console.log('');
*/

/*
console.log('');
console.log('');
console.log('');
console.log('    =============================================================================');
console.log('    |                                                                           |');
console.log('    |                                                                  Wins: 0  |');
console.log('    |                                                                Losses: 0  |');
console.log('    |                                                                           |');
console.log('    |                               _________                                   |');
console.log('    |                               |      \\|                                   |');
console.log('    |                               O       |                                   |');
console.log('    |                              /|\\      |                                   |');
console.log('    |                              / \\      |                                   |');
console.log('    |                                      /|\\                                  |');
console.log('    |                               \u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E                              |');
// console.log('    |            _ _ _ _ _            |');
// console.log('    | _ _ _ _ _   _ _ _ _ _   _ _ _   _ _ _   _ _ _ _ _ _ _ _ _   _ _ _ _ _ _ _ |');
console.log('.   |                    _ _ _ _ _ _ _   _ _   _ _ _ _ _ _ _                    |');
console.log('    |                                                                           |');
console.log('    |                                  ANIMALS                                  |');
console.log('    |                                                                           |');
console.log('    =============================================================================');
console.log('                                ');
console.log('                ');
console.log('');
*/

function generateSpaces(num) {
	var spaces = '';
	for(var i = 0; i < num; i++) {
		spaces += ' ';
	}
	return spaces;
}

var wins = 8;
var losses = 14;
// var word = '_ _ _ _ _ _ _   _ _   _ _ _ _ _ _ _';
var word = '_ _ _ _ _   _ _ _ _ _   _ _ _   _ _ _   _ _ _ _ _ _ _ _ _   _ _ _ _ _ _ _';
var category = 'COMIC BOOKS';
var guessesLeft = 0;
var message = 'There were not any A\'s';
var previousGuesses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'F', 'G', 'H', 'I', 'J'];

function generateInterface() {
	var start = '    |';
	var equals = '    =============================================================================';
	var blank = start + generateSpaces(75) + '|';
	
	console.log('\n\n\n');
	console.log(equals);
// 	console.log(blank);
// 	showWinsAndLosses();
	if(wins < 10) {
		console.log(start + generateSpaces(66) + 'Wins: ' + wins + '  |');
	} else {
		console.log(start + generateSpaces(65) + 'Wins: ' + wins + '  |');
	}
	if(losses < 10) {
		console.log(start + generateSpaces(64) + 'Losses: ' + losses + '  |');
	} else {
		console.log(start + generateSpaces(63) + 'Losses: ' + losses + '  |');
	}
// 	console.log(blank)
	console.log(start + centerText(message, 75) + '|');
	console.log(blank);
	drawStickFigure();
	var preWord = Math.round((75 - word.length) / 2);
	var postWord = 75 - preWord - word.length;
// 	console.log(start + generateSpaces(preWord) + word + generateSpaces(postWord) + '|');
	console.log(start + centerText(word, 75) + '|');
	console.log(blank);
	var preCat = Math.round((75 - category.length) / 2);
	var postCat = 75 - preCat - category.length;
// 	console.log(start + generateSpaces(preCat) + category + generateSpaces(postCat) + '|');
	console.log(start + centerText(category, 75) + '|');
	console.log(blank);
	console.log(start + '              \u231c---------------------------------------------\u231d              |');
// 	console.log(start + generateSpaces(14) + '|' + generateSpaces(45) + '|' + generateSpaces(14) + '|');
	console.log(start + '              |' + centerText('Previous Guesses', 45) + '|              |');
	console.log(start + generateSpaces(14) + '|' + generateSpaces(45) + '|' + generateSpaces(14) + '|');
	console.log(start + generateSpaces(14) + '|' + centerText(previousGuesses.sort().join(' '), 45) + '|' + generateSpaces(14) + '|');
	console.log(start + generateSpaces(14) + '|' + generateSpaces(45) + '|' + generateSpaces(14) + '|');
	console.log(start + '              \u231e---------------------------------------------\u231f              |');
	console.log(blank);
	console.log(equals);
	console.log('\n\n\n');
}

function centerText(text, width) {
	var preText = Math.round((width - text.length) / 2);
	var postText = width - preText - text.length;
	return generateSpaces(preText) + text + generateSpaces(postText);
}
function drawStickFigure() {
	console.log('    |                               _________                                   |');
	console.log('    |                               |      \\|                                   |');
// 	console.log('    |                               |      \\|                                   |');
	if(guessesLeft > 5) {
		console.log('    |                                       |                                   |');
	} else {
		console.log('    |                               O       |                                   |');
	}
	if(guessesLeft > 4) {
		console.log('    |                                       |                                   |');
	} else if(guessesLeft > 3) {
		console.log('    |                               |       |                                   |');
	} else if(guessesLeft > 2) {
		console.log('    |                              /|       |                                   |');
	} else {
		console.log('    |                              /|\\      |                                   |');
	}
	if(guessesLeft > 1) {
		console.log('    |                                       |                                   |');
	} else if(guessesLeft > 0) {
		console.log('    |                              /        |                                   |');
	} else {
		console.log('    |                              / \\      |                                   |');
	}
	console.log('    |                                      /|\\                                  |');
	console.log('    |                               \u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E                              |');
}

// generateInterface();

//	Exports the Word constructor to be used in the main game
module.exports = Word;