export default class DomManager {
  static createButton(
    id = `btn${Helpers.idRandom()}`,
    txt = 'Click Me',
    dimensions = ['40px', '40px'],
    func = () => {
      console.log('Clicked');
    }
  ) {
    // Si el botón existe no se volverá a generar
    if (document.querySelector('.btn-generated')) {
      return;
    }

    const btn = document.createElement('button');
    btn.id = id;
    btn.style = `width: ${dimensions[0]}; height: ${dimensions[1]}`;
    btn.innerHTML = txt;
    btn.addEventListener('click', DomManager.func);
    btn.classList.add('btn', 'btn-outline-info', 'btn-generated');
    document.querySelector('main').insertAdjacentElement('beforebegin', btn);
  }
}
