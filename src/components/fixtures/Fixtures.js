import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";
import Fixture from "./Fixture";

class Fixtures extends React.Component {
  constructor() {
    super();

    this.state = {
      fixtures: [{}]
    };
  }

  componentDidMount() {
    this.props.getFixtures();
  }

  render() {
    console.log(this.props.matches);
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
    // }
    // return <div>loading</div>;
  }
}

export default Fixtures;
