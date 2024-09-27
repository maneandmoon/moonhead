import React from 'react';

function AppointmentCard({ appointment, deleteAppointment }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        margin: "10px",
        padding: "10px",
        width: "300px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{appointment.id}</h3>  
      <h3>{appointment.user}</h3>
      <h3>{appointment.stylist}</h3>
      <h3>{appointment.hairstyle}</h3>
      <h3>{appointment.date}</h3>
      <p>{appointment.time}</p>

    {<button onClick={() => deleteAppointment(appoitnment.id)}>Delete</button>}

    </li>
  );
}


export default AppointmentCard;