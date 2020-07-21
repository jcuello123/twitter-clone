import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";

class Landing extends Component {
  handleLogin = (e) => {
    e.preventDefault();

    const username = document.getElementById("input-name").value;
    const password = document.getElementById("input-password").value;
    const user = {
      username: username,
      password: password,
    };

    //send login info to server and try to authenticate
    fetch("/api/posts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((loginInfo) => {
        this.props.history.push("posts");
      })
      .catch((err) => {
        const status = document.getElementById("login-status");
        status.style.color = "red";
        status.innerText = "Incorrect username or password";
      });
  };

  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <h1 className="text-center">Snookbook - Facebook for Snooks</h1>
        <div className="login-container">
          <form id="login-form">
            <p id="login-status"></p>
            <label htmlFor="username">Username</label>
            <br />
            <input id="input-name" className="inp" name="name" type="text" required />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input id="input-password" className="inp" type="password" />
            <br />
            <button
              onClick={this.handleLogin}
              className="btn btn-primary my-3"
              id="login-btn"
            >
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

export default withRouter(Landing);
