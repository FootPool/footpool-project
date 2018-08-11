import React from "react";
import io from "socket.io-client";
import Header from "../header/Header";

class Fixtures extends React.Component {
  constructor() {
    super();

    this.state = {
      fixtures: [{}]
    };
  }

  componentDidMount() {
    fetch(
      "http://api.football-data.org/v2/competitions/2021/matches?matchday=1",
      {
        method: "GET",
        headers: {
          "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
        }
      }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => alert("RED CARD! I couldn't find the fixtures!"));

    const socket = io.connect("http://localhost:8080");
    // socket.on("connect", data => {
    //   socket.emit("join", "hello world from client");
    // });
    socket.on("matchDetails", data => {
      // console.log(data);
      this.setState({ fixtures: [data] }, () =>
        console.log("this is the data", data)
      );
    });
  }

  render() {
    // if (this.state.fixtures) {
    return (
      <div className="fixtures--container">
        <Header title="Fixtures" />
        <div className="fixtures--fixture-list">
          <h2>Fixture List</h2>
          {this.state.fixtures.map(item => (
            <div>
              {item.gameId} : {item.gameId}
            </div>
          ))}
        </div>
      </div>
    );
    // }
    // return <div>loading</div>;
  }
}

export default Fixtures;
