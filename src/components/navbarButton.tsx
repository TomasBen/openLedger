import { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

export type panelState = "open" | "closed";

export default function NavbarButton() {
  {
    /* Update logic to be more like the one used in accessibilityButton */
  }

  const [panelState, setPanelState] = useState<panelState>("open");

  const navbar = document.getElementById("navbar");

  const handleClick = () => {
    if (navbar?.classList.contains("close") == false) {
      navbar!.classList.toggle("close");
      setPanelState("closed");
    } else {
      navbar!.classList.toggle("close");
      setPanelState("open");
    }
  };

  return (
    <Tooltip title="Left Panel">
      <IconButton onClick={() => handleClick()}>
        {panelState === "open" ? <PanelLeftClose /> : <PanelLeftOpen />}
      </IconButton>
    </Tooltip>
  );
}
