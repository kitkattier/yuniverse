import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

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
    </>
  );
};

export default Layout;
