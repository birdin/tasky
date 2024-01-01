

/*

function limitString(inputString, maxLength) {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength - 3) + '...';
  }
  return inputString;
}

*/

type Props = {
    word: string;
    number: number;
}

function limitString({word, number}: Props) : string {
    if(word.length < number - 2) {
        return word;
    }
    return word.substring(0, number - 3) + '...';
}