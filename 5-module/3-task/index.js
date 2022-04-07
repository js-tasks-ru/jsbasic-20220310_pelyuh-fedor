function initCarousel() {
  const nextSlideButton = document.querySelector('.carousel__arrow_right');
  const prevSlideButton = document.querySelector('.carousel__arrow_left');
  const carouselContainer = document.querySelector('.carousel__inner');
  const carouselSlides = document.querySelectorAll('.carousel__slide');
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
      carouselContainer.style.transform = `translateX(-${slidesWidth[currentSlide + 1].translate}px)`;
      currentSlide++;
      if (currentSlide === lastSlide) {
        nextSlideButton.style.display = 'none';
      }
    }
    if (direction === 'prev') {
      currentSlide--;
      nextSlideButton.style.display = 'flex';
      carouselContainer.style.transform = `translateX(-${slidesWidth[currentSlide].translate}px)`;
      if (currentSlide === 0) {
        prevSlideButton.style.display = 'none';
      }
    }
    if (direction === 'current') {
      carouselContainer.style.transform = `translateX(-${slidesWidth[currentSlide].translate}px)`;
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
