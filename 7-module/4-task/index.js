import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.addSlider();
    this.currentStep = 0;
  }

  addSteps(slider) {
    const stepsContainer = createElement(`<div class="slider__steps"></div>`);
    for (let i = 0; i < this.steps; i++) {
      const step = createElement(`<span></span>`);
      if (i === 0) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.insertAdjacentElement('beforeend', step);
    }

    slider.insertAdjacentElement('beforeend', stepsContainer);
  }

  addEvents(slider) {
    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    const steps = slider.querySelectorAll('.slider__steps span');
    const sliderValue = slider.querySelector('.slider__value');

    const segments = this.steps - 1;

    function onMouseMove(event) {
      slider.classList.add('slider_dragging');

      const containerWidth = slider.offsetWidth;
      const left = event.clientX - slider.getBoundingClientRect().left;
      const leftShift = (left / containerWidth) * 100;

      let currentStep = Math.round((left / containerWidth) * segments);

      if (currentStep > segments) {
        currentStep = segments;
      } else if (currentStep < 0) {
        currentStep = 0;
      }

      steps.forEach((step)=> {
        step.classList.remove('slider__step-active');
      });
      steps[currentStep].classList.add('slider__step-active');

      if (leftShift <= 0) {
        thumb.style.left = `0`;
        progress.style.width = `0`;
        sliderValue.innerText = 0;
      } else if (leftShift >= 100) {
        thumb.style.left = `100%`;
        progress.style.width = `100%`;
        sliderValue.innerText = segments;
      } else {
        thumb.style.left = `${leftShift}%`;
        progress.style.width = `${leftShift}%`;
        sliderValue.innerText = currentStep;
      }
    }
    thumb.onmousedown = function() {
      document.addEventListener('mousemove', onMouseMove);
    };
    thumb.ondragstart = function() {
      return false;
    };
    document.addEventListener('mouseup', (event) => {
      document.removeEventListener('mousemove', onMouseMove);

      const containerWidth = slider.offsetWidth;
      const leftClick = event.clientX - slider.getBoundingClientRect().left;

      const oneStepSegmentPercentWidth = 100 / segments;

      let currentStep = Math.round((leftClick / containerWidth) * segments);

      const leftPercents = oneStepSegmentPercentWidth * currentStep;

      steps.forEach((step)=> {
        step.classList.remove('slider__step-active');
      });

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.innerText = currentStep;
      this.currentStep = currentStep;

      const valueChange = new CustomEvent('slider-change', {
        detail: this.currentStep,
        bubbles: true
      });

      slider.dispatchEvent(valueChange);

      slider.classList.remove('slider_dragging');
      document.onmouseup = null;
    });

    // slider.addEventListener('click', (event) => {
    //   const steps = slider.querySelectorAll('.slider__steps span');
    //
    //   const containerWidth = slider.offsetWidth;
    //   const leftClick = event.clientX - slider.getBoundingClientRect().left;
    //
    //   const segments = this.steps - 1;
    //   const oneStepSegmentPercentWidth = 100 / segments;
    //
    //   const thumb = slider.querySelector('.slider__thumb');
    //   const progress = slider.querySelector('.slider__progress');
    //   const sliderValue = slider.querySelector('.slider__value');
    //
    //   let currentStep = Math.round((leftClick / containerWidth) * segments);
    //
    //   const leftPercents = oneStepSegmentPercentWidth * currentStep;
    //
    //   steps.forEach((step)=> {
    //     step.classList.remove('slider__step-active');
    //   });
    //
    //   thumb.style.left = `${leftPercents}%`;
    //   progress.style.width = `${leftPercents}%`;
    //
    //   steps[currentStep].classList.add('slider__step-active');
    //   sliderValue.innerText = currentStep;
    //   this.currentStep = currentStep;
    //
    //   const valueChange = new CustomEvent('slider-change', {
    //     detail: this.currentStep,
    //     bubbles: true
    //   });
    //
    //   slider.dispatchEvent(valueChange);
    // });

  }

  addSlider() {
    const slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0"></div>
      </div>
    `);
    this.addSteps(slider);
    this.addEvents(slider);

    return slider;
  }

  get elem() {
    return this.slider;
  }
}
