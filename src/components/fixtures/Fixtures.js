import React from "react";
import Header from "../header/Header";

class Fixtures extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch(
      "http://api.football-data.org/v2/competitions/2021/matches?matchday=1",
      {
        method: "GET",
        headers: {
          "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
        }
      }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => alert("RED CARD! I couldn't find the fixtures!"));
  }

  render() {
    return (
      <div className="fixtures--container">
        <Header title="Fixtures" />
        <div className="fixtures--fixture-list">
          <h2>Fixture List</h2>

          <p>Team A vs Team B</p>
          <p>Team C vs Team D</p>
          <p>Team E vs Team F</p>
          <p>Team G vs Team H</p>
          <p>Team I vs Team J</p>
          <p>Team K vs Team L</p>
        </div>
      </div>
    );
  }
}

export default Fixtures;
