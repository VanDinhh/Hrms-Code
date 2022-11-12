import { Container, Typography } from '@mui/material';

export default function PageNotFound() {
  return (
    <Container sx={{ textAlign: 'center' }} maxWidth="md">
      <Typography variant="h1">404 Not Found</Typography>
      <Typography variant="body1">
        That this an error. This URL not found
      </Typography>
    </Container>
  );
}
