import { Stack, TextField, Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search } from 'lucide-react';

const SearchButton = styled(Button)<ButtonProps>(() => ({
  height: '100%',
  width: 'auto',
  padding: '1em',
  border: '1px solid var(--color-outline-variant)',
}));

interface ActionBarProps {
  placeholder: string;
}

export default function ActionBar({ placeholder }: ActionBarProps) {
  return (
    <Stack direction="row" className={'action-bar'}>
      <section className={'search-field'}>
        <TextField className={'search-bar'} placeholder={placeholder} />
        <SearchButton size="large">
          <Search />
        </SearchButton>
      </section>
      <span className={'divider'} />
      <Button variant="contained" size="large">
        Añadir
      </Button>
      <Button variant="outlined" size="large">
        Acciones
      </Button>
      <Button variant="contained" size="large" color="secondary">
        Acciones
      </Button>
    </Stack>
  );
}
