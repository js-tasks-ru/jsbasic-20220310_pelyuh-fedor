function camelize(str) {
  const stringArray = str.split('-').map((item, index) => {
    if (index > 0) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
    return item;
  });
  return stringArray.join('');
}
