// import React, { useEffect, useState } from 'react';
// import HairstyleCard from './HairstyleCard';

// const Hairstyle = () => {
//   const [hairstyles, setHairstyles] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5555/hairstyles")
//       .then(res => res.json())
//       .then(data => setHairstyles(data))
//       .catch(error => console.error('Error fetching hairstyles:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Hairstyle List</h1>
//       {hairstyles.length > 0 ? (
//         <ul>
//           {hairstyles.map(hairstyle => (
//             <HairstyleCard
//               key={hairstyle.id}
//               hairstyle={hairstyle}
//               hairstylePrice={hairstyle.price}
//             />
//           ))}
//         </ul>
//       ) : (
//         <p>No hairstyles found.</p>
//       )}
//     </div>
//   );
// };

// export default Hairstyle;
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hairstyle List</h1>
      <ZodiacSelector hairstyles={hairstyles} setSelectedZodiac={setSelectedZodiac} />
      {filteredHairstyles.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHairstyles.map(hairstyle => (
            <HairstyleCard
              key={hairstyle.id}
              hairstyle={hairstyle}
            />
          ))}
        </ul>
      ) : (
        <p>No hairstyles found for this zodiac sign.</p>
      )}
    </div>
  );
};

export default Hairstyle;
