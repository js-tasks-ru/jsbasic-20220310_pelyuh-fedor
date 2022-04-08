function highlight(table) {
  const tableRows = table.querySelectorAll("tr");
  tableRows.forEach((tableRow) => {
    const rowsCells = tableRow.querySelectorAll("td");
    const statusCell = tableRow.querySelector('td:nth-child(4)');

    if (statusCell.dataset.available === "true") {
      tableRow.classList.add('available');
    }
    if (statusCell.dataset.available === "false") {
      tableRow.classList.add('unavailable');
    }
    if (!statusCell.dataset.available) {
      tableRow.hidden = true;
    }

    rowsCells.forEach((cell) => {
      const cellTextContent = cell.innerText;
      if (cellTextContent === 'f') {
        tableRow.classList.add("female");
      }
      if (cellTextContent === 'm') {
        tableRow.classList.add("male");
      }
      if (isFinite(cellTextContent) && (cellTextContent < 18)) {
        tableRow.style.textDecoration = 'line-through';
      }
    });
  });
}
