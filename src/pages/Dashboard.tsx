import { useContext } from 'react';
import { invoke } from '@tauri-apps/api/core';
import UserPreferencesContext from '../contexts/UserPreferencesContext';
import { Container, Button } from '@mui/material';

export default function Dashboard() {
  const { preferences } = useContext(UserPreferencesContext);

  return (
    <Container
      maxWidth="lg"
      sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
    >
      <Button variant="contained" onClick={() => console.log(preferences)}>
        print preferences from context
      </Button>
      <Button
        variant="contained"
        onClick={() => invoke('get_preferences').then((preferences) => console.log(preferences))}
      >
        get preferences from backend
      </Button>
    </Container>
  );
}
