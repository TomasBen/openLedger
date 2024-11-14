import { Container, Stack, TextField, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function DatabaseConnection() {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem",
            backgroundColor: "rgba(255, 251, 235, 0.5)",
            border: "solid 1px rgba(173, 104, 0, 0.15);",
            borderRadius: "0.5em",
          }}
        >
          <WarningIcon
            sx={{ color: "#cc8800", aspectRatio: "1", fontSize: "2.5rem" }}
          />
          <p>
            ACC-SW requires a PostgreseSQL database to run. Please read the
            documentation for help.
          </p>
        </Container>
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
