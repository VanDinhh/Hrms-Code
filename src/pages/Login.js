import { Box } from '@mui/material';
import MainLogin from '../components/login/MainLogin';

export default function Login() {
  return (
    <Box
      sx={{
        bgcolor: '#eee',
        width: '100%',
        height: '100vh',
        paddingTop: '5em',
      }}
    >
      <MainLogin />
    </Box>
  );
}
