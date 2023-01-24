import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;

// function useDebounce(value, delay) {
//   const [debounceValue, setDebounceValue] = useState(value);
//   let handler = null;
//   let setHandler = () => {
//     handler = setTimeout(() => {
//       setDebounceValue(value);
//     }, delay);
//   };
//   useEffect(() => {
//     console.log(value);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return [debounceValue, setHandler];
// }
// export default useDebounce;
