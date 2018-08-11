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

    poolName === "" || matchWeek === undefined
      ? alert(
          "DISSENT! Fill out the pool name AND the match week or you're getting sent off!"
        )
      : this.props.addNewPool(poolName, matchWeek);
  }

  render() {
    if (this.props.poolSaved) return <Redirect to="/pooldetail" />;

    return (
      <div className="createpool--container">
        <Header title="Create a Pool" />
        <div>Create Pool</div>
        <div>
          <form onSubmit={this.validatePool}>
            <input id="pool-name" type="text" placeholder="Pool name" />
            <input id="match-week" type="text" placeholder="Starting week" />

            <button type="submit" className="submit-button">
              Submit Pool
            </button>
          </form>
        </div>
        {this.state.poolSaving ? <Loader /> : null}
      </div>
    );
  }
}

export default Createpool;
