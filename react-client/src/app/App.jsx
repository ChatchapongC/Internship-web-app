import React from "react";
import "./App.scss";
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';
import AppHeader from '../common/AppHeader.jsx';
import Alert from 'react-s-alert';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Home from '../home/Home';
import PrivateRoute from '../common/PrivateRoute';
import OAuth2Redirect from '../user/oauth2/OAuth2Redirect';
import Login from '../user/login/login.jsx';
import Signup from '../user/signup/register.jsx';
import Profile from '../user/profile/profile';
import NotFound from '../common/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     // isLogginActive: true,
      authenticated: false,
      currentUser: null,
      loading: false
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
    //Add .right by default
    this.loadCurrentlyLoggedInUser();
    //this.rightSide.classList.add("right");
  }

  // changeState() {
  //   const { isLogginActive } = this.state;

  //   if (isLogginActive) {
  //     this.rightSide.classList.remove("right");
  //     this.rightSide.classList.add("left");
  //   } else {
  //     this.rightSide.classList.remove("left");
  //     this.rightSide.classList.add("right");
  //   }
  //   this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  // }

  render() {

    if(this.state.loading) {
      return <LoadingIndicator />
    }

    // const { isLogginActive } = this.state;
    // const current = isLogginActive ? "SIGN UP" : "SIGN IN";
    // const currentActive = isLogginActive ? "SIGN IN" : "SIGN UP";

    return (
      <div className="app-top-box">
        <div>
          <BrowserRouter>
              <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
      <div className="App">
        

            <Switch>
              <Route exact path="/" component={Home}></Route>           
              <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                component={Profile}></PrivateRoute>
              <Route path="/login"
                render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/signup"
                render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/oauth2/redirect" component={OAuth2Redirect}></Route>  
              <Route component={NotFound}></Route>
            </Switch>
            
          </div>
      </BrowserRouter>
      </div>
      </div>
    );
  }
};

// const RightSide = props => {
//   return (
//     <div
//       className="right-side"
//       ref={props.containerRef}
//       onClick={props.onClick}
//     >
//       <div className="inner-container">
//         <div className="text">{props.current}</div>
//       </div>
//     </div>
//   );
// };

export default App;