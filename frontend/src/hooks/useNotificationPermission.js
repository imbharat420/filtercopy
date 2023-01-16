const useNotificationPermission = () => {
  const [permission, setPermission] = useState(
    () => window.Notification && Notification.permission
  );

  const handleEvent = useCallback(() => {
    if (!window.Notification) return;
    Notification.requestPermission((data) => setPermission(data));
  }, []);

  useEffect(() => {
    if (permission === undefined || permission === 'granted') return;

    document.addEventListener('pointerdown', handleEvent);
    document.addEventListener('keydown', handleEvent);

    return () => {
      document.removeEventListener('pointerdown', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    };
  }, [permission]);
};

export default useNotificationPermission;
