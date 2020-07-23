import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Header from "./header";
import Body from "./body";

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
          if (signUpStatus === "successful") {
            status.innerText = "Account creation was successful.";
            status.style.color = "green";
          } else {
            if (signUpStatus === "failed") {
              status.innerText = "Username already exists.";
            } else if (signUpStatus === "short") {
              status.innerText = "Password must be longer than 5 characters.";
            } else if (signUpStatus === "error") {
              status.innerText = "An error has occured. Please try again.";
            }
            status.style.color = "red";
          }
        })
      );
    }
  };

  previewImage = () => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = (oFREvent) => {
      document.getElementById("profile-picture").src = oFREvent.target.result;
    };
  };

  render() {
    return (
      <div>
        <Body></Body>
        <Header></Header>
        <h1 className="text-center">Create your Snookbook account</h1>
        <div className="signup-container">
          <form>
            <p>Choose a profile picture</p>
            <img
              src="emptycontact.png"
              alt=""
              id="profile-picture"
              className="mb-3"
              style={{ width: "100px", height: "100px", borderRadius: "50px" }}
            />
            <br></br>
            <input
              name="photo"
              type="file"
              id="uploadImage"
              className="text-center"
              onChange={this.previewImage}
            />
            <p id="signup-status" className="mt-2"></p>
            <label htmlFor="username">Create Username</label>
            <br />
            <input
              type="text"
              name="username"
              id="input-name"
              className="signup-inp"
              required
            />
            <br />
            <label htmlFor="password">Create Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="input-password"
              className="signup-inp"
              required
            />
            <br />
            <label htmlFor="confirm-password">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmpassword"
              id="confirm-password"
              className="signup-inp"
              required
            />
            <br />
            <input
              type="submit"
              value="Sign up"
              id="signup-btn"
              className="btn btn-primary my-3"
              onClick={this.handleSubmit}
            />
          </form>
          <p>
            Back to
            <Link to="/" id="login-link">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
