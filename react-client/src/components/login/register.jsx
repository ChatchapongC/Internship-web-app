import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Sign Up</div>
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
                        <input type="password" name="Password" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type="password" name="Confirm Password" placeholder="Confirm Password"/>
                    </div>
                </div>    
            <div className="footer">
                <button type="button" className="btn">
                    Sign Up
                </button>
            </div>
            <div className="or">-------------------- or --------------------</div>   
            <div className="footer">
                <button type="button" className="btn">
                    Sign up with Facebook
                </button>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Sign up with Google
                </button>
            </div>
            </div>
        );
    }
}