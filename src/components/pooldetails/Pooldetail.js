import React from "react";
import ReactModal from "react-modal";
import Header from "../header/Header";
import getFixtures from "../../services/getFixtures";

const DRAW = 0;

class Pooldetail extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      fixtures: undefined,
      guesses: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleOpenModal() {
    getFixtures().then(data => {
      this.setState(() => {
        console.log(data);
        return {
          fixtures: data
        };
      });
    });
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    Object.keys(this.state.guesses).length !== 10
      ? alert(
          "Yellow Card! Place your bets on ALL of the games before submitting."
        )
      : this.setState({ showModal: false });
    //Submit to database guesses state
  }

  componentDidMount() {}

  handleSelect(matchId, choice) {
    const guesses = { ...this.state.guesses, [matchId]: choice };
    this.setState({ guesses });
  }

  render() {
    console.log(this.state.guesses);
    return (
      <div>
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
                {this.state.fixtures && this.state.fixtures.matches
                  ? this.state.fixtures.matches.map((match, index) => {
                      const name = "match" + index;
                      const selectedMatchValue = this.state.guesses[match.id];
                      return (
                        <form action="">
                          <div className="row">
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
                        </form>
                      );
                    })
                  : null}
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
