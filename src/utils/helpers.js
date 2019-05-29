export const checkIsMobile = () => {
  if (typeof document !== `undefined`) {
    return 'ontouchstart' in document.documentElement === true;
  }
  return false;
};
