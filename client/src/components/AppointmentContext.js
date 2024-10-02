// // src/context/AppointmentContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AppointmentContext = createContext();

// export const AppointmentProvider = ({ children }) => {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [updateLoading, setUpdateLoading] = useState(false);
//     const [addLoading, setAddLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState(null);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const res = await fetch("http://127.0.0.1:5555/appointments");
//                 if (!res.ok) throw new Error("Failed to fetch appointments");
//                 const data = await res.json();
//                 setAppointments(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAppointments();
//     }, []);

//     const updateAppointment = async (updatedAppointment) => { 
//         setErrorMessage(null);
//         setUpdateLoading(true);
//         console.log('Updating appointment with data:', updatedAppointment); // Log data being sent
    
//         try {
//             const response = await fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedAppointment),
//             });
    
//             console.log('Response status:', response.status); // Log response status
    
//             if (!response.ok) throw new Error('Failed to update appointment');
    
//             const data = await response.json();
//             console.log('Response data:', data); // Log the response data
    
//             setAppointments((current) => {
//                 const updatedAppointments = current.map((appointment) =>
//                     appointment.id === data.id ? { ...appointment, ...updatedAppointment } : appointment
//                 );
    
//                 // Log the updated appointment directly
//                 const updatedAppointmentData = updatedAppointments.find(appointment => appointment.id === data.id);
//                 console.log('Updated appointment data:', updatedAppointmentData);
                
//                 return updatedAppointments;
//             });
//         } catch (error) {
//             console.error('Error updating appointment:', error); // Log the error
//             setErrorMessage('Failed to update appointment.');
//             alert('Failed to update appointment.');
//         } finally {
//             setUpdateLoading(false);
//         }
//     };
    
//     // useEffect to log appointments when they change
//     useEffect(() => {
//         console.log('Updated appointments state:', appointments);
//     }, [appointments]);
    

//     // const updateAppointment = async (updatedAppointment) => {
//     //     setErrorMessage(null);
//     //     setUpdateLoading(true);

//     //     console.log('Updating appointment with data:', updatedAppointment); // Log data being sent
        
//     //     try {
//     //         const response = await fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
//     //             method: 'PATCH',
//     //             headers: { 'Content-Type': 'application/json' },
//     //             body: JSON.stringify(updatedAppointment),
//     //         });

//     //         console.log('Response status:', response.status); // Log response status

//     //         if (!response.ok) throw new Error('Failed to update appointment');
//     //         const data = await response.json();
//     //         console.log('Response data:', data); // Log the response data

//     //         setAppointments((current) =>
//     //             current.map((appointment) =>
//     //                 appointment.id === data.id ? data : appointment
//     //             )
//     //         );

//     //         console.log('Updated appointments:', appointments); // Log updated appointments

//     //     } catch (error) {
//     //         console.error('Error updating appointment:', error); // Log the error
//     //         setErrorMessage('Failed to update appointment.');
//     //         alert('Failed to update appointment.');
//     //     } finally {
//     //         setUpdateLoading(false);
//     //     }
//     // };

//     const addAppointment = async (newAppointment) => {
//         setErrorMessage(null);
//         setAddLoading(true);
//         try {
//             const response = await fetch("http://127.0.0.1:5555/appointments", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newAppointment),
//             });
//             if (!response.ok) throw new Error('Failed to book appointment');
//             const appointment = await response.json();
//             setAppointments((prev) => [...prev, appointment]);
//         } catch (error) {
//             console.error(error);
//             setErrorMessage("Failed to book appointment: " + error.message);
//             alert("Failed to book appointment: " + error.message);
//         } finally {
//             setAddLoading(false);
//         }
//     };

//     const deleteAppointment = async (id) => {
//         try {
//             const response = await fetch(`http://127.0.0.1:5555/appointments/${id}`, { method: 'DELETE' });
//             if (!response.ok) throw new Error("Failed to delete appointment");
//             setAppointments((current) => current.filter(app => app.id !== id));
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <AppointmentContext.Provider value={{ appointments, loading, error, updateAppointment, addAppointment, deleteAppointment }}>
//             {children}
//         </AppointmentContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchAppointments = async () => {
        setError(null); // Reset error state
        setLoading(true); // Set loading state
        try {
            const res = await fetch("http://127.0.0.1:5555/appointments");
            if (!res.ok) throw new Error("Failed to fetch appointments");
            const data = await res.json();
            setAppointments(data); // Update appointments state
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchAppointments(); // Fetch appointments on mount
    }, []);

    const updateAppointment = async (updatedAppointment) => { 
        setErrorMessage(null);
        setUpdateLoading(true);
        console.log('Updating appointment with data:', updatedAppointment); // Log data being sent
    
        try {
            const response = await fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedAppointment),
            });
    
            console.log('Response status:', response.status); // Log response status
    
            if (!response.ok) throw new Error('Failed to update appointment');
    
            const data = await response.json();
            console.log('Response data:', data); // Log the response data
    
            setAppointments((current) => {
                const updatedAppointments = current.map((appointment) =>
                    appointment.id === data.id ? { ...appointment, ...updatedAppointment } : appointment
                );
    
                // Log the updated appointment directly
                const updatedAppointmentData = updatedAppointments.find(appointment => appointment.id === data.id);
                console.log('Updated appointment data:', updatedAppointmentData);
                
                return updatedAppointments;
            });
        } catch (error) {
            console.error('Error updating appointment:', error); // Log the error
            setErrorMessage('Failed to update appointment.');
            alert('Failed to update appointment.');
        } finally {
            setUpdateLoading(false);
        }
    };

    const addAppointment = async (newAppointment) => {
        setErrorMessage(null);
        setAddLoading(true); // Indicates that an appointment is being added
        try {
            const response = await fetch("http://127.0.0.1:5555/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });
            if (!response.ok) throw new Error('Failed to book appointment');
            await response.json(); // Optional: can skip if not needed
            await fetchAppointments(); // Refresh the appointments list
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to book appointment: " + error.message);
            alert("Failed to book appointment: " + error.message);
        } finally {
            setAddLoading(false); // Set loading to false once the add operation is done
        }
    };

    const deleteAppointment = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/appointments/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Failed to delete appointment");
            setAppointments((current) => current.filter(app => app.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AppointmentContext.Provider value={{ appointments, loading, error, updateAppointment, addAppointment, deleteAppointment }}>
            {children}
        </AppointmentContext.Provider>
    );
};
