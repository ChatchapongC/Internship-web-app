import React, {useState} from "react";
import { sendResetPasswordURL } from "../api/UserAPI";
import Alert from "react-s-alert";

export default function ForgotPassword(props) {

  const [data, setData] = useState({
    email: null
  });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendResetPasswordURL(data)
      .then(response => {
        Alert.success("Reset password link already sent! Please check your Email");
        props.history.push("/login");
      }).catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="base-container">
        <div className="footer" />
        <div className="header">FORGOT YOUR PASSWORD?</div>
        <p>Please input your email,</p>
        <p>we will send you a reset password link to your email</p>
        <div className="footer" />
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="Email"></label>
              <input type="email" name="email" placeholder="Email"
                value={data.email} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
}


