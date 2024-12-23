import Keyboard from './keyboard.js';
import DataManager from './dataManager.js';
import * as Events from './customEvent.js';

const kb = Keyboard;
const dm = DataManager;
window.containerResult = document.querySelector('#result');
window.containerReturnMoney = document.querySelector('#return');
window.ruleBasic = /^\d+([+\-*/]{1,}\d+)*([+\-*/]{1,})?$/;
window.doubleOperators = /[+\-*/]{2,}/;

/**
 * Manejador del DOM
 *  - Constantemente menciono "campos", hago referencia a los "div"
 *  que simulan ser campos de texto (input)
 * @author Santiago Rivera Marin
 */
export default class Dom {
    /**
     * Lista de los "campos" de texto
     * @type {NodeListOf<Element>}
     */
    static #inputs;
    /**
     * "Campo enfocado"
     * @type {HTMLElement}
     */
    static #inputFocused;

    static init() {
        // Cargar valores iniciales (Elementos HTML, variables, e.t.c.)
        Dom.#loadDom();
        // Dar "focus()" al "campo" de precios
        Dom.focusInput(Dom.#inputs[0]);
        // Añadir "escuchador" de eventos click a "campos" de texto ("#prices, #money")
        Dom.#listenClickInputs();
        // Cargar los valores iniciales del "DataManager" cuando se cargue el documento
        document.body.onloadend = dm.init();

        dm.setInputs([Dom.#inputs[0], Dom.#inputs[1]]);
        // Agregar "Escuchador" al botón que calcula el dinero a devolver
        document.querySelector('#btnReturn').addEventListener('click', () => {
            dm.showReturnMoney();
        });
        // Cargar texto que simulan ser "placeholder"
        for (let inp of Dom.#inputs) Dom.placeholder(inp);
    }

    /**
     * Cargar los elementos de la página
     */
    static #loadDom() {
        // Cargar teclado
        kb.init();
        // Cargar campos de texto
        Dom.#inputs = document.querySelectorAll('#inputs > #prices, #money');
        // Elemntos HTML (botonoes de la calculadora)
        const buttons = kb.getButtons();
        // Añadir eventos a los botones (buttons)
        buttons.forEach((btn) => {
            Dom.addListener(btn, 'click', () => {
                // Disparar evento click en botones "Teclado personalizado"
                window.ev_key();
                Dom.loadBtnValToInput(btn.dataset.value);
                for (let inp of Dom.#inputs) Dom.placeholder(inp);
            });
        });
    }

    /**
     * "Enfocar" campo de texto
     */
    static focusInput(input) {
        // "Enfocar campo" de texto
        input.focus();
        // Almacenar el "campo enfocado"
        Dom.#inputFocused = input;
    }

    /**
     * Agregar texto que simula ser placeholder, cuando el "campo" está vacío
     * @param {HTMLElement} inp Elemento HTML al cual se aplicará
     */
    static placeholder(inp) {
        // Cuando no tiene contenido
        if (!inp.textContent) {
            // Agregar un texto según el campo que sea
            const txt = Dom.isPrices(inp) ? 'SUME LOS PRECIOS' : 'PLATA QUE LE PASARON';
            // Establecer el texto de contenido con la constante anterior
            inp.textContent = txt;
        }
    }

    /**
     * Verificar si es el campo de precios u otro
     * @param {HTMLElement} inp "Campo" de texto a "validar"
     * @returns {boolean} **true**: El "campo" es el de precios || **false**: Es otro campo
     */
    static isPrices = (inp) => {
        let ok;
        inp.id === 'prices' ? (ok = true) : (ok = false);
        return ok;
    };

    /**
     * Agregar "escuchador" de eventos a los dos campos de texto
     */
    static #listenClickInputs() {
        // Recorrer cada input
        Dom.#inputs.forEach((inp) => {
            // Agregar evento (click)
            Dom.addListener(inp, 'click', () => {
                //, Enfocar campo de texto
                Dom.focusInput(inp);
            });
        });
    }

    /**
     * Cargar el valor del botón en el campo de texto
     * @param {String} value Valor del botón
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
                Dom.#inputInner(value);
        }
    }

    /**
     * Validar si el "campo" tiene "placeholder" y validar el formato (3+2), además si encuentra formatos inválidos
     * por ejemplo (3++2 || 3++) se elimina el último operador
     * @param {Sting} value Valor a validar
     */
    static #inputInner(value) {
        // ¿Cumple la regla básica? (números seguidos de operadores)
        if (!window.ruleBasic.test(Dom.#inputFocused.textContent)) {
            Dom.#inputFocused.textContent = value;
        }
        // ¿Hay operadores repetidos? (Si lo hay eliminarlo)
        else if (window.doubleOperators.test(Dom.#inputFocused.textContent)) {
            Dom.#deleteInput();
        }
        // Cumple las dos reglas (números seguidos de operadores, y no hay operadores repetidos)
        else {
            Dom.#inputFocused.textContent += value;
        }
    }

    /**
     * Eliminar el último caracter del campo de texto enfocado
     */
    static #deleteInput() {
        let val = Dom.#inputFocused.innerHTML.toString();
        val = val.substring(0, val.length - 1);
        Dom.#inputFocused.innerHTML = val;
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
