import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CertificationPortal from "./Certificate.jsx";
import ImagePortal from "./Image.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CertificationPortal />} />
        <Route path="/image" element={<ImagePortal />} />
      </Routes>
    </Router>
  );
};

export default App;
