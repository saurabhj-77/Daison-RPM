import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Link
  } from "@mui/material";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import dasionLogo from '../../../assests/img/dasionlogo.png';
  
  
  export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
  
    const navigate = useNavigate();
  
    const validate = () => {
      let valid = true;
      const newErrors = { email: "", password: "" };
  
      if (!email) {
        newErrors.email = "Email is required.";
        valid = false;
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        newErrors.email = "Enter a valid email address.";
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
  
    const handleLogin = async () => {
      if (validate()) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.userType || localStorage.getItem("role");
        // Simulated login call
        switch (userRole) {
          case "doctor":
            navigate("/doctor-dashboard");
            break;
          case "patient":
            navigate("/patient/home");
            break;
          default:
            throw new Error("Unauthorized role. Please contact support.");
        }
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          {/* <img src="/assets/img/dasionlogo.png" alt="dasionlogo" height={45} /> */}
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
          <Box mt={4} bgcolor="#1976d2" p={2} width="100%">
            <Typography variant="h5" color="white">
              Let's get you started wit Dasion
            </Typography>
          </Box>
  
          <Box component="form" mt={4} width="100%">
            <Typography variant="subtitle1" gutterBottom>
              Email Address *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={!!errors.email}
              helperText={errors.email}
            />
  
            <Typography variant="subtitle1" mt={3} gutterBottom>
              Password *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
  
            <Box textAlign="right" mt={1}>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "#1976d2" }}
                onClick={() => navigate("/unavailable")}
              >
                Forgot Password?
              </Typography>
            </Box>
  
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ borderRadius: 50, px: 5, py: 1.5 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
  
            <Box textAlign="center" mt={3}>
              <Typography variant="body2">Don't have an account?</Typography>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "#1976d2" }}
                onClick={() => navigate("/register")}
              >
                Register
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
  