import { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

type panelState = "open" | "closed";

export default function NavbarButton() {
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
      <IconButton>
        {panelState === "open" ? (
          <PanelLeftClose onClick={() => handleClick()} />
        ) : (
          <PanelLeftOpen onClick={() => handleClick()} />
        )}
      </IconButton>
    </Tooltip>
  );
}
