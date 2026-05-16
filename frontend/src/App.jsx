import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddCandidate from "./pages/AddCandidate";
import MatchCandidates from "./pages/MatchCandidates";
import CandidateList from "./pages/CandidateList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCandidate />} />
        <Route path="/match" element={<MatchCandidates />} />
        <Route path="/candidates" element={<CandidateList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;