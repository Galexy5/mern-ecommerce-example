import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Women from './Women';
import Men from './Men';
import Register from './Register';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>   
        <Switch>
          <Route exact path="/"> <Home/></Route>
          <Route path="/women"> <Women/></Route>
          <Route path="/register"> <Register/></Route>
          <Route path="/men"> <Men/></Route>
          <Route path="*"> <NotFound/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
