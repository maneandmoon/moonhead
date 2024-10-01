import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginForm = ({ onLogin }) => {
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((user) => {
        onLogin(user);
      })
      .catch((err) => {
        setError(err.message);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBottom: '16px' }}>
      <div>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
          style={{ width: '100%', padding: '8px', margin: '4px 0' }}
        />
        {formik.errors.username && <div style={{ color: 'red' }}>{formik.errors.username}</div>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          style={{ width: '100%', padding: '8px', margin: '4px 0' }}
        />
        {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" style={{ padding: '10px 15px', color: '#fff', backgroundColor: '#D1782E', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;