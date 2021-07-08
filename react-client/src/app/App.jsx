import React, {Component, useState, useEffect} from "react";
import Home from '../home/Home.js';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import "./App.scss";
import {Route, Switch, BrowserRouter, Redirect, useHistory} from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from 'react-s-alert';
import { getCurrentUser } from '../util/APIUtils';
import { getCurrentJob } from '../util/APIUtils';
import { getCurrentbusiness } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import OAuth2Redirect from '../user/oauth2/OAuth2RedirectHandler';
import Login from '../user/login/login.jsx';
import Signup from '../user/signup/register.jsx';
import Profile from '../user/profile/profile';
import NotFound from '../common/NotFound';
import ScrollToTop from '../components/ScrollToTop.js';
import { Footer } from '../components/Footer/Footer';
import  Job  from "../Job/Joblist";
import ListUser from '../components/admin/ListAllUser.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ForgotPassword from "../components/forgetpassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";

const App = () =>{

  const [authenticate, setAuthenticate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

 useEffect(() => {
    setLoading(true);
    loadCurrentlyLoggedInUser();
  },[]);

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
    .then(response => {
      setCurrentUser(response);
      setAuthenticate(true);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });    
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticate(false);
    setCurrentUser(null);
    history.push("/");
    Alert.success("You're successfully Logout");
  
  }

  if(loading){
    return <LoadingIndicator />
  }

    return (
      <div className="app">
      <div>
          <Navbar authenticated={authenticate} currentUser={currentUser} onLogout={handleLogout} />
      </div>
      <div className="app-body">
            <Switch>
              <Route exact path="/" component={Home}></Route>           
              <PrivateRoute path="/profile" component={Profile} authenticated={authenticate} currentUser={currentUser}></PrivateRoute>
              <Route path="/login"
                render={(props) => <Login authenticated={authenticate} {...props} />}></Route>
              <Route path="/signup"
                render={(props) => <Signup authenticated={authenticate} {...props} />}></Route>
              <Route path="/oauth2/redirect" component={OAuth2Redirect}></Route> 
              <Route path="/forgotpassword"
                render={(props) => <ForgotPassword authenticated={authenticate} {...props} />}></Route>
              <Route path="/resetpassword"
                render={(props) => <ResetPassword authenticated={authenticate} {...props} />}></Route>
              <PrivateRoute path="/admin/users" authenticated={authenticate} currentUser={currentUser}
                component={ListUser}></PrivateRoute>
              <Route path="/job-listing" 
                render= {(props) => <Job />} ></Route>
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

export default App;