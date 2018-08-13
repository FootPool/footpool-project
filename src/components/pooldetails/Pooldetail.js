import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";
import Fixtures from "./fixtures";
import { Redirect } from "react-router-dom";

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

    if (this.props.pool) {
      this.props.validateUserInPool(this.props.user.id, this.props.pool.id);
    }
  }

  handleOpenModal() {
    this.props.getFixtures(this.props.pool.match_week);
  }

  handleCloseModal() {
    const userId = this.props.user.id;
    const poolId = this.props.pool.id;
    const guesses = this.state.guesses;

    if (Object.keys(this.state.guesses).length !== 10) {
      alert(
        "Yellow Card! Place your bets on ALL of the games before submitting."
      );
    } else {
      this.props.sendBetsToDb(poolId, userId, guesses);
    }
  }

  handleSelect(matchId, choice) {
    const guesses = { ...this.state.guesses, [matchId]: choice };
    this.setState({ guesses });
  }

  render() {
    if (!this.props.pool) {
      return <Redirect to="/choosepool" />;
    }

    if (this.props.isValid) {
      return (
        <Fixtures
          user={this.props.user}
          matches={this.props.matches}
          pool={this.props.pool}
        />
      );
    } else {
      return (
        <div className="choosepool--container">
          <Header title="Pool Details" />
          <div className="form-container">
            <h2 className="choosepool--title">
              {this.props.poolId} {this.props.week}
            </h2>
            <h2 className="choosepool--title">Pool Members</h2>
            <p>Score</p>
            <div className="choosepool--option-buttons-container">
              <button
                type="button"
                onClick={this.handleOpenModal}
                className="button option-button"
              >
                Play Now!
              </button>
              <ReactModal
                isOpen={this.props.showModal}
                contentLabel="Guesses Submitted Successfully"
                className="modal-container"
              >
                <div className="modal-form">
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
                  <button
                    onClick={this.handleCloseModal}
                    className="button submit-button"
                  >
                    Play
                  </button>
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Pooldetail;
