import React from "react";
import { Link } from "react-router-dom";

class Createpool extends React.Component {
    constructor() {
      super();
    }
      render() {
          return (
            <div>
            <div>Create Pool</div>
                <div>
                    <form>
                        <input type="text" placeholder="Pool name" />
                        <input type="text" placeholder="Duration" />
                        <input type="text" placeholder="Starting week" />

                        <Link to="/pooldetail">
                            <button type="Submit">
                                Submit Pool
                            </button>
                        </Link>
                        
                    </form>
                </div>
            </div>

                )
      }
}

export default Createpool;

