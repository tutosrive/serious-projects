import * as bootstrap from '../utils/bootstrap-5.3.3/js/bootstrap.bundle.min.js';
import * as Popper from '../utils/popper/popper.min.js';
import Popup from '../utils/carlos-cuesta/popup.js';
import Toast from '../utils/carlos-cuesta/toast.js';
import Helpers from '../utils/carlos-cuesta/helpers.js';
import Icons from '../utils/carlos-cuesta/icons.js';
import Manager from './dataManager.mjs';
import Languages from './lang.mjs';
import DomManager from './domManager.mjs';
import { TabulatorFull as Tabulator } from '../utils/tabulator-6.3/js/tabulator_esm.min.js';

export default class Imports {
  static async init() {
    window.Manager = Manager;
    window.Helpers = Helpers;
    window.Languages = Languages;
    // Ruta del puerto
    let urlAPI = await Helpers.fetchJSON('./resources/assets/config.json');
    window.urlAPI = urlAPI.url;
    // Atributos globales
    window.Modal = Popup;
    window.Tabulator = Tabulator;
    window.Toast = Toast;
    window.icons = Icons;
    window.tableHeight = 'calc(100vh - 155px)';
    window.currentOption = ''; // Última ruta solicitada
    window.dom = DomManager;
  }
}

Imports.init();
