import { useState } from "react";

import API from "../services/api";

function MatchCandidates() {
  const [skills, setSkills] = useState("");

  const [experience, setExperience] =
    useState(1);

  const [results, setResults] = useState([]);

  const [aiResult, setAiResult] =
    useState("");

  const handleMatch = async () => {
    try {
      const res = await API.post("/match", {
        requiredSkills: skills
          .split(",")
          .map((s) => s.trim()),

        minExperience: Number(experience),
      });

      setResults(res.data);
    } catch (error) {
      console.log(error);

      alert("Matching Failed");
    }
  };

  const handleAI = async () => {
    try {
      const res = await API.post(
        "/ai/shortlist"
      );

      setAiResult(res.data.result);
    } catch (error) {
      console.log(error);

      alert("AI Shortlisting Failed");
    }
  };

  return (
    <div className="container">
      <h2>Match Candidates</h2>

      <input
        type="text"
        placeholder="Required Skills"
        onChange={(e) =>
          setSkills(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Minimum Experience"
        onChange={(e) =>
          setExperience(e.target.value)
        }
      />

      <button onClick={handleMatch}>
        Basic Match
      </button>

      <button onClick={handleAI}>
        AI Shortlist
      </button>

      <div className="grid">
        {results.map((r) => (
          <div className="card" key={r._id}>
            <h3>{r.name}</h3>

            <p>
              Match Score:
              {r.matchScore}%
            </p>

            <p>
              Skills Matched:
              {r.matchedSkills.join(", ")}
            </p>
          </div>
        ))}
      </div>

      {aiResult && (
        <div className="ai-box">
          <h3>AI Recommendation</h3>

          <p>{aiResult}</p>
        </div>
      )}
    </div>
  );
}

export default MatchCandidates;