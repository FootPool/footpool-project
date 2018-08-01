import React from "react";

class Profile extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          Username
          <u> edit</u>
        </div>
        <div>
          Email Address
          <u> edit</u>
        </div>
        <div>
          Password
          <u> edit</u>
        </div>
        <a href="/logout">
          <p>
            <u>Logout</u>
          </p>
        </a>
      </div>
    );
  }
}

export default Profile;
