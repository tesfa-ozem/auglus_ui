import { useState } from 'react';

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        if (keyName == 'accessToken' || keyName == 'refreshToken') return value;
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: any) => {
    try {
      if (keyName == 'accessToken' || keyName == 'refreshToken') {
        window.localStorage.setItem(keyName, newValue);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      }
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
