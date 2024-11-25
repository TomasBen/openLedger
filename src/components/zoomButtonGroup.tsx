import { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Webview } from "../lib/webview";

export default function ZoomButtonGroup() {
  let [scaleFactor, setScaleFactor] = useState(1);

  {
    /* TODO: add textinput in the scalefactor to manually set the scalefactor
  and add a debounce to the button or try a faster way through Rust bindings
  (delay most probably has to do with tauri IPC)  */
  }

  return (
    <ButtonGroup orientation="horizontal" variant="outlined" size="medium">
      <Button>
        <RemoveIcon
          onClick={() => {
            Webview.zoomOut();
            setScaleFactor((scaleFactor -= 0.1));
          }}
        />
      </Button>
      <Button style={{ fontSize: "0.8rem" }}>{scaleFactor}</Button>
      <Button>
        <AddIcon
          onClick={() => {
            Webview.zoomIn();
            setScaleFactor((scaleFactor += 0.1));
          }}
        />
      </Button>
    </ButtonGroup>
  );
}
