import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Stack,
  Card,
  FormControlLabel,
  Button,
  Modal,
  TextField,
  Switch,
  // Box,
  Grid,
} from '@mui/material';
import { useState, useReducer } from 'react';
import {SectionTitle, TitleComponent, RegionComponent } from 'src/components/thurcomponents/index';
import { createVPN } from '../../repository/vpn';
import ThurAlert from '../../components/alert/alert';

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

const initialRegionData = {
  regionName: '',
  slug: '',
  ipAddress: '',
  port: '',
  user: '',
  pass: '',
  filePath: '',
};

const initState = {
  country: '',
  image: '',
  code: '',
  premium: false,
  unicode: '',
  regions: [],
  status: true,
  activeRegion: initialRegionData,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_REGION':
      return {
        ...state,
        regions: [...state.regions, action.payload],
      };
    case 'REMOVE_REGION':
      // const regs = state.regions.splice(action.payload, 1);
      return {
        ...state,
        regions: [...action.payload],
      };
    case 'UPDATE_REGION':
      // console.log(state.regions);
      return {
        ...state,
        regions: [...action.payload],
      };
    default:
      return;
  }
};
// const operationState = {

export default function CreateVpnPage() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [regionData, setRegionData] = useState(initialRegionData);
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [response, setResponse] = useState(null);
  
  const [updateRegion, setUpdateRegion] = useState(false);
  const [rIndex, setRegionIndex] = useState(0);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setEnabled(false);
    console.log(state);
    createVPN(state)
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
    
    dispatch({ type: 'SET_FORM_DATA', payload: { [event.target.name]: event.target.value } });
    console.log(state.country);
  };

  const handleRegionFormChange = (event) => {
    setRegionData({
      ...regionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggle = (event) => {

    dispatch({ type: 'SET_FORM_DATA', payload: { [event.target.name]: event.target.checked } });
  };

  const handleAddRegionClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const AddRegionToList = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_REGION', payload: regionData });
    setOpen(false);
  };

  const updateRegionToList = (event) => {
    event.preventDefault();
    const modify = state.regions;
    modify[rIndex] = regionData;

    dispatch({ type: 'UPDATE_REGION', payload: modify,});
    setOpen(false);
    // setRegionData(initialRegionData);
    setUpdateRegion(false);
  };

  //removes region from list
  const removeIndex = (index) => {
    const rg = state.regions;
    rg.splice(index, 1);
    dispatch({ type: 'REMOVE_REGION', payload: rg });
  };

  const editRegion = (index) => {
    setUpdateRegion(true);
    setRegionData(state.regions[index]);
    setRegionIndex(index);
    setOpen(true);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Create VPNs </title>
      </Helmet>

      <Container maxWidth="xl">
      <SectionTitle title={'Create VPN'} text={'Go Back'} />

       
                {response && <ThurAlert severe={response.status ? 'success' : 'error'} message={response.message} />}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Card sx={{ padding: 0 }}>
              <form className={classes.form} onSubmit={handleFormSubmit}>
                <TitleComponent title="Enter Country Data" />
                <Stack direction={'column'} spacing={3}>
                  <Stack direction={'row'} spacing={2}>
                    <TextField
                      className={classes.textField}
                      label="Country"
                      name="country"
                      value={state.country}
                      onChange={handleFormChange}
                      required
                      variant="standard"
                    />
                    <TextField
                      className={classes.textField}
                      label="Country Code"
                      name="code"
                      value={state.code}
                      onChange={handleFormChange}
                      required
                      variant="standard"
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <TextField
                      className={classes.textField}
                      label="Image URL"
                      name="image"
                      value={state.image}
                      onChange={handleFormChange}
                      required
                      variant="standard"
                    />
                    <TextField
                      className={classes.textField}
                      label="Unicode"
                      name="unicode"
                      value={state.unicode}
                      onChange={handleFormChange}
                      required
                      variant="standard"
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={6} sx={{ padding: 0, width: '100%', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch color="primary" name="premium" checked={state.premium} onChange={handleToggle} />
                      }
                      label="Premium"
                    />
                    <FormControlLabel
                      control={<Switch color="primary" name="status" checked={state.status} onChange={handleToggle} />}
                      label="Status"
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Button className={classes.button} variant="contained" color="primary" type="submit" disabled={!enabled}>
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
          <Grid item xs={12} md={10}>
            <Card sx={{ alignItem: 'center', justifyContent: 'center', px: 5, py: 2 }}>
              <TitleComponent title="Regions" />
              {state.regions.map((region, index) => {
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
                  <Button className={classes.button} variant="contained" color="secondary" onClick={AddRegionToList}>
                    Add
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
