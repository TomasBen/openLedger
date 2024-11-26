import { Suspense, lazy, useState, useRef } from "react";
import { PersonStanding } from "lucide-react";
import { panelState } from "./navbarButton";
import { Popper, ClickAwayListener, Tooltip, IconButton } from "@mui/material";
const AccessibilityButtonMenu = lazy(
  () => import("./accessibilityButtonMenu.tsx"),
);

export default function AccessibilityButton() {
  const [panelState, setPanelState] = useState<panelState>("closed");
  const anchorElement = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setPanelState(panelState === "closed" ? "open" : "closed");
  };

  {
    /* Portals are great!!!! Didnt know about them */
  }

  return (
    <div className={"accessibilityButtonContainer"} ref={anchorElement}>
      <Popper
        placement="top"
        open={panelState === "open"}
        anchorEl={anchorElement.current}
      >
        <ClickAwayListener onClickAway={() => setPanelState("closed")}>
          <Suspense fallback={<div>Loading...</div>}>
            <AccessibilityButtonMenu />
          </Suspense>
        </ClickAwayListener>
      </Popper>

      <Tooltip title="Accessibility" className={"accessibilityButton"}>
        <IconButton onClick={() => handleClick()}>
          <PersonStanding />
        </IconButton>
      </Tooltip>
    </div>
  );
}
