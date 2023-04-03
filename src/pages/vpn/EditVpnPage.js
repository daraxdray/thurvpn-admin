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
  CircularProgress,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import RegionComponent from '../../components/thurcomponents/RegionComponent';
import TitleComponent from 'src/components/thurcomponents/TitleComponent';
import { updateVPN } from '../../repository/vpn';
import ThurAlert from '../../components/alert/alert';
import { useParams, useNavigate } from 'react-router-dom';
import { getVpnById } from '../../repository/vpn';
import { useQuery } from '@tanstack/react-query';
import Iconify from '../../components/iconify';

// sections
// mock

const classes = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 3,
    padding: 10,
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
  code: '',
  premium: false,
  unicode: '',
  regions: [],
};

const initialRegionData = {
  regionName: '',
  slug: '',
  ipAddress: '',
  port: '',
  user: '',
  pass: '',
  filePath: '',
};

export default function EditVpnPage() {
  const { id } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [regionData, setRegionData] = useState(initialRegionData);
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [response, setResponse] = useState(null);
  const [regions, setRegions] = useState([]);
  const [updateRegion, setUpdateRegion] = useState(false);
  const [rIndex, setRegionIndex] = useState(0);
  const { isSuccess, isError, refetch, isFetching } = useQuery(['getvpn'], () => getVpnById(id), {
    onSuccess: (res) => {
      setFormData({ ...res, code: res.countryCode, image: res.countryImage, premium: res.isPremium });
      setRegions(res.regions);
    },
    onError: (err) => {
      console.log(err);
      setResponse(err);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setEnabled(false);
    console.log(regions);
    setFormData({ regions: regions, ...formData });
    console.log(formData);
    updateVPN(formData)
      .then((res) => {
        handleResponse(res);
      })
      .catch((e) => {
        console.log('error', e);
        handleResponse(e);
      });
  };

  const handleResponse = (res) => {
    setResponse(res);
    setEnabled(true);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleRegionFormChange = (event) => {
    setRegionData({
      ...regionData,
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

  const AddRegionToList = (event) => {
    event.preventDefault();
    const rg = [];
    rg.push(regionData);
    setRegions([...regions, ...rg]);
    setFormData({ ...formData, regions });
    setOpen(false);
    setRegionData(initialRegionData);
  };

  const updateRegionToList = (event) => {
    event.preventDefault();
    console.log(regions[rIndex]);
    regions[rIndex] = regionData;
    console.log(regions[rIndex]);

    setRegions([...regions]);
    setFormData({ ...formData, regions });
    setOpen(false);
    setRegionData(initialRegionData);
    setUpdateRegion(false);
  };

  //removes region from list
  const removeIndex = (index) => {
    regions.splice(index, 1);
    console.log(index, regions.length);
    setRegions([...regions]);
    setFormData({ ...formData, regions });
  };

  const editRegion = (index) => {
    setUpdateRegion(true);
    setRegionData(regions[index]);
    setRegionIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit VPN </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Edit VPN {isSuccess}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="ic:round-keyboard-backspace" />}
            onClick={() => history(-1)}
          >
            Back
          </Button>
        </Stack>

        {response && (
          <ThurAlert
            severe={response.status ? 'success' : 'error'}
            message={response.message}
            onClose={() => setResponse(null)}
          />
        )}
        {isError && (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button sx={{ mt: 5 }} onClick={() => refetch()}>
              Refresh
            </Button>
          </Stack>
        )}
        {isFetching && (
          <Container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mx: 'auto' }}>
            {' '}
            <CircularProgress color="success" sx={{ margin: 'auto' }} />{' '}
          </Container>
        )}
        {isSuccess && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} spacing={3}>
              <Card sx={{ padding: 0 }}>
                <form  onSubmit={handleFormSubmit} style={{px:2,py:4 }}>
                  <TitleComponent title="Enter Country Data" />
                  <Stack direction={'column'} spacing={3} sx={{padding:0}}>
                    <Stack direction={'row'} spacing={6} sx={{padding:0}}>
                      <TextField
                        className={classes.textField}
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        required
                        variant="standard"
                        width={500}
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        label="Country Code"
                        name="code"
                        value={formData.code}
                        onChange={handleFormChange}
                        required
                        variant="standard"
                        fullWidth
                      />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <TextField
                        className={classes.textField}
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleFormChange}
                        required
                        variant="standard"
                        fullWidth
                      />
                      <TextField
                        className={classes.textField}
                        label="Unicode"
                        name="unicode"
                        value={formData.unicode}
                        onChange={handleFormChange}
                        required
                        variant="standard"
                        fullWidth
                      />
                    </Stack>
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
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!enabled}
                      >
                        Update
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
            <Grid item xs={12} md={10}>
              <Card sx={{ alignItem: 'center', justifyContent: 'center', px: 2, py: 2 }}>
                <TitleComponent title="Regions" />
                
                {regions.map((region, index) => {
                  return (
                    <RegionComponent
                      region={region}
                      key={index}
                      onDelete={() => removeIndex(index)}
                      onEdit={() => {
                        editRegion(index);
                      }}
                    />
                  );
                })}
              </Card>
            </Grid>
          </Grid>
        )}
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
              width: 400,
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
              <form onSubmit={updateRegion ? updateRegionToList : AddRegionToList}>
                <Stack direction={'column'} spacing={3}>
                  <Stack direction={'row'} spacing={2}>
                    <TextField
                      className={classes.textField}
                      label="Region Name"
                      name="regionName"
                      value={regionData.regionName}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                    <TextField
                      className={classes.textField}
                      label="Region Slug"
                      name="slug"
                      value={regionData.slug}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <TextField
                      className={classes.textField}
                      label="Ip Address"
                      name="ipAddress"
                      value={regionData.ipAddress}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                    <TextField
                      className={classes.textField}
                      label="Port"
                      name="port"
                      value={regionData.port}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <TextField
                      className={classes.textField}
                      label="user"
                      name="user"
                      value={regionData.user}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                    <TextField
                      className={classes.textField}
                      label="pass"
                      name="pass"
                      value={regionData.pass}
                      onChange={handleRegionFormChange}
                      required
                      variant={'standard'}
                    />
                  </Stack>
                  <TextField
                    className={classes.textField}
                    label="File Path"
                    name="filePath"
                    value={regionData.filePath}
                    onChange={handleRegionFormChange}
                    required
                    variant={'standard'}
                  />

                  <Stack direction={'row'} spacing={2}>
                    <Button className={classes.button} variant="contained" type="submit" color="secondary">
                      {updateRegion ? 'Update' : 'Add'}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Stack>
          </Card>
        </Modal>
      </Container>
    </>
  );
}
