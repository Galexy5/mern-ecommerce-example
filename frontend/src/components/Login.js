import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth'



export default function Login(){
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })

  let history = useHistory();

  useEffect(()=>{ //If user is already logged in redirect him on his dashboard
    if(isAuthenticated() && isAuthenticated().role === 1){
      //Redirect to admin
     history.push('/admin/dashboard')
   }else if (isAuthenticated() && isAuthenticated().role === 0){
     //Redirect to user
     history.push('/user/dashboard')
   }
  },[history])

  const [errorMessage,setErrorMessage]=useState('');
  const {username,password}=formData;

  const submitForm=(event)=>{

    event.preventDefault();

    if(username!=='' && password!=='') { // No empty fields


      login(formData)
      .then(response=>{
        setAuthentication(response.data.token,response.data.user);


        if(isAuthenticated() && isAuthenticated().role === 1){
           //Redirect to admin
          history.push('/admin/dashboard')
        }else{
          //Redirect to user
          history.push('/user/dashboard')
        }
      })
      .catch(error=>{
        console.log('Axios login error: ',error)
        setErrorMessage(error.response.data.errorMsg)
      })
    }
  }

  const change=(event)=>{
       setFormData({...formData, [event.target.name]:event.target.value})
      setErrorMessage('');
  }

    return(
      <>
      
        
          <div className="row px-3 vh-100">
            <div className="col-md-4 mx-auto align-self-center">
              <form onSubmit={submitForm}>
                <div className="input-group input-group-lg mb-3">
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


                <div className="input-group input-group-lg mb-3">
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

                <button type="submit" className="btn btn-primary btn-lg w-100">Log in</button>
                
              </form>
                <br/><div><p>Don't have an account? <Link style={{textDecoration:'none'}} to='/register'>Register here</Link></p></div>
            </div>
          </div>
       

</>
    );
}

