import React from "react";
import Profile from "./profile/Profile";
import Footer from "./footer/Footer";
import PlaceYourGuess from "./placeyourguess/PlaceYourGuess";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        FootPool - Social Pool Guessing
        <Profile />
        <PlaceYourGuess />
        <Footer />
      </div>
    );
  }
}

export default App;
