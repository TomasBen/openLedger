import { NavLink } from "react-router-dom";
import Window from "../lib/tauriWindow.ts";

export default function Navbar() {
  return (
    <div className={"navbar_container"}>
      <NavLink
        to="/"
        className={"navlink"}
        onClick={() => Window.getCurrentTheme()}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/reportes"
        className={"navlink"}
        onClick={() => Window.setDarkMode()}
      >
        Reportes
      </NavLink>
      <NavLink
        to="/ventas"
        className={"navlink"}
        onClick={() => Window.setLightMode()}
      >
        Ventas
      </NavLink>
      <NavLink to="/compras" className={"navlink"}>
        Compras
      </NavLink>
      <NavLink to="/finanzas" className={"navlink"}>
        Finanzas
      </NavLink>
      <NavLink to="/inventario" className={"navlink"}>
        Inventario
      </NavLink>
      <NavLink to="/impuestos" className={"navlink"}>
        Impuestos
      </NavLink>
      <NavLink to="/contabilidad" className={"navlink"}>
        Contabilidad
      </NavLink>
    </div>
  );
}
