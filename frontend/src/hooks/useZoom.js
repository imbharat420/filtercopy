import { useRef, useEffect, useState } from 'react';

function useZoom(initialFactor, elementRef) {
  const [factor, setFactor] = useState(initialFactor);
  useEffect(() => {
    const element = elementRef.current;
    if (factor < 0.5) return;
    element.style.transform = `scale(${factor})`;
  }, [factor]);
  useEffect(() => {
    const element = elementRef.current;
    function handleWheel(event) {
      event.preventDefault();
      setFactor(factor + event.deltaY * -0.001);
    }
    function handlePinch(event) {
      event.preventDefault();
      setFactor(factor + event.scale * -0.001);
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
