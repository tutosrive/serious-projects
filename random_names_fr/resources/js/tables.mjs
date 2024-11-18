import { TabulatorFull as Tabulator } from "../utils/tabulator-6.3/js/tabulator_esm.min.js";

export default class Table {
  static #table;

  /**
   * Crear tabla con **Tabulator**
   * @param {Array} data Datos que se agregarán a las columnas (**Objetos** => {clave:valor})
   * @param {Array} cols **Arreglo** con las configuraciones de cada columna (**Objetos** => {clave:valor})
   */
  static createTable(data = [], cols = []) {
    Table.#table = new Tabulator("#table-container", {
      height: tableHeight,
      data: data,
      layout: "fitDataStretch",
      progressiveLoad: "scroll", // Carga datos progresivamente
      columns: cols,
      columnDefaults: {
        maxWidth: 30, //maximum column width of 300px for all columns
      },
      scrollToColumnIfVisible: false,
      responsiveLayout: "hide", // activado el scroll horizontal, también: ['hide'|true|false]
      columnDefaults: {
        tooltip: true, //show tool tips on cells
      },
      initialSort: [
        // establecer el ordenamiento inicial de los datos
        { column: "name_male", dir: "asc" },
      ],
    });
  }

  /**
   * Agregar datos a la **tabla**
   * @param {Array} data Datos que se agregarán a las columnas (**Objetos** => {clave:valor})
   * @param {Array} cols **Arreglo** con las configuraciones de cada columna (**Objetos** => {clave:valor})
   */
  static putData(data = [], cols = []) {
    if (data.length == 0 || cols.length == 0) {
      return;
    }

    Table.createTable(data, cols);
  }
}
