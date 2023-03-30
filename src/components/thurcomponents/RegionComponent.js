import { Box, Card, Stack } from '@mui/material';

const RegionComponent = (region) => {
  return (
    <Card sx={{ boxShadow: '3x 0 0 2px rgba(0 0 0 / 1)', padding: 5 }}>
      <Stack direction={'row'}>
        <Box>{region.name}</Box>
        <Box>{region.slug}</Box>
        <Box>Region IP</Box>
        <Box>Region Port</Box>
        <Box>Region Pass</Box>
        <Box>Region Urer</Box>
      </Stack>
    </Card>
  );
};

export default RegionComponent;
