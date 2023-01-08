import { useRef, useEffect } from 'react';

function usePreventDefault(events) {
  const elementRef = useRef(null);
  useEffect(() => {
    function handleEvent(event) {
      event.preventDefault();
      console.log(`The default ${event.type} behavior was prevented.`);
    }
    const element = elementRef.current;
    if (element) {
      events.forEach((event) => {
        element.addEventListener(event, handleEvent);
      });
      return () => {
        events.forEach((event) => {
          element.removeEventListener(event, handleEvent);
        });
      };
    }
  }, [events]);
  return elementRef;
}

export default usePreventDefault;
