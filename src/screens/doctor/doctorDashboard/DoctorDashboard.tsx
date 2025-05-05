import {
    Box,
    Container,
    Typography,
    Avatar,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
  } from "@mui/material";
  import ChevronRightIcon from "@mui/icons-material/ChevronRight";
  import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
  
  export default function DoctorHomeDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole = user?.userType || localStorage.getItem("role");
    console.log(userRole); // Access stored user data
  
    // const user = { firstName: "Dr", lastName: "Who" };
  
    const patients = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        emailAddress: "jane.smith@example.com",
      },
    ];
  
    return (
      <MainLayout>
      <Container maxWidth="md">
        <Box bgcolor="#1976d2" color="white" p={3} borderRadius={2} mt={2}>
          <Typography variant="subtitle1">Welcome</Typography>
          <Typography variant="h5" fontWeight="bold">
            Dr. {user?.firstName} {user?.lastName}
          </Typography>
          {/* <Avatar
            src="/assets/profile_avatar.png"
            sx={{ mt: 2, width: 56, height: 56 }}
          /> */}
        </Box>
  
        <Typography mt={4} variant="h6" fontWeight="500">
          Patient List
        </Typography>
  
        <List>
          {patients.map((patient) => (
            <div key={patient.id}>
              <ListItemButton onClick={() => navigate(`/doctor-view-patient/${patient.id}`)}>
                <ListItemText
                  primary={`${patient.firstName} ${patient.lastName}`}
                  secondary={patient.emailAddress}
                />
                <IconButton edge="end">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </List>
      </Container>
      </MainLayout>
    );
  }
  