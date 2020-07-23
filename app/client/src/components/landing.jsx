import React, { Component } from "react";
import "../App.css";
import { Link, withRouter } from "react-router-dom";
import Header from "./header";
import Body from "./body";

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
      .then((status) => {
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
        <Body></Body>
        <Header></Header>

        <div className="welcome-container">
          <p id="welcome-text">Welcome to</p>
          <p id="snookbook-text">Snookbook..</p>
          <p id="fav-text">..Your favorite social media app</p>
        </div>
        <div className="login-container">
          <form id="login-form">
            <p id="login-status"></p>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="input-name"
              className="inp"
              name="name"
              type="text"
              required
            />
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
            Don't have an account?{" "}
            <Link to="/signup" id="signup-link">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
