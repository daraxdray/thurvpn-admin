import { Box, Card, Stack, IconButton } from '@mui/material';
import Iconify from '../../components/iconify';


const RegionComponent = ({ region = {}, onDelete = ()=>{} }) => {
  console.log(region.name);
  return (
    <Card sx={{ boxShadow: '3x 0 0 2px rgba(0 0 0 / 1)', px: 5, py: 3, mb: 3 }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <Box>{region.regionName}</Box>
        <Box>{region.slug}</Box>
        <Box>{region.ipAddress}</Box>
        <Box>{region.port}</Box>
        <Box>{region.pass}</Box>
        <Box>{region.user}</Box>
        <IconButton size="small" color="red" onClick={()=>onDelete()}>
          <Iconify icon={'ic:baseline-delete-outline'} />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default RegionComponent;
