import react, { Suspense, useContext, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { updateSocket, socket } from './socket';
import { UserContext } from './state/UserStore';

import RequiredAuth from './utils/RequiredAuth';

import { loadUser } from './action/AuthAction';
import Loading from './components/Loading';
import useTitle from './hooks/useTitle';

import Design from './screens/editor/Design';
import CreateDesign from './screens/editor/CreateDesign';

const Home = react.lazy(() => import('./screens/Home'));
const About = react.lazy(() => import('./screens/About'));
const Contact = react.lazy(() => import('./screens/Contact'));
const NotFound = react.lazy(() => import('./screens/NotFound'));
const Login = react.lazy(() => import('./screens/auth/Login'));
const Register = react.lazy(() => import('./screens/auth/Register'));

function App() {
  const { state, dispatch } = useContext(UserContext);
  useTitle('FilterCopy', '😭 Come Back');
  useEffect(() => {
    if (socket) return;
    updateSocket();
  }, [socket]);

  useEffect(() => {
    localStorage.token && loadUser(dispatch);
    const storageListener = () => {
      localStorage.token && dispatch({ type: 'LOGOUT' });
    };

    window.addEventListener('storage', storageListener);
    return () => window.removeEventListener('storage', storageListener);
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        {/* {socket && <Pointer />} */}

        <Router>
          <Routes>
            {/* // !Auth ROUTE  */}
            {!!state.token === false ? (
              <>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
              </>
            ) : (
              <>
                <Route path={'/login'} element={<Navigate to={`/`} />} />
                <Route path={'/register'} element={<Navigate to={`/`} />} />
              </>
            )}

            {/* // !Private ROUTE  */}
            <Route element={<RequiredAuth />}>
              <Route path={`/create`} element={<CreateDesign />} exact />
              <Route path={`/design/:id`} element={<Design />} exact />
            </Route>

            {/* // !PUBLIC ROUTE  */}
            <Route path={`/`} element={<Home />} exact />
            <Route path={`/profile/:username`} element={<Home />} exact />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* // !REDIRECT ROUTE  */}
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

/*
import Pointer from './components/Pointer.js';

  const ref = useRef(null);
ref={ref} onMouseMove={handleMouseMove}

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
*/
