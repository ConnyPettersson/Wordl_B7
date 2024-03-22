export default function selectWord(words, desiredLength, uniqueLetters) {
  let filteredWords = words.filter( word => word.length === desiredLength);

  if (uniqueLetters) {
    filteredWords = filteredWords.filter(word => {
      for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
          if (word[i] === word[j]) {
            return false;
          }
        }
      }
      return true;
    });
  }

  if(filteredWords.length === 0) {
    console.error('Inga ord matchar de angivna kriterierna');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}

export function allLettersUnique(word) {
  for (let i = 0; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      if (word[i] === word[j]) {
        return false;
      }
    }
  }
  return true;
}
