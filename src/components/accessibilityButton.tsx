import { Tooltip, IconButton } from "@mui/material";
import { PersonStanding } from "lucide-react";

export default function AccessibilityButton() {
  return (
    <>
      <Tooltip title="Accessibility">
        <IconButton>
          <PersonStanding />
        </IconButton>
      </Tooltip>
    </>
  );
}
