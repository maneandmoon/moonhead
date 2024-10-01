import React from 'react';

function ZodiacSelector({ hairstyles, setSelectedZodiac }) {
  const zodiacSigns = [...new Set(hairstyles.map(h => h.zodiac))]; // Unique zodiac signs

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Select Your Zodiac Sign</h2>
      <select
        onChange={(e) => setSelectedZodiac(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded"
      >
        <option value="">-- Choose a Sign --</option>
        {zodiacSigns.map((sign, index) => (
          <option key={index} value={sign}>{sign}</option>
        ))}
      </select>
    </div>
  );
}

export default ZodiacSelector;
