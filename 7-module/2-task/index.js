import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalBody = this.addModalBody();
  }

  addModalBody() {
    if (!this.modalBody) {
      return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
    }
  }

  setTitle(title) {
    if (this.modalBody) {
      const modalTitle = this.modalBody.querySelector('.modal__title');

      modalTitle.textContent = title;
    }
  }

  setBody(body) {
    const modalBody = this.modalBody.querySelector('.modal__body');
    modalBody.insertAdjacentElement('beforeend', body);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.insertAdjacentElement('beforeend', this.modalBody);

    const closeButton = this.modalBody.querySelector('.modal__close');

    const keyEvent = (event) => {
      if (event.code === 'Escape') {
        this.close();
        window.removeEventListener('keydown', keyEvent);
      }
    };

    closeButton.onclick = () => {
      this.close();
    };
    window.addEventListener('keydown', keyEvent);
  }

  close() {
    const documentBody = document.body;

    documentBody.classList.remove('is-modal-open');
    if (this.modalBody) {
      this.modalBody.remove();
    }
  }

}
