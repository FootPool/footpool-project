import React from "react";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input placeholder="Username" />
          <input placeholder="Email Address" />
          <input placeholder="Password" />
          <button>Update Details</button>
        </form>
        <a>
          <p>Logout</p>
        </a>
      </div>
    );
  }
}

export default Profile;
