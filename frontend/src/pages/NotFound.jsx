import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10%', sm: '30%' }, // Adjust top position based on screen size
          left: { xs: '50%', sm: '10%' }, // Center for smaller screens
          transform: { xs: 'translateX(-50%)', sm: 'none' }, // Center alignment on smaller screens
          animation: 'float 6s ease-in-out infinite',
        }}
      >
        <RocketLaunchIcon
          sx={{
            fontSize: { xs: '4rem', sm: '6rem' }, // Smaller font size for smaller screens
            color: '#ff5733',
          }}
        />
      </Box>

      {/* 404 Text */}
      <Typography variant="h1" sx={{ fontSize: { xs: '4rem', sm: '6rem' }, fontWeight: 'bold', mt: -5 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        Oops! Looks like you’ve wandered into the unknown.
      </Typography>

      {/* Message */}
      <Typography variant="body1" paragraph sx={{ maxWidth: '500px', mb: 4 }}>
        The page you're looking for doesn't exist, or it might have been moved. But don’t worry, we’ll help you find your way back.
      </Typography>

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => (window.location.href = '/')}
        sx={{
          backgroundColor: '#ff5733',
          '&:hover': { backgroundColor: '#ff4500' },
        }}
      >
        Take Me Home
      </Button>

      {/* Custom Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;
