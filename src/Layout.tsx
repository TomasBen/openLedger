import LowerPanel from "./components/layout/LowerPanel.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import UpperPanel from "./components/layout/UpperPanel.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* react root opening tag */}
      <UpperPanel />
      <main id="main-content" role="main">
        <Navbar />
        {/* suspense should be added here */}
        {children}
      </main>
      <LowerPanel />
      {/* react root closing tag */}
    </>
  );
}
