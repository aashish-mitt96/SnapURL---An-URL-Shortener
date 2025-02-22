import React from "react";
import logo from "../assets/logo.jpg";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", marginRight: "10px", paddingTop: '5px'}}
              />
              <p style={{ margin: '5px', paddingTop: '2px' }}>SnapURL</p>
            </span>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
