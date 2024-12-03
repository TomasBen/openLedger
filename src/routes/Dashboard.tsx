import { useContext } from 'react';
import { invoke } from '@tauri-apps/api/core';
import UserPreferencesContext from '../contexts/UserPreferencesContext';
import { Box, Button } from '@mui/material';

export default function Dashboard() {
  const { preferences } = useContext(UserPreferencesContext);

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Button variant="contained" onClick={() => console.log(preferences)}>
        print preferences from context
      </Button>
      <Button
        variant="contained"
        onClick={() => invoke('get_preferences').then((preferences) => console.log(preferences))}
      >
        get preferences from backend
      </Button>
    </Box>
  );
}
