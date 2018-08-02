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
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/choosepool" render={() => <Choosepool />} />
          <Route path="/createpool" render={() => <Createpool />} />
          <Route path="/joinpool" render={() => <Pool />} />
          <Route path="/pooldetail" render={() => <Pooldetail />} />
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
