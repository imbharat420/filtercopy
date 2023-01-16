import react, { Suspense, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { StoreProvider } from './state/store.js';

import { updateSocket, socket } from './socket';
import Pointer from './components/Pointer.js';

const Home = react.lazy(() => import('./screens/Home'));
const About = react.lazy(() => import('./screens/About'));
const Contact = react.lazy(() => import('./screens/Contact'));
const NotFound = react.lazy(() => import('./screens/NotFound'));

// Store

function App() {
  const ref = useRef(null);
  useEffect(() => {
    if (socket) return;
    updateSocket();
  }, []);

  let timeoutId;
  const handleMouseMove = (e) => {
    // if (!socket) return;
    const { clientWidth, clientHeight } = ref.current;
    const x = e.clientX / clientWidth;
    const y = e.clientY / clientHeight;
    // Clear existing timeout before setting a new one
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a new timeout before emitting the mousemove event
    timeoutId = setTimeout(() => {
      // socket.emit('mousemove', { x, y });
      timeoutId = null;
    }, 20);
  };

  return (
    <div className="App" ref={ref} onMouseMove={handleMouseMove}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {socket && <Pointer />} */}
        <StoreProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Router>
        </StoreProvider>
      </Suspense>
    </div>
  );
}

export default App;
