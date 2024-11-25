import { Paper, Menu, MenuItem, IconButton } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

export default function AccessibilityButton() {
  return (
    <>
      <IconButton aria-label="accessibility menu">
        <AccessibilityNewIcon />
      </IconButton>
    </>
  );
}
