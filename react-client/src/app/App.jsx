import React from "react";
import Home from '../home/Home.js';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import "./App.scss";
import {Route, Switch} from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from 'react-s-alert';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import OAuth2Redirect from '../user/oauth2/OAuth2RedirectHandler';
import Login from '../user/login/login.jsx';
import Signup from '../user/signup/register.jsx';
import Profile from '../user/profile/profile';
import NotFound from '../common/NotFound';
import { Footer } from '../components/Footer/Footer';
import  Job  from "../Job/Joblist.jsx";
import ListUser from '../components/admin/ListAllUser.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ForgotPassword from "../components/forgetpassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false

      });
      console.log(this.state.currentUser.roles);
     
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {

    if(this.state.loading) {
      return <LoadingIndicator />
    }
    return (
      <div className="app">
      <div className="app-top-box">
          <Navbar authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser} />
      </div>
      <div className="app-body">
      {this.state.showAlert && <div>{this.props.location.state.reason}</div>}
            <Switch>
              <Route exact path="/" component={Home}></Route>           
              <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                component={Profile}></PrivateRoute>
              <Route path="/login"
                render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/signup"
                render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/oauth2/redirect" component={OAuth2Redirect}></Route> 
              <Route path="/forgotpassword"
                render={(props) => <ForgotPassword authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/resetpassword"
                render={(props) => <ResetPassword authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/admin/users" 
                render={(props) => <ListUser authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props}/>}></Route>
              <Route path="/job-listing" 
                render= {() => <Job/>}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
      <Alert stack={{limit: 3}} 
          timeout = {5000}
          position='top-right' effect='slide' offset={65} />
      <Footer />
      </div>
    );
  }
};

export default App;