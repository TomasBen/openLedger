import { Container, Stack, TextField, Button } from "@mui/material";

export default function DatabaseConnection() {
  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="row"
          sx={{ width: "100%", display: "flex", gap: "30px" }}
        >
          <TextField label="Hostname" sx={{ flex: 1 }}></TextField>
          <TextField label="Port" sx={{ flex: 1 }}></TextField>
        </Stack>
        <TextField fullWidth label="Name"></TextField>
        <TextField fullWidth label="Username"></TextField>
        <TextField fullWidth label="Password"></TextField>
        <Stack
          direction="row"
          sx={{ width: "100%", display: "flex", justifyContent: "end" }}
        >
          <Button variant="contained" size="large">
            Connect
          </Button>
        </Stack>
      </Container>
    </>
  );
}
