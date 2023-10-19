import React, { useState, useEffect } from 'react';
import Main from "./components/Main"
import LoginSignup from './components/LoginSignup';
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
  
  const [user, setUser] = useState('')

  useEffect(() => {
    fetch('/auto_login')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  function userToDisplay(user) {
    setUser(user)
  }

  return(
    <div className='App'>
      <Routes>
        <Route path='/login-signup' element={<LoginSignup userToDisplay={setUser}/>}/>
        <Route path='/home' element={<Main user={user} setUser={setUser} />}/>
      </Routes>
      {/* <Navigate to="/" replace /> */}

      {/* {user && user.username ? <Main user={user} setUser={setUser} /> : <LoginSignup userToDisplay={setUser}/>} */}
    </div>
  )
}

export default App;
