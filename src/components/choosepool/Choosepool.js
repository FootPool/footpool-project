import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";

class Choosepool extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="choosepool--container">
        <Header title="Choose Your Pool" />

        <div>
          <h3 className="choosepool--title">Your pools</h3>

          <div className="choosepool--fixture-list">
            <p>Pool 1</p>
            <p>Pool 2</p>
            <p>Pool 3</p>
            <p>Pool 4</p>
            <p>Pool 5</p>
          </div>

          <div>
            <Link to="/createpool">
              <button type="button">Create Pool</button>
            </Link>
            <Link to="/joinpool">
              <button type="button">Join Pool</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Choosepool;
