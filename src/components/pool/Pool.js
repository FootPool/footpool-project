import React from "react";

class Pool extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          <div>Pool name</div>
          <div>Pool members</div>
          <div>Join Pool</div>
          <div>
            <form>
              <div>
                <p>Pool 1</p>
                <p>Pool 2</p>
                <p>Pool 3</p>
                <p>Pool 4</p>
                <p>Pool 5</p>
              </div>
              <button type="Submit" onClick="alert('Hello I am alert')">Join!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Pool;
