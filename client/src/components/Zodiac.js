import React from 'react';
import zodiacSigns from '../data/Zodiac';

function Zodiac() {
  return (
    <div>
      <li>
      <h2>Zodiac Signs</h2>
      <div className="zodiac-list" >
        {zodiacSigns.map((zodiac, index) => (
          <div key={index} className="zodiac-card">
            <h3>{zodiac.sign}</h3>
            <img src={zodiac.image} alt={zodiac.sign} />
            <h3>{zodiac.dates}</h3>
            <p>{zodiac.description}</p>
            <h3>Recommended Hairstyles:</h3>
            <ul>
              {zodiac.hairstyles.map((style, index) => (
                <li key={index}>{style}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </li>
    </div>
  );
}

export default Zodiac;

