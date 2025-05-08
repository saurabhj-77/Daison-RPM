import {
  Box,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";

export default function DoctorHomeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  interface Patient {
    id: string;
    first: string;
    last: string;
    email: string;
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const getDoctorPatients = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:2000/api/v1/doctor/dashboard/patient-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch patients.");
      }

      setPatients(data.data);
    } catch (error) {
      console.error("Error fetching dashboard patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorPatients();
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box bgcolor="#1976d2" color="white" p={3} borderRadius={2} mt={2}>
          <Typography variant="subtitle1">Welcome</Typography>
          <Typography variant="h5" fontWeight="bold">
            Dr. {user?.firstName} {user?.lastName}
          </Typography>
        </Box>

        <Typography mt={4} variant="h6" fontWeight="500">
          Patient List
        </Typography>

        {loading ? (
          <Typography color="textSecondary">Loading patients...</Typography>
        ) : patients.length === 0 ? (
          <Typography color="textSecondary">No patients assigned yet.</Typography>
        ) : (
          <List>
            {patients.map((patient) => (
              <div key={patient.id}>
                <ListItemButton
                  onClick={() =>
                    navigate(`/doctor-view-patient/${patient.id}`, {
                      state: { patient }
                    })
                  }
                >
                  <ListItemText
                    primary={`${patient.first} ${patient.last}`}
                    secondary={patient.email}
                  />
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Container>
    </MainLayout>
  );
}
