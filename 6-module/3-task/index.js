import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.carousel = this.addCarousel();
  }

  addPlusButtonEvent(slideItem, slideInfo) {
    const button = slideItem.querySelector('.carousel__button');

    button.addEventListener('click', () => {
      button.dispatchEvent(new CustomEvent('product-add', {
        detail: slideInfo.id,
        bubbles: true
      }));
    });
  }

  addSlides(inner) {
    this.slides.forEach((slide) => {
      const slideItem = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `);
      this.addPlusButtonEvent(slideItem, slide);
      inner.insertAdjacentElement('beforeend', slideItem);
    });
  }

  addArrow(container) {
    const nextSlideButton = createElement(`
            <div class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </div>`);
    const prevSlideButton = createElement(`
            <div class="carousel__arrow carousel__arrow_left">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </div>
    `);
    container.insertAdjacentElement('afterbegin', nextSlideButton);
    container.insertAdjacentElement('afterbegin', prevSlideButton);
  }
  initArrowEvent(carouselContainer) {
    const nextSlideButton = carouselContainer.querySelector('.carousel__arrow_right');
    const prevSlideButton = carouselContainer.querySelector('.carousel__arrow_left');
    const carouselInner = carouselContainer.querySelector('.carousel__inner');
    const carouselSlides = carouselContainer.querySelectorAll('.carousel__slide');

    let currentSlide = 0;
    const lastSlide = carouselSlides.length - 1;

    if (currentSlide === 0) {
      prevSlideButton.style.display = 'none';
    } else if (currentSlide === lastSlide) {
      nextSlideButton.style.display = 'none';
    }

    function slideToggle (direction) {
      let slidesWidth = [];

      for (let i = 0; i < carouselSlides.length; i++) {
        let width = slidesWidth[i - 1] ? slidesWidth[i - 1].translate + carouselSlides[i].offsetWidth : 0;
        slidesWidth[i] = {translate: width};
      }
      if (direction === 'next') {
        prevSlideButton.style.display = 'flex';
        carouselInner.style.transform = `translateX(-${slidesWidth[currentSlide + 1].translate}px)`;
        currentSlide++;
        if (currentSlide === lastSlide) {
          nextSlideButton.style.display = 'none';
        }
      }
      if (direction === 'prev') {
        currentSlide--;
        nextSlideButton.style.display = 'flex';
        carouselInner.style.transform = `translateX(-${slidesWidth[currentSlide].translate}px)`;
        if (currentSlide === 0) {
          prevSlideButton.style.display = 'none';
        }
      }
      if (direction === 'current') {
        carouselInner.style.transform = `translateX(-${slidesWidth[currentSlide].translate}px)`;
      }
    }

    nextSlideButton.addEventListener('click', function () {
      slideToggle('next');
    });
    prevSlideButton.addEventListener('click', function () {
      slideToggle('prev');
    });
    window.addEventListener('resize', function () {
      slideToggle('current');
    });
  }

  addCarousel() {
    if (!this.carousel) {
      const carouselContainer = createElement(`
        <div class="carousel"></div>
      `);
      const carouselInner = createElement(`
        <div class="carousel__inner"></div>
      `);

      carouselContainer.insertAdjacentElement('beforeend', carouselInner);

      this.addSlides(carouselInner);

      this.addArrow(carouselContainer);

      this.initArrowEvent(carouselContainer);

      return carouselContainer;
    }
  }



  get elem() {
    return this.carousel;
  }
}
