import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Header from "./header";
import Body from "./body";
import { validateImage } from "../util/helper";

class SignUp extends Component {
  state = { imageData: null, imageName: null };

  handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById("input-name").value;
    const pass = document.getElementById("input-password").value;
    const confirmPass = document.getElementById("confirm-password").value;
    const imageData = this.state.imageData;
    const status = document.getElementById("signup-status");

    if (pass !== confirmPass) {
      status.innerText = "Passwords don't match.";
    } else if (this.state.imageName !== null && !validateImage(this.state)) {
      status.classList.add("alert", "alert-danger");
      status.innerText = "Only jpg, jpeg, and png files are allowed!";
    } else {
      const user = {
        username: username,
        password: pass,
        imageData: imageData,
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
            status.classList.remove("alert-danger");
            status.classList.add("alert", "alert-success");
            status.innerText = "Account creation was successful.";
          } else {
            status.classList.add("alert", "alert-danger");
            if (signUpStatus === "failed") {
              status.innerText = "Username already exists.";
            } else if (signUpStatus === "short") {
              status.innerText = "Password must be longer than 5 characters.";
            } else if (signUpStatus === "error") {
              status.innerText = "An error has occured. Please try again.";
            }
          }
        })
      );
    }
  };

  previewImage = () => {
    let oFReader = new FileReader();
    const img = document.getElementById("uploadImage").files[0];
    oFReader.readAsDataURL(img);

    this.setState({ imageName: img.name });

    oFReader.onload = (oFREvent) => {
      if (!oFREvent.target.result) return;
      this.setState({ imageData: oFREvent.target.result });
      document.getElementById("profile-picture").src = oFREvent.target.result;
    };
  };

  handleBrowse = () => {
    document.getElementById("uploadImage").click();
  };

  render() {
    return (
      <div>
        <Body></Body>
        <Header></Header>
        <h1 className="title text-center">Create your Snookbook account</h1>
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
              type="file"
              id="uploadImage"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={this.previewImage}
              style={{ display: "none" }}
            />
            <input
              id="signup-browse-btn"
              type="button"
              value="Browse..."
              onClick={this.handleBrowse}
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
            <button
              id="signup-btn"
              className="my-3"
              onClick={this.handleSubmit}
            >
              Sign up
            </button>
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
