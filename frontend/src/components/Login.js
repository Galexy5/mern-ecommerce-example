import {useState} from 'react';
import {login} from '../api/auth';


export default function Login(){
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })

  const [submitMessage,setSubmitMessage]=useState('');
  const {username,password}=formData;

  const submitForm=(event)=>{
    event.preventDefault();
    if(username!=='' && password!=='') { // No empty fields
      login(formData)
      .then(response=>{
        setFormData({
          username:'',
          password:''
        })
        setSubmitMessage(response.data.submitMsg)
      })
      .catch(error=>{console.log('Axios login error: ',error)})
    }
  }

  const change=(event)=>{
       setFormData({...formData, [event.target.name]:event.target.value})
      setSubmitMessage('');
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
            <div className={submitMessage==='' ? '' : submitMessage==='You are logged in !!' ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {submitMessage}
              </div>

            <button type="submit" className="btn btn-primary w-100">Log in</button>
            </form>
            </div>
        
        </div>

</>
    );
}

