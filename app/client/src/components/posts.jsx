import React, { Component } from "react";
import "../App.css";
import { appendPost, listAllPosts } from "../util/posts";
import { withRouter } from "react-router-dom";
import Body from "./body";

class Posts extends Component {
  constructor() {
    super();
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    document.title = "Snookbook";

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
    const username = document.getElementById("username").innerHTML;
    const form = document.getElementById("snook-form");
    const formData = new FormData(form);
    const post = {
      name: username,
      content: formData.get("content"),
      date: new Date().toLocaleString("en-US"),
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
    // const snookBtn = document.getElementById("snook-btn");
    // snookBtn.disabled = true;
    // localStorage.setItem("isButtonDisabled", true);

    // setTimeout(() => {
    //   snookBtn.disabled = false;
    //   localStorage.setItem("isButtonDisabled", false);
    // }, 10000);
  };

  handleLogout = () => {
    fetch("/api/posts/logout").then((response) => {
      this.props.history.push("/");
    });
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
            <button id="logout-btn" className="m-2" onClick={this.handleLogout}>
              Logout
            </button>
            <p id="username" className="m-2"></p>
          </nav>
        </header>
        <h1 className="text-center">Snookbook - Facebook for Snooks</h1>
        <div className="container posts-container">
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
