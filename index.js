const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON requests

// Sample candidates and votes
let votes = {
  Alice: 0,
  Bob: 0,
  Charlie: 0
};

// Route to get current votes
app.get('/votes', (req, res) => {
  res.json(votes);
});

// Route to cast a vote
app.post('/vote', (req, res) => {
  const { candidate } = req.body;
  if (votes.hasOwnProperty(candidate)) {
    votes[candidate]++;
    res.json({ message: `Vote casted for ${candidate}`, votes });
  } else {
    res.status(400).json({ error: 'Candidate not found' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Blockchain voting server running on port 3000');
});
