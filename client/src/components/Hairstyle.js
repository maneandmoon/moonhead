import React, { useEffect, useState } from 'react';
import HairstyleCard from './HairstyleCard';
import ZodiacSelector from './ZodiacSelector'; // Import your ZodiacSelector component

const Hairstyle = () => {
  const [hairstyles, setHairstyles] = useState([]);
  const [selectedZodiac, setSelectedZodiac] = useState('');

  useEffect(() => {
    fetch("http://localhost:5555/hairstyles")
      .then(res => res.json())
      .then(data => setHairstyles(data))
      .catch(error => console.error('Error fetching hairstyles:', error));
  }, []);

  // Filter hairstyles based on selected zodiac
  const filteredHairstyles = selectedZodiac
    ? hairstyles.filter(hairstyle => hairstyle.zodiac === selectedZodiac)
    : hairstyles;

  return (
    <div >
      <h1>Hairstyle List</h1>
      {/* <ZodiacSelector hairstyles={hairstyles} setSelectedZodiac={setSelectedZodiac} /> */}
      {filteredHairstyles.length > 0 ? (
        <ul className="hairstyle-list">
          {filteredHairstyles.map(hairstyle => (
            <HairstyleCard
              key={hairstyle.id}
              hairstyle={hairstyle}
            />
          ))}
        </ul>
      ) : (
        <p>No hairstyles found.</p>
      )}
    </div>
  );
};

export default Hairstyle;
