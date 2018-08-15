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
    fetch(
      `http://api.football-data.org/v2/competitions/2021/matches?matchday=2`,
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
      this.setState({ results: data.scores, bets: data.bets });
    });
  }

  render() {
    console.log("bets: ", this.state.bets);
    console.log("results: ", this.state.results);

    let leaders = [];
    let userScores = {};

    if (this.state.bets) {
      this.state.bets.forEach(bet => {
        const result = this.state.results.find(result => {
          return result.matchId === bet.match_id;
        });
        if (bet.bet === "HOME_TEAM" && result.home > result.away) {
          userScores = Object.assign({}, userScores, {
            [bet.username]: userScores[bet.username]
              ? userScores[bet.username] + 1
              : 1
          });
        } else if (bet.bet === "AWAY_TEAM" && result.away > result.home) {
          userScores = Object.assign({}, userScores, {
            [bet.username]: userScores[bet.username]
              ? userScores[bet.username] + 1
              : 1
          });
        } else if (bet.bet === "DRAW" && result.home === result.away) {
          userScores = Object.assign({}, userScores, {
            [bet.username]: userScores[bet.username]
              ? userScores[bet.username] + 1
              : 1
          });
        }
      });

      leaders = Object.entries(userScores).map(user =>
        Object.assign({}, leaders, {
          username: user[0],
          correctCount: user[1]
        })
      );
      leaders = leaders.sort(
        (leader1, leader2) => leader2.correctCount - leader1.correctCount
      );
    }

    return (
      <div className="fixtures--container">
        <Header title="Fixtures" />
        <div className="fixtures--fixture-list">
          <h2>{this.props.pool.poolname}: Fixture List</h2>
          <table>
            <tbody>
              <tr>
                <th> Home Team</th>
                <th />
                <th> Score</th>
                <th> </th>
                <th> Away Team</th>
              </tr>
              {this.state.fixtures.matches.map((fixture, i) => {
                const relevantResult = this.state.results.find(
                  result => result.matchId === fixture.id
                );

                return (
                  <tr key={i}>
                    <td>{fixture.homeTeam.name}</td>
                    <td>{relevantResult ? relevantResult.home : 0}</td>
                    <td> : </td>
                    <td>{relevantResult ? relevantResult.away : 0}</td>
                    <td>{fixture.awayTeam.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                  <tr key={i}>
                    <td>{leader.username}</td>
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
