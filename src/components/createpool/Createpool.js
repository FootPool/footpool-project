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

    this.addNewPool = this.addNewPool.bind(this);
  }

  addNewPool(event) {
    event.preventDefault();

    this.setState({ poolSaving: true });

    const poolName = document.querySelector("#pool-name").value;
    const matchWeek = document.querySelector("#match-week").value;

    console.log("Name: ", poolName, "Match: ", matchWeek);

    fetch("/pool", {
      method: "POST",
      body: JSON.stringify({ poolName, matchWeek }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        this.setState({ poolSaved: true });
        window.location.pathname = "/pooldetails";
      } else {
        alert("Sorry, your pool was offside. Try again.");
      }
    });
  }

  render() {
    if (this.state.poolSaved) return <Redirect to="/pooldetail" />;

    return (
      <div>
        <Header title="Create a Pool" />
        <div>Create Pool</div>
        <div>
          <form onSubmit={this.addNewPool}>
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
