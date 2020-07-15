import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../App.css";
import { Link } from "react-router-dom";

class SignUp extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById("input-name").value;
    const pass = document.getElementById("input-password").value;
    const confirmPass = document.getElementById("confirm-password").value;
    const status = document.getElementById("signup-status");

    if (pass !== confirmPass) {
      status.innerText = "Passwords don't match.";
      status.style.color = "red";
    } else {
      const user = {
        username: username,
        password: pass,
      };

      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) =>
        response.json().then((signUpStatus) => {
          if (signUpStatus == "successful") {
            status.innerText = "Account creation was successful.";
            status.style.color = "green";
          } else if (signUpStatus == "failed") {
            status.innerText = "Username already exists.";
            status.style.color = "red";
          } else {
            status.innerText = "An error has occured. Please try again.";
            status.style.color = "red";
          }
        })
      );
    }
  };

  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <h1 className="text-center">Create your Snookbook account</h1>
        <div className="signup-container">
          <form action="POST">
            <p id="signup-status"></p>
            <label htmlFor="username">Create Username</label>
            <br />
            <input type="text" name="username" id="input-name" required />
            <br />
            <label htmlFor="password">Create Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="input-password"
              required
            />
            <br />
            <label htmlFor="confirm-password">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmpassword"
              id="confirm-password"
              required
            />
            <br />
            <input
              type="submit"
              value="Sign up"
              className="btn btn-primary my-3"
              onClick={this.handleSubmit}
            />
          </form>
          <p>
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
