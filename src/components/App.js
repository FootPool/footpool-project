import React from "react";
import ProfileContainer from "../containers/ProfileContainer";
import Footer from "./footer/Footer";
import FixturesContainer from "../containers/FixturesContainer";
import ChoosePoolContainer from "../containers/ChoosePoolContainer";
import CreatePoolContainer from "../containers/CreatePoolContainer";
import PlaceYourGuess from "./placeyourguess/PlaceYourGuess";
import Pool from "./pool/Pool";
import PoolDetailContainer from "../containers/PoolDetailContainer";
import { Switch, Route } from "react-router-dom";

import "../../static/styles/style.scss";

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const el = document.querySelector("#user");
    const { user } = JSON.parse(el.textContent);
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/choosepool" component={ChoosePoolContainer} />
          <Route path="/createpool" component={CreatePoolContainer} />
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
