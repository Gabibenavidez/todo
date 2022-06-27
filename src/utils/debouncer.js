/* eslint-disable */
import { useCallback } from 'react';

const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export const debouncer = (handleChange) => {
  return useCallback(debounce(handleChange), []);
};
