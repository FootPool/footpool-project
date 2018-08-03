import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";

class Pooldetail extends React.Component {
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
      <div className="pooldetail--container">
        <Header title="Pool Details" />
        <div>
          <div>Pool Members</div>
          <div>Score</div>
          <div>
            <form>
              <div>
                <p>Member 1</p>
              </div>
            </form>
            <button onClick={this.handleOpenModal}>Play Now!</button>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Guesses Submitted Successfully"
            >
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
              <button onClick={this.handleCloseModal}>Play</button>
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

export default Pooldetail;
