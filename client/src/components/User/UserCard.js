import React from 'react';
import formatTime from '../formatTime';
import formatDate from '../formatDate';


function UserCard({ user }) {
  return (
    <li className="user-card">
      <h3>Username: {user.username}</h3>
      <h4>Email: {user.email}</h4>
      <h4>Birthdate: {formatDate(user.birthdate)}</h4>
      <h3>Appointments:</h3>
      {user.appointments && user.appointments.length > 0 ? (
        <ul className="appointment-card">
          {user.appointments.map((appointment) => (
            <li key={appointment.id}>
              <h3>
                {formatDate(appointment.date)} at {formatTime(appointment.time)}
              </h3>

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
