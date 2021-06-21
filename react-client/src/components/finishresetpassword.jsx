import React from "react";

export class FinishResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="text">Check your Email in order to reset password</div>
        <div className="footer">
          <button type="button" className="btn">
             Back to home
          </button>
        </div>
      </div>
    );
  }
}