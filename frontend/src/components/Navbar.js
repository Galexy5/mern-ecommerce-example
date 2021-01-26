import React, {useState,Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { isAuthenticated , logout } from '../helpers/auth';
import {getWomenCategories} from "../api/category"

function Navbar({history}){

  const [womenCats,setWomenCats]= useState(null);

  const handleLogout =(event)=>{
      logout(()=>{
        history.push('/')
      })
  }

  useEffect(()=>{
    womenLinkClick();
  },[])
  

    const womenLinkClick = async () =>{
       await getWomenCategories().then(response=>{
          setWomenCats(response.data)
          
        })
        
    }


    return(

      <nav className="navbar fixed-top navbar-expand-lg navbar-info bg-light">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Logo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page"><i className="fas fa-home"></i></Link>
              </li>
              <li className="nav-item dropdown" onClick={womenLinkClick} >
                <Link  className="nav-link dropdown-toggle" to="#" id="womenDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Women
                </Link>
                <div className="dropdown-menu" aria-labelledby="womenDropdown">
                  {womenCats && womenCats.map(link=>(
                    <Link key={link._id} className="dropdown-item" href="#">{link.sub_category}</Link>
                  )
                  )}
                </div>
              </li>
              <li className="nav-item">
                <Link to='/men' className="nav-link">Men</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="accessoriesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Accessories
                </Link>
                <div className="dropdown-menu" aria-labelledby="accessoriesDropdown">
                  <Link className="dropdown-item" href="#">Bracelets</Link>
                  <Link className="dropdown-item" href="#">Handbags</Link>
                  <Link className="dropdown-item" href="#">Belts</Link>
                </div>
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

    )
}

export default withRouter(Navbar);