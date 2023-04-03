import { Box, Card, Stack, IconButton } from '@mui/material';
import Iconify from '../../components/iconify';


const RegionComponent = ({ region = {}, onDelete = ()=>{} , onEdit=()=>{}}) => {
  
  return (
    <Card sx={{ boxShadow: '3x 0 0 2px rgba(0 0 0 / 1)', px: 3, py: 3, mb: 3 }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} spacing={1}>
        <Box>{region.regionName}</Box>
        <Box>{region.slug}</Box>
        <Box>{region.ipAddress}</Box>
        <Box>{region.port}</Box>
        <Box>{region.user}</Box>
        <Box>{region.pass}</Box>
        <IconButton size="small" color="red" onClick={()=>onDelete()}>
          <Iconify icon={'ic:baseline-delete-outline'} />
        </IconButton>
        <IconButton size="small" color="red" onClick={()=>onEdit()}>
          <Iconify icon={'ic:baseline-edit'} />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default RegionComponent;
