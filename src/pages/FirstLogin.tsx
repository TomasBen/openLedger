import {
  Container,
  Stack,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

export default function FirstLogin() {
  return (
    <>
      <Container
        maxWidth={"sm"}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: "1rem",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Crea tu perfil</h1>
        <TextField label="Nombre" variant="outlined" required fullWidth />
        <TextField label="Email" variant="outlined" required fullWidth />
        <TextField
          label="Organización o Establecimiento"
          placeholder="Murdcok and Nelson LLC."
          variant="outlined"
          fullWidth
        />
        <Select fullWidth>
          <MenuItem value={"Emprendedor (Persona Humana)"}>
            Emprededor (Persona Humana)
          </MenuItem>
          <MenuItem value={"Empresa (Persona Jurídica)"}>
            Emresa (Persona Jurídica)
          </MenuItem>
          <MenuItem value={"Contador/Estudio Contable"}>
            Contador/Estudio Contable
          </MenuItem>
        </Select>
        <Stack
          direction="row"
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" size="large">
            Save
          </Button>
        </Stack>
      </Container>
    </>
  );
}
