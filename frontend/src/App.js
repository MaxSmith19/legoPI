import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/LoginCreate'
import Dashboard from './pages/Dashboard'
import { Navigate } from 'react-router-dom';
import StoredSets from './pages/StoredSets';
import AddSets from './pages/AddSets';
import Navigation from './components/Navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { BarLoader } from 'react-spinners';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const unpackCookie = () => {
    const authCookie = Cookies.get("token")
    if (authCookie !== undefined) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    unpackCookie();
  }, []);

  const logOut = () => {
    setIsAuthenticated(false)
  }

  const handleIsLoading = (value) => {
    setLoading(value);
  };
  

  return (

    <>
    <BarLoader 
            width={2000}
            loading={isLoading}
            
          />
      <div className=" flex flex-row-2">   

        <Router >
          {isAuthenticated ? <Navigation onLogout={logOut} /> : null}
            
            <Routes>
              <Route path="/" exact element={<Navigate replace to="/Login"></Navigate>} />
              <Route path="/Login" element={<Login handleIsLoading={handleIsLoading} onLogin={setIsAuthenticated}/>} />
              <Route path="/Dashboard" element={<Dashboard handleIsLoading={handleIsLoading} />} />
              <Route path="/StoredSets" element={<StoredSets handleIsLoading={handleIsLoading} />} />
              <Route path="/addSets" element={<AddSets handleIsLoading={handleIsLoading} />} />
            </Routes>
              
          </Router>

      </div>
    </>
  );
}


export default App;