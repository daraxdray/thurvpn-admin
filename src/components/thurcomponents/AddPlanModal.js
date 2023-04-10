import { useEffect, useReducer, useState } from 'react';

import {
  // Container,
  Stack,
  Card,
  FormControlLabel,
  Button,
  Modal,
  TextField,
  InputAdornment,
  //   ListItem,
  Chip,
  //   Snackbar,
  //   Alert
  Switch,
  // Box,
  Grid,
} from '@mui/material';
import Iconify from '../../components/iconify';
import { createPlan, updatePlan } from '../../repository/plans';
import ThurAlert from '../../components/alert/alert';

const initialState = {
  active: true,
  description: '',
  deviceCount: '',
  duration: '',
  iapCode: '',
  price: '',
  id: '',
  title: '',
  features: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAN':
      return {
        ...state,
        ...action.payload,
      };

    case 'OFFSET':
      return {
        ...initialState,
      };
  }
};

export default function AddPlanModal({ open = false, handleModalClose = () => {}, plan = {} }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [response, setResponse] = useState(null);
  //   const [sessionMsg,setSessionMsg] = useState(null)

  // const {refetch,} = useQuery(['getPlan',getPlanById])
  const createEditPlan = async (event) => {
    event.preventDefault();
    // setEnabled(false);
    if (!plan) {
      createPlan(state)
        .then((res) => {
          handleResponse(res);
          dispatch({ type: 'OFFSET' });
        })
        .catch((e) => {
          console.log('error', e);
          handleResponse(e);
        });
    } else {
      updatePlan(state)
        .then((res) => {
          handleResponse(res);
        })
        .catch((e) => {
          console.log('error', e);
          handleResponse(e);
        });
    }
  };
  useEffect(() => {
    if (plan) dispatch({ type: 'SET_PLAN', payload: plan });
    else dispatch({ type: 'OFFSET' });
  }, [plan]);

  const handleResponse = (res) => {
    setResponse(res);
    // setEnabled(true);
  };
  const handlePlanFormChange = (event) => {
    dispatch({ type: 'SET_PLAN', payload: { [event.target.name]: event.target.value } });
  };

  const deleteFeature = (needle) => {
    const pl = state.features.filter((feature) => feature != needle);
    dispatch({ type: 'SET_PLAN', payload: { features: pl } });
  };
  const addFeature = (event) => {
    if (event.key == 'Enter' || event.key == ',') {
      event.preventDefault();
      const pl = [...state.features, event.target.value];
      event.target.value = '';
      dispatch({ type: 'SET_PLAN', payload: { features: pl } });
    }
  };

  const handleToggle = (event) => {
    dispatch({ type: 'SET_PLAN', payload: { [event.target.name]: event.target.checked } });
  };
  return (
    <>
      <Modal
        //   sx ={classes.modal}
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
          {response && (
            <ThurAlert
              severe={response.status ? 'success' : 'error'}
              setResponse={setResponse}
              message={response.message}
            />
          )}
          {/* {response &&
            <Snackbar open={sessionMsg != ''} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {sessionMsg}
              </Alert>
            </Snackbar>
          } */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            mb={5}
            mt={5}
            sx={{ backgroundColor: 'white' }}
          >
            <form onSubmit={createEditPlan}>
              <Stack direction={'column'} spacing={3}>
                <Stack direction={'row'} spacing={2}>
                  <TextField
                    sx={classes.textField}
                    label="Plan Title"
                    name="title"
                    value={state?.title}
                    onChange={handlePlanFormChange}
                    required
                    fullWidth
                    variant={'outlined'}
                    size={'small'}
                  />
                  <TextField
                    sx={classes.textField}
                    label="Device Count"
                    name="deviceCount"
                    type="number"
                    value={state?.deviceCount}
                    onChange={handlePlanFormChange}
                    required
                    fullWidth
                    variant={'outlined'}
                    size={'small'}
                  />
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <TextField
                    sx={classes.textField}
                    label="Duration"
                    name="duration"
                    value={state?.duration}
                    onChange={handlePlanFormChange}
                    required
                    type="number"
                    variant={'outlined'}
                    size={'small'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={({ border: '1 2 0 #000' }, classes.adornment)}>
                          M(s)
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={classes.textField}
                    label="Price"
                    type="number"
                    name="price"
                    value={state?.price}
                    onChange={handlePlanFormChange}
                    required
                    variant={'outlined'}
                    size={'small'}
                    InputProps={{
                      //
                      endAdornment: (
                        <InputAdornment position="end" sx={({ borderLeft: '1 2 0 #000' }, classes.adornment)}>
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <TextField
                    sx={classes.textField}
                    label="IAP Code"
                    name="iapCode"
                    value={state?.iapCode}
                    onChange={handlePlanFormChange}
                    required
                    variant={'outlined'}
                    size={'small'}
                    fullWidth
                  />
                </Stack>
                <TextField
                  sx={classes.textField}
                  label="Plan Description"
                  name="description"
                  multiline
                  fullWidth
                  rows={4}
                  value={state?.description}
                  onChange={handlePlanFormChange}
                  required
                  variant={'outlined'}
                  size="small"
                />
                <FormControlLabel
                  control={<Switch color="primary" name="active" checked={state.active} onChange={handleToggle} />}
                  label="Active"
                />

                <TextField
                  sx={classes.textField}
                  label="Add Features"
                  onKeyDown={addFeature}
                  required
                  variant={'outlined'}
                  size="small"
                />
                <Grid container spacing={1}>
                  {state.features &&
                    Array.isArray(state.features) &&
                    state?.features.map((feature, index) => {
                      return (
                        <Grid item key={index}>
                          <Chip
                            icon={<Iconify icon={'mdi:feature-highlight'} />}
                            label={feature}
                            onDelete={() => deleteFeature(feature)}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
                <Stack direction={'row'} sx={{ justifyContent: 'center' }} spacing={2}>
                  <Button variant="contained" sx={{ width: '100%' }} color="error" onClick={createEditPlan}>
                    {plan ? 'Update' : 'Create'}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Modal>
    </>
  );
}

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
    margin: 0,
    ['sm']: {
      marginRight: 0,
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
  adornment: {
    borderLeft: `1px solid `,
    paddingLeft: 2,
  },
  dottedAdornment: {
    borderLeft: `1px dotted `,
    paddingLeft: 2,
  },
};
