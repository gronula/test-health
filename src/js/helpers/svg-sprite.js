export default () => {
  require.context(`~/assets/sprite/`, true, /i-.*\.svg$/i).keys().forEach((it) => it);
};
