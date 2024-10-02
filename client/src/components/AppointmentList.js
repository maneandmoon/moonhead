import React from 'react';
import useAppointments from './useAppointments';
import AppointmentCard from './AppointmentCard';

function AppointmentList({ users, hairstyles, stylists }) {
  const { appointments } = useAppointments();

  return (
    <ul>
      {appointments.map(appointment => {
        const user = users.find(user => user.id === appointment.user_id) || { username: 'Unknown' };
        const hairstyle = hairstyles.find(hairstyle => hairstyle.id === appointment.hairstyle_id) || { name: 'Unknown' };
        const stylist = stylists.find(stylist => stylist.id === appointment.stylist_id) || { name: 'Unknown' };

        return (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            user={user}
            hairstyle={hairstyle}
            stylist={stylist}
          />
        );
      })}
    </ul>
  );
}

export default AppointmentList;
// import React, { useContext } from 'react';
// import { AppointmentContext } from './AppointmentContext';
// import AppointmentCard from './AppointmentCard';
// import useAppointments from './useAppointments';


// function AppointmentList({ users, hairstyles, stylists }) {
//     const { appointments } = useAppointments();
  
//     return (
//       <ul>
//         {appointments.map(appointment => {
//           // Extract individual IDs for user, hairstyle, and stylist
//           const user = users.find(user => user.id === appointment.user_id) || { username: 'Unknown' };
//           const hairstyle = hairstyles.find(hairstyle => hairstyle.id === appointment.hairstyle_id) || { name: 'Unknown' };
//           const stylist = stylists.find(stylist => stylist.id === appointment.stylist_id) || { name: 'Unknown' };
  
//           // Pass the individual IDs, not arrays
//           return (
//             <AppointmentCard
//               key={appointment.id}
//               currentAppointment={{
//                 ...appointment,
//                 user_id: appointment.user_id,
//                 hairstyle_id: appointment.hairstyle_id,
//                 stylist_id: appointment.stylist_id
//               }}
//               users={users}
//               hairstyles={hairstyles}
//               stylists={stylists}
//             />
//           );
//         })}
//       </ul>
//     );
//   }
  
// export default AppointmentList;
