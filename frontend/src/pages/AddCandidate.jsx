import { useState } from "react";
import API from "../services/api";

function AddCandidate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/candidates", {
      ...form,
      skills: form.skills.split(","),
    });

    alert("Candidate Added");
  };

  return (
    <div className="container">
      <h2>Add Candidate</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Skills comma separated"
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
        />

        <input
          placeholder="Experience"
          type="number"
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Bio"
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
        />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddCandidate;