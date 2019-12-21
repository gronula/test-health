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
};

window.addEventListener(`DOMContentLoaded`, setCssProperties);
window.addEventListener(`resize`, setCssProperties);
