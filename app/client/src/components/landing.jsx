import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class Landing extends Component {
  state = {};
  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <h1 className="text-center">Snookbook - Facebook for Snooks</h1>
        <div className="login-container">
          <form id="login-form">
            <label htmlFor="username">Username</label>
            <br/>
            <input
              id="input-name"
              name="name"
              type="text"
              required
            />
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input
              id="input-password"
              type="password"
            />
            <br/>
            <button className="btn btn-primary my-3" id="login-btn">
              Log in
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up.</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
