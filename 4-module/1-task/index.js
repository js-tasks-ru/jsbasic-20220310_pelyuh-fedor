function makeFriendsList(friends) {
  const list = document.createElement('ul');
  let listItems = '';
  for (let friend of friends) {
    listItems = listItems + `<li>${friend.firstName} ${friend.lastName}</li>`;
  }
  list.innerHTML = `${listItems}`;

  return list;
}
