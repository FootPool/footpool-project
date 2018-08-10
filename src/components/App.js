import React from "react";
import ProfileContainer from "../containers/ProfileContainer";
import Footer from "./footer/Footer";
import FixturesContainer from "../containers/FixturesContainer";
import ChoosePoolContainer from "../containers/ChoosePoolContainer";
import Createpool from "./createpool/Createpool";
import PlaceYourGuess from "./placeyourguess/PlaceYourGuess";
import Pool from "./pool/Pool";
import PoolDetailContainer from "../containers/PoolDetailContainer";
import { Switch, Route } from "react-router-dom";

import "../../static/styles/style.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pool: "",
      week: "",
      poolId: "",
      user: {}
    };

    this.receiveNewPoolDetails = this.receiveNewPoolDetails.bind(this);
    this.joinPoolDetails = this.joinPoolDetails.bind(this);
  }

  componentDidMount() {
    const el = document.querySelector("#user");
    const { user } = JSON.parse(el.textContent);
    this.setState({ user });
  }

  receiveNewPoolDetails(poolId, pool, week) {
    this.setState({
      poolId,
      pool,
      week
    });
  }

  joinPoolDetails(poolId, pool, week) {
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
          <Route
            path="/choosepool"
            render={() => (
              <ChoosePoolContainer joinPoolDetails={this.joinPoolDetails} />
            )}
          />
          <Route
            path="/createpool"
            render={() => (
              <Createpool receiveNewPoolDetails={this.receiveNewPoolDetails} />
            )}
          />
          <Route path="/joinpool" component={Pool} />
          <Route path="/pooldetail" component={PoolDetailContainer} />
          <Route path="/profile" component={ProfileContainer} />
          <Route path="/fixtures" component={FixturesContainer} />
          <Route path="/placeyourguess" component={PlaceYourGuess} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
