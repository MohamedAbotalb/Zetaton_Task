import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};

    if (!email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      tempErrors.email = "Email is not valid";

    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters long";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSignIn = async () => {
    if (validate()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("User Logged in successfully!", {
          position: "top-right",
        });
        navigate("/");
      } catch (error) {
        console.log(error.message);
        toast.error("Wrong email or password", { position: "top-right" });
      }
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
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
