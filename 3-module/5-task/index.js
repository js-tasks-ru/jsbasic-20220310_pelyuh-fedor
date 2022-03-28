function getMinMax(str) {
  let numArray = [];
  str.split(' ').forEach(item => {
    if (isFinite(item)) {
      numArray.push(+item);
    }
  });
  numArray.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    if (a < b) {
      return -1;
    }
  });

  console.log(numArray);
  return {min: numArray[0], max: numArray[numArray.length - 1]};
}
