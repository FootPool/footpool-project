import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";
import getFixtures from "../../services/getFixtures";

const DRAW = 0;

class Pooldetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      fixtures: undefined,
      guesses: {},
      user: "",
      pool: "",
      poolId: "",
      isValid: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sendBetsToDb = this.sendBetsToDb.bind(this);
    this.validateUserInPool = this.validateUserInPool.bind(this);
  }

  validateUserInPool(user, poolName) {
    fetch(`/api/validate/${user.id}/${poolName}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isValid: data.hasBets
        });
      });
  }

  componentDidMount() {
    this.setState(
      {
        user: this.props.user,
        pool: this.props.pool,
        poolId: this.props.poolId
      },
      () => {
        const user = this.state.user;
        const pool = this.state.pool;

        this.validateUserInPool(user, pool);
      }
    );
  }

  handleOpenModal() {
    getFixtures(this.props.week).then(data => {
      this.setState(() => {
        return {
          fixtures: data
        };
      });
    });
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    const user = this.props.user;
    const pool = this.props.pool;
    const guesses = this.state.guesses;

    Object.keys(this.state.guesses).length !== 10
      ? alert(
          "Yellow Card! Place your bets on ALL of the games before submitting."
        )
      : this.sendBetsToDb(pool, user, guesses);
  }

  sendBetsToDb(pool, user, guesses) {
    this.setState({ showModal: false });

    fetch("/api/placebet", {
      method: "POST",
      body: JSON.stringify({ user, pool, guesses }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          isValid: true
        });
      } else {
        alert("That hit the post (in a bad way).");
      }
    });
  }

  handleSelect(matchId, choice) {
    const guesses = { ...this.state.guesses, [matchId]: choice };
    this.setState({ guesses });
  }

  render() {
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
                <form>
                  {this.state.fixtures && this.state.fixtures.matches
                    ? this.state.fixtures.matches.map((match, index) => {
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
                              onClick={() =>
                                this.handleSelect(match.id, "DRAW")
                              }
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
                      })
                    : null}
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

// const Checkbox = (type, name, matchId, teamId, teamName, checked) => {
//   const id = matchId + "-" + type;
//   return (
//     <label
//       className="radiobtn"
//       htmlFor={id}
//       onClick={() => this.handleSelect(matchId, teamId)}
//     >
//       <input
//         id={id}
//         className="radiobtn__input"
//         type="radio"
//         value={teamId}
//         name={name}
//         checked={checked}
//       />
//       <span className="radiobtn__text">{teamName}</span>
//     </label>
//   );
// };

// <Checkbox
//   type="home"
//   name={name}
//   matchId={match.id}
//   teamId={match.homeTeam.id}
//   teamName={match.homeTeam.name}
//   checked={selectedMatchValue === match.homeTeam.id}
// />
// <Checkbox
//   type="home"
//   name={name}
//   matchId={match.id}
//   teamId={DRAW}
//   teamName="Draw"
//   checked={selectedMatchValue === DRAW}
// />
// <Checkbox
//   type="home"
//   name={name}
//   matchId={match.id}
//   teamId={match.awayTeam.id}
//   teamName={match.awayTeam.name}
//   checked={selectedMatchValue === match.awayTeam.id}
// />
