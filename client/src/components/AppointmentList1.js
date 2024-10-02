import React from 'react';
import AppointmentCard from './AppointmentCard';
// import { useAppointments } from './AppointmentContext';
import useAppointments from './useAppointments';


function AppointmentList( { users, stylists, hairstyles }) {
    const { appointments, deleteAppointment } = useAppointments();

    return (
        <ul>
            {appointments.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    users={users} // Pass users here
                    hairstyles={hairstyles} // Pass hairstyles here
                    stylists={stylists} // Pass stylists here
                    deleteAppointment={deleteAppointment}
                />
            ))}
        </ul>
    );
}

export default AppointmentList;

// // src/AppointmentList.js
// import React, { useContext } from 'react';
// import AppointmentCard from './AppointmentCard';
// import { AppointmentContext } from './context/AppointmentContext';

// function AppointmentList() {
//     const { appointments, deleteAppointment } = useContext(AppointmentContext);

//     return (
//         <ul>
//             {appointments.map((appointment) => (
//                 <AppointmentCard
//                     key={appointment.id}
//                     appointment={appointment}
//                     deleteAppointment={deleteAppointment}
//                 />
//             ))}
//         </ul>
//     );
// }

// export default AppointmentList;

// import React from 'react';
// import AppointmentCard from './AppointmentCard';

// function AppointmentList({ appointments, deleteAppointment, updateAppointment, users, hairstyles, stylists }) {
//   return (
//     <ul>
//       {appointments.map((appointment) => (
//         <AppointmentCard
//           key={appointment.id}
//           appointment={appointment}
//           users={users}
//           hairstyles={hairstyles}
//           stylists={stylists}
//           deleteAppointment={deleteAppointment}
//           updateAppointment={updateAppointment}
          
//         />
//       ))      
//       }
//     </ul>
//   );
// }

// export default AppointmentList;

