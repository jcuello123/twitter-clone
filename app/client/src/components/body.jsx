import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Body extends Component {
  render() {
    return (
      <Helmet>
        <style>
          {
            "body { background-image: url(bg.jpg);background-position: fixed;background-repeat: no-repeat;background-size:cover; color: white;font-family: Rowdies,Georgia, serif;}"
          }
        </style>
      </Helmet>
    );
  }
}

export default Body;
