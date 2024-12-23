export default class Spc {
    static init() {
        app.TextToSpeech('Recuerde escribir bien los números');
    }

    static speech(msg) {
        app.TextToSpeech(msg);
    }
}
