import React from "react";

function Fixture({ awayTeam, homeTeam }) {
  return (
    <div className="fixture">
      <h2>
        {homeTeam} vs. {awayTeam}
      </h2>
    </div>
  );
}

export default Fixture;
