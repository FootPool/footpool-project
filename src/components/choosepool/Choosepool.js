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

          <div className="choosepool--pool-list">
            <p className="choosepool--pool-item">Pool 1</p>
            <p className="choosepool--pool-item">Pool 2</p>
            <p className="choosepool--pool-item">Pool 3</p>
            <p className="choosepool--pool-item">Pool 4</p>
            <p className="choosepool--pool-item">Pool 5</p>
          </div>

          <div className="choosepool--option-buttons-container">
            <Link to="/createpool">
              <button type="button" className="choosepool--option-button">
                Create Pool
              </button>
            </Link>
            <Link to="/joinpool">
              <button type="button" className="choosepool--option-button">
                Join Pool
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Choosepool;
