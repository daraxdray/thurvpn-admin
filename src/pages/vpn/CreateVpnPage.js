import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Stack,
  Typography,
  Card,
  FormControlLabel,
  Button,
  Modal,
  TextField,
  Switch,
  // Box
} from '@mui/material';
import { useState } from 'react';
import RegionComponent from '../../components/thurcomponents/RegionComponent';
// sections
// mock

const classes = {
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
  button: {
    margin: 1,
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
};

const initialFormData = {
  country: '',
  image: '',
  countryCode: '',
  premium: false,
};
const regionData = {
  name: '',
  slug: '',
  ip: '',
  port: false,
  user: '',
  pass: '',
  filePath: '',
};

export default function CreateVpnPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const createVPN = () => {};
  const handleFormSubmit = (event) => {
    event.preventDefault();
    createVPN(formData);
    setFormData(initialFormData);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePremiumToggle = (event) => {
    setFormData({
      ...formData,
      premium: event.target.checked,
    });
  };

  const handleAddRegionClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const AddRegionToList = () => {
    setRegions(regions.push(regionData));
  };

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
        <Card sx={{ padding: 10 }}>
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                Enter Country Data
              </Typography>
            </Stack>

            <Stack direction={'column'} spacing={3}>
              <Stack direction={'row'} spacing={2}>
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
                  label="Country Code"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleFormChange}
                  required
                />
              </Stack>
              <TextField
                className={classes.textField}
                label="Image"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                required
              />

              <FormControlLabel
                control={
                  <Switch color="primary" name="premium" checked={formData.premium} onChange={handlePremiumToggle} />
                }
                label="Premium"
              />
              <Stack direction={'row'} spacing={2}>
                <Button className={classes.button} variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleAddRegionClick}>
                  Add Region
                </Button>
              </Stack>

              <Typography variant="h6" sx={{ mb: 5 }}>
                Regions
              </Typography>
              {regions.map((region, index) => {
                return <RegionComponent region={region} key={index} />;
              })}
            </Stack>
          </form>
        </Card>
        <Modal className={classes.modal} open={open} onClose={handleModalClose}>
          <div className={classes.paper}>
            <h2>Add Region</h2>
            <Stack direction={'column'} spacing={3}>
              <Stack direction={'row'} spacing={2}>
                <TextField
                  className={classes.textField}
                  label="Region Name"
                  name="region"
                  value={regionData.name}
                  onChange={handleFormChange}
                  required
                />
                <TextField
                  className={classes.textField}
                  label="Region Slug"
                  name="regionSLug"
                  value={regionData.slug}
                  onChange={handleFormChange}
                  required
                />
              </Stack>
              <TextField
                className={classes.textField}
                label="File Path"
                name="file"
                value={regionData.file}
                onChange={handleFormChange}
                required
              />

              <Stack direction={'row'} spacing={2}>
                <Button className={classes.button} variant="contained" color="secondary" onClick={AddRegionToList}>
                  Add
                </Button>
              </Stack>
            </Stack>
          </div>
        </Modal>
      </Container>
    </>
  );
}
