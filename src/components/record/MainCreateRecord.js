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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './RecordColumn';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/create-actions/AlertActions';
import { apiGetAllCommune } from '../../service/Commune';
import { apiGetAllNation } from '../../service/Nation';
import { apiGetAllDistrict } from '../../service/District';
import { apiGetAllEthnic } from '../../service/Ethnic';
import { apiGetAllCity } from '../../service/City';
import { apiInsertInformationEmployee } from '../../service/Employee';

const initEmployee = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  citizen: '',
  issuanceDate: '',
  countryID: null,
  stateID: null,
  districtID: null,
  communeID: null,
  ethnicID: null,
  partName: null,
  address: '',
  emailCompany: '',
  contractID: '',
  signDate: '',
  contractTerm: '',
};

export default function MainCreateRecord() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initEmployee);
  const [records, setRecords] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [idSelected, setIdSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ethnics, setEthnics] = useState([]);
  const [states, setStates] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllCommune();
        if (res.data.success) {
          setCommunes(res.data.content);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchAPI();
  }, [])

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllNation();
        if (res.data.success) {
          setCountries(res.data.content);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchAPI();
  }, [])

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllDistrict();
        if (res.data.success) {
          setDistricts(res.data.content);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchAPI();
  }, [])

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllEthnic();
        if (res.data.success) {
          setEthnics(res.data.content);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchAPI();
  }, [])

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllCity();
        if (res.data.success) {
          setStates(res.data.content);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchAPI();
  }, [])

  const employeeFields = useMemo(() => {
    return [
      {
        label: 'Tên đầu',
        field: 'firstName',
      },
      {
        label: 'Tên cuối',
        field: 'lastName',
      },
      {
        label: 'Email cá nhân',
        field: 'email',
      },
      {
        label: 'CCCD',
        field: 'citizen',
      },
      {
        label: 'Ngày cấp CCCD',
        field: 'issuanceDate',
      },
      {
        label: 'Mã quốc gia',
        field: 'countryID',
        select: true,
        listSelect: countries,
        fieldText: 'nationName',
        fieldValue: 'nationId',
      },
      {
        label: 'Mã TP/Tỉnh',
        field: 'stateID',
        select: true,
        listSelect: states,
        fieldText: 'cityName',
        fieldValue: 'cityId'
      },
      {
        label: 'Mã Quận/Thị xã/Huyện',
        field: 'districtID',
        select: true,
        listSelect: districts,
        fieldText: 'districtName',
        fieldValue: 'districtId',
      },
      {
        label: 'Mã Phường/Thị trấn/Xã',
        field: 'communeID',
        select: true,
        listSelect: communes,
        fieldText: 'communeName',
        fieldValue: 'communeId',
      },
      {
        label: 'Mã dân tộc',
        field: 'ethnicID',
        select: true,
        listSelect: ethnics,
        fieldText: 'ethnicName',
        fieldValue: 'ethnicId',
      },
      {
        label: 'Tên bộ phận',
        field: 'partName',
        select: true,
        listSelect: departments,
        fieldText: 'departmentName',
        fieldValue: 'departmentId'
      },
      {
        label: 'Địa chỉ',
        field: 'address',
      },
    ];
  }, [departments, communes, countries, districts, ethnics, states]) 

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetAllEmployee();
        if (res.data.success === true) {
          setRecords(res.data.content);
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
  }, []) 

  const handleDeleteEmployee = async() => {
    try {
      const res = await apiDeleteEmployee(idSelected);
      if (res.data.success) {
        setOpen(false);
        dispatch(
          showAlert({ type: 'success', message: 'Xóa nhân viên thành công' }),
        );
        setDeleted(!deleted);
      }
      else {
        dispatch({ type: 'error', message: 'Xóa nhân viên thất bại' })
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

  const handleCreateEmployee = async() => {
    try { 
      const data = {
        employeeFirstname: employee.firstName,
        employeeLastname: employee.lastName,
        employeeEmailPersonal: employee.email,
        employeeIdcard: employee.citizen,
        employeeIdcardDaterange: employee.issuanceDate,
        nationId: employee.countryID,
        cityId: employee.stateID,
        districtId: employee.districtID,
        communeId: employee.communeID,
        ethnicId: employee.ethnicID,
        departmentId: employee.partName,
        employeeAddress: employee.address,
      }
      const res = await apiInsertInformationEmployee(data);
      if (res.data.success) {
        dispatch(
          showAlert({ message: 'Thêm mới nhân viên thành công', type: 'success' }),
        );
        setEmployee(initEmployee);
      }
      else {
        dispatch(showAlert({ type: 'error', message: 'Thêm mới nhân viên không thành công' }))
      }
    } catch(err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setEmployee(initEmployee);
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <Box sx={{ marginBottom: '1em' }}>
          <Button
            variant="outlined"
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            component={Link}
            to="/record"
          >
            Thông tin
          </Button>
          <Button
            variant="contained"
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            component={Link}
            to="/record/new"
          >
            Thêm mới
          </Button>
        </Box>
        <Box sx={{ marginBottom: '1em' }}>
          <Typography variant="body1">Thêm mới nhân viên</Typography>
          <Box className={classes.wrapperSearch}>
            <Grid container spacing={2}>
              {employeeFields.map((p, index) => {
                return (
                  <Grid item xs={p.field === 'address' ? 9.6 : 2.4} key={index}>
                    {p.select === true ? (
                      <Autocomplete
                        options={p.listSelect}
                        getOptionLabel={(option) => option[p.fieldText]}
                        onChange={(e, newValue) =>
                          setEmployee({ ...employee, [p.field]: newValue[p.fieldValue] })
                        }
                        renderInput={(props) => (
                          <TextField {...props} label={p.label} size="small"/>
                        )}
                      />
                    ) : (
                      <TextField
                        label={p.label}
                        fullWidth
                        size="small"
                        value={employee[p.field]}
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            [p.field]: e.target.value,
                          })
                        }
                      />
                    )}
                  </Grid>
                );
              })}
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleCreateEmployee}>
                    Thêm mới
                  </Button>
                  <Button variant="contained" onClick={handleClear}>
                    Nhập lại
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">Danh sách nhân viên</Typography>
          <Box sx={{ height: '30em' }}>
            <DataGrid
              columns={columns.concat(actionColumn)}
              rows={records}
              pageSize={5}
              rowsPerPageOptions={[5]}
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
          {"Xóa nhân viên"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa nhân viên này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEmployee}>Xóa</Button>
          <Button onClick={handleClose}>
            Hủy
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
