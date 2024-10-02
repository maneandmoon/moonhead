import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditAppointmentForm from './EditAppointmentForm';
import useAppointments from './useAppointments';

function EditAppointmentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { appointments, updateAppointment } = useAppointments();
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const appointmentToEdit = appointments.find(app => app.id === Number(id));
        if (appointmentToEdit) {
            setAppointment(appointmentToEdit);
        } else {
            setError("Appointment not found.");
        }
    }, [appointments, id]);

    const handleUpdate = (updatedAppointment) => {
        updateAppointment(updatedAppointment);
        navigate('/appointments');
    };

    const closeForm = () => {
        navigate('/appointments'); // Navigate back to appointments list
    };

    if (error) return <div>Error: {error}</div>;
    if (!appointment) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Appointment</h2>
            <EditAppointmentForm
                appointment={appointment}
                updateAppointment={handleUpdate}
                closeForm={closeForm}
            />
        </div>
    );
}

export default EditAppointmentPage;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import EditAppointmentForm from './EditAppointmentForm';
// import { AppointmentContext } from './context/AppointmentContext';

// function EditAppointmentPage({ updateAppointment }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { appointments, updateAppointment } = useContext(AppointmentContext);
//   const [appointment, setAppointment] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => { 
//     console.log(`Fetching appointment with ID: ${id}`); // Log the ID being fetched
//     fetch(`http://127.0.0.1:5555/appointments/${id}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch appointment');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched appointment data:", data); // Log the fetched data
//         setAppointment(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching appointment:", err); // Log errors
//         setError(err.message);
//       });
//   }, [id]);

// //   useEffect(() => {
// //     fetch(`http://127.0.0.1:5555/appointments/${id}`)
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error('Failed to fetch appointment');
// //         }
// //         return res.json();
// //       })
// //       .then((data) => setAppointment(data))
// //       .catch((err) => setError(err.message));
// //   }, [id]);

//     const handleUpdate = (updatedAppointment) => {
//         updateAppointment(updatedAppointment).then((data) => {
//         console.log("Updated appointment data:", data); // Log the updated appointment
    
//         // Update the appointments state
//         setAppointment((current) =>
//             current.map((appointment) =>
//             appointment.id === data.id ? data : appointment
//             )
//         );
    
//         // Navigate to the appointments list after the update
//         navigate('/appointments');
//         }).catch(err => {
//         console.error("Failed to update appointment:", err);
//         setError(err.message); // Optional: Handle errors
//         });
//     };
  

//     // const handleUpdate = (updatedAppointment) => {
//     //     updateAppointment(updatedAppointment).then((data) => {
//     //     console.log("Updated appointment data:", data); // Log the updated appointment
//     //     setAppointment((current) =>
//     //         current.map((appointment) =>
//     //         appointment.id === data.id ? data : appointment
//     //         )
//     //     );
//     //     });
//     // };
    

// //   const handleUpdate = (updatedAppointment) => {
// //     updateAppointment(updatedAppointment).then(() => {
// //       navigate('/appointments');
// //     });
// //   };
// //   const handleUpdate = (updatedAppointment) => {
// //     updateAppointment(updatedAppointment);
// //     navigate('/appointments'); // Navigate back to appointments list after updating
// //   };

//   const closeForm = () => {
//     navigate('/appointments'); // Navigate back to appointments list
//   };

//   if (error) return <div>Error: {error}</div>;
//   if (!appointment) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Edit Appointment</h2>
//       <EditAppointmentForm
//         appointment={appointment}
//         updateAppointment={handleUpdate}
//         closeForm={closeForm}
//       />
//     </div>
//   );
// }

// export default EditAppointmentPage;
