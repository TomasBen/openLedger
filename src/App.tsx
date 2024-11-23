import Dashboard from "./pages/Dashboard.tsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/connection" element={<h1>Database</h1>} />
        <Route path="/first-login" element={<h1>Login</h1>} />
      </Routes>
    </>
  );
}
