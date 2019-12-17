export const setObjectToLocalStorage = (keyname, obj) => {
  window.localStorage.setItem(keyname, JSON.stringify(obj));
};

export const getObjectFromLocalStorage = keyname => {
  return JSON.parse(window.localStorage.getItem(keyname));
};
