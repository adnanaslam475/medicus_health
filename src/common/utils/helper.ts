import { useEffect, useState } from "react";

export function parseJson(jsonString: string) {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (error) {
    obj = null;
  }
  return obj;
}

export function hasValidMessage(text: string) {
  var format = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function useDebounce(value: string, wait = 200) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, wait]);
  return debounceValue;
}
