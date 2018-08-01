import React from "react";
import Footer from "./footer/Footer";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        FootPool - Social Pool Guessing
        <Footer />
      </div>
    );
  }
}

export default App;
