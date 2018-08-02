import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      showUsernameModal: false,
      showEmailModal: false,
      showPasswordModal: false
    };

    this.handleOpenUsernameModal = this.handleOpenUsernameModal.bind(this);
    this.handleOpenEmailModal = this.handleOpenEmailModal.bind(this);
    this.handleOpenPasswordModal = this.handleOpenPasswordModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenUsernameModal() {
    this.setState({ showUsernameModal: true });
  }

  handleOpenEmailModal() {
    this.setState({ showEmailModal: true });
  }

  handleOpenPasswordModal() {
    this.setState({ showPasswordModal: true });
  }

  handleCloseModal() {
    this.setState({
      showUsernameModal: false,
      showEmailModal: false,
      showPasswordModal: false
    });
  }

  render() {
    return (
      <div>
        <Header title="Profile" />
        <div className="profile--container">
          <div className="profile--user-option">
            <a
              className="profile-user-option--edit"
              onClick={this.handleOpenUsernameModal}
            >
              Username
              <img
                src="/static/images/edit-button.png"
                className="profile--edit-icon"
              />
            </a>
            <ReactModal
              isOpen={this.state.showUsernameModal}
              contentLabel="Edit your username"
              className="profile--edit-modal"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="profile--modal-input">
                <input placeholder="Update your username" />
                <button type="submit" onClick={this.handleCloseModal}>
                  Submit
                </button>
              </form>
            </ReactModal>
          </div>
          <div className="profile--user-option">
            <a
              className="profile-user-option--edit"
              onClick={this.handleOpenEmailModal}
            >
              Email Address
              <img
                src="/static/images/edit-button.png"
                className="profile--edit-icon"
              />
            </a>
            <ReactModal
              isOpen={this.state.showEmailModal}
              contentLabel="Edit your Email"
              className="profile--edit-modal"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="profile--modal-input">
                <input placeholder="Update your Email" />
                <button type="submit" onClick={this.handleCloseModal}>
                  Submit
                </button>
              </form>
            </ReactModal>
          </div>
          <div className="profile--user-option">
            <a
              className="profile-user-option--edit"
              onClick={this.handleOpenPasswordModal}
            >
              Password
              <img
                src="/static/images/edit-button.png"
                className="profile--edit-icon"
              />
            </a>
            <ReactModal
              isOpen={this.state.showPasswordModal}
              contentLabel="Edit your password"
              className="profile--edit-modal"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="profile--modal-input">
                <input placeholder="Update your password" />
                <button type="submit" onClick={this.handleCloseModal}>
                  Submit
                </button>
              </form>
            </ReactModal>
          </div>
          <a href="/logout" id="logout-btn" className="profile--log-out">
            <p>
              <u>Logout</u>
            </p>
          </a>
        </div>
      </div>
    );
  }
}

export default Profile;
