import { useState } from "react";

function LoginSignup({userToDisplay}) {

    const [login, setLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [signupForm, setSignupForm] = useState({
        username: '',
        password: '',
        age: ''
    })

    function handleLoginChange(e) {
        const name = e.target.name
        const value = e.target.value
        console.log(loginForm)
        setLoginForm({
            ...loginForm, 
            [name]: value
        })
    }

    function handleSignupChange(e) {
        const name = e.target.name
        const value = e.target.value
        console.log(signupForm)
        setSignupForm({
            ...signupForm, 
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

    function handleSignupSubmit(e) {
        e.preventDefault()
        console.log(signupForm)
        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupForm)
        })
        .then((res) => res.json())
        .then((data) => userToDisplay(data))
        .catch((error) => console.error('User Data Not Found', error));
    }

    function toggleLogin() {
        setLogin(!login)
    }
    
  

    const loginDiv = <div className="login-form-container">
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <input type="text" autocomplete='off' placeholder="Username" onChange={handleLoginChange} name='username' value ={loginForm.username}  />
                            <input type="password" autocomplete='off' placeholder="Password" onChange={handleLoginChange} name='password' value={loginForm.password} />
                            <button className="login-signup-submit">Log In</button>
                        </form>
                        {login ? <div className="login-signup-toggle" onClick={toggleLogin}>Signup</div> : <div className="login-signup-toggle" onClick={toggleLogin}>Login</div>}
                    </div>

    const signupDiv = <div className="signup-form-container">
                        <form className="signup-form" onSubmit={handleSignupSubmit}>
                            <input type="text" autocomplete='off' placeholder="Username" onChange={handleSignupChange} name='username' value ={signupForm.username}  />
                            <input type="password" autocomplete='off' placeholder="Password" onChange={handleSignupChange} name='password' value={signupForm.password} />
                            <input type="text" autocomplete='off' placeholder="Age 16+" onChange={handleSignupChange}  name='age' value={signupForm.age} />
                            <button className="login-signup-submit">Sign Up</button>
                        </form>
                        {login ? <div className="login-signup-toggle" onClick={toggleLogin}>Signup</div> : <div className="login-signup-toggle" onClick={toggleLogin}>Login</div>}
                    </div>
  
  
    return(
      <div className="login-signup-page">
        <div className="greeting-div">
            <h1 className="greeting"><span className="fit">Fit</span><span className="connect">Connect</span></h1>
            <h3 className="sub-greeting">Remember, every small step leads to a big change. Let's embark on this journey together and make fitness a part of your lifestyle.</h3>
        </div>
        {login ? loginDiv : signupDiv}
      </div>
    )
  }
  
  export default LoginSignup;