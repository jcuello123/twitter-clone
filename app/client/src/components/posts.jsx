import React, { Component } from "react";
import "../App.css";
import {
  appendPost,
  listAllPosts,
  handleMenu,
  updatePicture,
  handleLogout,
  ensureAuthenticated,
} from "../util/posts";
import { withRouter } from "react-router-dom";
import Body from "./body";

class Posts extends Component {
  state = { imageData: "", imageName: "" };

  constructor() {
    super();
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    ensureAuthenticated(this.props);

    //disable the post button for 10 seconds after posting
    const snookBtn = document.getElementById("snook-btn");
    snookBtn.disabled =
      localStorage.getItem("isButtonDisabled") === "true" ? true : false;

    if (localStorage.getItem("isButtonDisabled")) {
      setTimeout(() => {
        snookBtn.disabled = false;
        localStorage.setItem("isButtonDisabled", false);
      }, 10000);
    }

    listAllPosts();
  }

  handlePost = (e) => {
    e.preventDefault();

    //format the post
    const username = document.getElementById("username").innerHTML.toString();
    const form = document.getElementById("snook-form");
    const formData = new FormData(form);
    const profile_pic = document.getElementById("profile_pic").src;
    const post = {
      name: username,
      content: formData.get("content"),
      date: new Date().toLocaleString("en-US"),
      profile_pic: profile_pic,
    };

    //Send post to server
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    //append post
    appendPost(post);

    //clear text
    document.getElementById("input-content").value = "";

    //disable send button for 10 seconds
    const snookBtn = document.getElementById("snook-btn");
    snookBtn.disabled = true;
    localStorage.setItem("isButtonDisabled", true);

    setTimeout(() => {
      snookBtn.disabled = false;
      localStorage.setItem("isButtonDisabled", false);
    }, 10000);

    //refresh the page
    //window.location.reload(true);
  };

  previewImage = () => {
    let oFReader = new FileReader();
    const img = document.getElementById("imgInput").files[0];
    oFReader.readAsDataURL(img);

    this.setState({ imageName: img.name });

    oFReader.onload = (oFREvent) => {
      if (!oFREvent.target.result) return;
      this.setState({ imageData: oFREvent.target.result });
      document.getElementById("pic_to_change").src = oFREvent.target.result;
    };
  };

  render() {
    return (
      <div>
        <Body></Body>
        <header>
          <nav>
            <a href="/">
              <img
                src="logo.png"
                id="logo"
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </a>

            <button
              id="logout-btn"
              className="mx-2 mt-4"
              onClick={() => handleLogout(this.props)}
            >
              Logout
            </button>

            <p id="username"></p>

            <button id="profile-pic-btn btn" onClick={handleMenu}>
              <img
                src="emptycontact.png"
                id="profile_pic"
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "25px" }}
              />
            </button>
          </nav>

          <div className="menu">
            <button id="change-pic-btn">Change profile picture</button>

            <div className="change-pic-container text-center">
              <img src="emptycontact.png" id="pic_to_change" alt="" />
              <input
                type="file"
                id="imgInput"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={this.previewImage}
              />
              <br></br>
              <p id="status"></p>
              <button
                id="update-pic-btn"
                className="mt-5"
                onClick={() => updatePicture(this.state)}
              >
                Change picture
              </button>
            </div>
          </div>
        </header>
        <div className="posts-container mt-5">
          <h1 className="title text-center mb-5">
            Snookbook - Facebook for Snooks
          </h1>
          <form id="snook-form" onSubmit={this.handlePost}>
            <label htmlFor="content">Content</label>
            <br />
            <textarea
              id="input-content"
              className="inp"
              name="content"
              maxLength="200"
              required
            ></textarea>
            <br />
            <button className="btn btn-primary my-3" id="snook-btn">
              Send your Snook!
            </button>
          </form>
          <div className="posts"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Posts);
