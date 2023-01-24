import { useRef, useEffect, useState } from 'react';

function useDebounce(fn, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, arguments), delay);
  };
}

function useZoom(initialFactor, elementRef) {
  const [factor, setFactor] = useState(initialFactor);
  // const debouncedSetFactor = useDebounce(setFactor, 20);
  useEffect(() => {
    const element = elementRef.current;
    if (factor < 0.1) return;
    element.style.transform = `scale(${factor})`;
  }, [factor]);
  useEffect(() => {
    const element = elementRef.current;
    function handleWheel(event) {
      event.preventDefault();
      // debouncedSetFactor(factor + event.deltaY * -0.001);
      setFactor(factor + event.deltaY * -0.001);
    }

    function handlePinch(event) {
      event.preventDefault();
      // debouncedSetFactor(factor + event.scale * -0.001);
      setFactor(factor + event.deltaY * -0.001);
    }
    element.addEventListener('wheel', handleWheel); //{ passive: true }
    element.addEventListener('pinch', handlePinch);
    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('pinch', handlePinch);
    };
  }, [factor]);
  return factor;
}
export default useZoom;
