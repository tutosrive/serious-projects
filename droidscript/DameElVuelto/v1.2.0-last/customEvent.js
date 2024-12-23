/**
 * Cuando se presiona un botón (Del "Teclado personalizado").
 * @returns {Event} El evento 'key_click' que se ha disparado.
 */
function ev_click() {
    const event = new Event('key_click');
    document.dispatchEvent(event);
}

// Hacer una variable global
window.ev_key = ev_click;
