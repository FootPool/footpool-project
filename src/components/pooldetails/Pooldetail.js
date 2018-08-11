import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";

class Pooldetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      fixtures: undefined,
      guesses: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("#root");

    this.props.validateUserInPool(
      this.props.user.id,
      this.props.selectedPoolId
    );
  }

  handleOpenModal() {
    this.props.getFixtures(this.props.selectedPoolWeek);
  }

  handleCloseModal() {
    const userId = this.props.user.id;
    const poolId = this.props.selectedPoolId;
    const guesses = this.state.guesses;

    Object.keys(this.state.guesses).length !== 10
      ? alert(
          "Yellow Card! Place your bets on ALL of the games before submitting."
        )
      : this.props.sendBetsToDb(poolId, userId, guesses);
  }

  handleSelect(matchId, choice) {
    const guesses = { ...this.state.guesses, [matchId]: choice };
    this.setState({ guesses });
  }

  render() {
    console.log(this.props.selectedPoolId);
    if (this.state.isValid) {
      return (
        // Liveresults.js
        <div>YOU HAVE MADE YOUR GUESSES! 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥</div>
      );
    } else {
      return (
        // Placebets.js
        <div>
          <Header title="Pool Details" />
          <div>
            <h2>Pool Members</h2>
            <p>Score</p>
            <div>
              <button type="button" onClick={this.handleOpenModal}>
                Play Now!
              </button>
              <ReactModal
                isOpen={this.props.showModal}
                contentLabel="Guesses Submitted Successfully"
              >
                <form>
                  {this.props.matches.map((match, index) => {
                    const name = "match" + index;
                    const selectedMatchValue = this.state.guesses[match.id];
                    return (
                      <div key={match.id} className="row">
                        <label
                          className="radiobtn"
                          htmlFor={match.id + "-hw"}
                          onClick={() =>
                            this.handleSelect(match.id, "HOME_TEAM")
                          }
                        >
                          <input
                            id={match.id + "-hw"}
                            className="radiobtn__input"
                            type="radio"
                            value="HOME_TEAM"
                            name={name}
                            checked={selectedMatchValue === "HOME_TEAM"}
                          />
                          <span className="radiobtn__text">
                            {match.homeTeam.name}
                          </span>
                        </label>

                        <label
                          className="radiobtn"
                          htmlFor={match.id + "-dr"}
                          onClick={() => this.handleSelect(match.id, "DRAW")}
                        >
                          <input
                            id={match.id + "-dr"}
                            className="radiobtn__input"
                            type="radio"
                            value="DRAW"
                            name={name}
                            checked={selectedMatchValue === "DRAW"}
                          />
                          <span className="radiobtn__text">Draw</span>
                        </label>

                        <label
                          className="radiobtn"
                          htmlFor={match.id + "-aw"}
                          onClick={() =>
                            this.handleSelect(match.id, "AWAY_TEAM")
                          }
                        >
                          <input
                            id={match.id + "-aw"}
                            className="radiobtn__input"
                            type="radio"
                            value="AWAY_TEAM"
                            name={name}
                            checked={selectedMatchValue === "AWAY_TEAM"}
                          />
                          <span className="radiobtn__text">
                            {match.awayTeam.name}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                  <button onClick={this.handleCloseModal}>Play</button>
                </form>
              </ReactModal>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Pooldetail;
