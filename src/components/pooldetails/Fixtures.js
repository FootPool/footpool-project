import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";
import { runInThisContext } from "vm";

class Fixtures extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [{}],
      fixtures: { matches: [] },
      minutesPlayed: 0
    };
  }

  componentDidMount() {
    console.log(this.props);
    fetch(
      `http://api.football-data.org/v2/competitions/2021/matches?matchday=${
        this.props.pool.match_week
      }`,
      {
        headers: {
          "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          fixtures: data
        });
      })
      .catch(error => alert("RED CARD! I couldn't find the fixtures!"));

    const socket = io.connect("http://localhost:8080");

    socket.on("matchDetails", data => {
      this.setState(
        { results: data.scores, bets: data.bets, minutesPlayed: counter },
        () => console.log("this is the data", data)
      );
    });
  }

  render() {
    var leaders = [];

    if (this.state.bets) {
      var users = this.state.bets
        .map(bet => bet.username)
        .filter((value, index, self) => self.indexOf(value) === index);

      leaders = users.map(user => ({
        user,
        correctCount: this.state.bets.filter(
          bet => bet.username === user && bet.bet === bet.winner
        ).length
      }));
      leaders = leaders.sort(
        (leader1, leader2) => leader2.correctCount - leader1.correctCount
      );
    }
    return (
      <div className="fixtures--container">
        <Header title="Fixtures" />
        <div className="fixtures--fixture-list">
          <h3 className="createpool-title">
            {this.props.pool.poolname}: Scores
          </h3>
          <h2>Leaderboard</h2>
          <table className="form-container">
            <tbody className="fixture-list__current-scores">
              <tr className="fixture--table-header">
                <th> User</th>
                <th />
                <th> Correct guesses</th>
              </tr>
              {leaders.map((leader, i) => {
                return (
                  <tr key={i} className="fixture--table-results">
                    <td className="fixture--table-team-name">{leader.user}</td>
                    <td />
                    <td className="fixture--table-score">
                      {leader.correctCount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ticker-wrap">
          <div className="ticker-minutes-played">
            {this.state.minutesPlayed}"
          </div>
          <div className="ticker">
            {this.state.fixtures.matches.map((fixture, i) => {
              const relevantResult = this.state.results.find(
                result => result.matchId === fixture.id
              );
              return (
                <div key={i} className="ticker__item">
                  <p>
                    {fixture.homeTeam.name + "  "}
                    {relevantResult ? relevantResult.home : 0}:
                    {relevantResult ? relevantResult.away : 0}
                    {"  " + fixture.awayTeam.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Fixtures;
