import getScrollbarWidth from './get-scroll-width';

const setCssProperties = () => {
  // Scrollbar width
  const scrollbarWidth = getScrollbarWidth();
  document.documentElement.style.setProperty(
      `--scrollbar-width`,
      `${scrollbarWidth}px`
  );

  // Viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(
      `--vh`,
      `${vh}px`
  );

  // Header height
  const header = document.querySelector(`.header`);

  if (header) {
    document.documentElement.style.setProperty(
        `--header-height`,
        `${header.getBoundingClientRect().height}px`
    );
  }
};

window.addEventListener(`DOMContentLoaded`, setCssProperties);
window.addEventListener(`resize`, setCssProperties);
