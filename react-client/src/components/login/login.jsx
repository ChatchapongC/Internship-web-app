import React from "react";
import loginImg from "../../login.svg";
import "./style.scss";


export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Sign In</div>
                <div className="content"> 
                    <div className="image">
                        <img scr={loginImg} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="Email"></label>
                            <input type="text" name="Email" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type="password" name="password" placeholder="Password"/>
                        <div className="forget">forget password?</div>
                    </div>
                </div>      
            <div className="footer">
                <button type="button" className="btn">
                    Sign In 
                </button>
            </div>
            <div className="or">-------------------- or --------------------</div> 
            <div className="footer">
                <button type="button" className="btn">
                    Sign in with Facebook
                </button>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Sign in with Google
                </button>
            </div>
            </div>
        );
    }
}