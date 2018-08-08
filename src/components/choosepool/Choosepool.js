import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";

class Choosepool extends React.Component {
  constructor() {
    super();

    this.state = {
      pools: []
    };
  }

  componentDidMount() {
    fetch("/displaypools", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          pools: data
        });
      });
  }

  render() {
    return (
      <div className="choosepool--container">
        <Header title="Choose Your Pool" />

        <div>
          <h3 className="choosepool--title">Your pools</h3>

          <div className="choosepool--pool-list">
            {this.state.pools.map(pool => {
              return (
                <div className="choosepool--pool-item">
                  <h3 key={pool.id}>{pool.poolname}</h3>
                  <button>JOIN POOL</button>
                </div>
              );
            })}
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
