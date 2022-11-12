import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { error } from '../../constant/error';
import { useNavigate, useDispatch } from 'react-router-dom';
import { showAlert } from '../../redux/create-actions/AlertActions';
import LocalStorageService from '../../service/LocalStorage'

export default function MainLogin() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errUsername, setErrUsername] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async() => {
    try {
      setClick(true);
  
      if (username === '') setErrUsername('Username ' + error.EMPTY);
      else setErrUsername(null);
  
      if (password === '') setErrPassword('Password ' + error.EMPTY);
      else setErrPassword(null);
  
      if (username && password) {
        const data = {
          accountUser: username,
          accountPassword: password,
        }
        const res = await apiSignIn(data);
        if (res.data.success === true) {
          dispatch(showAlert({ type: 'success', message: "Đăng nhập thành công"}));
          const userData = res.data.content;
          LocalStorageService.updateLocalAccessToken(userData.token);
          if (userData.accountRole === "ADMIN") {
            navigate('/record');
            navigate(0);
          } else {
            navigate('/');
            navigate(0);
          }
        }
        else {
          dispatch(showAlert({ type: 'error', message: "Tên đăng nhập hoặc mật khẩu không đúng"}))
        }
      }
    } catch(err) {
      dispatch(showAlert({ type: 'error', message: "Lỗi đăng nhập"}))
      console.log(err);
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.wrapper}>
        <Box className={classes.title}>
          <Avatar sx={{ bgcolor: '#0af' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Sign in</Typography>
        </Box>
        <Grid container spacing={2} className={classes.loginForm}>
          <Grid item xs={2}>
            <Typography variant="body1">Username:</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              type={'text'}
              fullWidth
              size="small"
              value={username}
              onFocus={() => setClick(false)}
              error={errUsername !== null && click}
              helperText={errUsername !== null && click ? errUsername : ''}
              onChange={handleChangeUsername}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">Password:</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              size="small"
              onFocus={() => setClick(false)}
              value={password}
              error={errPassword !== null && click}
              helperText={errPassword !== null && click ? errPassword : ''}
              onChange={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    borderRadius: '6px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'center',
  },
});
