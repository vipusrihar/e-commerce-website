import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword,setRepassword] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      navigate("/userForm");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <Modal open={open} >
      <div className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-center w-full">Sign Up</h1>
          <CloseIcon
            onClick={handleClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Re-Password"
            type="repassword"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#388E3C',
              }
            }}
          >
            Sign Up
          </Button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </Modal>
  );
}
