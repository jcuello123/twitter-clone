import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <a href="/">
            <img
              src="logo.png"
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </a>
        </nav>
      </header>
    );
  }
}

export default Header;
