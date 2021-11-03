import React, { useState, useEffect } from "react";
import Home from '../home/Home.js';
import { Navbar } from '../components/Navigation/Navbar.jsx';
import "./App.scss";
import { Route, Switch, useHistory } from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser, getUserRoles } from '../api/UserAPI';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import OAuth2Redirect from '../user/oauth2/OAuth2RedirectHandler';
import Login from '../user/login/Login.jsx';
import Signup from '../user/signup/SignUp.jsx';
import NotFound from '../common/NotFound';
import { Footer } from '../components/Footer/Footer';
import Job from "../components/Job/JobListing";
import Jobpost from "../components/Job/Jobposting.jsx";
import ListUser from '../components/Admin/ListAllUser.jsx'
import ForgotPassword from "../user/ForgetPassword"
import ResetPassword from "../user/ResetPassword.jsx";
import JobDetails from "../components/Job/JobDetails";
import ScrollToTop from "../utils/ScrollToTop.js";
import JobApplyList from "../components/Candidate/JobApplyList.jsx";
import EditProfile from "../components/Candidate/EditProfile.jsx";
import Alert from "react-s-alert";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import EditCompanyProfile from "../components/Company/EditCompanyProfile";
import CompanyProfile from "../components/Company/CompanyProfile";
import JobEditing from "../components/Job/JobEditing.jsx";
import CandidateDashboard from "../components/Candidate/CandidateDashboard"
import Resume from "../components/Candidate/Resume.jsx";
import FavoriteJob from "../components/Candidate/FavoriteJob.jsx";
import AccountSetting from "../user/AccountSetting.jsx";
import JobPostedList from "../components/Company/JobPostedList.jsx";
import CompanyDashBoard from "../components/Company/CompanyDashboard.jsx";
import AppliedList from "../components/Job/AppliedList.jsx";
import ViewResume from "../components/Company/ViewResume.jsx"
import JobFilter from "../components/Job/JobFilter.jsx";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [company, setCompany] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    loadCurrentlyLoggedInUser();
    loadRolesOfUser();
  }, []);

  const loadCompany = () => {

  }
  const loadRolesOfUser = () => {
    getUserRoles()
      .then(res => {
        setRoles(res);
      }).catch(error => {
      })
  }
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

  const handleLogout = (e) => {
    localStorage.removeItem(ACCESS_TOKEN)
    setAuthenticate(false);
    setCurrentUser(null);
    history.push("/");
    Alert.success("You're successfully logout!")
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className="app">
      <div>
        <Navbar authenticated={authenticate} roles={roles} currentUser={currentUser} onLogout={handleLogout} />
      </div>
      <div className="app-body">
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/resume"
            render={(props) => <Resume authenticated={authenticate} roles={roles} currentUser={currentUser} {...props} />}></Route>
          {/* <PrivateRoute path="/resume" component={Resume} authenticated={authenticate} roles={roles} currentUser={currentUser}></PrivateRoute> */}
          <Route path="/view-resume/:cid/:jid"
            render={(props) => <ViewResume authenticated={authenticate} roles={roles} currentUser={currentUser} {...props} />}></Route>
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
            render={(props) => <Job {...props} />} ></Route>
           <Route path="/job-filter"
            render={(props) => <JobFilter {...props} />} ></Route>
          <Route path="/apply-candidate"
            render={(props) => <AppliedList {...props} />} ></Route>
          <Route path="/job-details/:id"
            render={(props) => <JobDetails currentUser={currentUser}  roles={roles} {...props} />} ></Route>
          <Route path="/user/job-history"
            render={(props) => <JobApplyList roles={roles} {...props} />} ></Route>
          <Route path="/user/company/create-job"
            render={(props) => <Jobpost />} ></Route>
          <Route path="/jobposted"
            render={(props) => <JobPostedList roles={roles}/>} ></Route>
          <Route path="/user/profile/edit"
            render={(props) => <EditProfile currentUser={currentUser} roles={roles} {...props} />} ></Route>
          <Route path="/user/company/edit"
            render={(props) => <EditCompanyProfile currentUser={currentUser}  {...props} />} ></Route>
          <Route path="/user/dashboard"
            render={(props) => <CandidateDashboard roles={roles} />} ></Route>
          {/* <Route path="/resume"
            render={(props) => <Resume roles={roles} currentUser={currentUser} {...props}/>} ></Route> */}
          <Route path="/favorite-job"
            render={(props) => <FavoriteJob roles={roles} />} ></Route>
          <Route path="/company-dashboard"
            render={(props) => <CompanyDashBoard roles={roles} />} ></Route>
          <Route path="/account-setting"
            render={(props) => <AccountSetting currentUser={currentUser} roles={roles} {...props} />} ></Route>
          <Route path="/company/:id"
            render={(props) => <CompanyProfile currentUser={currentUser} {...props} />} ></Route>
          <Route path="/user/company/job/:id/edit"
            render={(props) => <JobEditing  {...props} />} ></Route>
          <Route component={NotFound}></Route>


        </Switch>
      </div>
      <Alert stack={{ limit: 3 }}
        timeout={5000}
        position='top-right' effect='slide' offset={65} />
      <Footer />
    </div>
  );
}

export default App;