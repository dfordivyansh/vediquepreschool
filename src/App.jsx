import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import FullGallery from "./pages/FullGallery";
import PlaygroupPage from "./pages/PlaygroupPage";
import NurseryPage from "./pages/NurseryPage";
import LKGPage from "./pages/LKGPage";
import UKGPage from "./pages/UKGPage";
import ParentToddlerPage from "./pages/ParentToddlerPage";
import DaycarePage from "./pages/DaycarePage";
import EnrichmentProgramsPage from "./pages/EnrichmentProgramsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<FullGallery />} />
        <Route path="/programs/playgroup" element={<PlaygroupPage />} />
        <Route path="/programs/nursery" element={<NurseryPage />} />
        <Route path="/programs/lkg" element={<LKGPage />} />
        <Route path="/programs/ukg" element={<UKGPage />} />
        <Route path="/programs/parent-toddler" element={<ParentToddlerPage />} />
        <Route path="/programs/daycare" element={<DaycarePage />} />
        <Route path="/programs/enrichment" element={<EnrichmentProgramsPage />} />

      </Routes>
    </Router>
  );
};

export default App;
