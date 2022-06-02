import {React} from 'react';

import {useNavigate} from 'react-router-dom'

// import SessionContext from "../Session/SessionContext"

import axios from 'axios';

import './SignInForm.css'

function SignInForm(){
    const navigate = useNavigate();

    axios.defaults.withCredentials=true;

    function handleSignIn(e){
        e.preventDefault();
        const user={
            email:e.target.email.value,
            password:e.target.password.value
        };
        console.log(user)


        axios.post('http://localhost:5000/api/user/signin', user)
        .then(response => {
            if (response.status === 200) {
                console.log('Yippieeeee')
                navigate('/');
            }
        })
        //if ok navigate back to homepage with session

    }

    return(
         <div className='signInForm'>
            <div className='formBox'>
                <h1 className='signInTitle'>Sign In</h1>
                <form onSubmit={handleSignIn}> 
                    <div className='inputFields'>
                        <input name='email' id='email' type='text'/>
                        <label htmlFor='email' className='placeLabel'>Email</label>
                    </div>
                    <div className='inputFields'>
                        <input name ='password' id='password' type='password'/>
                        <label htmlFor='password' className='placeLabel'>Password</label>
                    </div>
                    <button type='submit'>Sign In</button>
                </form>
                <a className ='formButton' href='/register'>Register</a>
            </div>
            </div>
    )
}

export default SignInForm;