import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography, Card, 
  // FormControlLabel, Button, Modal, TextField, Switch 
} from '@mui/material';
// import { useState } from 'react';
// sections
// mock

// const initialFormData = {
//   country: '',
//   image: '',
//   countryCode: '',
//   premium: false,
// };

export default function CreateVpnPage() {
  // const [formData, setFormData] = useState(initialFormData);
  // const [open, setOpen] = useState(false);

  // const createVPN = () => {};
  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   createVPN(formData);
  //   setFormData(initialFormData);
  // };

  // const handleFormChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handlePremiumToggle = (event) => {
  //   setFormData({
  //     ...formData,
  //     premium: event.target.checked,
  //   });
  // };

  // const handleAddRegionClick = () => {
  //   setOpen(true);
  // };

  // const handleModalClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <Helmet>
        <title> Dashboard: Create VPNs </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Create VPN
          </Typography>
        </Stack>
        <Card></Card>

        {/* <form className={classes.form} onSubmit={handleFormSubmit}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h6" sx={{ mb: 5 }}>
              Enter Country Dat
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={5}>
            <TextField
              className={classes.textField}
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleFormChange}
              required
            />
            <TextField
              className={classes.textField}
              label="Image"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              required
            />

            <TextField
              className={classes.textField}
              label="Country Code"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleFormChange}
              required
            />

            <FormControlLabel
              control={
                <Switch color="primary" name="premium" checked={formData.premium} onChange={handlePremiumToggle} />
              }
              label="Premium"
            />
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleAddRegionClick}>
              Add Region
            </Button>
          </Stack>
        </form> */}

        {/* <Modal className={classes.modal} open={open} onClose={handleModalClose}>
          <div className={classes.paper}>
            <h2>Add Region Modal</h2>
            <p>Content goes here...</p>
          </div>
        </Modal> */}
      </Container>
    </>
  );
}


// <Grid container spacing={2}>
//   <Grid item xs={12} sm={6}>
//     <Item>xs=8</Item>
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <Item>xs=8</Item>
//   </Grid>
// </Grid>
// const classes = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     margin: 3,
//     padding: 20,
//     ['sm']: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//     },
//   },
//   textField: {
//     margin: 1,
//     ['sm']: {
//       maxWidth: '250px',
//       marginRight: 1,
//     },
//   },
//   button: {
//     margin: 1,
//   },
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: '#ccc',
//     borderRadius: 10,
//     boxShadow: 5,
//     padding: '2,3,4',
//     outline: 'none',
//   },
// };
