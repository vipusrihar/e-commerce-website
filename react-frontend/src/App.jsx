import { BrowserRouter, useLocation } from "react-router-dom";
import AppContent from "./AppContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./state/authentication/authSlice";
import { Box } from "@mui/material";
import Footer from "./components/Footer";

function InnerApp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/adminDashboard");

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      dispatch(loginSuccess(authData));
    }
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1 }}>
        <AppContent />
      </Box>
      {!hideNav && <Footer />}
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}
