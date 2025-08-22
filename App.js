import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [winner, setWinner] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resCandidates = await axios.get("http://localhost:5000/candidates");
      setCandidates(resCandidates.data);

      const resBlocks = await axios.get("http://localhost:5000/blocks");
      setBlocks(resBlocks.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const vote = async (name) => {
    try {
      const res = await axios.post("http://localhost:5000/vote", { candidateName: name });
      setMessage(res.data.message);
      fetchData();
    } catch (error) {
      setMessage("Error while voting");
    }
  };

  const showWinner = () => {
    if (candidates.length > 0) {
      const currentWinner = candidates.reduce((prev, curr) =>
        prev.votes > curr.votes ? prev : curr
      );
      setWinner(currentWinner.name);
    }
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="app-container">
      <h1>🗳 Blockchain Voting DApp</h1>

      <h2>
        Winner: <span className="winner">{winner || "No votes yet"}</span>
      </h2>
      <button className="show-winner-btn" onClick={showWinner}>
        Show Winner
      </button>

      {message && <div className="message">{message}</div>}

      <div className="candidates-container">
        {candidates.map((c) => {
          const percent = totalVotes ? (c.votes / totalVotes) * 100 : 0;
          const isWinner = c.name === winner;
          return (
            <div
              className={`candidate-card ${isWinner ? "winner-card" : ""}`}
              key={c.name}
            >
              <h3>{c.name}</h3>
              <p>Votes: {c.votes}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${percent}%` }}></div>
              </div>
              <button onClick={() => vote(c.name)}>Vote</button>
            </div>
          );
        })}
      </div>

      <h2>Blockchain Vote History</h2>
      <div className="blocks-inline">
        {blocks
          .filter((b) => b.data && b.data.candidateName)
          .map((b, index, arr) => (
            <span key={b.index}>
              {b.data.candidateName}
              {index !== arr.length - 1 && " > "}
            </span>
          ))}
      </div>
    </div>
  );
}

export default App;
