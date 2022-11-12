import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { showAlert } from '../../redux/create-actions/AlertActions';
import { apiGetEmployeeByEmployeeId, apiUpdateInformationEmployee } from '../../service/Employee';

const employeeFields = [
  {
    label: 'Mã nhân viên',
    field: 'id',
    disabled: true,
  },
  {
    label: 'Tên đầu',
    field: 'firstName',
    disabled: false,
  },
  {
    label: 'Tên cuối',
    field: 'lastName',
    disabled: false,
  },
  {
    label: 'Email cá nhân',
    field: 'email',
    disabled: false,
  },
  {
    label: 'CCCD',
    field: 'citizen',
    disabled: true,
  },
  {
    label: 'Ngày cấp CCCD',
    field: 'issuanceDate',
    disabled: false,
  },
  {
    label: 'Tên bộ phận',
    field: 'partName',
    disabled: false,
  },
  {
    label: 'Địa chỉ',
    field: 'address',
    disabled: false,
  },
  {
    label: 'Email công ty',
    field: 'emailCompany',
    disabled: true,
  },
  {
    label: 'Mã hợp đồng',
    field: 'contractID',
    disabled: true,
  },
  {
    label: 'Ngày kí',
    field: 'signDate',
    disabled: true,
  },
  {
    label: 'Thời hạn hợp đồng',
    field: 'contractTerm',
    disabled: true,
  },
];

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

export default function MainEditRecord() {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState(initEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

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

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const res = await apiGetEmployeeByEmployeeId(id);
        if (res.data.success) {
          const data = res.data.content;
          setEmployee({
            firstName: data.employeeFirstname,
            lastName: data.employeeLastname,
            email: data.employeeEmailPersonal,
            citizen: data.employeeIdcard,
            issuanceDate: data.employeeIdcardDaterange,
            countryID: data.nationId,
            stateID: data.cityId,
            districtID: data.districtId,
            communeID: data.communeId,
            ethnicID: data.ethnicId,
            partName: data.departmentId,
            address: data.employeeAddress,
          })
        }
      } catch(err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [])

  const handleUpdateEmployee = async() => {
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
      const res = await apiUpdateInformationEmployee(id, data);
      if (res.data.success) {
        dispatch(showAlert({ message: 'Cập nhật thành công', type: 'success' }));
        navigate('/record');
      }
      else {
        dispatch(showAlert({ type: 'error', message: 'Cập nhật thất bại' }))
      }
    } catch(err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    navigate('/record');
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <Box sx={{ marginBottom: '1em' }}>
          <Typography variant="body1">Cập nhật thông tin nhân viên</Typography>
          <Box className={classes.wrapperSearch}>
            <Grid container spacing={2}>
              {employeeFields.map((p, index) => {
                return (
                  <Grid item xs={3} key={index}>
                  {p.field === 'partName' ? (
                      <Autocomplete
                        options={departments}
                        disabled={p.disabled}
                        getOptionLabel={(option) => option.departmentName}
                        onChange={(e, newValue) =>
                          setEmployee({ ...employee, [p.field]: newValue[departmentId] })
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
                        disabled={p.disabled}
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
                  <Button variant="contained" onClick={handleUpdateEmployee}>
                    Cập nhật
                  </Button>
                  <Button variant="contained" onClick={handleBack}>
                    Quay lại
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
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
