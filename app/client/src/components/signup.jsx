import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../App.css";

class SignUp extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <form action="POST">
          <div className="form-group">
            <input
              type="text"
              name="username"
              id="username-input"
              className="form-control"
              required
            />
            <input
              type="password"
              name="password"
              id="password-input"
              className="form-control"
              required
            />
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
