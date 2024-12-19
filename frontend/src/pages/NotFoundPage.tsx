import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '4rem', sm: '6rem' },
          fontWeight: 'bold',
          color: '#ff6b6b',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1rem', sm: '1.5rem' },
          color: '#666',
          marginBottom: 2,
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Typography
        sx={{
          color: '#999',
          fontSize: '0.9rem',
          marginBottom: 4,
        }}
      >
        It might have been removed or you might have mistyped the URL.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          textTransform: 'none',
          padding: '10px 20px',
          fontSize: '1rem',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
