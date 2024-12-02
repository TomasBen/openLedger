import LowerPanel from "./ui-components/layout/LowerPanel.tsx";
import Navbar from "./ui-components/layout/Navbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* react root opening tag */}
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
