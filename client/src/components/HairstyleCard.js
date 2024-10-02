// import React from 'react';

// function HairstyleCard({ hairstyle }) {
//   return (
//     <li
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "5px",
//         margin: "10px",
//         padding: "10px",
//         width: "300px",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//         textAlign: "center"
//       }}
//     >
//       <h3>{hairstyle.name}</h3>
//       <img
//         src={hairstyle.image || "https://smd-cms.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png"} 
//         alt={hairstyle.name}
//         style={{ width: "100%", borderRadius: "5px" }}
//       />
//       <h4 style={{ margin: "10px 0" }}>Price: ${hairstyle.price}</h4>
 
//     </li>
//   );
// }

// export default HairstyleCard;
import React from 'react';

function HairstyleCard({ hairstyle }) {
  return (
    <li className="border border-gray-300 rounded-lg shadow-md p-4 m-2 w-full max-w-xs mx-auto text-center transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold">{hairstyle.name}</h3>
      <img
        src={hairstyle.image || "https://smd-cms.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png"}
        alt={hairstyle.name}
        className="w-full rounded-lg mb-2"
      />
      <h4 className="text-lg mt-2">Price: ${hairstyle.price}</h4>
      {/* <p className="text-sm text-gray-500">Zodiac Sign: {hairstyle.zodiac}</p> */}
    </li>
  );
}

export default HairstyleCard;



