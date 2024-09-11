import React from 'react';
import "../css/matchingCafe.css";

function Card(props) {
  const { cafes } = props;

  if (!cafes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <img src="images/coffee_info.png" width="300px" alt="Coffee" />
      <h4>{cafes.title}</h4>
      <p>{cafes.location.toLocaleString()}</p>
    </div>
  );
}

export default Card;
