import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';

function App() {
  return (
    <div>
      <Router>
      <div className="container">
        <Switch> 
            <Route path = "/users" component = {ListUserComponent}></Route>
        </Switch>
      </div> 
      </Router>
    </div>
  );
}

export default App;
