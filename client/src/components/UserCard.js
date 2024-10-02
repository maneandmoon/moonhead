import React from 'react';
import formatTime from './formatTime';
import formatDate from './formatDate';

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
      <p>Birthdate: {formatDate(user.birthdate)}</p>
      <h4>Appointments:</h4>
      {user.appointments && user.appointments.length > 0 ? (
        <ul>
          {user.appointments.map((appointment) => (
            <li key={appointment.id}>
              <p>
                {formatDate(appointment.date)} at {formatTime(appointment.time)}
              </p>

              <p>
                Hairstyle: {appointment.hairstyle || 'Unknown'}
              </p>

              <p>
                Price: {appointment.price ? `$${appointment.price}` : 'Unknown'}
              </p>

              <p>
                Stylist: {appointment.stylist || 'Unknown'}
              </p>
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


