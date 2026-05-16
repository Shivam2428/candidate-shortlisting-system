const Candidate = require("../models/Candidate");

exports.matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const ranked = candidates
      .map((candidate) => {
        const matchedSkills = candidate.skills.filter((skill) =>
          requiredSkills.includes(skill)
        );

        const score =
          (matchedSkills.length / requiredSkills.length) * 100;

        return {
          ...candidate._doc,
          matchedSkills,
          matchScore: score.toFixed(0),
        };
      })
      .filter((c) => c.experience >= minExperience)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(ranked);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};