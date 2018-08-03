import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";

class Createpool extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="createpool--container">
        <Header title="Create a Pool" />
        <form className="createpool-form">
          <input
            type="text"
            placeholder="Pool name"
            className="createpool--form-input"
          />
          <input
            type="text"
            placeholder="Duration"
            className="createpool--form-input"
          />
          <input
            type="text"
            placeholder="Starting week"
            className="createpool--form-input"
          />

          <Link to="/pooldetail">
            <button type="Submit" className="submit-button">
              Submit Pool
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Createpool;
