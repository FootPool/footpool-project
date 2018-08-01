import React from "react";
import Footer from "./footer/Footer";
import Choosepool from "./choosepool/Choosepool";
import Createpool from "./createpool/Createpool";
import Pool from "./pool/Pool";
import Pooldetail from "./pooldetails/Pooldetail";
import { Switch, Route } from "react-router-dom";

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
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
