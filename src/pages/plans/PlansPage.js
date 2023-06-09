import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { getPlanList, deletePlan } from '../../repository/plans';
import { useQuery, useMutation } from '@tanstack/react-query';
// @mui
import {
  Container,
  Stack,
  Typography,
  Card,
  Table,
  Paper,
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
import AlertDialog from '../../components/alert/dialogue';
import ThurAlert from '../../components/alert/alert';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import AddPlanModal from '../../components/thurcomponents/AddPlanModal';
import { TableListHead, TableListToolbar } from '../../components/table-component';
// mock

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'price', label: 'Price($)', alignRight: false },
  { id: 'duration', label: 'Duration', alignRight: false },
  { id: 'deviceCount', label: 'Devices', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'iapCode', label: 'IAP Code', alignRight: false },
  { id: 'created_at', label: 'Date', alignRight: false },
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

export default function PlansPage() {
  const [open, setOpen] = useState(null);
  const [PLANLIST, setPlanList] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [focusPlan, setFocus] = useState(null);
  const [response, setResponse] = useState(null);

  const { isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['get-plans'],
    queryFn: getPlanList,
    onSuccess: (result) => {
      setPlanList(result.plans);
    },
  });

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterTitle, setFilterTitle] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEdit, setOpenEdit] = useState(false);

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

  const handleFilterByProp = (event) => {
    setPage(0);
    setFilterTitle(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [].length) : 0;

  const filteredPlans = applySortFilter(PLANLIST, getComparator(order, orderBy), filterTitle);

  const isNotFound = !filteredPlans.length && !!filterTitle;

  const deletePlanMt = useMutation(['delete'], () => deletePlan(focusPlan?._id), {
    onSuccess: (res) => {
      setResponse(res);
      setOpenDelete(false);
      refetch().then(() => setResponse(null));
    },
    onError: (error) => {
      setResponse(error);
      setOpenDelete(false);
    },
  });

  const handleOpenMenu = (event, planFocus) => {
    setOpen(event.currentTarget);
    setFocus(planFocus);
  };

  const openDialogue = () => {
    setOpenDelete(true);
    setOpen(false);
  };

  // const editPlan = (edit)=>{
  //   setOpenEdit(true);

  // }
  const createEditPlan = (create = false) => {
    if (create) setFocus(null);
    setOpen(false);
    setOpenEdit(true);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Plans </title>
      </Helmet>

      <AddPlanModal plan={focusPlan} open={openEdit} handleModalClose={() => setOpenEdit(false)} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">Plans</Typography>

          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => createEditPlan(true)}>
            New Plan
          </Button>
        </Stack>

        <AlertDialog
          open={openDelete}
          yesText={'Delete'}
          noText={'Cancel'}
          title="Do you want to delete?"
          message={`Confirm to delete the ${focusPlan?.title}`}
          handleYes={() => deletePlanMt.mutate()}
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
              filterProp={filterTitle}
              onFilterProp={handleFilterByProp}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={PLANLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredPlans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id: id, title, description, deviceCount, duration, iapCode, price, active } = row;
                    const selectedUser = selected.indexOf(title) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, title)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={title} src={''} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          {description.length > 30 ? description.substr(0, 30) : description}
                        </TableCell>

                        <TableCell align="left">{price}</TableCell>

                        <TableCell align="left">{duration}</TableCell>

                        <TableCell align="left">{deviceCount}</TableCell>
                        <TableCell align="left">
                          <Label color={(active == false && 'error') || 'success'}>
                            {active ? 'Active' : 'Inactive'}
                          </Label>
                        </TableCell>

                        <TableCell align="left">{iapCode}</TableCell>
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
                            <strong>&quot;{filterTitle}&quot;</strong>.
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
        <MenuItem onClick={() => createEditPlan()}>
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
