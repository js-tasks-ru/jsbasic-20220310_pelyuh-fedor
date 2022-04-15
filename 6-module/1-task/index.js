/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = this.addTable();
  }

  addTableHeadAndBody(table) {
    table.insertAdjacentHTML('beforeend', `
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Возраст</th>
                            <th>Зарплата</th>
                            <th>Город</th>
                            <th></th>
                        </tr>
                    </thead><tbody></tbody>`);
  }

  addTableRow(table) {
    const tbody = table.querySelector("tbody");
    this.rows.forEach((row, index)=>{
      tbody.insertAdjacentHTML('beforeend', `
                            <tr id='tableRow_${index}'>
                                <td>${row.name}</td>
                                <td>${row.age}</td>
                                <td>${row.salary}</td>
                                <td>${row.city}</td>
                                <td>
                                    <button data-button-row="tableRow_${index}" >X</button>
                                </td>
                            </tr>`);
    });
  }

  addRemoveRowListener(table) {
    table.addEventListener('click', function (event) {
      const target = event.target;
      if (target.dataset.buttonRow) {
        const currentRow = table.querySelector(`#${target.dataset.buttonRow}`);
        currentRow.remove();
      }
    });
  }

  addTable() {
    if (!this.table) {
      const table = document.createElement("table");

      this.addTableHeadAndBody(table);

      this.addTableRow(table);

      this.addRemoveRowListener(table);

      return table;

    }
  }

  get elem() {
    return this.table;
  }
}
