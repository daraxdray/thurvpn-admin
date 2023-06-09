import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { getVpnList, deleteVPN } from '../../repository/vpn';

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
// import Scrollbar from '../components/scrollbar';
import { useMutation, useQuery } from '@tanstack/react-query';
// sections
import { TableListHead, TableListToolbar } from '../../components/table-component';
import { Link as RouterLink } from 'react-router-dom';
import AlertDialog from '../../components/alert/dialogue';
import ThurAlert from '../../components/alert/alert';

// mock

const TABLE_HEAD = [
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'code', label: 'Code', alignRight: false },
  { id: 'unicode', label: 'Unicode', alignRight: false },
  { id: 'regions', label: 'Regions', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
    return filter(array, (_user) => _user.country.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function VPNListPage() {
  const [VPNLIST, setVPNLIST] = useState([]);
  const [open, setOpen] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [focusVpn, setFocus] = useState(null);
  const [response, setResponse] = useState(null);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('_id');
  const [filterCountry, setFilterCountry] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - VPNLIST.length) : 0;

  const filteredVpn = applySortFilter(VPNLIST, getComparator(order, orderBy), filterCountry);

  const isNotFound = !filteredVpn.length && !!filterCountry;

  const handleOpenMenu = (event, vpnFocus) => {
    setOpen(event.currentTarget);
    setFocus(vpnFocus);
  };

  const openDialogue = () => {
    setOpenDelete(true);
    setOpen(false);
  };

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
      const newSelecteds = VPNLIST.map((n) => n.country);
      setSelected(newSelecteds);
      return;
    }
    setSelected(VPNLIST);
  };

  const handleClick = (event, country) => {
    const selectedIndex = selected.indexOf(country);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, country);
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

  const handleFilterByCountry = (event) => {
    setPage(0);
    setFilterCountry(event.target.value);
  };

  const { isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['get-vpn'],
    queryFn: getVpnList,
    onSuccess: (result) => {
      console.log(result);
      setVPNLIST(result);
    },
  });

  const deleteVpnMt = useMutation(['delete'], () => deleteVPN(focusVpn?._id), {
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

  const getDate = (data)=>{
    const date = new Date(data);
    return date.toDateString();
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: VPN </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">VPN</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            to={'/dashboard/vpn/create'}
            component={RouterLink}
          >
            Create
          </Button>
        </Stack>
        <AlertDialog
          open={openDelete}
          yesText={'Delete'}
          noText={'Cancel'}
          title="Do you want to delete?"
          message={`Confirm to delete the country ${focusVpn?.country}`}
          handleYes={() => deleteVpnMt.mutate()}
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
            <TableListToolbar
              numSelected={selected.length}
              filterProp={filterCountry}
              onFilterProp={handleFilterByCountry}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={VPNLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredVpn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id: id, country, countryCode, status, countryImage, regions, unicode, created_at } = row;
                    const selectedUser = selected.indexOf(country) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, country)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={country} src={countryImage} />
                            <Typography variant="subtitle2" noWrap>
                              {country}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{countryCode}</TableCell>

                        <TableCell align="left">{unicode}</TableCell>

                        <TableCell align="left">{regions.length}</TableCell>

                        <TableCell align="left">{getDate(created_at)}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === false && 'error') || 'success'}>
                            {status ? 'Active' : 'Inactive'}
                          </Label>
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
                            <strong>&quot;{filterCountry}&quot;</strong>.
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
              count={VPNLIST.length}
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
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
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
        <MenuItem to={`/dashboard/vpn/edit/${focusVpn?._id}`}
            component={RouterLink}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        
        </MenuItem >

        <MenuItem sx={{ color: 'error.main' }} onClick={() => openDialogue()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
