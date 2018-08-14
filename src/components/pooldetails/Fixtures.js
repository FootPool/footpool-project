import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";
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
    console.log("username:", this.props.user);
    console.log("results: ", this.state.results);

    let leaders = [];

    if (this.state.bets) {
      //gets unique usernames
      var users = this.state.bets
        .map(bet => bet.username)
        .filter((value, index, self) => self.indexOf(value) === index);

      leaders = users.map(user => ({
        user,
        correctCount: 0
      }));
      leaders = leaders.sort(
        (leader1, leader2) => leader2.correctCount - leader1.correctCount
      );
    }

    // Working progress for counting correct bets

    this.state.bets.foreach(function(bet) {
      this.state.results.foreach(function(result) {
        let correctBets = [];
        if (
          bet.matchId === result.matchId &&
          bet.bet === "HOME_TEAM" &&
          result.home > results.away
        ) {
          return {
            ...correctBets,
            username: bet.username,
            counter: counter + 1
          };
        } else if (
          bet.matchId === result.matchId &&
          bet.bet === "AWAY_TEAM" &&
          result.away > results.home
        ) {
          counter++;
        } else if (
          bet.matchId === result.matchId &&
          bet.bet === "DRAW" &&
          result.home === results.away
        ) {
          counter++;
        }
      });
      return counter;
    });

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
          <table>
            <tbody>
              <tr>
                <th> User</th>
                <th />
                <th> Correct guesses</th>
              </tr>
              {leaders.map((leader, i) => {
                return (
                  <tr key={i}>
                    <td>{leader.user}</td>
                    <td />
                    <td>{leader.correctCount}</td>
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
