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
  // Box,
  Grid,
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
    const rg = regions;
    rg.push(regionData);
    setRegions(rg);

    setOpen(false);
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
        <Stack useFlexGap flexWrap="wrap" spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Card sx={{ padding: 0, width: 400 }}>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
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
                  <Button className={classes.button} variant="contained" color="primary" onClick={handleAddRegionClick}>
                    Add Region
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Card>

          <Card sx={{ width: 400 }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
              Regions
            </Typography>
            {regions.map((region, index) => {
              return <RegionComponent region={region} key={index} />;
            })}
          </Card>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 0, width: 400 }}>
              <form className={classes.form} onSubmit={handleFormSubmit}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
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
                      <Switch
                        color="primary"
                        name="premium"
                        checked={formData.premium}
                        onChange={handlePremiumToggle}
                      />
                    }
                    label="Premium"
                  />
                  <Stack direction={'row'} spacing={2}>
                    <Button className={classes.button} variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleAddRegionClick}
                    >
                      Add Region
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ width: 400 }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                Regions
              </Typography>
              {regions.map((region, index) => {
                return <RegionComponent region={region} key={index} />;
              })}
            </Card>
          </Grid>
        </Grid>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleModalClose}
          aria-labelledby="add-region-title"
          aria-describedby="add-description"
        >
          <Card
            direction={'row'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 700,
              // bgcolor: 'background.paper',
              // border: '2px solid #000',
              // boxShadow: 24,
              // pt: 2,
              // px: 4,
              // pb: 3,
            }}
          >
            {/* <Typography variant="h6" sx={{ mb: 5 }}>
                Enter Country Data
              </Typography> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              mb={5}
              mt={5}
              sx={{ backgroundColor: 'white' }}
            >
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
            </Stack>
          </Card>
        </Modal>
      </Container>
    </>
  );
}
