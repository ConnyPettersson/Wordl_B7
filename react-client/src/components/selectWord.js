export default function selectWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
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
