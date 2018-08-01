import React from "react";

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
              <button type="Submit">Play now!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Pooldetail;
