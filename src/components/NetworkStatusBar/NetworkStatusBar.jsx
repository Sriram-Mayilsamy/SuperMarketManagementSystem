import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const NetworkStatusBar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    !isOnline && (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#ff4d4d',
          color: '#fff',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <Typography variant="body1">You are currently offline</Typography>
      </Box>
    )
  );
};

export default NetworkStatusBar;
