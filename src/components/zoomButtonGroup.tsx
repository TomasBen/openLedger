import { useState } from "react";
import { Webview } from "../lib/webview";
import { z } from "zod";
import { ButtonGroup, ButtonBase, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ZoomButtonGroup() {
  let [scaleFactor, setScaleFactor] = useState(1);

  const scaleFactorSchema = z
    .number({
      invalid_type_error: "scale factor must be between 0.5 and 2",
    })
    .min(0.5)
    .max(2);

  const validateNumber = (input: number) => {
    return scaleFactorSchema.safeParse(input);
  };

  const handleSetScale = (num: number) => {
    const scaleFactor = validateNumber(num);

    if (scaleFactor.success == true) {
      Webview.setZoom(num);
      setScaleFactor(num);
    } else {
      {
        /* Implement error handling with a module that accepts an error type
      (fatalError or warning) and adds it to the diagnostics bar in the LP */
      }
    }
  };

  return (
    <ButtonGroup
      className={"accessibility_button_group"}
      orientation="horizontal"
      variant="outlined"
      size="medium"
    >
      <ButtonBase disableTouchRipple>
        <RemoveIcon
          onClick={() => {
            Webview.zoomOut();
            setScaleFactor((scaleFactor -= 0.1));
          }}
        />
      </ButtonBase>
      <TextField
        size="small"
        value={scaleFactor}
        onChange={(e) => console.log(e.currentTarget.value)}
      >
        {scaleFactor}
      </TextField>
      <ButtonBase disableTouchRipple>
        <AddIcon
          onClick={() => {
            Webview.zoomIn();
            setScaleFactor((scaleFactor += 0.1));
          }}
        />
      </ButtonBase>
    </ButtonGroup>
  );
}
