import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isClubsPage =
    location.pathname === "/clubs" || location.pathname === "/clubs/";

  return (
    <>
      <Navbar searchbar={isHomePage ? true : isClubsPage ? false : true} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
