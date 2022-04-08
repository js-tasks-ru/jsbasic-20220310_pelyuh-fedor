function makeDiagonalRed(table) {
  const tableCells = table.querySelectorAll(`td`);
  const tableRow = table.querySelector('tr');
  const rowsCells = tableRow.querySelectorAll('td');
  // 1 вариант
  // tableCells.forEach( (cell) => {
  //   const cellContent = cell.innerText.split(':');
  //   if (cellContent[0] / cellContent[1] === 1) {
  //     cell.style.background = 'red';
  //   }
  // });

  // 2 вариант
  // tableCells.forEach( (cell, index) => {
  //   if (!(index % (rowsCells.length + 1))) {
  //     cell.style.backgroundColor = 'red';
  //   }
  // });

  // 3 вариант
  const tableRowsCount = table.rows.length;
  for (let index = 0; index < tableRowsCount; index++) {
    const cell = table.rows[index].cells[index];
    cell.style.backgroundColor = 'red';
  }
}
