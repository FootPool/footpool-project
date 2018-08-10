import React from "react";
import Header from "../header/Header";
import { Link, Redirect } from "react-router-dom";

class Choosepool extends React.Component {
  componentDidMount() {
    this.props.fetchPools();
  }

  selectPool(pool) {
    this.props.joinPool(pool);
  }

  selectPool(pool) {
    this.props.joinPool(pool);
  }

  render() {
    if (this.props.selectedPoolId) {
      return <Redirect to={{ pathname: "/pooldetail" }} />;
    }

    return (
      <div className="choosepool--container">
        <Header title="Choose Your Pool" />

        <div>
          <h3 className="choosepool--title">Your pools</h3>

          <div className="choosepool--pool-list">
            {this.props.pools.map(pool => {
              return (
                <div
                  key={pool.id}
                  week={pool.week}
                  className="choosepool--pool-item"
                >
                  <h3>{pool.poolname}</h3>
                  <button type="button" onClick={() => this.selectPool(pool)}>
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
