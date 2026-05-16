import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>AI Shortlisting</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Candidate</Link>
        <Link to="/match">Match</Link>
        <Link to="/candidates">Candidates</Link>
      </div>
    </nav>
  );
}

export default Navbar;