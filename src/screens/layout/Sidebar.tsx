import React, { use } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "wouter";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'; // AddPatientIcon
import VisibilityIcon from '@mui/icons-material/Visibility';      // ViewDetailsIcon
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';   // MeasurementIcon
import AssignmentIcon from '@mui/icons-material/Assignment';       

const Sidebar = ({ role = "doctor", adminFlag = false }) => {
  const [location] = useLocation();
  const doctorMenu = [
    { to: "/doctor-dashboard", text: "Dashboard", icon: <DashboardIcon /> },
    { to: "/doctor-addpatient", text: "Add Patient", icon: <PersonAddAlt1Icon /> },
    // { to: "/doctor-view-patient", text: "View Patient Details", icon: <VisibilityIcon /> },
    { to: "/provider/user_setting", text: "User Settings", icon: <SettingsIcon /> },
  ];

  const patientMenu = [
    { to: "/patient/home", text: "Dashboard", icon: <DashboardIcon /> },
    { to: "/patient/home", text: "Measurement", icon: <MonitorHeartIcon /> },
    { to: "/patient/home", text: "Assessment", icon: <AssignmentIcon /> },
  ];
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.userType || localStorage.getItem("role");
  console.log("user", user);
  const menuItems = userRole === "doctor" ? doctorMenu : patientMenu;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 100,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          mt: 9,
        },
      }}
    >
      <Box
        className="left_sidemenu"
        sx={{ width: 250, bgcolor: "background.paper", height: "100vh", padding: 2 }}
      >
        <List component="nav" className="sidemenu_list">
          {menuItems.map(({ to, text, icon }) => {
            const isActive = location === to;
            return (
                <NavLink key={to} to={to} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={{
                    bgcolor: isActive ? "blue" : "transparent",
                    color: isActive ? "white" : "black",
                    borderRadius: 2,
                    "&:hover": { bgcolor: isActive ? "blue" : "#f0f0f0" },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </NavLink>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
