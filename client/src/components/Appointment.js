import React from 'react';
import { useFormik } from 'formik';

function Appointment() {
  const formik = useFormik({
    initialValues: {
      date: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="date"
        name="date"
        onChange={formik.handleChange}
        value={formik.values.date}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Appointment;
