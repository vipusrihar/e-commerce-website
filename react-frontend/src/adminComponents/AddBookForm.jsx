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
  Grid,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';
import { toast } from 'react-toastify';

const AddBookForm = ({ onClose, onSubmit, initialData = null }) => {
  const [uploadImage, setUploadImage] = useState(false);

  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    image: '',
    description: '',
    stock: '',
    price: '',
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const imageUrl = await uploadImageToCloudinary(file);
    setForm(prev => ({ ...prev, image: imageUrl }));
    setUploadImage(false);
  };

  const handleSubmit = () => {
    if (form.title && form.author && form.isbn && form.category && form.stock && form.price) {
      onSubmit(form);
      onClose();
    } else {
      toast.info("Please fill in all required fields.");
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF3E0',
        borderRadius: 2,
        boxShadow: 3,
        height: 'auto',
      }}
    >
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

      {/* Image Upload */}
      <Grid sx={{ mb: 2 }}>
        <input
          accept="image/*"
          id="fileInput"
          style={{ display: 'none' }}
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="fileInput">
          <span className="w-24 h-25 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
            <AddPhotoAlternateIcon />
          </span>
          {uploadImage && (
            <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </label>
      </Grid>

      {form.image && (
        <Box sx={{ mb: 2 }}>
          <img
            src={form.image}
            alt="Book Cover"
            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
          />
        </Box>
      )}

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
          {[
            'fiction', 'non-fiction', 'romance', 'thriller', 'mystery', 'fantasy',
            'science', 'history', 'biography', 'self-help', 'education', 'children',
            'young-adult', 'spirituality', 'philosophy', 'memoir', 'classic', 'poetry',
            'sinhala-literature', 'tamil-literature', 'sri-lankan-history'
          ]
            .map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </MenuItem>
            ))}

        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        variant="outlined"
        multiline
        rows={3}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Stock"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />

      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        variant="outlined"
        sx={{ mb: 2 }}
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#D97706', color: 'white' }}
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookForm;
