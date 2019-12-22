import '~/js/modules/common';
import getSwiperSlider from '~/js/modules/slider';
import notificate from '~/js/modules/notificate';

document.addEventListener(`DOMContentLoaded`, () => {
  const mainSlider = document.querySelector(`.main-slider__slider`);

  const interleaveOffset = 0.5;
  const mainSliderSwiperParams = {
    speed: 1000,
    slidesPerView: 1,
    loop: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 5000,
      waitForTransition: false,
      disableOnInteraction: false,
    },
    pagination: {
      el: `.main-slider__dots`,
      type: `bullets`,
      bulletClass: `main-slider__dot`,
      bulletActiveClass: `active`,
    },
    on: {
      progress() {
        for (let i = 0; i < this.slides.length; i++) {
          const slideProgress = this.slides[i].progress;
          const innerOffset = this.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;
          this.slides[i].querySelector(`.main-slider__image`).style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
        }
      },
      touchStart() {
        this.autoplay.stop();
        for (let i = 0; i < this.slides.length; i++) {
          this.slides[i].style.transition = ``;
        }
      },
      touchEnd() {
        this.autoplay.start();
      },
      setTransition(speed) {
        for (let i = 0; i < this.slides.length; i++) {
          this.slides[i].style.transition = `${speed}ms`;
          this.slides[i].querySelector(`.main-slider__image`).style.transition = `${speed}ms`;
        }
      }
    }
  };

  if (mainSlider) {
    const mainSwiper = getSwiperSlider(mainSlider, mainSliderSwiperParams);

    mainSlider.addEventListener(`mouseenter`, () => {
      mainSwiper.autoplay.stop();
    });

    mainSlider.addEventListener(`mouseleave`, () => {
      mainSwiper.autoplay.start();
    });
  }

  const subscriptionSubmitBtn = document.querySelector(`.subscription__submit`);

  if (subscriptionSubmitBtn) {
    subscriptionSubmitBtn.addEventListener(`click`, (e) => {
      const form = document.querySelector(`.subscription__form`);

      if (form) {
        if (form.reportValidity()) {
          e.preventDefault();
          e.target.disabled = true;

          setTimeout(() => {
            notificate();
            form.reset();
            e.target.disabled = false;
          }, 1000);
        }
      }
    });
  }
});
