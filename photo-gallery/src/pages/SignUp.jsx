import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};

    if (!firstName) tempErrors.firstName = "First Name is required";
    else if (firstName.length <= 2)
      tempErrors.firstName = "First Name should be more than 2 characters";

    if (!lastName) tempErrors.lastName = "Last Name is required";
    else if (lastName.length <= 2)
      tempErrors.lastName = "Last Name should be more than 2 characters";

    if (!email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      tempErrors.email = "Email is not valid";

    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters long";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            firstName,
            lastName,
            email,
            favorites: [],
          });
        }
        toast.success("User Registered Successfully!", {
          position: "top-right",
        });
        navigate("/signin");
      } catch (error) {
        toast.error("Email is already in use", { position: "top-right" });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ mx: "auto" }}>
        Sign Up
      </Typography>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
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
        onClick={handleSignUp}
        sx={{ my: 2, py: 1.5 }}
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid item>
          Already have an account? <Link to="/signin">Sign in</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
