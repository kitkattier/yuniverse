import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * Layout component that renders the navigation bar, main content, and footer.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isClubsPage =
    location.pathname === "/clubs" || location.pathname === "/clubs/";

  const isEventsPage =
    location.pathname === "/events" || location.pathname === "/events/";

  return (
    <>
      <Navbar
        searchbar={
          isHomePage ? true : isClubsPage ? false : isEventsPage ? false : true
        }
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
