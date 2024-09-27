import React, { useEffect, useState } from 'react';
import HairstyleCard from './HairstyleCard';

const Hairstyle = () => {
  const [hairstyles, setHairstyles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/hairstyles")
      .then(res => res.json())
      .then(data => setHairstyles(data));
  }, []);

  return (
    <div>
      <h1>Hairstyle List</h1>
      {hairstyles.length > 0 ? (
        <ul>
          {hairstyles.map(hairstyle => (
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