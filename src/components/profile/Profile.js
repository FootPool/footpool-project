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
    console.log("props: ", this.props);
    return (
      <div className="profile--container">
        <Header title="Profile" />
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
            className="edit-modal"
          >
            <button onClick={this.handleCloseModal}>X</button>
            <form className="modal-input">
              <input placeholder="Update your username" />
              <button
                type="submit"
                onClick={this.handleCloseModal}
                className="submit-button"
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
            className="edit-modal"
          >
            <button onClick={this.handleCloseModal}>X</button>
            <form className="modal-input">
              <input placeholder="Update your Email" />
              <button
                type="submit"
                onClick={this.handleCloseModal}
                className="submit-button"
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
            className="edit-modal"
          >
            <button onClick={this.handleCloseModal}>X</button>
            <form className="modal-input">
              <input placeholder="Update your password" />
              <button
                type="submit"
                onClick={this.handleCloseModal}
                className="submit-button"
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
    );
  }
}

export default Profile;
