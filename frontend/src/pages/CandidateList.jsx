import { useEffect, useState } from "react";
import API from "../services/api";

function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const res = await API.get("/candidates");

    setCandidates(res.data);
  };

  return (
    <div className="container">
      <h2>All Candidates</h2>

      <div className="grid">
        {candidates.map((c) => (
          <div className="card" key={c._id}>
            <h3>{c.name}</h3>

            <p>{c.email}</p>

            <p>
              <strong>Skills:</strong> {c.skills.join(", ")}
            </p>

            <p>{c.experience} Years</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateList;