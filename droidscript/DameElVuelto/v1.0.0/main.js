import Dom from "./Html/domManager.js";

class App {
  constructor() {
    console.log("No necesita constructor.");
  }

  static init() {
    // Cargar teclado (de la calculadora)
    try {
      Dom.init();
    } catch (e) {
      // console.error('Error en init() => ' + e)
    }
  }
}

App.init();
