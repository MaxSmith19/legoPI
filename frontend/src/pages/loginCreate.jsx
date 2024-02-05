import React, { useEffect, useState } from 'react'
import axios from "axios"
import * as qs from 'qs'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  
  useEffect(() => {
    onLoad();
  })

  const onLoad = () =>{
    if(Cookies.get("token")!==undefined){
      navigate("/Dashboard")
    }
  }
  const onSubmitLogin = (e) => {
    e.preventDefault();
    let data = qs.stringify({
    'email': email,
    'password': password 
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5050/User/Login',
      headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      const userToken = response.data.token
      document.cookie = "token=" + userToken +"; SameSite=None; Secure";
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
      props.onLogin(true);
      navigate("/Dashboard")
    })
    .catch((error) => {
    console.log(error);
    });

  }

  const onSubmitRegistration = (e) => {
    e.preventDefault();
    let data = qs.stringify({
    'email': email,
    'password': password 
    });
    console.log(data)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5050/User',
      headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });

  }

  const toggleTab = (tab) => {
    setActiveTab(tab);
    setPassword("")
    setEmail("")
    setConfirmPassword("")
  }

  const loginActive = activeTab === 'login';
  //true if the activetab is login
  const registerActive = activeTab === 'register';
  //true if the activetab is register

  return (
    <div className="w-full">
    <div className="flex justify-center align-center">
      <div className="max-w-lg mt-12 form-width form-length">
        <div className="flex justify-start">
          <div onClick={() => toggleTab('login')} className={`bg-white border px-6 py-3 cursor-pointer rounded-t-lg ${loginActive ? 'bg-white border text-black ' : 'text-gray-700 mt-3 '}`}>Login</div>
          <div onClick={() => toggleTab('register')} className={`bg-white border px-6 py-3 cursor-pointer rounded-t-lg  ${registerActive ? 'bg-white text-black ' : 'text-gray-700 mt-3 '}`}>Register</div>
        </div>

        {loginActive && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full p-20" onSubmit={onSubmitLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                Email address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e) => setEmail(e.target.value)} value={email} required/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input id="pword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
            </div>
            <div>
              <h1 className="mb-5"><a className="text-blue-600" to="/changePassword" onClick={()=>toggleTab('password')()}>Forgot your password?</a></h1>
            </div>
            <div>
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmitLogin}>Log in</button>
            </div>
          </form>
          
        )}

        {registerActive && (
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitRegistration} autoComplete="off">
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Email address
            </label>
            <input id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" onChange={(e)=> setEmail(e.target.value)} value={email}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Password
            </label>
            <input id="pword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xl font-bold mb-2" for="password">
              Confirm password
            </label>
            <input id="cPword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" type="password" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}/>
          </div>
          <div>
            <h1 className="mb-5">{errorMessage}</h1>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded " type="submit" onClick={onSubmitRegistration}>
              Submit
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
    </div>
  );
}

export default Login;