import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/LoginCreate'
import Dashboard from './pages/Dashboard'
import { Navigate } from 'react-router-dom';
import StoredSets from './pages/StoredSets';
import AddSets from './pages/AddSets';
import Navigation from './components/Navigation';
import { useState } from 'react';
import { set } from 'mongoose';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const setAuthenticated = () => {
    setIsAuthenticated(true)
  }  
  const logOut = () => {
    setIsAuthenticated(false)
  }

  return (

    <>
      <div className=" flex flex-row-2">   
        <Router>
          {isAuthenticated ? <Navigation onLogout={logOut}/> : null}
            <Routes>
              <Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />
              <Route path="/Login" element={<Login onLogin={setAuthenticated}/>} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/StoredSets" element={<StoredSets />} />
              <Route path="/addSets" element={<AddSets />} />
            </Routes>
              
          </Router>
      </div>
    </>
  );
}


export default App;