import React from 'react';
import Iconify from '../iconify';
import { Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SectionTitle = ({ title = '', text = '' }) => {
  const history = useNavigate();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {title}
      </Typography>

      <Button
        variant="contained"
        startIcon={<Iconify icon="ic:round-keyboard-backspace" />}
        onClick={() => history(-1)}
      >
        {text}
      </Button>
    </Stack>
  );
};
