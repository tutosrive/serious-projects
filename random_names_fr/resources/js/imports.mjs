import * as bootstrap from "../utils/bootstrap-5.3.3/js/bootstrap.bundle.min.js";
import * as Popper from "../utils/popper/popper.min.js";
import Popup from "../utils/carlos-cuesta/popup.js";
import Toast from "../utils/carlos-cuesta/toast.js";
import Helpers from "../utils/carlos-cuesta/helpers.js";
import Icons from "../utils/carlos-cuesta/icons.js";
import Manager from "./dataManager.mjs";

export default class Imports {
  static async init() {
    // Ruta del puerto
    window.urlAPI = await Helpers.fetchJSON("./resources/assets/config.json")
      .url;
    // Atributos globales
    window.Modal = Popup;
    window.Toast = Toast;
    window.icons = Icons;
    window.Helpers = Helpers;
    window.tableHeight = "calc(100vh - 90px)";
    window.Manager = Manager;
  }
}

Imports.init();
