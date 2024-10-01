import React from "react";
import { Link } from 'react-router-dom';
import Zodiac from './Zodiac';

function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Moonhead</h1>
        <p className="text-lg">Your go-to destination for lunar-inspired hairstyles and appointments!</p>
      </section>

      <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Moon Phases</h2>
        <p className="mb-4">The phases of the moon influence your energy, mood, and even your hair! Explore our lunar-based styling suggestions to match your look with the current moon phase.</p>
        <ul className="list-disc pl-5">
          <li><strong>New Moon:</strong> Fresh starts, perfect for bold new hairstyles.</li>
          <li><strong>Full Moon:</strong> Amplified energy—time for elaborate and glamorous styles.</li>
          <li><strong>Waxing Crescent:</strong> Growth and renewal, ideal for nourishing hair treatments.</li>
          <li><strong>Waning Gibbous:</strong> Reflection and trimming—cutting hair to release old energy.</li>
        </ul>
      </section>

      <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Hairstyle Options</h2>
        <p className="mb-4">We offer a range of hairstyles, whether you're inspired by the moon, zodiac, or the latest trends:</p>
        <ul className="list-disc pl-5">
          <li><strong>Lunar Pixie:</strong> A sharp, short cut perfect for a fresh look.</li>
          <li><strong>Celestial Waves:</strong> Flowing waves that reflect the moon’s subtle beauty.</li>
          <li><strong>Solar Braids:</strong> Intricate braids for those who want to channel cosmic energy.</li>
          <li><strong>Zodiac Curls:</strong> Defined curls based on your zodiac sign's unique personality.</li>
        </ul>
      </section>

      {/* Integrated Zodiac Section */}
      <Zodiac />

      <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Book Your Appointment</h2>
        <p className="mb-4">Ready to transform your look? Book an appointment with one of our stylists and let Moonhead guide your next hairstyle.</p>
        <Link to="/appointments/new">
          <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200">
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;

// import React from "react";
// import './Home.css';
// import { Link } from 'react-router-dom'

// function Home() {
//   return (
//     <div className="home-container">
//       <section className="intro">
//         <h1>Welcome to Moonhead</h1>
//         <p>Your go-to destination for lunar-inspired hairstyles and appointments!</p>
//       </section>

//       <section className="moon-phase-section">
//         <h2>Moon Phases</h2>
//         <p>The phases of the moon influence your energy, mood, and even your hair! Explore our lunar-based styling suggestions to match your look with the current moon phase.</p>
//         <ul>
//           <li><strong>New Moon:</strong> Fresh starts, perfect for bold new hairstyles.</li>
//           <li><strong>Full Moon:</strong> Amplified energy—time for elaborate and glamorous styles.</li>
//           <li><strong>Waxing Crescent:</strong> Growth and renewal, ideal for nourishing hair treatments.</li>
//           <li><strong>Waning Gibbous:</strong> Reflection and trimming—cutting hair to release old energy.</li>
//         </ul>
//       </section>

//       <section className="hairstyle-options">
//         <h2>Hairstyle Options</h2>
//         <p>We offer a range of hairstyles, whether you're inspired by the moon, zodiac, or the latest trends:</p>
//         <ul>
//           <li><strong>Lunar Pixie:</strong> A sharp, short cut perfect for a fresh look.</li>
//           <li><strong>Celestial Waves:</strong> Flowing waves that reflect the moon’s subtle beauty.</li>
//           <li><strong>Solar Braids:</strong> Intricate braids for those who want to channel cosmic energy.</li>
//           <li><strong>Zodiac Curls:</strong> Defined curls based on your zodiac sign's unique personality.</li>
//         </ul>
//       </section>

//       <section className="appointment-section">
//         <h2>Book Your Appointment</h2>
//         <p>Ready to transform your look? Book an appointment with one of our stylists and let Moonhead guide your next hairstyle.</p>
//         <Link to="/appointments/new">
//           <button className="book-button">Book Now</button>
//         </Link>
//       </section>
//     </div>
//   );
// }

// export default Home;
// import React from "react";
// import { Link } from 'react-router-dom';
// import Zodiac from './Zodiac';

// function Home() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto text-gray-800">
//       <section className="text-center mb-8">
//         <h1 className="text-4xl font-bold mb-2">Welcome to Moonhead</h1>
//         <p className="text-lg">Your go-to destination for lunar-inspired hairstyles and appointments!</p>
//       </section>

//       <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Moon Phases</h2>
//         <p className="mb-4">The phases of the moon influence your energy, mood, and even your hair! Explore our lunar-based styling suggestions to match your look with the current moon phase.</p>
//         <ul className="list-disc pl-5">
//           <li><strong>New Moon:</strong> Fresh starts, perfect for bold new hairstyles.</li>
//           <li><strong>Full Moon:</strong> Amplified energy—time for elaborate and glamorous styles.</li>
//           <li><strong>Waxing Crescent:</strong> Growth and renewal, ideal for nourishing hair treatments.</li>
//           <li><strong>Waning Gibbous:</strong> Reflection and trimming—cutting hair to release old energy.</li>
//         </ul>
//       </section>

//       <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Hairstyle Options</h2>
//         <p className="mb-4">We offer a range of hairstyles, whether you're inspired by the moon, zodiac, or the latest trends:</p>
//         <ul className="list-disc pl-5">
//           <li><strong>Lunar Pixie:</strong> A sharp, short cut perfect for a fresh look.</li>
//           <li><strong>Celestial Waves:</strong> Flowing waves that reflect the moon’s subtle beauty.</li>
//           <li><strong>Solar Braids:</strong> Intricate braids for those who want to channel cosmic energy.</li>
//           <li><strong>Zodiac Curls:</strong> Defined curls based on your zodiac sign's unique personality.</li>
//         </ul>
//       </section>

//       <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Book Your Appointment</h2>
//         <p className="mb-4">Ready to transform your look? Book an appointment with one of our stylists and let Moonhead guide your next hairstyle.</p>
//         <Link to="/appointments/new">
//           <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200">
//             Book Now
//           </button>
//         </Link>
//       </section>
//     </div>
//   );
// }

// export default Home;
