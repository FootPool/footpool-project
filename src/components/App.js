import React from "react";
import ProfileContainer from "../containers/ProfileContainer";
import Footer from "./footer/Footer";
import ChoosePoolContainer from "../containers/ChoosePoolContainer";
import CreatePoolContainer from "../containers/CreatePoolContainer";
import PoolDetailContainer from "../containers/PoolDetailContainer";
import { Switch, Route, Redirect } from "react-router-dom";

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
          <Redirect exact path="/index" to="/choosepool" />
          <Route path="/choosepool" component={ChoosePoolContainer} />
          <Route path="/createpool" component={CreatePoolContainer} />
          <Route path="/pooldetail" component={PoolDetailContainer} />
          <Route path="/profile" component={ProfileContainer} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
