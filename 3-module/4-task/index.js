function showSalary(users, age) {
  const salary = [];
  users.forEach((user) => {
    if (user.age <= age) {
      salary.push(user.name + ', ' + user.balance);
    }
  });
  return salary.join(`\n`);
}
