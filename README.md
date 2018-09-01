# HANGMAN CLI

This Command Line Interface game uses Node.js object constructors to power the classic game of Hangman!

![Screenshot](https://cdt12988.github.io/images/portfolio/hangmancli.PNG "Hangman CLI Screenshot")

## Getting Started

Since this game is a Command Line application, you must first install it on your local machine.

### Installation

To install the game, simply download or clone the Git Repository to your computer.  Then in your command line application, ensure that you are within the repo directory and issue the following command to install the necessary NPM packages for the app to run properly.  Note that you must already have Node.js installed on your machine for this to work.

```
npm install
```

### Running the Game

Once the game and packages are installed, to play the game just issue the following command while within the repo directory of your command line application.

```
node index.js
```

## Game Features

### Categories

Players can select from a variety of categories, each containing at least 50 different words or phrases for the player to guess.  Alternatively, the player can select a random category.

### Gameplay

Players guess letters to see if they appear in the word or phrase displayed.  If they do, the letters are revealed.  Otherwise, a stick-figure is slowly drawn hanging from the gallows. (Note that the command line window may need to be enlarged to see the entire game layout)  The game continues until the player guesses all the letters in the word or phrase, or until the stick figure is completely drawn.

### Game Tracking

The game keeps track of the player's total wins, losses and current winning streak.  Custom messages also appear throughout the game in response to the current state of the game and the player's input.

## Development Notes

### Developer's Toolkit

This game is written in Node.js and uses the Inquirer NPM Package.

### Contributers

Cody Thompson is the only contributor to this game.