import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){
    return(
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link to='/' class="navbar-brand">Logo</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to='/' class="nav-link active" aria-current="page">Home</Link>
        </li>
        <li class="nav-item">
          <Link to='/women' class="nav-link">Women</Link>
        </li>
        <li class="nav-item">
          <Link to='/men' class="nav-link">Men</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}