import React from "react";
import Header from "../header/Header";
import { Redirect } from "react-router-dom";

const Loader = () => <div />;

class Createpool extends React.Component {
  constructor() {
    super();

    this.state = {
      poolSaving: false,
      poolSaved: false
    };

    this.validatePool = this.validatePool.bind(this);
  }

  validatePool(event) {
    event.preventDefault();

    const poolName = document.querySelector("#pool-name").value;
    const matchWeek = document.querySelector("#match-week").value;

    if (poolName === null || matchWeek === undefined) {
      alert(
        "DISSENT! Fill out the pool name AND the match week or you're getting sent off!"
      );
    } else {
      this.props.addNewPool(poolName, matchWeek);
      this.setState({ week: matchWeek });
    }
  }

  componentWillUnmount() {
    this.props.resetCreatePoolState();
  }

  render() {
    if (this.props.poolSaved) {
      return (
        <Redirect
          to={{
            pathname: "/pooldetail",
            state: { poolId: this.props.lastPoolId }
          }}
        />
      );
    }

    return (
      <div className="createpool--container">
        <Header title="Create a Pool" />
        <div className="form-container">
          <h3 className="createpool-title">Create Pool</h3>
          <form onSubmit={this.validatePool} className="choosepool--pool-list">
            <input
              id="pool-name"
              type="text"
              placeholder="Pool name"
              className="form-input"
            />
            <input
              id="match-week"
              type="number"
              step="1"
              min="1"
              max="36"
              placeholder="Starting week"
              className="form-input"
            />
            <div className="choosepool--option-buttons-container">
              <button type="submit" className="button submit-button">
                Submit Pool
              </button>
            </div>
          </form>
        </div>
        {this.state.poolSaving ? <Loader /> : null}
      </div>
    );
  }
}

export default Createpool;
