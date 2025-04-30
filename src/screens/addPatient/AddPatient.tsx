import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Sample doctorId from current logged in doctor (simulate)
const currentDoctorId = "doctor123";

// Mock patient data
const initialPatients = [
  { id: "p1", firstName: "John", lastName: "Doe", email: "john@example.com", doctor: "" },
  { id: "p2", firstName: "Jane", lastName: "Smith", email: "jane@example.com", doctor: "" },
];

export default function AddPatientsScreen() {
  const [patients, setPatients] = useState(initialPatients);

  const addPatientToDoctor = (id: string) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, doctor: currentDoctorId } : p
    );
    setPatients(updated);
  };

  const unassignedPatients = patients.filter((p) => p.doctor === "");

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box bgcolor="#1976d2" color="white" p={3} borderRadius={2} mb={3}>
        <Typography variant="h5">Add Patients</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Available Patients
      </Typography>

      {unassignedPatients.length === 0 ? (
        <Typography color="textSecondary">No patients available</Typography>
      ) : (
        <List>
          {unassignedPatients.map((patient) => (
            <Paper
              key={patient.id}
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle1">
                  {patient.firstName} {patient.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {patient.email}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => addPatientToDoctor(patient.id)}
              >
                Add
              </Button>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
}