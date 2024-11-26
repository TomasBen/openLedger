import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./Layout.tsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";

{
  /* Lazy load pages other than Dashboard */
}

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/connection" element={<h1>Database</h1>} />
          <Route path="/first-login" element={<h1>Login</h1>} />
        </Routes>
      </Layout>
    </>
  );
}
