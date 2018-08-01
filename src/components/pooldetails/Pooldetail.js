import React from "react";
import { Link } from "react-router-dom";

class Pooldetail extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          <div>Pool Members</div>
          <div>Score</div>
          <div>
            <form>
              <div>
                <p>Member 1</p>
              </div>

              <Link to="/placeyourguess">
              <button type="Submit">
                Play now!
              </button>
          </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Pooldetail;
