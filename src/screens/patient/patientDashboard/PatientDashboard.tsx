import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
    Chip,
    IconButton,
  } from "@mui/material";
  import ChevronRightIcon from "@mui/icons-material/ChevronRight";
  import { useParams, useNavigate } from "react-router-dom";
  import MainLayout from "../../layout/MainLayout";
  
  export default function PatientDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    // Static mock data — Replace with Firebase fetch
    const patient = {
      id,
      firstName: "Jane",
      lastName: "Smith",
    };
  
    const measurements = [
      { type: "Blood Pressure", value: "120/80 (mmHg)", time: "2 hours ago" },
      { type: "Heart Rate", value: "72 (bpm)", time: "1 day ago" },
      { type: "Oxygen Level", value: "98 (%)", time: "3 days ago" },
      { type: "Temperature", value: "98.6 (°F)", time: "1 week ago" },
      { type: "Weight", value: "175 (lbs)", time: "2 weeks ago" },
    ];
  
    const measurementRoutes: Record<string, string> = {
      "Blood Pressure": "blood-pressure",
      "Heart Rate": "heart-rate",
      "Oxygen Level": "oxygen-level",
      "Temperature": "body-temperature",
      "Weight": "weight",
    };
  
    const assessments = [
      {
        date: "1 May 2025 at 14:29",
        type: "Status Assessment",
        status: "Normal/Normal",
        statusColor: "success",
      },
      {
        date: "29 Apr 2025 at 14:29",
        type: "Predicted Status",
        status: "Warning/Warning",
        statusColor: "warning",
      },
    ];
  
    return (
      <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          bgcolor="#1976d2"
          color="white"
          p={2}
          borderRadius={2}
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="body2">Hello Patient</Typography>
            <Typography variant="h5">How are you feeling right now?</Typography>
          </Box>
        </Box>
  
        <Typography variant="h6" gutterBottom>
          Measurements
        </Typography>
        {measurements.map((item) => (
          <Card
            key={item.type}
            sx={{ mb: 2, cursor: "pointer" }}
            onClick={() => {
              const route = measurementRoutes[item.type];
              if (route) {
                navigate(`/measurement-history/${patient.id}/${route}`);
              } else {
                console.warn("Route not defined for measurement:", item.type);
              }
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle2">{item.type}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Last Reading - {item.time}
                </Typography>
                <Typography variant="h6">{item.value}</Typography>
              </Box>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Container>
      </MainLayout>
    );
  }
  