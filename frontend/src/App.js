import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/LoginCreate'
import Dashboard from './pages/Dashboard'
import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <div className="bg-gray-200 flex flex-row-2">
        <Router>
          <Navigation />
            <Routes>
              <Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
              
          </Router>
      </div>
    </>
  );
}


export default App;