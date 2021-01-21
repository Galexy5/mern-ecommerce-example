import { useState } from 'react';
import { login } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth'



export default function Login(){
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })

  const [errorMessage,setErrorMessage]=useState('');
  const {username,password}=formData;

  const submitForm=(event)=>{
    event.preventDefault();
    if(username!=='' && password!=='') { // No empty fields
      login(formData)
      .then(response=>{
        setAuthentication(response.data.token,response.data.user);


        if(isAuthenticated() && isAuthenticated().role === 1){
          console.log("Redirect to admin");
        }else{
          console.log("Redirect to user")
        }
      })
      .catch(error=>{
        console.log('Axios login error: ',error)
        setErrorMessage('Invalid credentials')
      })
    }
  }

  const change=(event)=>{
       setFormData({...formData, [event.target.name]:event.target.value})
      setErrorMessage('');
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
            <div className={errorMessage==='Invalid credentials' ? "alert alert-danger" : ''} role="alert">
                  {errorMessage}
              </div>

            <button type="submit" className="btn btn-primary w-100">Log in</button>
            </form>
            </div>
        
        </div>

</>
    );
}

