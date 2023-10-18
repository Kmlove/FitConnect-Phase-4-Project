import React, { useState, useEffect } from 'react';
import Main from "./components/Main"
import LoginSignup from './components/LoginSignup';
function App() {

  const [user, setUser] = useState('')

  // useEffect(() => {
  //   fetch('/posts')
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data))
  //     .catch((error) => console.error('Error fetching posts:', error));
  // }, []);

  function userToDisplay(user) {
    setUser(user)
  }


  return(
    <div>
      {user.username ? <Main user={user} /> : <LoginSignup userToDisplay={userToDisplay}/>}
    </div>
  )
}

export default App;
