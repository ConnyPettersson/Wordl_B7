export default function input(guess, correctWord) {
  
  guess = guess.toLowerCase();
  correctWord = correctWord.toLowerCase();

  const feedback = [];

  let remainingLetters = correctWord;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === correctWord[i]) {
      feedback.push({ letter: guess[i], result: 'correct' });
      remainingLetters = remainingLetters.replace(guess[i], '');
    } else {
      feedback.push(null);
    }
  }
  
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] !== null) continue;

    if (remainingLetters.includes(guess[i])) {
      feedback[i] = { letter: guess[i], result: 'misplaced' };
      remainingLetters = remainingLetters.replace(guess[i], '');
    } else {
      feedback[i] = { letter: guess[i], result: 'incorrect' };
    }
  }
  
  return feedback;
}