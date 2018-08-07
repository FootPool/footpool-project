import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header--container">
        <h1 className="header--title">{this.props.title}</h1>
      </div>
    );
  }
}
export default Header;
