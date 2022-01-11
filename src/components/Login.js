import React, { useState , useContext } from 'react'
import {useNavigate } from 'react-router-dom'
import alertContext from '../context/alerts/alertContext';
import { Link } from "react-router-dom";

export default function Login() {

  const {showAlert} = useContext(alertContext);
    let navigate = useNavigate ();

    const [state , setState] = useState({email:'' , password : ''});

    const handleOnChange = (e) =>{
        setState({...state , [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // API CALL
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email : state.email , password : state.password}),
      });
      const res = await response.json();
      if(res.authToken){
        // save the authToken in localstorage and redirect
        localStorage.setItem('token' , res.authToken);
        navigate('/');
        showAlert("Successfully Logged in" , "success");
      }else{
        showAlert("Invalid email or password..." , "danger");
      }
    }

  return (
    <div className="container my-2">
      <h1>LogIn To Your Account</h1>
      <form className="my-2" onSubmit={handleSubmit} method="post">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email" 
            value={state.email} 
            onChange={handleOnChange} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="emailHelp"
            name="password" 
            value={state.password} 
            onChange={handleOnChange} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
        <p>
          Don't have an account create account now <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}
