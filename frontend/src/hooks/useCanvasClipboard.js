import { useEffect, useRef, useState } from 'react';

function useCanvasClipboard(canvasRef) {
  const canvas = useRef(null);
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    canvas.current = canvasRef.current;
  }, [canvasRef]);
  const download = () => {
    if (canvas.current) {
      const link = document.createElement('a');
      link.download = 'filtercopy.png';
      link.href = canvas.current.toDataURL();
      link.click();
    }
  };

  const copy = async () => {
    if (canvas.current) {
      canvas.current.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 1500);
        } catch (err) {
          setCopied(false);
          console.error('Failed to copy image: ', err);
        }
      });
    }
  };
  return [download, copy, isCopied];
}

export default useCanvasClipboard;
