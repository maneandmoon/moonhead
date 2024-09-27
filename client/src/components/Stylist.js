
import React, { useEffect, useState } from 'react';
import StylistCard from './StylistCard';

const Stylist = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/stylists")
      .then(res => res.json())
      .then(data => setStylists(data));
  }, []);

  return (
    <div>
      <h1>Stylist List</h1>
      {stylists.length > 0 ? (
        <ul>
          {stylists.map(stylist => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
            />
          ))}
        </ul>
      ) : (
        <p>No stylists found.</p>
      )}
    </div>
  );
};

export default Stylist;