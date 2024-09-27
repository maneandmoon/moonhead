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

const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Password confirmation is required"),
});

function SignupForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        }),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => {
              setErrors({ api: err.errors });
            });
          }
        });
    },
  });

  return (
    <BackgroundWrapper>
        <FormContainer>
            <FormTitle>Sign Up</FormTitle>
            <StyledForm onSubmit={formik.handleSubmit}>
        {/* <Label htmlFor="username">Username</Label> */}
        <StyledInput
          type="text"
          name="username"
          placeholder="Username"
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
          placeholder="Password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
      </StyledForm>

      <StyledForm>
        {/* <Label htmlFor="passwordConfirmation">Password Confirmation</Label> */}
        <StyledInput
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
        />
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (
          <ErrorMessage>{formik.errors.passwordConfirmation}</ErrorMessage>
        ) : null}
      </StyledForm>

      <StyledForm>
        <StyledButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
        </StyledButton>
      </StyledForm>

      <StyledForm>
        {formik.errors.api && formik.errors.api.map((err, index) => (
          <ErrorMessage key={index}>{err}</ErrorMessage>
        ))}

        </StyledForm>
      </FormContainer>
    </BackgroundWrapper>
  );
}

export default SignupForm;