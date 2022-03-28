function filterRange(arr, a, b) {
  let filteredArray = [];
  arr.forEach((item) => {
    if (b >= item >= a) {
      filteredArray.push(item);
    }
  });
  return filteredArray;
}
