"use client";

import { useEffect, useState } from "react";

export function useDebounceValue<T>(value: T, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
}
