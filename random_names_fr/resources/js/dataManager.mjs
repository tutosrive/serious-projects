export default class Manager {
  static #Table;

  static async init() {
    // Referenciar la clase que crea tablas
    const { default: Table } = await import("./tables.mjs");
    Manager.#Table = Table;
  }

  /**
   * Cargar/crear contenedor de tabla
   */
  static loadContainer() {
    // Insertar contenedor de tabla
    document.querySelector("main").innerHTML = `
      <div class="p-2 w-20 col-md-4 container ">
          <div id="table-container" class="m-2"></div>
      </dv>`;
  }
  /**
   *
   * @param {String} filename Ruta completa al archivo/url que se hará la petición
   * @returns JSON con los datos recuperados
   */
  static async getData(filename) {
    try {
      // Realizar solicitud
      const response = await Helpers.fetchJSON(filename);
      return response;
    } catch (e) {
      Toast.show({
        message: "Error obteniendo los datos",
        mode: "danger",
        error: e,
      });
    }
  }

  /**
   * Enviar datos a la tabla
   * @param {String} filename Ruta completa al archivo/url del cual se obtendrán los datos
   */
  static async sendData(filename) {
    // Se obtienen los datos
    let data = await Manager.getData(filename);

    // Columnas de la tabla
    const cols = [
      {
        title: "Nombre Hombre",
        field: "name_male",
        width: 201,
        hozAlign: "center",
      },
      { title: "Nombre mujer", field: "name_female", width: 201 },
    ];
    // Cargar contenedor de tabla
    Manager.loadContainer();
    // Enviar datos a la tabla y ponerlos en ella
    Manager.#Table.putData(data, cols);
  }

  /**
   * Se cargan los elementos de inicio
   */
  static async loadHome() {
    try {
      const response = await Helpers.fetchText("./resources/html/home.html");
      document.querySelector("main").innerHTML = response;
    } catch (e) {
      Toast.show({
        message: "No se pudo cargar la páigna de incio. Intente recargar",
        error: e,
        mode: "danger",
      });
    }
  }
}

Manager.init();
