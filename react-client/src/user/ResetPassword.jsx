import React, { useState } from "react";
import "../style/formstyle.scss";
import { resetpassword } from "../api/UserAPI";
import Alert from 'react-s-alert';


export default function ResetPassword(props) {

  return (
    <div className="base-container">
      <div className="footer" />
      <div className="header">RESET PASSWORD</div>
      <div className="content">
        <ResetPasswordForm />
      </div>
    </div>
  );
}



function ResetPasswordForm() {
  const [data, setData] = useState({
    password: null,
    confirmPassword: null
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      Alert.error("Password doesn't match — check it out!");
    } else {
      const query = new URLSearchParams(props.location.search);
      const token = query.get('token');
      resetpassword(data, token)
        .then(response => {
          Alert.success("You have success update your new password");
          props.history.push("/login");
        }).catch(error => {
          Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="footer" />
      <div className="form">
        <div className="form-group">
          <label htmlFor="Password"></label>
          <input type="password" name="newPassword" placeholder="New Password"
            className="form-control"
            value={data.password} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="form">
        <div className="form-group">
          <label htmlFor="Password"></label>
          <input type="password" name="confirmPassword" placeholder="Confirm New Password"
            className="form-control"
            value={data.confirmpassword} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="footer">
        <div className="content">

          <button type="submit" className="btn">
            Reset Password
          </button>
        </div>
      </div>
    </form>

  );

}
