import { useState } from "react";

function LoginSignup({userToDisplay}) {

    const [login, setLogin] = useState(false)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        console.log(loginForm)
        setLoginForm({
            ...loginForm, 
            [name]: value
        })
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        console.log(loginForm)
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginForm)
        })
        .then((res) => res.json())
        .then((data) => userToDisplay(data))
        .catch((error) => console.error('User Data Not Found', error));
    }
  

    const loginDiv = <div>
                        <form onSubmit={handleLoginSubmit}>
                            <input type="text" placeholder="Username" onChange={handleChange} name='username' value ={loginForm.username}  />
                            <input type="password" placeholder="Password" onChange={handleChange} name='password' value={loginForm.password} />
                            <button>Sign In</button>
                        </form>
                    </div>
  
  
    return(
      <div>
        {loginDiv}
      </div>
    )
  }
  
  export default LoginSignup;