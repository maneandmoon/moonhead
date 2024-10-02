import React from 'react';
import zodiacSigns from '../data/Zodiac';

function Zodiac() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Zodiac Signs</h2>
      <div className="flex overflow-x-auto space-x-4">
        {zodiacSigns.map((zodiac, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md min-w-[200px]">
            <img src={zodiac.image} alt={zodiac.sign} className="w-full h-32 object-cover rounded-t-lg" />
            <h3 className="text-xl font-semibold mt-2">{zodiac.sign}</h3>
            <p className="text-gray-600">{zodiac.dates}</p>
            <p className="mt-2">{zodiac.description}</p>
            <h4 className="mt-4 font-semibold">Recommended Hairstyles:</h4>
            <ul className="list-disc list-inside mt-1">
              {zodiac.hairstyles.map((style, index) => (
                <li key={index}>{style}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Zodiac;
