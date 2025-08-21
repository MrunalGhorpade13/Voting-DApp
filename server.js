const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const blockchain = require("./blockchain");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all candidates
app.get("/candidates", (req, res) => {
  res.json(blockchain.getCandidates());
});

// Vote for a candidate
app.post("/vote", (req, res) => {
  const { candidateName } = req.body;
  if (!candidateName) {
    return res.json({ success: false, message: "Candidate name is required" });
  }

  const result = blockchain.vote(candidateName);
  res.json(result);
});

// Get blockchain
app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:5000}`));
