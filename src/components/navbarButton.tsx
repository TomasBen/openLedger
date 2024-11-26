import { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

export type PanelState = "open" | "closed";

export default function NavbarButton() {
  const [panelState, setPanelState] = useState<PanelState>("open");

  const handleClick = () => {
    const navbar = document.getElementById("navbar");
    navbar!.classList.toggle("close");
    setPanelState(panelState == "open" ? "closed" : "open");
  };

  return (
    <Tooltip title="Left Panel">
      <IconButton onClick={() => handleClick()}>
        {panelState === "open" ? (
          <PanelLeftClose style={{ pointerEvents: "none" }} />
        ) : (
          <PanelLeftOpen style={{ pointerEvents: "none" }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
