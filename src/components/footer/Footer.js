import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer--container">
      <div className="footer--nav-item">
        <Link to="/choosepool">
          <img src="/static/images/home.svg" className="footer--nav-icon" />
          <h4 className="footer--nav-title">Home</h4>
        </Link>
      </div>
      <div className="footer--nav-item">
        <Link to="/fixtures">
          <img src="/static/images/fixtures.svg" className="footer--nav-icon" />
          <h4 className="footer--nav-title">Fixtures</h4>
        </Link>
      </div>
      <div className="footer--nav-item">
        <Link to="/profile">
          <img src="/static/images/profile.svg" className="footer--nav-icon" />
          <h4 className="footer--nav-title">Profile</h4>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
