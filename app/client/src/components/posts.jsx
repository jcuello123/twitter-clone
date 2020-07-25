import React, { Component } from "react";
import "../App.css";
import { appendPost, listAllPosts } from "../util/posts";
import { withRouter } from "react-router-dom";
import Body from "./body";

class Posts extends Component {
  state = { imageData: "", imageName: "" };

  constructor() {
    super();
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    this.ensureAuthenticated();

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

  ensureAuthenticated = () => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((status) => {
        if (status === "failed") {
          this.props.history.push("/");
        }
      });
  };

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
    window.location.reload(true);
  };

  handleLogout = () => {
    fetch("/api/posts/logout").then((response) => {
      this.props.history.push("/");
    });
  };

  handleMenu = () => {
    const menu = document.querySelector(".menu");
    const ctr = document.querySelector(".change-pic-container");
    if (menu.style.display === "none") menu.style.display = "block";
    else menu.style.display = "none";

    if (ctr.style.display === "block") ctr.style.display = "none";

    document.getElementById(
      "change-pic-btn"
    ).onclick = this.handleChangeProfilePicture;
  };

  handleChangeProfilePicture = () => {
    const ctr = document.querySelector(".change-pic-container");

    if (ctr.style.display === "none") ctr.style.display = "block";
    else ctr.style.display = "none";
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

  updatePicture = () => {
    const status = document.getElementById("status");

    if (
      this.state.imageName
        .substring(
          this.state.imageName.lastIndexOf(".") + 1,
          this.state.imageName.length
        )
        .toLowerCase() !== "jpg" &&
      this.state.imageName
        .substring(
          this.state.imageName.lastIndexOf(".") + 1,
          this.state.imageName.length
        )
        .toLowerCase() !== "jpeg" &&
      this.state.imageName
        .substring(
          this.state.imageName.lastIndexOf(".") + 1,
          this.state.imageName.length
        )
        .toLowerCase() !== "png"
    ) {
      status.style.color = "red";
      status.innerText = "Only jpg, jpeg, and png files are allowed!";
    } else {
      const username = document.getElementById("username").innerHTML.toString();
      const userToUpdate = {
        username: username,
        imageData: this.state.imageData,
      };

      fetch("/api/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToUpdate),
      });
      window.location.reload(true);
    }
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
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </a>
            <button
              id="logout-btn"
              className="m-2 mt-4"
              onClick={this.handleLogout}
            >
              Logout
            </button>
            <p id="username" className="m-2"></p>
            <button id="profile-pic-btn" onClick={this.handleMenu}>
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
          </div>
        </header>

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
            onClick={this.updatePicture}
          >
            Change picture
          </button>
        </div>

        <div className="container posts-container mt-5">
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
