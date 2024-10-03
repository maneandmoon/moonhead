import React from 'react';

function StylistCard({ stylist }) {
  return (
    <li className="stylist-card">
      <h3>{stylist.name}</h3>
      <p>Specialty: {stylist.specialty || 'No appointment available'}</p>
    </li>
  );
}

export default StylistCard;