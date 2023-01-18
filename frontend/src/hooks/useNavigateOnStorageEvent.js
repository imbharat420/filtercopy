// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function useNavigateOnStorageEvent(route, condition) {
//   const navigate = useLocation();

//   useEffect(() => {
//     window.addEventListener('storage', () => {
//       if (condition) navigate(route);
//     });
//     return () => {
//       window.removeEventListener('storage', () => {
//         if (condition) navigate(route);
//       });
//     };
//   }, [navigate, route, condition]);
// }

// export default useNavigateOnStorageEvent;
