import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={"navbar_container"}>
      <NavLink to="/" className={"navlink"}>
        Dashboard
      </NavLink>
      <NavLink to="/reportes" className={"navlink"}>
        Reportes
      </NavLink>
      <NavLink to="/ventas" className={"navlink"}>
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
      <NavLink to="/contabilidad" className={"navlink variant"}>
        Contabilidad
      </NavLink>
    </div>
  );
}
