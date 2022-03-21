function truncate(str, maxlength) {
  if (str.length > maxlength) {
    let truncatedString = '';
    for (let index = 0; index < maxlength - 1; index++) {
      truncatedString = truncatedString + str[index];
    }
    return truncatedString + '…';
  }
  return str;
}
