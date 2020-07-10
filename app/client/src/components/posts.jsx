import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";

class Posts extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Snookbook";

    const snookBtn = document.getElementById("snook-btn");
    snookBtn.disabled =
      localStorage.getItem("isButtonDisabled") === "true" ? true : false;

    if (localStorage.getItem("isButtonDisabled")) {
      setTimeout(() => {
        snookBtn.disabled = false;
        localStorage.setItem("isButtonDisabled", false);
      }, 10000);
    }

    this.listAllPosts();
  }

  listAllPosts = () => {
    fetch('/posts')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post) => {
          this.appendPost(post);
        });
      });
  };

  appendPost = (post) => {
    const div = document.createElement("div");
    div.className = "post";

    const h4 = document.createElement("h4");
    h4.innerText = post.name;

    const p = document.createElement("p");
    p.innerText = post.date;

    const textArea = document.createElement("textarea");
    textArea.id = "content";
    textArea.readOnly = true;
    textArea.innerText = post.content;

    const span = document.createElement("span");
    span.className = "like-container";

    const likeButton = document.createElement("button");
    likeButton.innerHTML = "&#x2661;"; //heart symbol
    likeButton.id = "like-button";

    const numOfLikes = document.createElement("p");
    numOfLikes.id = "numOfLikes";
    numOfLikes.innerText = "0";
    numOfLikes.style.display = "inline";

    likeButton.addEventListener("click", () => {
      this.handleLike(likeButton, numOfLikes);
    });

    span.style.display = "inline";
    span.appendChild(likeButton);
    span.appendChild(numOfLikes);

    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(textArea);
    div.appendChild(span);

    document.querySelector(".posts").prepend(div);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //format the post
    const form = document.getElementById("snook-form");
    const formData = new FormData(form);
    const post = {
      name: formData.get("name"),
      content: formData.get("content"),
      date: new Date().toLocaleString("en-US"),
    };

    //Send post to server
    fetch('/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    //append post
    this.appendPost(post);

    //disable send button for 10 seconds
    const snookBtn = document.getElementById("snook-btn");
    snookBtn.disabled = true;
    localStorage.setItem("isButtonDisabled", true);

    setTimeout(() => {
      snookBtn.disabled = false;
      localStorage.setItem("isButtonDisabled", false);
    }, 10000);
  };

  handleLike = (likeButton, numOfLikes) => {
    const color = likeButton.style.color;
    likeButton.style.color = color === "red" ? "#2d3842" : "red";

    numOfLikes.innerText = parseInt(numOfLikes.innerText) + 1;
  };

  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <h1 className="text-center">Snookbook - Facebook for Snooks</h1>
        <form id="snook-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="text-center form-control"
              name="name"
              type="text"
              required
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="input-content"
              className="form-control"
              name="content"
              maxLength="200"
              required
            ></textarea>
            <button className="btn btn-primary my-3" id="snook-btn">
              Send your Snook
            </button>
          </div>
        </form>
        <div className="posts"></div>
      </div>
    );
  }
}

export default Posts;
