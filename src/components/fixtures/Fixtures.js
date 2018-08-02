import React from "react";
import Header from "../header/Header";

class Fixtures extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header title="Fixtures" />
        <div>
          Fixture List
          <div>
            <p>Team A vs Team B</p>
            <p>Team C vs Team D</p>
            <p>Team E vs Team F</p>
            <p>Team G vs Team H</p>
            <p>Team I vs Team J</p>
            <p>Team K vs Team L</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Fixtures;
