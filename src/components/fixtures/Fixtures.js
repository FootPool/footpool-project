import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";
import Fixture from "./Fixture";

class Fixtures extends React.Component {
  constructor() {
    super();

    this.socket = io.connect("http://localhost:8080");
    this.socket.on("connect", data => {
      this.socket.emit("join", "hello world from client");
    });
    this.socket.on("message", data => console.log(data));
  }

  componentDidMount() {
    this.props.getFixtures();
  }

  render() {
    return (
      <div className="fixtures--container">
        <Header title="Fixtures" />
        <div className="fixtures--fixture-list">
          {this.props.matches.map(match => {
            return (
              <Fixture
                key={match.id}
                awayTeam={match.awayTeam.name}
                homeTeam={match.homeTeam.name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Fixtures;
