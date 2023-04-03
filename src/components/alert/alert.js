import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

const ThurAlert = forwardRef(({ severe, message, onClose }, ref) => (
  <Alert ref={ref} severity={severe} component="span" onClose={onClose}>
    {message}
  </Alert>
));

const Iconify = forwardRef(function Iconify({ icon, width = 20, sx, ...other }, ref) {
  return (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
  );
});

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Iconify.displayName = "Iconify";
export default Iconify;
