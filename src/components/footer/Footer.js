import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div>
        <Link to="/choosepool">
          <img src="/static/images/home.svg" />
          <h2>Home</h2>
        </Link>
      </div>
      <div>
        <Link to="/choosepool">
          <img src="/static/images/pools.svg" />
          <h2>Pools</h2>
        </Link>
      </div>
      <div>
        <Link to="/fixtures">
          <img src="/static/images/fixtures.svg" />
          <h2>Fixtures</h2>
        </Link>
      </div>
      <div>
        <Link to="/profile">
          <img src="/static/images/profile.svg" />
          <h2>Profile</h2>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
