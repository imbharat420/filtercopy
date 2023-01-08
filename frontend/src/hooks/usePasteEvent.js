import { useEffect, useMemo, useCallback } from 'react';

function usePasteEvent(callback) {
  const handlePaste = useCallback(
    (event) => {
      event.preventDefault();
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      console.log(JSON.stringify(items));

      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent.clipboardData;

      if (clipboardData.files.length > 0) {
        const input = document.createElement('input');
        input.type = 'file';
        input.files = clipboardData.files;
        if (clipboardData.files[0].type.startsWith('image/')) {
          callback(clipboardData.files[0]);
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
      controller.abort();
    };
  }, [handlePaste]);
}

export default usePasteEvent;
