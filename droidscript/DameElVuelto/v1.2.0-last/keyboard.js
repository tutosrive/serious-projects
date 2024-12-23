export default class Keyboard {
    /**
     * @type {HTMLElement}
     */
    static container; // Contenedor del teclado
    /**
     * @type {Array}
     */
    static buttons; // Botones (Texto)
    /**
     * @type {Array}
     */
    static btnElements; // Botones (HTML)

    /**
     * Inicializar teclado
     */
    static init() {
        // Cargar teclado
        Keyboard.#load();
    }

    /**
     * Cargar contenido del teclado
     */
    static #load() {
        // Botones y sus "configuraciones"
        Keyboard.buttons = [['&#9003;', 'del', { classes: 'backspace' }], '1', '2', '3', ['+', '+', { classes: 'operator' }], '4', '5', '6', ['-', '-', { classes: 'operator' }], '7', '8', '9', ['&#215;', '*', { classes: 'operator' }], '0', '00', ['=', 'equal', { classes: 'equal' }]];
        // Cargar contenedor del teclado
        Keyboard.#loadContainer('#keyboard');
        // Cargar botones
        Keyboard.#loadButtons();
    }

    /**
     * Obtener el contenedor
     * @param {String} selector Identificador por el cual se buscará el contenedor
     */
    static #loadContainer(selector) {
        Keyboard.container = document.querySelector(selector);
    }

    /**
     * Cargar botones en el contenedor
     */
    static #loadButtons() {
        Keyboard.btnElements = [];
        // Recorrer lista de botones
        for (let btn of Keyboard.buttons) {
            // Clases CSS
            let classes = 'btn';
            // Recorrer cada elemento de cada botón
            for (let index in btn) {
                // Validar si en los elementos del botón existe un diccionario 'classes'
                if (btn[index].classes) {
                    // Si existe dicho diccionario, se agrega a las clases del botón
                    classes += ' ' + btn[index].classes;
                }
            }

            // Valor de atributo (data-value="") de cada botón
            // Se verifica si existe (btn[1]) y solo se busca en arreglos (object), si existe el valor será
            // (btn[1]) caso contrario, el "btn" es un String y ese será el valor
            const dataSetValue = btn[1] && typeof btn === 'object' ? btn[1] : btn;
            // Texto que contendrá cada botón
            const text = typeof btn === 'object' ? btn[0] : btn;
            // Por cada elemento de la lista se crea un elemento HTML (button)
            const element = Keyboard.#createElement('button', text, dataSetValue, classes);
            // Se agrega al contenedor (antes de finalizar el espacio del contenedor)
            Keyboard.container.insertAdjacentElement('beforeend', element);
            // Botones en "limpio" (Es decir, el botón HTML como tal)
            Keyboard.btnElements.push(element);
        }
    }

    /**
     * Crear elementos HTML (Botones)
     * @param {String} tagName Nombre de la etiqueta del elemento a crear (div, button, input, e.t.c.)
     * @param {String} content Contenido del elemento
     * @param {String} value Valor para el atributo "data-value=''"
     * @param {String} classes Clases CSS para dar estilo al elemento (Deben estar separadas por un espacio, c/u)
     * @returns HTMLElement. Elemento creado con sus atributos y propiedades
     */
    static #createElement(tagName = null, content = null, value = null, classes = null) {
        const element = document.createElement(tagName);
        // Contenido del elemento
        element.innerHTML = content;
        // atributo "data-value"
        element.dataset.value = value;
        // Verificar si hay clases para agregar (CSS)
        if (classes) {
            // Separar en un arreglo las clases (Deben estar separadas por un espacio)
            classes = classes.split(' ');
            // Recorrer arreglo de clases (CSS)
            for (let strClass of classes) {
                // Agregar cada clase del arreglo al elemento
                element.classList.add(strClass);
            }
        }
        // Retornar el elemento HTML
        return element;
    }

    /**
     * Obtener botones (HTML)
     * @returns Array[HTMLElement]. Botones HTML
     */
    static getButtons() {
        return Keyboard.btnElements;
    }
}
