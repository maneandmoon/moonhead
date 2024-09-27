import React from 'react';

function HairstyleCard({ hairstyle }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        margin: "10px",
        padding: "10px",
        width: "300px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{hairstyle.name}</h3>
      <h3>{hairstyle.image}</h3>
    {/* <p>{user.appointment || 'No appointment available'}</p> */}
    </li>
  );
}

export default HairstyleCard;


