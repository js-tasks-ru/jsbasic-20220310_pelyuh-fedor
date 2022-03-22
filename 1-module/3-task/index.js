function ucFirst(str) {
  if (str.length !== 0) {
    let upperLetter = str[0].toUpperCase();
    for (let index = 1; index < str.length; index++) {
      upperLetter = upperLetter + str[index];
    }
    return upperLetter;
  }
  return str;
}
