import React from 'react';
import formatTime from "./formatTime";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EditAppointmentForm({ appointment, updateAppointment, closeForm }) {
  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
  });

  // Generate time options in 15-minute increments
  const getTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 15, 30, 45]) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  return (
    <Formik
      initialValues={{
        date: appointment.date,
        time: appointment.time,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const updatedAppointment = { ...appointment, ...values };
        updateAppointment(updatedAppointment);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h3>Edit Appointment</h3>
          <div>
            <label>Date:</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
          </div>
          <br />
          <div>
            <label>Time:</label>
            <Field as="select" name="time">
              <option value="">Select a time</option>
              {getTimeOptions().map((timeOption) => (
                <option key={timeOption} value={timeOption}>{formatTime(timeOption)}</option>
              ))}
            </Field>
            <ErrorMessage name="time" component="div" style={{ color: 'red' }} />
          </div>
          <br />
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditAppointmentForm;
