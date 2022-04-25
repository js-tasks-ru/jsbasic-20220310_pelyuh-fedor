import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbon = this.addElem();
  }


  addArrowButtons(continer) {
    const prevButton = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    const nextButton = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);


    continer.insertAdjacentElement('afterbegin', prevButton);
    continer.insertAdjacentElement('beforeend', nextButton);
  }

  addMenuItems(inner) {
    this.categories.forEach((item) => {
      const menuItem = createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `);
      inner.insertAdjacentElement('beforeend', menuItem);
      menuItem.addEventListener('click', function () {
        inner.querySelectorAll('.ribbon__item').forEach(item=>item.classList.remove('ribbon__item__active'));
        menuItem.classList.add('ribbon__item__active');
        menuItem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: item.id,
          bubbles: true
        }));
      });
    });

  }


  initScroll(inner, menu) {
    const scrollLeft = inner.scrollLeft;
    const scrollWidth = inner.scrollWidth;
    const clientWidth = inner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const prevButton = menu.querySelector('.ribbon__arrow_left');
    const nextButton = menu.querySelector('.ribbon__arrow_right');

    function next() {
      inner.scrollBy(350, 0);
      prevButton.classList.add('ribbon__arrow_visible');
      if (!scrollRight) {
        nextButton.classList.remove('ribbon__arrow_visible');
      } else {
        nextButton.classList.add('ribbon__arrow_visible');
      }

    }

    function prev() {
      inner.scrollBy(-350, 0);
      nextButton.classList.add('ribbon__arrow_visible');
      if (scrollRight < 1) {
        prevButton.classList.remove('ribbon__arrow_visible');
      } else {
        prevButton.classList.add('ribbon__arrow_visible');
      }
    }

    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);

  }


  addElem() {
    if (!this.ribbon) {
      const menu = createElement(`
        <div class="ribbon"></div>
      `);

      const inner = createElement(`
        <nav class="ribbon__inner"></nav>
      `);

      this.addMenuItems(inner);

      menu.insertAdjacentElement('beforeend', inner);

      this.addArrowButtons(menu);

      this.initScroll(inner, menu);

      return menu;
    }
  }

  get elem() {
    return this.ribbon;
  }
}
