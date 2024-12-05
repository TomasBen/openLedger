import { invoke } from '@tauri-apps/api/core';
import { Box, Button } from '@mui/material';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';

export default function Dashboard() {
  const { preferences } = usePreferencesStore();

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
