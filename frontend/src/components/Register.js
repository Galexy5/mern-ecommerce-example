import {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {register} from '../api/auth';


export default function Register(){
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })

  const [emptyFieldsError,setEmptyFieldsError]=useState('');
  const [emailError,setEmailError]=useState('');
  const [submitMessage,setSubmitMessage]=useState('');

  const {username,email,password}=formData;

  const submitForm=(event)=>{
    event.preventDefault();
    if(isEmpty(username) || isEmpty(email) || isEmpty(password)){
      setEmptyFieldsError('All fields are required')
    }else if(!isEmail(email)){
      setEmailError('Invalid Email');
      document.getElementById("email").focus();
    }else{ //SUCCESS
      register(formData)
      .then(response=>{
        setFormData({
          username:'',
          email:'',
          password:''
        })
        setSubmitMessage(response.data.submitMsg)
      })
      .catch(error=>{console.log('Axios register error: ',error)})
    }
  }

  const change=(event)=>{
       setFormData({...formData, [event.target.name]:event.target.value})
      setEmptyFieldsError('')
      setEmailError('');
      setSubmitMessage('');
  }

    return(
      <>
        <div className="d-flex align-items-center" style={{marginTop:200}}>
        <div className="container w-25">
          <form onSubmit={submitForm}>
            <div className="input-group mb-3 h-25">
              <span className="input-group-text" id="username-icon"><i className="fas fa-user"></i></span>
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
              <span className="input-group-text" id="email-icon"><i className="fas fa-envelope"></i></span>
                <input 
                type="text" 
                name="email" 
                id="email"
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
              <span className="input-group-text" id="password-icon"><i className="fas fa-lock"></i></span>
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
              <div className={submitMessage==='' ? '' : submitMessage==='This email already exists' ? "alert alert-danger" : "alert alert-success"} role="alert">
                  {submitMessage}
              </div>
              <div className={emptyFieldsError==='' ? '' : "alert alert-danger"} role="alert">
                  {emptyFieldsError}
              </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            </div>
        
        </div>

</>
    );
}