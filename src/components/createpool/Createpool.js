import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";

class Createpool extends React.Component {
  constructor() {
    super();

    this.createPool = this.createPool.bind(this);
  }

  createPool(event) {
    event.preventDefault();

    const poolName = document.querySelector("#pool-name").value;
    const matchWeek = document.querySelector("#match-week").value;

    fetch("/createpool", {
      method: "POST",
      body: JSON.stringify({ poolName, matchWeek }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      if (response.status === 200) {
        window.location.pathname = "/index";
      } else {
        alert("Sorry, your pool was offside. Try again.");
      }
    });
  }

  render() {
    return (
      <div>
        <Header title="Create a Pool" />
        <div>Create Pool</div>
        <div>
          <form>
            <input type="text" placeholder="Pool name" />
            <input type="text" placeholder="Duration" />
            <input type="text" placeholder="Starting week" />

            <Link to="/pooldetail">
              <button type="submit">Submit Pool</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Createpool;
