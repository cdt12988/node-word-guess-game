var Character = function(character) {
	var self = this;
	this.character = character;
	this.guessed = false;
	this.specialCharacter = false;
	this.specialCharacters = ['\'', '"', '.', ' ', ':', ',', '&', '-'];
	//	Returns either the actual character or an underscore (_) placeholder depending on whether the letter has been guesse yet or not
	this.returnCharacter = function() {
		if(self.guessed) {
			return self.character;
		} else {
			return '_';
		}
	};
	//	Checks if the guessed letter matches this character and changes guessed to true if so
	this.checkCharacter = function(character) {
		if(self.character == character) {
			self.guessed = true;
		}
	};
	//	When a new character is created, this checks whether or not the character is a special character or not
	//	If it is, it changes guessed to TRUE so that it will show the special character when returnCharacter() is called
	if(this.specialCharacters.indexOf(this.character) >= 0) {
		this.guessed = true;
	}
}

//	Exports the Character constructor to be used by the Word Constructor
module.exports = Character;