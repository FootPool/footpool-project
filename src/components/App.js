import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header title="HomePage" />
        FootPool - Social Pool Guessing
        <Footer />
      </div>
    );
  }
}

export default App;
