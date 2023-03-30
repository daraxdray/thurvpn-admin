// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 3,
          padding: 20,
          ['sm']: {
            flexDirection: 'row',
            justifyContent: 'center',
          },
        },
        textField: {
          margin: 1,
          ['sm']: {
            
            marginRight: 1,
          },
        },
  
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: '#ccc',
          borderRadius: 10,
          boxShadow: 5,
          padding: '2,3,4',
          outline: 'none',
        },
      }}
    />
  );

  return inputGlobalStyles;
}
