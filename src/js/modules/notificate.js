export default (text = `Спасибо, ваша заявка отправлена!`) => {
  const el = document.createElement(`DIV`);
  el.className = `notification`;

  el.textContent = text;

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 5000);
};
