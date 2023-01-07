import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Wrapper } from './Layout';
import Editor from './Screens/Edior';
function App() {
  return (
    <Wrapper className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Editor/>}/>
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
