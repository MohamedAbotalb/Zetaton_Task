import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};

    if (!email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      tempErrors.email = "Email is not valid";

    if (!password) tempErrors.password = "Password is required";
    else if (password.length <= 6)
      tempErrors.password = "Password must be at least 6 characters long";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSignIn = () => {
    if (validate()) {
      // TODO Handle sign-in logic here
      alert(`Sign In functionality not implemented yet.
Email: ${email}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        onClick={handleSignIn}
        variant="contained"
        color="primary"
        sx={{ my: 2, py: 1.5 }}
        fullWidth
      >
        Sign In
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
