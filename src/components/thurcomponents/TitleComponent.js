import React from 'react';
import { Stack, Typography } from '@mui/material';
 
const TitleComponent = ({title = ''}) => {
  return (
    
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
        <Typography variant="h6" sx={{ mb: 5 }}>
         {title}
        </Typography>
      </Stack>
    
  );
};

export default TitleComponent;
