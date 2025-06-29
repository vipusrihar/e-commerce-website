import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddBookForm = ({ onClose }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
   
    console.log('New Book:', form);
    onClose();
  };

  return (
    <Box sx={{ padding: 3, width: 400 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: '#78350F' }}>
          Add New Book
        </Typography>
        <Button onClick={onClose}>
          <CloseIcon sx={{ color: 'red' }} />
        </Button>
      </Box>

      {/* Form Fields */}
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />

      <TextField
        fullWidth
        label="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />

      <TextField
        fullWidth
        label="ISBN"
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          name="category"
          value={form.category}
          onChange={handleChange}
          label="Category"
          required
        >
          <MenuItem value={'fiction'}>Fiction</MenuItem>
          <MenuItem value={'non-fiction'}>Non-fiction</MenuItem>
          <MenuItem value={'biography'}>Biography</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#D97706', color: 'white' }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookForm;
