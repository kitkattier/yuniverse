import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Clubs from "./pages/Clubs.jsx";
import Layout from "./Layout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clubs" element={<Clubs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
