import React from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'


import './RegisterForm.css'

function RegisterForm(){

    const navigate = useNavigate();

    axios.defaults.withCredentials=true;

    function handleRegister(e){
        e.preventDefault();

        const user={
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email:e.target.email.value,
            password:e.target.password.value
        };

        console.log(user)

        axios.post('http://localhost:5000/api/user/registeruser', user)
        .then((response) => {if (response.status === 200) {
            console.log('Yippieeeee')
            navigate('/signin');
        }})
        .catch((error) => console.log(error))

    }


    // function register(){
    //     axios.post('http://localhost:5000/api/user/register', {params:{}})
    // }


    return(
         <div className='signInForm'>
            <div className='formBox'>
                <h1 className='signInTitle'>Register</h1>
                <form onSubmit={handleRegister}> 
                    <div className='inputFields'>
                        <input id='firstName'  type='text'/>
                        <label htmlFor='firstName' className='placeLabel'>First Name</label>
                    </div>
                    <div className='inputFields'>
                        <input id='lastName'  type='text'/>
                        <label htmlFor='lastName' className='placeLabel'>Last Name</label>
                    </div>
                    <div className='inputFields'>
                        <input id='email'  type='text'/>
                        <label htmlFor='email' className='placeLabel'>Email</label>
                    </div>
                    <div className='inputFields'>
                        <input id='password' type='password'/>
                        <label htmlFor='password' className='placeLabel'>Password</label>
                    </div>
                    <button onSubmit={handleRegister}>Register</button>
                </form>
                <p>Already have an account? Sign In!</p>
                <a className ='formButton' href='/signin'>Sign In</a>
            </div>
            </div>
    )
}

export default RegisterForm;