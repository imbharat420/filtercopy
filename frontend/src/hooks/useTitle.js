import { useEffect } from 'react';

function useTitle(comeTitle, leaveTitle) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        document.title = leaveTitle;
      } else {
        document.title = comeTitle;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [comeTitle, leaveTitle]);
}

export default useTitle;
