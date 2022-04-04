function initCarousel() {
  const nextSlideButton = document.querySelector('.carousel__arrow_right');
  const prevSlideButton = document.querySelector('.carousel__arrow_left');
  const carouselContainer = document.querySelector('.carousel__inner');
  const carouselSlides = document.querySelectorAll('.carousel__slide');
  let currentSlide = 0;

  function slideToggle (direction) {
    let slidesWidth = [];
    const lastSlide = carouselSlides.length - 1;

    for (let i = 0; i < carouselSlides.length; i++) {
      let width = slidesWidth[i - 1] ? slidesWidth[i - 1].translate + carouselSlides[i].offsetWidth : 0;
      slidesWidth[i] = {translate: width};
    }

    if (direction === 'next') {
      if (currentSlide === lastSlide) {
        carouselContainer.style.transform = `translate(0px)`;
        currentSlide = 0;
      } else {
        carouselContainer.style.transform = `translate(-${slidesWidth[currentSlide + 1].translate}px)`;
        currentSlide++;
      }
    }
    if (direction === 'prev') {
      if (currentSlide === 0) {
        carouselContainer.style.transform = `translate(-${slidesWidth[lastSlide].translate}px)`;
        currentSlide = lastSlide;
      } else {
        currentSlide--;
        carouselContainer.style.transform = `translate(-${slidesWidth[currentSlide].translate}px)`;

      }
    }
    if (direction === 'current') {
      carouselContainer.style.transform = `translate(-${slidesWidth[currentSlide].translate}px)`;
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
