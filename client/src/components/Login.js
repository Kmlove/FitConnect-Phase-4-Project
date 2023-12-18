import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login({userToDisplay}) {
    const initialValue = {
        username: '',
        password: ''
    }
    const navigate = useNavigate()
    const [loginFound, setLoginFound] = useState(true)
    const [loginForm, setLoginForm] = useState(initialValue)

    function handleLoginChange(e) {
        const name = e.target.name
        const value = e.target.value
        setLoginForm({
            ...loginForm, 
            [name]: value
        })
    }

    function handleHideToast(){
        const toast = document.querySelector('.Toastify__toast-container div[id="1"]')
        if(toast){
            toast.style.display = 'none'
        }
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginForm)
        })
        .then((res) => {
            if (res.status === 201){
                return res.json()
            } else if (res.status === 400){
                setLoginFound(false)
                console.error('User Data Not Found')
                setLoginForm(initialValue)
                return Promise.reject('User Data Not Found')
            }
        })
        .then((data) => {
            userToDisplay(data)
            handleHideToast()
            navigate('/home')            
        })
        .catch((error) => console.error('User Data Not Found', error));
    }

    const warningStyles = {
        color: "red",
        marginBottom: "10px"
    }

    const loginDiv = <div className="login-form-container">
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <input type="text" autocomplete='off' placeholder="Username" onChange={handleLoginChange} name='username' value ={loginForm.username}  />
                            <input type="password" autocomplete='off' placeholder="Password" onChange={handleLoginChange} name='password' value={loginForm.password} />
                            {loginFound ? null : <p style={warningStyles}>Username/password not found, please try again!</p>}
                            <button className="login-signup-submit">Log In</button>
                        </form>
                        <div className="login-signup-toggle" onClick={()=> {navigate('/signup')}}>Signup</div>
                    </div>
  
    return(
      <div className="login-signup-page">
        <div className="greeting-div">
            <h1 className="greeting"><span className="fit">Fit</span><span className="connect">Connect</span></h1>
            <h3 className="sub-greeting">Remember, every small step leads to a big change. Let's embark on this journey together and make fitness a part of your lifestyle.</h3>
        </div>
        {loginDiv}
      </div>
    )
  }
  
  export default Login;