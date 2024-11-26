import { MenuList, MenuItem, Divider, Paper } from "@mui/material";

export default function AccessibilityButtonMenu() {
  return (
    <>
      <Paper className={"accessibilityButtonMenu"}>
        <MenuList>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <Divider />
          <MenuItem>Item 3</MenuItem>
        </MenuList>
      </Paper>
    </>
  );
}
