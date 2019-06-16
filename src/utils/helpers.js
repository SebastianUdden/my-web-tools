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
  if (!dt) return '--/--/----';
  const dateTime = new Date(dt);
  const date = dateTime.toLocaleDateString();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  return `${date}${hideTime ? '' : ` - ${pad(hour, 2)}:${pad(minute, 2)}`}`;
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
