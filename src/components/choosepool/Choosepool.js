import React from "react";
import Header from "../header/Header";
import { Link, Redirect } from "react-router-dom";

class Choosepool extends React.Component {
  constructor() {
    super();

    this.state = {
      pools: []
    };

    this.joinPool = this.joinPool.bind(this);
  }

  componentDidMount() {
    fetch("/api/displaypools", {
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

  joinPool = (poolId, poolName, week) => () => {
    this.setState({ poolId, poolName, week, poolSelected: true });
  };

  render() {
    if (this.state.poolSelected) {
      return (
        <Redirect
          to={{
            pathname: "/pooldetail",
            state: this.state
          }}
        />
      );
    }

    return (
      <div className="choosepool--container">
        <Header title="Choose Your Pool" />

        <div>
          <h3 className="choosepool--title">Your pools</h3>

          <div className="choosepool--pool-list">
            {this.state.pools.map(pool => {
              return (
                <div
                  key={pool.id}
                  week={pool.week}
                  className="choosepool--pool-item"
                >
                  <h3>{pool.poolname}</h3>
                  <button
                    type="button"
                    onClick={this.joinPool(
                      pool.id,
                      pool.poolname,
                      pool.match_week
                    )}
                  >
                    JOIN POOL
                  </button>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Choosepool;
