import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import LoginScreen from "./screens/auth/login/Login"
import RegisterScreen from "./screens/auth/register/Register";
import DoctorHomeDashboard from "./screens/doctor/doctorDashboard/DoctorDashboard";
import AddPatientsScreen from "./screens/doctor/addPatient/AddPatient";
import ViewPatientDetails from "./screens/doctor/viewPatients/ViewPatients";
import MeasurementHistory from "./screens/doctor/measurementHistory/MeasurementHistory";
import AddMeasurement from "./screens/doctor/addMeasurement/AddMeasurement";

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
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/doctor-dashboard" element={<DoctorHomeDashboard />} />
        <Route path="/doctor-addpatient" element={<AddPatientsScreen />} />
        <Route path="/doctor-view-patient/:id" element={<ViewPatientDetails />} />
        <Route
          path="/measurement-history/:patientId/:measurementType"
          element={<MeasurementHistory />}
        />
        <Route path="/add-measurement" element={<AddMeasurement />} />
      </Routes>
    </Router>
  );
}
