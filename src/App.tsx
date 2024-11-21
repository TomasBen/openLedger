import DatabaseConnection from "./pages/DatabaseConnection.tsx";
import FirstLogin from "./pages/FirstLogin.tsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstLogin />} />
        <Route path="/connection" element={<DatabaseConnection />} />
      </Routes>
    </>
  );
}
