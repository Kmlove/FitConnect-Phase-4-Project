import React, { useState, useEffect } from 'react';
import Main from "./components/Main"
import Login from './components/Login';
import Signup from './components/Signup';
import {Route, Routes} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function CustomComponent(){
  return (
    <div id="custom-toast">
      <p>Demo Account Login Info:</p>
      <p><strong>Username:</strong> kimlove</p>
      <p><strong>Password:</strong> Password1</p>
      <p>*username and password case sensitive</p>
    </div>
  )
}

function App() {
  
  const [user, setUser] = useState('')
  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    fetch('/auto_login')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching posts:', error));

    // Display toast only if it has not been displayed yet
    if (!toastDisplayed) {
      loginDetails();
      setToastDisplayed(true);
    }
  }, [toastDisplayed]);

  function loginDetails() {
    toast.info(<CustomComponent />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false
    })
}


  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login userToDisplay={setUser}/>}/>
        <Route path='/signup' element={<Signup userToDisplay={setUser}/>}/>
        <Route path='/home' element={<Main user={user} setUser={setUser} />}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;
