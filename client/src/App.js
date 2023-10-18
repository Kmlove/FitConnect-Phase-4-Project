import React, { useState } from 'react';
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
      {user && user.username ? <Main user={user} setUser={setUser} /> : <LoginSignup userToDisplay={setUser}/>}
    </div>
  )
}

export default App;
