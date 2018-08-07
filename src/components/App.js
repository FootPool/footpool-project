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
          <Route path="/choosepool" component={Choosepool} />
          <Route path="/createpool" component={Createpool} />
          <Route path="/joinpool" component={Pool} />
          <Route path="/pooldetail" component={Pooldetail} />
          <Route path="/profile" component={Profile} />
          <Route path="/fixtures" component={Fixtures} />
          <Route path="/placeyourguess" component={PlaceYourGuess} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
