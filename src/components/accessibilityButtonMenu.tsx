import { useState } from "react";
import { Webview } from "../lib/webview.ts";
import { Sun, Moon, Minus, Plus } from "lucide-react";
import {
  Paper,
  MenuList,
  MenuItem,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Checkbox,
  ButtonBase,
  IconButton,
} from "@mui/material";

type Theme = "system" | "light" | "dark";

export default function AccessibilityButtonMenu() {
  const [theme, setTheme] = useState("system");

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const [scaleFactor, setScaleFactor] = useState<number>(1);

  {
    /* Implement user settings scale factor that syncronizes with the useState here */
  }

  const changeScaleFactor = (operation: string) => {
    if (operation === "zoomIn" && scaleFactor < 2) {
      Webview.zoomIn();
      setScaleFactor((prevScaleFactor) => prevScaleFactor + 0.1);
    } else if (operation === "zoomOut" && scaleFactor > 0.5) {
      Webview.zoomOut();
      setScaleFactor((prevScaleFactor) => prevScaleFactor - 0.1);
    } else {
      console.log("number must be between 0.5 and 2");
    }
  };

  return (
    <>
      <Paper className={"accessibilityButtonMenu"} aria-hidden="true">
        <MenuList>
          <MenuItem disableRipple>
            <Checkbox />
            High Contrast
          </MenuItem>
          <Divider />
          <MenuItem disableRipple>Select theme</MenuItem>
          <MenuItem disableRipple>
            {/* not implemented yet, see README */}
            <ToggleButtonGroup
              exclusive
              value={theme}
              onChange={(_, newTheme) => handleThemeChange(newTheme as Theme)}
            >
              {/* set pointer events to none to negate the icons catching the click event */}
              <ToggleButton value="light" defaultChecked>
                <Sun style={{ pointerEvents: "none" }} />
              </ToggleButton>
              <ToggleButton value="dark">
                <Moon style={{ pointerEvents: "none" }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
          <Divider />
          <MenuItem disableRipple>Set Zoom Level</MenuItem>
          <MenuItem disableRipple>
            <ButtonGroup>
              <IconButton onClick={() => changeScaleFactor("zoomOut")}>
                <Minus />
              </IconButton>
              <ButtonBase
                className="scaleFactor"
                style={{ padding: "10px" }}
                value={scaleFactor}
                disableRipple
              >
                {scaleFactor.toFixed(1)}
              </ButtonBase>
              <IconButton onClick={() => changeScaleFactor("zoomIn")}>
                <Plus />
              </IconButton>
            </ButtonGroup>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
}
