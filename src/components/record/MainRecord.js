import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RecordColumn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showAlert } from '../../redux/create-actions/AlertActions';
import { apiDeleteEmployee, apiGetAllEmployee } from '../../service/Employee';
import { apiGetAllDepartment } from '../../service/Department';

export default function MainRecord() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [recordFilters, setRecordFilters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [fullname, setFullname] = useState('');
  const [partName, setPartName] = useState(null);
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllEmployee();
        if (res.data.success === true) {
          setRecords(res.data.content);
          setRecordFilters(res.data.content);
        }
      } catch(err) {
        console.log(err);
      }
    }
    fetchAPI();
  }, [deleted])

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllDepartment();
        if (res.data.success === true) {
          setDepartments(res.data.content);
        }
      } catch(err) {
        console.log(err);
      }
    }

    fetchAPI();
  }) 

  const handleDeleteEmployee = async() => {
    try {
      const res = await apiDeleteEmployee(idSelected);
      if (res.data.success) {
        setOpen(false);
        dispatch(
          showAlert({ type: 'success', message: 'X??a nh??n vi??n th??nh c??ng' }),
        );
        setDeleted(!deleted);
      }
      else {
        dispatch({ type: 'error', message: 'X??a nh??n vi??n th???t b???i' })
      }
    } catch(err) {

    }
  };

  const handleNavigate = (params) => {
    navigate('/record/' + params.row.employeeId);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: '',
      width: 160,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={() => handleNavigate(params)}>
              <EditIcon sx={{ color: '#0066FF	' }} />
            </IconButton>
            <IconButton onClick={() => {
              setOpen(true);
              setIdSelected(params.row.employeeId);
            }}>
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];



  const handleFilter = () => {
    let newRecordFilters = records;
    if (employeeID) {
      newRecordFilters = newRecordFilters.filter(
        (e) => e.employeeId.search(`${employeeID}`) >= 0,
      );
    }
    if (fullname) {
      newRecordFilters = newRecordFilters.filter((e) => {
        const employeeFullname = e.employeeFirstname + ' ' + e.employeeLastname;
        return employeeFullname.search(`${fullname}`) >= 0;
      });
    }
    if (partName) {
        newRecordFilters = newRecordFilters.filter(
          (e) => e.departmentName.search(`${partName}`) >= 0,
        );
    }
    setRecordFilters(newRecordFilters);
  };

  const handleClear = () => {
    setEmployeeID('');
    setFullname('');
    setPartName('');
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <Box sx={{ marginBottom: '1em' }}>
          <Button
            variant="contained"
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            component={Link}
            to="/record"
          >
            Th??ng tin
          </Button>
          <Button
            variant="outlined"
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            component={Link}
            to="/record/new"
          >
            Th??m m???i
          </Button>
        </Box>
        <Box sx={{ marginBottom: '1em' }}>
          <Typography variant="body1">Th??ng tin t??m ki???m</Typography>
          <Box className={classes.wrapperSearch}>
            <Grid container spacing={2}>
              <Grid item xs={3.3}>
                <TextField
                  label="M?? nh??n vi??n"
                  fullWidth
                  size="small"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
              </Grid>
              <Grid item xs={3.3}>
                <TextField
                  label="Fullname"
                  fullWidth
                  size="small"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Grid>
              <Grid item xs={3.3}>
                <Autocomplete
                  options={departments}
                  getOptionLabel={(option) => option.departmentName}
                  onChange={(e, newValue) =>
                    setPartName(newValue.departmentName)
                  }
                  renderInput={(props) => (
                    <TextField {...props} label="T??n b??? ph???n" size="small" />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={2.1}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button variant="contained" onClick={handleFilter}>
                  T??m ki???m
                </Button>
                <Button variant="contained" onClick={handleClear}>
                  Nh???p l???i
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">Danh s??ch nh??n vi??n</Typography>
          <Box sx={{ height: '30em' }}>
            <DataGrid
              columns={columns.concat(actionColumn)}
              rows={recordFilters}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                '& .MuiDataGrid-row': {
                  cursor: 'pointer',
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"X??a nh??n vi??n"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            B???n ch???c ch???n mu???n x??a nh??n vi??n n??y
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEmployee}>X??a</Button>
          <Button onClick={handleClose}>
            H???y
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

const useStyles = makeStyles({
  container: {
    border: '1px solid #ccc',
  },
  wrapperSearch: {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '4px',
  },
});
