import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';

// Store
import { StoreProvider } from './state/store.js';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
