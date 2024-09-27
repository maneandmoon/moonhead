import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { 
    FormContainer, 
    StyledForm, 
    StyledInput, 
    StyledButton, 
    FormTitle, 
    ErrorMessage, 
    BackgroundWrapper 
  } from './styles';
  
const LoginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

function LoginForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors({ api: err.errors }));
          }
        });
    },
  });

  return (
    <BackgroundWrapper>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <StyledForm onSubmit={formik.handleSubmit}>
      <StyledForm>
        {/* <Label htmlFor="username">Username</Label> */}
        <StyledInput
          type="text"
          name="username"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username ? (
          <ErrorMessage>{formik.errors.username}</ErrorMessage>
        ) : null}
      </StyledForm>

      <StyledForm>
        {/* <Label htmlFor="password">Password</Label> */}
        <StyledInput
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
      </StyledForm>

      <StyledForm>
        <StyledButton variant="fill" color="primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Login"}
        </StyledButton>
      </StyledForm>

      <StyledForm>
        {formik.errors.api && formik.errors.api.map((err, index) => (
          <ErrorMessage key={index}>{err}</ErrorMessage>
        ))}
      </StyledForm>

      </StyledForm>
      </FormContainer>
    </BackgroundWrapper>
  );
}

export default LoginForm;