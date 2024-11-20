import Imports from "./imports.mjs";

class App {
  static async init() {
    try {
      // Ejecutar el "escuchador" de eventos
      App.#listener();
    } catch (e) {
      Toast.show({ message: e.message, mode: "danger", error: e });
    }
  }

  /**
   * "Escucha" escucha/reacciona a los eventos del menú de navegación (header a)
   */
  static #listener() {
    document.querySelectorAll("header a").forEach((ancla) => {
      ancla.addEventListener("click", async (e) => {
        e.preventDefault();

        // Manager.loadContainer();
        // Toma la útlima parte de una url (http://localhost:7070/home/, tomará "home")
        let reg;

        // Si el target es un IMG, reg será su id
        if (e.target.tagName === "IMG") {
          reg = e.target.id;
        }
        // Si es un ancla, tendrá un href el cual se verificará con la regex
        else if (e.target.tagName === "A") {
          reg = e.target.href.match("[^/]+(?=/?$)")[0];
        }

        // Validar opciones
        switch (reg) {
          // Cargar página de inicio
          case "home":
            Manager.loadHome();
            break;
          // Códigos válidos
          case "co":
          case "de":
          case "en":
          case "es":
          case "fr":
          case "it":
          case "pt":
            Manager.sendData(`./resources/json/names_${reg}.json`);
            break;
        }
      });
    });
  }
}

App.init();
