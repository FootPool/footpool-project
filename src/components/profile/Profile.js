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
      <div className="profile--container">
        <Header title="Profile" />
        <div className="form-container">
          <h3 className="createpool-title">Change your details</h3>
          <div className="profile--user-option">
            <a
              className="profile-user-option--edit"
              onClick={this.handleOpenUsernameModal}
            >
              Username: {this.props.user.username}
              <img
                src="/static/images/edit-button.png"
                className="profile--edit-icon"
              />
            </a>
            <ReactModal
              isOpen={this.state.showUsernameModal}
              contentLabel="Edit your username"
              className="modal-container"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="modal-form">
                <input
                  placeholder="Update your username"
                  className="modal-input"
                />
                <button
                  type="submit"
                  onClick={this.handleCloseModal}
                  className="button submit-button profile-button"
                >
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
              E-mail: {this.props.user.email}
              <img
                src="/static/images/edit-button.png"
                className="profile--edit-icon"
              />
            </a>
            <ReactModal
              isOpen={this.state.showEmailModal}
              contentLabel="Edit your Email"
              className="modal-container"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="modal-form">
                <input
                  placeholder="Update your Email"
                  className="modal-input"
                />
                <button
                  type="submit"
                  onClick={this.handleCloseModal}
                  className="button submit-button profile-button"
                >
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
              className="modal-container"
            >
              <button onClick={this.handleCloseModal}>X</button>
              <form className="modal-form">
                <input
                  placeholder="Update your password"
                  className="modal-input"
                />
                <button
                  type="submit"
                  onClick={this.handleCloseModal}
                  className="button submit-button profile-button"
                >
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
