import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import { appendPost, listAllPosts } from "../util/posts";

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

    listAllPosts();
  }

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
  };

  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #15202b; color: white;}"}</style>
        </Helmet>
        <h1 className="text-center">Snookbook - Facebook for Snooks</h1>
        <div className="container posts-container">
          <form id="snook-form" onSubmit={this.handleSubmit}>
            <label htmlFor="content">Content</label>
            <br />
            <textarea
              id="input-content"
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

export default Posts;
