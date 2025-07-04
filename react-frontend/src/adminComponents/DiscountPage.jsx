import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Typography, Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createDiscount, editDiscount, getAllDiscounts } from '../state/discount/Action'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'amount', label: 'Amount (%)', minWidth: 80 },
  { id: 'validFrom', label: 'Valid From', minWidth: 120 },
  { id: 'validTo', label: 'Valid To', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];




const DiscountsPage = () => {
  const dispatch = useDispatch();
  const availableBooks = useSelector((store) => store.books.books)

  const discounts = useSelector((store) => store.discounts.discounts);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add'); // 'add' or 'edit'
  const [selectedDiscount, setSelectedDiscount] = useState({
    code: '',
    amount: '',
    validFrom: '',
    validTo: ''
  });

    const handleAdd = () => {
    handleOpenDialog('add', {
      code: '',
      amount: '',
      validFrom: '',
      validTo: '',
      appliesToAll: false,
      books: [],
      active: true,
    });
  };

  const handleOpenDialog = (type, discount = null) => {
    setDialogType(type);
    setSelectedDiscount(
      discount || {
        code: '',
        amount: '',
        validFrom: '',
        validTo: ''
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDiscount(null);
  };

  const handleChange = (field, value) => {
    setSelectedDiscount(prev => ({ ...prev, [field]: value }));
  };


  const handleSave = () => {
    if(dialogType === 'add'){
      dispatch(createDiscount(selectedDiscount))
    }else {
      dispatch(editDiscount())
    }
    // if (dialogType === 'add') {
    //   const newDiscount = {
    //     ...selectedDiscount,
    //     id: rows.length + 1,
    //   };
    //   setRows(prev => [...prev, newDiscount]);
    // } else {
    //   setRows(prev =>
    //     prev.map(row => row.id === selectedDiscount.id ? selectedDiscount : row)
    //   );
    // }
    handleCloseDialog();
  };



  useEffect(()=>{
    dispatch(getAllDiscounts())
  },[dispatch])


  return (
    <Box p={2}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#78350F' }}>
          Manage Discount Offers
        </Typography>
        <Button onClick={() => handleAdd()}>
          <AddIcon sx={{ width: 40, height: 40, color: '#78350F' }} />
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      backgroundColor: '#FCD34D',
                      color: '#78350F',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) =>
                    column.id === 'actions' ? (
                      <TableCell key="actions">
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleOpenDialog('edit', row)}
                            sx={{
                              backgroundColor: '#78350F',
                              color: '#fff',
                              '&:hover': { backgroundColor: '#652d0d' },
                            }}
                          >
                            Edit
                          </Button>
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          {dialogType === 'edit' ? 'Edit Discount' : 'Add Discount'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Code"
              value={selectedDiscount?.code || ''}
              onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
              fullWidth
            />
            <TextField
              label="Amount (%)"
              type="number"
              inputProps={{ min: 1, max: 100 }}
              value={selectedDiscount?.amount || ''}
              onChange={(e) => handleChange('amount', Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Valid From"
              type="date"
              value={selectedDiscount?.validFrom || ''}
              onChange={(e) => handleChange('validFrom', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Valid To"
              type="date"
              value={selectedDiscount?.validTo || ''}
              onChange={(e) => handleChange('validTo', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth disabled={selectedDiscount?.appliesToAll}>
              <InputLabel>Select Books</InputLabel>
              <Select
                multiple
                value={selectedDiscount?.books || []}
                onChange={(e) => handleChange('books', e.target.value)}
                renderValue={(selected) =>
                  selected.map(id => availableBooks.find(book => book._id === id)?.title).join(', ')
                }
              >
                {availableBooks.map((book) => (
                  <MenuItem key={book._id} value={book._id}>
                    <Checkbox checked={selectedDiscount?.books?.includes(book._id)} />
                    <ListItemText primary={book.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDiscount?.appliesToAll || false}
                  onChange={(e) => handleChange('appliesToAll', e.target.checked)}
                />
                {' '}Applies to all books
              </label>
            </Box>
            <Box>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDiscount?.active ?? true}
                  onChange={(e) => handleChange('active', e.target.checked)}
                />
                {' '}Active
              </label>
            </Box>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default DiscountsPage;
