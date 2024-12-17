import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [result, setResult] = useState<T>();
  const timer = useRef<NodeJS.Timeout>();

  const updateResult = (newValue: T) =>
    setTimeout(() => {
      setResult(newValue);
      timer.current = undefined;
    }, delay);

  const resetOnUpdate = (newValue: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = updateResult(newValue);
  };

  useEffect(() => {
    if (result === undefined) setResult(value);
    else resetOnUpdate(value);
  }, [value]);

  return value;
}
