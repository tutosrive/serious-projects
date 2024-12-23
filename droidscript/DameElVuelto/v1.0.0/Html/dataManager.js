import Spc from './speecher.js';

export default class DataManager {
    static #value; // Valor del campo de texto
    static #result; // Resultado de la operación
    static #inputPrices;
    static #idInterval;

    static init() {
        try {
            DataManager.#result = 0;
            DataManager.#inputPrices = document.querySelector('#prices');
            DataManager.#exeEval();
        } catch (e) {
            // console.error('Error en init() => ' + e)
        }
        return true;
    }

    /**
     * Ejecutar "evaluador" de operaciones
     */
    static #exeEval() {
        // Establecer un intervalo para obtener el valor del campo de texto
        DataManager.#setValueInterval();
    }

    /**
     * Obtener el valor del campo de texto cada segundo
     */
    static #setValueInterval() {
        // Almacenar intervalo (Para remover después)
        DataManager.#idInterval = setInterval(() => {
            // Establecer el valor (Se obtiene del campo de texto de "precios")
            DataManager.#value = DataManager.#inputPrices.value;
            // Evaluar valor
            DataManager.#evalValue();
            // Mostrar el resultado del campo de "precios"
            DataManager.showResult();
        }, 100); // Cada 0.1 segundos

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
            // Agregar contenido al visor del resultado de cuanto debe devolver
            Spc.speech(valReturn[1]);
            containerReturnMoney.innerHTML = valReturn[0] === 0 || !valReturn[0] ? `DEVOLVER` : `Devolver: $${inp} pesos`;
        } catch (e) {
            // console.error('Error en showReturnMoney() => ' + e)
        }
    }

    /**
     * Calcular valor a devolver
     * @returns
     */
    static #calcReturnMoney() {
        try {
            let msg = '';
            const inpReturn = document.querySelector('#money');
            const totalReturn = inpReturn - DataManager.#result;
            if (totalReturn < 0) {
                msg = `Le hace falta ${totalReturn * -1} pesos. No alcanza para comprar.`;
            } else {
                msg = `Devuelva ${totalReturn} pesos.`;
            }

            return [totalReturn, msg];
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
