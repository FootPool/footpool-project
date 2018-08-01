import React from "react";
import ReactModal from "react-modal";

class PlaceYourGuess extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <button>Spurs Win</button>
            <button> Draw</button>
            <button>Celtic Win</button>
          </div>
          <div>
            <button>Man U Win</button>
            <button>Draw</button>
            <button>Arsenal Win</button>
          </div>
          <div>
            <button>Liverpool Win</button>
            <button>Draw</button>
            <button>Bolton Win</button>
          </div>
        </form>

        <button onClick={this.handleOpenModal}>Submit</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Guesses Submitted Successfully"
        >
          <p>Success! Your guesses were submitted</p>
          <button onClick={this.handleCloseModal}>X</button>
        </ReactModal>
      </div>
    );
  }
}

export default PlaceYourGuess;
