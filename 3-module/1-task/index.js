function namify(users) {
  let names = [];
  users.forEach((object) => {
    if (object.name !== undefined) {
      names.push(object.name);
    }
  });
  return names;
}
