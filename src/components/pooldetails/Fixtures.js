import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";
import Fixture from "./Fixture";
import { runInThisContext } from "vm";

class Fixtures extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [{}],
      fixtures: { matches: [] }
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
    // socket.on("connect", data => {
    //   socket.emit("join", "hello world from client");
    // });
    socket.on("matchDetails", data => {
      // console.log(data);
      this.setState({ results: data.scores, bets: data.bets }, () =>
        console.log("this is the data", data)
      );
    });
  }

  render() {
    // if (this.state.fixtures) {
    var leaders = [];

    if (this.state.bets) {
      //gets unique usernames
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
          <h2>{this.props.pool.poolname}: Scores</h2>
          <table>
            <tbody className="fixture-list__current-scores">
              <tr className="fixture--table-header">
                <th>Home Team</th>
                <th />
                <th>Score</th>
                <th />
                <th>Away Team</th>
              </tr>
              {this.state.fixtures.matches.map((fixture, i) => {
                const relevantResult = this.state.results.find(
                  result => result.matchId === fixture.id
                );

                return (
                  <tr key={i} className="fixture--table-results">
                    <td className="fixture--table-team-name">
                      {fixture.homeTeam.name}
                    </td>
                    <td className="fixture--table-score">
                      {relevantResult ? relevantResult.home : 0}
                    </td>
                    <td className="fixture-colon"> : </td>
                    <td className="fixture--table-score">
                      {relevantResult ? relevantResult.away : 0}
                    </td>
                    <td className="fixture--table-team-name">
                      {fixture.awayTeam.name}
                    </td>
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
      </div>
    );
    // }
    // return <div>loading</div>;
  }
}

export default Fixtures;
