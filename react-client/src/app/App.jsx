import React, { useState, useEffect} from "react";
import Home from '../home/Home.js';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import "./App.scss";
import {Route, Switch, useHistory} from 'react-router-dom';
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
// import  JobDetail  from "../Job/Jobdetail.jsx";
import  Jobownlist  from "../Job/Jobownlist.jsx";
import Jobpost from "../Job/Jobpost.jsx";
import ListUser from '../components/admin/ListAllUser.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ForgotPassword from "../components/forgetpassword.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import Popup from "../components/Popup/Popup"
import JobDetails from "../Job/Jobdetails.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import JobApplyList from "../user/jobApplyList.jsx";


function App () {

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
      <ScrollToTop />
            <Switch>
              <Route exact path="/" component={Home}></Route>           
              <PrivateRoute path="/user/profile" component={Profile} authenticated={authenticate} currentUser={currentUser}></PrivateRoute>
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
                render= {(props) => <Job {...props}/>} ></Route>
              <Route path="/job-details/:id" 
                render= {(props) => <JobDetails {...props}/>} ></Route>
              <Route path="/user/job-history" 
                render= {(props) => <JobApplyList {...props}/>} ></Route>
              <Route path="/job-post" 
                render= {(props) => <Jobpost />} ></Route>
              {/* <Route path="/popup" 
                render= {(props) => <Popup />} ></Route> */}
              <Route component={NotFound}></Route>
            </Switch>
          </div>
      <Alert stack={{limit: 3}} 
          timeout = {25000}
          position='top-right' effect='slide' offset={65} />
      <Footer />
      </div>
    ); 
}

export default App;