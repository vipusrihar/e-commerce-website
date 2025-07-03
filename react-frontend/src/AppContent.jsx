import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import BookDetails from "./components/BookDetails";
import CartPage from "./pages/CartPage";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/adminDashboard");

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/book/:hashid" element={<BookDetails/>} />
        <Route path="/cart" element={<CartPage />} />
        {/* Nested Admin Routes */}
        <Route path="/adminDashboard/*" element={<AdminPage />}>
        </Route>
      </Routes>
    </>
  );
}

export default AppContent;
