import React from 'react';

function UserCard({ user }) {
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
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Birthdate: {user.birthdate}</p>
      <h4>Appointments:</h4>
      {user.appointments && user.appointments.length > 0 ? (
        <ul>
          {user.appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.date} at {appointment.time} - {appointment.hairstyle} with {appointment.stylist}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments available</p>
      )}
    </li>
  );
}

export default UserCard;