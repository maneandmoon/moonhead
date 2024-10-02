import { useContext } from 'react';
import { AppointmentContext } from './AppointmentContext';

const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error("useAppointments must be used within an AppointmentProvider");
    }
    return context;
};

export default useAppointments;
