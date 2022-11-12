import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../redux/create-actions/AlertActions';

export default function AlertCustom() {
  const open = useSelector((state) => state.alert.open);
  const message = useSelector((state) => state.alert.message);
  const type = useSelector((state) => state.alert.type);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAlert());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
