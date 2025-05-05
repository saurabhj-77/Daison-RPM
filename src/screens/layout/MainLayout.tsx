import React from "react";
import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", marginTop: "50px" }}>
        <Navbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default MainLayout;
