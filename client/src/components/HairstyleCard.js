import React from 'react';

function HairstyleCard({ hairstyle }) {
  return (
    <li className="hairstyle-card">
      <h3>{hairstyle.name}</h3>
      <h4>Price: ${hairstyle.price}</h4>
      <img
        src={hairstyle.image || "https://smd-cms.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png"}
        alt={hairstyle.name}
        className="hairstyle-image"
      />
      {/* <p>Zodiac Sign: {hairstyle.zodiac}</p> */}
    </li>
  );
}

export default HairstyleCard;



