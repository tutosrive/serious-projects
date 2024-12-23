import Keyboard from './keyboard.js';
import DataManager from './dataManager.js';
const kb = Keyboard;
const dm = DataManager;
window.containerResult = document.querySelector('#result');
window.containerReturnMoney = document.querySelector('#return');

export default class Dom {
    static #inputs;
    static #inputFocused;

    static init() {
        Dom.#loadDom();
        Dom.focusInput(Dom.#inputs[0]);
        Dom.#listenClickInputs();
        document.body.onloadend = dm.init();
        document.querySelector('#btnReturn').addEventListener('click', () => {
            dm.showReturnMoney();
        });
    }

    /**
     * Cargar los elementos de la página
     */
    static #loadDom() {
        // Cargar campos de texto
        Dom.#inputs = document.querySelectorAll('#inputs > input');
        // Cargar teclado
        kb.init();
        // Elemntos HTML (botonoes de la calculadora)
        const buttons = kb.getButtons();
        // Añadir eventos a los botones (buttons)
        buttons.forEach((btn) => {
            Dom.addListener(btn, 'click', () => Dom.loadBtnValToInput(btn.dataset.value));
        });
    }

    /**
     * "Enfocar" campo de texto
     */
    static focusInput(input) {
        input.focus();
        Dom.#inputFocused = input;
    }

    /**
     * Agregar "escuchador" de eventos a los dos campos de texto
     */
    static #listenClickInputs() {
        // Recorrer cada input
        Dom.#inputs.forEach((inp) => {
            // Agregar evento (click)
            Dom.addListener(inp, 'click', () => {
                inp.readonly = false; // Permitir click
                //, Enfocar campo de texto
                Dom.focusInput(inp);
                inp.readonly = true; // Esconder teclado
            });
        });
    }

    /**
     * Cargar el valor del botón en el campo de texto
     * @@param {String} value Valor del botón
     */
    static loadBtnValToInput(value) {
        switch (value) {
            case 'equal':
                dm.calcPrice();
                break;
            case 'del':
                Dom.#deleteInput();
                break;
            default:
                // Tab to edit
                Dom.#inputFocused.value += value;
        }
    }

    /**
     * Eliminar el último caracter del campo de texto enfocado
     */
    static #deleteInput() {
        let val = Dom.#inputFocused.value;
        val = val.substring(0, val.length - 1);
        Dom.#inputFocused.value = val;
    }

    /**
     * Añadir "escuchador" de eventos a un elemento HTML
     * @param {HTMLElement} element Elemento al cual se añadirá el "escuchador"
     * @param {String} type Tipo de evento
     * @param {function} callback Función a ejecutar una vez se active el evento
     */
    static addListener(element, type, callback) {
        element.addEventListener(type, (e) => {
            e.preventDefault();
            callback();
        });
    }
}
