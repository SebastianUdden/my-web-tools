export const checkIsMobile = () => {
  if (typeof document !== `undefined`) {
    return 'ontouchstart' in document.documentElement === true;
  }
  return false;
};

export const prepend = (value, array) => {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
};

export const pad = (num, size) => {
  var s = '000000000' + num;
  return s.substr(s.length - size);
};

export const formatDateTime = (dt, hideTime) => {
  const dateTime = new Date(dt);
  const date = dateTime.toLocaleDateString();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  return `${date}${hideTime ? '' : `, ${pad(hour, 2)}:${pad(minute, 2)}`}`;
};
