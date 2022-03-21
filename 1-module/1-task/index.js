function factorial(n) {
  let total = 1;
  for (let currentCount = 1; currentCount <= n; currentCount++) {
    total = total * currentCount;
  }
  return total;
}
