import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup({userToDisplay}) {
    const initialValue ={
        username: '',
        password: '',
        age: ''
    }
    const navigate = useNavigate()
    const [userExists, setUserExists] = useState(false)
    const [signupForm, setSignupForm] = useState(initialValue)

    function handleSignupChange(e) {
        const name = e.target.name
        const value = e.target.value
        setSignupForm({
            ...signupForm, 
            [name]: value
        })
    }

    function handleSignupSubmit(e) {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupForm)
        })
        .then((res) => {
            if (res.status === 201){
                return res.json()
            } else if (res.status === 400 || res.status === 500){
                setUserExists(true)
                console.error('Username Already Exists')
                setSignupForm(initialValue)
                return Promise.reject('Username Already Exists')
            }
        })
        .then((data) => {
            userToDisplay(data)
            navigate('/home')
        })
        .catch((error) => console.error('Username Already Exists', error));
    }
    
    const warningStyles = {
        color: "red",
        marginTop: "-10px",
        marginBottom: "10px"
    }

    const signupDiv = <div className="signup-form-container">
                        <form className="signup-form" onSubmit={handleSignupSubmit}>
                            <input type="text" autocomplete='off' placeholder="Username" onChange={handleSignupChange} name='username' value ={signupForm.username}  />
                            {userExists ? <p style={warningStyles}>Username already exists, please try again!</p> : null}
                            <input type="password" autocomplete='off' placeholder="Password" onChange={handleSignupChange} name='password' value={signupForm.password} />
                            <input type="text" autocomplete='off' placeholder="Age 16+" onChange={handleSignupChange}  name='age' value={signupForm.age} />
                            <button className="login-signup-submit">Sign Up</button>
                        </form>
                        <div className="login-signup-toggle" onClick={() => {navigate('/')}}>Login</div>
                    </div>
  
  
    return(
      <div className="login-signup-page">
        <div className="greeting-div">
            <h1 className="greeting"><span className="fit">Fit</span><span className="connect">Connect</span></h1>
            <h3 className="sub-greeting">Remember, every small step leads to a big change. Let's embark on this journey together and make fitness a part of your lifestyle.</h3>
        </div>
        {signupDiv}
      </div>
    )
  }
  
  export default Signup;