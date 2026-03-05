import { useState } from "react";
import axios from "axios";

function ProblemGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [result, setResult] = useState("");

  const generateProblem = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/problem",
      { topic, difficulty }
    );

    setResult(response.data);
  };

  return (
    <div>
      <h2>DSA Problem Generator</h2>

      <input
        placeholder="Topic (Arrays, DP...)"
        onChange={(e) => setTopic(e.target.value)}
      />

      <input
        placeholder="Difficulty (Easy/Medium/Hard)"
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <button onClick={generateProblem}>
        Generate
      </button>

      <pre>{result}</pre>
    </div>
  );
}

export default ProblemGenerator;