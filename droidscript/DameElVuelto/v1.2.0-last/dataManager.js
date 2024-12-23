import Spc from './speecher.js';

/**
 * Manejo de información (Validaciones, mostrar resultados, operaciones, e.t.c.)
 * @author Santiago Rivera Marin
 * @version 1.1
 * @method init Cargar valores, eventos, datos iniciales
 */
export default class DataManager {
    /**
     * Valor del "campo" de texto
     * @type {String}
     */
    static #value;
    /**
     * Total a devolver
     * @type {number}
     */
    static #result;
    /**
     * "Campo" de los precios
     * @type {HTMLElement}
     */
    static #inputPrices;
    /**
     * "Campo" de la plata que entregaron
     * @type {HTMLElement}
     */
    static #inputMoney;

    /**
     * Cargar valores iniciales de "DataManager"
     * @returns {boolean} true
     */
    static init() {
        try {
            DataManager.#result = 0;
            DataManager.#exeEval();
            Spc.init();
        } catch (e) {
            // console.error('Error en init() => ' + e)
        }
        return true;
    }

    /**
     * Establecer específicamente el "campo" de los "precios"
     * @param {Array} inp "Campos" de textos (#prices, #money)
     */
    static setInputs(inp) {
        DataManager.#inputPrices = inp[0];
        DataManager.#inputMoney = inp[1];
    }

    /**
     * Ejecutar "evaluador" de operaciones
     */
    static #exeEval() {
        // Establecer un intervalo para obtener el valor del campo de texto
        DataManager.#setValue();
    }

    /**
     * Obtener y mostrar el valor del campo de texto
     */
    static #setValue() {
        // Evento personalizado, cuando se presiona un botón del "Teclado personalizado"
        document.addEventListener('key_click', (e) => {
            // Esperar 0.001 segundos (1 milisegundo), para obtener el valor del "input"
            const intervalGetValue = setInterval(() => {
                // Establecer el valor (Se obtiene del "input" de texto de "precios")
                DataManager.#value = DataManager.#inputPrices.textContent.toString();
                // Evaluar valor
                DataManager.#evalValue();
                // Mostrar el resultado del campo de "precios"
                DataManager.showResult();
            }, 4);

            // Justo en la primer ejecución del intervalo "intervalGetValue", se elimina (Ejecución: 1 milisegundo)
            setTimeout(() => {
                // Eliminar intervalo
                clearInterval(intervalGetValue);
            }, 4);
        });
        // Mostrar el resultado en pantalla
        DataManager.showResult();
    }

    /**
     * Mostrar el valor calculado en pantalla
     */
    static showResult() {
        try {
            // Agregar contenido al visor del resultado de precios
            containerResult.innerHTML = DataManager.#result === 0 ? `$${DataManager.#result}` : `$${DataManager.#result} pesos`;
        } catch (e) {
            // console.error('Error en showResult() => ' + e)
        }
    }

    /**
     * Mostrar el valor calculado en pantalla
     */
    static showReturnMoney() {
        try {
            const valReturn = DataManager.#calcReturnMoney();
            const valSpeech = valReturn[1].replace('$', '');
            // Agregar contenido al visor del resultado de cuanto debe devolver
            Spc.speech(valSpeech);
            containerReturnMoney.innerHTML = valReturn[1];
        } catch (e) {
            // console.error('Error en showReturnMoney() => ' + e)
        }
    }

    /**
     * Calcular valor a devolver
     * @returns {Array} [valor a devolver, mensaje]
     */
    static #calcReturnMoney() {
        try {
            let msg = '';
            let failed = [0, '¿CUÁNTO DEVOLVER?'];
            if (DataManager.#result > 0) {
                const inpReturn = document.querySelector('#money');
                const totalReturn = DataManager.#inputMoney.textContent - DataManager.#result;

                // Valor menor a cero
                if (totalReturn < 0) {
                    msg = `Le hace falta $${totalReturn * -1} pesos.`;
                }
                // Valor igual a cero
                else if (totalReturn === 0) {
                    msg = `No hay que devolver`;
                }
                // Valor no está en formato "operación" (Ej: 3+2+1)
                else if (!window.ruleBasic.test(totalReturn)) {
                    return failed;
                }
                // Todo correcto
                else {
                    msg = `Devuelva $${totalReturn} pesos.`;
                }

                return [totalReturn, msg];
            }
            Spc.speech('Revise bien los números de los precios, y mire bien si es suma o resta');
            return failed;
        } catch (e) {
            // console.error('Error en calcReturnMoney() => ' + e)
        }
    }

    /**
     * Evaluar operación
     */
    static #evalValue() {
        try {
            // Último caracter del valor del campo de texto (Para validar si el valor finaliza en "dígito" o "operador")
            const endVal = String(DataManager.#value[DataManager.#value.length - 1]);
            // Agregar una copia del valor del campo de texto (Para no modificar el valor original)
            let val = DataManager.#value;
            // Si el último caracter no es un número
            if (isNaN(endVal)) {
                // Se evalúa el campo del texto como operación, sin tener en cuenta el último carácter
                DataManager.#result = eval(val.substring(0, val.length - 1)) ?? 0;
            } else {
                // Evaluar valor normal (último caracter es un número)
                DataManager.#result = eval(val) ?? 0;
            }
        } catch (e) {
            // console.error('Error en #evalValue() => ' + e)
        }
    }

    /**
     * Poner el resultado en el campo de texto (después de evaluar),
     * específicamente cuando se presiona el botón ("equal", "=")
     */
    static calcPrice() {
        try {
            // Campo de texto de "precios"
            const inp = DataManager.#inputPrices;
            // Resultado de los precioes sumados
            inp.value = DataManager.#result;
            // Actualizar valor del contenedor del resultado
            DataManager.showResult();
        } catch (e) {
            // console.error('Error en calcPrice() => ' + e)
        }
    }
}
