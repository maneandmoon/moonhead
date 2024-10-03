import React from 'react';
import formatTime from './formatTime';
import formatDate from './formatDate';


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

// import React from 'react';
// import formatTime from './formatTime';
// import formatDate from './formatDate';

// function UserCard({ user }) {
//   return (
//     <li className="user-card p-4 border rounded-lg shadow-md mb-4">
//       <h3 className="font-semibold text-lg">Username: {user.username}</h3>
//       <h3 className="font-semibold text-lg">Email: {user.email}</h3>
//       <h3 className="font-semibold text-lg">Birthdate: {formatDate(user.birthdate)}</h3>
//       <h3 className="font-semibold text-lg mt-4">Appointments:</h3>

//       {user.appointments && user.appointments.length > 0 ? (
//         <ul className="mt-2">
//           {user.appointments.map((appointment) => (
//             <li key={appointment.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
//               <h4 className="font-semibold">
//                 {formatDate(appointment.date)} at {formatTime(appointment.time)}
//               </h4>
//               <p>
//                 <strong>Hairstyle:</strong> {appointment.hairstyle || 'Unknown'}
//               </p>
//               <p>
//                 <strong>Price:</strong> {appointment.price ? `$${appointment.price}` : 'Unknown'}
//               </p>
//               <p>
//                 <strong>Stylist:</strong> {appointment.stylist || 'Unknown'}
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No appointments available</p>
//       )}
//     </li>
//   );
// }

// export default UserCard;



