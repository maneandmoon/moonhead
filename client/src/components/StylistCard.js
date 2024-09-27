import React from 'react';

function StylistCard({ stylist }) {
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
      <h3>{stylist.name}</h3>
      <p>{stylist.specialty || 'No appointment available'}</p>
    </li>
  );
}

export default StylistCard;