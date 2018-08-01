import React from "react";
import { Link } from "react-router-dom";

class Choosepool extends React.Component {
    constructor() {
      super();
    }

      render() {
          return (
              <div>
                <div>
                Your pools
                </div>
            <div>
            <div>
              <p>Pool 1</p>
              <p>Pool 2</p>
              <p>Pool 3</p>
              <p>Pool 4</p>
              <p>Pool 5</p>
            </div>
            </div>

              <div>
                <Link to="/createpool">
                    <button type="button">
                        Create Pool
                    </button>
                </Link>
                <Link to="/joinpool">
                    <button type="button">
                        Join Pool
                    </button>
                </Link>
              </div>
            </div>

                )
      }
}

export default Choosepool;

