import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { getUserSubscription, deleteSub } from '../../repository/subscription';
import { useQuery, useMutation } from '@tanstack/react-query';
import useThurDate from '../../hooks/useDate';
// @mui
import {
  Container,
  Stack,
  Typography,
  Card,
  Table,
  Paper,
  Avatar,
  Button,
  Popover,
  MenuItem,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import AlertDialog from '../../components/alert/dialogue';
import ThurAlert from '../../components/alert/alert';
// sections
import { TableListHead, TableListToolbar } from '../../components/table-component';
// mock

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'validity', label: 'Validity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'expires', label: 'Expires', alignRight: false },
  { id: 'devices', label: 'Devices', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductsPage() {
  const { isSuccess, isFetching , refetch} = useQuery({
    queryKey: ['get-subscribers'],
    queryFn: getUserSubscription,
    onSuccess: (result) => {
      console.log('data', result);
      setSubscription(result.purchases);
    },
  });

  const [getDate, getExpirationDate] = useThurDate();

  const [openDelete, setOpenDelete] = useState(false);
  const [focusPcs, setFocus] = useState(null);
  const [response, setResponse] = useState(null);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [subscriptions, setSubscription] = useState([]);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = [].map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [].length) : 0;

  console.log('subscriptionIHHHBVUJV', subscriptions);

  const filteredUsers = applySortFilter(subscriptions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const deletePcsMt = useMutation(['delete'], () => deleteSub(focusPcs?._id), {
    onSuccess: (res) => {
      console.log(res);
      setResponse(res);
      setOpenDelete(false);
      refetch().then(() => setResponse(null));
    },
    onError: (error) => {
      setResponse(error);
      setOpenDelete(false);
    },
  });

  const handleOpenMenu = (event, pcsFocus) => {
    setOpen(event.currentTarget);
    setFocus(pcsFocus);
  };

  const openDialogue = () => {
    setOpenDelete(true);
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Subscription </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            SUBSCRIPTIONS
          </Typography>

          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Create
          </Button>
        </Stack>
        <AlertDialog
          open={openDelete}
          yesText={'Delete'}
          noText={'Cancel'}
          title="Do you want to delete?"
          message={`Confirm to delete the ${focusPcs?.title}`}
          handleYes={() => deletePcsMt.mutate()}
          handleNo={() => setOpenDelete(false)}
        />
        {response && <ThurAlert severe={response.status ? 'success' : 'error'} message={response.message} />}

        {isFetching && (
          <Container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mx: 'auto' }}>
            {' '}
            <CircularProgress color="success" sx={{ margin: 'auto' }} />{' '}
          </Container>
        )}

        {isSuccess && (
          <Card>
            <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={subscriptions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id: id, plan_id, user_id, active, created_at } = row;
                    const name = user_id?.email;
                    const devices = new Map(Object.entries(user_id?.devices ?? {}));
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={''} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{plan_id.title}</TableCell>

                        <TableCell align="left">{plan_id.price}</TableCell>

                        
                        <TableCell align="left">{getDate(created_at)}</TableCell>
                        <TableCell align="left">{getExpirationDate(new Date(created_at),plan_id.duration - 1 )}</TableCell>
                        <TableCell align="left">{devices.size}</TableCell>

                        <TableCell align="left">
                          <Label color={active === false ? 'error' : 'success'}>{active === false ? 'Inactive' : 'Active'}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={[].length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => openDialogue()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
