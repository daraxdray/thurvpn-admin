// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Box} from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  common:  PropTypes.string,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, common='', color = 'primary', sx, ...other }) {
  const bg  = (theme) => common === 'dark'? theme.palette.common.blackFaint: common === 'light'? theme.palette.common.white: theme.palette[color].lighter;
  const cl  = (theme) => common === 'dark'? theme.palette.common.white:  common === 'light'? theme.palette.common.black:theme.palette[color].darker;
  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 0,
        textAlign: 'center',
        color: cl,
        bgcolor: bg,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ display: 'flex', alignItems: 'start', justifyContent:'space-between', paddingInline:2 }}>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 , ml:0,}}>
        {title}
      </Typography>

      <StyledIcon
        sx={{
          color: (theme) =>common === 'dark'? theme.palette[color].dark:theme.palette[color].light,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0)} 0%, ${alpha(
              common === 'dark'?theme.palette.common.white:theme.palette[color].darker,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={34} height={34} />
      </StyledIcon>

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', justifyContent:'space-between', paddingInline:2 }}>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>
      </Box>
    </Card>
  );
}
