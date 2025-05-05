import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  FormHelperText,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dasionLogo from '../../../assests/img/dasionlogo.png';

export default function RegisterScreen() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors: typeof errors = {
      userType: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    let valid = true;

    if (!userType) {
      newErrors.userType = "Please select a user type.";
      valid = false;
    }
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name should contain only letters.";
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name should contain only letters.";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulated registration response
      const userCredential = {
        user: { uid: "demo-id" },
      };
  
      const userData = {
        uid: userCredential.user.uid,
        email,
        firstName,
        lastName,
        userType,
      };
  
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
  
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" mt={5}>
      <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center"
          }}
        >
         <Box component="img" src={dasionLogo} alt="dasion" sx={{ width: 40, height: 40, mr: 1 }} /> 
        {/* <Box component="img" src="/assets/img/dasionlogo.png" alt="dasion" sx={{ width: 40, height: 40, mr: 1 }} /> */}
          Dasion Smart RPM
        </Typography>
      </Box>
      <Box mt={3} mb={2} bgcolor="#0d47a1" color="white" p={2} borderRadius={1}>
        <Typography variant="h5">User Registration</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" error={!!errors.userType}>
          <InputLabel id="userType-label">Registering as *</InputLabel>
          <Select
            labelId="userType-label"
            value={userType}
            label="Registering as *"
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
          </Select>
          <FormHelperText>{errors.userType}</FormHelperText>
        </FormControl>

        <TextField
          label="First Name *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label="Last Name *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />

        <TextField
          label="Email Address *"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password *"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mt={3} mb={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ borderRadius: "50px", paddingY: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", fontWeight: 600, color: "#0d47a1" }}
            onClick={() => navigate("/")}
          >
            Login
          </Typography>
        </Box>
      </form>
    </Container>
  );
}
