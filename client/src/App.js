import React, { useState, useEffect } from 'react';
import Main from "./components/Main"
import Login from './components/Login';
import Signup from './components/Signup';
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
  
  const [user, setUser] = useState('')

  useEffect(() => {
    fetch('/auto_login')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);
  
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login userToDisplay={setUser}/>}/>
        <Route path='/signup' element={<Signup userToDisplay={setUser}/>}/>
        <Route path='/home' element={<Main user={user} setUser={setUser} />}/>
      </Routes>
    </div>
  )
}

export default App;
