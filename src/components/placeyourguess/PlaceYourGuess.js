import React from "react";
import ReactModal from "react-modal";
import getFixtures from "../../services/getFixtures";

class PlaceYourGuess extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      fixtures: undefined
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

  componentDidMount() {
    getFixtures().then(data => this.setState(() => {
        return {
          fixtures: data
        }
      })
    )}

  render() {
    return (
      <div>
        <div>
          {
            this.state.fixtures && this.state.fixtures.matches
            ?
            this.state.fixtures.matches.map((match, index) => {
              return <div key=""><button>{match.homeTeam.name}</button><button>Draw</button><button>{match.awayTeam.name}</button></div>
            })
            :
            null
          }
      </div>

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
