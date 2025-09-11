import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./state/authentication/authSlice";
import { Box } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      dispatch(loginSuccess(authData));
    }
  }, []);

  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <AppContent />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
