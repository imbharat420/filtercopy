function useFullScreen(ref) {
  function handleClick() {
    if (ref.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        ref.current.requestFullscreen();
      }
    }
  }

  return handleClick;
}

export default useFullScreen;
