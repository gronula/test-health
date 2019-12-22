export default (target, duration = 500) => {
  const offset = window.pageYOffset;
  const delta = target - window.pageYOffset; // Y-offset difference
  const start = Date.now(); // get start time
  let factor = 0;
  let timer;

  if (timer) {
    clearInterval(timer); // stop any running animations
  }

  const step = () => {
    factor = (Date.now() - start) / duration; // get interpolation factor

    if (factor >= 1) {
      clearInterval(timer); // stop animation
      factor = 1; // clip to max 1.0
    }

    const y = factor * delta + offset;
    window.scrollBy(0, y - window.pageYOffset);
  };

  timer = setInterval(step, 10);

  return timer;
};
