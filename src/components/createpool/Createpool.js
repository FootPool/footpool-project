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
    this.addNewPool = this.addNewPool.bind(this);
  }

  poolDetailsReceiver(poolId, pool, week) {
    this.props.receivePoolDetails(poolId, pool, week);
  }

  validatePool(event) {
    event.preventDefault();

    const poolName = document.querySelector("#pool-name").value;
    const matchWeek = document.querySelector("#match-week").value;

    poolName === "" || matchWeek === undefined
      ? alert(
          "DISSENT! Fill out the pool name AND the match week or you're getting sent off!"
        )
      : this.addNewPool(poolName, matchWeek);
  }

  addNewPool(poolName, matchWeek) {
    this.setState({ poolSaving: true });

    fetch("/pool", {
      method: "POST",
      body: JSON.stringify({ poolName, matchWeek }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Sorry, your pool was offside. Try again.");
        }
      })
      .then(data => {
        this.setState(
          {
            poolSaved: true,
            poolName,
            matchWeek,
            poolId: data.poolId
          },
          () => this.poolDetailsReceiver(this.state.poolId, poolName, matchWeek)
        );
      })
      .catch(error => alert("Sorry, your pool was offside. Try again."));
  }

  render() {
    if (this.state.poolSaved) return <Redirect to="/pooldetail" />;

    return (
      <div>
        <Header title="Create a Pool" />
        <div>Create Pool</div>
        <div>
          <form onSubmit={this.validatePool}>
            <input id="pool-name" type="text" placeholder="Pool name" />
            <input id="match-week" type="text" placeholder="Starting week" />

            <button type="submit">Submit Pool</button>
          </form>
        </div>
        {this.state.poolSaving ? <Loader /> : null}
      </div>
    );
  }
}

export default Createpool;
