import React from "react";
import { Link } from 'react-router-dom';
import Zodiac from './Zodiac';

function Home() {
  return (
    <div>
      <section>
        <h1>Welcome to Moonhead</h1>
        <p>Your go-to destination for lunar-inspired hairstyles and appointments!</p>
      </section>

      <section>
        <h2>Moon Phases</h2>
        <p>The phases of the moon influence your energy, mood, and even your hair! Explore our lunar-based styling suggestions to match your look with the current moon phase.</p>

          <li><strong>New Moon:</strong> Fresh starts, perfect for bold new hairstyles.</li>
          <li><strong>Full Moon:</strong> Amplified energy—time for elaborate and glamorous styles.</li>
          <li><strong>Waxing Crescent:</strong> Growth and renewal, ideal for nourishing hair treatments.</li>
          <li><strong>Waning Gibbous:</strong> Reflection and trimming—cutting hair to release old energy.</li>
      </section>

      <section>
        <h2>Hairstyle Options</h2>
        <p>We offer a range of hairstyles, whether you're inspired by the moon, zodiac, or the latest trends:</p>
    
          <li><strong>Lunar Pixie:</strong> A sharp, short cut perfect for a fresh look.</li>
          <li><strong>Celestial Waves:</strong> Flowing waves that reflect the moon’s subtle beauty.</li>
          <li><strong>Solar Braids:</strong> Intricate braids for those who want to channel cosmic energy.</li>
          <li><strong>Zodiac Curls:</strong> Defined curls based on your zodiac sign's unique personality.</li>

      </section>

      <section>
        <h2>Book Your Appointment</h2>
        <p>Ready to transform your look? Book an appointment with one of our stylists and let Moonhead guide your next hairstyle.</p>
        <Link to="/appointments/new">
          <button>
            Book Now
          </button>
        </Link>
      </section>

      <section>
        <h2>Hairstyles based on Zodiac Signs</h2>
        <div>
          <Zodiac />
        </div>
      </section> 
    </div>
  );
}

export default Home;