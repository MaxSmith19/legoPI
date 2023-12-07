import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/loginCreate'
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function App() {
  return (
    <>
      <div className="bg-blue-500">
        <Router>

            <Routes>
              <Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />
              <Route path="/Login" element={<Login />} />
            </Routes>
              
          </Router>
      </div>
    </>
  );
}


export default App;