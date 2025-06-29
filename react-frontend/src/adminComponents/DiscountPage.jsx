import React, { useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box
} from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'amount', label: 'Amount (%)', minWidth: 80 },
  { id: 'validFrom', label: 'Valid From', minWidth: 120 },
  { id: 'validTo', label: 'Valid To', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

const initialRows = [
  { id: 1, code: 'NEWYEAR10', amount: 10, validFrom: '2025-01-01', validTo: '2025-01-10' },
  { id: 2, code: 'SUMMER20', amount: 20, validFrom: '2025-06-01', validTo: '2025-06-30' },
  { id: 3, code: 'WELCOME15', amount: 15, validFrom: '2025-04-01', validTo: '2025-04-15' },
];

const DiscountsPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add' or 'edit'
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const handleOpenDialog = (type, discount) => {
    setDialogType(type);
    setSelectedDiscount(discount);
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
    setRows(prev =>
      prev.map(row => row.id === selectedDiscount.id ? selectedDiscount : row)
    );
    handleCloseDialog();
  };

  return (
    <Box p={2}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#78350F' }}>
        Manage Discount Offers
      </Typography>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="discounts table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      backgroundColor: '#FCD34D',
                      color: '#78350F',
                      fontWeight: 'bold'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key="actions">
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleOpenDialog('add', row)}
                              sx={{
                                color: '#78350F',
                                borderColor: '#78350F',
                                '&:hover': {
                                  backgroundColor: '#fef3c7', // light background on hover
                                  borderColor: '#78350F',
                                },
                              }}
                            >
                              Add Time Period
                            </Button>

                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleOpenDialog('edit', row)}
                              sx={{
                                backgroundColor: '#78350F',
                                color: '#fff',
                                '&:hover': {
                                  backgroundColor: '#652d0d',
                                },
                              }}
                            >
                              Edit
                            </Button>
                          </Stack>

                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id}>
                          {row[column.id]}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          {dialogType === 'edit' ? 'Edit Discount' : 'Add Time Period'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Code"
              value={selectedDiscount?.code || ''}
              onChange={(e) => handleChange('code', e.target.value)}
              fullWidth
            />
            <TextField
              label="Amount (%)"
              type="number"
              value={selectedDiscount?.amount || ''}
              onChange={(e) => handleChange('amount', e.target.value)}
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
