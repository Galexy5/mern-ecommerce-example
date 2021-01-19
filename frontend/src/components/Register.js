import {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

export default function Register(){
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })

  const [emptyFieldsError,setEmptyFieldsError]=useState('');
  const [emailError,setEmailError]=useState('');

  const {username,email,password}=formData;

  const submitForm=(event)=>{
    event.preventDefault();
    if(isEmpty(username) || isEmpty(email) || isEmpty(password)){
      setEmptyFieldsError('All fields are required')
    }else if(!isEmail(email)){
      setEmailError('Invalid Email');
      //Here I can focus on email
    }else{
      console.log(formData)
    }
  }

  const change=(event)=>{
       setFormData({...formData, [event.target.name]:event.target.value})
      setEmptyFieldsError('')
      setEmailError('');
      
  }

    return(
      <>
        <div className="d-flex vh-100 w-100 align-items-center">
        <div className="container w-25">
          <form onSubmit={submitForm}>
        <div className="input-group mb-3 h-25">
          <span className="input-group-text" id="username-icon"><i class="fas fa-user"></i></span>
            <input 
            type="text" 
            name="username" 
            onChange={change} 
            value={username} 
            className="form-control" 
            placeholder="Username" 
            aria-label="Username" 
            aria-describedby="username-icon"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="email-icon"><i class="fas fa-envelope"></i></span>
            <input 
            type="text" 
            name="email" 
            onChange={change} 
            value={email} 
            className="form-control" 
            placeholder="Email" 
            aria-label="Email" 
            aria-describedby="email-icon"/>
        </div>
        <div className={emailError==='' ? '' : "alert alert-danger"} role="alert">
              {emailError}
          </div>


        <div className="input-group mb-3">
          <span className="input-group-text" id="password-icon"><i class="fas fa-lock"></i></span>
            <input 
            type="password" 
            name="password" 
            onChange={change}
            value={password} 
            className="form-control" 
            placeholder="Password" 
            aria-label="Password" 
            aria-describedby="password-icon"/>
        </div>
          <div className={emptyFieldsError==='' ? '' : "alert alert-danger"} role="alert">
              {emptyFieldsError}
          </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        </div>
        
        </div>
    {/* <p>{JSON.stringify(formData)}</p> */}
</>
    );
}