// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
     }
    }
	}
	return letterPoints;
 }
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let inputUser = input.question(`Let's play some scrabble!\nEnter a word to score: `);
  while(/[^A-Za-z\s]/.test(inputUser) === true || inputUser === ""){
    inputUser = input.question(`Please, only enter letters: `)
  }
  return inputUser;
};



let simpleScore = function(word){
  word = word.toUpperCase();
  return word.length;
}

let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let allVowels = ['A', 'E', 'I', 'O', 'U'];
  let score = 0;
  for(let i = 0; i < word.length; i++){
    if(allVowels.includes(word[i])){
      score += 3;
    } else {
      score += 1;
      }
    }
    return score;
}

let scrabbleScore =  function(word){
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    for (const j in letters) {
		    if (letters[j] === (word[i])) {
        score += Number(vals[j])
        }
    }
	}
  return score;
	}
// console.log(scrabbleScore)


const scoringAlgorithms = [{
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scoringFunction: simpleScore
},{
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
}, {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scoringFunction: scrabbleScore
}];

let userInput;
function scorerPrompt() {
  let userRespond = Number(input.question(`Which scoring algorithm would you like to use?\n
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n
  2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n
  Enter 0, 1, or 2: `));
  

  if(userRespond === 0){
    console.log(`Score for '${userInput}': ${scoringAlgorithms[0].scoringFunction(userInput)}`);
  } else if(userRespond === 1){
    console.log(`Score for '${userInput}': ${scoringAlgorithms[1].scoringFunction(userInput)}`);
  }else if(userRespond === 2){
    console.log(`Score for '${userInput}': ${scoringAlgorithms[2].scoringFunction(userInput)}`);
  }
};

function transform(word) {
let obj = {};
for(i in oldPointStructure){
  for(j = 0; j < oldPointStructure[i].length; j++){
    let newWord = oldPointStructure[i][j];
    obj[newWord.toLowerCase()] = Number(i);
  }

}
  return obj;
}
let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;
let vals = Object.values(newPointStructure);
let letters = Object.keys(newPointStructure);

function runProgram() {
  userInput = initialPrompt();
  let result = scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};