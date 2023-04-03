import { Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ThurAlert = forwardRef(({ severe, message, onClose }, ref) => (
  <Alert ref={ref} severity={severe} component="span" onClose={onClose}>
    {message}
  </Alert>
));

ThurAlert.propTypes = {
  severe: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
  message: PropTypes.string,
};

ThurAlert.displayName = "ThurAlert";
export default ThurAlert;
