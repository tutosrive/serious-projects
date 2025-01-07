export default class Languages {
  // En próximas versiones tendrá constructor que reciba código de país (Para cargar lenguaje)

  static init() {
    Languages.#addContentToPage();
  }

  static async #addContentToPage() {
    try {
      const data = await Helpers.fetchJSON('./resources/lang/es.json');

      const selectors = ['#titleMain', '#whats', '#featuresTitle', '#features'];
      let ids = ['titleMain', 'whats', 'featuresTitle', 'features'];
      let nodes = document.querySelectorAll(selectors);
      let cont = 0;
      nodes[0].innerHTML = data.titleMain;
      nodes[1].innerHTML = data.whats;
      nodes[2].innerHTML = data.featuresTitle;
      nodes[3].innerHTML = data.features;
    } catch (e) {
      Toast.show({ message: 'Error en la solicitud', error: e, mode: 'danger' });
    }
  }
}
