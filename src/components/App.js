import React from "react";
import Profile from "./profile/Profile";
import Footer from "./footer/Footer";
import Fixtures from "./fixtures/Fixtures";
import Choosepool from "./choosepool/Choosepool";
import Createpool from "./createpool/Createpool";
import PlaceYourGuess from "./placeyourguess/PlaceYourGuess";
import Pool from "./pool/Pool";
import Pooldetail from "./pooldetails/Pooldetail";
import { Switch, Route } from "react-router-dom";

import "../../static/styles/style.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pool: "",
      week: "",
      poolId: "",
      user: window.user
    };

    this.receivePoolDetails = this.receivePoolDetails.bind(this);
  }

  receivePoolDetails(poolId, pool, week) {
    this.setState({
      poolId,
      pool,
      week
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/choosepool" render={() => <Choosepool />} />
          <Route
            path="/createpool"
            render={() => (
              <Createpool receivePoolDetails={this.receivePoolDetails} />
            )}
          />
          <Route path="/joinpool" render={() => <Pool />} />
          <Route
            path="/pooldetail"
            render={() => (
              <Pooldetail
                pool={this.state.pool}
                week={this.state.week}
                user={this.state.user}
                poolId={this.state.poolId}
              />
            )}
          />
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/fixtures" render={() => <Fixtures />} />
          <Route path="/placeyourguess" render={() => <PlaceYourGuess />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
