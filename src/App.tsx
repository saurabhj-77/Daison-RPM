import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import LoginScreen from "./screens/login/Login";
import RegisterScreen from "./screens/register/Register";
import DoctorHomeDashboard from "./screens/doctorDashboard/DoctorDashboard";
import AddPatientsScreen from "./screens/addPatient/AddPatient";
import ViewPatientDetails from "./screens/viewPatients/ViewPatients";
// import SplashScreen from "./pages/SplashScreen";
// import DoctorHome from "./pages/DoctorHome";
// import LoginScreen from "./pages/LoginScreen";
// import PatientHome from "./pages/PatientHome";

function AuthenticationWrapper() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
console.log(user.firstName); // Access stored user data


  useEffect(() => {
    const initialize = async () => {
      const firebaseUser = { uid: "demo-user-id" }; // Replace with Firebase Auth currentUser
      const userProvider = await loadUser(firebaseUser.uid); // Simulated user load

      if (firebaseUser) {
        const type = (userProvider as { userType: string }).userType.toLowerCase();
        if (type === "doctor") navigate("/doctor");
        else navigate("/patient");
      } else {
        navigate("/login");
      }
      setLoading(false);
    };
    initialize();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return null;
}

async function loadUser(uid: string): Promise<{ userType: string }> {
  // Simulate a fetch from DB or Firebase
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ userType: "doctor" }); // Change to "patient" to test patient flow
    }, 1000);
  });
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<AuthenticationWrapper />} />
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/patient" element={<PatientHome />} /> */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/doctor-dashboard" element={<DoctorHomeDashboard />} />
        <Route path="/doctor-addpatient" element={<AddPatientsScreen />} />
        <Route path="/doctor-view-patient" element={<ViewPatientDetails />} />
      </Routes>
    </Router>
  );
}
