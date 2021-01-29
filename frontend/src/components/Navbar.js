import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { isAuthenticated , logout } from '../helpers/auth';
import {useSelector} from 'react-redux';


function Navbar({history}){


    /**REDUX GLOBAL STATE PROPERTIES***/
    const {womenCategories} = useSelector(state=>state.womenCategories) ;
    const {menCategories} = useSelector(state=>state.menCategories);



  const handleLogout =(event)=>{
      logout(()=>{
        history.push('/')
      })
  }



    return(
<>

<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-info">
  <div className="container-fluid">
  <Link to='/' className="navbar-brand">Logo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to='/' className="nav-link active" aria-current="page"><i className="fas fa-home"></i></Link>
        </li>


        <li className="nav-item dropdown">
       
          <a className="nav-link dropdown-toggle" href="" id="womenDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Women
          </a>
         
          <ul className="dropdown-menu" aria-labelledby="womenDropdown">
            <li>
            {womenCategories && womenCategories.map(link=>(
                    <Link key={link._id} className="dropdown-item" to=''>{link.sub_category}</Link>
                  )
                  )}
            </li>
          </ul>
        </li>

        <li className="nav-item dropdown">
       
          <a className="nav-link dropdown-toggle" href="#" id="menDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Men
          </a>
         
          <ul className="dropdown-menu" aria-labelledby="menDropdown">
            <li>
            {menCategories && menCategories.map(link=>(
                    <Link key={link._id} className="dropdown-item" to=''>{link.sub_category}</Link>
                  )
                  )}
            </li>
          </ul>
        </li>

        <li className="nav-item dropdown">
       
       <a className="nav-link dropdown-toggle" href="#" id="accessoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       Accessories
       </a>
      
       <ul className="dropdown-menu" aria-labelledby="accessoriessDropdown">
         <li>
         <a href="" className="dropdown-item">Bracelets</a>
         </li>
         <li>
         <a href="" className="dropdown-item">Handbags</a>
         </li>
       </ul>
     </li>

     {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                      <Link to='/login' className="nav-link">Log in/Register</Link>
                    </li>
                </Fragment>
              )}


              {isAuthenticated() && (
                <Fragment>

                    <li className="nav-item">
                      <Link to={isAuthenticated().role === 1 ? '/admin/dashboard' : '/user/dashboard'} className="nav-link">Dashboard</Link>
                    </li>
                  
                    <li className="nav-item">
                      <button className='btn btn-secondary' onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Log out</button>
                    </li>

                </Fragment>
              ) }



      </ul>

    </div>
  </div>
</nav>

</>
    )
}

export default withRouter(Navbar);