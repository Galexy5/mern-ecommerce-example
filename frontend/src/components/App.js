import React , {useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Women from './Women';
import Men from './Men';
import Register from './Register';
import Login from './Login'
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import UserRoute from './User/UserRoute';
import AdminRoute from './Admin/AdminRoute';
import NotFound from './NotFound';

/***REDUX***/
import {useDispatch} from 'react-redux';
import {getWomenCategories} from '../redux/actions/categoryActions';

function App() {

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getWomenCategories());
},[dispatch])

  return (
    <div className="App">
      <Router>
      <Navbar/>   
        <Switch>
          <Route exact path="/" component={Home}/> 
          <Route exact path="/register" component={Register}/> 
          <Route exact path="/login" component={Login}/>
          <UserRoute exact path="/user/dashboard" component={UserDashboard}/>
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
          <Route exact path="/women" component={Women}/>
          <Route exact path="/men" component={Men}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
