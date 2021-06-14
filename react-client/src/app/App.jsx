import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from "../user/signup/register";
import ListUserComponent from '../components/ListUserComponent';
import Login from "../user/login/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      authenticated: false,
      currentUser: null,
      loading: false
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "SIGN UP" : "SIGN IN";
    const currentActive = isLogginActive ? "SIGN IN" : "SIGN UP";
    return (
      <div className="App">
        <div>
            <div className="login">
              <div className="container" ref={ref => (this.container = ref)}>
                {isLogginActive && (
                  <Login containerRef={ref => (this.current = ref)} />
                )}
                {!isLogginActive && (
                  <Register containerRef={ref => (this.current = ref)} />
                )}
              </div>
              <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={ref => (this.rightSide = ref)}
                onClick={this.changeState.bind(this)}
              />
            </div>
          </div>
      </div>
    );
  }
}


const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;