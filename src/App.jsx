import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Clubs from "./pages/Clubs.jsx";
import Events from "./pages/Events.jsx";
import Create from "./pages/Create.jsx";
import Layout from "./Layout.jsx";

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="events" element={<Events />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
