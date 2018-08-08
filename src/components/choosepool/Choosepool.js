import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";

class Choosepool extends React.Component {
  // state = {
  //   pools: []
  // };
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
    this.props.joinPoolDetails(poolId, poolName, week);

    window.location.pathname = "/pooldetail";
  };

  render() {
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
                    onClick={this.joinPool(pool.id, pool.poolname, pool.week)}
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
            {/* <Link to="/joinpool">
              <button type="button" className="choosepool--option-button">
                Join Pool
              </button> 
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Choosepool;
